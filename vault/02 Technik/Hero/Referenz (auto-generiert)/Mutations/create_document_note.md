# create_document_note

**Typ:** Mutation  
**Rückgabe:** [[Documents_CustomerDocumentNote]]

Create a note on a document

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `document_id` | `Int!` | — |  |
| `note` | `String!` | — |  |



## Rückgabe-Felder (`Documents_CustomerDocumentNote`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int!` |  |
| `customerDocumentId` | `Int!` |  |
| `note` | `String!` |  |
| `created` | `DateTime!` |  |
| `modified` | `DateTime!` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*