# Feature Index

> Central tracking for all features. Updated by skills automatically.

## Status Legend
- **Roadmap** - `/init` done, feature identified in feature map, no spec file yet
- **Planned** - `/write-spec` done, full spec written, architecture not yet designed
- **Architected** - `/architecture` done, tech design approved, ready to build
- **In Progress** - `/frontend` or `/backend` active or completed, not yet in QA
- **In Review** - `/qa` active, testing in progress
- **Approved** - `/qa` passed, no critical/high bugs, ready to deploy
- **Deployed** - `/deploy` done, live in production

## Features

### Phase 1 — Wissensmigration (aus Vault `gruenschnitt-wissen`, validiert)

| ID | Feature | Beschreibung | Prio | Abhängigkeiten | Status | Spec | Created |
|----|---------|--------------|------|----------------|--------|------|---------|
| PROJ-2 | Vault-Gerüst & Governance | Repo-2-Struktur, Ordnerlogik, Regeln, Migrations-Filter (nur GRÜNSCHNITT + OS) | P0 | Keine | Approved | [Spec](PROJ-2-vault-geruest-governance.md) | 2026-07-17 |
| PROJ-3 | Migration Prozesswissen | Prozesslandkarte, 3 Kernprozesse (Projekt / ohne Angebot / Abo), Supportprozesse | P0 | PROJ-2 | Approved | [Spec](PROJ-3-migration-prozesswissen.md) | 2026-07-17 |
| PROJ-4 | Migration Hero-GraphQL-Wissen | API-Referenz + verifiziertes Praxiswissen (Referenz via introspect.py neu generiert) | P0 | PROJ-2, PROJ-16 | Approved | [Spec](PROJ-4-migration-hero-graphql-wissen.md) | 2026-07-17 |
| PROJ-5 | Migration OS-Wissen + Branding | Blueprint, Wissenskreislauf; Branding → `docs/design-system.md`, Schreibstil in den Vault | P0 | PROJ-2 | Approved | [Spec](PROJ-5-migration-os-wissen-branding.md) | 2026-07-17 |
| PROJ-16 | Migration Tool-Ebene (Hero-CLI + Introspection) | hero-tools CLI + introspect.py vom VPS ins Repo, Setup + Funktionstest gegen Hero | P0 | PROJ-2 | Approved | [Spec](PROJ-16-migration-tool-ebene.md) | 2026-07-18 |
| PROJ-6 | Migration Prozess-Skills | bauprojekt, projekt-ohne-angebot, abo, hero-stammdaten — mit Validierungstest | P0 | PROJ-3, PROJ-4, PROJ-16 | Approved | [Spec](PROJ-6-migration-prozess-skills.md) | 2026-07-17 |

### Phase 2 — Cockpit (Web-App für Marvin)

| ID | Feature | Beschreibung | Prio | Abhängigkeiten | Status | Spec | Created |
|----|---------|--------------|------|----------------|--------|------|---------|
| PROJ-1 | Supabase-Infrastruktur | Website-Projekt „juamin95's Project" (bnzpdujupmmrwcbunbql) erweitern: Auth, Cockpit-Schema, Env-Setup | P0 | Keine | Roadmap | — | 2026-07-17 |
| PROJ-7 | Cockpit-Grundgerüst | Login (Marvin/Julian), mobile-first Navigation im GRÜNSCHNITT-Branding | P0 | PROJ-1, PROJ-5 | Roadmap | — | 2026-07-17 |
| PROJ-8 | Prozess-Board | Hero-Projekte entlang der 3 Pipelines, Anfrage → Rechnungserstellung auf einen Blick | P0 | PROJ-7 | Roadmap | — | 2026-07-17 |
| PROJ-9 | Review-Liste (Gate) | Entwürfe (Mails, Angebote, Rechnungen) prüfen/freigeben, Audit-Trail — nie Autoversand | P0 | PROJ-7 | Roadmap | — | 2026-07-17 |
| PROJ-10 | Chat mit dem OS | Aktionen in Alltagssprache (Termine anlegen, Fragen, Zusammenfassungen); nutzt migrierte Skills | P0 | PROJ-6, PROJ-7 | Roadmap | — | 2026-07-17 |
| PROJ-11 | Aufgaben & To-dos | System erkennt Aufgaben aus Anfragen/Prozessstatus; Marvin arbeitet sie mit dem OS ab | P0 | PROJ-8, PROJ-10 | Roadmap | — | 2026-07-17 |
| PROJ-12 | Anfrage-Eingang | Website-Leads + E-Mail-Anfragen (n8n-klassifiziert) erkennen und Projekten zuordnen | P1 | PROJ-7 | Roadmap | — | 2026-07-17 |
| PROJ-13 | Termin- & Einsatzansicht | Wochenansicht der Einsätze aus Hero-Terminen; Erstellung läuft übers OS (Chat) | P1 | PROJ-8 | Roadmap | — | 2026-07-17 |
| PROJ-14 | n8n-Anbindung & Routinen-Monitoring | Agent-Zugriff auf n8n via MCP: Executions auswerten, Fehlläufe melden, nachtriggern | P1 | PROJ-7 | Roadmap | — | 2026-07-17 |
| PROJ-15 | Feedbackschleifen / Lernkreislauf | Korrekturen bei Freigaben werden erfasst → System lernt (Wissenskreislauf, mit Gate) | P2 | PROJ-9, PROJ-10 | Roadmap | — | 2026-07-17 |

<!-- Add features above this line -->

## Empfohlene Build-Reihenfolge

PROJ-2 → PROJ-3 → PROJ-16 → PROJ-4 / PROJ-5 (parallel möglich) → PROJ-6 → PROJ-1 → PROJ-7 → PROJ-8 + PROJ-9 → PROJ-10 → PROJ-11 → P1-Features (PROJ-12, PROJ-13, PROJ-14) → PROJ-15

## Next Available ID: PROJ-17
