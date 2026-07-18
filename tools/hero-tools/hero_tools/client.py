"""GraphQL-Client für die Hero Software Partner-API.

Alle Aufrufe laufen hier durch: Auth, Timeout, Fehlerbehandlung.
DateTime-Werte müssen ISO 8601 mit Offset sein (sonst antwortet Hero
mit generischem "Internal server error", siehe Vault-Doku CalendarEvent Kap. 4).
"""

from __future__ import annotations

import os
import sys
import json
from pathlib import Path

import requests
from dotenv import load_dotenv

ENDPOINT = "https://login.hero-software.de/api/external/v7/graphql"

# .env.local liegt im Repo-Root (ein Key, eine Stelle — wie scripts/hero-abgleich.mjs)
_REPO_ROOT = Path(__file__).resolve().parents[3]
load_dotenv(_REPO_ROOT / ".env.local")


class HeroError(Exception):
    pass


def gql(query: str, variables: dict | None = None) -> dict:
    api_key = os.getenv("HERO_API_KEY")
    if not api_key:
        raise HeroError("HERO_API_KEY fehlt in .env.local")

    payload: dict = {"query": query}
    if variables:
        payload["variables"] = variables

    resp = requests.post(
        ENDPOINT,
        headers={"X-Auth-Token": api_key, "Content-Type": "application/json"},
        json=payload,
        timeout=60,
    )
    if resp.status_code != 200:
        raise HeroError(f"HTTP {resp.status_code}: {resp.text[:500]}")

    data = resp.json()
    if "errors" in data:
        raise HeroError("GraphQL-Fehler: " + json.dumps(data["errors"], ensure_ascii=False, indent=2))
    return data["data"]


def out(data) -> None:
    """Ergebnis als JSON auf stdout — maschinen- und menschenlesbar."""
    json.dump(data, sys.stdout, ensure_ascii=False, indent=2, default=str)
    print()
