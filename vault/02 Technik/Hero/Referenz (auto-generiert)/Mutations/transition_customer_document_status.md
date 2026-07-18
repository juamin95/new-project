# transition_customer_document_status

**Typ:** Mutation  
**Rückgabe:** [[CustomerDocument]]

Apply a user-allowed status transition to a customer document

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `document_id` | `Int!` | — |  |
| `target_status_code` | `Documents_DocumentStatusCode!` | — |  |

### Enum-Werte: `Documents_DocumentStatusCode` (für `target_status_code`)

| Wert | Beschreibung |
|------|--------------|
| `DRAFT` |  |
| `NEEDS_IMPORT` |  |
| `PROCESSING` |  |
| `PUBLISHING` |  |
| `PUBLISH_FAILED` |  |
| `PUBLISHED` |  |
| `SENT` |  |
| `RESEND` |  |
| `WON` |  |
| `REJECTED` |  |
| `REVOKED` |  |
| `DELETED` |  |


## Rückgabe-Felder (`CustomerDocument`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `nr` | `String` |  |
| `status_code` | `Int` |  |
| `type` | `String` |  |
| `document_type_id` | `Int` |  |
| `project_match_id` | `Int` |  |
| `company_id` | `Int` |  |
| `contact_id` | `Int` |  |
| `partner_id` | `Int` |  |
| `customer_invoice_id` | `Int` |  |
| `file_upload_id` | `Int` |  |
| `file_upload` | [[FileUpload\|`FileUpload`]] |  |
| `file_upload_folder_id` | `Int` |  |
| `file_upload_folder` | [[FileUploadFolder\|`FileUploadFolder`]] |  |
| `date` | `Date` |  |
| `value` | `Float` |  |
| `vat` | `Float` |  |
| `currency` | `String` |  |
| `published_customer_document_draft_id` | `Int` |  |
| `selected_document_id` | `Int` |  |
| `source` | `String` |  |
| `source_id` | `String` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `document_type` | [[Documents_DocumentType\|`Documents_DocumentType`]] |  |
| `company` | [[Company\|`Company`]] |  |
| `contact` | [[Customer\|`Customer`]] |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `project_match` | [[ProjectMatch\|`ProjectMatch`]] |  |
| `published_customer_document_draft` | [[Documents_CustomerDocumentDraft\|`Documents_CustomerDocumentDraft`]] |  |
| `status_name` | `String` |  |
| `origin_link` *(veraltet)* | `Mixed` |  |
| `document_links` | [[DocumentLink\|`[DocumentLink]`]] |  |
| `metadata` | [[CustomerDocumentMetadata\|`CustomerDocumentMetadata`]] |  |
| `localized_type` *(veraltet)* | `String` |  |
| `customer_document_booking` | [[CustomerDocumentBooking\|`CustomerDocumentBooking`]] |  |
| `booking_relevant` *(veraltet)* | `Boolean` |  |
| `link_view` | `String` |  |
| `customer` | [[Customer\|`Customer`]] |  |
| `is_gaeb` | `Boolean` |  |
| `id` | `Int` |  |
| `actions` | [[Action\|`[Action]`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*