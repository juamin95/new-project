"""Feste Stammdaten und Validierungsregeln des Betriebs.

Quelle: Prozessnotizen im Vault (Prozess Stammdatenpflege) und
verifizierte API-Erkenntnisse (Kalender und Termine (CalendarEvent)).
"""

from __future__ import annotations

# Dokumenttypen (System-IDs, verifiziert)
DOC_TYPE_ANGEBOT = 995345
DOC_TYPE_RECHNUNG = 995347

# Mitarbeiter
PARTNER_MARVIN = 134384

# Gewerke (measures, verifiziert 13.07.2026). Das Kürzel wird Präfix der
# Projektnummer (GES-150, PFL-149, GABO-152); die Zahl läuft global weiter.
# Wartungsvertrag-Automatik erzeugt Projekte immer mit "unbekannt" ->
# Nachpflege via `hero projekt gewerk`.
GEWERKE = {
    "gartengestaltung": 5695,   # GES  (Bau)
    "gartenpflege": 5696,       # PFL  (Pflege auf Abruf)
    "abo": 8102,                # GABO (Gartenpflege im ABO / Dauerobjekte)
    "unbekannt": 6985,          # UNB  (Default, Altbestand)
}

# Projekttypen = Prozesswege (verifiziert 14.07.2026, Zielbild Prozesslandkarte).
# Status-Codes sind über alle Typen konsistent (gleicher Schritt = gleicher Code).
PROJEKTTYPEN = {
    "projekt": 32646,       # voller Weg mit Angebot (Standard, 12 Schritte)
    "ohne-angebot": 65686,  # Direktauftrag: Anfrage/Termin/Umsetzung/Rechnung
    "abo": 65869,           # Wartungsvertrags-Einsatz, ohne Rechnung im Projekt
}

# Kalenderkategorien (Stand 09.07.2026, live abrufbar via `hero kalender kategorien`)
KALENDER_KATEGORIEN = {
    "umsetzung": 343945,
    "vor-ort-termin": 343946,
    "schlechtwetter": 343947,
    "buero": 343948,
    "besprechung": 343949,
    "schule": 343950,
}

# Einheiten-Whitelist (unit_type)
UNITS = [
    "Std", "pauschal", "Stk", "m²", "m³", "m", "lfm", "to", "kg", "L",
    "Tag(e)", "Monat(e)", "km", "%", "SRM", "Sack", "Plt", "Ro",
]

VAT_ALLOWED = (19.0, 7.0)

# Nummernkreise: Kreis-Start -> (Art, Inhalt)
KREISE_LEISTUNG = {
    1000: "Personal & Arbeitszeit",
    2000: "Maschinen & Fuhrpark",
    3000: "Entsorgung",
}
KREISE_PRODUKT = {
    4000: "Schüttgüter & Erden",
    5000: "Pflanzen, Samen & Dünger",
    6000: "Baustoffe & Steine",
    7000: "Spezialbedarf",
}


def check_unit(unit: str) -> str:
    if unit not in UNITS:
        raise ValueError(f"Einheit '{unit}' nicht erlaubt. Erlaubt: {', '.join(UNITS)}")
    return unit


def check_vat(vat: float) -> float:
    if float(vat) not in VAT_ALLOWED:
        raise ValueError(f"MwSt {vat} nicht erlaubt. Erlaubt: 19.0 oder 7.0 (7% nur lebende Pflanzen, Samen, Rollrasen, Rindenmulch, Pflanzerde)")
    return float(vat)


def naechste_nr(vorhandene_nrs: list[str], kreis: int) -> str:
    """Deterministische Nummernkreis-Vergabe: höchste Nummer im Kreis + 1."""
    obergrenze = kreis + 999
    im_kreis = []
    for nr in vorhandene_nrs:
        try:
            n = int(str(nr).strip())
        except (ValueError, TypeError):
            continue
        if kreis <= n <= obergrenze:
            im_kreis.append(n)
    if not im_kreis:
        return str(kreis + 1)
    hoechste = max(im_kreis)
    if hoechste >= obergrenze:
        raise ValueError(f"Nummernkreis {kreis} ist voll (höchste Nummer {hoechste})")
    return str(hoechste + 1)
