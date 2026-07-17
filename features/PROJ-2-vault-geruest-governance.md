# PROJ-2: Vault-Gerüst & Governance

## Status: Planned
**Created:** 2026-07-17
**Last Updated:** 2026-07-17

## Dependencies
- Keine

## User Stories
- Als **Julian** möchte ich einen Obsidian-kompatiblen Vault unter `vault/` in diesem Repo, damit GRÜNSCHNITT- und OS-Wissen versioniert, menschenlesbar und sauber getrennt von meinem privaten Vault liegt.
- Als **Julian** möchte ich eine Gliederung nach den Blueprint-Schichten, damit jedes neue Wissen genau eine Einsortier-Frage hat: „Zu welcher Schicht gehört das?"
- Als **Agent (das OS)** möchte ich verbindliche Regeln in `.claude/rules/`, damit ich in jeder Session automatisch weiß, was ich lesen darf, wo ich schreiben darf und was als Arbeitsgrundlage gilt.
- Als **Julian** möchte ich einen dokumentierten Migrations-Filter, damit bei PROJ-3 bis PROJ-6 eindeutig ist, was migriert wird und was privat bleibt.
- Als **Übernehmender** (Marvin oder ein Dritter) möchte ich eine Start-Notiz, die den Vault ohne Vorwissen erklärt — der Kern der Übergabefähigkeit.

## Zielstruktur

```
vault/
├─ Start.md               ← Hub: erklärt Struktur, Einsortier-Regel, Migrations-Filter
├─ 00 Betrieb/            ← Firma, Branding, Schreibstil, Angebot/Zielgruppe
├─ 01 Prozess/            ← Schicht 1
│   ├─ Prozesslandkarte.md
│   ├─ Kernprozesse/      ← je Szenario ein Prozess; Schritte mit Input → Transformation → Output
│   └─ Supportprozesse/   ← Stammdatenpflege, Kundenstammdaten, Belegfluss
├─ 02 Technik/            ← Schicht 2
│   ├─ Hero/              ← Übersicht + „Referenz (auto-generiert)" + „Praxiswissen (verifiziert)"
│   ├─ E-Mail/
│   ├─ n8n/
│   └─ Supabase/
├─ 03 AI/                 ← Schicht 3: Blueprint, Wissenskreislauf, Skills-Übersicht, Lernlog/
├─ 04 User/               ← Schicht 4: Gate-Regeln, Rollen & Freigaben
└─ 05 Anhänge/            ← Logo, Bilder, PDFs
```

- Jede Schicht bekommt eine kurze Übersichtsnotiz (löst zugleich das Leere-Ordner-Problem in Git).
- Die Nummern 01–04 entsprechen den Schichten 1–4 des Blueprints; 00 ist Betriebskontext, 05 sind Anhänge.
- Die Prozess-Skills bleiben in `.claude/skills/` (Code-Konvention der Runtime, nicht Vault-Inhalt).

## Notiz-Konventionen
- Frontmatter-Pflichtfelder: `tags`, `status`, `date`; bei migrierten Notizen zusätzlich `quelle` (Herkunft + Validierungsdatum)
- `status: erfasst | verifiziert` — **nur Verifiziertes ist Arbeitsgrundlage des Agenten**
- Verlinkung über `[[Wikilinks]]`; jede Notiz hat genau eine Heimat-Schicht, Querbezüge per Link
- Deutsche Datei-/Ordnernamen inkl. Umlaute (bewährt im alten Vault)

## Governance (`.claude/rules/vault.md`)
- **Schreibregeln:** Agent schreibt autonom nur in `03 AI/Lernlog/`; alle anderen Änderungen nur nach menschlicher Freigabe (Vorschlag/Entwurf statt Direktänderung)
- **Arbeitsgrundlage:** Notizen mit `status: erfasst` dürfen nicht als verlässliches Wissen behandelt werden
- **Migrations-Filter:** Nur GRÜNSCHNITT- + OS-Wissen. Grenzfälle geregelt: GRÜNSCHNITT-Schreibstil rein (ohne private Deutz-Regeln); Daily Notes und private Projekte (SAP, Training) bleiben draußen
- **Keine Secrets im Vault:** Credentials nur via `.env`-Pattern; deny-Regeln wie im alten Vault

## Out of Scope
- Die eigentliche Inhalts-Migration — PROJ-3 (Prozesse), PROJ-4 (Hero), PROJ-5 (OS + Branding), PROJ-6 (Skills)
- Cockpit-Zugriff auf den Vault — PROJ-7 ff.
- Automatisierter Lernkreislauf (Erfassen → Befördern) — PROJ-15
- Stilllegung/Archivierung des alten Vaults — erst nach Abschluss von PROJ-3–6

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen das Repo ist frisch geklont, wenn man `vault/` in Obsidian öffnet, dann lädt der Vault fehlerfrei und zeigt die Schicht-Ordner mit Übersichtsnotizen
- [ ] Angenommen eine neue Claude-Session startet im Repo, wenn Vault-Arbeit beginnt, dann sind die Governance-Regeln automatisch im Kontext (`.claude/rules/vault.md`)
- [ ] Angenommen der Agent will eine Beobachtung festhalten, wenn er in `03 AI/Lernlog/` schreibt, dann ist das ohne Freigabe erlaubt
- [ ] Angenommen der Agent will außerhalb des Lernlogs schreiben, wenn keine Freigabe vorliegt, dann untersagen die Regeln die Direktänderung
- [ ] Angenommen eine Notiz trägt `status: erfasst`, wenn der Agent Arbeitsgrundlage sucht, dann nutzt er sie nicht als verlässliches Wissen
- [ ] Angenommen eine migrierte Notiz, wenn man ihr Frontmatter liest, dann stehen dort Herkunft und Validierungsdatum (`quelle`)
- [ ] Angenommen Obsidian erzeugt lokale Arbeitsdateien (z. B. `workspace.json`), wenn man `git status` ausführt, dann tauchen sie nicht auf (`.gitignore`)
- [ ] Angenommen jemand fragt „Gehört X in diesen Vault?", wenn er `Start.md` liest, dann beantwortet der Migrations-Filter die Frage eindeutig

## Edge Cases
- **Grenzfall Schreibstil:** Quelldatei mischt GRÜNSCHNITT- und private Deutz-Regeln → beim Migrieren (PROJ-5) wird nur der GRÜNSCHNITT-Teil übernommen
- **Notiz passt in zwei Schichten** (z. B. Hero-Wissen im Prozessschritt) → eine Heimat, Querverweis per Wikilink
- **Obsidian-Konfig auf mehreren Geräten** → nur minimale `.obsidian`-Dateien versionieren, Rest ignorieren
- **Agent-Zugriff aus dem Cockpit später** (PROJ-10/15) → muss dieselben Gates respektieren; Regeln toolneutral formulieren
- **Umlaute in Pfaden** → bewusst akzeptiert (bewährt); falls ein Tool stolpert, wird das im Lernlog erfasst

## Technical Requirements (optional)
- Keine App-Funktionalität — reines Datei-/Regelwerk-Feature
- Security: keine Secrets/Credentials im Vault; `.gitignore` deckt Obsidian-Arbeitsdateien ab

## Open Questions
- [ ] Prozessschritte als eigene Dateien oder Abschnitte je Prozessnotiz? → je Prozess in PROJ-3 entscheiden (komplex = Dateien, wie die Skills es machen)
- [ ] Liest das Cockpit den Vault zur Laufzeit oder zur Build-Zeit? → `/architecture` in Phase 2
- [ ] Zeitpunkt der Stilllegung der GRÜNSCHNITT-Teile im alten Vault? → nach PROJ-6

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| `vault/` im Repo, Obsidian-kompatibel | Ein Repo = ein System; Git-Versionierung; App & Agent lesen direkt | 2026-07-17 |
| Gliederung nach Blueprint-Schichten (00–05) | Vault spiegelt das OS; Nummern 01–04 = Schichten 1–4; eindeutige Einsortier-Frage | 2026-07-17 |
| Prozess-Hierarchie Szenario → Prozess → Schritt (I/T/O) | SIPOC-Denken aus dem Blueprint, testbar je Schritt | 2026-07-17 |
| Referenz (auto-generiert) vs. Praxiswissen (verifiziert) | Bewährtes Muster; passt zum Wissenskreislauf | 2026-07-17 |
| Lernlog autonom, Rest gated | „Selbstoptimierung braucht ein Gate" — nichts wird automatisch Regel | 2026-07-17 |
| Frontmatter mit Stufen + `quelle` | Verifizierungsstand maschinenlesbar; Migration nachvollziehbar | 2026-07-17 |
| Skills bleiben in `.claude/skills/` | Code-Konvention der Runtime, nicht Wissensinhalt | 2026-07-17 |

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
