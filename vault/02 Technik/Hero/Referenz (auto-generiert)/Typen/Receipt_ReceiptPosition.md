# Receipt_ReceiptPosition

**Art:** OBJECT

## Felder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `ID!` |  |
| `description` | `String` |  |
| `value` | `Float!` |  |
| `vat` | `Int!` |  |
| `vatIncl` | `Boolean!` |  |
| `valueInclVat` | `Float!` |  |
| `valueExclVat` | `Float!` |  |
| `projectMatchId` | `Int` |  |
| `bookAccountId` | `Int` |  |
| `bookAccount` | [[Receipt_ReceiptBookAccount\|`Receipt_ReceiptBookAccount`]] |  |
| `costCenter` | [[Receipt_ReceiptCostCenter\|`Receipt_ReceiptCostCenter`]] |  |
| `projectMatch` | [[Project_ProjectMatch\|`Project_ProjectMatch`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*