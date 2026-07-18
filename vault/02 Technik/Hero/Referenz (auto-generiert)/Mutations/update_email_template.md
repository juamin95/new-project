# update_email_template

**Typ:** Mutation  
**Rückgabe:** [[EmailTemplate]]

Update single email template

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `email_template` | `UpdateEmailTemplateInput!` | — | Email template to update |


### Input-Felder: `UpdateEmailTemplateInput` (für Argument `email_template`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int!` | — |  |
| `name` | `String!` | — |  |
| `context` | `String!` | — |  |
| `subject` | `String!` | — |  |
| `body` | `String!` | — |  |
| `file_upload_id` | `Int!` | — |  |

## Rückgabe-Felder (`EmailTemplate`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `name` | `String` |  |
| `is_protected` | `Boolean` |  |
| `context` | `String` |  |
| `subject` | `String` |  |
| `body` | `String` |  |
| `extra` | `String` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `employee_id` | `Int` |  |
| `company_id` | `Int` |  |
| `file_upload_id` | `Int` |  |
| `deleted` | `Boolean` |  |
| `company` | [[Company\|`Company`]] |  |
| `file_upload` | [[FileUpload\|`FileUpload`]] |  |
| `recipient` | `String` |  |
| `id` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*