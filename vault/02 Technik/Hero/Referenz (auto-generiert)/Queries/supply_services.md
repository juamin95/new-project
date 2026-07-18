# supply_services

**Typ:** Query  
**Rückgabe:** [[Documents_SupplyService]]

Query to get supply services

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `service_ids` | `[Int]` | — | Filter by a set of IDs |
| `search` | `String` | — | Filter by a search query |



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