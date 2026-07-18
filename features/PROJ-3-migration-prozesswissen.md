# PROJ-3: Migration Prozesswissen

## Status: Approved
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

- [x] Angenommen die Migration ist abgeschlossen, wenn man die 9 Quellnotizen mit dem neuen Vault vergleicht, dann existiert für jede eine Ziel-Notiz am definierten Ort mit `quelle`-Feld (Herkunft + Datum)
- [x] Angenommen eine Kernprozess-Notiz oder die Landkarte hat Hero-Abgleich UND Julians Review bestanden, wenn man ihr Frontmatter liest, dann steht dort `status: verifiziert`
- [x] Angenommen eine Notiz hat den Abgleich nicht bestanden oder ist als unvollständig bekannt (Supportprozesse, Lernlog, Wissensbasis), wenn man ihr Frontmatter liest, dann steht dort `status: erfasst`
- [x] Angenommen der Hero-Abgleich findet eine Abweichung zwischen Notiz und System, wenn die Migration fortgesetzt wird, dann wird die Notiz nicht verifiziert, die Abweichung dokumentiert und Julian gefragt — nie stillschweigend korrigiert
- [x] Angenommen die Migration ist abgeschlossen, wenn man die Prozesslandkarte öffnet, dann verlinkt sie alle 6 Prozessnotizen in der neuen Struktur und die Links lösen auf
- [x] Angenommen die Migration ist abgeschlossen, wenn man den neuen Vault nach privaten Inhalten durchsucht (SAP, Deutz, Daily Notes, private Projektnotizen), dann findet sich nichts davon
- [x] Angenommen die Migration ist abgeschlossen, wenn `npm test` läuft, dann sind alle Vault-Governance-Tests grün (Frontmatter, keine toten Wikilinks, keine Secrets)
- [x] Angenommen eine migrierte Notiz referenziert Wissen aus PROJ-4/PROJ-5, wenn man sie liest, dann ist der Verweis als Klartext erkennbar (kein toter Wikilink)

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
- [x] Zugriffsweg auf Hero: eigenes Lese-Skript gegen die GraphQL-API, Key in `.env.local` (entschieden in /architecture, 2026-07-17)
- [x] Freigabeform: Gegenüberstellung + Abgleich-Ergebnis im Chat, Freigabe je Notiz (entschieden in /architecture, 2026-07-17)

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
| Hero-Abgleich per eigenem Lese-Skript (GraphQL direkt) | Deterministisch, wiederholbar, kein Überbau (n8n-MCP ist PROJ-14); Grundlage für PROJ-4 wiederverwendbar | 2026-07-17 |
| API-Key in `.env.local`, Skript liest selbst | Bewährtes Muster aus dem alten Vault; deny-Regeln halten Claude von `.env*` fern | 2026-07-17 |
| Nur Lesezugriffe auf Hero | Migration braucht keine Writes; „Reads erkunden, Writes gaten" | 2026-07-17 |
| Reihenfolge: Kernprozesse → Support → Grenzfälle → Landkarte zuletzt | Landkarte verlinkt alle — zuletzt migriert lösen alle Links sofort auf, Regressionstest bleibt grün | 2026-07-17 |
| Review je Notiz im Chat (Gegenüberstellung + Abgleich-Ergebnis) | Leichtgewichtig; inhaltliche Treue ist durch 1:1-Regel gesichert | 2026-07-17 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_Erstellt: 2026-07-17_

### Was gebaut wird (kein UI, kein Backend — Dateien + ein Prüfwerkzeug)

```
Migration (je Notiz im 4-Takt)
+-- 1. Kuratieren     → Notiz übertragen (1:1, Frontmatter/Links/Ablageort angepasst)
+-- 2. Hero-Abgleich  → Prüfskript vergleicht technische Fakten mit dem Live-System
+-- 3. Review-Gate    → Julian sieht Gegenüberstellung + Abgleich-Ergebnis, gibt frei
+-- 4. Schreiben      → Notiz mit status + quelle in den Vault, Commit

scripts/hero-abgleich  → kleines, rein lesendes Prüfwerkzeug (einmalig für dieses Feature
                         gebaut, wiederverwendbar für PROJ-4)
```

### Hero-Zugriff (die offene Frage aus der Spec — jetzt entschieden)

Ein **kleines, rein lesendes Prüfskript im Repo** fragt die Hero-GraphQL-Partner-API ab (Endpoint `https://login.hero-software.de/api/external/v7/graphql`) und vergleicht: Projekttyp-IDs und -Namen, Statuspipelines je Projekttyp, Status-Codes. Ausgegeben wird nur das Vergleichsergebnis (stimmt / weicht ab / nicht prüfbar).

**Warum so und nicht anders:**
- **Nicht über n8n:** Die n8n-MCP-Anbindung ist PROJ-14 — für drei Lesequeries jetzt eine Monitoring-Infrastruktur vorzuziehen wäre Überbau.
- **Nicht von Hand abtippen:** Genau die Abschreibfehler, die wir ausschließen wollen.
- **Skript statt Agent-Aufruf:** Determinismus gehört in Code, nicht ins LLM (Blueprint-Regel); das Skript ist wiederholbar und dient PROJ-4 als Grundlage.
- **Nur Reads:** Die Migration braucht keinerlei Schreibzugriff auf Hero („Reads erkunden, Writes gaten" — hier gibt es gar keine Writes).

**Credential-Handling:** Der Hero-API-Key kommt in `.env.local` (von Julian einzutragen — Claude kann und darf `.env*`-Dateien weder lesen noch schreiben, das erzwingen die deny-Regeln in `settings.json`). Das Skript liest den Key zur Laufzeit selbst — dasselbe Muster wie im alten Vault („MCP-Server lesen Credentials selbst, Claude greift nie direkt darauf zu").

### Datenmodell (unverändert)

Es entsteht keine neue Datenstruktur: Migrierte Notizen folgen den PROJ-2-Konventionen (Frontmatter mit `tags`, `status`, `date`, `quelle`). Das Abgleich-Ergebnis wird je Kernprozess-Notiz als kurzer Absatz im `quelle`-Kontext dokumentiert („Hero-Abgleich bestanden am …" bzw. Abweichung).

### Ablauf-Reihenfolge

1. Kernprozesse einzeln (Bauprojekt → ohne Angebot → Abo), je mit Abgleich + Review-Gate
2. Supportprozesse als Paket (nur Review, Zielstatus `erfasst`)
3. Lernlog Bauprozess + Projekttypen-Wissensbasis (nur Review, `erfasst`)
4. Prozesslandkarte zuletzt — sie verlinkt alle anderen; so lösen alle Links sofort auf und der Regressionstest bleibt grün

### Review-Form (offene Frage aus der Spec — Vorschlag)

Freigabe je Notiz im Chat: kompakte Gegenüberstellung (was wurde angepasst: Frontmatter, Links, entfernte Privat-Bezüge) plus Abgleich-Ergebnis. Kein Datei-Diff-Werkzeug nötig — die inhaltliche Treue ist per 1:1-Regel ohnehin gesetzt.

### Abhängigkeiten (Pakete)
- Keine. Das Prüfskript nutzt Bordmittel der vorhandenen Node-Umgebung.
- Voraussetzung durch Julian: Hero-API-Key in `.env.local` eintragen (Variablenname wird beim Bau des Skripts dokumentiert — Hinweis: `.env.local.example` kann Claude wegen der deny-Regeln nicht selbst pflegen, der Eintrag dort ist ebenfalls Julians Part)

## Implementation Notes
_Umgesetzt: 2026-07-18_

- **Alle 9 Notizen migriert**, jede mit `quelle`-Feld (Herkunft, Abgleich- und Review-Datum):
  - `verifiziert` (4): Prozesslandkarte, Bauprojekt End-to-End, Projekt ohne Angebot, Abo-Einsatz — Hero-Abgleich + Julian-Review je Notiz bestanden
  - `erfasst` (5): 3 Supportprozesse, Lernlog Bauprozess, Projekttypen-Wissensbasis — ehrliche Statusvergabe wie geplant
- **Hero-Abgleich:** Prüfskript `scripts/hero-abgleich.mjs` gebaut (Befehle: check, projekttypen, query — rein lesend, Mutations gesperrt, Key aus `.env.local`). Alle Projekttyp-IDs, Pipelines und Status-Codes wortgleich bestätigt; Wartungsvertrag 96920 live geprüft
- **Gefundene Abweichungen** (dokumentiert + Julian-Entscheidung, nie stillschweigend): Abo-Notiz — nächster automatischer Lauf 13.09. statt ~13.08. (Aktions-Umstellung berechnete `recurring_next` neu), Erinnerung 4 Wochen statt ~7 Tage → auf Live-Stand aktualisiert mit Abgleich-Vermerk
- **Kuratierung:** Inhalt fachlich 1:1; einzige inhaltliche Anpassungen mit Freigabe: veraltete „in Arbeit"-Kopfzeile im Bauprozess, Abo-Laufzeitwerte; private Verweise (Systemdatenanalyse, KI-Betriebssystem-Projektnotiz) neutral umformuliert
- **Links:** PROJ-3-interne Wikilinks nach Abschluss in einem Durchgang aktiviert (17 Links); Verweise auf PROJ-4-Ziele (CalendarEvent, Gewerke/Projekttypen) als Klartext mit „folgt mit PROJ-4"-Vermerk
- **Regressionstests:** decken die neuen Notizen automatisch ab — 77/77 grün
- Abweichungen vom Tech Design: keine

## QA Test Results

**Tested:** 2026-07-18
**Testart:** Dateisystem-/Regelwerk-Prüfung + Live-Abgleich gegen Hero (kein UI — Browser-/E2E-Tests nicht anwendbar)
**Tester:** QA Engineer (AI)

### Acceptance Criteria Status

#### AC-1/2/3: Vollständigkeit, quelle-Feld, Statusvergabe
- [x] Alle 9 Ziel-Notizen am definierten Ort, jede mit `quelle` (Herkunft + Datum)
- [x] 4× `verifiziert` (Landkarte + 3 Kernprozesse) — quelle dokumentiert jeweils Hero-Abgleich UND Review
- [x] 5× `erfasst` (3 Supportprozesse, Lernlog, Wissensbasis) — ehrliche Statusvergabe

#### AC-4: Abweichungen dokumentiert statt still korrigiert
- [x] Abo-Notiz: beide Abweichungen (nächster Lauf 13.09. statt ~13.08.; Erinnerung 4 Wochen) mit Live-Abgleich-Vermerk und ursprünglicher Erwartung dokumentiert; Julian-Entscheidung eingeholt

#### AC-5: Prozesslandkarte als Hub
- [x] Verlinkt alle 6 Prozessnotizen, alle Links lösen auf

#### AC-6: Migrations-Filter
- [x] Keine privaten Inhalte/Verweise (Systemdatenanalyse, KI-Betriebssystem-Projektnotiz, Deutz, SAP, Daily Notes) — automatisiert gescannt, Start.md-Filterbeschreibung ausgenommen

#### AC-7: Governance-Tests
- [x] `npm test` grün: 114/114 (Frontmatter, Wikilinks, Secrets, Migration)

#### AC-8: Klartext-Verweise auf PROJ-4-Ziele
- [x] „folgt mit PROJ-4"-Vermerke vorhanden, keine Wikilinks auf noch nicht migrierte Ziele

### Edge Cases Status
- [x] Widerspruch Notiz ↔ Hero: eingetreten (Abo-Werte) und regelkonform behandelt (Rückfrage statt Stillkorrektur)
- [x] Privater Verweis mitten im Text: eingetreten (Wissensbasis, Abo) und neutral umformuliert
- [x] Alte Statuswerte (`aktiv`/`entwurf`): korrekt auf `verifiziert`/`erfasst` gemappt

### Zusätzliche Prüfung: 1:1-Treue
- [x] Stichprobe Stammdatenpflege + Kundenstammdaten: Body nach Normalisierung (Frontmatter/Wikilink-Marker entfernt) identisch mit der Quelle

### Security Audit Results
- [x] Keine Secrets im Vault (automatisiert); Hero-Zugriff ausschließlich lesend, `query`-Befehl lehnt Mutations ab
- [x] API-Key nie im Chat/Repo — nur `.env.local`, per deny-Regeln für Claude unlesbar
- [x] Keine Änderungen an App-Code (`src/app`, `package.json`) durch PROJ-3

### Bugs Found
Keine.

### Automatisierte Tests
- Neu: `src/test/vault-migration.test.ts` — sichert Migrationsbestand, Statusvergabe, Hub-Links und Migrations-Filter dauerhaft
- Gesamt: 114/114 Tests grün (2 Testdateien)

### Summary
- **Acceptance Criteria:** 8/8 passed
- **Bugs Found:** 0
- **Security:** Pass
- **Production Ready:** YES
- **Recommendation:** Approve — Migration vollständig, validiert und dauerhaft abgesichert

## Deployment
_To be added by /deploy_
