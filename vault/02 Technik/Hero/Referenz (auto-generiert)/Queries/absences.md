# absences

**Typ:** Query  
**Rückgabe:** [[Employees_Absence]]

Get a list of filtered absences for the current user

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `start` | `Date` | — | Only return events that happen after this date (default: today - 3 months) |
| `end` | `Date` | — | Only return events that happen before this date (default: today + 3 months) |
| `ids` | `[Int]` | — | Filter by a set of IDs |
| `show_all_partners` | `Boolean` | — | If false return own absences only, return absences of all partners on true. |
| `partner_ids` | `[Int]` | — | Filter by a set of parent IDs; only if show_all_partners is true. |
| `statuses` | `[Employees_AbsenceStatusEnum]` | — | Filter by status codes |

### Enum-Werte: `Employees_AbsenceStatusEnum` (für `statuses`)

| Wert | Beschreibung |
|------|--------------|
| `draft` |  |
| `submitted` |  |
| `approved` |  |
| `rejected` |  |
| `deleted` |  |


## Rückgabe-Felder (`Employees_Absence`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `type` | [[Employees_AbsenceTypeEnum\|`Employees_AbsenceTypeEnum`]] |  |
| `comment` | `String` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `company_id` | `Int` |  |
| `company` | [[Company\|`Company`]] |  |
| `partner_id` | `Int` |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `start` | `Date` |  |
| `end` | `Date` |  |
| `file_upload` | [[FileUpload\|`FileUpload`]] |  |
| `id` | `Int` |  |
| `status` | [[Employees_AbsenceStatusEnum\|`Employees_AbsenceStatusEnum`]] |  |
| `start_budget` | [[Employees_AbsenceBudgetTypeEnum\|`Employees_AbsenceBudgetTypeEnum`]] |  |
| `end_budget` | [[Employees_AbsenceBudgetTypeEnum\|`Employees_AbsenceBudgetTypeEnum`]] |  |
| `budget` | `Float` |  |
| `duration` | `Float` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*