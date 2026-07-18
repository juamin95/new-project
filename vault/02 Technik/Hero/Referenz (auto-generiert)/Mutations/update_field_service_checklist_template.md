# update_field_service_checklist_template

**Typ:** Mutation  
**Rückgabe:** [[FieldService_ChecklistTemplate]]

Updates given checklist template

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `checklist_template` | `FieldService_ChecklistTemplateInput` | {  } |  |


### Input-Felder: `FieldService_ChecklistTemplateInput` (für Argument `checklist_template`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `name` | `String` | — |  |
| `description` | `String` | — |  |
| `data` | `JSON` | — |  |

## Rückgabe-Felder (`FieldService_ChecklistTemplate`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `name` | `String` |  |
| `description` | `String` |  |
| `data` | `JSON` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*