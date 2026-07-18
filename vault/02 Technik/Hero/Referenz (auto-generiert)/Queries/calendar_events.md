# calendar_events

**Typ:** Query  
**Rückgabe:** [[CalendarEvent]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `start` | `DateTime` | — | Only return events that happen after this timestamp |
| `end` | `DateTime` | — | Only return events that happen before this timestamp |
| `project_match_id` | `Int` | — | Fetch events for a specific project |
| `partner_ids` | `[Int]` | — | Fetch events for specific partners |
| `resource_ids` | `[Int]` | — | Fetch events for specific resources |
| `show_deleted` | `Boolean` | false | Return deleted calendar events |
| `ids` | `[Int]` | — | Filter by a set of IDs |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



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