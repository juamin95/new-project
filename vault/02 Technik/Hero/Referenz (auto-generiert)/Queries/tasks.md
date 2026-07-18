# tasks

**Typ:** Query  
**Rückgabe:** [[Task]]

Find tasks

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `project_match_id` | `Int` | — | Fetch tasks for a specific project |
| `start` | `DateTime` | — | Only return events that happen after this timestamp |
| `end` | `DateTime` | — | Only return events that happen before this timestamp |
| `is_done` | `Boolean` | — | Only return done or undone events |
| `show_deleted` | `Boolean` | — | Also return deleted tasks |
| `ids` | `[Int]` | — | Filter by a set of IDs |
| `target_user_ids` | `[Int]` | — | Filter by a set of target user IDs |
| `author_user_ids` | `[Int]` | — | Filter by a set of author user IDs |



## Rückgabe-Felder (`Task`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `author_user_id` | `Int` |  |
| `author` | [[User\|`User`]] |  |
| `company_id` | `Int` |  |
| `target_user_id` | `Int` |  |
| `target_user` | [[User\|`User`]] |  |
| `title` | `String` |  |
| `comment` | `String` |  |
| `target_project_match_id` | `Int` |  |
| `target_project_match` | [[ProjectMatch\|`ProjectMatch`]] |  |
| `due_date` | `DateTime` |  |
| `done_date` | `DateTime` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `start` | `DateTime` |  |
| `end` | `DateTime` |  |
| `ephemeral_id` *(veraltet)* | `Mixed` |  |
| `is_deleted` | `Boolean` |  |
| `id` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*