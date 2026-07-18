# custom_fields_schemas

**Typ:** Query  
**Rückgabe:** [[CustomFields_Schema]]

Retrieve custom field schemas for company.

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "created" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `schemaIds` | `[String]` | — | Filter by a set of schema IDs |



## Rückgabe-Felder (`CustomFields_Schema`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `schemaId` | `String!` |  |
| `companyId` | `Int!` |  |
| `relates` | [[CustomFields_SchemaRelationTypeEnum\|`CustomFields_SchemaRelationTypeEnum!`]] |  |
| `properties` | [[CustomFields_Property\|`[CustomFields_Property]`]] |  |
| `createdByUserId` | `Int!` |  |
| `lastModifiedByUserId` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*