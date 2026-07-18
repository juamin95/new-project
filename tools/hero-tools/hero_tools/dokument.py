"""Dokumente: Angebot und Rechnung als Entwurf (publish: false) im Projekt.

Lego-Prinzip (Vault: Hero-Referenzhandbuch): input = Hülle,
actions = Inhalt (add_text, add_product_position).
Die Text→HTML-Übersetzung der Beschreibungen passiert hier in Code,
nicht im LLM.

Positionen kommen als JSON-Datei:
[
  {
    "nr": "1001",              # aus dem Katalog, nie erfunden
    "name": "Facharbeiterstunde",  # exakt wie im Katalog
    "beschreibung": ["Rüstzeit + Anfahrt", "Rasen gemäht"],
    "einheit": "Std",
    "menge": 24,
    "ep": 50.00,               # vom Menschen bestätigter Netto-Einzelpreis
    "mwst": 19.0               # exakt aus dem Katalog
  }
]
"""

from __future__ import annotations

import html
import json
from pathlib import Path

from .client import gql
from .stammdaten import DOC_TYPE_ANGEBOT, DOC_TYPE_RECHNUNG, check_unit, check_vat

_INTRO_ANGEBOT = ("<p>Sehr geehrte(r) {anrede},<br><br>"
                  "vielen Dank für Ihre Anfrage. Anbei erhalten Sie unser Angebot.</p>")
_OUTRO_ANGEBOT = ("<p>Die oben genannten Preise gelten bis zu 4 Wochen nach Angebotserstellung.<br><br>"
                  "Ich hoffe, dass Ihnen unser Angebot zusagt und freue mich über die Erteilung "
                  "Ihres Auftrages.<br><br>Für Rückfragen stehe ich Ihnen gerne zur Verfügung.<br><br>"
                  "Mit freundlichen Grüßen<br><br>Marvin Amini</p>")

_INTRO_RECHNUNG = ("<p>Sehr geehrte(r) {anrede},<br><br>"
                   "wir bedanken uns für Ihr entgegengebrachtes Vertrauen und Ihren Auftrag "
                   "und stellen Ihnen folgende Positionen in Rechnung:&nbsp;</p>")
_OUTRO_RECHNUNG = ("<p>Bitte überweisen Sie den Rechnungsbetrag unter Angabe der Rechnungsnummer "
                   "im Verwendungszweck innerhalb von 14 Tagen auf das unten angegebene Konto. "
                   "Rechnungsbetrag abzügl. 0,00 % Skonto fällig in 0 Tagen.<br><br>"
                   "Für das entgegengebrachte Vertrauen und die angenehme Zusammenarbeit möchten "
                   "wir uns bedanken.<br><br>Wir freuen uns auf die weitere Zusammenarbeit mit "
                   "Ihnen.<br><br>Mit freundlichen Grüßen,<br><br>Marvin Amini</p>")


def _beschreibung_html(beschreibung) -> str:
    """Liste von Stichpunkten (oder String) → <ul><li>…</li></ul>."""
    if not beschreibung:
        return ""
    if isinstance(beschreibung, str):
        zeilen = [z.strip().lstrip("-• ").strip() for z in beschreibung.splitlines()]
        zeilen = [z for z in zeilen if z]
    else:
        zeilen = [str(z).strip() for z in beschreibung if str(z).strip()]
    if not zeilen:
        return ""
    return "<ul>" + "".join(f"<li>{html.escape(z)}</li>" for z in zeilen) + "</ul>"


def _positionen_laden(pfad: str) -> list[dict]:
    positionen = json.loads(Path(pfad).read_text(encoding="utf-8"))
    if not isinstance(positionen, list) or not positionen:
        raise ValueError("Positionsdatei muss eine nicht-leere JSON-Liste sein")
    actions = []
    for i, p in enumerate(positionen, 1):
        for pflicht in ("nr", "name", "einheit", "menge", "ep", "mwst"):
            if pflicht not in p:
                raise ValueError(f"Position {i}: Feld '{pflicht}' fehlt")
        check_unit(p["einheit"])
        check_vat(p["mwst"])
        actions.append({"add_product_position": {
            "nr": str(p["nr"]),
            "name": p["name"],
            "description": _beschreibung_html(p.get("beschreibung")),
            "unit_type": p["einheit"],
            "quantity": float(p["menge"]),
            "net_price": float(p["ep"]),
            "vat_percent": float(p["mwst"]),
        }})
    return actions


def liste(*, project_id: int) -> list:
    data = gql(
        """
        query($pids: [Int]) {
          customer_documents(project_match_ids: $pids) {
            id date nr status_code status_name value vat
            document_type { id name }
          }
        }
        """,
        {"pids": [project_id]},
    )
    docs = data["customer_documents"]
    for d in docs:
        # status_code 1000 = soft-gelöscht (verifiziert 12.07.2026 nach delete_document)
        d["geloescht"] = d.get("status_code") == 1000
        # status_name "Storniert" = Beleg wurde per Stornorechnung aufgehoben —
        # für Umsatzanalysen ausschließen (verifiziert 13.07.2026, RE-2222)
        d["storniert"] = d.get("status_name") == "Storniert"
    return docs


def positionen(*, document_id: int) -> list:
    """Positionen eines VERÖFFENTLICHTEN Dokuments aus dem JSON-Tresor
    (published_customer_document_draft.data). Unveröffentlichte Entwürfe
    haben keinen Tresor — dann kommt eine leere Liste zurück.
    Struktur (verifiziert 13.07.2026): data.items[] = Gruppen,
    Positionen in gruppe.items[] mit nr/name/quantity/net_price_per_unit."""
    import re

    data = gql(
        """
        query($ids: [Int]) {
          customer_documents(ids: $ids) {
            id nr date
            published_customer_document_draft { data }
          }
        }
        """,
        {"ids": [document_id]},
    )
    docs = data["customer_documents"]
    if not docs:
        raise ValueError(f"Dokument {document_id} nicht gefunden")
    draft = docs[0].get("published_customer_document_draft") or {}
    blob = draft.get("data")
    if isinstance(blob, str):
        blob = json.loads(blob)
    if not blob:
        return []

    ergebnis = []

    def _walk(objekt):
        if isinstance(objekt, dict):
            if "quantity" in objekt and "name" in objekt and "unit_type" in objekt:
                beschreibung = re.sub(r"<[^>]+>", " ", objekt.get("description") or "")
                ergebnis.append({
                    "nr": objekt.get("nr"),
                    "name": objekt.get("name"),
                    "beschreibung": " ".join(beschreibung.split()),
                    "einheit": objekt.get("unit_type"),
                    "menge": objekt.get("quantity"),
                    "ep_netto": objekt.get("net_price_per_unit"),
                    "mwst": objekt.get("vat_percent"),
                })
            else:
                for wert in objekt.values():
                    _walk(wert)
        elif isinstance(objekt, list):
            for eintrag in objekt:
                _walk(eintrag)

    _walk(blob.get("items", blob))
    return ergebnis


def loeschen(*, document_id: int) -> dict:
    data = gql(
        """
        mutation($id: Int) {
          delete_document(document_id: $id) { nr document_type_id }
        }
        """,
        {"id": document_id},
    )
    return data["delete_document"]


def _erstellen(*, project_id: int, anrede: str, positionen_datei: str,
               doc_type: int, intro: str, outro: str,
               ersetzt_id: int | None = None) -> dict:
    actions = ([{"add_text": {"text": intro.format(anrede=html.escape(anrede))}}]
               + _positionen_laden(positionen_datei)
               + [{"add_text": {"text": outro}}])

    data = gql(
        """
        mutation($input: Documents_CreateDocumentInput!,
                 $actions: [Documents_DocumentBuilderActionInput!]!) {
          create_document(input: $input, actions: $actions) { __typename }
        }
        """,
        {"input": {"project_match_id": project_id,
                   "document_type_id": doc_type,
                   "publish": False},
         "actions": actions},
    )
    ergebnis = {"status": "Entwurf erstellt (publish: false)",
                "project_match_id": project_id,
                "dokumenttyp": "Angebot" if doc_type == DOC_TYPE_ANGEBOT else "Rechnung",
                "positionen": len(actions) - 2,
                "antwort": data["create_document"]}

    # Ersetzen-Modus: alten Entwurf erst NACH erfolgreichem Anlegen löschen
    if ersetzt_id:
        loeschen(document_id=ersetzt_id)
        ergebnis["ersetzter_entwurf"] = ersetzt_id
        ergebnis["status"] = "Entwurf ersetzt (publish: false)"
    return ergebnis


def angebot(*, project_id: int, anrede: str, positionen_datei: str,
            ersetzt_id: int | None = None) -> dict:
    return _erstellen(project_id=project_id, anrede=anrede, positionen_datei=positionen_datei,
                      doc_type=DOC_TYPE_ANGEBOT, intro=_INTRO_ANGEBOT, outro=_OUTRO_ANGEBOT,
                      ersetzt_id=ersetzt_id)


def rechnung(*, project_id: int, anrede: str, positionen_datei: str,
             ersetzt_id: int | None = None) -> dict:
    return _erstellen(project_id=project_id, anrede=anrede, positionen_datei=positionen_datei,
                      doc_type=DOC_TYPE_RECHNUNG, intro=_INTRO_RECHNUNG, outro=_OUTRO_RECHNUNG,
                      ersetzt_id=ersetzt_id)
