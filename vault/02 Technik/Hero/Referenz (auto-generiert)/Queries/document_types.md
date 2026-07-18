# document_types

**Typ:** Query  
**Rückgabe:** [[Documents_DocumentType]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `ids` | `[Int!]` | — | Filter by a set of IDs |
| `show_deleted` | `Boolean` | — | Also return deleted entities |
| `user_write_allowed` | `Boolean` | — | Filters for DocumentTypes which the user is allowed to write |
| `base_types` | `[String]` | — | Filter by a set of base types |
| `context` | `String` | — | Filter by base type context, such as "upload" |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



## Rückgabe-Felder (`Documents_DocumentType`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `name` | `String` |  |
| `is_active` | `Boolean` |  |
| `base_type` | `String` |  |
| `options` | [[CustomerDocumentLayoutOption\|`CustomerDocumentLayoutOption`]] |  |
| `booking_relevant` | `Boolean` |  |
| `has_payment_relevance_status` | `Boolean` |  |
| `file_upload_folder_id` | `Int` |  |
| `number_range_id` | `Int` |  |
| `parent_document_type_id` | `Int` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `context` | `[String]` |  |
| `has_total_price` | `Boolean` |  |
| `user_allowed` | `Boolean` |  |
| `user_write_allowed` | `Boolean` |  |
| `has_valid_payment_setup` | `Boolean` |  |
| `next_number` | `String` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*