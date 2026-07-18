"""Projekte (project_matches): suchen, anlegen, Status lesen/setzen.

Prefix-Regel: project_nr "UNB-..." = echtes Projekt, "KONT-<n>" = Kontakt
(Platzhalter-project_match, n = Kunden-ID). Für Kalendertermine an Kontakte
wird die project_match.id des KONT-Eintrags gebraucht, nicht die Kunden-ID.
"""

from __future__ import annotations

from .client import gql

_PROJEKT_FELDER = """
    id
    project_nr
    name
    project_title
    volume
    customer { id full_name }
    current_project_match_status { id status_code name short_name }
    measure { id short name }
"""


def suchen(*, search: str | None = None, customer_id: int | None = None,
           type: str | None = "project", first: int = 50) -> list:
    # Hero liefert copcontact-Container NUR bei explizitem type: "copcontact" —
    # Weglassen oder null bringt nur echte Projekte (verifiziert 12.07.2026).
    # type=None ("alle") heißt deshalb: beide Typen abfragen und zusammenführen.
    if type is None:
        return (suchen(search=search, customer_id=customer_id,
                       type="project", first=first)
                + suchen(search=search, customer_id=customer_id,
                         type="copcontact", first=first))

    variables = {k: v for k, v in
                 {"search": search, "customer_id": customer_id,
                  "type": type, "first": first}.items() if v is not None}
    data = gql(
        """
        query($search: String, $customer_id: Int, $type: String, $first: Int) {
          project_matches(search: $search, customer_id: $customer_id,
                          type: $type, first: $first, orderBy: "id") {%s}
        }
        """ % _PROJEKT_FELDER,
        variables,
    )
    return data["project_matches"]


def anlegen(*, name: str, customer_id: int, address_id: int,
            measure_id: int | None = None,
            type_id: int | None = None) -> dict:
    pm = {"name": name, "customer_id": customer_id, "address_id": address_id}
    if measure_id is not None:
        pm["measure_id"] = measure_id
    if type_id is not None:  # Projekttyp = Prozessweg; None = Hero-Standardtyp
        pm["type_id"] = type_id
    data = gql(
        """
        mutation($pm: ProjectMatchInput!) {
          create_project_match(project_match: $pm) {
            id project_nr name
            type { id name }
            measure { id short name }
            current_project_match_status { id status_code name }
          }
        }
        """,
        {"pm": pm},
    )
    return data["create_project_match"]


def gewerk_setzen(*, id: int, measure_id: int) -> dict:
    """Gewerk eines Projekts setzen. Das Nummern-Präfix wechselt mit
    (UNB-152 -> GABO-152, verifiziert 13.07.2026), die Zahl bleibt."""
    data = gql(
        """
        mutation($pm: ProjectMatchInput!) {
          update_project_match(project_match: $pm) {
            id project_nr
            measure { id short name }
          }
        }
        """,
        {"pm": {"id": id, "measure_id": measure_id}},
    )
    return data["update_project_match"]


USER_MARVIN = 286196  # User-ID (nicht Partner-ID 134384!)

_AUFGABE_FELDER = """
    id title comment due_date done_date is_deleted
    target_user { id }
    target_project_match_id
"""


def aufgaben(*, project_id: int, offen_only: bool = False) -> list:
    data = gql(
        """
        query($pid: Int, $done: Boolean) {
          tasks(project_match_id: $pid, is_done: $done, show_deleted: false) {%s}
        }
        """ % _AUFGABE_FELDER,
        {"pid": project_id, "done": False if offen_only else None},
    )
    return data["tasks"]


def aufgabe_anlegen(*, project_id: int, title: str, comment: str | None = None,
                    due_date: str | None = None, user_id: int = USER_MARVIN) -> dict:
    """Anlegen per update_task OHNE id (verifizierter Upsert, 12.07.2026 —
    ein create_task existiert in der Partner-API nicht)."""
    task: dict = {"title": title, "target_project_match_id": project_id,
                  "target_user_id": user_id}
    if comment:
        task["comment"] = comment
    if due_date:
        task["due_date"] = due_date
    data = gql(
        "mutation($task: TaskInput!) { update_task(task: $task) {%s} }" % _AUFGABE_FELDER,
        {"task": task},
    )
    return data["update_task"]


def aufgabe_aendern(*, id: int, title: str | None = None, comment: str | None = None,
                    due_date: str | None = None, user_id: int | None = None) -> dict:
    task: dict = {"id": id}
    for key, val in [("title", title), ("comment", comment),
                     ("due_date", due_date), ("target_user_id", user_id)]:
        if val:
            task[key] = val
    data = gql(
        "mutation($task: TaskInput!) { update_task(task: $task) {%s} }" % _AUFGABE_FELDER,
        {"task": task},
    )
    return data["update_task"]


def aufgabe_erledigt(*, id: int, done_date: str) -> dict:
    data = gql(
        "mutation($task: TaskInput!) { update_task(task: $task) {%s} }" % _AUFGABE_FELDER,
        {"task": {"id": id, "done_date": done_date}},
    )
    return data["update_task"]


def aufgabe_loeschen(*, id: int) -> dict:
    data = gql(
        "mutation($task: TaskInput!) { update_task(task: $task) {%s} }" % _AUFGABE_FELDER,
        {"task": {"id": id, "is_deleted": True}},
    )
    return data["update_task"]


def logbuch_lesen(*, project_id: int, last: int = 100) -> list:
    """Hero trennt Logbuch-Einträge: ohne user_ids kommen nur System-Einträge,
    mit user_ids nur die dieser User (verifiziert 12.07.2026). Für das volle
    Logbuch beide Quellen abfragen und nach id absteigend mischen.
    Bei neuen Mitarbeitern deren User-ID hier ergänzen."""
    query = """
        query($pid: Int, $uids: [Int], $last: Int) {
          project_histories(project_match_id: $pid, user_ids: $uids, last: $last) {
            id created custom_text author_name type_code
          }
        }
    """
    eintraege: dict = {}
    for uids in (None, [USER_MARVIN]):
        variables = {"pid": project_id, "last": last}
        if uids:
            # uids nur mitsenden wenn gesetzt — null wird von Hero anders
            # behandelt als ein fehlendes Argument
            variables["uids"] = uids
        for e in gql(query, variables)["project_histories"]:
            eintraege[e["id"]] = e
    return sorted(eintraege.values(), key=lambda e: e["id"], reverse=True)


def logbuch_eintrag(*, project_id: int, text: str) -> dict:
    """Freitext-Eintrag ins Projekt-Logbuch (z. B. Vor-Ort-Notizen)."""
    data = gql(
        """
        mutation($entry: LogbookEntryInput!) {
          add_logbook_entry(logbook_entry: $entry) {
            id created custom_text author_name
            target_project_match { id project_nr }
          }
        }
        """,
        {"entry": {"target": "project_match", "target_id": project_id,
                   "custom_text": text}},
    )
    return data["add_logbook_entry"]


def checklisten(*, project_id: int) -> list:
    data = gql(
        """
        query($pid: Int) {
          project_match_checklists(project_match_id: $pid) {
            id name status data partner { id full_name } created
          }
        }
        """,
        {"pid": project_id},
    )
    return data["project_match_checklists"]


def _checklist_entries(punkte: list[str], fragen: list[str] | None = None) -> dict:
    """Verifiziertes data-Format (12.07.2026): entries mit uuid, label,
    type (checkbox|text) und value {is_checked, text}."""
    import uuid as _uuid
    entries = [{"uuid": str(_uuid.uuid4()), "label": p,
                "value": {"is_checked": False}, "type": "checkbox"}
               for p in punkte]
    entries += [{"uuid": str(_uuid.uuid4()), "label": f,
                 "value": {"is_checked": False, "text": ""}, "type": "text"}
                for f in (fragen or [])]
    return {"entries": entries}


def checkliste_anlegen(*, project_id: int, name: str, punkte: list[str],
                       fragen: list[str] | None = None, partner_id: int) -> dict:
    data = gql(
        """
        mutation($pid: Int, $cl: FieldService_ChecklistInput!) {
          create_field_service_checklist(project_match_id: $pid, checklist: $cl) {
            id name status data partner { id full_name }
            project_match_id
          }
        }
        """,
        {"pid": project_id,
         "cl": {"name": name, "data": _checklist_entries(punkte, fragen),
                "partner_id": partner_id, "status": "open"}},
    )
    return data["create_field_service_checklist"]


def checkliste_befuellen(*, id: int, punkte: list[str],
                         fragen: list[str] | None = None) -> dict:
    data = gql(
        """
        mutation($cl: FieldService_ChecklistInput!) {
          update_field_service_checklist(checklist: $cl) { id name status data }
        }
        """,
        {"cl": {"id": id, "data": _checklist_entries(punkte, fragen)}},
    )
    return data["update_field_service_checklist"]


def checkliste_abhaken(*, project_id: int, checklist_id: int, label: str,
                       text: str | None = None, haken: bool = True) -> dict:
    """Einzelnen Punkt abhaken bzw. Textfeld befüllen — Read-Modify-Write,
    bestehende Einträge und deren uuids bleiben erhalten.
    `label` matcht per Teilstring (case-insensitive), muss eindeutig sein."""
    liste = next((c for c in checklisten(project_id=project_id)
                  if c["id"] == checklist_id), None)
    if not liste:
        raise ValueError(f"Checkliste {checklist_id} nicht am Projekt {project_id} gefunden")
    entries = (liste.get("data") or {}).get("entries") or []
    treffer = [e for e in entries if label.lower() in e["label"].lower()]
    if len(treffer) != 1:
        gefunden = ", ".join(f'"{e["label"]}"' for e in treffer) or "keine"
        raise ValueError(f"Label '{label}' nicht eindeutig (Treffer: {gefunden})")
    treffer[0]["value"]["is_checked"] = haken
    if text is not None:
        treffer[0]["value"]["text"] = text

    data = gql(
        """
        mutation($cl: FieldService_ChecklistInput!) {
          update_field_service_checklist(checklist: $cl) { id name status data }
        }
        """,
        {"cl": {"id": checklist_id, "data": {"entries": entries}}},
    )
    return data["update_field_service_checklist"]


def checkliste_loeschen(*, id: int) -> dict:
    data = gql(
        "mutation($id: Int) { delete_checklist(checklist_id: $id) { __typename } }",
        {"id": id})
    return data["delete_checklist"]


def status_setzen(*, id: int, status_code: int) -> dict:
    data = gql(
        """
        mutation($pm: ProjectMatchInput!) {
          update_project_match(project_match: $pm) {
            id project_nr name
            current_project_match_status { id status_code name short_name }
          }
        }
        """,
        {"pm": {"id": id, "current_project_match_status": {"status_code": status_code}}},
    )
    return data["update_project_match"]
