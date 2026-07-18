# Stock_StockMaterialInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `name` | `String!` | — |  |
| `description` | `String` | — |  |
| `item_number` | `String` | — |  |
| `qr_id` | `String` | — |  |
| `category` | `String` | — |  |
| `unit_type` | `String` | — |  |
| `total_stock` | `Float` | — |  |
| `open_consignment_items_amount` | `Float` | — |  |
| `open_order_items_amount` | `Float` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `min_stock` | `Float` | — |  |
| `target_stock` | `Float` | — |  |
| `has_stock_material_sources` | `Boolean` | — |  |
| `material_sources` | `[Stock_CreateSourceWithinMaterialInput]` | — |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*