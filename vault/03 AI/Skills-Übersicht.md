---
tags: [ai, skills, uebersicht]
status: verifiziert
date: 2026-07-18
quelle: neu erstellt bei der Skill-Migration (PROJ-6); Review Julian 2026-07-18
---

# Skills-Übersicht

Skill = Prozess: Ein Skill spiegelt genau einen Kernprozess und lädt bei Bedarf Schritt-Dateien je Phase (Progressive Disclosure). Die Skills liegen in `.claude/skills/` des Repos — dort teilen sie sich den Ort mit den Entwicklungs-Workflow-Skills (write-spec, qa, …); die vier Prozess-Skills sind:

| Skill | Prozess | Dateien |
|-------|---------|---------|
| `bauprojekt` | [[Prozess Bauprojekt End-to-End]] | SKILL.md + 7 Schritt-Dateien (B1–B7) |
| `projekt-ohne-angebot` | [[Prozess Projekt ohne Angebot]] | SKILL.md |
| `abo` | [[Prozess Abo-Einsatz]] | SKILL.md |
| `hero-stammdaten` | [[Prozess Stammdatenpflege]] · [[Prozess Kundenstammdaten]] | SKILL.md + kunde.md + katalog.md |

## Konventionen

- **CLI-Aufrufe gehen vom Repo-Root aus:** `tools/hero-tools/hero <befehl>` (Setup: `tools/README.md`)
- **Wissen auf Abruf:** Skills referenzieren Vault-Notizen per Pfad und lesen sie im passenden Schritt — Regeln immer im Kontext, Daten auf Abruf ([[Wissenskreislauf KI-Betriebssystem]])
- **Gates gelten immer:** Entwurf-first und Schreib-Freigaben aus `.claude/rules/hero-tools.md` stehen über jedem Skill
- Skill-Änderungen sind Beförderungen im Wissenskreislauf — nie automatisch, immer per menschlicher Entscheidung

## Historie

- 14.07.2026: Skills im alten Vault praxisgetestet (PFL-155, GABO-156, Echtbetrieb Fall Greiner)
- 18.07.2026: Migration in dieses Repo (PROJ-6), Pfade auf neue Struktur, statische Validierung bestanden
