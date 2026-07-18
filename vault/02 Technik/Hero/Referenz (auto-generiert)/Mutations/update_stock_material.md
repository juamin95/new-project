# update_stock_material

**Typ:** Mutation  
**Rückgabe:** [[Stock_StockMaterial]]

Update an existing stock material entity

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `stock_material` | `Stock_StockMaterialInput!` | — |  |


### Input-Felder: `Stock_StockMaterialInput` (für Argument `stock_material`)

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

#### `Stock_CreateSourceWithinMaterialInput` (Untertyp von `material_sources`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `product_id` | `String!` | — |  |
| `conflict_resolution` | `Stock_ConflictResolutionInput` | — |  |

## Rückgabe-Felder (`Stock_StockMaterial`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int!` |  |
| `name` | `String!` |  |
| `description` | `String` |  |
| `item_number` | `String!` |  |
| `qr_id` | `String` |  |
| `category` | `String` |  |
| `unit_type` | `String!` |  |
| `total_stock` | `Float!` |  |
| `open_consignment_items_amount` | `Float!` |  |
| `open_order_items_amount` | `Float!` |  |
| `created` | `DateTime!` |  |
| `modified` | `DateTime!` |  |
| `min_stock` | `Float` |  |
| `target_stock` | `Float` |  |
| `stock_material_sources` | [[Stock_StockMaterialSource\|`[Stock_StockMaterialSource]`]] |  |
| `has_stock_material_sources` | `Boolean!` |  |
| `qr_payload` | `String` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*