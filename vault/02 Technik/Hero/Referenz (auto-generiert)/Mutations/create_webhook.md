# create_webhook

**Typ:** Mutation  
**Rückgabe:** [[Webhooks_Webhook]]

Create a new webhook

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `webhook` | `Webhooks_CreateWebhookInput` | — |  |


### Input-Felder: `Webhooks_CreateWebhookInput` (für Argument `webhook`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `name` | `String` | — |  |
| `webhook_trigger` | `String` | — |  |
| `target_url` | `String` | — |  |
| `token` | `String` | — |  |

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