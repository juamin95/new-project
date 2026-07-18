# create_project_type

**Typ:** Mutation  
**Rückgabe:** [[ProjectType]]

Creates a new project type

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `project_type` | `ProjectTypeInput` | {  } |  |


### Input-Felder: `ProjectTypeInput` (für Argument `project_type`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `is_default` | `Boolean` | — |  |
| `is_active` | `Boolean` | — |  |
| `name` | `String` | — |  |
| `name_plural` | `String` | — |  |
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |

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