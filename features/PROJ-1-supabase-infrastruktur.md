# PROJ-1: Supabase-Infrastruktur

## Status: Approved
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

- [x] Angenommen das Cockpit-Konto ist angelegt, wenn für dessen E-Mail-Adresse ein Magic Link angefordert wird, dann kommt der Link an und der Login gelingt (technischer Nachweis ohne UI)
- [x] Angenommen eine fremde E-Mail-Adresse fordert einen Magic Link an, dann entsteht kein Konto und kein Zugang
- [x] Angenommen die Umsetzung ist abgeschlossen, wenn man `leads`/`projekte` und deren Policies vergleicht, dann sind sie unverändert und ein Test-Insert über das Website-Formular funktioniert weiter
- [x] Angenommen ein Produktions-Build wird erstellt, wenn man das Client-Bundle nach dem Service-Role-Key durchsucht, dann ist er nicht enthalten
- [x] Angenommen das RLS-Grundmuster ist dokumentiert, wenn PROJ-9/10/11 Tabellen anlegen, dann existiert eine verbindliche Vorlage (Konvention + Beispiel-Policy)
- [x] Angenommen die Supabase-Notiz liegt im Vault, wenn man sie liest, dann beschreibt sie Projekt, Bestand, Auth-Modell und Konventionen (`status` nach Review)

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
- [x] E-Mail-Versand: eigenes SMTP über Strato (entschieden in /architecture, 2026-07-18)
- [ ] Welche E-Mail-Adresse fürs gemeinsame Konto? → Julian bei der Umsetzung
- [ ] Magic-Link-Redirect-Domains (lokal + Vercel) → PROJ-7 / `/deploy`
- [x] Migrationsweg: MCP neu verbinden + versionierte Migrationsdateien; SQL-Editor als Fallback (entschieden in /architecture, 2026-07-18)

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
| Eigenes SMTP (Strato) von Anfang an | Magic Link ist der einzige Zugangsweg — Zustellzuverlässigkeit ist sicherheitskritisch; Standard-Mailer hat enge Limits | 2026-07-18 |
| **Revidiert 19.07. (Julian):** Standard-Mailer bleibt vorerst | Zustellung nachweislich ok, 2-Personen-Betrieb; Strato-SMTP als dokumentierte Vor-Go-Live-Bedingung (/deploy) | 2026-07-19 |
| Migrationen versioniert in supabase/migrations/, angewendet via MCP (Fallback: SQL-Editor) | Schemageschichte im Git wie beim Vault; Service-Role-Key kann kein DDL und bleibt Laufzeit-Zugriff | 2026-07-18 |
| Keine neue Tabelle in PROJ-1 | Ein Konto lebt in Supabase Auth; ohne Rollen keine Profil-Tabelle nötig | 2026-07-18 |
| Namensschema cockpit_-Präfix im public-Schema | Klare Trennung von Website-Tabellen ohne Mehraufwand eines separaten Postgres-Schemas | 2026-07-18 |
| Verifikationsskript nach Hero-Muster | Skript liest Env selbst, prüft Projekt-Identität und Unversehrtheit der Website-Tabellen vor jeder Änderung | 2026-07-18 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_Erstellt: 2026-07-18_

### Was entsteht (kein UI — Konfiguration, Konventionen, Nachweis)

```
supabase/migrations/          ← versionierte SQL-Migrationsdateien im Repo (ab jetzt der
                                einzige Weg, wie Datenbankänderungen passieren)
scripts/supabase-check.mjs    ← Verifikationsskript (liest Env selbst, Hero-Muster):
                                richtiges Projekt? Website-Tabellen unversehrt? Auth erreichbar?
vault/02 Technik/Supabase/Supabase.md   ← Wissensnotiz: Projekt, Bestand, Auth-Modell,
                                          RLS-Vorlage, Konventionen (Review-Gate)
Auth-Konfiguration (Supabase Dashboard, dokumentierte Schritte):
  Signups deaktiviert · Magic-Link-Gültigkeit · SMTP · Konto angelegt
```

**Bemerkenswert schlank:** PROJ-1 legt **keine einzige neue Tabelle** an. Das eine Konto lebt in Supabase Auth selbst; ohne Rollen braucht es keine Profil-Tabelle. Das „Fundament" ist Konfiguration + verbindliche Konventionen + Nachweis.

### Die vier offenen Fragen — entschieden

1. **E-Mail-Versand: eigenes SMTP über Strato, von Anfang an.** Der Supabase-Standard-Mailer hat enge Stundenlimits und mittelmäßige Zustellqualität — fürs Login-Verfahren (Magic Link ist der einzige Zugangsweg!) ist Zustellzuverlässigkeit sicherheitskritisch. Ihr habt Strato-SMTP ohnehin; die Konfiguration ist ein einmaliger, dokumentierter Schritt im Supabase-Dashboard (macht Julian, Zugangsdaten bleiben bei ihm).
2. **Migrationsweg: Supabase-MCP neu verbinden (Primärweg), SQL-Dateien als Fundament.** Jede Änderung wird als Migrationsdatei im Repo versioniert (`supabase/migrations/`) — angewendet dann per MCP (`apply_migration`, hat in dieser Session schon funktioniert). Fällt der MCP aus, ist der Fallback eingebaut: Julian führt dieselbe Datei im SQL-Editor aus. Wichtig: Der Service-Role-Key kann kein DDL ausführen — er bleibt, was er ist: Laufzeit-Zugriff fürs Backend, nie Migrationswerkzeug.
3. **Konto-Adresse:** bleibt Julians Input bei der Umsetzung (Empfehlung: eine Adresse, auf die beide Zugriff haben und die 2FA trägt).
4. **Redirect-Domains:** `localhost:3000` wird jetzt eingetragen, die Vercel-Domain kommt mit `/deploy` dazu — dokumentiert als offener Punkt in der Vault-Notiz.

### Konventionen (verbindlich ab jetzt, dokumentiert in der Vault-Notiz)

- **Namensschema:** Alle Cockpit-Tabellen heißen `cockpit_<name>` im public-Schema — die Website-Tabellen (`leads`, `projekte`) sind damit auf einen Blick unterscheidbar und bleiben tabu
- **RLS-Vorlage:** Jede `cockpit_`-Tabelle aktiviert RLS mit der Grundregel „nur authentifizierte Nutzer" — als Beispiel-Policy in der Notiz hinterlegt, PROJ-9/10/11 übernehmen sie
- **Migrations-Disziplin:** Keine Änderung ohne versionierte Migrationsdatei — der gleiche Audit-Gedanke wie beim Vault (Git = Wissensgeschichte, Migrationen = Schemageschichte)

### Auth-Ablauf (technisch, ohne UI — die UI kommt in PROJ-7)

Konto wird im Dashboard angelegt → Signups global deaktiviert → Magic-Link-Anforderung akzeptiert nur existierende Konten → Nachweis: Link für das Cockpit-Konto anfordern (kommt über Strato-SMTP an), Login vollziehen; Gegenprobe mit fremder Adresse schlägt ab. Session-Handling mit HttpOnly-Cookies wird in PROJ-7 mit `@supabase/ssr` verdrahtet — PROJ-1 stellt nur sicher, dass die Auth-Seite dafür bereitsteht.

### Abhängigkeiten (Pakete)
- Jetzt keine neuen (`@supabase/supabase-js` ist im Template). `@supabase/ssr` kommt mit PROJ-7.

## Implementation Notes
_Umgesetzt: 2026-07-19_

- **Verifikationsskript** `scripts/supabase-check.mjs` (Hero-Muster) — fing sofort einen echten Fehler: `.env.local` zeigte aufs inaktive Projekt; nach Korrektur alle Checks grün
- **Auth konfiguriert** (via Management-API, Token aus `.mcp.json`): Selbstregistrierung deaktiviert, Site-URL `http://localhost:3000`, Magic-Link-Gültigkeit 60 Min
- **Konto angelegt:** `info@gruenschnitt-amini.de` (bestätigt, passwortlos); Magic-Link-Anforderung erfolgreich, Gegenprobe fremde Adresse → HTTP 422 abgelehnt
- **Bundle-Nachweis:** Produktions-Build gescannt — Service-Role-Key nicht im Client
- **Bestandsschutz:** `leads` (13) und `projekte` (3) unversehrt, Website-Policies unangetastet
- **Vault-Notiz** `02 Technik/Supabase/Supabase.md` mit Freigabe angelegt (Konventionen: cockpit_-Präfix, RLS-Vorlage, Migrations-Disziplin)
- **Nachweis komplett (19.07.):** Magic-Link-Mail zugestellt, Klick als erfolgreicher Login registriert (last_sign_in_at 18.07. 22:07 UTC)
- **Julians Entscheidung 19.07.:** Standard-Mailer bleibt vorerst; Strato-SMTP wird Vor-Go-Live-Bedingung (/deploy)
- **Noch offen:** HERO_API_KEY-Zeile in `.env.local` wieder ergänzen (für Hero-Arbeiten, nicht PROJ-1-relevant)
- Abweichungen vom Design: Auth-Konfiguration lief per Management-API statt Dashboard (Token war verfügbar — schneller und reproduzierbar)

## QA Test Results

**Tested:** 2026-07-19
**Testart:** Live-Prüfung gegen Supabase (Auth-, REST- und Management-API) + statische Checks; kein UI (Login-Seite = PROJ-7)
**Tester:** QA Engineer (AI)

### Acceptance Criteria Status
- [x] AC-1: Magic Link zugestellt (Standard-Mailer, von Julian bestätigt) und Login serverseitig vollzogen (last_sign_in_at 18.07. 22:07 UTC)
- [x] AC-2: Fremde Adresse abgelehnt (HTTP 422), kein Konto entstanden — Kontenzahl bleibt exakt 1
- [x] AC-3: Bestandsschutz — leads (13) und projekte (3) unverändert; Formular-Pfad end-to-end getestet: Insert mit exakter Feldliste der Website-API-Route erfolgreich, Test-Lead sofort gelöscht, Bestand wieder 13
- [x] AC-4: Produktions-Build gescannt — Service-Role-Key nicht im Client-Bundle
- [x] AC-5: RLS-Grundmuster + cockpit_-Konvention + Migrations-Disziplin verbindlich dokumentiert (Vault-Notiz, per Test abgesichert)
- [x] AC-6: Vault-Notiz [[Supabase]] beschreibt Projekt, Bestand, Auth-Modell, Konventionen (status: verifiziert nach Julians Freigabe)

### Befund mit Aufklärung (kein Bug)
Anonymer Direkt-Insert in `leads` wird von RLS blockiert (HTTP 401). Aufklärung am Website-Code: Das echte Kontaktformular schreibt serverseitig über `api/contact` mit dem Service-Key — die RLS-Sperre für anonyme Schreibzugriffe ist gewollt und ein Sicherheits-Plus. Testdesign entsprechend korrigiert.

### Security Audit Results (Red Team)
- [x] anon-Key hat keinen Admin-Zugriff auf die Nutzerverwaltung (HTTP 403)
- [x] anon-Key kann nicht in Website-Tabellen schreiben (RLS, HTTP 401)
- [x] Selbstregistrierung serverseitig deaktiviert — nicht nur im Client versteckt
- [x] Credential-Dateien (.env.local, .mcp.json) git-ignoriert; keine Secrets im Repo
- [x] Supabase-Rate-Limits auf Auth-Endpunkten aktiv (Plattform-Standard)

### Bugs Found
Keine.

### Automatisierte Tests
- Erweitert: `src/test/tools-governance.test.ts` um den PROJ-1-Block (Skript + Notiz + Konventionen + Ignore-Regeln, statisch, ohne Netzwerk)
- Live-Verifikation wiederholbar über `node scripts/supabase-check.mjs`
- Gesamt: 1.337 Tests grün

### Summary
- **Acceptance Criteria:** 6/6 passed
- **Bugs Found:** 0
- **Security:** Pass
- **Production Ready:** YES — mit dokumentierter Vor-Go-Live-Bedingung: Strato-SMTP vor dem Deploy einrichten (Julians Entscheidung 19.07.: Standard-Mailer bis dahin)
- **Recommendation:** Approve

## Deployment
_To be added by /deploy_
