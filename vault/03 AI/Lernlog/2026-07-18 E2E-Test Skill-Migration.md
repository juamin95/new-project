---
tags: [lernlog, prozess, hero]
status: erfasst
date: 2026-07-18
---

# 2026-07-18 | PFL-158 | E2E-Test Skill-Migration (PROJ-6)

Rohbeobachtungen aus dem Testdurchlauf projekt-ohne-angebot am Testkunden (5711737).

### 2026-07-18 | PFL-158 | Anlegen/Status
- Beobachtung: API-Antworten zeigen bei Projekten vom Typ "Projekt ohne Angebot" (65686) die Statusnamen der alten Default-Pipeline ("Neu - Erstkontakt" bei 201, "Umsetzungsbeginn" bei 1101) statt der Typ-Pipeline-Namen ("Anfrage eingegangen", "Termin festgelegt"). Die Status-Codes stimmen exakt. Mögliche Regel: Codes sind führend, Statusnamen aus API-Antworten nie als Anzeige übernehmen ohne Abgleich mit der Typ-Pipeline.
- Quelle: Nutzer-Hinweis (E2E-Protokoll)
- Status: roh

### 2026-07-18 | PFL-158 | Archiv-Sichtbarkeit
- Beobachtung: `project_matches` liefert archivierte Projekte (2100) standardmäßig NICHT — weder per `ids` noch per `--kunde`-Suche. Sichtbar nur mit explizitem Filter `statuses: [2100]`. Mögliche Regel: fürs Praxiswissen (Gewerke und Projekttypen) destillieren; Auswertungen über "alle Projekte" müssen 2100 explizit anfragen.
- Quelle: Entwurf-Diff (Verifikation Endzustand)
- Status: roh

### 2026-07-18 | UNB-157 | Streuner
- Beobachtung: Beim Testkunden liegt ein namenloses Projekt UNB-157 im Status 201 (alte Default-Pipeline) — vermutlich Altbestand aus früheren Tests. Aufräumkandidat (Archivieren auf Zuruf).
- Quelle: Nutzer-Hinweis (Schritt 0 Kontext-Auflösung)
- Status: roh
