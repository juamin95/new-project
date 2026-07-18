# create_supply_service

**Typ:** Mutation  
**Rückgabe:** [[Documents_SupplyService]]

Creates a new supply service

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `supply_service` | `Documents_SupplyServiceInput!` | — |  |


### Input-Felder: `Documents_SupplyServiceInput` (für Argument `supply_service`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `company_id` | `Int` | — |  |
| `ean` | `String` | — |  |
| `internal_identifier` | `String` | — |  |
| `name` | `String` | — |  |
| `description` | `String` | — |  |
| `manufacturer` | `String` | — |  |
| `unit_type` | `String` | — |  |
| `net_price_per_unit` | `Float` | — |  |
| `vat_percent` | `Float` | — |  |
| `positions` | `Mixed` | — |  |
| `nr` | `String` | — |  |
| `is_fixed_net_price` | `Boolean` | — |  |
| `quantity` | `Float` | — |  |
| `time_minutes` | `Float` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |
| `file_upload_id` | `Int` | — |  |
| `file_upload_uuid` | `String` | — |  |
| `product_positions` | `[Documents_SupplyServiceProductPositionInput!]` | — |  |
| `wage_positions` | `[Documents_SupplyServiceWagePositionInput!]` | — |  |

#### `Documents_SupplyServiceProductPositionInput` (Untertyp von `product_positions`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `String!` | — |  |
| `quantity` | `Float!` | — |  |
| `selected_sales_price_id` | `Int` | — |  |

#### `Documents_SupplyServiceWagePositionInput` (Untertyp von `wage_positions`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int!` | — |  |
| `quantity` | `Float!` | — |  |
| `activity` | `String` | — |  |

## Rückgabe-Felder (`Documents_SupplyService`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `company_id` | `Int` |  |
| `ean` | `String` |  |
| `internal_identifier` | `String` |  |
| `name` | `String` |  |
| `description` | `String` |  |
| `manufacturer` | `String` |  |
| `unit_type` | `String` |  |
| `net_price_per_unit` | `Float` |  |
| `vat_percent` | `Float` |  |
| `positions` | `[Documents_SupplyServicePosition!]` |  |
| `nr` | `String` |  |
| `file_upload` | [[FileUpload\|`FileUpload`]] |  |
| `is_fixed_net_price` | `Boolean` |  |
| `quantity` | `Float` |  |
| `time_minutes` | `Float` |  |
| `is_deleted` | `Boolean` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*