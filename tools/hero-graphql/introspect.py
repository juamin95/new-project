"""
Hero Software GraphQL Introspection
Schreibt alle Queries, Mutations und Typen als Markdown ins Vault.
Jede Operation enthält: Argumente/Filter, expandierte Input-Typen, Rückgabe-Felder.
"""

import os
import re
import sys
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

# .env.local liegt im Repo-Root (ein Key, eine Stelle)
load_dotenv(Path(__file__).resolve().parents[2] / ".env.local")

ENDPOINT = "https://login.hero-software.de/api/external/v7/graphql"
API_KEY = os.getenv("HERO_API_KEY")

# Zielpfad ist Pflicht-Argument: Der Generator überschreibt ganze Ordner,
# deshalb keine hart codierten oder impliziten Ziele.
if len(sys.argv) < 2 or not sys.argv[1].strip():
    sys.exit("FEHLER: Zielpfad fehlt.\nAufruf: python3 introspect.py <Zielordner>\n"
             "Beispiel: python3 introspect.py 'vault/02 Technik/Hero/Referenz (auto-generiert)'")
VAULT_BASE = Path(sys.argv[1]).resolve()

INTROSPECTION_QUERY = """
{
  __schema {
    queryType { name }
    mutationType { name }
    types {
      kind
      name
      description
      fields(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
        args {
          name
          description
          type { ...TypeRef }
          defaultValue
        }
        type { ...TypeRef }
      }
      inputFields {
        name
        description
        type { ...TypeRef }
        defaultValue
      }
      enumValues(includeDeprecated: true) {
        name
        description
        isDeprecated
        deprecationReason
      }
    }
  }
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
}
"""

TYPES_BY_NAME: dict = {}


def type_string(t):
    if t is None:
        return "Unknown"
    if t["kind"] == "NON_NULL":
        return type_string(t["ofType"]) + "!"
    if t["kind"] == "LIST":
        return "[" + type_string(t["ofType"]) + "]"
    return t["name"] or t["kind"]


def base_type_name(t):
    """Unwrap NON_NULL/LIST to get the core type name."""
    if t is None:
        return None
    if t["kind"] in ("NON_NULL", "LIST"):
        return base_type_name(t["ofType"])
    return t.get("name")


def slug(name):
    return re.sub(r"[^a-zA-Z0-9_-]", "_", name)


def fetch_schema():
    if not API_KEY or API_KEY == "hier_deinen_api_key_eintragen":
        print("Fehler: HERO_API_KEY in .env.local fehlt oder ist noch Platzhalter.")
        sys.exit(1)

    headers = {"X-Auth-Token": API_KEY, "Content-Type": "application/json"}
    response = requests.post(
        ENDPOINT, headers=headers, json={"query": INTROSPECTION_QUERY}, timeout=30
    )
    response.raise_for_status()
    data = response.json()
    if "errors" in data:
        print("GraphQL-Fehler:", json.dumps(data["errors"], indent=2))
        sys.exit(1)
    return data["data"]["__schema"]


# ---------------------------------------------------------------------------
# Markdown-Bausteine
# ---------------------------------------------------------------------------

def args_section(args):
    """Argumente-Tabelle inkl. Filter-Hinweis."""
    if not args:
        return ""
    lines = ["## Argumente & Filter", ""]
    lines += ["| Argument | Typ | Standard | Beschreibung |",
               "|----------|-----|----------|--------------|"]
    for a in args:
        default = a.get("defaultValue") or "—"
        desc = (a.get("description") or "").replace("\n", " ")
        lines.append(f"| `{a['name']}` | `{type_string(a['type'])}` | {default} | {desc} |")
    lines.append("")
    return "\n".join(lines)


def input_expansion_section(args):
    """
    Für jeden Arg, dessen Basistyp ein INPUT_OBJECT ist:
    zeige dessen Felder inline expandiert.
    """
    sections = []
    for a in args:
        name = base_type_name(a["type"])
        if not name:
            continue
        t = TYPES_BY_NAME.get(name)
        if not t or t["kind"] != "INPUT_OBJECT":
            continue
        fields = t.get("inputFields") or []
        if not fields:
            continue
        lines = [f"### Input-Felder: `{name}` (für Argument `{a['name']}`)", ""]
        lines += ["| Feld | Typ | Standard | Beschreibung |",
                   "|------|-----|----------|--------------|"]
        for f in fields:
            default = f.get("defaultValue") or "—"
            desc = (f.get("description") or "").replace("\n", " ")
            lines.append(f"| `{f['name']}` | `{type_string(f['type'])}` | {default} | {desc} |")
        lines.append("")

        # Zweite Ebene: falls ein Input-Feld selbst ein Input-Objekt ist
        for f in fields:
            sub_name = base_type_name(f["type"])
            if not sub_name:
                continue
            sub_t = TYPES_BY_NAME.get(sub_name)
            if not sub_t or sub_t["kind"] != "INPUT_OBJECT":
                continue
            sub_fields = sub_t.get("inputFields") or []
            if not sub_fields:
                continue
            lines += [f"#### `{sub_name}` (Untertyp von `{f['name']}`)", ""]
            lines += ["| Feld | Typ | Standard | Beschreibung |",
                       "|------|-----|----------|--------------|"]
            for sf in sub_fields:
                default = sf.get("defaultValue") or "—"
                desc = (sf.get("description") or "").replace("\n", " ")
                lines.append(f"| `{sf['name']}` | `{type_string(sf['type'])}` | {default} | {desc} |")
            lines.append("")

        sections.append("\n".join(lines))
    return "\n".join(sections)


def return_fields_section(return_type_ref):
    """Zeige alle Felder des Rückgabetyps (eine Ebene tief)."""
    name = base_type_name(return_type_ref)
    if not name:
        return ""
    t = TYPES_BY_NAME.get(name)
    if not t or t["kind"] not in ("OBJECT", "INTERFACE"):
        return ""
    fields = t.get("fields") or []
    if not fields:
        return ""

    lines = [f"## Rückgabe-Felder (`{name}`)", ""]
    lines += ["| Feld | Typ | Beschreibung |",
               "|------|-----|--------------|"]
    for f in fields:
        desc = (f.get("description") or "").replace("\n", " ")
        dep = " *(veraltet)*" if f.get("isDeprecated") else ""
        # Wikilink zu komplexen Untertypen
        base = base_type_name(f["type"])
        sub_t = TYPES_BY_NAME.get(base) if base else None
        type_display = f"`{type_string(f['type'])}`"
        if sub_t and sub_t["kind"] in ("OBJECT", "INTERFACE", "ENUM", "INPUT_OBJECT"):
            type_display = f"[[{slug(base)}\\|`{type_string(f['type'])}`]]"
        lines.append(f"| `{f['name']}`{dep} | {type_display} | {desc} |")
    lines.append("")
    return "\n".join(lines)


def enum_info(args):
    """Für Enum-Argumente: zeige die möglichen Werte."""
    sections = []
    seen = set()
    for a in args:
        name = base_type_name(a["type"])
        if not name or name in seen:
            continue
        t = TYPES_BY_NAME.get(name)
        if not t or t["kind"] != "ENUM":
            continue
        seen.add(name)
        values = t.get("enumValues") or []
        if not values:
            continue
        lines = [f"### Enum-Werte: `{name}` (für `{a['name']}`)", ""]
        lines += ["| Wert | Beschreibung |", "|------|--------------|"]
        for v in values:
            desc = (v.get("description") or "").replace("\n", " ")
            lines.append(f"| `{v['name']}` | {desc} |")
        lines.append("")
        sections.append("\n".join(lines))
    return "\n".join(sections)


# ---------------------------------------------------------------------------
# Datei-Writer
# ---------------------------------------------------------------------------

def write_operation(folder: Path, field: dict, op_type: str):
    folder.mkdir(parents=True, exist_ok=True)
    fname = folder / f"{slug(field['name'])}.md"

    deprecated = ""
    if field.get("isDeprecated"):
        reason = field.get("deprecationReason") or "—"
        deprecated = f"\n> **Veraltet:** {reason}\n"

    args = field.get("args") or []
    return_ref = field["type"]
    return_name = base_type_name(return_ref)

    return_link = f"[[{slug(return_name)}]]" if return_name and return_name in TYPES_BY_NAME else f"`{type_string(return_ref)}`"

    parts = [
        f"# {field['name']}",
        "",
        f"**Typ:** {op_type}  ",
        f"**Rückgabe:** {return_link}",
        deprecated,
        (field.get("description") or "").strip(),
        "",
        "---",
        "",
        args_section(args),
        enum_info(args),
        input_expansion_section(args),
        return_fields_section(return_ref),
        "---",
        "*Quelle: Hero Software GraphQL API — automatisch generiert*",
    ]

    fname.write_text("\n".join(p for p in parts if p is not None), encoding="utf-8")


def write_type(folder: Path, t: dict):
    folder.mkdir(parents=True, exist_ok=True)
    fname = folder / f"{slug(t['name'])}.md"

    lines = [f"# {t['name']}", "", f"**Art:** {t['kind']}", ""]
    if t.get("description"):
        lines += [t["description"].strip(), ""]

    if t.get("fields"):
        lines += ["## Felder", "", "| Feld | Typ | Beschreibung |",
                   "|------|-----|--------------|"]
        for f in t["fields"]:
            desc = (f.get("description") or "").replace("\n", " ")
            dep = " *(veraltet)*" if f.get("isDeprecated") else ""
            base = base_type_name(f["type"])
            sub_t = TYPES_BY_NAME.get(base) if base else None
            type_display = f"`{type_string(f['type'])}`"
            if sub_t and sub_t["kind"] in ("OBJECT", "INTERFACE", "ENUM", "INPUT_OBJECT"):
                type_display = f"[[{slug(base)}\\|`{type_string(f['type'])}`]]"
            lines.append(f"| `{f['name']}`{dep} | {type_display} | {desc} |")
        lines.append("")

    if t.get("inputFields"):
        lines += ["## Eingabefelder", "", "| Feld | Typ | Standard | Beschreibung |",
                   "|------|-----|----------|--------------|"]
        for f in t["inputFields"]:
            default = f.get("defaultValue") or "—"
            desc = (f.get("description") or "").replace("\n", " ")
            lines.append(f"| `{f['name']}` | `{type_string(f['type'])}` | {default} | {desc} |")
        lines.append("")

    if t.get("enumValues"):
        lines += ["## Mögliche Werte (Enum)", "", "| Wert | Beschreibung |",
                   "|------|--------------|"]
        for v in t["enumValues"]:
            desc = (v.get("description") or "").replace("\n", " ")
            dep = " *(veraltet)*" if v.get("isDeprecated") else ""
            lines.append(f"| `{v['name']}`{dep} | {desc} |")
        lines.append("")

    lines += ["---", "*Quelle: Hero Software GraphQL API — automatisch generiert*"]
    fname.write_text("\n".join(lines), encoding="utf-8")


def write_overview(queries, mutations):
    fname = VAULT_BASE / "00 Übersicht.md"
    lines = [
        "# Hero Software GraphQL API",
        "",
        "Automatisch generiert via Introspection.",
        "",
        f"**Endpoint:** `{ENDPOINT}`",
        "",
        "---",
        "",
        "## Queries",
        "",
    ]
    for q in sorted(queries, key=lambda x: x["name"]):
        return_name = base_type_name(q["type"])
        lines.append(f"- [[{slug(q['name'])}|{q['name']}]] → `{type_string(q['type'])}`")

    lines += ["", "## Mutations", ""]
    for m in sorted(mutations, key=lambda x: x["name"]):
        lines.append(f"- [[{slug(m['name'])}|{m['name']}]] → `{type_string(m['type'])}`")

    lines += ["", "---", "*Automatisch generiert*"]
    fname.write_text("\n".join(lines), encoding="utf-8")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    global TYPES_BY_NAME

    print("Lade Schema von Hero Software GraphQL API...")
    schema = fetch_schema()

    TYPES_BY_NAME = {t["name"]: t for t in schema["types"]}

    query_root = schema.get("queryType") or {}
    mutation_root = schema.get("mutationType") or {}

    query_type = TYPES_BY_NAME.get(query_root.get("name", ""), {})
    mutation_type = TYPES_BY_NAME.get(mutation_root.get("name", ""), {})

    queries = query_type.get("fields") or []
    mutations = mutation_type.get("fields") or []

    print(f"  {len(queries)} Queries, {len(mutations)} Mutations gefunden.")

    VAULT_BASE.mkdir(parents=True, exist_ok=True)

    query_folder = VAULT_BASE / "Queries"
    for field in queries:
        write_operation(query_folder, field, "Query")

    mutation_folder = VAULT_BASE / "Mutations"
    for field in mutations:
        write_operation(mutation_folder, field, "Mutation")

    skip_prefixes = ("__",)
    skip_kinds = ("SCALAR",)
    root_names = {query_root.get("name"), mutation_root.get("name")}

    type_folder = VAULT_BASE / "Typen"
    written_types = 0
    for t in schema["types"]:
        name = t["name"]
        if any(name.startswith(p) for p in skip_prefixes):
            continue
        if t["kind"] in skip_kinds:
            continue
        if name in root_names:
            continue
        write_type(type_folder, t)
        written_types += 1

    write_overview(queries, mutations)

    print(f"  {written_types} Typen geschrieben.")
    print(f"\nFertig! Vault-Pfad: {VAULT_BASE}")


if __name__ == "__main__":
    main()
