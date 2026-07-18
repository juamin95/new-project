# update_user_data

**Typ:** Mutation  
**Rückgabe:** [[User]]

Updates the current user's contact data

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `user_data` | `UserDataInput` | — |  |


### Input-Felder: `UserDataInput` (für Argument `user_data`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `title` | `String` | — |  |
| `first_name` | `String` | — |  |
| `last_name` | `String` | — |  |
| `email` | `String` | — |  |
| `phone` | `String` | — |  |
| `mobile` | `String` | — |  |
| `locale` | `String` | — |  |

## Rückgabe-Felder (`User`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `email` | `String` |  |
| `role` | `String` |  |
| `employee` | [[Employee\|`Employee`]] |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `last_login` | `DateTime` |  |
| `locale` | `String` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `acl` | [[Acl\|`[Acl]`]] |  |
| `has_active_smtp_config` | `Boolean` |  |
| `adminUserId` | `Int` |  |
| `adminPermissions` | `[String!]!` |  |
| `acl_permissions` *(veraltet)* | `String` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*