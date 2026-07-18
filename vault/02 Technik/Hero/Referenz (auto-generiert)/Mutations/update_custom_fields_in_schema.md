# update_custom_fields_in_schema

**Typ:** Mutation  
**Rückgabe:** [[CustomFields_Schema]]

Update one or more custom fields in schema

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `properties` | `[CustomFields_PropertyUpdate]` | — |  |
| `schemaId` | `String!` | — |  |


### Input-Felder: `CustomFields_PropertyUpdate` (für Argument `properties`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `uuid` | `String!` | — |  |
| `label` | `String` | — |  |
| `position` | `Int` | — |  |
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