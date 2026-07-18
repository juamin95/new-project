# webhooks

**Typ:** Query  
**Rückgabe:** [[Webhooks_Webhook]]

Find configured webhooks

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `providers` | `[String]` | — | Filter by providers. |
| `ids` | `[Int]` | — | Filter by a set of IDs |



## Rückgabe-Felder (`Webhooks_Webhook`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `name` | `String` |  |
| `webhook_trigger` | `String` |  |
| `target_url` | `String` |  |
| `token` | `String` |  |
| `is_active` | `Boolean` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*