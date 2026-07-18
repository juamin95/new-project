# user

**Typ:** Query  
**Rückgabe:** [[User]]

Returns the current user

---




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