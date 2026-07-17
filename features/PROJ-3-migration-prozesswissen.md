# PROJ-3: Migration Prozesswissen

## Status: Planned
**Created:** 2026-07-17
**Last Updated:** 2026-07-17

## Dependencies
- Requires: PROJ-2 (Vault-Gerüst & Governance) — Zielstruktur, Notiz-Konventionen, Migrations-Filter ✓ (Approved)

## User Stories
- Als **Julian** möchte ich alle Prozessnotizen kuratiert im neuen Vault haben, damit der GRÜNSCHNITT-Prozessteil meines privaten Vaults abschaltbar wird.
- Als **Agent (das OS)** möchte ich verifizierte Prozessnotizen als Arbeitsgrundlage, damit die Prozess-Skills (PROJ-6) auf geprüftem Wissen aufsetzen.
- Als **Julian** möchte ich technische Fakten (Projekttyp-IDs, Statuspipelines, Status-Codes) gegen das lebende Hero-System geprüft haben, damit keine Abschreibfehler verewigt werden.
- Als **Übernehmender** möchte ich über die Prozesslandkarte in `01 Prozess/` einsteigen und von dort jeden Prozess erreichen.
- Als **Julian** möchte ich je migrierter Notiz nachvollziehen können, woher sie stammt und wann sie validiert wurde (`quelle`-Feld).

## Migrationsumfang (9 Notizen)

| Quelle (alter Vault) | Ziel (neuer Vault) | Zielstatus |
|---|---|---|
| Prozesslandkarte | `01 Prozess/Prozesslandkarte.md` | verifiziert* |
| Prozess Bauprojekt End-to-End | `01 Prozess/Kernprozesse/` | verifiziert* |
| Prozess Projekt ohne Angebot | `01 Prozess/Kernprozesse/` | verifiziert* |
| Prozess Abo-Einsatz | `01 Prozess/Kernprozesse/` | verifiziert* |
| Prozess Stammdatenpflege | `01 Prozess/Supportprozesse/` | erfasst |
| Prozess Kundenstammdaten | `01 Prozess/Supportprozesse/` | erfasst |
| Prozess Belegfluss Buchhaltung | `01 Prozess/Supportprozesse/` | erfasst |
| Lernlog Bauprozess | `03 AI/Lernlog/` | erfasst |
| Projekttypen-Wissensbasis | `00 Betrieb/` | erfasst |

\* nur nach bestandener zweistufiger Validierung — sonst ehrlich `erfasst`

**Einordnung der Grenzfälle (aus dem Interview):**
- **Lernlog Bauprozess** = Beobachtungsspeicher des Wissenskreislaufs (append-only, Stufe „Erfassen"; aktuell 1 Eintrag vom 12.07.). Gehört in den Lernlog-Bereich, nicht zu den Prozessen.
- **Projekttypen-Wissensbasis** = datenbasiertes Betriebswissen (Umsatzcluster aus 131 Rechnungen 2026, Preisanker, Cross-Selling-Checklisten, Kundenstruktur) — beschreibt den Betrieb, nicht einen Ablauf → `00 Betrieb/`. Bleibt `erfasst`, bis das Cluster-Review aus der Systemdatenanalyse abgeschlossen ist; Prozessschritte (z. B. Angebotserstellung B3) verlinken darauf.
- **Praxistests/Echtbetrieb (u. a. Fall Greiner):** keine separaten Testprotokolle vorhanden — das validierte Ergebnis der Tests ist bereits der Inhalt der Prozessnotizen. Technisches Hero-Testwissen steckt im „Praxiswissen (verifiziert)" → PROJ-4; Skill-Validierungstests → PROJ-6.

## Validierung (zweistufig)
1. **Hero-Abgleich:** Projekttyp-IDs (32646 / 65686 / 65869), Statuspipelines und Status-Codes (201–2100), Wartungsvertrags-Automatik der Abo-Projekte gegen das lebende Hero-System prüfen; Ergebnis je Notiz dokumentieren.
2. **Julians Review als Gate:** Freigabe je Notiz (Gegenüberstellung alt/neu); erst danach `status: verifiziert`.

## Kuratierungsregeln
- Fachlich 1:1 — eine Notiz je Prozess, Schritte bleiben Abschnitte (z. B. B1–B7); kein inhaltliches Umschreiben, keine Aufspaltung in Schritt-Dateien
- Angepasst werden nur: Frontmatter (Konventionen aus PROJ-2 inkl. `quelle`), Wikilinks, Ablageort
- Links auf noch nicht migrierte Ziele (Hero-Praxiswissen → PROJ-4, OS-Notizen → PROJ-5) werden als Klartext übernommen und im jeweiligen Folge-Feature zu Wikilinks aktiviert — keine toten Links im Vault
- Links auf Privates (z. B. Projektnotiz „KI-Betriebssystem", „Systemdatenanalyse GRÜNSCHNITT") werden ersetzt oder entfernt (Migrations-Filter)
- Der Backlog-Abschnitt „Zukunftsideen" im Bauprozess wandert 1:1 mit und bleibt als Backlog gekennzeichnet

## Out of Scope
- Vervollständigung der drei Supportprozesse (als „offen" markiert) — eigene Prozesserfassung, später via `/refine`
- Hero-API-Wissen (Referenz + Praxiswissen) — PROJ-4
- OS-Wissen, Branding, Schreibstil — PROJ-5
- Prozess-Skills inkl. Validierungstests — PROJ-6
- Neuaufbau/Cluster-Review der Projekttypen-Wissensbasis — läuft im Projekt Systemdatenanalyse (privater Vault)
- Prozess-Redesign oder -Optimierung — reine Migration
- Stilllegung der Quellnotizen im alten Vault — nach Abschluss PROJ-6

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen die Migration ist abgeschlossen, wenn man die 9 Quellnotizen mit dem neuen Vault vergleicht, dann existiert für jede eine Ziel-Notiz am definierten Ort mit `quelle`-Feld (Herkunft + Datum)
- [ ] Angenommen eine Kernprozess-Notiz oder die Landkarte hat Hero-Abgleich UND Julians Review bestanden, wenn man ihr Frontmatter liest, dann steht dort `status: verifiziert`
- [ ] Angenommen eine Notiz hat den Abgleich nicht bestanden oder ist als unvollständig bekannt (Supportprozesse, Lernlog, Wissensbasis), wenn man ihr Frontmatter liest, dann steht dort `status: erfasst`
- [ ] Angenommen der Hero-Abgleich findet eine Abweichung zwischen Notiz und System, wenn die Migration fortgesetzt wird, dann wird die Notiz nicht verifiziert, die Abweichung dokumentiert und Julian gefragt — nie stillschweigend korrigiert
- [ ] Angenommen die Migration ist abgeschlossen, wenn man die Prozesslandkarte öffnet, dann verlinkt sie alle 6 Prozessnotizen in der neuen Struktur und die Links lösen auf
- [ ] Angenommen die Migration ist abgeschlossen, wenn man den neuen Vault nach privaten Inhalten durchsucht (SAP, Deutz, Daily Notes, private Projektnotizen), dann findet sich nichts davon
- [ ] Angenommen die Migration ist abgeschlossen, wenn `npm test` läuft, dann sind alle Vault-Governance-Tests grün (Frontmatter, keine toten Wikilinks, keine Secrets)
- [ ] Angenommen eine migrierte Notiz referenziert Wissen aus PROJ-4/PROJ-5, wenn man sie liest, dann ist der Verweis als Klartext erkennbar (kein toter Wikilink)

## Edge Cases
- **Hero nicht erreichbar während der Validierung** → Migration läuft weiter, betroffene Notizen bleiben `erfasst`, Abgleich wird nachgeholt (Notiz im Lernlog)
- **Quellnotiz ändert sich im alten Vault während der Migration** → `quelle`-Datum friert den Migrationsstand ein; spätere Deltas laufen über den Lernlog, nicht über Nach-Migration
- **Widerspruch Notiz ↔ Hero-System** → dokumentieren + Rückfrage, nie stillschweigend ändern (auch wenn Hero „offensichtlich" recht hat)
- **Alte Statuswerte** (`aktiv`, `entwurf`) → Mapping auf die neuen Stufen: nur nach bestandener Validierung `verifiziert`, sonst `erfasst`
- **Notiz referenziert privaten Inhalt mitten im Text** (z. B. Verweis auf Systemdatenanalyse) → Passage neutral umformulieren oder Verweis entfernen; im `quelle`-Feld bleibt die Herkunft erhalten

## Technical Requirements (optional)
- Hero-Zugriff nur lesend (Reads erkunden, Writes gaten — hier sind gar keine Writes nötig)
- Keine Secrets im Vault; Zugangsweg zu Hero wird in `/architecture` geklärt

## Open Questions
- [ ] Zugriffsweg auf Hero aus diesem Repo (GraphQL direkt mit Key, über n8n, oder MCP?) → `/architecture`
- [ ] Freigabeform für Julians Review: Gegenüberstellung im Chat oder als Datei? → beim ersten Prozess klären

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Zweistufige Validierung: Hero-Abgleich + Review | Technische Fakten maschinell prüfbar, Inhalt braucht menschliches Gate | 2026-07-17 |
| Supportprozesse als `erfasst` migrieren, nicht erst vervollständigen | Vollständige Prozesserfassung ist eigene Arbeit; ehrliche Statusvergabe statt Scheingenauigkeit | 2026-07-17 |
| Lernlog Bauprozess → `03 AI/Lernlog/` | Beobachtungsspeicher des Wissenskreislaufs, kein Prozesswissen | 2026-07-17 |
| Projekttypen-Wissensbasis → `00 Betrieb/` | Datenbasiertes Betriebswissen (Preise, Projektarten, Kunden), kein Ablaufwissen; bleibt `erfasst` bis Cluster-Review | 2026-07-17 |
| Praxistests nicht separat migrieren | Keine eigenen Testprotokolle vorhanden; das Testergebnis ist bereits in den Prozessnotizen kondensiert; Hero-Testwissen → PROJ-4, Skill-Tests → PROJ-6 | 2026-07-17 |
| 1:1-Übernahme, Schritte als Abschnitte | „Verifizierte Assets kuratiert rüberziehen, nicht neu ableiten"; Schritt-Dateien erst bei Bedarf | 2026-07-17 |
| Verweise auf PROJ-4/5-Ziele als Klartext | Vault bleibt frei von toten Links, Regressionstest bleibt grün; Aktivierung im Folge-Feature | 2026-07-17 |

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
