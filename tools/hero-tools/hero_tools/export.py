"""Belege-Export: alle veröffentlichten Dokumente aller Kunden als lokaler
Datensatz — das Datenfundament der Systemdatenanalyse (Vault:
02 Projekte/Systemdatenanalyse GRÜNSCHNITT.md, Phase 1).

Anreicherung je Beleg:
- kundentyp: private/commercial (aus dem Kontakt)
- sparte: "bau" | "pflege" | "unklar" (Heuristik, Grenzfälle prüft Julian)

Ausgabe: daten/belege.json (nicht im Git — Betriebsdaten bleiben lokal).
"""

import json
from datetime import datetime, timezone
from pathlib import Path

from . import dokument, projekt
from .client import gql
from .stammdaten import DOC_TYPE_ANGEBOT, DOC_TYPE_RECHNUNG

DATEN_DIR = Path(__file__).resolve().parent.parent / "daten"

# Positionsnummern-Signale für die Sparten-Heuristik.
# Regeln aus dem Grenzfall-Review 13.07.2026 (Julian, Arbeitsstand):
# - Sandaustausch Kitas/Spielplätze -> bau (eigene Projektart)
# - Minibagger-Einsätze ohne Pflege-Signale -> bau (Erdarbeiten)
# - Pauschale "Dienstleistung" (tagesweise, Gewerbe/WEG/Hausverwaltung) -> pflege
_PFLEGE_SIGNALE = ("dienstleistung garten", "gartenpflege", "rasen", "hecke",
                   "grünschnitt", "kleingeräte", "gehölzschnitt", "unkraut",
                   "sperrmüll", "reinigung", "baumsäcke", "grünarbeiten")
_BAU_SIGNALE = ("minibagger", "pflaster", "terrasse", "zaun", "mauer", "beton",
                "fundament", "bauschutt", "aushub", "abriss", "sand",
                "ausschachtung", "blumenbeet", "fugenmörtel", "splitt")

# Einzelfall-Zuordnungen aus dem Review (Beleg-Nr -> Sparte)
_BELEG_OVERRIDES = {
    "RE-2273": "pflege",  # Michaely: große Entsorgung Grünschnitt/Baumisch
    "RE-2238": "bau",     # Lehr & Sohn: reine Minibagger-Vermietung
    "RE-2239": "bau",     # Lehr & Sohn: reine Minibagger-Vermietung
}


def _alle_kontakte() -> dict:
    kontakte, offset = {}, 0
    while True:
        seite = gql(
            """
            query($first: Int, $offset: Int) {
              contacts(first: $first, offset: $offset, show_deleted: false) {
                id full_name type category company_name
              }
            }
            """,
            {"first": 200, "offset": offset},
        )["contacts"]
        if not seite:
            break
        for k in seite:
            kontakte[k["id"]] = k
        if len(seite) < 200:
            break
        offset += 200
    return kontakte


def _sparte(beleg: dict) -> str:
    """Sparte je Beleg: natives Gewerk zuerst, sonst Text-Heuristik
    (Altbestand vor Juli 2026 hängt komplett an UNB/KONT). 'unklar' = Julian."""
    if beleg.get("gewerk") == "GES":
        return "bau"
    if beleg.get("gewerk") in ("PFL", "GABO"):
        return "pflege"
    if beleg["beleg"] in _BELEG_OVERRIDES:
        return _BELEG_OVERRIDES[beleg["beleg"]]

    text = " ".join((p.get("name") or "") + " " + (p.get("beschreibung") or "")
                    for p in beleg["positionen"]).lower()
    nrs = [str(p.get("nr") or "") for p in beleg["positionen"]]

    punkte_bau = sum(1 for s in _BAU_SIGNALE if s in text)
    punkte_pflege = sum(1 for s in _PFLEGE_SIGNALE if s in text)
    # Materialpositionen (4000-7999) sprechen für Bau
    if any(n.isdigit() and 4000 <= int(n) <= 7999 for n in nrs):
        punkte_bau += 1
    # Echtes UNB-Projekt spricht für Bau, KONT-Container für Pflege
    if str(beleg.get("projekt", "")).startswith("UNB-"):
        punkte_bau += 1
    else:
        punkte_pflege += 1

    if punkte_bau > punkte_pflege:
        return "bau"
    if punkte_pflege > punkte_bau:
        return "pflege"
    # Patt: pauschale "Dienstleistung" ohne Bau-Signal ist Tagesgeschäft
    return "pflege" if "dienstleistung" in text else "unklar"


def belege(*, mit_angeboten: bool = True) -> dict:
    kontakte = _alle_kontakte()
    ergebnis = []

    for cid, kontakt in kontakte.items():
        projekte = projekt.suchen(customer_id=cid, type=None, first=100)
        # Abo-Kunde = hat mindestens ein Projekt im Gewerk "Gartenpflege im ABO"
        # (GABO, 8102). Jahresrechnungen hängen am Kunden-Container — über
        # dieses Flag bleibt der ABO-Umsatz trotzdem auswertbar.
        abo_kunde = any((pm.get("measure") or {}).get("id") == 8102
                        for pm in projekte)
        for pm in projekte:
            for doc in dokument.liste(project_id=pm["id"]):
                if doc["geloescht"]:
                    continue
                typ_id = doc["document_type"]["id"]
                if typ_id not in (DOC_TYPE_RECHNUNG, DOC_TYPE_ANGEBOT):
                    # Stornos/Allgemein zunächst außen vor, aber zählen
                    typ_name = doc["document_type"]["name"]
                    if typ_name != "Stornorechnung":
                        continue
                if typ_id == DOC_TYPE_ANGEBOT and not mit_angeboten:
                    continue
                pos = dokument.positionen(document_id=doc["id"])
                if not pos:  # unveröffentlicht → kein Tresor
                    continue
                # value = offizieller Netto-Belegwert aus Hero (statt eigener
                # Positionssumme — deckt Rabatte/Anpassungen ab)
                netto = doc.get("value")
                if netto is None:
                    netto = sum((p.get("menge") or 0) * (p.get("ep_netto") or 0)
                                for p in pos)
                beleg = {
                    "beleg": doc["nr"],
                    "typ": doc["document_type"]["name"],
                    "datum": doc["date"],
                    "kunde_id": cid,
                    "kunde": kontakt["full_name"],
                    "kundentyp": kontakt.get("type"),
                    "projekt": pm["project_nr"],
                    "gewerk": (pm.get("measure") or {}).get("short"),
                    "abo_kunde": abo_kunde,
                    "netto": round(netto, 2),
                    "storniert": doc.get("storniert", False),
                    "zahlstatus": doc.get("status_name"),
                    "positionen": pos,
                }
                beleg["sparte"] = _sparte(beleg)
                ergebnis.append(beleg)

    ergebnis.sort(key=lambda b: str(b["datum"]))
    DATEN_DIR.mkdir(exist_ok=True)
    datei = DATEN_DIR / "belege.json"
    datei.write_text(json.dumps({
        "stand": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "belege": ergebnis,
    }, ensure_ascii=False, indent=1), encoding="utf-8")

    rechnungen = [b for b in ergebnis if b["typ"] == "Rechnung"]
    return {
        "datei": str(datei),
        "belege_gesamt": len(ergebnis),
        "rechnungen": len(rechnungen),
        "angebote": sum(1 for b in ergebnis if b["typ"] == "Angebot"),
        "stornos": sum(1 for b in ergebnis if b["typ"] == "Stornorechnung"),
        "zeitraum": [ergebnis[0]["datum"], ergebnis[-1]["datum"]] if ergebnis else None,
        "rechnungsumsatz_netto": round(sum(b["netto"] for b in rechnungen), 2),
        "sparten_rechnungen": {
            s: sum(1 for b in rechnungen if b["sparte"] == s)
            for s in ("bau", "pflege", "unklar")
        },
        "grenzfaelle": [
            {"beleg": b["beleg"], "kunde": b["kunde"], "datum": b["datum"],
             "netto": b["netto"],
             "positionen": [p["name"] for p in b["positionen"]][:4]}
            for b in rechnungen if b["sparte"] == "unklar"
        ],
    }
