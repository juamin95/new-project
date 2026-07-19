# PROJ-7: Cockpit-Grundgerüst

## Status: Planned
**Created:** 2026-07-17
**Last Updated:** 2026-07-19

## Dependencies
- Requires: PROJ-1 (Supabase-Infrastruktur) — Auth-Fundament: Magic Link, ein gemeinsames Konto, Selbstregistrierung deaktiviert
- Requires: PROJ-5 (Migration OS-Wissen + Branding) — `docs/design-system.md` als verbindliche Gestaltungsgrundlage

## Ziel

Die erste sichtbare Version des Cockpits: Marvin kann sich am Handy anmelden und findet eine App vor, die sich nach GRÜNSCHNITT anfühlt — Login-Seite, Heute-Startseite und die Tab-Navigation zu allen künftigen Bereichen. Die Bereiche selbst (Board, Freigaben, Chat, Aufgaben) kommen mit PROJ-8 bis PROJ-11; dieses Feature liefert das Gehäuse, in das sie einziehen.

## User Stories
- Als Marvin möchte ich mich mit meiner E-Mail-Adresse per Magic Link anmelden, damit ich kein Passwort brauche und trotzdem nur wir beide ins Cockpit kommen
- Als Marvin möchte ich nach dem Login eine Heute-Startseite mit Begrüßung und den Bereichen der App sehen, damit ich von Anfang an verstehe, wie das Cockpit aufgebaut ist
- Als Marvin möchte ich unten eine feste Tab-Leiste (Heute · Aufgaben · Board · Chat · Freigaben) haben, damit ich jeden Bereich mit einem Daumentipp erreiche — wie in den Apps, die ich kenne
- Als Marvin möchte ich das Cockpit als App-Symbol auf meinem Homescreen ablegen können, damit es sich wie eine echte App anfühlt und nicht wie eine Webseite
- Als Marvin möchte ich eingeloggt bleiben, wenn ich die App schließe und später wieder öffne, damit ich nicht ständig auf einen neuen Link warten muss
- Als Julian möchte ich, dass jede Cockpit-Seite ohne gültige Anmeldung auf den Login umleitet, damit keine Betriebsdaten offen im Netz stehen

## Out of Scope
- **Inhalte der Bereiche:** Prozess-Board (PROJ-8), Freigaben-Liste (PROJ-9), Chat (PROJ-10) — hier nur Platzhalterseiten mit „Bald verfügbar"
- **Aufgaben-Logik (PROJ-11):** nur Platzhalter. Vorgabe fürs spätere Bauen: Der Aufgaben-Bereich ist **kein zweiter Aufgabenspeicher neben Hero**, sondern eine Verifikations-/Gate-Fläche. Das System erkennt Aufgaben-Kandidaten aus den unterliegenden Systemen (E-Mail-Anfragen, Website-Leads, Prozessstatus), schlägt eine Projekt-/Kundenzuordnung vor, Marvin verifiziert, und erst nach Freigabe wird die Aufgabe **in Hero** angelegt (`aufgabe-*`, Entwurf-first/Gate). Aufgaben leben in Hero und werden nie doppelt gepflegt.
- **Tagesdaten auf der Heute-Seite** (Termine, offene Aufgaben, Zusammenfassung) — die Heute-Seite wird von PROJ-11/PROJ-13 mit echten Daten gefüllt; jetzt: Begrüßung + Bereichskacheln
- **Lernvorschläge-Kachel** auf der Heute-Seite — kommt mit PROJ-15 (Vorgabe: Kachel auf Heute, Freigabe über den Freigaben-Bereich)
- **Termine-Bereich** — PROJ-13 (P1), bekommt keinen eigenen Tab; Einstieg später über die Heute-Seite/Board
- **Mehrere Konten / Rollen** — bewusst ein gemeinsames Konto (PROJ-1-Entscheidung); Mitarbeiter-Logins siehe PRD-Parkplatz
- **Offline-Modus** — die PWA-Installierbarkeit liefert nur den App-Charakter (Icon, Vollbild), keine Offline-Datenhaltung
- **Strato-SMTP** — Mailer-Umstellung ist Vor-Go-Live-Bedingung bei `/deploy` (PROJ-1-Entscheidung)

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen Marvin ist nicht angemeldet, wenn er eine beliebige Cockpit-Seite aufruft, dann wird er auf die Login-Seite umgeleitet
- [ ] Angenommen Marvin gibt auf der Login-Seite die Cockpit-Adresse ein, wenn er „Link anfordern" tippt, dann bestätigt die Seite den Versand („Schau in dein Postfach") und der Magic Link aus der Mail führt ihn eingeloggt auf die Heute-Seite
- [ ] Angenommen jemand gibt eine fremde E-Mail-Adresse ein, wenn er „Link anfordern" tippt, dann erscheint dieselbe neutrale Versand-Bestätigung, aber es kommt weder Mail noch Konto zustande (keine Auskunft, welche Adresse gültig ist)
- [ ] Angenommen Marvin ist angemeldet, wenn er die Heute-Seite öffnet, dann sieht er das GRÜNSCHNITT-Logo, eine Begrüßung und Kacheln für Aufgaben, Board, Chat und Freigaben — noch nicht gebaute Bereiche sind als „Bald verfügbar" gekennzeichnet
- [ ] Angenommen Marvin ist angemeldet, wenn er einen Tab in der unteren Leiste antippt, dann wechselt die Ansicht sofort, der aktive Tab ist hervorgehoben, und Platzhalterseiten erklären in einem Satz, was dort entstehen wird
- [ ] Angenommen Marvin schließt die App oder das Handy geht aus, wenn er das Cockpit später wieder öffnet, dann ist er weiterhin angemeldet und landet direkt auf der Heute-Seite
- [ ] Angenommen Marvin tippt im Kopfbereich auf das Konto-Symbol und wählt „Abmelden", dann ist die Sitzung beendet und jede Cockpit-Seite verlangt wieder einen Login
- [ ] Angenommen Marvin nutzt „Zum Homescreen hinzufügen", wenn er das Cockpit vom Homescreen startet, dann öffnet es sich mit GRÜNSCHNITT-Icon und -Name im Vollbild ohne Browser-Adressleiste
- [ ] Angenommen ein abgelaufener oder bereits benutzter Magic Link wird geöffnet, dann erklärt die Seite das verständlich („Der Link ist abgelaufen") und bietet direkt an, einen neuen anzufordern
- [ ] Angenommen das Cockpit wird am Desktop geöffnet, dann erscheint statt der Tab-Leiste eine Seitenleiste mit denselben Bereichen — Inhalte und Reihenfolge identisch

## Edge Cases
- **Abgelaufener/benutzter Magic Link** (60 Minuten, einmalig): klare Meldung + „Neuen Link anfordern" — kein technischer Fehlertext
- **Tippfehler in der E-Mail-Adresse:** neutrale Bestätigung wie bei fremden Adressen; die Login-Seite nennt die Cockpit-Adresse nicht (kein Hinweis für Fremde), Marvin kennt seine Adresse
- **Mehrfaches Antippen von „Link anfordern":** Button sperrt kurz und zählt sichtbar herunter (Supabase-Rate-Limit auf Auth-Endpunkten) — keine Doppelversände, keine kryptische Fehlermeldung
- **Kein Netz beim Öffnen:** verständliche Meldung („Keine Verbindung — bitte später erneut versuchen"), kein weißer Bildschirm
- **Session läuft ab, während die App offen ist:** nächste Interaktion leitet sauber auf den Login um, ohne Absturz
- **Gleichzeitige Nutzung durch Marvin und Julian** (ein Konto, zwei Geräte): beide Sitzungen laufen unabhängig; Abmelden auf einem Gerät wirft das andere nicht raus
- **Sehr kleines Display / große Schrift (Systemeinstellung):** Tab-Beschriftungen bleiben lesbar und die Leiste bleibt bedienbar (Mindesthöhe der Tippflächen)

## Technical Requirements
- **Mobile-first:** Auslegung primär für 375–430 px Breite; Desktop bekommt die Seitenleisten-Variante
- **Security:** Jede Route außer Login serverseitig geschützt (Session-Prüfung, nicht nur clientseitig); Sicherheits-Header gemäß `.claude/rules/security.md`
- **Branding:** ausschließlich Tokens/Fonts aus `docs/design-system.md` (Spectral/Inter, Brand-Grün-Palette, Logo aus `vault/05 Anhänge/`)
- **Sprache:** komplette UI auf Deutsch, Ansprache gemäß Schreibstil-Regeln (Marvin wird gesiezt? Nein — App-UI duzt nicht/siezt nicht förmlich; neutrale, kurze Beschriftungen)
- **Performance:** Erste Seite < 2 s auf mittlerem Mobilfunknetz; keine schweren Abhängigkeiten fürs Grundgerüst

## Open Questions
- [ ] Genauer Begrüßungstext der Heute-Seite (Tageszeit-abhängig? „Moin Marvin"?) — bei `/frontend` mit Julian festlegen
- [ ] iOS zeigt (anders als Android) keinen automatischen Installations-Hinweis — dezenten einmaligen In-App-Hinweis „Zum Home-Bildschirm hinzufügen" (Teilen → Hinzufügen) bei `/frontend` einbauen

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Heute-Startseite mit Bereichskacheln statt leerer Platzhalter | Marvin lernt die App-Struktur von Anfang an; Seite wächst später zur Tagesübersicht | 2026-07-19 |
| Tab-Leiste unten (nicht Burger-Menü) | Vertrauteste Form für einen Papier-Umsteiger (WhatsApp-Muster); alles einen Daumentipp entfernt | 2026-07-19 |
| Tab-Belegung: Heute · Aufgaben · Board · Chat · Freigaben | Julians Gewichtung: Aufgaben (vom System aktiv erkannt) und Chat sind Marvins Kernwerkzeuge; alle P0-Bereiche direkt erreichbar | 2026-07-19 |
| Lernvorschläge (PROJ-15) als Kachel auf der Heute-Seite, Freigabe über den Freigaben-Bereich | Julians Wunsch nach sichtbarem Lernkreislauf, ohne einen sechsten Tab zu belegen; alles Prüfpflichtige an einem Ort | 2026-07-19 |
| PWA-Installierbarkeit ab V1 (nur App-Charakter, kein Offline) | Ein Tipp aufs GRÜNSCHNITT-Icon statt Browser-Lesezeichen — geringer Aufwand, großer Unterschied für Marvin | 2026-07-19 |
| Termine ohne eigenen Tab | P1 (PROJ-13); Einstieg später über Heute-Seite/Board, Erstellung ohnehin per Chat | 2026-07-19 |
| Neutrale Versand-Bestätigung auch bei fremden Adressen | Keine Auskunft, welche Adresse zum Cockpit gehört (Enumeration-Schutz); PROJ-1 blockt fremde Adressen serverseitig | 2026-07-19 |
| Aufgaben-Bereich ist Verifikations-/Gate-Fläche, kein zweiter Aufgabenspeicher | Aufgaben leben in Hero (führendes System). Die App erkennt Kandidaten aus unterliegenden Systemen, schlägt Projekt-/Kundenzuordnung vor, Marvin verifiziert → Anlage in Hero. Keine Doppelpflege (Korrektur Julian) | 2026-07-19 |

### Technical Decisions
<!-- Added by /architecture -->
| Decision | Rationale | Date |
|----------|-----------|------|
| `@supabase/ssr` statt nur `@supabase/supabase-js` | Spec verlangt serverseitigen Schutz jeder Seite; SSR-Paket hält die Sitzung in HttpOnly-Cookies und erlaubt Prüfung vor dem Ausliefern | 2026-07-19 |
| Zentraler Türsteher (Middleware) statt Guard je Seite | Ein Kontrollpunkt für alle Routen; frischt nebenbei die Sitzung auf (persistentes Login) | 2026-07-19 |
| Serverseitige Auth-Rückkehr-Seite (`/auth/callback`) | Sicheres Standardmuster: Magic Link wird über eine Zwischenstation in eine Sitzung getauscht, statt clientseitig aus der URL | 2026-07-19 |
| Kein neues DB-Schema, kein `/backend`-Lauf | Feature nutzt PROJ-1-Auth; keine Tabellen/RLS nötig — komplett über `/frontend` baubar | 2026-07-19 |
| Branding-Verkabelung ist Teil von PROJ-7 | design-system.md (PROJ-5) ist dokumentiert, aber nie in globals.css/Tailwind/Fonts angewandt; erste UI ist der natürliche Ort dafür | 2026-07-19 |
| PWA über natives Next.js-Manifest, keine PWA-Bibliothek | Nur App-Charakter (Icon, Vollbild) gewünscht, kein Offline/Service-Worker → kein schweres Paket nötig | 2026-07-19 |
| Navigation als eine Komponente mit zwei Darstellungen | Handy = untere Tab-Leiste, Desktop = Seitenleiste; beide shadcn-Bausteine (Sidebar/Sheet) bereits installiert | 2026-07-19 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Überblick
PROJ-7 ist überwiegend eine **Frontend- + Auth-Verkabelungs-Aufgabe**. Es entsteht **kein neues Datenbank-Schema** — das Cockpit nutzt die Anmeldung aus PROJ-1. Der einzige serverseitige Anteil ist die Anmelde-Mechanik (Türsteher + Rückkehr-Seite); es braucht keinen eigenen `/backend`-Lauf mit Tabellen oder RLS. Das gesamte Feature wird über `/frontend` gebaut.

### A) Seiten- und Bausteinstruktur

```
Cockpit (App)
│
├── Login-Seite  /login  — öffentlich, ohne Anmeldung erreichbar
│   ├── GRÜNSCHNITT-Logo
│   ├── E-Mail-Feld + Button „Link anfordern"
│   ├── Bestätigungszustand („Schau in dein Postfach")
│   └── Fehler-/Wartezustand (Rate-Limit-Countdown, abgelaufener Link)
│
├── Anmelde-Rückkehr  /auth/callback  — unsichtbare Zwischenstation
│   └── wandelt den Magic-Link sicher in eine Sitzung um → /heute
│       └── bei abgelaufenem/benutztem Link → /login mit erklärendem Hinweis
│
├── Türsteher (Middleware)  — prüft bei jedem Aufruf: angemeldet?
│   └── wenn nein → /login ; hält nebenbei die Sitzung frisch
│
└── Geschützter App-Rahmen  (nur angemeldet)
    ├── Kopfbereich: kleines Logo + Konto-Menü (》 „Abmelden")
    ├── Seiteninhalt (die jeweilige Seite)
    └── Navigation — eine Bereichsliste, zwei Darstellungen:
        ├── Handy:   Tab-Leiste unten (Heute · Aufgaben · Board · Chat · Freigaben)
        └── Desktop: Seitenleiste (gleiche 5 Bereiche, gleiche Reihenfolge)

    Seiten hinter dem Rahmen:
    ├── /heute      Begrüßung + Bereichskacheln (Aufgaben/Board/Chat/Freigaben,
    │               nicht-gebaute als „Bald verfügbar")
    ├── /aufgaben   Platzhalter „Bald verfügbar" (Verifikations-/Gate-Fläche, PROJ-11)
    ├── /board      Platzhalter (PROJ-8)
    ├── /chat       Platzhalter (PROJ-10)
    └── /freigaben  Platzhalter (PROJ-9)
```

### B) „Daten"-Modell
Es wird **nichts Neues in der Datenbank** gespeichert. Die einzige „Information" ist die Anmelde-Sitzung — sie liegt in sicheren, nicht auslesbaren Cookies (HttpOnly), so entschieden in PROJ-1. Die Liste der fünf Bereiche ist eine feste Angabe im Code, keine Datenbank-Tabelle. Damit gibt es auch keine RLS-Policies zu schreiben.

### C) Tech-Entscheidungen (für alle verständlich)
1. **`@supabase/ssr` als Anmelde-Brücke.** Die Spec verlangt, dass *jede* Seite serverseitig geschützt ist — nicht nur im Browser „versteckt". Dieses Paket hält die Sitzung in sicheren Cookies, sodass der Server schon *vor* dem Ausliefern einer Seite weiß, ob jemand angemeldet ist. Es ergänzt das bereits installierte `@supabase/supabase-js`.
2. **Ein zentraler Türsteher (Middleware)** statt Prüfung auf jeder einzelnen Seite: ein Kontrollpunkt fängt jeden Aufruf ab, schickt Nicht-Angemeldete zum Login und frischt nebenbei die Sitzung auf, damit Marvin nicht unerwartet herausfliegt.
3. **Unsichtbare Rückkehr-Seite für den Magic Link.** Der Link aus der Mail führt nicht direkt in die App, sondern über eine kurze Zwischenstation, die ihn sicher in eine Sitzung umwandelt — das Standard-Sicherheitsmuster. Ein abgelaufener oder schon benutzter Link landet mit klarer Erklärung wieder auf dem Login.
4. **Branding wird jetzt echt.** Das in `docs/design-system.md` dokumentierte Design-System ist bisher nur Papier — globals.css trägt noch graue Standardfarben. Mit PROJ-7 ziehen die GRÜNSCHNITT-Farben in die zentrale Stildatei und die Schriften **Spectral/Inter** über Next.js-Fonts (lokal gebündelt, kein CDN). Ab hier sieht jede Cockpit-Seite nach GRÜNSCHNITT aus.
5. **Installierbar ohne schwere Zusatz-Bibliothek.** Für „App aufs Handy" reichen eine kleine Manifest-Datei plus Icons, die Next.js von sich aus ausliefert. Kein PWA-/Offline-Paket, weil wir bewusst keinen Offline-Modus wollen (nur den App-Charakter).
6. **Navigation: eine Liste, zwei Ansichten.** Dieselbe Bereichsliste erscheint am Handy als untere Tab-Leiste, am Desktop als Seitenleiste. Beide Bausteine (`Sidebar`, `Sheet`/Tab-Leiste) sind über shadcn schon da.
7. **shadcn-First, nichts neu erfinden.** Alle nötigen Bausteine sind bereits installiert: Button, Input, Card, Avatar, Dropdown-Menu, Sidebar, Separator, Sonner (Hinweis-Toasts), lucide-react (Icons).
8. **Sicherheits-Header** (X-Frame-Options, nosniff, Referrer-Policy, HSTS) werden zentral gesetzt — gemäß `.claude/rules/security.md`.

### D) Abhängigkeiten (zu installierende Pakete)
- **`@supabase/ssr`** — NEU: serverseitige Sitzungsverwaltung für Next.js (Cookies + Türsteher). Einziges neues Paket.
- Bereits vorhanden und genutzt: `@supabase/supabase-js`, sämtliche shadcn/ui-Komponenten, `lucide-react`, `sonner`, `react-hook-form` + `zod` (E-Mail-Feld-Validierung).
- **Keine** PWA-Bibliothek — natives Next.js-Manifest.
- Zusätzlich zu erzeugen (kein Paket): App-Icons aus dem GRÜNSCHNITT-Logo (Homescreen-Symbol, maskierbar).

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
