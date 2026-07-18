# holidays

**Typ:** Query  
**Rückgabe:** [[Holiday]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `start` | `Date` | — | Start date |
| `end` | `Date` | — | End date |
| `state_ids` | `[Int]` | — | State ID |



## Rückgabe-Felder (`Holiday`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `date` | `Date` |  |
| `name` | `String` |  |
| `description` | `String` |  |
| `holiday` | `Boolean` |  |
| `state_id` | `Int` |  |
| `state` | [[CountryState\|`CountryState`]] |  |
| `country` | [[Country\|`Country`]] |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `id` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*