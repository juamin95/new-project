# Documents_AddPositionsFromDocumentActionInput

**Art:** INPUT_OBJECT

## Eingabefelder

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `documentId` | `Int!` | — | ID of the source document positions are copied from |
| `selectedPositions` | `[String!]!` | — | UIDs of the positions to copy from the source document |
| `titlePerDocument` | `Boolean` | — | Insert an intertitle naming the source document before its positions |
| `flowType` | `String` | — | "copy", "followup", or "empty" — controls GAEB addendum-title insertion and last-invoice deduplication |
| `fixedItemNumbers` | `Boolean` | — | Preserve the source document's item numbers instead of regenerating |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*