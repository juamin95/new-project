# update_file_upload

**Typ:** Mutation  
**Rückgabe:** [[FileUpload]]

Updates a file upload

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `filename` | `String` | — |  |
| `image_category` | `String` | — |  |
| `delete` | `Boolean` | false |  |



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