# tracking_times_categories

**Typ:** Query  
**Rückgabe:** [[Employees_TrackingTimesCategory]]

Find categories for time tracking entries

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `is_working_time` | `Boolean` | — | Filter by working time categories |
| `is_active` | `Boolean` | true | Filter by active categories |
| `is_protected` | `Boolean` | — | Filter by protected categories |
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



## Rückgabe-Felder (`Employees_TrackingTimesCategory`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `name` | `String` |  |
| `description` | `String` |  |
| `internal_name` | `String` |  |
| `is_working_time` | `Boolean` |  |
| `is_active` | `Boolean` |  |
| `is_protected` | `Boolean` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*