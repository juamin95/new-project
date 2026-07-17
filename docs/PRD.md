# Product Requirements Document — GRÜNSCHNITT-OS

## Vision
Ein KI-Betriebssystem für den Garten- und Landschaftsbau-Betrieb GRÜNSCHNITT (Marvin Amini), das den Hauptprozess **Anfrage → Rechnungserstellung** digital führt. Es verbindet vier Schichten: klare Prozesse, IT-Infrastruktur (Hero, E-Mail, Supabase, n8n), KI-Orchestrierung (Skills + Vault) und den Menschen als Gate.

Dieses Repo ist der übergabefähige „Repo-2-Schnitt" aus dem Blueprint: validiertes GRÜNSCHNITT- und OS-Wissen, getrennt von Julians privatem Vault, plus das **Cockpit** — die Web-App, die Marvin (heute: Stift und Papier) eine digitale Baustelle gibt. Kernpunkt des Cockpits: Anfragen kommen rein, das System erkennt daraus Aufgaben/To-dos, und Marvin arbeitet sie gemeinsam mit dem OS ab — Übersicht in der App, Aktionen (z. B. Termine anlegen) führt das OS aus.

## Target Users
- **Marvin (Betriebsinhaber, operativ):** arbeitet heute papierbasiert; braucht eine radikal einfache, mobil nutzbare Oberfläche. Wickelt Vorgänge von Anfrage bis Rechnungserstellung ab, gibt Außenwirksames (Mails, Angebote, Rechnungen) frei, plant Termine und koordiniert Mitarbeiter. Stellt dem OS Alltagsfragen („Was habe ich morgen an?") und bekommt Zusammenfassungen.
- **Julian (Aufbau & Betrieb des OS):** baut und wartet das System, übernimmt ab Rechnungserstellung manuell (Buchhaltung/DATEV — vorerst außerhalb dieses Projekts, siehe Parkplatz). Braucht Transparenz über Routinen und Systemzustand.

## Core Features (Roadmap)

### Phase 1 — Wissensmigration (validiert, nicht neu abgeleitet)

| Priorität | Feature | Inhalt | Status |
|----------|---------|--------|--------|
| P0 (MVP) | Vault-Gerüst & Governance | Repo-2-Struktur, Ordnerlogik, Regeln, Migrations-Filter (nur GRÜNSCHNITT + OS) | Approved |
| P0 (MVP) | Migration Prozesswissen | Prozesslandkarte, 3 Kernprozesse (Projekt / ohne Angebot / Abo), Supportprozesse | Roadmap |
| P0 (MVP) | Migration Hero-GraphQL-Wissen | Referenz + verifiziertes Praxiswissen | Roadmap |
| P0 (MVP) | Migration OS-Wissen + Branding | Blueprint, Wissenskreislauf; Branding → `docs/design-system.md`, Schreibstil in den Vault | Roadmap |
| P0 (MVP) | Migration Prozess-Skills | bauprojekt, projekt-ohne-angebot, abo, hero-stammdaten — mit Validierungstest | Roadmap |

### Phase 2 — Cockpit (Web-App für Marvin)

| Priorität | Feature | Inhalt | Status |
|----------|---------|--------|--------|
| P0 (MVP) | Supabase-Infrastruktur | Bestehendes Website-Projekt („juamin95's Project", leads + projekte) erweitern: Auth, Cockpit-Schema | Roadmap |
| P0 (MVP) | Cockpit-Grundgerüst | Login (Marvin/Julian), mobile-first Navigation im GRÜNSCHNITT-Branding | Roadmap |
| P0 (MVP) | Prozess-Board | Alle Hero-Projekte entlang der drei Pipelines, Anfrage → Rechnungserstellung, auf einen Blick | Roadmap |
| P0 (MVP) | Review-Liste (Gate) | Entwürfe (Mails, Angebote, Rechnungen) prüfen/freigeben, Audit-Trail — nie Autoversand | Roadmap |
| P0 (MVP) | Chat mit dem OS | Marvin steuert Aktionen in Alltagssprache (Termine anlegen, Fragen, Zusammenfassungen); nutzt die migrierten Skills | Roadmap |
| P0 (MVP) | Aufgaben & To-dos | System erkennt Aufgaben aus Anfragen und Prozessstatus; Marvin arbeitet sie mit dem OS ab | Roadmap |
| P1 | Anfrage-Eingang | Website-Leads + E-Mail-Anfragen (n8n-klassifiziert) erkennen und Projekten zuordnen | Roadmap |
| P1 | Termin- & Einsatzansicht | Wochenansicht der Einsätze aus Hero-Terminen; Erstellung läuft übers OS (Chat) | Roadmap |
| P1 | n8n-Anbindung & Routinen-Monitoring | Agent-Zugriff auf n8n via MCP: Executions auswerten, Fehlläufe melden, nachtriggern | Roadmap |
| P2 | Feedbackschleifen / Lernkreislauf | Korrekturen bei Freigaben werden erfasst → System lernt (Wissenskreislauf, mit Gate) | Roadmap |

## Success Metrics
1. **Marvin arbeitet eigenständig:** kompletter Durchlauf Anfrage → Rechnungserstellung übers Cockpit, ohne Julian an der Konsole
2. **Digitale Baustelle statt Papier:** weniger Zeit für Planung/Koordination, konstante Prozessqualität, zufriedenere Kunden
3. **Nichts geht verloren:** jede Anfrage wird erfasst, einem Projekt zugeordnet und erzeugt ihre Aufgaben
4. **Prozesswissen transparent:** Wissen liegt validiert im System statt in Köpfen; alter Vault für GRÜNSCHNITT-Themen abschaltbar

## Constraints
- **Hero bleibt führendes System** (Datenhoheit Angebote/Rechnungen/Kunden); das OS orchestriert über die GraphQL-API
- **Gate-Prinzip dauerhaft:** Außenwirksames (Kundenmail, Angebot, Rechnung) gibt immer ein Mensch frei
- **Arbeitsteilung Agent/n8n:** Event-getriggerte Flows (z. B. E-Mail-Eingang + Klassifizierung) bleiben in n8n; der Agent (Claude Code) erhält über MCP Zugriff auf n8n, um Executions auszuwerten und nachzutriggern. Deterministische Loops, die Skills ausführen, sind ausdrücklich möglich.
- **Marvin ist papiergewohnt:** UI radikal einfach, mobile-first
- Bestehende Infrastruktur nutzen: Hero, Strato-Mail, n8n (VPS), Supabase „juamin95's Project" (bnzpdujupmmrwcbunbql), Vercel
- Julian baut allein, neben dem Tagesgeschäft
- Design-System: siehe `docs/design-system.md` (GRÜNSCHNITT-Branding, wird in Phase 1 migriert)

## Non-Goals
- **Kein Kundenportal** — Kunden kommunizieren per Mail/Telefon
- **Kein Hero-Nachbau** — keine eigene Angebots-/Rechnungslogik
- **Keine Buchhaltung** — der Scope endet bei der Rechnungserstellung
- **Keine Mitarbeiter-Logins in V1** — Einsatzplanung macht Marvin im Cockpit

## Parkplatz (bewusst offen, später nachziehen)
- **Prozess nach Rechnungserstellung:** Zahlungseingang, Mahnwesen, DATEV-Übergabe — macht Julian vorerst manuell (überschaubar), Automatisierung folgt
- **Weitere Anbindungen:** zusätzliche Schnittstellen/Konnektoren je nach Bedarf (z. B. Kalender, weitere Kanäle)
- **Mitarbeiter-Zugänge:** eigene Logins/Zeiterfassung fürs Team

---

Nutze `/write-spec`, um für die Roadmap-Features detaillierte Spezifikationen zu erstellen.
