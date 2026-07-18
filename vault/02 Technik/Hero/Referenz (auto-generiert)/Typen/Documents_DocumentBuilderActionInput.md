# Documents_DocumentBuilderActionInput

**Art:** INPUT_OBJECT

## Eingabefelder

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

---
*Quelle: Hero Software GraphQL API — automatisch generiert*