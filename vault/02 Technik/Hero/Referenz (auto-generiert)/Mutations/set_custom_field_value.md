# set_custom_field_value

**Typ:** Mutation  
**Rückgabe:** [[CustomFields_Record]]

Set the value of a custom field for a given relation. It can not exceed 10kb in size.

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `schemaId` | `String!` | — |  |
| `relationId` | `Int!` | — |  |
| `properties` | `[CustomFields_PropertyValueInput]` | — |  |


### Input-Felder: `CustomFields_PropertyValueInput` (für Argument `properties`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `propertyUuid` | `String!` | — | The propertyUuid to which value belongs. |
| `value` | `String` | — | The value for the custom field property. |

## Rückgabe-Felder (`CustomFields_Record`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `schema` | [[CustomFields_Schema\|`CustomFields_Schema!`]] |  |
| `companyId` | `Int!` |  |
| `relationId` | `Int!` |  |
| `properties` | [[CustomFields_PropertyValue\|`[CustomFields_PropertyValue]`]] |  |
| `createdByUserId` | `Int!` |  |
| `lastModifiedByUserId` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*