# receipts

**Typ:** Query  
**Rückgabe:** [[Accounting_Receipt]]

Query to get receipts

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `ids` | `[Int]` | — | Filter receipts by ids |
| `status_code` | `Int` | — | Filter receipts by status code |
| `number` | `String` | — | Filter receipts by number |
| `tax_id` | `Int` | — | Filter receipts by tax id |
| `customer_id` | `Int` | — | Filter receipts by customer id |



## Rückgabe-Felder (`Accounting_Receipt`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `file_upload` | [[FileUpload\|`FileUpload`]] |  |
| `receipt_positions` | [[Accounting_ReceiptPosition\|`[Accounting_ReceiptPosition]`]] |  |
| `customer` | [[Customer\|`Customer`]] |  |
| `company` | [[Company\|`Company`]] |  |
| `tax_id` | `Int` |  |
| `type` | `String` |  |
| `status_code` | `Int` |  |
| `receipt_date` | `DateTime` |  |
| `due_date` | `DateTime` |  |
| `number` | `String` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `export_date` | `DateTime` |  |
| `paid_date` | `DateTime` |  |
| `paid_sum` | `Float` |  |
| `value` | `Float` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*