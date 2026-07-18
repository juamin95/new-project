# resources

**Typ:** Query  
**Rückgabe:** [[CompanyResource]]

Get the company resources

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `show_deleted` | `Boolean` | false | Include deleted resources |



## Rückgabe-Felder (`CompanyResource`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `id` | `Int` |  |
| `company_id` | `Int` |  |
| `type_id` | `Int` |  |
| `name` | `String` |  |
| `resource_type` | [[CompanyResourceType\|`CompanyResourceType`]] |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `type` *(veraltet)* | `String` |  |
| `company_branch` *(veraltet)* | [[CompanyBranch\|`CompanyBranch`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*