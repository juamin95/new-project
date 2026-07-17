---
tags: [prozess, kernprozess]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Prozess Projekt ohne Angebot, Stand 2026-07-14); Hero-Abgleich bestanden 2026-07-17, Review Julian 2026-07-18
---

# Prozess: Projekt ohne Angebot (Direktauftrag)

Der einfache Kernprozess-Weg (Entscheidung 14.07.2026, Teil des Zielbilds in der [[Prozesslandkarte]]): Ein bekannter Kunde ruft an und ruft eine überschaubare Leistung ab — kein Angebot, keine Planung, keine Vertriebsphase.

## Auslöser

Anruf/WhatsApp/E-Mail eines (meist Bestands-)Kunden: "Könnt ihr wieder …" — Heckenschnitt, Pflegeeinsatz, kleine Reparatur.

## Ablauf (Hero-Projekttyp "Projekt ohne Angebot", 65686)

| Schritt | Hero-Status (Code) | Inhalt |
|---|---|---|
| 1 | Anfrage eingegangen (201) | Projekt anlegen (Gewerk PFL, bei kleinem Bau GES), Wunsch ins Logbuch |
| 2 | Termin festgelegt (1101) | Einsatztermin im Hero-Kalender (Kategorie Umsetzung, Marvin) |
| 3 | In Umsetzung (1111) | Einsatz; Besonderheiten ins Logbuch |
| 4 | Rechnung (1150) | Rechnungsentwurf aus alten Rechnungen des Kunden (Positionen übernehmen, Stunden anpassen); Marvin versendet |
| 5 | Abgeschlossen (2000) | fertig; Archivierung (2100) gesammelt |

## Regeln

- **Alte Rechnungen sind die Kalkulationsgrundlage** — `hero historie rechnungen --kunde <id>` liefert Positionen und Preise live; nur Mengen/Stunden anpassen.
- Zwei-Phasen-Muster und alle harten Regeln wie im Bauprozess ([[Prozess Bauprojekt End-to-End]]).
- Eskalation: Stellt sich beim Termin heraus, dass es größer wird (Angebot nötig) → Wechsel in den Bauprozess-Weg; das Projekt bleibt, nur der Prozess dahinter wechselt (Typ-Wechsel in Hero durch Julian klären).

## Umsetzung

Skill: `.claude/skills/projekt-ohne-angebot/` · Tools: hero-tools CLI · Status: umgesetzt und Praxistest bestanden 14.07.2026 (PFL-155, Testkunde; Rechnungs-Gate demonstriert, Dokumentenerstellung bereits im Bauprozess verifiziert).
