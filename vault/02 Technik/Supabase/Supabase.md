---
tags: [technik, supabase, cockpit]
status: verifiziert
date: 2026-07-19
quelle: neu erstellt bei der Infrastruktur-Einrichtung (PROJ-1); Fakten live verifiziert 2026-07-19, Review Julian 2026-07-19
---

# Supabase — Cockpit-Datenbank & Website-Backend

Supabase-Projekt **„juamin95's Project"** (`bnzpdujupmmrwcbunbql`, Region eu-west-1) — ein Projekt, zwei Aufgaben: Es trägt die **GRÜNSCHNITT-Website** (produktiv!) und wird schrittweise zum **Cockpit-Backend** ausgebaut.

## Bestand (Stand 19.07.2026)

| Bereich | Inhalt | Regel |
|---------|--------|-------|
| Website | `leads` (Kontaktformular), `projekte` (CMS/Referenzen) — beide mit RLS | **Tabu.** Tabellen und Policies werden vom Cockpit-Ausbau nie angefasst |
| Auth | Ein gemeinsames Cockpit-Konto (`info@gruenschnitt-amini.de`), bestätigt | Login nur per Magic Link |
| Cockpit-Tabellen | Noch keine — entstehen mit ihren Features (PROJ-9/10/11) | Konventionen unten |

## Auth-Modell (PROJ-1, Entscheidungen von Julian)

- **Magic Link, passwortlos:** Login-Link per E-Mail, Gültigkeit 60 Minuten, einmalig
- **Ein gemeinsames Konto** für Marvin + Julian — keine Rollen, keine Rechteunterschiede
- **Selbstregistrierung deaktiviert** (`disable_signup`): fremde Adressen erhalten weder Link noch Konto (verifiziert: HTTP 422)
- **Sicherheitsanker ist das Postfach** — operative Auflage: Postfach mit 2FA absichern
- Site-URL: `http://localhost:3000` (Vercel-Domain kommt mit dem Deploy dazu)
- Parallele Sessions auf mehreren Geräten sind erlaubt und gewollt

## Verbindliche Konventionen für alle Cockpit-Tabellen

1. **Namensschema:** `cockpit_<name>` im public-Schema — klare Trennung von den Website-Tabellen
2. **RLS ist Pflicht.** Grundmuster (Beispiel-Policy, von PROJ-9/10/11 zu übernehmen):

   ```sql
   alter table cockpit_beispiel enable row level security;
   create policy "Cockpit-Nutzer" on cockpit_beispiel
     for all to authenticated using (true) with check (true);
   ```

   (Ein Konto, keine Rollen → `authenticated` genügt; bei späteren Rollen wird die Policy je Tabelle verfeinert.)
3. **Migrations-Disziplin:** Jede Schemaänderung ist eine versionierte SQL-Datei in `supabase/migrations/` — angewendet über den Supabase-MCP (`apply_migration`), Fallback SQL-Editor. Nie am Repo vorbei.

## Zugriffswege

| Zweck | Weg | Credential |
|-------|-----|-----------|
| App zur Laufzeit (Client) | supabase-js | `NEXT_PUBLIC_SUPABASE_ANON_KEY` (RLS schützt) |
| App zur Laufzeit (Server) | supabase-js | `SUPABASE_SERVICE_ROLE_KEY` — **nie im Client-Bundle** (per Build-Scan geprüft) |
| Migrationen / Verwaltung | Supabase-MCP bzw. Management-API | Access Token in `.mcp.json` (git-ignoriert) |
| Verifikation | `scripts/supabase-check.mjs` | liest `.env.local` selbst; prüft Projekt-Identität, Bestandsschutz, Auth-Konfiguration |

Alle Credentials folgen dem `.env`-Pattern des Repos: Skripte lesen selbst, der Agent sieht Keys nie.

## Offene Punkte

- **Strato-SMTP**: bewusst noch Standard-Mailer (Entscheidung Julian 19.07.; Zustellung nachgewiesen). Umstellung ist Vor-Go-Live-Bedingung — Dashboard: Project Settings → Authentication → SMTP Settings (Host smtp.strato.de, Port 465)
- **Vercel-Domain** in die Redirect-URLs aufnehmen — kommt mit `/deploy` (PROJ-7)
