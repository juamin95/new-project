# notifications

**Typ:** Query  
**Rückgabe:** [[Notification]]

Find notifications

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



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