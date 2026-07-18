# Receipt_DeleteReceipt

**Typ:** Mutation  
**Rückgabe:** [[Receipt_Receipt]]

Soft-delete a receipt.

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `id` | `Int!` | — |  |



## Rückgabe-Felder (`Receipt_Receipt`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `ID!` |  |
| `type` | `String!` |  |
| `statusCode` | `Int!` |  |
| `number` | `String!` |  |
| `receiptDate` | `Date` |  |
| `dueDate` | `Date` |  |
| `paidDate` | `Date` |  |
| `exportDate` | `Date` |  |
| `netValue` | `Float!` |  |
| `value` | `Float!` |  |
| `paidSum` | `Float!` |  |
| `openAmount` | `Float!` |  |
| `taxId` | `Int` |  |
| `createdAt` | `DateTime` |  |
| `modifiedAt` | `DateTime` |  |
| `fileUploadId` | `Int` |  |
| `customerId` | `Int` |  |
| `customer` | [[Customer_Customer\|`Customer_Customer`]] |  |
| `customerCompanyName` | `String!` |  |
| `customerCategory` | `String!` |  |
| `fileUpload` | [[FileUpload_FileUpload\|`FileUpload_FileUpload`]] |  |
| `isDatevActive` | `Boolean!` |  |
| `documentSync` | [[Receipt_ReceiptDocumentSync\|`Receipt_ReceiptDocumentSync`]] |  |
| `receiptPositions` | [[Receipt_ReceiptPosition\|`[Receipt_ReceiptPosition!]!`]] |  |
| `payments` | [[Receipt_ReceiptPayment\|`[Receipt_ReceiptPayment!]!`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*