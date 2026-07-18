# create_customer_address

**Typ:** Mutation  
**Rückgabe:** [[CustomerAddress]]

creates a new customer address

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `customer_address` | `CustomerAddressInput` | — |  |
| `findExisting` | `Boolean` | false | If true, will try to find an existing entity by the given data and return it instead of creating a new one |


### Input-Felder: `CustomerAddressInput` (für Argument `customer_address`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |
| `address_id` | `Int` | — |  |
| `title` | `String` | — |  |
| `description` | `String` | — |  |
| `customer_id` | `Int` | — |  |
| `is_deleted` | `Boolean` | — |  |
| `id` | `Int` | — |  |
| `address` | `AddressInput` | — |  |

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

## Rückgabe-Felder (`CustomerAddress`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `customer` | [[Customer\|`Customer`]] |  |
| `address` | [[Address\|`Address`]] |  |
| `address_id` | `Int` |  |
| `title` | `String` |  |
| `description` | `String` |  |
| `customer_id` | `Int` |  |
| `is_deleted` | `Boolean` |  |
| `id` | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*