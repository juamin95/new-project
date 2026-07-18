# PROJ-6: Migration Prozess-Skills

## Status: Planned
**Created:** 2026-07-18
**Last Updated:** 2026-07-18

## Dependencies
- Requires: PROJ-3 (Prozesswissen) — Skills referenzieren die Prozessnotizen ✓ (Approved)
- Requires: PROJ-4 (Hero-Wissen) — Skills referenzieren das Praxiswissen ✓ (Approved)
- Requires: PROJ-16 (Tool-Ebene) — Skills rufen die hero-tools CLI auf ✓ (Approved)
- Wird benötigt von: PROJ-10 (Cockpit-Chat nutzt die Skills)

## User Stories
- Als **Julian** möchte ich die vier praxisgetesteten Skills in diesem Repo, damit die komplette Prozess-Ebene des OS übergabefähig hier lebt — Phase 1 ist damit abgeschlossen.
- Als **Agent (das OS)** möchte ich Skills, deren Pfade auf die neue Repo-Struktur zeigen, damit jeder Skill-Trigger die richtigen Tools, Notizen und Wissensbasen findet.
- Als **Julian** möchte ich einen bewiesenen End-to-End-Durchlauf (Skill → CLI → Hero) im neuen Repo, damit ich der umgezogenen Kette vertraue.
- Als **Übernehmender** möchte ich eine Skills-Übersicht in `03 AI/`, damit klar ist, welcher Skill welchen Prozess abbildet.

## Migrationsumfang

**Die vier Skills** (12 Dateien) aus dem alten Vault (`.claude/skills/`) in dieses Repo:

| Skill | Dateien | Prozess-Bezug |
|---|---|---|
| `bauprojekt` | SKILL.md + 7 Schritt-Dateien (Progressive Disclosure) | Prozess Bauprojekt End-to-End |
| `projekt-ohne-angebot` | SKILL.md | Prozess Projekt ohne Angebot |
| `abo` | SKILL.md | Prozess Abo-Einsatz |
| `hero-stammdaten` | SKILL.md + kunde.md + katalog.md | Supportprozesse S1/S2 |

**Plus:** die aus PROJ-5 vertagte **Skills-Übersicht** in `vault/03 AI/`.

## Kuratierung (nur Pfade und Umgebung — Logik bleibt 1:1)
- `/root/hero-tools/hero` → `tools/hero-tools/hero` (alle CLI-Aufrufe)
- Alte Vault-Pfade → neue Schichtstruktur: Prozessnotizen (`vault/01 Prozess/…`), Projekttypen-Wissensbasis (`vault/00 Betrieb/…`), Praxiswissen (`vault/02 Technik/Hero/…`), Lernlog (`vault/03 AI/Lernlog/…`)
- Harte Regeln, Gates, Zwei-Phasen-Muster, Schritt-Logik: unverändert — die Skills sind praxisgetestet (14.07.2026), nur ihre Umgebung ist umgezogen
- Kein Namenskonflikt mit den Workflow-Skills dieses Repos (init, write-spec, qa, …) — geprüft

## Validierung (Hybrid)
1. **Statisch, alle vier Skills:** Jeder referenzierte Pfad existiert im neuen Repo (Tools, Notizen, Wissensbasis, Praxiswissen, Lernlog); die von den Skills genutzten CLI-Lesebefehle laufen
2. **Ein End-to-End-Praxistest:** `projekt-ohne-angebot` am Testkunden (Julian Amini, customer_id 5711737) — Projekt anlegen → Termin → Status → Rechnungs**entwurf** (`publish: false`) → Abschluss und Archivierung (2100). **Jede Schreibaktion einzeln von Julian freigegeben**, Protokoll in der Spec

## Out of Scope
- **Stilllegung des alten Vaults — bewusst gar nicht** (Julians Entscheidung 18.07.: bleibt vorerst unangetastet; die „nach PROJ-6"-Vermerke in PROJ-2/3 werden aktualisiert)
- Skill-Weiterentwicklung, neue Skills oder Regeln — reine Migration
- **Skill-Kategorien nach Leistungsarten** (Grünpflege, Steinreinigung, Zaunbau, Rollrasen, …) — Julians Idee für künftige Skills, wird nach Phase 1 gemeinsam durchgegangen → PRD-Parkplatz
- Cockpit-Chat-Anbindung der Skills — PROJ-10
- Write-Tests für bauprojekt/abo/hero-stammdaten — am 14.07. praxisgetestet; der exemplarische E2E-Test beweist die umgezogene Kette

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen die Migration ist abgeschlossen, wenn man `.claude/skills/` prüft, dann liegen dort alle 12 Skill-Dateien der vier Prozess-Skills
- [ ] Angenommen eine migrierte Skill-Datei wird durchsucht, wenn man nach `/root/` oder alten Vault-Pfaden sucht, dann gibt es keine Treffer
- [ ] Angenommen die statische Validierung läuft, wenn sie jeden in den Skills referenzierten Pfad prüft, dann existieren alle Ziele (dokumentierte Liste in der Spec)
- [ ] Angenommen der E2E-Test läuft, wenn der Skill projekt-ohne-angebot den Testkunden-Durchlauf macht, dann durchläuft das Testprojekt die Pipeline-Schritte, die Rechnung bleibt Entwurf, das Projekt endet archiviert (2100) — und jede Schreibaktion hatte Julians Einzelfreigabe
- [ ] Angenommen der E2E-Test ist abgeschlossen, wenn man die Spec liest, dann ist der Durchlauf protokolliert (Aktionen, IDs, Ergebnis)
- [ ] Angenommen die Skills-Übersicht existiert in `03 AI/`, wenn man sie öffnet, dann nennt sie die vier Skills, verlinkt die Prozessnotizen und dokumentiert die Repo-Root-Konvention der CLI-Aufrufe
- [ ] Angenommen die Migration ist abgeschlossen, wenn `npm test` läuft, dann sind alle Tests grün — Phase 1 ist komplett

## Edge Cases
- **Skill referenziert etwas nicht Migriertes** → statische Prüfung findet es → Rückfrage, nicht stillschweigend umbiegen
- **Write im E2E-Test schlägt fehl** → Abbruch ohne Halbzustand; bereits angelegtes Testprojekt wird archiviert, Befund dokumentiert (ggf. Lernlog)
- **CLI-Aufrufe mit relativem Pfad** → Konvention: Skills gehen vom Repo-Root aus (in der Skills-Übersicht dokumentiert)
- **Hero nicht erreichbar beim Test** → statische Validierung zählt, E2E wird nachgeholt
- **Skill-Text enthält VPS-/Session-Spezifika** → im Review ausweisen und anpassen (analog PROJ-5-Pfadaktualisierung)

## Technical Requirements (optional)
- E2E-Test ausschließlich am Testkunden; Rechnungen nur als Entwurf (`publish: false`, Entwurf-first-Regel)
- Schreibaktionen nur mit Einzelfreigabe (hero-tools-Gate)

## Open Questions
- Keine.

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Hybrid-Validierung: statisch × 4 + ein E2E-Test | Skills sind praxisgetestet; geändert ist nur die Umgebung — ein Durchlauf beweist die Kette ohne vier Sätze Testdaten | 2026-07-18 |
| E2E mit projekt-ohne-angebot | Kürzester Skill, deckt Anlegen/Termin/Status/Rechnungsentwurf ab | 2026-07-18 |
| Alter Vault bleibt vorerst komplett unangetastet | Julians Entscheidung; Stilllegung irgendwann später | 2026-07-18 |
| Skill-Kategorien (Grünpflege, Steinreinigung, Zaunbau, Rollrasen, …) auf den Parkplatz | Julians Idee für künftige Skills — nach Phase 1 gemeinsam durchgehen; passt zu den Projektarten der Wissensbasis und der Checklisten-Backlog-Idee | 2026-07-18 |

### Technical Decisions
<!-- Added by /architecture -->
| Decision | Rationale | Date |
|----------|-----------|------|

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
