---
tags: [uebersicht, technik]
status: verifiziert
date: 2026-07-17
---

# 02 Technik — Übersicht (Schicht 2)

Die digitale Infrastruktur, die vom OS bedient wird: je angebundenes System ein Ordner.

**Hier liegt:**
- [[Hero]] — führendes System für Angebote, Rechnungen, Kunden. Mit der bewährten Trennung: „Referenz (auto-generiert)" (maschinell aus der GraphQL-Introspection) vs. „Praxiswissen (verifiziert)" (durch Tests bestätigt)
- `n8n/` — event-getriggerte Flows und Betriebs-Wissen (erste Notiz: IMAP-Node als Agent-Tool patchen); MCP-Zugriff folgt mit PROJ-14
- `E-Mail/` — Strato-Postfach, IMAP/SMTP-Anbindung (folgt mit späteren Anbindungen)
- `Supabase/` — Cockpit-Datenbank und Website-Backend (folgt mit Phase 2)

Grundregel jeder Anbindung: Erst die maschinenlesbare Selbstbeschreibung des Zielsystems beschaffen (Introspection / Schema), dann andocken.

Einsortier-Frage: Beschreibt das Wissen, wie ein System technisch funktioniert oder angesprochen wird? Dann gehört es hierher. Prozessabläufe gehören in [[01 Prozess]].
