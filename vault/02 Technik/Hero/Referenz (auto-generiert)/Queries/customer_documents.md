# customer_documents

**Typ:** Query  
**Rückgabe:** [[CustomerDocument]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `ids` | `[Int]` | — | Filter by a set of IDs |
| `file_upload_folder_ids` | `[Int]` | — | Filter by a set of folder IDs |
| `document_type_ids` | `[Int]` | — | Filter by a set of document type IDs |
| `project_match_ids` | `[Int]` | — | Filter by a set of project match IDs |
| `status_codes` | `[Int]` | — | Filter by a set of status codes |
| `invoice_style` | `InvoiceStyle` | — | Filter by invoice style (e.g. "parted", "full", "cumulative", "downpayment") |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |

### Enum-Werte: `InvoiceStyle` (für `invoice_style`)

| Wert | Beschreibung |
|------|--------------|
| `parted` |  |
| `full` |  |
| `cumulative` |  |
| `downpayment` |  |


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