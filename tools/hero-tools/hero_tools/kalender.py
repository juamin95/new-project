"""Kalendertermine (CalendarEvent).

Verifizierte Regeln (Vault: Kalender und Termine (CalendarEvent)):
- category_id ist Pflicht beim Anlegen
- DateTime nur ISO 8601 mit Offset, sonst "Internal server error"
- Löschen ist Soft-Delete; Lesen immer mit show_deleted: false
"""

from __future__ import annotations

import re
from datetime import datetime
from zoneinfo import ZoneInfo

from .client import gql
from .stammdaten import KALENDER_KATEGORIEN, PARTNER_MARVIN

_TZ = ZoneInfo("Europe/Berlin")


def _iso(wert: str) -> str:
    """Akzeptiert 'YYYY-MM-DD HH:MM', 'YYYY-MM-DDTHH:MM[:SS]' (dann Europe/Berlin)
    oder fertiges ISO mit Offset. Gibt immer ISO 8601 mit Offset zurück."""
    wert = wert.strip()
    if re.search(r"[+-]\d{2}:\d{2}$|Z$", wert):
        return wert
    normalisiert = wert.replace(" ", "T")
    if len(normalisiert) == 16:  # YYYY-MM-DDTHH:MM
        normalisiert += ":00"
    dt = datetime.fromisoformat(normalisiert).replace(tzinfo=_TZ)
    return dt.isoformat()


def kategorien() -> list:
    data = gql("query { calendar_event_categories(show_deleted: false) { id name color } }")
    return data["calendar_event_categories"]


def termine(*, start: str, end: str, first: int = 100) -> list:
    data = gql(
        """
        query($start: DateTime, $end: DateTime, $first: Int) {
          calendar_events(start: $start, end: $end, show_deleted: false, first: $first) {
            id title description start end all_day
            category { id name }
            partners { id full_name }
            project_match { id project_nr name customer { full_name } }
          }
        }
        """,
        {"start": _iso(start), "end": _iso(end), "first": first},
    )
    return data["calendar_events"]


def termin_anlegen(*, title: str, start: str, end: str, kategorie: str,
                   description: str | None = None, project_match_id: int | None = None,
                   partner_ids: list[int] | None = None, all_day: bool = False) -> dict:
    key = kategorie.strip().lower()
    if key in KALENDER_KATEGORIEN:
        category_id = KALENDER_KATEGORIEN[key]
    elif key.isdigit():
        category_id = int(key)
    else:
        raise ValueError(f"Unbekannte Kategorie '{kategorie}'. Bekannt: {', '.join(KALENDER_KATEGORIEN)} oder numerische ID")

    event: dict = {
        "title": title,
        "category_id": category_id,
        "start": _iso(start),
        "end": _iso(end),
        "all_day": all_day,
        "partner_ids": partner_ids if partner_ids else [PARTNER_MARVIN],
    }
    if description:
        event["description"] = description
    if project_match_id:
        event["project_match_id"] = project_match_id

    data = gql(
        """
        mutation($ev: CalendarEventInput!) {
          create_calendar_event(calendar_event: $ev) {
            id title start end
            category { id name }
            partners { id full_name }
            project_match { id project_nr customer { full_name } }
          }
        }
        """,
        {"ev": event},
    )
    return data["create_calendar_event"]


def termin_aendern(*, id: int, title: str | None = None, start: str | None = None,
                   end: str | None = None, description: str | None = None) -> dict:
    event: dict = {"id": id}
    if title:
        event["title"] = title
    if start:
        event["start"] = _iso(start)
    if end:
        event["end"] = _iso(end)
    if description:
        event["description"] = description

    data = gql(
        """
        mutation($ev: CalendarEventInput!) {
          update_calendar_event(calendar_event: $ev) {
            id title start end description
            project_match { id project_nr }
          }
        }
        """,
        {"ev": event},
    )
    return data["update_calendar_event"]


def termin_loeschen(*, id: int) -> dict:
    data = gql("mutation($id: Int) { delete_calendar_event(id: $id) { __typename } }", {"id": id})
    return data["delete_calendar_event"]
