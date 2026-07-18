# create_calendar_import

**Typ:** Mutation  
**Rückgabe:** [[CalendarImport]]

Creates an imported iCal calendar

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `calendar_import` | `CalendarImportInput` | — |  |
| `partner_ids` | `[Int]` | — |  |


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