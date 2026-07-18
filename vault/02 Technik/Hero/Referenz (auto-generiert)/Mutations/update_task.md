# update_task

**Typ:** Mutation  
**Rückgabe:** [[Task]]

Updates task for current user

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `task` | `TaskInput` | {  } |  |


### Input-Felder: `TaskInput` (für Argument `task`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `author_user_id` | `Int` | — |  |
| `company_id` | `Int` | — |  |
| `target_user_id` | `Int` | — |  |
| `title` | `String` | — |  |
| `comment` | `String` | — |  |
| `target_project_match_id` | `Int` | — |  |
| `due_date` | `DateTime` | — |  |
| `done_date` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `start` | `DateTime` | — |  |
| `end` | `DateTime` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `id` | `Int` | — |  |

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