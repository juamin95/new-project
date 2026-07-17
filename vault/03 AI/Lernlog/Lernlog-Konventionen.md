---
tags: [ai, lernlog, konventionen]
status: verifiziert
date: 2026-07-17
---

# Lernlog-Konventionen

Der Lernlog ist der Beobachtungsspeicher des OS und der **einzige Bereich, in dem der Agent ohne menschliche Freigabe schreiben darf** (Stufe „Erfassen" des Wissenskreislaufs).

## Regeln

- Eine Beobachtung = ein Eintrag; neue Notizen hier immer mit `status: erfasst`
- Festgehalten wird, was im Betrieb auffällt: Abweichungen vom Soll-Prozess, überraschendes Systemverhalten, wiederkehrende Sonderfälle, Korrekturen durch den Menschen
- Ein Lernlog-Eintrag ist nie Arbeitsgrundlage — er ist Rohmaterial
- Die Beförderung einer Beobachtung zu verifiziertem Wissen (Prozessnotiz, Praxiswissen, Regel) entscheidet ein Mensch; siehe [[Notiz-Konventionen]] und `.claude/rules/vault.md`

## Namensschema

`JJJJ-MM-TT Kurzbeschreibung.md` — z. B. `2026-07-17 Abo-Projekt ohne Gewerk angelegt.md`
