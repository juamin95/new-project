# create_absence

**Typ:** Mutation  
**Rückgabe:** [[Employees_Absence]]

Creates an absence

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `absence` | `Employees_AbsenceInput` | {  } |  |


### Input-Felder: `Employees_AbsenceInput` (für Argument `absence`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `start` | `Date!` | — |  |
| `end` | `Date!` | — |  |
| `type` | `Employees_AbsenceTypeEnum!` | — |  |
| `status` | `Employees_AbsenceStatusEnum!` | — |  |
| `start_budget` | `Employees_AbsenceBudgetTypeEnum!` | — |  |
| `end_budget` | `Employees_AbsenceBudgetTypeEnum!` | — |  |
| `comment` | `String` | — |  |
| `file_upload_uuid` | `String` | — |  |

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