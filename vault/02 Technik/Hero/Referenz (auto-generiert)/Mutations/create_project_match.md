# create_project_match

**Typ:** Mutation  
**Rückgabe:** [[ProjectMatch]]

Creates a new project

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `project_match` | `ProjectMatchInput` | {  } |  |
| `manual_assigned_user_ids` | `[Int]` | [] | Users that are manually assigned to the project match |


### Input-Felder: `ProjectMatchInput` (für Argument `project_match`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `project_type` | `String` | — |  |
| `measure_id` | `Int` | — |  |
| `customer_id` | `Int` | — |  |
| `address_id` | `Int` | — |  |
| `company_id` | `Int` | — |  |
| `company_branch_id` | `Int` | — |  |
| `partner_id` | `Int` | — |  |
| `current_project_match_status_id` | `Int` | — |  |
| `marked_company` | `Boolean` | — |  |
| `marked_later` | `Boolean` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `contact_id` | `Int` | — |  |
| `name` | `String` | — |  |
| `partner_source` | `String` | — |  |
| `relative_id` | `Int` | — |  |
| `partner_notes` | `String` | — |  |
| `display_id` | `String` | — |  |
| `project_nr` | `String` | — |  |
| `volume` | `Float` | — |  |
| `project_title` | `String` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `project_id` | `Int` | — |  |
| `id` | `Int` | — |  |
| `current_project_match_status` | `ProjectMatchStatusInput` | — |  |
| `contact` | `CustomerInput` | — |  |
| `type_id` | `Int` | — |  |
| `step_id` | `Int` | — |  |

#### `ProjectMatchStatusInput` (Untertyp von `current_project_match_status`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `status_code` | `Int` | — |  |
| `maturity_date` | `DateTime` | — |  |
| `maturity_time` | `Mixed` | — |  |
| `previous_project_match_status_id` | `Int` | — |  |
| `show_as_skipped` | `Boolean` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `name` | `String` | — |  |
| `short_name` | `String` | — |  |
| `step_id` | `Int` | — |  |
| `id` | `Int` | — |  |

#### `CustomerInput` (Untertyp von `contact`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `user_id` | `Int` | — |  |
| `type` | `String` | — |  |
| `title` | `String` | — |  |
| `title_custom` | `String` | — |  |
| `first_name` | `String` | — |  |
| `last_name` | `String` | — |  |
| `company_name` | `String` | — |  |
| `company_legal_form` | `String` | — |  |
| `phone_home` | `String` | — |  |
| `phone_mobile` | `String` | — |  |
| `phone_fax` | `String` | — |  |
| `url` | `String` | — |  |
| `address_id` | `Int` | — |  |
| `reachability` | `Int` | — |  |
| `source` | `String` | — |  |
| `position` | `String` | — |  |
| `category` | `String` | — |  |
| `company_id` | `Int` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `nr` | `String` | — |  |
| `parent_customer_id` | `Int` | — |  |
| `email` | `String` | — |  |
| `offer_options` | `JSON` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `full_name` | `String` | — |  |
| `phone_home_formatted` | `String` | — |  |
| `phone_mobile_formatted` | `String` | — |  |
| `is_invoice_recipient` | `Boolean` | — |  |
| `reachability_string` | `String` | — |  |
| `initial_name` | `String` | — |  |
| `category_name` | `String` | — |  |
| `contact_match_id` | `Int` | — |  |
| `is_contact_person` | `Boolean` | — |  |
| `id` | `Int` | — |  |
| `address` | `AddressInput` | — |  |
| `partner_notes` | `String` | — |  |
| `birth_date` | `Date` | — |  |

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