# create_custom_field_schema

**Typ:** Mutation  
**Rückgabe:** [[CustomFields_Schema]]

create a schema for custom fields

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `relates` | `CustomFields_SchemaRelationTypeEnum!` | project |  |

### Enum-Werte: `CustomFields_SchemaRelationTypeEnum` (für `relates`)

| Wert | Beschreibung |
|------|--------------|
| `project` |  |


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