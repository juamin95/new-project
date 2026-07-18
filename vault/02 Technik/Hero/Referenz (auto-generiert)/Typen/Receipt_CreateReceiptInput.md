# Receipt_CreateReceiptInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `type` | `String!` | — |  |
| `number` | `String` | — |  |
| `receiptDate` | `Date!` | — |  |
| `dueDate` | `Date!` | — |  |
| `customerId` | `Int!` | — |  |
| `fileUploadUuid` | `String` | — |  |
| `taxId` | `Int` | — |  |
| `statusCode` | `Int` | — |  |
| `receiptPositions` | `[Receipt_CreateReceiptPositionInput!]!` | — |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*