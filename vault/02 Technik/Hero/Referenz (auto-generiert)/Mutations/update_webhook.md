# update_webhook

**Typ:** Mutation  
**Rückgabe:** [[Webhooks_Webhook]]

Update a webhook

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `webhook` | `Webhooks_UpdateWebhookInput` | — |  |


### Input-Felder: `Webhooks_UpdateWebhookInput` (für Argument `webhook`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int!` | — |  |
| `name` | `String` | — |  |
| `webhook_trigger` | `String` | — |  |
| `target_url` | `String` | — |  |
| `token` | `String` | — |  |
| `is_active` | `Boolean` | — |  |

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