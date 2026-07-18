# project_leads

**Typ:** Query  
**Rückgabe:** [[Leads_ProjectLead]]

> **Veraltet:** Leads are no longer available on the platform



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `ids` | `[Int]` | — | Filter by a set of IDs |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



## Rückgabe-Felder (`Leads_ProjectLead`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `project_id` | `Int` |  |
| `display_id` | `String` |  |
| `created` | `DateTime` |  |
| `customer_name` | `String` |  |
| `zipcode` | `String` |  |
| `city` | `String` |  |
| `anonymized_address` | `String` |  |
| `measure` | [[Measure\|`Measure`]] |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `marked_company` | `Boolean` |  |
| `project_nr` | `String` |  |
| `partner_notes` | `String` |  |
| `modified` | `DateTime` |  |
| `file_uploads` | [[FileUpload\|`[FileUpload]`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*