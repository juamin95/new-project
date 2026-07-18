# contacts

**Typ:** Query  
**Rückgabe:** [[Customer]]

Find contacts

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `orderBy` | `String` | "id" | Sort list by a specific field |
| `first` | `Int` | — | Returns the first n elements from the list |
| `last` | `Int` | 50 | Returns the last n elements from the list |
| `offset` | `Int` | 0 | Skips n elements from the list |
| `ids` | `[Int]` | — | Filter by contact IDs |
| `category` | `CustomerCategoryEnum` | — | Filter by contact category |
| `search` | `String` | — | Filter by first_name, last_name, company_name, email and nr |
| `show_deleted` | `Boolean` | true | Show deleted contacts |

### Enum-Werte: `CustomerCategoryEnum` (für `category`)

| Wert | Beschreibung |
|------|--------------|
| `supplier` |  |
| `customer` |  |
| `partner` |  |
| `other` |  |
| `contact` |  |


## Rückgabe-Felder (`Customer`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `user_id` | `Int` |  |
| `type` | `String` |  |
| `title` | `String` |  |
| `title_custom` | `String` |  |
| `first_name` | `String` |  |
| `last_name` | `String` |  |
| `company_name` | `String` |  |
| `company_legal_form` | `String` |  |
| `phone_home` | `String` |  |
| `phone_mobile` | `String` |  |
| `phone_fax` | `String` |  |
| `url` | `String` |  |
| `address_id` | `Int` |  |
| `reachability` | `Int` |  |
| `source` | `String` |  |
| `position` | `String` |  |
| `user` | [[User\|`User`]] |  |
| `address` | [[Address\|`Address`]] |  |
| `customer_addresses` | [[CustomerAddress\|`[CustomerAddress]`]] |  |
| `project_matches` | [[ProjectMatch\|`[ProjectMatch]`]] |  |
| `category` | `String` |  |
| `company_id` | `Int` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `nr` | `String` |  |
| `parent_customer_id` | `Int` |  |
| `email` | `String` |  |
| `offer_options` | `JSON` |  |
| `parent_customer` | [[Customer\|`Customer`]] |  |
| `contacts` | [[Customer\|`[Customer]`]] |  |
| `is_deleted` | `Boolean` |  |
| `full_name` | `String` |  |
| `phone_home_formatted` | `String` |  |
| `phone_mobile_formatted` | `String` |  |
| `is_invoice_recipient` | `Boolean` |  |
| `reachability_string` | `String` |  |
| `initial_name` | `String` |  |
| `category_name` | `String` |  |
| `contact_match_id` | `Int` |  |
| `is_contact_person` | `Boolean` |  |
| `contact_match` | [[ProjectMatch\|`ProjectMatch`]] |  |
| `id` | `Int` |  |
| `partner_notes` | `String` |  |
| `birth_date` | `Date` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*