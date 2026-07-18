# project_types

**Typ:** Query  
**Rückgabe:** [[ProjectType]]

Get all active project pipeline types

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `ids` | `[Int]` | — | Filter by a set of IDs |
| `is_active` | `Boolean` | — | Filter by active/inactive project types |



## Rückgabe-Felder (`ProjectType`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `company` | [[Company\|`Company`]] |  |
| `project_status_steps` | [[ProjectStatusStep\|`[ProjectStatusStep]`]] |  |
| `is_default` | `Boolean` |  |
| `is_active` | `Boolean` |  |
| `name` | `String` |  |
| `name_plural` | `String` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*