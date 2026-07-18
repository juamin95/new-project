# file_uploads

**Typ:** Query  
**Rückgabe:** [[FileUpload]]

Get file uploads by UUID

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `uuids` | `[String!]` | — | Filter by a set of UUIDs |



## Rückgabe-Felder (`FileUpload`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `uuid` | `String` |  |
| `project_id` | `Int` |  |
| `section` | `String` |  |
| `category` | `String` |  |
| `image_category` | `String` |  |
| `filename` | `String` |  |
| `type` | `String` |  |
| `icon` | `String` |  |
| `url` | `String` |  |
| `size` | `Int` |  |
| `is_deleted` | `Boolean` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `customer_document` | [[CustomerDocument\|`CustomerDocument`]] |  |
| `preview_available` | `Boolean` |  |
| `file_upload_links` | [[FileUploadLink\|`[FileUploadLink]`]] |  |
| `file_upload_matches` | [[FileUploadMatch\|`[FileUploadMatch]`]] |  |
| `id` | `Int` |  |
| `src` *(veraltet)* | `String` |  |
| `url_download` | `String` |  |
| `temporary_url` | `String` | Returns a temporary public URL for the file upload. The URL is valid for the specified expiration time. Returns null if the URL cannot be generated (e.g. broken or migrated bucket links). |
| `thumbnails` | [[Thumbnail\|`[Thumbnail]`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*