# PROJ-16: Migration Tool-Ebene (Hero-CLI + Introspection)

## Status: Approved
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
4. **Governance:** Regel-Datei mit zwei Ebenen — (a) Entwurf-first: Angebote/Rechnungen nur als Hero-Draft (`publish: false`), künftige Kanäle (Mail) nur als Entwurf, Versand immer durch Menschen; Lockerung später nur als bewusste Entscheidung. (b) Lesebefehle frei, Schreibbefehle nur nach Freigabe im Vorgang
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

- [x] Angenommen die Tools liegen unter `tools/` und das venv ist eingerichtet, wenn `./hero kontakt suchen "<Testkunde>"` ausgeführt wird, dann liefert die CLI ein Ergebnis ohne Fehler (Key aus Repo-Root-`.env.local`)
- [x] Angenommen die drei Lese-Funktionstests laufen (kontakt suchen, projekt suchen, kalender kategorien), wenn sie abgeschlossen sind, dann sind alle drei erfolgreich und das Ergebnis ist in der Spec dokumentiert
- [x] Angenommen `HERO_API_KEY` fehlt in `.env.local`, wenn ein CLI-Befehl läuft, dann erscheint eine klare Fehlermeldung statt eines Stacktraces
- [x] Angenommen `introspect.py` läuft im Probelauf, wenn ein Temp-Zielpfad übergeben wird, dann entstehen dort Referenz-Dateien — und niemals im alten VPS-Pfad
- [x] Angenommen venv und `__pycache__` existieren nach dem Setup, wenn `git status` läuft, dann tauchen sie nicht auf (`.gitignore`)
- [x] Angenommen der Agent soll einen Schreibbefehl der CLI ausführen, wenn keine ausdrückliche Freigabe im Vorgang vorliegt, dann untersagt die Governance-Regel die Ausführung
- [x] Angenommen der Agent erstellt ein Angebot oder eine Rechnung über die Tools, wenn das Dokument entsteht, dann immer als Entwurf (`publish: false`) — Versand/Veröffentlichung bleibt beim Menschen
- [x] Angenommen der Funktionstest ist bestanden, wenn PROJ-16 abgeschlossen wird, dann ist `_tooling-uebergabe/` im alten Vault entfernt (Commit dort) und `npm test` hier weiterhin grün

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
- [x] Zielpfad-Übergabe: Pflicht-Kommandozeilen-Argument (entschieden in /architecture, 2026-07-18)
- [x] Python: Mac hat nur 3.9 → Kompatibilitäts-Anpassung per Future-Import (entschieden in /architecture, 2026-07-18)

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
| Python-3.9-Kompatibilität per Future-Import statt Python-Installation | Kein Systemeingriff, sofort lauffähig; vorwärtskompatibel mit neuerem Python auf dem künftigen VPS | 2026-07-18 |
| Key aus Repo-Root-`.env.local` | Ein Key, eine Stelle; gleiches Muster wie hero-abgleich.mjs; deny-Regeln schützen weiter | 2026-07-18 |
| introspect.py-Zielpfad als Pflicht-Argument (nicht Env-Variable) | Generator überschreibt ganze Ordner — explizite Übergabe verhindert Fehlläufe; ohne Argument sauberer Abbruch | 2026-07-18 |
| Eigene Regel-Datei `.claude/rules/hero-tools.md` | Entwurf-first (Außenwirksames nur als Draft, Lockerung nur als bewusste Entscheidung) + Lese-/Schreib-Gate; toolneutral, gilt später auch für Cockpit-Chat und Mail-Anbindung | 2026-07-18 |
| venv + __pycache__ + Laufzeitdaten nicht versioniert | Umgebung und Laufzeitdaten gehören nicht ins Wissens-/Code-Repo | 2026-07-18 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_Erstellt: 2026-07-18_

### Was gebaut wird (Dateibaum — kein UI, kein Backend)

```
tools/
+-- README.md                 ← Setup-Anleitung + Source-of-Truth-Vermerk (VPS = Alt-Stand)
+-- hero-tools/
|   +-- hero                  ← Starter (unverändert im Prinzip, venv-Pfad geprüft)
|   +-- hero_tools/           ← 10 Python-Module (kontakt, projekt, kalender, katalog,
|   |                           dokument, historie, stammdaten, export, cli, client)
|   +-- venv/                 ← lokal erzeugt, NICHT versioniert (.gitignore)
+-- hero-graphql/
    +-- introspect.py         ← Zielpfad als Pflicht-Argument statt hart codiert

.claude/rules/hero-tools.md   ← Governance: Lesebefehle frei, Schreibbefehle gated
.gitignore                    ← ergänzt um tools/**/venv/ und __pycache__/
```

### Die vier Anpassungen (bewusst minimal, sonst 1:1)

1. **Python-3.9-Kompatibilität:** Eine Standard-Import-Zeile (`from __future__ import annotations`) in den 7 betroffenen Modulen. Läuft damit auf dem Mac (System-Python 3.9) und unverändert auf jedem neueren Python — wichtig, weil das OS später wieder auf einen VPS zieht.
2. **Key-Quelle:** `client.py` und `introspect.py` lesen `.env.local` künftig aus dem **Repo-Root** — ein Key, eine Stelle, dasselbe Muster wie `scripts/hero-abgleich.mjs`.
3. **introspect.py-Zielpfad:** wird **Pflicht-Kommandozeilen-Argument** (statt hart codiertem VPS-Pfad). Ohne Angabe bricht das Skript mit klarer Meldung ab — versehentliches Schreiben in falsche Pfade ist damit ausgeschlossen. Env-Variable wurde verworfen: ein explizites Argument ist bei einem Generator, der ganze Ordner überschreibt, die sicherere Übergabe.
4. **Keine weiteren Code-Änderungen** — Befehle, Logik und Verhalten bleiben identisch zum VPS-Stand.

### Datenmodell

Keines — die Tools halten keine eigenen Daten. Laufzeitdaten (z. B. `daten/belege.json` beim Export) entstehen lokal und werden nicht versioniert.

### Governance (`.claude/rules/hero-tools.md`)

Zwei Ebenen, beide toolneutral formuliert (gelten auch für den späteren Cockpit-Chat, PROJ-10):

1. **Entwurf-first (Kernprinzip, von Julian gesetzt):** Alles Außenwirksame entsteht ausschließlich als Entwurf — Angebote und Rechnungen immer als Hero-Draft (`publish: false`), künftige Kanäle (z. B. Mail-Anbindung) analog nur als Entwurf im Postfach. Versand und Veröffentlichung macht immer ein Mensch. Zweck: Das OS baut Vertrauen auf, seine Zuverlässigkeit wird am Entwurf sichtbar, ohne dass etwas beim Kunden ankommt. Die Regel kann später bewusst gelockert werden — das ist dann eine dokumentierte menschliche Entscheidung, nie schleichende Praxis.
2. **Lese-/Schreib-Gate:** Lesebefehle (suchen, kategorien, termine, logbuch-lesen, historie, export) frei — „Reads erkunden". Schreibbefehle (anlegen, bearbeiten, status, gewerk, logbuch, aufgabe-*, checkliste-*) nur nach ausdrücklicher Anweisung/Freigabe im aktuellen Vorgang — „Writes gaten", keine eigeninitiativen Schreibzugriffe (vgl. Lernlog-Eintrag 12.07.)

### Funktionstest (rein lesend, gegen das Live-System)

1. `hero kontakt suchen` mit bekanntem Testkunden → Treffer
2. `hero projekt suchen` → Projektliste
3. `hero kalender kategorien` → Kategorienliste
4. `introspect.py` mit Temp-Zielpfad → Referenz-Dateien entstehen im Scratch-Verzeichnis
5. Negativtest: Key-Zeile temporär auskommentiert → klare Fehlermeldung (macht Julian manuell oder wird per Kopie der Datei simuliert — die echte `.env.local` fasst Claude nicht an)

### Abschluss-Sequenz

Funktionstest bestanden → Commit hier → Transport-Kiste im alten Vault löschen (Commit + Push im alten Vault-Repo) → Vermerk im `tools/README.md`: Source of Truth ist dieses Repo, `/root/hero-tools` (VPS) ist Alt-Stand.

### Abhängigkeiten (Pakete)
- Python-venv lokal mit `requests` + `python-dotenv` (die einzigen zwei Abhängigkeiten der CLI)
- Keine npm-Pakete

## Implementation Notes
_Umgesetzt: 2026-07-18_

- Tools aus der Transport-Kiste nach `tools/hero-tools/` + `tools/hero-graphql/` übernommen (13 Dateien)
- Anpassungen wie im Design: Future-Imports in 7 Modulen (Python-3.9-tauglich, `compileall` grün), `client.py` + `introspect.py` lesen `.env.local` aus dem Repo-Root, `introspect.py`-Zielpfad als Pflicht-Argument mit sauberem Abbruch
- venv eingerichtet (requests, python-dotenv); `.gitignore` um venv/, daten/, __pycache__/ ergänzt (per `git check-ignore` bestätigt)
- `tools/README.md` (Setup + Source-of-Truth-Vermerk: VPS = Alt-Stand) und `.claude/rules/hero-tools.md` (Entwurf-first + Lese-/Schreib-Gate) angelegt
- **Funktionstest gegen Hero live, alles bestanden:**
  - `hero kontakt suchen "Amini"` → Testkunde 5711737 gefunden
  - `hero projekt suchen --kunde 5711737` → Testprojekte (u. a. UNB-144) geliefert
  - `hero kalender kategorien` → Kategorienliste (u. a. Umsetzung, Schlechtwetter)
  - `introspect.py <Scratch-Pfad>` → 58 Queries, 76 Mutations, 225 Typen, 360 Referenz-Dateien im Scratch-Verzeichnis; ohne Argument klarer Abbruch
  - Negativtest leerer Key → „Fehler: HERO_API_KEY fehlt in .env.local"
- Bekannte Kosmetik: urllib3-Warnung (LibreSSL) beim CLI-Start — funktionslos, Ausgabe bleibt korrekt
- Abweichungen vom Design: keine

## QA Test Results

**Tested:** 2026-07-18
**Testart:** CLI-Live-Tests gegen Hero + statische Prüfung (kein UI — Browser-/E2E-Tests nicht anwendbar)
**Tester:** QA Engineer (AI)

### Acceptance Criteria Status

#### AC-1/2: Lesebefehle liefern Ergebnisse (unabhängig wiederholt)
- [x] `kontakt suchen "Amini"` → 1 Treffer (Testkunde), `projekt suchen --kunde` → 3 Projekte, `kalender kategorien` → 6 Kategorien

#### AC-3: Fehlender Key
- [x] Leerer Key → „Fehler: HERO_API_KEY fehlt in .env.local" (kein Stacktrace)

#### AC-4: introspect.py-Zielpfad
- [x] Kein `/root/`-Pfad mehr im Code; ohne Argument klarer Abbruch; Probelauf schrieb 360 Dateien ausschließlich ins Scratch-Verzeichnis

#### AC-5: Umgebung unversioniert
- [x] venv, `__pycache__`, `daten/` per `git check-ignore` bestätigt

#### AC-6 + Entwurf-first-AC: Governance-Regel
- [x] `.claude/rules/hero-tools.md` lädt in jeder Session; Entwurf-first (publish: false, Versand durch Menschen) und Lese-/Schreib-Gate verankert; Draft-Erzeugung im Dokument-Code bestätigt

#### AC-7: Abschluss-Sequenz
- [x] Transport-Kiste im alten Vault entfernt (Commit 7b6b477, gepusht); `npm test` hier grün

### Security Audit Results
- [x] Kein Key-Wert im Tools-Code oder in Doku (Pattern-Scan)
- [x] Dokument-Erzeugung im Code als Draft (`publish: false`) bestätigt
- [x] Key nur in `.env.local` (deny-Regeln aktiv); CLI-Ausgaben enthalten keinen Key
- [x] 1:1-Treue-Stichprobe: `cli.py` byte-identisch zur Quelle (Vergleich gegen Git-Historie des alten Vaults)

### Bugs Found
Keine. (Bekannte Kosmetik aus der Umsetzung: urllib3/LibreSSL-Warnung des System-Python — funktionslos, dokumentiert in den Implementation Notes.)

### Automatisierte Tests
- Neu: `src/test/tools-governance.test.ts` — statischer Regressionsschutz für die vier Anpassungen und die Governance-Regel (ohne Netzwerk)
- Gesamt: 137/137 Tests grün (3 Testdateien)

### Summary
- **Acceptance Criteria:** 8/8 passed
- **Bugs Found:** 0
- **Security:** Pass
- **Production Ready:** YES
- **Recommendation:** Approve — Tool-Ebene migriert, live getestet, Source of Truth gewechselt

## Deployment
_To be added by /deploy_
