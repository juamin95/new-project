# PROJ-5: Migration OS-Wissen + Branding

## Status: In Progress
**Created:** 2026-07-18
**Last Updated:** 2026-07-18

## Dependencies
- Requires: PROJ-2 (Vault-Gerüst & Governance) ✓ (Approved)
- Requires: PROJ-4 (Hero-Wissen) — für den `[[Hero]]`-Link im Blueprint ✓ (Approved)
- Wird benötigt von: PROJ-7 (Cockpit-Grundgerüst nutzt `docs/design-system.md`)

## User Stories
- Als **Julian** möchte ich Blueprint und Wissenskreislauf im neuen Vault, damit die OS-Methode übergabefähig dokumentiert ist — der Vault erklärt sich damit selbst.
- Als **Agent (das OS)** möchte ich Gate-Regeln & Rollen in `04 User/` und die Schreibstil-Regel in `.claude/rules/`, damit Freigabe-Grundsätze und Kundentexte-Stil in jeder Session verbindlich sind.
- Als **Frontend-Entwicklung (PROJ-7)** möchte ich `docs/design-system.md` mit den GRÜNSCHNITT-Tokens, damit das Cockpit im Look der Website entsteht.
- Als **Julian** möchte ich den GRÜNSCHNITT-Schreibstil im Vault (ohne private Deutz-Regeln), damit Angebots- und Mailtexte konsistent klingen.

## Migrationsumfang (7 Bausteine)

| Quelle (alter Vault) | Ziel | Zielstatus |
|---|---|---|
| KI-Betriebssystem Blueprint (134 Z.) | `vault/03 AI/KI-Betriebssystem Blueprint.md` | verifiziert* |
| Wissenskreislauf KI-Betriebssystem (119 Z.) | `vault/03 AI/Wissenskreislauf KI-Betriebssystem.md` | verifiziert* |
| n8n IMAP Community Node als AI-Agent-Tool patchen (101 Z.) | `vault/02 Technik/n8n/` | verifiziert* |
| Branding (70 Z., ohne „KI-Beratung"-Abschnitt) | **`docs/design-system.md`** (nicht Vault) | — |
| Schreibstil, GRÜNSCHNITT-Teil (81 Z., ohne Deutz-Zeile) | `vault/00 Betrieb/Schreibstil.md` | verifiziert* |
| **Neu:** Gate-Regeln & Rollen (Extraktion aus Blueprint Schicht 4) | `vault/04 User/Gate-Regeln & Rollen.md` | verifiziert* |
| **Neu:** Schreibstil-Regel | `.claude/rules/` | — |

\* Validierung = Julians Review als Gate (eigene, gelebte Methode — kein Zielsystem zum Abgleichen). Jede inhaltliche Aktualisierung wird im Review einzeln ausgewiesen.

## Bewusste Kuratierungen (werden im Review vorgelegt)
- **Veraltete Pfade aktualisieren:** Wissenskreislauf nennt Ebene 1 unter `/root/hero-tools/` (VPS) → seit PROJ-16 `tools/hero-tools/`; Ebene-3-Pfade (alter Vault) → neue Schichtstruktur
- **Links:** `[[HERO GraphQL API]]` → `[[Hero]]`; Verweise auf abgelöste Foliensatz-Anleitung und private Notizen (KI-Betriebssystem-Projektnotiz, KI & Automatisierung) entfernen
- **Schreibstil:** Deutz-Zeile („intern duzen") entfällt; Grundton, Siezen-Regel, komplette Disallow-Liste (Satzzeichen, ~40 Wörter, Metaphern-Regel) wandern vollständig
- **Branding:** vollständig inkl. Hex-/Tailwind-Tokens, Fonts, CSS-Variablen; leerer „KI-Beratung"-Abschnitt entfällt. Logo: Original aus dem Website-Projekt (`test-projekt/my-first-app/public/logos/`) wird nach `vault/05 Anhänge/gruenschnitt-logo.png` übernommen und in design-system.md eingebunden

## Out of Scope
- Alte Foliensatz-Anleitung (vom Blueprint abgelöst) — bleibt im alten Vault
- ICP, Angebot, Über mich — privat (Deutz + Julians Beratung), Migrations-Filter
- Skills-Übersichtsnotiz für `03 AI/` — kommt mit PROJ-6
- Cockpit-spezifische Design-Erweiterungen — Phase 2 (PROJ-7)

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen eine der 5 Vault-Notizen ist migriert, wenn man ihr Frontmatter liest, dann steht dort `quelle` und `status: verifiziert` erst nach Julians Review
- [ ] Angenommen `docs/design-system.md` existiert, wenn PROJ-7 das Cockpit baut, dann findet es dort Farb-Tokens (Hex + Tailwind), Fonts (Spectral/Inter) und CSS-Variablen — die PRD-Constraint-Referenz ist erfüllt
- [ ] Angenommen der Blueprint ist migriert, wenn man seine Links prüft, dann lösen alle auf (Prozesslandkarte, Wissenskreislauf, Hero, Lernlog) und kein Privat-Verweis ist enthalten
- [ ] Angenommen eine Kuratierung ändert Inhalt (Pfade, Speicherorte), wenn das Review läuft, dann ist die Änderung einzeln ausgewiesen — nie stillschweigend
- [ ] Angenommen die Migration ist abgeschlossen, wenn man `04 User/` öffnet, dann liegt dort die Notiz Gate-Regeln & Rollen mit den Blueprint-Grundsätzen (Gate risiko-gestuft & dauerhaft, Initiative wächst, Rollen Marvin/Julian)
- [ ] Angenommen eine neue Claude-Session startet, wenn Kundentexte anstehen, dann ist die Schreibstil-Regel im Kontext (`.claude/rules/`) und verweist auf die Vault-Notiz
- [ ] Angenommen die Migration ist abgeschlossen, wenn `npm test` läuft, dann sind alle Tests grün und der Vault enthält keine privaten Inhalte

## Edge Cases
- **Blueprint beschreibt Repo-1/Repo-2-Governance** → bleibt 1:1, das ist OS-Methode, kein Privat-Inhalt
- **Wissenskreislauf-Tabelle nennt alte Speicherorte** → Aktualisierung nur mit Review-Ausweis
- **Disallow-Liste wirkt content-lastig (LinkedIn-Herkunft)** → komplett übernehmen; Anti-KI-Sound gilt für Kundentexte genauso; Feinschnitt später via Lernlog/`/refine`
- **Logo-Formatwahl** → PNG (transparenter Hintergrund) als führende Datei; JPG bleibt im Website-Projekt
- **Blueprint-Erwähnung „Claude wird das Cockpit über n8n"** → bleibt (Konzept), Umsetzung ist PROJ-14

## Technical Requirements (optional)
- Kein Hero-Zugriff nötig; reine Datei-Migration mit Review-Gates
- `docs/design-system.md` ist kein Vault-Inhalt → kein Frontmatter-/Statusmodell

## Open Questions
- [x] Logo-Original gefunden: `test-projekt/my-first-app/public/logos/logo-amini.png` (+ .jpg) — wird bei der Umsetzung nach `vault/05 Anhänge/gruenschnitt-logo.png` übernommen und in design-system.md referenziert (geklärt 2026-07-18)

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| n8n-IMAP-Notiz mitnehmen → `02 Technik/n8n/` | OS-Technikwissen zum angebundenen System, erfüllt Migrations-Filter | 2026-07-18 |
| Gate-Regeln & Rollen als Extraktion für `04 User/` | Schicht 4 braucht Inhalt; kuratierte Extraktion aus Blueprint mit Review, kein Neu-Ableiten | 2026-07-18 |
| Schreibstil-Regel in `.claude/rules/` scharf schalten | Seit PROJ-2 vorgemerkt; Kundentexte brauchen verbindlichen Stil ab jetzt | 2026-07-18 |
| Foliensatz-Anleitung nicht migrieren | Vom Blueprint selbst als abgelöst markiert | 2026-07-18 |
| Branding → `docs/design-system.md` statt Vault | Design-System ist Bauplan fürs Cockpit (Code-Kontext), kein Betriebswissen; PRD referenziert diesen Pfad | 2026-07-18 |
| Review-only-Validierung (kein System-Abgleich) | Blueprint/Wissenskreislauf sind Julians eigene Methode — es gibt kein externes Zielsystem | 2026-07-18 |

### Technical Decisions
<!-- Added by /architecture -->
| Decision | Rationale | Date |
|----------|-----------|------|
| Logo im Vault (05 Anhänge), design-system.md referenziert relativ | Logo ist Betriebs-Asset (Obsidian-einbindbar); PROJ-7 kopiert bei Bedarf nach public/ | 2026-07-18 |
| Schreibstil-Regel ohne Pfad-Filter, verweist auf Vault-Notiz | Kundentexte entstehen in jedem Kontext; eine Pflegestelle statt Kopien | 2026-07-18 |
| Drei Review-Gates nach Risikoprofil (Methode / heikle Schnitte / Mechanik) | Aktualisierungen und Extraktionen brauchen Urteil, 1:1-Mechanik nicht | 2026-07-18 |
| design-system.md als reines Markdown mit Token-Tabellen | /frontend liest die Datei direkt; Komponenten-Styles entstehen erst in PROJ-7 | 2026-07-18 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_Erstellt: 2026-07-18_

### Was entsteht (Dateibaum — kein UI, kein Backend, keine Pakete)

```
docs/design-system.md                                  ← Branding: Tokens, Fonts, CSS-Variablen, Logo
vault/00 Betrieb/Schreibstil.md                        ← GRÜNSCHNITT-Teil (ohne Deutz)
vault/02 Technik/n8n/n8n IMAP Community Node ….md      ← erste n8n-Notiz (Ordner entsteht damit)
vault/03 AI/KI-Betriebssystem Blueprint.md             ← die OS-Methode
vault/03 AI/Wissenskreislauf KI-Betriebssystem.md      ← wie das System lernt
vault/04 User/Gate-Regeln & Rollen.md                  ← Extraktion aus Blueprint Schicht 4
vault/05 Anhänge/gruenschnitt-logo.png                 ← Original aus dem Website-Projekt
.claude/rules/schreibstil.md                           ← Kundentexte-Regel (lädt jede Session)
```

Zusätzlich werden die Schicht-Übersichtsnotizen (00 Betrieb, 02 Technik, 03 AI, 04 User) aktualisiert: Die „Hier liegt (nach der Migration, PROJ-5)"-Formulierungen werden zu aktuellen Bestandslisten — Teil der Review-Pakete.

### Review-Paketierung (drei Gates)

1. **Gate 1 — OS-Methode:** Blueprint + Wissenskreislauf. Hier liegen die ausgewiesenen Aktualisierungen (VPS-Pfade → `tools/`, alte Vault-Pfade → Schichtstruktur, Link-Umbau)
2. **Gate 2 — die heiklen Schnitte:** Schreibstil (Grenzfall Deutz raus) + Gate-Regeln & Rollen (Extraktion statt 1:1 — braucht deine inhaltliche Abnahme)
3. **Gate 3 — Mechanik:** n8n-Notiz (1:1), design-system.md, Logo-Übernahme, Schreibstil-Regel

### Form der design-system.md

Reines Markdown mit Tabellen — dieselbe Struktur wie die Branding-Quelle (Farb-Token-Tabellen mit Hex + Verwendungszweck, Font-Tabelle mit Tailwind-Klassen, CSS-Variablen, Gradient-Definition), plus eingebundenes Logo und ein kurzer Kopf, wofür die Datei gilt (Cockpit + alle künftigen UI-Arbeiten; `/frontend` liest sie laut Template automatisch). Kein Code, keine Komponenten-Definitionen — die entstehen in PROJ-7 gegen diese Tokens.

### Tech-Entscheidungen (Warum)

1. **Logo liegt im Vault (`05 Anhänge/`), design-system.md referenziert es relativ** — das Logo ist Betriebs-Asset (Obsidian-einbindbar per `![[gruenschnitt-logo.png]]`), die design-system.md nur ein Verbraucher. PROJ-7 kopiert es bei Bedarf nach `public/`.
2. **Schreibstil-Regel als eigene Datei ohne Pfad-Filter** — Kundentexte können in jedem Kontext entstehen (Chat, Skills, später Cockpit); die Regel verweist auf die Vault-Notiz statt Regeln zu kopieren (eine Pflegestelle).
3. **Drei Gates statt sieben** — gruppiert nach Risikoprofil: Methode (Aktualisierungen), heikle Schnitte (Urteil), Mechanik (1:1).

### Abhängigkeiten (Pakete)
- Keine.

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
