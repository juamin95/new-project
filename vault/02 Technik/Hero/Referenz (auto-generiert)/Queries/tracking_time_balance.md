# tracking_time_balance

**Typ:** Query  
**Rückgabe:** [[Employees_TimeTrackingBalance]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `start` | `Date` | — | calculates kpi for tracked times after this date |
| `end` | `Date` | — | calculates kpi for tracked times before this date |
| `partner_id` | `Int` | — | calculates kpi for a specific partner |



## Rückgabe-Felder (`Employees_TimeTrackingBalance`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `expected` | `Int` |  |
| `requested` | `Int` |  |
| `confirmed` | `Int` |  |
| `absent` | `Int` |  |
| `overtime` | `Int` |  |
| `total` | `Int` |  |
| `waiting_for_confirmation` | `Int` |  |
| `not_sent` | `Int` |  |
| `total_unconfirmed` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*