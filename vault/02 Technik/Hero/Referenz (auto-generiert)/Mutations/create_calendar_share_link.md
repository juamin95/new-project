# create_calendar_share_link

**Typ:** Mutation  
**Rückgabe:** [[CalendarShareLink]]

creates an iCal link

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `categories` | `CalendarCategoryEnum` | all |  |
| `events` | `CalendarEventSelection` | own |  |

### Enum-Werte: `CalendarCategoryEnum` (für `categories`)

| Wert | Beschreibung |
|------|--------------|
| `all` |  |
| `events_jobs` |  |
| `events` |  |
| `jobs` |  |
| `absences` |  |

### Enum-Werte: `CalendarEventSelection` (für `events`)

| Wert | Beschreibung |
|------|--------------|
| `own` |  |
| `all` |  |


## Rückgabe-Felder (`CalendarShareLink`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `id` | `Int` |  |
| `token` | `String` |  |
| `calendar_url` | `String` |  |
| `webcal_url` | `String` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*