# project_matches

**Typ:** Query  
**Rückgabe:** [[ProjectMatch]]

Find projects

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `type` | `String` | — | Filter by project type (copcontact|project) |
| `ids` | `[Int]` | — | Filter by a set of IDs |
| `customer_id` | `Int` | — | Filter by customer ID |
| `search` | `String` | — | Filter by a search query |
| `statuses` | `[Int]` | — | Filter by status codes |
| `step_ids` | `[Int]` | — | Filter by set of step IDs |
| `assigned_user_ids` | `[Int]` | — | Filter by set of assigned user IDs |
| `relative_id` | `String` | — | Filter by relative ID. Also accepts relative IDs with a prefix (e.g. "UNB-123") aka `project_nr` but ignores the prefix for filtering. |
| `type_ids` | `[Int]` | — | Filter by set of type IDs |
| `measure_ids` | `[Int]` | — | Filter by set of measure IDs |
| `overdue` | `Boolean` | — | Filter for overdue projects (maturity_date <= today OR marked_company = true, excluding marked_later and completed projects) |



## Rückgabe-Felder (`ProjectMatch`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `project_type` | `String` |  |
| `measure_id` | `Int` |  |
| `measure` | [[Measure\|`Measure`]] |  |
| `customer_id` | `Int` |  |
| `customer` | [[Customer\|`Customer`]] |  |
| `address_id` | `Int` |  |
| `address` | [[Address\|`Address`]] |  |
| `company_id` | `Int` |  |
| `company_branch_id` | `Int` |  |
| `partner_id` | `Int` |  |
| `current_project_match_status_id` | `Int` |  |
| `marked_company` | `Boolean` |  |
| `marked_later` | `Boolean` |  |
| `company_branch` | [[CompanyBranch\|`CompanyBranch`]] |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `current_project_match_status` | [[ProjectMatchStatus\|`ProjectMatchStatus`]] |  |
| `project_match_statuses` | [[ProjectMatchStatus\|`[ProjectMatchStatus]`]] |  |
| `file_uploads` | [[FileUpload\|`[FileUpload]`]] |  |
| `customer_documents` | [[CustomerDocument\|`[CustomerDocument]`]] |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `histories` | [[History\|`[History]`]] |  |
| `contact` | [[Customer\|`Customer`]] |  |
| `contact_id` | `Int` |  |
| `project_match_assignments` | [[ProjectMatchAssignment\|`[ProjectMatchAssignment]`]] |  |
| `name` | `String` |  |
| `partner_source` | `String` |  |
| `relative_id` | `Int` |  |
| `partner_notes` | `String` |  |
| `display_id` | `String` |  |
| `project_nr` | `String` |  |
| `project` | [[Project\|`Project`]] |  |
| `volume` | `Float` |  |
| `project_title` | `String` |  |
| `is_deleted` | `Boolean` |  |
| `project_id` | `Int` |  |
| `id` | `Int` |  |
| `available_actions` | [[ProjectMatchAction\|`[ProjectMatchAction]`]] |  |
| `ppl_price` *(veraltet)* | `Float` |  |
| `type` | [[ProjectType\|`ProjectType`]] |  |
| `type_id` | `Int` |  |
| `custom_fields_searchable` | [[SearchableValue\|`SearchableValue`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*