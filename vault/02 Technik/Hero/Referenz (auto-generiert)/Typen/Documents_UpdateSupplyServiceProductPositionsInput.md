# Documents_UpdateSupplyServiceProductPositionsInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `String` | — | The ID of the existing product position. Required when updating an existing position; omit when creating a new in-document position (not persisted). |
| `name` | `String` | — | Product name |
| `description` | `String` | — | Product description |
| `nr` | `String` | — | Product number |
| `unitType` | `String` | — | Product unit type |
| `netPricePerUnit` | `Float` | — | Product net price per unit |
| `vatPercent` | `Float` | — | Product vat percent |
| `quantity` | `Float!` | — | Product quantity |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*