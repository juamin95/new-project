# project_match

**Typ:** Query  
**Rückgabe:** [[ProjectMatch]]

Find single project

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `project_match_id` | `Int` | — |  |



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