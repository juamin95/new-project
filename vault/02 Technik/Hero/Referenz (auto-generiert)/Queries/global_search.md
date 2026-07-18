# global_search

**Typ:** Query  
**Rückgabe:** [[SearchResult]]

Search for project_matches, jobs, contacts, documents, partners

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "default" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `category` | `SearchCategoryEnum` | — |  |
| `term` | `String` | "" |  |

### Enum-Werte: `SearchCategoryEnum` (für `category`)

| Wert | Beschreibung |
|------|--------------|
| `contacts` |  |
| `documents` |  |
| `jobs` |  |
| `partners` |  |
| `project_matches` |  |
| `calendar_events` |  |



---
*Quelle: Hero Software GraphQL API — automatisch generiert*