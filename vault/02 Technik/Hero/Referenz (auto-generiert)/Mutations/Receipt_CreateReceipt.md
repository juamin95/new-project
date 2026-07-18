# Receipt_CreateReceipt

**Typ:** Mutation  
**Rückgabe:** [[Receipt_Receipt]]

Create a new receipt with positions.

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `input` | `Receipt_CreateReceiptInput!` | — |  |


### Input-Felder: `Receipt_CreateReceiptInput` (für Argument `input`)

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

#### `Receipt_CreateReceiptPositionInput` (Untertyp von `receiptPositions`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `value` | `Float!` | — |  |
| `vat` | `Int` | — |  |
| `vatIncl` | `Boolean` | — |  |
| `bookAccountId` | `Int` | — |  |
| `costCenterId` | `Int` | — |  |
| `projectMatchId` | `Int` | — |  |
| `description` | `String` | — |  |

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