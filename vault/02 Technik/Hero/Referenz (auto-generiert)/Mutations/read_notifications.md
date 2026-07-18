# read_notifications

**Typ:** Mutation  
**Rückgabe:** [[Notification]]

Mark notifications as read

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `ids` | `[Int]` | — | Set of notification IDs to mark as read |



## Rückgabe-Felder (`Notification`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `user_id` | `Int` |  |
| `title` | `String` |  |
| `body` | `String` |  |
| `collapse` | `String` |  |
| `target` | `String` |  |
| `target_id` | `Int` |  |
| `is_read` | `Boolean` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `id` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*