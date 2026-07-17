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
| Git als einziger Speicher, keine Datenbank | Wissen ist Markdown; Git liefert Versionierung und Änderungshistorie kostenlos | 2026-07-17 |
| Obsidian-Konfig minimal versionieren, workspace/Cache ignorieren | Bewährtes Muster aus dem alten Vault; verhindert Sync-Konflikte zwischen Geräten | 2026-07-17 |
| Governance über `.claude/rules/vault.md` | Bestehender Auto-Lade-Mechanismus des Repos; keine neue Infrastruktur nötig | 2026-07-17 |
| Konventionen einmal im Vault, Regeln verlinken nur | Eine Pflegestelle statt driftender Kopien (Prinzip aus dem Schreibstil-Ansatz) | 2026-07-17 |
| Schicht-Unterordner erst mit Inhalt anlegen (außer Lernlog) | Git kann leere Ordner nicht tracken; Platzhalter wären Pflege-Ballast; Lernlog braucht der Agent ab Tag 1 | 2026-07-17 |
| Gates toolneutral („der Agent") formuliert | Gleiche Regeln gelten für Claude Code heute und Cockpit-Chat/Lernkreislauf später (PROJ-10/15) | 2026-07-17 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_Erstellt: 2026-07-17_

### Was gebaut wird (Dateibaum statt UI — dieses Feature hat keine App-Oberfläche)

```
vault/
+-- Start.md                      ← Hub-Notiz: Struktur, Einsortier-Regel, Migrations-Filter
+-- .obsidian/                    ← minimale Obsidian-Konfiguration (versioniert)
+-- 00 Betrieb/00 Betrieb.md      ← Übersichtsnotiz der Schicht
+-- 01 Prozess/01 Prozess.md
+-- 02 Technik/02 Technik.md
+-- 03 AI/
|   +-- 03 AI.md
|   +-- Notiz-Konventionen.md     ← Frontmatter-Regeln, Statusstufen, Wikilink-Prinzip
|   +-- Lernlog/Lernlog-Konventionen.md  ← einziger autonomer Schreibbereich des Agenten
+-- 04 User/04 User.md
+-- 05 Anhänge/05 Anhänge.md

.claude/rules/vault.md            ← Governance: Schreibgates, Arbeitsgrundlage, Migrations-Filter
.gitignore                        ← ergänzt um Obsidian-Arbeitsdateien (Muster aus altem Vault)
```

Die Unterordner der Schichten (Kernprozesse/, Hero/, n8n/ …) entstehen erst mit den Inhalten in PROJ-3 bis PROJ-6 — leere Ordner kann Git nicht versionieren, und Platzhalter ohne Inhalt wären Pflege-Ballast. Ausnahme: `Lernlog/` wird sofort angelegt, weil der Agent dort ab Tag 1 schreiben darf.

### Datenmodell (in einfacher Sprache)

Jede Vault-Notiz ist eine Markdown-Datei mit einem Kopfbereich (Frontmatter):
- **tags** — Liste von Schlagworten (z. B. prozess, kernprozess)
- **status** — `erfasst` oder `verifiziert`; nur Verifiziertes ist Arbeitsgrundlage des Agenten
- **date** — Erstell-/Änderungsdatum
- **quelle** — nur bei migrierten Notizen: Herkunft + Validierungsdatum

Gespeichert wird ausschließlich in Git — keine Datenbank, kein Server. Die Historie jeder Wissensänderung liefert Git kostenlos mit (wer, wann, was).

### Tech-Entscheidungen (Warum)

1. **Keine App-Änderung, keine Pakete.** Das Feature ist reines Datei- und Regelwerk — die Next.js-App bleibt unberührt. Das hält PROJ-2 klein und risikofrei.
2. **Obsidian-Konfiguration minimal versionieren.** Nur Grundeinstellungen (Editor, Darstellung, Plugin-Liste) werden eingecheckt, damit jedes Gerät denselben Vault-Zustand bekommt. Gerätespezifisches (Fensterlayout `workspace.json`, Cache, Papierkorb) wird ignoriert — exakt das Muster, das sich im alten Vault bewährt hat und dort Sync-Konflikte verhindert.
3. **Governance als `.claude/rules/vault.md`.** Das Repo lädt alle Dateien unter `.claude/rules/` automatisch in jede Claude-Session (so funktionieren schon general/security/frontend/backend). Die Vault-Regeln bekommen damit dieselbe Verbindlichkeit — ohne neuen Mechanismus.
4. **Verweisen statt kopieren.** Die Notiz-Konventionen stehen einmal im Vault (`03 AI/Notiz-Konventionen.md`); Start.md und vault.md verlinken darauf. Gleiche Logik wie beim Schreibstil im alten Vault: eine Pflegestelle, keine Kopien, die auseinanderlaufen.
5. **Gates toolneutral formuliert.** Die Schreibregeln sprechen vom „Agenten", nicht von „Claude Code" — dieselben Regeln gelten später unverändert für den Cockpit-Chat (PROJ-10) und den Lernkreislauf (PROJ-15).

### Abhängigkeiten (Pakete)
- Keine.

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
