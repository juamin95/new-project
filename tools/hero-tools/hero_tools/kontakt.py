"""Kontakte: suchen, anlegen, bearbeiten, Projektadresse hinzufügen.

Adresslogik (häufige Fehlerquelle, siehe Vault: Prozess Kundenstammdaten):
Bei customer_addresses zählt für Projekte die INNERE address.id,
nicht die äußere Verknüpfungs-id.
"""

from __future__ import annotations

from .client import gql

_KONTAKT_FELDER = """
    id
    full_name
    email
    phone_home_formatted
    phone_mobile_formatted
    address_id
    address { id street zipcode city }
    customer_addresses {
      id
      title
      address { id street zipcode city }
    }
"""


def suchen(query: str) -> list:
    data = gql(
        """
        query($q: String) {
          contacts(search: $q, show_deleted: false) {%s}
        }
        """ % _KONTAKT_FELDER,
        {"q": query},
    )
    return data["contacts"]


def anlegen(*, last_name: str, category: str = "customer", type: str = "private",
            title: str | None = None, first_name: str | None = None,
            company_name: str | None = None, email: str | None = None,
            phone: str | None = None, mobile: str | None = None,
            street: str | None = None, zipcode: str | None = None,
            city: str | None = None) -> dict:
    if type == "commercial" and not company_name:
        raise ValueError("type=commercial erfordert company_name")

    contact: dict = {"category": category, "type": type, "last_name": last_name}
    for key, val in [("title", title), ("first_name", first_name),
                     ("company_name", company_name), ("email", email),
                     ("phone_home_formatted", phone), ("phone_mobile_formatted", mobile)]:
        if val:
            contact[key] = val
    if street or city or zipcode:
        contact["address"] = {k: v for k, v in
                              [("street", street), ("zipcode", zipcode), ("city", city)] if v}

    data = gql(
        """
        mutation($contact: CustomerInput!) {
          create_contact(findExisting: true, contact: $contact) {
            id nr full_name address_id address { id street zipcode city }
          }
        }
        """,
        {"contact": contact},
    )
    return data["create_contact"]


def bearbeiten(*, id: int, **felder) -> dict:
    contact = {"id": id}
    erlaubt = ["category", "type", "title", "first_name", "last_name", "company_name",
               "email", "phone_home", "phone_mobile"]
    for key in erlaubt:
        if felder.get(key):
            contact[key] = felder[key]
    if felder.get("street") or felder.get("city") or felder.get("zipcode"):
        contact["address"] = {k: felder[k] for k in ("street", "zipcode", "city") if felder.get(k)}

    data = gql(
        """
        mutation($contact: CustomerInput!) {
          update_contact(contact: $contact) { id full_name }
        }
        """,
        {"contact": contact},
    )
    return data["update_contact"]


def adresse_hinzufuegen(*, customer_id: int, street: str, zipcode: str, city: str,
                        title: str | None = None) -> dict:
    ca: dict = {"customer_id": customer_id,
                "address": {"street": street, "zipcode": zipcode, "city": city}}
    if title:
        ca["title"] = title
    data = gql(
        """
        mutation($ca: CustomerAddressInput!) {
          create_customer_address(customer_address: $ca) {
            id
            title
            address { id street zipcode city }
          }
        }
        """,
        {"ca": ca},
    )
    result = data["create_customer_address"]
    # Die für Projekte relevante ID explizit hervorheben
    result["address_id_fuer_projekt"] = result["address"]["id"]
    return result
