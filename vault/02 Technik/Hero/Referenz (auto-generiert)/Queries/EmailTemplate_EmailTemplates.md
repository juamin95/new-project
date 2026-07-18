# EmailTemplate_EmailTemplates

**Typ:** Query  
**Rückgabe:** [[EmailTemplate_EmailTemplateConnection]]

Returns a list of email templates for the current partner

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `filters` | `EmailTemplate_EmailTemplateFiltersInput` | — |  |
| `before` | `String` | — |  |
| `after` | `String` | — |  |
| `first` | `Int` | — |  |
| `offset` | `Int` | — |  |
| `sortings` | `[EmailTemplate_EmailTemplateSortingInput!]` | — |  |

### Enum-Werte: `EmailTemplate_EmailTemplateSortingInput` (für `sortings`)

| Wert | Beschreibung |
|------|--------------|
| `ID_ASC` |  |
| `ID_DESC` |  |

### Input-Felder: `EmailTemplate_EmailTemplateFiltersInput` (für Argument `filters`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `IntFilterInput` | — |  |
| `context` | `StringFilterInput` | — |  |

#### `IntFilterInput` (Untertyp von `id`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `equals` | `Int` | — |  |
| `equalsAny` | `[Int]` | — |  |
| `greaterThan` | `Int` | — |  |
| `greaterThanOrEqual` | `Int` | — |  |
| `lessThan` | `Int` | — |  |
| `lessThanOrEqual` | `Int` | — |  |

#### `StringFilterInput` (Untertyp von `context`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `contains` | `String` | — |  |
| `equals` | `String` | — |  |
| `equalsAny` | `[String]` | — |  |

## Rückgabe-Felder (`EmailTemplate_EmailTemplateConnection`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `totalCount` | `Int!` |  |
| `edges` | [[EmailTemplate_EmailTemplateConnectionEdge\|`[EmailTemplate_EmailTemplateConnectionEdge!]`]] |  |
| `pageInfo` | [[EmailTemplate_EmailTemplateConnectionPageInfo\|`EmailTemplate_EmailTemplateConnectionPageInfo!`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*