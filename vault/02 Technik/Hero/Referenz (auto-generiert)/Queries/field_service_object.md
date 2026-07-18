# field_service_object

**Typ:** Query  
**Rückgabe:** [[FieldService_ServiceObject]]



---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `id` | `Int` | — | Fetch a service object by its ID |



## Rückgabe-Felder (`FieldService_ServiceObject`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `name` | `String` |  |
| `company_id` | `Int` |  |
| `customer_id` | `Int` |  |
| `contact_id` | `Int` |  |
| `customer` | [[Customer\|`Customer`]] |  |
| `project_match_id` | `Int` |  |
| `project_match` | [[ProjectMatch\|`ProjectMatch`]] |  |
| `service_object_id` *(veraltet)* | `Mixed` |  |
| `address_id` | `Int` |  |
| `address` | [[Address\|`Address`]] |  |
| `partner_id` | `Int` |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `recurring_start` | `Date` |  |
| `recurring_last` | `Date` |  |
| `recurring_next` | `Date` |  |
| `recurring_period` | `String` |  |
| `recurring_num` | `Int` |  |
| `recurring_action` | `String` |  |
| `created` | `DateTime` |  |
| `status` | `String` |  |
| `recurring_end_num` | `Int` |  |
| `recurring_end_period` | `String` |  |
| `reminder_num` | `Int` |  |
| `reminder_period` | `String` |  |
| `reminder_last` | `Date` |  |
| `reminder_next` | `Date` |  |
| `last_action` | `String` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*