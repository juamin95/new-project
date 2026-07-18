# update_field_service_job

**Typ:** Mutation  
**Rückgabe:** [[FieldService_Job]]

Updates job for current user

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `job` | `FieldService_JobInput` | {  } |  |


### Input-Felder: `FieldService_JobInput` (für Argument `job`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `company_id` | `Int` | — |  |
| `customer_id` | `Int` | — |  |
| `contact_id` | `Int` | — |  |
| `project_match_id` | `Int` | — |  |
| `address_id` | `Int` | — |  |
| `type` | `String` | — |  |
| `status_code` | `Int` | — |  |
| `start` | `DateTime` | — |  |
| `end` | `DateTime` | — |  |
| `title` | `String` | — |  |
| `description` | `String` | — |  |
| `created` | `DateTime` | — |  |
| `localized_type` | `String` | — |  |
| `status_name` | `String` | — |  |
| `display_nr` | `String` | — |  |
| `id` | `Int` | — |  |
| `modified` | `DateTime` | — |  |
| `partners` | `[Int]` | — |  |
| `service_object_id` | `Int` | — |  |

## Rückgabe-Felder (`FieldService_Job`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `company_id` | `Int` |  |
| `company` | [[Company\|`Company`]] |  |
| `partners` | [[Partner\|`[Partner]`]] |  |
| `customer_id` | `Int` |  |
| `customer` | [[Customer\|`Customer`]] |  |
| `contact_id` | `Int` |  |
| `contact` | [[Customer\|`Customer`]] |  |
| `project_match_id` | `Int` |  |
| `project_match` | [[ProjectMatch\|`ProjectMatch`]] |  |
| `address_id` | `Int` |  |
| `address` | [[Address\|`Address`]] |  |
| `histories` | [[History\|`[History]`]] |  |
| `checklists` | [[FieldService_Checklist\|`[FieldService_Checklist]`]] |  |
| `file_uploads` | [[FileUpload\|`[FileUpload]`]] |  |
| `documents` | [[CustomerDocument\|`[CustomerDocument]`]] |  |
| `type` | `String` |  |
| `status_code` | `Int` |  |
| `start` | `DateTime` |  |
| `end` | `DateTime` |  |
| `title` | `String` |  |
| `description` | `String` |  |
| `created` | `DateTime` |  |
| `localized_type` | `String` |  |
| `status_name` | `String` |  |
| `display_nr` | `String` |  |
| `tracking_times` | [[Employees_TrackingTime\|`[Employees_TrackingTime]`]] |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `field_service_checklists` | [[FieldService_Checklist\|`[FieldService_Checklist]`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*