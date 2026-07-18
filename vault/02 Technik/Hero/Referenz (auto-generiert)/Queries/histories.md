# histories

**Typ:** Query  
**Rückgabe:** [[History]]

Find logbook history entries

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |



## Rückgabe-Felder (`History`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `user_id` | `Int` |  |
| `target_project_match_id` | `Int` |  |
| `target_company_id` | `Int` |  |
| `target` | `String` |  |
| `target_id` | `Int` |  |
| `target_job` | [[FieldService_Job\|`FieldService_Job`]] |  |
| `type_code` | `Int` |  |
| `associated_outbox_mail_id` | `Int` |  |
| `custom_title` | `String` |  |
| `custom_text` | `String` |  |
| `user` | [[User\|`User`]] |  |
| `target_project_match` | [[ProjectMatch\|`ProjectMatch`]] |  |
| `target_company` | [[Company\|`Company`]] |  |
| `associated_outbox_mail` | [[OutboxMail\|`OutboxMail`]] |  |
| `additional_file_uploads` | [[FileUpload\|`[FileUpload]`]] |  |
| `role_visibility` | `String` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `id` | `Int` |  |
| `target_user` *(veraltet)* | [[User\|`User`]] |  |
| `target_project` *(veraltet)* | [[Project\|`Project`]] |  |
| `target_user_id` *(veraltet)* | `Int` |  |
| `target_project_id` *(veraltet)* | `Int` |  |
| `type` *(veraltet)* | `String` |  |
| `weather_attachment` | [[HistoryWeatherAttachment\|`HistoryWeatherAttachment`]] |  |
| `is_editable` | `Boolean` |  |
| `author_name` | `String!` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*