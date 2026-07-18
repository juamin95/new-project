# costcenters

**Typ:** Query  
**Rückgabe:** [[Accounting_CostCenter]]

Query the cost centers

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `ids` | `[Int]` | — | The ids of the cost centers |
| `number` | `String` | — | The number of the cost center |
| `skr_number` | `Int` | — | The skr number of the cost center |



## Rückgabe-Felder (`Accounting_CostCenter`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `name` | `String` |  |
| `number` | `String` |  |
| `color` | `String` |  |
| `company` | [[Company\|`Company`]] |  |
| `skr_number` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*