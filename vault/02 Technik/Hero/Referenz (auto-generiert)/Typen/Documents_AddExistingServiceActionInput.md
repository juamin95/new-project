# Documents_AddExistingServiceActionInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `supplyServiceId` | `Int!` | — | The ID of the existing supply service to add |
| `quantity` | `Float` | — | Quantity of the service (defaults to 1) |
| `source` | `Documents_SourceEnum` | — | Source tracking for analytics |
| `insertAfter` | `String` | — | UID of the content node to insert after (appends at end if not provided) - only works for updating documents |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*