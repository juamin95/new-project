# update_partner

**Typ:** Mutation  
**Rückgabe:** [[Partner]]

Update employee

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `partner` | `PartnerInput` | — |  |


### Input-Felder: `PartnerInput` (für Argument `partner`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `id` | `Int` | — |  |
| `first_name` | `String!` | — |  |
| `last_name` | `String!` | — |  |
| `user` | `UserDataInput` | — |  |
| `email` | `String!` | — |  |
| `role` | `PartnerRoleEnum` | — |  |
| `status` | `PartnerStatusEnum` | — |  |
| `phone` | `String` | — |  |
| `mobile` | `String` | — |  |
| `fax` | `String` | — |  |
| `profile_image_uuid` | `String` | — |  |
| `title` | `String` | — |  |
| `signature` | `String` | — |  |
| `no_signature` | `Boolean` | — |  |
| `birth_date` | `Date` | — |  |
| `address` | `AddressInput` | — |  |

#### `UserDataInput` (Untertyp von `user`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `title` | `String` | — |  |
| `first_name` | `String` | — |  |
| `last_name` | `String` | — |  |
| `email` | `String` | — |  |
| `phone` | `String` | — |  |
| `mobile` | `String` | — |  |
| `locale` | `String` | — |  |

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

## Rückgabe-Felder (`Partner`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `first_name` | `String` |  |
| `last_name` | `String` |  |
| `full_name` | `String` |  |
| `initial_last_name` | `String` |  |
| `name` | `String` |  |
| `user` *(veraltet)* | [[User\|`User`]] |  |
| `phone` | `String` |  |
| `mobile` | `String` |  |
| `fax` | `String` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `company_branches` | [[CompanyBranch\|`[CompanyBranch]`]] |  |
| `company` *(veraltet)* | [[Company\|`Company`]] |  |
| `user_id` | `Int` |  |
| `company_id` | `Int` |  |
| `profile_image` | [[FileUpload\|`FileUpload`]] |  |
| `signature_image` | [[FileUpload\|`FileUpload`]] |  |
| `account_type` | `String` |  |
| `title` | `String` |  |
| `signature` | `String` |  |
| `no_signature` | `Boolean` |  |
| `birth_date` | `Date` |  |
| `address` | [[Address\|`Address`]] |  |
| `id` | `Int` |  |
| `role` | [[PartnerRoleEnum\|`PartnerRoleEnum`]] |  |
| `status` | [[PartnerStatusEnum\|`PartnerStatusEnum`]] |  |
| `email` | `String` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*