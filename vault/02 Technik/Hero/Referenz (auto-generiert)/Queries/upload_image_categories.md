# upload_image_categories

**Typ:** Query  
**Rückgabe:** [[String]]

Find image categories for file uploads

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `project_match_id` | `Int` | — | Fetch categories for a specific project |
| `target` | `LinkTargetEnum` | — | Target |
| `target_id` | `Int` | — | Target id |

### Enum-Werte: `LinkTargetEnum` (für `target`)

| Wert | Beschreibung |
|------|--------------|
| `ava_project` |  |
| `field_service_checklist` |  |
| `field_service_job` |  |
| `project_match` |  |



---
*Quelle: Hero Software GraphQL API — automatisch generiert*