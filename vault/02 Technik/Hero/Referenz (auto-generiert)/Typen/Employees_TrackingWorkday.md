# Employees_TrackingWorkday

**Art:** OBJECT

## Felder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `date` | `Date` |  |
| `partner_id` | `Int` |  |
| `status_code` | `Int` |  |
| `daily_target` | `Int` |  |
| `worked_time` | `Int` |  |
| `break_time` | `Int` |  |
| `overtime` | `Int` |  |
| `tracking_times` | [[Employees_TrackingTimes\|`[Employees_TrackingTimes]`]] |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `start` | `DateTime` | The start date of the first tracking time. |
| `end` | `DateTime` | The end date of the last tracking time. |
| `is_break_rule_violated` | `Boolean` | Indicates whether the break rule is violated for this workday. |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*