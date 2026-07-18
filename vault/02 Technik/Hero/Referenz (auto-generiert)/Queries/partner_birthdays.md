# partner_birthdays

**Typ:** Query  
**Rückgabe:** [[Employees_PartnerBirthday]]

Returns the list of the next upcoming birthdays

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `nextDays` | `Int` | — | Next X Days |
| `orderBy` | `String` | "next_birthday" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



## Rückgabe-Felder (`Employees_PartnerBirthday`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `partner_id` | `Int` |  |
| `company_id` | `Int` |  |
| `next_birthday` | `Date` |  |
| `partner` | [[Partner\|`Partner`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*