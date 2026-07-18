# absence_balance

**Typ:** Query  
**Rückgabe:** [[AbsencesBalances]]

Fetch the absence balance for given year

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `year` | `Int` | — |  |
| `partner_id` | `Int` | — |  |



## Rückgabe-Felder (`AbsencesBalances`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `budget` | `Float!` |  |
| `notSent` | `Float!` |  |
| `requestedBudget` | `Float!` |  |
| `totalApprovedBudget` | `Float!` |  |
| `availableBudget` | `Float!` |  |
| `plannedBudget` | `Float!` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*