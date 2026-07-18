# file_upload_folders

**Typ:** Query  
**Rückgabe:** [[FileUploadFolder]]

Find file upload folders

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `show_deleted` | `Boolean` | — | Also return deleted entities |



## Rückgabe-Felder (`FileUploadFolder`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `name` | `String` |  |
| `type` | `String` |  |
| `company_id` | `Int` |  |
| `is_default_visible` | `Boolean` |  |
| `created` | `DateTime` |  |
| `is_deleted` | `Boolean` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*