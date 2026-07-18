# PROJ-1: Supabase-Infrastruktur

## Status: Planned
**Created:** 2026-07-18
**Last Updated:** 2026-07-18

## Dependencies
- Keine
- Wird benötigt von: PROJ-7 ff. (gesamtes Cockpit)

## Abgrenzung
PROJ-1 macht die Infrastruktur **funktionsfähig** (Auth konfiguriert, Konto angelegt, Fundament, technischer Nachweis). Die Login-**Oberfläche** baut PROJ-7.

## User Stories
- Als **Marvin und Julian** möchten wir uns mit einem gemeinsamen Cockpit-Konto per Magic Link einloggen, damit der Zugang passwortlos und trotzdem geschützt ist.
- Als **Julian** möchte ich, dass die laufende Website (CMS + Kontaktformular) vom Cockpit-Ausbau unberührt bleibt, damit keine Kundenanfrage verloren geht.
- Als **Entwicklung (PROJ-7 ff.)** möchte ich ein dokumentiertes RLS-Grundmuster und Namenskonventionen, damit jede künftige Cockpit-Tabelle demselben Sicherheitsmodell folgt.
- Als **Agent (das OS)** möchte ich eine Supabase-Wissensnotiz im Vault, damit Projekt, Bestand und Konventionen nachschlagbar sind.

## Umfang

**1. Auth (passwortlos, hohe Sicherheit):**
- Supabase Auth mit **Magic Link**: Login-Link per E-Mail, einmalig gültig, zeitlich begrenzt
- **Ein gemeinsames, vorab angelegtes Konto** für Marvin + Julian — keine Selbstregistrierung; fremde E-Mail-Adressen erhalten weder Link noch Konto
- Sessions in sicheren HttpOnly-Cookies, lange Laufzeit (im Alltag eingeloggt bleiben; Link nur bei neuen Geräten/Abmeldung); parallele Sessions auf mehreren Geräten erlaubt
- **Operative Auflage (der eigentliche Sicherheitsfaktor):** Das Konto-Postfach wird mit 2FA abgesichert — die Magic-Link-Sicherheit hängt am Postfach

**2. Fundament (bewusst schlank):**
- RLS-Grundmuster „nur authentifizierte Cockpit-Nutzer" — dokumentiert als verbindliche Vorlage für alle künftigen Cockpit-Tabellen (PROJ-9/10/11)
- Namens-/Trennungs-Konvention gegenüber den Website-Tabellen; `leads` und `projekte` samt Policies bleiben **unangetastet** — das Kontaktformular der Website darf nicht brechen
- Keine Rollen-/Profil-Tabelle (ein Konto, keine Rechteunterschiede — Julians Entscheidung)

**3. Env & Sicherheit:**
- Verifikation, dass die vorhandenen Env-Variablen aufs richtige Projekt zeigen (bnzpdujupmmrwcbunbql)
- `SERVICE_ROLE_KEY` ausschließlich serverseitig — nie im Client-Bundle

**4. Wissensdoku:** Erste Notiz in `vault/02 Technik/Supabase/` (Projekt, Bestand, Auth-Modell, Konventionen) — mit Review-Gate

## Out of Scope
- Login-Seite und Session-Handling im UI — PROJ-7
- Feature-Tabellen (Review-Liste → PROJ-9, Chat → PROJ-10, To-dos → PROJ-11)
- Zweites Konto / Rollen / personenscharfer Audit-Trail — bewusst nicht in V1, jederzeit nachrüstbar
- Änderungen an Website-Tabellen oder deren Policies
- Mitarbeiter-Logins (PRD Non-Goal)

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen das Cockpit-Konto ist angelegt, wenn für dessen E-Mail-Adresse ein Magic Link angefordert wird, dann kommt der Link an und der Login gelingt (technischer Nachweis ohne UI)
- [ ] Angenommen eine fremde E-Mail-Adresse fordert einen Magic Link an, dann entsteht kein Konto und kein Zugang
- [ ] Angenommen die Umsetzung ist abgeschlossen, wenn man `leads`/`projekte` und deren Policies vergleicht, dann sind sie unverändert und ein Test-Insert über das Website-Formular funktioniert weiter
- [ ] Angenommen ein Produktions-Build wird erstellt, wenn man das Client-Bundle nach dem Service-Role-Key durchsucht, dann ist er nicht enthalten
- [ ] Angenommen das RLS-Grundmuster ist dokumentiert, wenn PROJ-9/10/11 Tabellen anlegen, dann existiert eine verbindliche Vorlage (Konvention + Beispiel-Policy)
- [ ] Angenommen die Supabase-Notiz liegt im Vault, wenn man sie liest, dann beschreibt sie Projekt, Bestand, Auth-Modell und Konventionen (`status` nach Review)

## Edge Cases
- **Magic-Link-Mail kommt nicht an / Spam** → dokumentierter Prüfpfad; siehe offene Frage SMTP
- **Link abgelaufen oder doppelt geklickt** → neuer Link anforderbar; Fehlertext-UI kommt mit PROJ-7
- **Beide gleichzeitig eingeloggt** (ein Konto, zwei Geräte) → ausdrücklich erlaubt und getestet
- **Supabase-Standard-Mailer hat enge Versandlimits** (wenige Mails/Stunde) → für 2 Personen meist ok, aber Zustellqualität/Limits sprechen für eigenes SMTP → offene Frage
- **Env zeigt auf falsches Projekt** → Verifikationsschritt schlägt fehl, bevor irgendetwas migriert wird

## Technical Requirements (optional)
- Alle künftigen Cockpit-Tabellen: RLS Pflicht (security.md-Regeln gelten)
- Zugriffsweg für Migrationen: Supabase-MCP (neu verbinden) oder Skript mit `SERVICE_ROLE_KEY` aus `.env.local` (Hero-Muster: Skript liest selbst, Agent sieht den Key nie) → `/architecture`

## Open Questions
- [ ] E-Mail-Versand: Standard-Mailer vs. eigenes SMTP (Strato vorhanden) → `/architecture`
- [ ] Welche E-Mail-Adresse fürs gemeinsame Konto? → Julian bei der Umsetzung
- [ ] Magic-Link-Redirect-Domains (lokal + Vercel) → PROJ-7 / `/deploy`
- [ ] Supabase-MCP neu verbinden oder Skript-Weg? → `/architecture`

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Magic Link statt Passwort + 2FA | Julians Wahl: passwortlos; Sicherheit hängt am Postfach → Postfach-2FA als operative Auflage | 2026-07-18 |
| **Ein gemeinsames Konto**, keine Rollen | Julians Entscheidung: keine Rechteunterschiede nötig; Audit-Trail nennt dann das Konto, nicht die Person; zweites Konto jederzeit nachrüstbar | 2026-07-18 |
| Keine Selbstregistrierung | Nur das eine Konto (PRD: keine Mitarbeiter-Logins in V1) | 2026-07-18 |
| Nur Fundament, keine Feature-Tabellen | Tabellen entstehen mit ihren Features — nichts auf Verdacht | 2026-07-18 |
| Website-Tabellen tabu | Produktivbetrieb der Website (CMS + Kontaktformular) darf nicht brechen | 2026-07-18 |

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
