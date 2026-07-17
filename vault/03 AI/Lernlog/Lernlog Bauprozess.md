---
tags: [lernlog, prozess, bau]
status: erfasst
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Lernlog Bauprozess, Stand 2026-07-12); Review Julian 2026-07-18
---

# Lernlog Bauprozess

Rohbeobachtungen aus der Ausführung des [[Prozess Bauprojekt End-to-End]].
**Append-only:** Neue Einträge unten anfügen, bestehende nie umschreiben.

Lernkreislauf: **Erfassen** (Agent, laufend) → **Destillieren** (Agent gruppiert
Muster, periodisch) → **Befördern** (Julian entscheidet: Datum → Wissensbasis,
Verhalten → Skill, oder verwerfen) → **Versionieren** (Git). Beobachtungen
werden nie automatisch zu Regeln.

## Format je Eintrag

```
### JJJJ-MM-TT | UNB-xxx | Phase Bx
- Beobachtung: <was war anders als vorbereitet / welche Korrektur kam>
- Quelle: Entwurf-Diff | Chat-Korrektur | Nutzer-Hinweis
- Status: roh | verarbeitet → <wohin> | verworfen
```

## Einträge

### 2026-07-12 | UNB-148 | Phase 5
- Beobachtung: Agent hat die Erinnerungs-Aufgabe "Kunde über Termin informieren" automatisch als erledigt markiert, weil der Nutzer von einem Telefonat mit dem Kunden berichtete. Korrektur durch Julian: Die Aufgabe sollte offen bleiben (das Gespräch war Teil eines Anleitungsbeispiels, die Erledigung war nicht gemeint). Mögliche Regel: Aufgaben nur auf ausdrückliche Anweisung als erledigt markieren, nicht aus Kontext schließen.
- Quelle: Chat-Korrektur
- Status: roh
