# supply_product_versions

**Typ:** Query  
**Rückgabe:** [[Documents_SupplyProductVersion]]

Query to get supply product versions

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "modified" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `product_ids` | `[String]` | — | Filter by a set of IDs |
| `search` | `String` | — | Filter by a search query |



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