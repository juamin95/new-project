# new_supply_service

**Typ:** Query  
**Rückgabe:** [[Documents_SupplyService]]

Create a new supply service template

---




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