# email_template

**Typ:** Query  
**Rückgabe:** [[EmailTemplate]]

Find single email template

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `email_template_id` | `Int` | — |  |



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