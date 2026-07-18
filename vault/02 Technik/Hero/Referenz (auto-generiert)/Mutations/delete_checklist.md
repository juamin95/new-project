# delete_checklist

**Typ:** Mutation  
**Rückgabe:** [[FieldService_Checklist]]

Delete a checklist

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `checklist_id` | `Int` | — |  |



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