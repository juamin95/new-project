# update_calendar_import

**Typ:** Mutation  
**Rückgabe:** [[CalendarImport]]

Update a calendar_import

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `calendar_import` | `CalendarImportInput` | — |  |


### Input-Felder: `CalendarImportInput` (für Argument `calendar_import`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `uid` | `String` | — |  |
| `title` | `String!` | — |  |
| `resource` | `String!` | — |  |
| `url` | `String!` | — |  |
| `is_hidden` | `Boolean` | — |  |
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |

## Rückgabe-Felder (`CalendarImport`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `uid` | `String` |  |
| `title` | `String` |  |
| `resource` | `String` |  |
| `url` | `String` |  |
| `is_hidden` | `Boolean` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*