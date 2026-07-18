# update_company

**Typ:** Mutation  
**Rückgabe:** [[Company]]

Updates the company data

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `data` | `CompanyInput` | {  } |  |


### Input-Felder: `CompanyInput` (für Argument `data`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `name` | `String` | — |  |
| `legal_form` | `String` | — |  |
| `founding_date` | `Date` | — |  |
| `cooperation_date` | `Date` | — |  |
| `street` | `String` | — |  |
| `city` | `String` | — |  |
| `zipcode` | `String` | — |  |
| `default_phone` | `String` | — |  |
| `default_fax` | `String` | — |  |
| `is_test` | `Boolean` | — |  |
| `layout` | `String` | — |  |
| `address_id` | `Int` | — |  |
| `signup_wizard` | `Int` | — |  |
| `bank_name` | `String` | — |  |
| `iban` | `String` | — |  |
| `bic` | `String` | — |  |
| `account_holder` | `String` | — |  |
| `currency` | `String` | — |  |
| `currency_sign` | `String` | — |  |
| `tax` | `String` | — |  |
| `hrb_number` | `String` | — |  |
| `ust_id_number` | `String` | — |  |
| `website` | `String` | — |  |
| `default_mobile` | `String` | — |  |
| `support_enabled` | `Boolean` | — |  |
| `general_manager_title` | `String` | — |  |
| `general_manager` | `String` | — |  |
| `status_saas` | `String` | — |  |
| `ai_feature_consent` | `Boolean` | — |  |
| `location_tracking_consent` | `Boolean` | — |  |
| `id` | `Int` | — |  |
| `modified` | `DateTime` | — |  |
| `created` | `DateTime` | — |  |
| `address` | `AddressInput` | — |  |
| `measures` | `[Int]` | — |  |

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

## Rückgabe-Felder (`Company`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `name` | `String` |  |
| `legal_form` | `String` |  |
| `founding_date` | `Date` |  |
| `cooperation_date` | `Date` |  |
| `street` | `String` |  |
| `city` | `String` |  |
| `zipcode` | `String` |  |
| `default_phone` | `String` |  |
| `default_fax` | `String` |  |
| `is_test` | `Boolean` |  |
| `measures` | [[Measure\|`[Measure]`]] |  |
| `layout` | `String` |  |
| `company_logo` *(veraltet)* | `Mixed` |  |
| `address` | [[Address\|`Address`]] |  |
| `address_id` | `Int` |  |
| `signup_wizard` | `Int` |  |
| `company_branches` | [[CompanyBranch\|`[CompanyBranch]`]] |  |
| `bank_name` | `String` |  |
| `iban` | `String` |  |
| `bic` | `String` |  |
| `account_holder` | `String` |  |
| `currency` | `String` |  |
| `currency_sign` | `String` |  |
| `country` *(veraltet)* | [[Country\|`Country`]] |  |
| `tax` | `String` |  |
| `hrb_number` | `String` |  |
| `ust_id_number` | `String` |  |
| `website` | `String` |  |
| `default_mobile` | `String` |  |
| `support_enabled` | `Boolean` |  |
| `general_manager_title` | `String` |  |
| `general_manager` | `String` |  |
| `status_saas` | `String` |  |
| `ai_feature_consent` | `Boolean` |  |
| `location_tracking_consent` | `Boolean` |  |
| `id` | `Int` |  |
| `modified` | `DateTime` |  |
| `created` | `DateTime` |  |
| `features` | [[CompanyFeature\|`[CompanyFeature]`]] |  |
| `partners` | [[Partner\|`[Partner]`]] |  |
| `is_paid` | `Boolean` |  |
| `referral_codes` *(veraltet)* | [[Referral_ReferralCode\|`[Referral_ReferralCode]`]] |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*