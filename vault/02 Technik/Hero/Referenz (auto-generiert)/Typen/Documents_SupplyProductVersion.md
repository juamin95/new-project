# Documents_SupplyProductVersion

**Art:** OBJECT

## Felder

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