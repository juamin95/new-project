# add_field_service_job_assignment

**Typ:** Mutation  
**Rückgabe:** [[FieldService_Job]]

Add assigned employee to a job

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `job_id` | `Int` | — |  |
| `partner_id` | `Int` | — |  |



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