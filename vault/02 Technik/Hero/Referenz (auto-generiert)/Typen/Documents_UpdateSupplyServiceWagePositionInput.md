# Documents_UpdateSupplyServiceWagePositionInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — | The ID of the existing wage group. Required when updating an existing position; omit when creating a new in-document position (not persisted). |
| `name` | `String` | — | Wage group name |
| `activity` | `String` | — | Wage group activity description |
| `unitType` | `String` | — | Wage group unit type |
| `wagePerHour` | `Float` | — | Wage group net price per hour |
| `vatPercent` | `Float` | — | Wage group vat percent |
| `timeMinutes` | `Float!` | — | Wage group time minutes |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*