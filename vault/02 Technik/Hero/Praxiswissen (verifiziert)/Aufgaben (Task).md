---
tags: [technik, hero, graphql]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Aufgaben (Task), Stand 2026-07-12); Spot-Check Schema/Live bestanden 2026-07-18, Review Julian 2026-07-18
---

# HERO GraphQL API – Aufgaben (Task)

Stand: 12.07.2026, verifiziert per Live-Tests gegen die Partner-API (hero-tools).

## Kernerkenntnis: Anlegen per Upsert

Ein `create_task` existiert in der Partner-API **nicht** (Mutation-Root `PartnerMutation` per Introspection geprüft). Aber: **`update_task` ohne `id` legt eine neue Aufgabe an** (verifizierter Upsert, 12.07.2026, ids 1925771–1925776).

```graphql
mutation($task: TaskInput!) { update_task(task: $task) { id title due_date } }
```

```json
{"task": {
  "title": "Angebot kalkulieren",
  "comment": "Details ...",
  "target_project_match_id": 11057622,
  "target_user_id": 286196,
  "due_date": "2026-07-17T12:00:00+02:00"
}}
```

## Stolperfallen (verifiziert)

- **`target_user_id` ist eine User-ID, keine Partner-ID!** Marvin: User-ID **286196**, Partner-ID 134384 (Kalender nutzt Partner-IDs, Aufgaben User-IDs). Eigene User-ID per `query { user { id partner { id } } }`.
- **DateTime ohne Mikrosekunden:** `"...T09:24:51.788954+00:00"` wird abgelehnt ("Expected type DateTime"), `"...T09:24:51+00:00"` funktioniert.
- Erledigt = `update_task(task: {id, done_date})`; Löschen = `update_task(task: {id, is_deleted: true})` (Soft-Delete).
- **Erledigt-Status ist nicht rücknehmbar:** `done_date: null` wird ignoriert (null = "keine Änderung", verifiziert 12.07.2026). Wiedereröffnen = neue Aufgabe mit gleichem Inhalt anlegen und die erledigte löschen.
- Lesen: `tasks(project_match_id, is_done, show_deleted, target_user_ids, start, end)`.

## Notizen

- Tool-Anbindung: hero-tools `projekt aufgaben / aufgabe-anlegen / aufgabe-erledigt / aufgabe-loeschen`
- Teil der Hero-Anbindung des GRÜNSCHNITT-OS (Schicht 02 Technik).
