# create_supply_product_version

**Typ:** Mutation  
**Rückgabe:** [[Documents_SupplyProductVersion]]

Creates a new supply product

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `supply_product_version` | `Documents_SupplyProductVersionInput!` | — |  |


### Input-Felder: `Documents_SupplyProductVersionInput` (für Argument `supply_product_version`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `product_id` | `String` | — |  |
| `company_id` | `Int` | — |  |
| `supply_operator_id` | `Int` | — |  |
| `internal_identifier` | `String` | — |  |
| `nr` | `String` | — |  |
| `base_price` | `Float` | — |  |
| `list_price` | `Float` | — |  |
| `vat_percent` | `Float` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `default_sales_price_id` | `Int` | — |  |
| `price_quantity` | `Float` | — |  |
| `quantity_min` | `Float` | — |  |
| `quantity_interval` | `Float` | — |  |
| `delivery_time` | `Int` | — |  |
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |
| `base_data` | `Documents_SupplyProductBaseDataInput!` | — |  |
| `default_sales_price` | `Float` | — |  |
| `attributes` | `JSON` | — |  |
| `sales_prices` | `[Documents_SupplyProductSalesPriceInput]` | — |  |

#### `Documents_SupplyProductBaseDataInput` (Untertyp von `base_data`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `product_id` | `String` | — |  |
| `company_id` | `Int` | — |  |
| `file_upload_id` | `Int` | — |  |
| `supply_catalog_id` | `Int` | — |  |
| `supplier_id` | `String` | — |  |
| `name` | `String` | — |  |
| `ean` | `String` | — |  |
| `matchcode` | `String` | — |  |
| `description` | `String` | — |  |
| `manufacturer` | `String` | — |  |
| `manufacturer_nr` | `String` | — |  |
| `manufacturer_type_name` | `String` | — |  |
| `quantity_min` | `Float` | — |  |
| `quantity_interval` | `Float` | — |  |
| `price_quantity` | `Float` | — |  |
| `delivery_time` | `Float` | — |  |
| `unit_type` | `String` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `category` | `String` | — |  |
| `external_url` | `String` | — |  |
| `image_src` | `String` | — |  |
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |
| `file_upload_uuid` | `String` | — |  |

#### `Documents_SupplyProductSalesPriceInput` (Untertyp von `sales_prices`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `supply_sales_price_id` | `Int` | — |  |
| `net_price_per_unit` | `Float` | — |  |
| `label` | `String` | — |  |
| `hasDifferentPrice` | `Boolean` | — |  |
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |

## Rückgabe-Felder (`Documents_SupplyProductVersion`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` *(veraltet)* | `Int` |  |
| `product_id` | `String` |  |
| `company_id` | `Int` |  |
| `base_data` | [[Documents_SupplyProductBaseData\|`Documents_SupplyProductBaseData`]] |  |
| `supply_operator_id` | `Int` |  |
| `supply_operator` | [[Documents_SupplyOperator\|`Documents_SupplyOperator`]] |  |
| `sales_prices` | [[Documents_SupplyProductSalesPrice\|`[Documents_SupplyProductSalesPrice]`]] |  |
| `supply_surcharges` | [[Documents_SupplySurcharge\|`[Documents_SupplySurcharge]`]] |  |
| `internal_identifier` | `String` |  |
| `nr` | `String` |  |
| `base_price` | `Float` |  |
| `list_price` | `Float` |  |
| `vat_percent` | `Float` |  |
| `is_deleted` | `Boolean` |  |
| `default_sales_price_id` | `Int` |  |
| `price_quantity` | `Float` |  |
| `quantity_min` | `Float` |  |
| `quantity_interval` | `Float` |  |
| `delivery_time` | `Int` |  |
| `stock_materials` | [[Stock_StockMaterial\|`[Stock_StockMaterial]`]] |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `attributes` | `JSON` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*