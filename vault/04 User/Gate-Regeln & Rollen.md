---
tags: [user, gate, rollen]
status: verifiziert
date: 2026-07-18
quelle: kuratierte Extraktion aus dem KI-Betriebssystem Blueprint (Schicht 4) und dem Wissenskreislauf (Rollen); Review Julian 2026-07-18 (Gate 2)
---

# Gate-Regeln & Rollen

Der Mensch ist Schicht 4 des OS: Er steuert, prüft, gibt frei — und erzeugt dadurch das Lernsignal. Vollständige Methode: [[KI-Betriebssystem Blueprint]] und [[Wissenskreislauf KI-Betriebssystem]].

## Die zwei unabhängigen Regler

**1. Das Gate (wer gibt frei) — risiko-gestuft und dauerhaft:**

| Stufe | Was | Wer |
|-------|-----|-----|
| Immer Mensch, für immer | Außenwirksames/Bindendes: Kundenmail, Angebot, Rechnung, Zahlung, Löschung | Marvin (operativ) bzw. Julian |
| Autonom erlaubt | Lesen, interne Entwürfe, To-dos, Lernlog-Einträge | Agent |

Umsetzung im Alltag: **Entwurf-first** — Angebote/Rechnungen entstehen nur als Hero-Draft (`publish: false`), Mails später nur als Postfach-Entwurf. Verbindlich in `.claude/rules/hero-tools.md`.

**2. Die Initiative (wer startet) — wächst über die Zeit:** von „der Mensch befiehlt" zu „das System startet gelernte Routinen". 

**Die Falle:** „System hat's gelernt, macht's jetzt allein" darf das Gate **nicht** aushebeln. Autonom *gestartet* ≠ ungeprüft *versendet*. Und: Die Beförderung von Beobachtung zu Regel ist immer eine menschliche Entscheidung ([[Wissenskreislauf KI-Betriebssystem]]).

## Rollen

| Rolle | Aufgabe |
|-------|---------|
| **Marvin** | operativ Anfrage → Rechnungserstellung; gibt Außenwirksames frei; erzeugt durch Korrekturen und finale Dokumente das Lernsignal — ohne Zusatzaufwand |
| **Julian** | baut und betreibt das OS; entscheidet über jede Beförderung im Wissenskreislauf; übernimmt ab Rechnungserstellung (Buchhaltung) |
| **Agent (das OS)** | erkundet, bereitet vor, erstellt Entwürfe, erfasst Beobachtungen, macht Vorschläge — schreibt in Zielsysteme nur nach Freigabe |
| **Git** | Audit-Trail: jede Wissensänderung und Freigabe ist ein nachvollziehbarer Commit |
