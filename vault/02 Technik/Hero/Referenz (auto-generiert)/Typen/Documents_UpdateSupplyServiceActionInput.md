# Documents_UpdateSupplyServiceActionInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `uid` | `String!` | — | The UID of the existing supply service to update within the document |
| `name` | `String` | — | Updated service name |
| `description` | `String` | — | Updated service description |
| `nr` | `String` | — | Updated service number |
| `unitType` | `String` | — | Updated service unit type |
| `vatPercent` | `Float` | — | Updated service vat percent |
| `quantity` | `Float` | — | Updated service quantity |
| `productPositions` | `[Documents_UpdateSupplyServiceProductPositionsInput]` | — | Product positions for this service. When provided, completely replaces all existing product positions. Omit this field to preserve existing product positions. |
| `wagePositions` | `[Documents_UpdateSupplyServiceWagePositionInput]` | — | Wage positions for this service. When provided, completely replaces all existing wage positions. Omit this field to preserve existing wage positions. |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*