# create_field_service_checklist

**Typ:** Mutation  
**Rückgabe:** [[FieldService_Checklist]]

Updates given checklist

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `job_id` | `Int` | — |  |
| `project_match_id` | `Int` | — |  |
| `checklist` | `FieldService_ChecklistInput` | {  } |  |


### Input-Felder: `FieldService_ChecklistInput` (für Argument `checklist`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `company_id` | `Int` | — |  |
| `field_service_job_id` | `Int` | — |  |
| `project_match_id` | `Int` | — |  |
| `author_partner_id` | `Int` | — |  |
| `partner_id` | `Int` | — |  |
| `status` | `String` | — |  |
| `name` | `String` | — |  |
| `data` | `JSON` | — |  |
| `created` | `DateTime` | — |  |
| `id` | `Int` | — |  |
| `modified` | `DateTime` | — |  |

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