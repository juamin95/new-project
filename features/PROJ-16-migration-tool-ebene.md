# PROJ-16: Migration Tool-Ebene (Hero-CLI + Introspection)

## Status: Planned
**Created:** 2026-07-18
**Last Updated:** 2026-07-18

## Dependencies
- Requires: PROJ-2 (Vault-Gerüst & Governance) — `.env`-Pattern, deny-Regeln, Regel-Mechanismus ✓ (Approved)
- Wird benötigt von: PROJ-4 (Referenz-Generierung via introspect.py), PROJ-6 (Skills rufen die CLI auf)

## User Stories
- Als **Julian** möchte ich die hero-tools CLI lauffähig in diesem Repo, damit die Source of Truth der Fähigkeiten-Ebene vom VPS in das übergabefähige Repo wechselt.
- Als **Agent (das OS)** möchte ich atomare, deterministische Hero-Operationen als Werkzeuge, damit die Prozess-Skills (PROJ-6) sie aufrufen können — Determinismus im Code, nie im LLM.
- Als **Julian** möchte ich `introspect.py` im Repo, damit PROJ-4 die Schema-Referenz frisch generieren kann (Generierung = Validierung der Referenz).
- Als **Julian** möchte ich einen bestandenen, rein lesenden Funktionstest gegen Hero, bevor die Transport-Kiste im alten Vault gelöscht wird.
- Als **Übernehmender** möchte ich eine Setup-Anleitung in `tools/`, damit die CLI auf jedem Gerät ohne Vorwissen einzurichten ist.

## Umfang

**Quelle:** `gruenschnitt-wissen/07 Anhänge/_tooling-uebergabe/` (Transport-Kiste vom VPS, laut README-UEBERGABE temporär)

1. **Übernahme:** `tools/hero-tools/` (Starter `hero` + `hero_tools/`-Paket: cli, client, kontakt, projekt, kalender, katalog, dokument, historie, stammdaten, export — ~1.950 Zeilen Python) und `tools/hero-graphql/introspect.py`
2. **Bekannte Anpassungen (zwingend, im Code-Review gefunden):**
   - `client.py` lädt `.env.local` aus dem Toolordner → auf Repo-Root umstellen (ein Key, eine Stelle)
   - `introspect.py` hat den VPS-Vault-Pfad hart codiert (`/root/gruenschnitt-wissen/…`) → Zielpfad parametrisieren
   - `hero`-Starter erwartet `venv/` im Toolordner → Setup dokumentieren
3. **Setup:** Python-venv lokal (nicht versioniert), Abhängigkeiten `requests` + `python-dotenv`, Setup-README in `tools/`
4. **Governance:** Regel — Schreibbefehle der CLI (`anlegen`, `status`, `aufgabe-*`, `checkliste-*`, `gewerk`, `logbuch`, …) nur nach ausdrücklicher Freigabe im Vorgang; Lesebefehle frei („Reads erkunden, Writes gaten")
5. **Funktionstest (rein lesend):** `hero kontakt suchen`, `hero projekt suchen`, `hero kalender kategorien` gegen das Live-System; `introspect.py`-Probelauf in ein Temp-Verzeichnis
6. **Abschluss:** Transport-Kiste im alten Vault entfernen (Commit + Push dort); Vermerk im Tools-README, dass `/root/hero-tools` (VPS) Alt-Stand ist — VPS selbst bleibt unangetastet (n8n läuft dort weiter)

## Out of Scope
- Referenz-Generierung in den Vault — PROJ-4
- Prozess-Skills, die die CLI nutzen — PROJ-6
- Key-Rotation — von Julian als „nicht nötig" entschieden
- Änderungen oder Aufräumen auf dem VPS — bleibt unangetastet
- Neue CLI-Befehle oder Refactoring — reine Migration mit Minimal-Anpassungen

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen die Tools liegen unter `tools/` und das venv ist eingerichtet, wenn `./hero kontakt suchen "<Testkunde>"` ausgeführt wird, dann liefert die CLI ein Ergebnis ohne Fehler (Key aus Repo-Root-`.env.local`)
- [ ] Angenommen die drei Lese-Funktionstests laufen (kontakt suchen, projekt suchen, kalender kategorien), wenn sie abgeschlossen sind, dann sind alle drei erfolgreich und das Ergebnis ist in der Spec dokumentiert
- [ ] Angenommen `HERO_API_KEY` fehlt in `.env.local`, wenn ein CLI-Befehl läuft, dann erscheint eine klare Fehlermeldung statt eines Stacktraces
- [ ] Angenommen `introspect.py` läuft im Probelauf, wenn ein Temp-Zielpfad übergeben wird, dann entstehen dort Referenz-Dateien — und niemals im alten VPS-Pfad
- [ ] Angenommen venv und `__pycache__` existieren nach dem Setup, wenn `git status` läuft, dann tauchen sie nicht auf (`.gitignore`)
- [ ] Angenommen der Agent soll einen Schreibbefehl der CLI ausführen, wenn keine ausdrückliche Freigabe im Vorgang vorliegt, dann untersagt die Governance-Regel die Ausführung
- [ ] Angenommen der Funktionstest ist bestanden, wenn PROJ-16 abgeschlossen wird, dann ist `_tooling-uebergabe/` im alten Vault entfernt (Commit dort) und `npm test` hier weiterhin grün

## Edge Cases
- **Hero nicht erreichbar** → CLI-Fehlerbehandlung greift (Timeout/Fehlerpfad in `client.py`); Funktionstest dokumentiert das Verhalten
- **Künftige Divergenz VPS ↔ Repo** → Source of Truth ist ab PROJ-16 dieses Repo; der VPS-Stand wird nicht mehr gepflegt (Vermerk im Tools-README)
- **Versehentlicher Schreib-Test** → Funktionstest nutzt ausschließlich Lese-Befehle; Schreibpfade sind praxisgetestet (14.07.2026) und werden in PROJ-6 über die Skills erneut geprüft
- **Python fehlt / falsche Version auf einem Gerät** → Setup-README nennt Voraussetzungen und Schritte
- **introspect.py mit altem Pfad gestartet** → durch die Parametrisierung ohne Zielpfad-Angabe kein Schreiben in Fremdpfade möglich

## Technical Requirements (optional)
- Nur Lesezugriffe im Funktionstest; Schreibbefehle bleiben gated
- Kein Key im Code, im Chat oder im Repo — ausschließlich `.env.local` (deny-Regeln aktiv)

## Open Questions
- [ ] Zielpfad-Übergabe für `introspect.py`: Kommandozeilen-Argument oder Env-Variable? → `/architecture`
- [ ] Python-Version auf diesem Mac prüfen (venv-Setup) → `/architecture`

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Zielort `tools/` (hero-tools + hero-graphql) | Repo spiegelt die Schichten: vault = Wissen, tools = Fähigkeiten, skills = Prozesse, src = Cockpit | 2026-07-18 |
| Keine Key-Rotation | Julians Entscheidung: nicht nötig; alter Key läuft für n8n/VPS weiter | 2026-07-18 |
| Transport-Kiste nach Funktionstest entfernen, VPS unangetastet | Auftrag aus dem Übergabe-README; n8n-Betrieb bleibt ungestört | 2026-07-18 |
| Funktionstest ausschließlich lesend | „Reads erkunden, Writes gaten"; Writes kommen mit den Skills (PROJ-6) unter Test | 2026-07-18 |
| venv lokal, nicht versioniert | Umgebung ≠ Code; wie im Übergabe-README vorgesehen | 2026-07-18 |
| Eigenes Feature statt Teil von PROJ-4/PROJ-6 | Eigenständig testbare Einheit; harte Abhängigkeit für beide Folge-Features | 2026-07-18 |

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
