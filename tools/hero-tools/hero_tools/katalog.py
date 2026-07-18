"""Katalog-Stammdaten: Produkte (Material) und Leistungen.

Regeln (Vault: Prozess Stammdatenpflege):
- Suchen vor Anlegen (Dublettenschutz macht der aufrufende Prozess)
- Skelett-Katalog: Neuanlagen mit Preis 0.00, echte Preise erst am Dokument
- Nummernkreis-Vergabe deterministisch in Code (naechste_nr)
- Bei Leistungen mit Preis wäre is_fixed_net_price: true zwingend
"""

from __future__ import annotations

from .client import gql
from .stammdaten import (KREISE_LEISTUNG, KREISE_PRODUKT, check_unit, check_vat,
                         naechste_nr)


def produkte(*, search: str | None = None, first: int = 100, offset: int = 0) -> list:
    data = gql(
        """
        query($search: String, $first: Int, $offset: Int) {
          supply_product_versions(search: $search, first: $first, offset: $offset) {
            product_id nr base_price list_price vat_percent is_deleted
            base_data { name description unit_type manufacturer ean }
          }
        }
        """,
        {"search": search, "first": first, "offset": offset},
    )
    return [p for p in data["supply_product_versions"] if not p.get("is_deleted")]


def leistungen(*, search: str | None = None, first: int = 200, offset: int = 0) -> list:
    data = gql(
        """
        query($search: String, $first: Int, $offset: Int) {
          supply_services(search: $search, first: $first, offset: $offset) {
            id nr name description unit_type net_price_per_unit vat_percent is_deleted
          }
        }
        """,
        {"search": search, "first": first, "offset": offset},
    )
    return [s for s in data["supply_services"] if not s.get("is_deleted")]


def _alle_nrs(fetch, key: str) -> list[str]:
    """Alle Nummern paginiert einsammeln (für die Nummernkreis-Vergabe)."""
    nrs, offset = [], 0
    while True:
        seite = fetch(first=200, offset=offset)
        if not seite:
            break
        nrs += [eintrag.get(key) for eintrag in seite if eintrag.get(key)]
        if len(seite) < 200:
            break
        offset += 200
    return nrs


def produkt_anlegen(*, name: str, unit: str, vat: float, kreis: int) -> dict:
    if kreis not in KREISE_PRODUKT:
        raise ValueError(f"Produkt-Kreis {kreis} unbekannt. Erlaubt: {KREISE_PRODUKT}")
    check_unit(unit)
    check_vat(vat)
    nr = naechste_nr(_alle_nrs(produkte, "nr"), kreis)

    data = gql(
        """
        mutation($spv: Documents_SupplyProductVersionInput!) {
          create_supply_product_version(supply_product_version: $spv) {
            product_id nr base_data { name unit_type }
          }
        }
        """,
        {"spv": {
            "nr": nr,
            "base_price": 0.00,
            "list_price": 0.00,
            "vat_percent": float(vat),
            "base_data": {"name": name, "description": "", "unit_type": unit},
        }},
    )
    return data["create_supply_product_version"]


def leistung_anlegen(*, name: str, unit: str, kreis: int) -> dict:
    if kreis not in KREISE_LEISTUNG:
        raise ValueError(f"Leistungs-Kreis {kreis} unbekannt. Erlaubt: {KREISE_LEISTUNG}")
    check_unit(unit)
    nr = naechste_nr(_alle_nrs(leistungen, "nr"), kreis)

    data = gql(
        """
        mutation($ss: Documents_SupplyServiceInput!) {
          create_supply_service(supply_service: $ss) {
            id nr name unit_type
          }
        }
        """,
        {"ss": {
            "nr": nr,
            "name": name,
            "description": "",
            "unit_type": unit,
            "net_price_per_unit": 0.00,
            "is_fixed_net_price": True,
            "vat_percent": 19.0,
        }},
    )
    return data["create_supply_service"]
