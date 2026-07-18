# unreadNotifications

**Typ:** Mutation  
**Rückgabe:** [[TopNavigationNotification]]

Mark notifications as unread

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `ids` | `[Int]` | — | Set of notification IDs to mark as unread |



## Rückgabe-Felder (`TopNavigationNotification`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `is_read` | `Boolean!` |  |
| `id` | `Int!` |  |
| `body` | `String!` |  |
| `created` | `String!` |  |
| `title` | `String!` |  |
| `url` | `String!` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*