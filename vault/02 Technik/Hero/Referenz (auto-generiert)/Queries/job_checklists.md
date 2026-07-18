# job_checklists

**Typ:** Query  
**Rückgabe:** [[FieldService_Checklist]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `job_id` | `Int` | — | Fetch checklists for a specific job |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



## Rückgabe-Felder (`FieldService_Checklist`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `company_id` | `Int` |  |
| `field_service_job_id` | `Int` |  |
| `project_match_id` | `Int` |  |
| `author_partner_id` | `Int` |  |
| `author_partner` *(veraltet)* | `Mixed` |  |
| `partner_id` | `Int` |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `status` | `String` |  |
| `name` | `String` |  |
| `data` | `JSON` |  |
| `created` | `DateTime` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*