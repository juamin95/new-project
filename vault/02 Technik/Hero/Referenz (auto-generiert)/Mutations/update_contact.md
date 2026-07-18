# update_contact

**Typ:** Mutation  
**Rückgabe:** [[Customer]]

Updates an existing contact

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `contact` | `CustomerInput` | {  } |  |


### Input-Felder: `CustomerInput` (für Argument `contact`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `user_id` | `Int` | — |  |
| `type` | `String` | — |  |
| `title` | `String` | — |  |
| `title_custom` | `String` | — |  |
| `first_name` | `String` | — |  |
| `last_name` | `String` | — |  |
| `company_name` | `String` | — |  |
| `company_legal_form` | `String` | — |  |
| `phone_home` | `String` | — |  |
| `phone_mobile` | `String` | — |  |
| `phone_fax` | `String` | — |  |
| `url` | `String` | — |  |
| `address_id` | `Int` | — |  |
| `reachability` | `Int` | — |  |
| `source` | `String` | — |  |
| `position` | `String` | — |  |
| `category` | `String` | — |  |
| `company_id` | `Int` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `nr` | `String` | — |  |
| `parent_customer_id` | `Int` | — |  |
| `email` | `String` | — |  |
| `offer_options` | `JSON` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `full_name` | `String` | — |  |
| `phone_home_formatted` | `String` | — |  |
| `phone_mobile_formatted` | `String` | — |  |
| `is_invoice_recipient` | `Boolean` | — |  |
| `reachability_string` | `String` | — |  |
| `initial_name` | `String` | — |  |
| `category_name` | `String` | — |  |
| `contact_match_id` | `Int` | — |  |
| `is_contact_person` | `Boolean` | — |  |
| `id` | `Int` | — |  |
| `address` | `AddressInput` | — |  |
| `partner_notes` | `String` | — |  |
| `birth_date` | `Date` | — |  |

#### `AddressInput` (Untertyp von `address`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `street` | `String` | — |  |
| `city` | `String` | — |  |
| `zipcode` | `String` | — |  |
| `country_id` | `Int` | — |  |
| `full_address` | `String` | — |  |
| `basic_address` | `String` | — |  |
| `maps_link` | `String` | — |  |
| `latitude` | `Float` | — |  |
| `longitude` | `Float` | — |  |
| `created` | `DateTime` | — |  |
| `modified` | `DateTime` | — |  |
| `line_1` | `String` | — |  |
| `line_2` | `String` | — |  |
| `state_id` | `Int` | — |  |

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