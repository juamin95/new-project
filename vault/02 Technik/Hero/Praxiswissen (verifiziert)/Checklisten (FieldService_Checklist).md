---
tags: [technik, hero, graphql]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Checklisten (FieldService_Checklist), Stand 2026-07-12); Spot-Check Schema/Live bestanden 2026-07-18, Review Julian 2026-07-18
---

# HERO GraphQL API – Checklisten (FieldService_Checklist)

Stand: 12.07.2026, verifiziert per Live-Tests (hero-tools) und Format-Abgleich mit einer UI-erstellten Checkliste.

## Operationen

- Lesen: `project_match_checklists(project_match_id)` → id, name, status, data, partner
- Anlegen: `create_field_service_checklist(project_match_id, checklist: FieldService_ChecklistInput)`
- Ändern: `update_field_service_checklist(checklist: {id, data, ...})`
- Löschen: `delete_checklist(id)`

## KRITISCH: Das data-Format

Das `data`-JSON wird serverseitig strikt validiert — **unbekannte Strukturen werden still zu `[]` normalisiert** (kein Fehler!). Verifiziertes Format:

```json
{
  "entries": [
    {
      "uuid": "58e44c23-03c6-49e1-adce-899ec17396a7",
      "label": "Material bestellen",
      "value": { "is_checked": false },
      "type": "checkbox"
    },
    {
      "uuid": "c828e6c3-...",
      "label": "Wie ist der Zustand der Anlage?",
      "value": { "is_checked": false, "text": "" },
      "type": "text"
    }
  ]
}
```

- Zwei Elementtypen (entsprechen der UI): `checkbox` (Haken) und `text` (Eingabefeld mit `value.text`)
- `uuid` ist Pflicht je Entry; frei wählbar (UUID4 verwenden), die UI generiert eigene Kürzel
- Abhaken/Befüllen = `update_field_service_checklist` mit komplettem `data` (Entry per `uuid` identifizieren, `is_checked`/`text` setzen)
- `status`: "open" → "filled" (setzt die UI beim Ausfüllen)
- `partner_id` = zugewiesener Mitarbeiter (Partner-ID, z. B. Marvin 134384 — anders als Aufgaben, siehe [[Aufgaben (Task)]])

## Notizen

- Tool-Anbindung: hero-tools `projekt checklisten / checkliste-anlegen / checkliste-befuellen / checkliste-loeschen`
- Einsatz im [[Prozess Bauprojekt End-to-End]]: Umsetzungs-Checklisten (B5/B6), künftig Aufmaß-Checklisten je Projektkategorie (Backlog)
