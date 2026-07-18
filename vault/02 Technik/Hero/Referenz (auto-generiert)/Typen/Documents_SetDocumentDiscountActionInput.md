# Documents_SetDocumentDiscountActionInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `valueType` | `Documents_DiscountValueTypeEnum` | — | How "value" is interpreted: PERCENT (percentage) or FLAT (fixed amount). Defaults to PERCENT. |
| `value` | `Float` | — | Discount magnitude as a positive number. A percentage when valueType is "percent", a fixed currency amount when "flat". |
| `label` | `String` | — | Optional label shown on the document for the discount. |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*