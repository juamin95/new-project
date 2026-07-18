# Receipt_Receipts

**Typ:** Query  
**Rückgabe:** [[Receipt_ReceiptConnection]]

Returns a paginated list of receipts.

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `filters` | `Receipt_ReceiptFiltersInput` | — |  |
| `before` | `String` | — |  |
| `after` | `String` | — |  |
| `first` | `Int` | — |  |
| `offset` | `Int` | — |  |
| `sortings` | `[Receipt_ReceiptSortingInput!]` | — |  |

### Enum-Werte: `Receipt_ReceiptSortingInput` (für `sortings`)

| Wert | Beschreibung |
|------|--------------|
| `RECEIPT_DATE_ASC` |  |
| `RECEIPT_DATE_DESC` |  |
| `DUE_DATE_ASC` |  |
| `DUE_DATE_DESC` |  |
| `NUMBER_ASC` |  |
| `NUMBER_DESC` |  |
| `NET_VALUE_ASC` |  |
| `NET_VALUE_DESC` |  |
| `TYPE_ASC` |  |
| `TYPE_DESC` |  |
| `STATUS_CODE_ASC` |  |
| `STATUS_CODE_DESC` |  |

### Input-Felder: `Receipt_ReceiptFiltersInput` (für Argument `filters`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `type` | `StringFilterInput` | — |  |
| `number` | `StringFilterInput` | — |  |
| `statusCode` | `IntFilterInput` | — |  |
| `customerSearchTerm` | `StringFilterInput` | — |  |
| `customerCategory` | `StringFilterInput` | — |  |
| `costCenterId` | `IntFilterInput` | — |  |
| `projectId` | `IntFilterInput` | — |  |
| `netValueMin` | `Float` | — |  |
| `netValueMax` | `Float` | — |  |
| `receiptDate` | `DateFilterInput` | — |  |
| `dueDate` | `DateFilterInput` | — |  |
| `paidDate` | `DateFilterInput` | — |  |
| `exportDate` | `DateFilterInput` | — |  |

#### `StringFilterInput` (Untertyp von `type`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `contains` | `String` | — |  |
| `equals` | `String` | — |  |
| `equalsAny` | `[String]` | — |  |

#### `StringFilterInput` (Untertyp von `number`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `contains` | `String` | — |  |
| `equals` | `String` | — |  |
| `equalsAny` | `[String]` | — |  |

#### `IntFilterInput` (Untertyp von `statusCode`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `Int` | — |  |
| `equalsAny` | `[Int]` | — |  |
| `greaterThan` | `Int` | — |  |
| `greaterThanOrEqual` | `Int` | — |  |
| `lessThan` | `Int` | — |  |
| `lessThanOrEqual` | `Int` | — |  |

#### `StringFilterInput` (Untertyp von `customerSearchTerm`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `contains` | `String` | — |  |
| `equals` | `String` | — |  |
| `equalsAny` | `[String]` | — |  |

#### `StringFilterInput` (Untertyp von `customerCategory`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `contains` | `String` | — |  |
| `equals` | `String` | — |  |
| `equalsAny` | `[String]` | — |  |

#### `IntFilterInput` (Untertyp von `costCenterId`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `Int` | — |  |
| `equalsAny` | `[Int]` | — |  |
| `greaterThan` | `Int` | — |  |
| `greaterThanOrEqual` | `Int` | — |  |
| `lessThan` | `Int` | — |  |
| `lessThanOrEqual` | `Int` | — |  |

#### `IntFilterInput` (Untertyp von `projectId`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `Int` | — |  |
| `equalsAny` | `[Int]` | — |  |
| `greaterThan` | `Int` | — |  |
| `greaterThanOrEqual` | `Int` | — |  |
| `lessThan` | `Int` | — |  |
| `lessThanOrEqual` | `Int` | — |  |

#### `DateFilterInput` (Untertyp von `receiptDate`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `DateTime` | — |  |
| `greaterThan` | `DateTime` | — |  |
| `greaterThanOrEqual` | `DateTime` | — |  |
| `lessThan` | `DateTime` | — |  |
| `lessThanOrEqual` | `DateTime` | — |  |

#### `DateFilterInput` (Untertyp von `dueDate`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `DateTime` | — |  |
| `greaterThan` | `DateTime` | — |  |
| `greaterThanOrEqual` | `DateTime` | — |  |
| `lessThan` | `DateTime` | — |  |
| `lessThanOrEqual` | `DateTime` | — |  |

#### `DateFilterInput` (Untertyp von `paidDate`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `DateTime` | — |  |
| `greaterThan` | `DateTime` | — |  |
| `greaterThanOrEqual` | `DateTime` | — |  |
| `lessThan` | `DateTime` | — |  |
| `lessThanOrEqual` | `DateTime` | — |  |

#### `DateFilterInput` (Untertyp von `exportDate`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `DateTime` | — |  |
| `greaterThan` | `DateTime` | — |  |
| `greaterThanOrEqual` | `DateTime` | — |  |
| `lessThan` | `DateTime` | — |  |
| `lessThanOrEqual` | `DateTime` | — |  |

## Rückgabe-Felder (`Receipt_ReceiptConnection`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `totalCount` | `Int!` |  |
| `edges` | [[Receipt_ReceiptConnectionEdge\|`[Receipt_ReceiptConnectionEdge!]`]] |  |
| `pageInfo` | [[Receipt_ReceiptConnectionPageInfo\|`Receipt_ReceiptConnectionPageInfo!`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*