# custom_field_records

**Typ:** Query  
**Rückgabe:** [[CustomFields_Record]]

Retrieve all custom field records a company and relation type.

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "created" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `relation` | `CustomFields_SchemaRelationTypeEnum!` | project | Filter by relation type |
| `schemaIds` | `[String]` | — | Filter by a set of schema IDs |
| `relationIds` | `[Int]` | — | Filter by a set of relation IDs |

### Enum-Werte: `CustomFields_SchemaRelationTypeEnum` (für `relation`)

| Wert | Beschreibung |
|------|--------------|
| `project` |  |


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