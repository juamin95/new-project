# submit_document_signature

**Typ:** Mutation  
**Rückgabe:** [[Documents_CustomerDocumentDraft]]

Sign an existing document

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `document_id` | `Int` | — |  |
| `signature_node` | `Documents_SignatureNodeInput` | — |  |


### Input-Felder: `Documents_SignatureNodeInput` (für Argument `signature_node`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `uid` | `String` | — |  |
| `type` | `String` | — |  |
| `title` | `String` | — |  |
| `mime` | `String` | — |  |
| `signatureDate` | `String` | — |  |
| `signature` | `String` | — |  |

## Rückgabe-Felder (`Documents_CustomerDocumentDraft`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `customer_document_id` | `Int` |  |
| `customer_document` | [[CustomerDocument\|`CustomerDocument`]] |  |
| `type` | `String` |  |
| `document_type_id` | `Int` |  |
| `name` | `String` |  |
| `status_code` | `Int` |  |
| `nr` | `String` |  |
| `date` | `Date` |  |
| `value` | `Float` |  |
| `data` | `Mixed` |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `partner_id` | `Int` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `is_protected` | `Boolean` |  |
| `description` | `String` |  |
| `deleted` | `Boolean` |  |
| `id` | `Int` |  |
| `customer_invoice_id` *(veraltet)* | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*