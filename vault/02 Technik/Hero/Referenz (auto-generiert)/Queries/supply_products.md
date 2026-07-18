# supply_products

**Typ:** Query  
**Rückgabe:** [[Documents_SupplyProduct]]

> **Veraltet:** Superseded by supply_product_versions, but will stay supported in the long term.

Query to get supply products (deprecated, use supply_product_versions)

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "modified" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `search` | `String` | — | Filter by a search query |



## Rückgabe-Felder (`Documents_SupplyProduct`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `String` |  |
| `company_id` | `Int` |  |
| `ean` | `String` |  |
| `matchcode` | `String` |  |
| `internal_identifier` | `String` |  |
| `name` | `String` |  |
| `description` | `String` |  |
| `manufacturer` | `String` |  |
| `manufacturer_nr` | `String` |  |
| `unit_type` | `String` |  |
| `base_price` | `Float` |  |
| `net_price_per_unit` | `Float` |  |
| `vat_percent` | `Float` |  |
| `supply_service_id` | `Int` |  |
| `nr` | `String` |  |
| `file_upload` | [[FileUpload\|`FileUpload`]] |  |
| `file_upload_id` | `Int` |  |
| `supply_operator_id` | `Int` |  |
| `supplier_id` | `String` |  |
| `supply_product_sales_prices` | [[Documents_SupplyProductSalesPrice\|`[Documents_SupplyProductSalesPrice]`]] |  |
| `quantity_min` | `Float` |  |
| `quantity_interval` | `Float` |  |
| `price_quantity` | `Float` |  |
| `default_sales_price_id` | `Int` |  |
| `quantity` | `Float` |  |
| `time_minutes` | `Float` |  |
| `list_price` | `Float` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*