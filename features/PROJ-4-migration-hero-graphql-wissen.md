# PROJ-4: Migration Hero-GraphQL-Wissen

## Status: In Progress
**Created:** 2026-07-18
**Last Updated:** 2026-07-18

## Dependencies
- Requires: PROJ-2 (Vault-Gerüst & Governance) — Zielstruktur `02 Technik/Hero/`, Konventionen ✓ (Approved)
- Requires: PROJ-16 (Tool-Ebene) — `introspect.py` für die Referenz-Generierung, Abgleich-Skript für Spot-Checks ✓ (Approved)
- Wird benötigt von: PROJ-6 (Skills referenzieren das Praxiswissen)

## User Stories
- Als **Julian** möchte ich die Schema-Referenz **frisch generiert** statt kopiert, damit sie garantiert dem heutigen API-Stand entspricht (Generierung = Validierung).
- Als **Agent (das OS)** möchte ich das verifizierte Praxiswissen (DateTime-Fallen, Soft-Delete, Draft-Ersetzen, Projekttypen-Modell) als Arbeitsgrundlage, damit die Skills (PROJ-6) Hero fehlerfrei bedienen.
- Als **Übernehmender** möchte ich eine Hero-Hub-Notiz, die beide Wissensebenen erklärt: Referenz = maschineller Spiegel, Praxiswissen = getestete Erkenntnisse.
- Als **Julian** möchte ich, dass die PROJ-3-Klartext-Verweise („folgt mit PROJ-4") jetzt zu echten Wikilinks werden — der Vault wächst zusammen.

## Umfang

1. **Referenz frisch generieren:** `introspect.py` → `vault/02 Technik/Hero/Referenz (auto-generiert)/`. Beleg der Aktualität: alte Referenz 358 Dateien, Probelauf 17./18.07. bereits 360 — das Delta wird dokumentiert. Die alte Referenz wird nicht kopiert.
2. **Ausnahme-Konvention:** Der Referenz-Ordner ist vom Frontmatter-/Statusmodell ausgenommen (maschineller Spiegel). Die Notiz-Konventionen (`03 AI/Notiz-Konventionen.md`) werden entsprechend ergänzt, inkl. Warnung „nicht händisch editieren — wird beim nächsten Lauf überschrieben". Governance-Tests prüfen dort weiterhin Secrets (Links soweit sinnvoll), aber kein Frontmatter.
3. **Praxiswissen migrieren (5 Notizen):** Aufgaben (Task) · Checklisten (FieldService_Checklist) · Dokument-Entwürfe ändern und ersetzen · Gewerke und Projekttypen (Measure, ProjectType) · Kalender und Termine (CalendarEvent). Kuratiert 1:1 nach `Praxiswissen (verifiziert)/`, zweistufig validiert: Spot-Check lesbarer Fakten per Abgleich-Skript (Gewerke/Projekttypen und Kalender-Kategorien bereits am 17./18.07. live bestätigt) + Julians Review je Notiz → `status: verifiziert` mit `quelle`. Schreib-Verhalten wird **nicht** nachgetestet — keine Writes ins Livesystem; gilt als test-verifiziert aus dokumentierter Praxis.
4. **Hub-Notiz:** MOC „HERO GraphQL API" → `vault/02 Technik/Hero/Hero.md`, kuratiert (private Verweise raus, Struktur-Erklärung beider Ebenen).
5. **Link-Aktivierung rückwirkend:** „folgt mit PROJ-4"-Klartexte aus PROJ-3 (Prozess Bauprojekt End-to-End, Prozesslandkarte) werden echte Wikilinks.

## Out of Scope
- Neue Praxiswissen-Erkenntnisse oder Nachtesten von Schreib-Verhalten — Writes bleiben gated; Neues entsteht im Betrieb über den Lernlog
- OS-Wissen + Branding — PROJ-5
- Prozess-Skills — PROJ-6
- Automatischer Regenerierungs-Rhythmus der Referenz (Routine) — Parkplatz
- Stilllegung des Hero-Bereichs im alten Vault — nach PROJ-6

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen `introspect.py` ist mit dem Vault-Zielpfad gelaufen, wenn man den Referenz-Ordner prüft, dann enthält er Übersicht, Queries, Mutations und Typen vollständig, und das Delta zur alten Referenz (358 → aktuell) ist dokumentiert
- [ ] Angenommen die Referenz ist generiert, wenn `npm test` läuft, dann gilt die Frontmatter-Pflicht überall außer im Referenz-Ordner und alle Tests sind grün
- [ ] Angenommen eine der 5 Praxiswissen-Notizen ist migriert, wenn man ihr Frontmatter liest, dann steht dort `status: verifiziert` und `quelle` mit Spot-Check- und Review-Vermerk
- [ ] Angenommen der Spot-Check findet einen Widerspruch zwischen Notiz und Live-System, wenn die Migration fortgesetzt wird, dann wird die Notiz nicht verifiziert, die Abweichung dokumentiert und Julian gefragt
- [ ] Angenommen die Migration ist abgeschlossen, wenn man Prozess Bauprojekt End-to-End und die Prozesslandkarte öffnet, dann sind die früheren „folgt mit PROJ-4"-Klartexte echte, auflösende Wikilinks
- [ ] Angenommen jemand öffnet `Hero.md`, wenn er die zwei Wissensebenen verstehen will, dann erklärt die Notiz Referenz vs. Praxiswissen und verlinkt beide Bereiche
- [ ] Angenommen die Migration ist abgeschlossen, wenn man den Vault nach privaten Inhalten durchsucht, dann findet sich nichts davon (Migrations-Filter)

## Edge Cases
- **API-Stand widerspricht Praxiswissen** (z. B. eine als „nicht freigeschaltet" dokumentierte Mutation existiert inzwischen) → dokumentieren + Rückfrage, nie stillschweigend ändern
- **Introspection schlägt fehl** (Hero nicht erreichbar) → Praxiswissen-Migration läuft unabhängig; Referenz wird nachgeholt
- **Generierte Wikilinks auf übersprungene Typen** (Scalars werden nicht geschrieben) → in QA prüfen; Link-Prüfung für den Referenz-Ordner ggf. justieren
- **Obsidian-Query-Block in der Hub-Notiz** → bleibt erhalten (funktioniert in Obsidian, stört sonst nicht)
- **Referenz-NeuLauf überschreibt lokale Änderungen** → genau deshalb: Warnung in Hub-Notiz + Konventionen; eigene Erkenntnisse gehören ins Praxiswissen

## Technical Requirements (optional)
- Referenz-Generierung und Spot-Checks: ausschließlich Lesezugriffe auf Hero
- Keine Secrets im Vault; `introspect.py` läuft mit explizitem Zielpfad (PROJ-16-Schutz)

## Open Questions
- [x] Wikilink-Prüfung: vollständig, aber mit escape-fähigem Regex + Scalar-Whitelist (mit Probelauf-Daten entschieden in /architecture, 2026-07-18)

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Referenz frisch generieren statt kopieren | Generierung = Validierung; API bewegt sich bereits (358 → 360 Dateien) | 2026-07-18 |
| Referenz-Ordner als Ausnahme vom Frontmatter-/Statusmodell | Maschineller Spiegel, weder erfasst noch verifiziert; Generator bleibt unverändert | 2026-07-18 |
| Praxiswissen: Spot-Check + Review → verifiziert | Lesbares live prüfbar; Schreib-Wissen aus dokumentierten Tests; keine Writes ins Livesystem | 2026-07-18 |
| Schreib-Verhalten nicht nachtesten | Entwurf-first/Write-Gate; Testdaten in Hero vermeiden; erneute Write-Prüfung kommt mit PROJ-6-Skilltests | 2026-07-18 |
| Hub-Notiz als `Hero.md` (Folder Note) | Gleiches Muster wie die Schicht-Übersichtsnotizen | 2026-07-18 |

### Technical Decisions
<!-- Added by /architecture -->
| Decision | Rationale | Date |
|----------|-----------|------|
| Wikilink-Test-Regex wird escape-fähig (`\|` in Tabellen) | 83 vermeintlich tote Links waren Parsing-Artefakte; Korrektur erhöht vaultweit die Prüfgenauigkeit | 2026-07-18 |
| Standard-Scalars (Boolean, String, Int, Float, ID) als Whitelist im Referenz-Link-Check | Generator schreibt Scalars bewusst nicht als Dateien; Generator bleibt unverändert (Product Decision); eng begrenzte Ausnahme | 2026-07-18 |
| Frontmatter-Pflicht künftig mit Referenz-Ordner-Ausnahme im Test | Setzt die Produkt-Entscheidung (maschineller Spiegel) technisch um; Secrets-Scan bleibt überall aktiv | 2026-07-18 |
| Zwei Review-Gates (Kalender einzeln, 4er-Paket) | Kalender-Notiz trägt das meiste Detailwissen; homogenes Restpaket spart Runden ohne Gate-Verlust | 2026-07-18 |
| Referenz-Lauf direkt in den Vault (kein Zwischenschritt) | Verfahren im PROJ-16-Probelauf bewiesen; Zielpfad-Pflicht schützt vor Fehlläufen | 2026-07-18 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_Erstellt: 2026-07-18_

### Ablauf (sechs Schritte, kein UI / kein Backend)

```
1. Spot-Check        → Abgleich-Skript prüft lesbare Fakten der Praxiswissen-Notizen
2. Praxiswissen      → 5 Notizen kuratieren, Review-Gates: „Kalender und Termine"
                       einzeln (313 Zeilen, gewichtigste Notiz), die 4 kleineren als Paket
3. Konventionen      → Ausnahme-Absatz für den Referenz-Ordner ergänzen (gated, Teil des Reviews)
4. Referenz          → introspect.py mit Vault-Zielpfad, ein Lauf; Delta zur alten
                       Referenz (358 → aktuell) dokumentieren
5. Hub-Notiz         → Hero.md erklärt beide Ebenen, verlinkt Referenz-Übersicht + Praxiswissen
6. Link-Aktivierung  → „folgt mit PROJ-4"-Klartexte in Bauprozess + Landkarte werden Wikilinks
```

Reihenfolge-Logik: Das review-lastige Praxiswissen zuerst (dort steckt das Urteil), die maschinelle Referenz danach (ein Befehl), Links zuletzt — jeder Commit bleibt testgrün.

### Die Wikilink-Frage (offene Frage aus der Spec — mit Daten entschieden)

Analyse des Probelaufs (360 Dateien, 803 Wikilinks):
- Die scheinbar 83 toten Ziele waren ein **Parsing-Artefakt**: Der Generator schreibt in Tabellen `[[Typ\|Alias]]` (escaptes Pipe — gültige Obsidian-Syntax), unser Test-Regex las den Backslash als Teil des Ziels. **Konsequenz: Der Test-Regex wird escape-fähig gemacht** — eine Korrektur, die vaultweit die Prüfgenauigkeit erhöht.
- Danach bleiben **3 echte tote Ziele**: `Boolean`, `String`, `Int` — GraphQL-Standard-Scalars, die der Generator bewusst nicht als Dateien schreibt. **Konsequenz: Standard-Scalars kommen im Referenz-Ordner auf eine Whitelist** — der Generator bleibt unverändert (Product Decision), die wenigen unaufgelösten Scalar-Links in Obsidian sind kosmetisch.
- Frontmatter-Pflicht: gilt künftig für alle Vault-Notizen **außer** `Referenz (auto-generiert)/`; Secrets-Scan gilt überall.

### Datenmodell (unverändert)

- Praxiswissen-Notizen: PROJ-2-Konventionen (Frontmatter inkl. `quelle` mit Spot-Check-/Review-Vermerk)
- Referenz-Dateien: rohes, generiertes Markdown ohne Frontmatter (dokumentierte Ausnahme)

### Tech-Entscheidungen (Warum)

1. **Referenz in einem Lauf direkt in den Vault** — der Zielpfad-Schutz aus PROJ-16 (Pflicht-Argument) macht den Lauf explizit; der Probelauf hat das Verfahren bereits bewiesen.
2. **Test-Anpassungen sind Präzisierungen, keine Aufweichungen:** Escape-Regex = Korrektheit; Scalar-Whitelist = dokumentierte, eng begrenzte Ausnahme (genau 5 Namen: Boolean, String, Int, Float, ID); Frontmatter-Ausnahme = nur der Referenz-Ordner.
3. **Zwei Review-Gates statt fünf** — die Kalender-Notiz trägt das meiste verifizierte Detailwissen (DateTime-Fallen, Soft-Delete) und verdient ein eigenes Gate; die vier kleineren Notizen sind ein homogenes Paket.

### Abhängigkeiten (Pakete)
- Keine neuen. Genutzt wird Vorhandenes: `introspect.py` + venv (PROJ-16), `scripts/hero-abgleich.mjs` (PROJ-3).

## Implementation Notes
_Umgesetzt: 2026-07-18_

- **Spot-Check:** 12 Schema-/Live-Prüfungen, alle bestanden (u. a. kein create_task, kein update_document, Calendar_* nicht freigeschaltet, alle 6 Kalender-Kategorien wortgleich)
- **Praxiswissen:** 5 Notizen migriert (`verifiziert`, quelle mit Spot-Check-/Review-Vermerk); private Verweise neutralisiert; Prozess-Wikilinks aktiv; zwei Review-Gates wie geplant
- **Konventionen:** Ausnahme-Absatz für den Referenz-Ordner in Notiz-Konventionen ergänzt
- **Tests präzisiert:** Frontmatter-Pflicht mit Referenz-Ausnahme, escape-fähiger Wikilink-Regex (`\|`), Scalar-Whitelist (5 Namen); PROJ-3-Test auf den neuen Link-Zustand aktualisiert
- **Referenz generiert:** 360 Dateien (58 Queries, 76 Mutations, 225 Typen) direkt in den Vault; **Delta zur alten Referenz: +2 Typen** (Receipt_ReceiptDocumentSync, Receipt_ReceiptPayment — Hero baut den Payment-Bereich aus), nichts entfallen
- **Hub-Notiz:** Hero.md erklärt beide Ebenen, verlinkt Schema-Übersicht und alle 5 Praxiswissen-Notizen, inkl. Warnung und Delta-Vermerk
- **Link-Aktivierung:** „folgt mit PROJ-4"-Platzhalter in Bauprozess + Landkarte durch echte Wikilinks ersetzt
- Abweichungen vom Design: keine

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
