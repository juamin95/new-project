# field_service_checklist_templates

**Typ:** Query  
**Rückgabe:** [[FieldService_ChecklistTemplate]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `ids` | `[Int]` | — | Fetch checklist templates by its ID's |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



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