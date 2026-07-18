# Documents_CreateSupplyServiceActionInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `name` | `String!` | — | The name of the supply service |
| `unit_type` | `String!` | — | The unit type (e.g., hr, pcs, m) |
| `net_price_per_unit` | `Float` | — | Net price per unit. Required when the service has no product or wage positions; otherwise the total is derived from the positions. |
| `vat_percent` | `Float!` | — | VAT percentage |
| `quantity` | `Float!` | — | Quantity of the service |
| `description` | `String` | — | Description of the supply service |
| `nr` | `String` | — | Article number |
| `ean` | `String` | — | EAN code |
| `manufacturer` | `String` | — | Manufacturer name |
| `manufacturer_nr` | `String` | — | Manufacturer article number |
| `source` | `Documents_SourceEnum` | — | Source tracking for analytics |
| `insert_after` | `String` | — | UID of the position to insert after (appends at end if not provided) |
| `is_fixed_net_price` | `Boolean` | — | Whether the net price is fixed |
| `productPositions` | `[Documents_UpdateSupplyServiceProductPositionsInput]` | — | Optional material positions to create with the service. Reference catalogue items by id, or omit id for ad-hoc positions. When provided, the service total is calculated from these positions instead of net_price_per_unit. |
| `wagePositions` | `[Documents_UpdateSupplyServiceWagePositionInput]` | — | Optional wage positions to create with the service. Reference a wage group by id, or omit id for ad-hoc positions. When provided, the service total is calculated from these positions instead of net_price_per_unit. |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*