"""Kundenhistorie: Rechnungspositionen live aus Hero (JSON-Tresor).

Ersetzt die manuell gepflegte n8n Data Table "Positions" — Zweck ist
Preiskonsistenz bei Bestandskunden (Kunden-Recap in Schritt 1, Preisfindung
in Schritt 3 des Bauprozesses). Neuester Beleg zuerst.
"""

from . import dokument, projekt
from .stammdaten import DOC_TYPE_RECHNUNG


def rechnungspositionen(*, customer_id: int, auch_angebote: bool = False) -> list:
    ergebnis = []
    for pm in projekt.suchen(customer_id=customer_id, type=None, first=100):
        for doc in dokument.liste(project_id=pm["id"]):
            if doc["geloescht"]:
                continue
            ist_rechnung = doc["document_type"]["id"] == DOC_TYPE_RECHNUNG
            if not ist_rechnung and not auch_angebote:
                continue
            pos = dokument.positionen(document_id=doc["id"])
            if not pos:  # unveröffentlichte Entwürfe haben keinen Tresor
                continue
            ergebnis.append({
                "beleg": doc["nr"],
                "typ": doc["document_type"]["name"],
                "datum": doc["date"],
                "projekt": pm["project_nr"],
                "positionen": pos,
            })
    ergebnis.sort(key=lambda b: str(b["datum"]), reverse=True)
    return ergebnis
