# remove_custom_field_from_schema

**Typ:** Mutation  
**Rückgabe:** [[CustomFields_Schema]]

Remove custom field from schema

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `schemaId` | `String!` | — |  |
| `propertyUuid` | `String!` | — |  |



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