# field_service_jobs

**Typ:** Query  
**Rückgabe:** [[FieldService_Job]]

Note: partner_id argument is deprecated.

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `project_match_id` | `Int` | — | Fetch jobs for a specific project |
| `partner_id` | `Int` | — | Fetch jobs assigned to a specific partner. This argument ist deprecated and will be removed in a later version. |
| `start` | `DateTime` | — | Only return jobs that happen after this timestamp |
| `end` | `DateTime` | — | Only return jobs that happen before this timestamp |
| `status` | `[Int]` | — | Filter by a set of StatusCodes |
| `partners` | `[Int]` | — | Filter by partners |
| `contact_id` | `Int` | — | Filter for customer and contact |
| `search` | `String` | — | Filter by searchstring |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



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