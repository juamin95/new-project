# send_mail

**Typ:** Mutation  
**Rückgabe:** [[OutboxMail]]

Sends an e-mail

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `email` | `EmailInput` | — |  |


### Input-Felder: `EmailInput` (für Argument `email`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `context` | `String!` | — |  |
| `context_id` | `Int!` | — |  |
| `recipient_email` | `String!` | — |  |
| `subject` | `String` | — |  |
| `body` | `String` | — |  |
| `uuids` | `[String]` | — |  |

## Rückgabe-Felder (`OutboxMail`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `sender` | `String` |  |
| `recipient` | `String` |  |
| `cc` | `String` |  |
| `bcc` | `String` |  |
| `history` | [[History\|`History`]] |  |
| `subject` | `String` |  |
| `body` | `String` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*