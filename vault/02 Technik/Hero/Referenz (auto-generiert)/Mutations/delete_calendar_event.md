# delete_calendar_event

**Typ:** Mutation  
**Rückgabe:** [[CalendarEvent]]

Delete calendar_event

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `id` | `Int` | — |  |



## Rückgabe-Felder (`CalendarEvent`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `category` | [[CalendarEventCategory\|`CalendarEventCategory`]] |  |
| `category_id` | `Int` |  |
| `project_match` | [[ProjectMatch\|`ProjectMatch`]] |  |
| `project_match_id` | `Int` |  |
| `title` | `String` |  |
| `description` | `String` |  |
| `start` | `DateTime` |  |
| `end` | `DateTime` |  |
| `all_day` | `Boolean` |  |
| `deleted` | `Boolean` |  |
| `color` | `String` |  |
| `partners` | [[Partner\|`[Partner]`]] |  |
| `resources` | [[CompanyResource\|`[CompanyResource]`]] |  |
| `is_done` | `Boolean` |  |
| `is_recurring` | `Boolean` |  |
| `provider` | `String` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `type` *(veraltet)* | `String` |  |
| `localized_type` *(veraltet)* | `String` |  |
| `url` *(veraltet)* | `String` |  |
| `full_address` *(veraltet)* | `String` |  |
| `title_lines` *(veraltet)* | `[String]` |  |
| `partner_id` *(veraltet)* | `Int` |  |
| `readonly` | `Boolean` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*