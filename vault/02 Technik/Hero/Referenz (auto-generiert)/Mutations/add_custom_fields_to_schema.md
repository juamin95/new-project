# add_custom_fields_to_schema

**Typ:** Mutation  
**Rückgabe:** [[CustomFields_Schema]]

Add a custom field to a schema

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `properties` | `[CustomFields_PropertyInput]` | — |  |
| `schemaId` | `String!` | — |  |


### Input-Felder: `CustomFields_PropertyInput` (für Argument `properties`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `type` | `CustomFields_PropertyTypeEnum` | — |  |
| `label` | `String!` | — |  |
| `position` | `Int!` | — |  |
| `options` | `[String]` | — | Options for selection type properties. Must be provided when type is "selection". |
| `suffix` | `String` | — | A suffix to show after text inputs. |
| `hint` | `String` | — |  |

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