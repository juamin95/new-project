# create_document

**Typ:** Mutation  
**Rückgabe:** [[Documents_CustomerDocumentDraft]]

Create a document

---

## Argumente & Filter

| Argument | Typ | Standard | Beschreibung |
|----------|-----|----------|--------------|
| `input` | `Documents_CreateDocumentInput!` | — |  |
| `actions` | `[Documents_DocumentBuilderActionInput!]!` | — |  |


### Input-Felder: `Documents_CreateDocumentInput` (für Argument `input`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `document_type_id` | `Int!` | — |  |
| `project_match_id` | `Int!` | — |  |
| `filename` | `String` | — | The filename of the document, if not automatically generated |
| `publish` | `Boolean` | — | If true, the document will be published immediately |

### Input-Felder: `Documents_DocumentBuilderActionInput` (für Argument `actions`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `set_recipient` | `Documents_SetRecipientActionInput` | — | Set the recipient of the document |
| `add_product_position` | `Documents_AddProductPositionActionInput` | — | Add a product position to the document |
| `add_product_position_by_id` | `Documents_AddProductPositionByIdActionInput` | — | Add a product position by product ID |
| `add_text` | `Documents_AddTextActionInput` | — | Add a text node to the document |
| `set_options` | `Documents_SetOptionsActionInput` | — | Set layout options for the document |
| `add_title` | `Documents_AddTitleActionInput` | — | Add a title node to the document |
| `add_existing_service` | `Documents_AddExistingServiceActionInput` | — | Add a existing service to the document |
| `update_supply_service` | `Documents_UpdateSupplyServiceActionInput` | — | Update a supply service in the document |
| `delete_supply_service` | `Documents_DeleteSupplyServiceActionInput` | — | Remove a supply service from the document |
| `delete_supply_product` | `Documents_DeleteSupplyProductActionInput` | — | Delete a supply product from the document |
| `add_existing_wage_group` | `Documents_AddExistingWageGroupActionInput` | — | Add an existing wage group to a service in the document |
| `update_supply_product` | `Documents_UpdateSupplyProductActionInput` | — | Update a supply product in the document |
| `create_supply_service` | `Documents_CreateSupplyServiceActionInput` | — | Create an ad-hoc supply service in the document |
| `add_positions_from_document` | `Documents_AddPositionsFromDocumentActionInput` | — | Copy selected positions (and GAEB metadata) from another document |
| `set_reference_documents` | `Documents_SetReferenceDocumentsActionInput` | — | Set the documents referenced by this document |
| `clear_positions` | `Documents_ClearPositionsActionInput` | — | Empty the positions table and clear GAEB metadata |
| `copy_sales_metadata` | `Documents_CopySalesMetadataActionInput` | — | Copy table-level sales fields from a source document |
| `set_document_discount` | `Documents_SetDocumentDiscountActionInput` | — | Set the whole-document discount (table-level sales fields) |
| `clear_document_discount` | `Documents_ClearDocumentDiscountActionInput` | — | Clear the whole-document discount (table-level sales fields) |

#### `Documents_SetRecipientActionInput` (Untertyp von `set_recipient`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `company_name` | `String!` | — |  |
| `company_legal_form` | `String` | — |  |
| `title` | `String` | — |  |
| `title_custom` | `String` | — |  |
| `first_name` | `String!` | — |  |
| `last_name` | `String!` | — |  |
| `street` | `String!` | — |  |
| `city` | `String!` | — |  |
| `zipcode` | `String!` | — |  |
| `country` | `String` | — |  |
| `address_line_1` | `String` | — |  |
| `address_line_2` | `String` | — |  |

#### `Documents_AddProductPositionActionInput` (Untertyp von `add_product_position`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `name` | `String!` | — |  |
| `description` | `String` | — |  |
| `nr` | `String` | — |  |
| `unit_type` | `String!` | — |  |
| `image_url` | `String` | — |  |
| `quantity` | `Float!` | — |  |
| `list_price` | `Float` | — |  |
| `base_price` | `Float` | — |  |
| `net_price` | `Float!` | — |  |
| `vat_percent` | `Float!` | — |  |

#### `Documents_AddProductPositionByIdActionInput` (Untertyp von `add_product_position_by_id`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `product_id` | `String!` | — | The ID of the product to add to the document |
| `quantity` | `Float!` | — |  |

#### `Documents_AddTextActionInput` (Untertyp von `add_text`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `text` | `String!` | — |  |
| `pagebreak` | `Boolean` | — |  |

#### `Documents_SetOptionsActionInput` (Untertyp von `set_options`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `projectAddressDisplay` | `Boolean` | — | Display the project address above the subject line |
| `subjectDisplay` | `Boolean` | — | Display the subject in the document |
| `customBoxText` | `String` | — | Custom text to be displayed in the infobox |

#### `Documents_AddTitleActionInput` (Untertyp von `add_title`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `text` | `String!` | — | The title text content |
| `tier` | `Int` | — | Heading tier (defaults to 0) |
| `pagebreak` | `Boolean` | — | Insert pagebreak before title |
| `insertAfter` | `String` | — | UID of the content node to insert after (appends at end if not provided) - only works for updating documents |

#### `Documents_AddExistingServiceActionInput` (Untertyp von `add_existing_service`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `supplyServiceId` | `Int!` | — | The ID of the existing supply service to add |
| `quantity` | `Float` | — | Quantity of the service (defaults to 1) |
| `source` | `Documents_SourceEnum` | — | Source tracking for analytics |
| `insertAfter` | `String` | — | UID of the content node to insert after (appends at end if not provided) - only works for updating documents |

#### `Documents_UpdateSupplyServiceActionInput` (Untertyp von `update_supply_service`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `uid` | `String!` | — | The UID of the existing supply service to update within the document |
| `name` | `String` | — | Updated service name |
| `description` | `String` | — | Updated service description |
| `nr` | `String` | — | Updated service number |
| `unitType` | `String` | — | Updated service unit type |
| `vatPercent` | `Float` | — | Updated service vat percent |
| `quantity` | `Float` | — | Updated service quantity |
| `productPositions` | `[Documents_UpdateSupplyServiceProductPositionsInput]` | — | Product positions for this service. When provided, completely replaces all existing product positions. Omit this field to preserve existing product positions. |
| `wagePositions` | `[Documents_UpdateSupplyServiceWagePositionInput]` | — | Wage positions for this service. When provided, completely replaces all existing wage positions. Omit this field to preserve existing wage positions. |

#### `Documents_DeleteSupplyServiceActionInput` (Untertyp von `delete_supply_service`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `uid` | `String!` | — | The UID of the supply service to remove |

#### `Documents_DeleteSupplyProductActionInput` (Untertyp von `delete_supply_product`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `uid` | `String!` | — |  |

#### `Documents_AddExistingWageGroupActionInput` (Untertyp von `add_existing_wage_group`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `serviceUid` | `String!` | — | UID of the service to add the wage group to |
| `wageGroupId` | `Int!` | — | The ID of the existing wage group to add |
| `timeMinutes` | `Float` | — | Time in minutes (defaults to 1) |
| `activity` | `String` | — | Activity description override |

#### `Documents_UpdateSupplyProductActionInput` (Untertyp von `update_supply_product`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `uid` | `String!` | — |  |
| `name` | `String` | — |  |
| `description` | `String` | — |  |
| `nr` | `String` | — |  |
| `unit_type` | `String` | — |  |
| `ean` | `String` | — |  |
| `manufacturer` | `String` | — |  |
| `manufacturer_nr` | `String` | — |  |
| `net_price_per_unit` | `Float` | — |  |
| `vat_percent` | `Float` | — |  |
| `quantity` | `Float` | — |  |

#### `Documents_CreateSupplyServiceActionInput` (Untertyp von `create_supply_service`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `name` | `String!` | — | The name of the supply service |
| `unit_type` | `String!` | — | The unit type (e.g., hr, pcs, m) |
| `net_price_per_unit` | `Float` | — | Net price per unit. Required when the service has no product or wage positions; otherwise the total is derived from the positions. |
| `vat_percent` | `Float!` | — | VAT percentage |
| `quantity` | `Float!` | — | Quantity of the service |
| `description` | `String` | — | Description of the supply service |
| `nr` | `String` | — | Article number |
| `ean` | `String` | — | EAN code |
| `manufacturer` | `String` | — | Manufacturer name |
| `manufacturer_nr` | `String` | — | Manufacturer article number |
| `source` | `Documents_SourceEnum` | — | Source tracking for analytics |
| `insert_after` | `String` | — | UID of the position to insert after (appends at end if not provided) |
| `is_fixed_net_price` | `Boolean` | — | Whether the net price is fixed |
| `productPositions` | `[Documents_UpdateSupplyServiceProductPositionsInput]` | — | Optional material positions to create with the service. Reference catalogue items by id, or omit id for ad-hoc positions. When provided, the service total is calculated from these positions instead of net_price_per_unit. |
| `wagePositions` | `[Documents_UpdateSupplyServiceWagePositionInput]` | — | Optional wage positions to create with the service. Reference a wage group by id, or omit id for ad-hoc positions. When provided, the service total is calculated from these positions instead of net_price_per_unit. |

#### `Documents_AddPositionsFromDocumentActionInput` (Untertyp von `add_positions_from_document`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `documentId` | `Int!` | — | ID of the source document positions are copied from |
| `selectedPositions` | `[String!]!` | — | UIDs of the positions to copy from the source document |
| `titlePerDocument` | `Boolean` | — | Insert an intertitle naming the source document before its positions |
| `flowType` | `String` | — | "copy", "followup", or "empty" — controls GAEB addendum-title insertion and last-invoice deduplication |
| `fixedItemNumbers` | `Boolean` | — | Preserve the source document's item numbers instead of regenerating |

#### `Documents_SetReferenceDocumentsActionInput` (Untertyp von `set_reference_documents`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `referenceDocumentIds` | `[Int!]!` | — | IDs of the documents to reference (empty array clears the references) |
| `referenceDocuments` | `String!` | — | Comma-separated list of document numbers, displayed in the rendered document |

#### `Documents_ClearPositionsActionInput` (Untertyp von `clear_positions`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `_` | `Boolean` | — | Placeholder field — the action takes no parameters; GraphQL input types require at least one field |

#### `Documents_CopySalesMetadataActionInput` (Untertyp von `copy_sales_metadata`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `documentId` | `Int!` | — | The ID of the source document whose sales metadata should be copied |

#### `Documents_SetDocumentDiscountActionInput` (Untertyp von `set_document_discount`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `valueType` | `Documents_DiscountValueTypeEnum` | — | How "value" is interpreted: PERCENT (percentage) or FLAT (fixed amount). Defaults to PERCENT. |
| `value` | `Float` | — | Discount magnitude as a positive number. A percentage when valueType is "percent", a fixed currency amount when "flat". |
| `label` | `String` | — | Optional label shown on the document for the discount. |

#### `Documents_ClearDocumentDiscountActionInput` (Untertyp von `clear_document_discount`)

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `_` | `Boolean` | — | Placeholder field — the action takes no parameters; GraphQL input types require at least one field |

## Rückgabe-Felder (`Documents_CustomerDocumentDraft`)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `customer_document_id` | `Int` |  |
| `customer_document` | [[CustomerDocument\|`CustomerDocument`]] |  |
| `type` | `String` |  |
| `document_type_id` | `Int` |  |
| `name` | `String` |  |
| `status_code` | `Int` |  |
| `nr` | `String` |  |
| `date` | `Date` |  |
| `value` | `Float` |  |
| `data` | `Mixed` |  |
| `partner` | [[Partner\|`Partner`]] |  |
| `partner_id` | `Int` |  |
| `created` | `DateTime` |  |
| `modified` | `DateTime` |  |
| `is_protected` | `Boolean` |  |
| `description` | `String` |  |
| `deleted` | `Boolean` |  |
| `id` | `Int` |  |
| `customer_invoice_id` *(veraltet)* | `Int` |  |

---
*Quelle: Hero Software GraphQL API — automatisch generiert*