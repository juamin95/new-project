# bookaccounts

**Typ:** Query  
**Rückgabe:** [[Accounting_BookAccount]]

Query bookaccounts

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `ids` | `[Int]` | — | Filter by ids |
| `name` | `String` | — | Filter by name |
| `type` | `String` | — | Filter by type |



## Rückgabe-Felder (`Accounting_BookAccount`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `name` | `String` |  |
| `type` | `String` |  |
| `skr03_number` | `Int` |  |
| `skr04_number` | `Int` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*