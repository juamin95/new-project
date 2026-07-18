# Tools — Fähigkeiten-Ebene des GRÜNSCHNITT-OS

Ebene 1 des Blueprints: atomare, deterministische Operationen gegen angebundene Systeme.
Prozesswissen liegt nicht hier, sondern im Vault (`vault/01 Prozess/`) und in den Skills (`.claude/skills/`).

> **Source of Truth:** Dieses Repo. Der frühere Stand unter `/root/hero-tools` und
> `/root/hero-graphql` auf dem VPS ist seit 18.07.2026 Alt-Stand und wird nicht mehr gepflegt
> (der VPS bleibt für den n8n-Betrieb unangetastet). Migriert via PROJ-16.

## Inhalt

- `hero-tools/` — CLI für die Hero-GraphQL-Partner-API: ein Unterbefehl je atomarer Operation
  (kontakt, projekt, kalender, katalog, dokument, historie, stammdaten, export).
  Befehlsreferenz: `hero-tools/README.md`
- `hero-graphql/introspect.py` — zieht das komplette Hero-Schema per Introspection und
  generiert die Markdown-Referenz. Zielordner ist **Pflicht-Argument**:
  `./hero-tools/venv/bin/python hero-graphql/introspect.py '<Zielordner>'`

## Setup (einmalig je Gerät)

1. `HERO_API_KEY=...` in der `.env.local` im **Repo-Root** eintragen (nie committen)
2. venv einrichten:
   ```bash
   cd tools/hero-tools
   python3 -m venv venv
   ./venv/bin/pip install requests python-dotenv
   ```
3. Test: `./hero kalender kategorien`

Voraussetzung: Python ≥ 3.9 (macOS-System-Python reicht; die Module sind per
`from __future__ import annotations` abwärtskompatibel gehalten und laufen unverändert
auf neueren Versionen, z. B. auf dem künftigen VPS).

## Regeln für den Agenten

Verbindlich in `.claude/rules/hero-tools.md`: Entwurf-first (Angebote/Rechnungen nur als
Hero-Draft, Versand immer durch Menschen) und Lese-/Schreib-Gate (Lesebefehle frei,
Schreibbefehle nur nach Freigabe im Vorgang).
