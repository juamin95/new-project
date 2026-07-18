# absence_budget

**Typ:** Query  
**Rückgabe:** [[Employees_Absence]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `start` | `Date!` | — | Start date |
| `end` | `Date!` | — | End date |
| `type` | `Employees_AbsenceTypeEnum!` | — | Absence type |
| `start_budget` | `Employees_AbsenceBudgetTypeEnum` | full_day |  |
| `end_budget` | `Employees_AbsenceBudgetTypeEnum` | full_day |  |

### Enum-Werte: `Employees_AbsenceTypeEnum` (für `type`)

| Wert | Beschreibung |
|------|--------------|
| `parental_leave` |  |
| `sick_child` |  |
| `sick` |  |
| `sick_note_once` |  |
| `sick_note_multiple` |  |
| `maternity` |  |
| `paid_special_leave` |  |
| `overtime_compensation` |  |
| `unpaid_leave` |  |
| `vacation` |  |

### Enum-Werte: `Employees_AbsenceBudgetTypeEnum` (für `start_budget`)

| Wert | Beschreibung |
|------|--------------|
| `full_day` |  |
| `half_day` |  |


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