# PROJ-7: Cockpit-Grundgerüst

## Status: Architected
**Created:** 2026-07-17
**Last Updated:** 2026-07-19

## Dependencies
- Requires: PROJ-1 (Supabase-Infrastruktur) — Auth-Fundament: Magic Link, ein gemeinsames Konto, Selbstregistrierung deaktiviert
- Requires: PROJ-5 (Migration OS-Wissen + Branding) — `docs/design-system.md` als verbindliche Gestaltungsgrundlage

## Ziel

Die erste sichtbare Version des Cockpits: Marvin kann sich am Handy anmelden und findet eine App vor, die sich nach GRÜNSCHNITT anfühlt — Login-Seite, Heute-Startseite und die Navigation zu den Herzstücken der App. Das Cockpit ist **kein Hero-Nachbau zum Angucken**, sondern die **interaktive Bedienoberfläche fürs Betriebssystem**: Es zeigt, was das OS in seinen Loops aktiv aufgedeckt hat, lässt Marvin darüber entscheiden und ausführen. Dieses Feature liefert das Gehäuse (Anmeldung, Rahmen, Navigation, Branding); die eigentlichen Bereiche (Offene Punkte, Chat, Lernen) kommen mit ihren Features und sind hier Platzhalter.

## App-Konzept (Leitbild für Phase 2)

Drei Herzstücke, alle vom selben Gedanken getragen — das OS arbeitet, der Mensch entscheidet (Gate):

1. **Offene Punkte** — was das OS aktiv aufgedeckt hat (erkannte Aufgaben aus Mail/Leads/Prozessstatus, außenwirksame Entwürfe). Jeder Punkt ist **interaktiv**: das OS zeigt eine Empfehlung, Marvin kann annehmen, verfeinern oder dagegenhalten (Eingabe), dann führt das OS aus — immer mit Gate. Ein offener Punkt ist im Grunde ein fokussiertes Chat-Gespräch, vorgeladen mit Kontext und Vorschlag.
2. **Chat** — freies, aktives Bedienen des OS in Alltagssprache (Fragen, Termine anlegen, Zusammenfassungen).
3. **Lernen (Rückschau)** — der sichtbar gemachte Wissenskreislauf: Das OS zeigt, was es aus Marvins Entscheidungen gelernt hat, welche Muster es erkannt hat und welches Wissen künftig einfließen soll, damit es genauer und zuverlässiger wird. Die Beförderung „erfasst → verifiziert" bleibt eine menschliche Entscheidung (Gate).

**Board (Projektübersicht) entfällt bewusst:** Die Projektübersicht bietet Hero bereits; ein Nachbau im Cockpit wäre Doppelung ohne Mehrwert und widerspricht „Hero führt, nicht spiegeln". Projektkontext erscheint dort, wo er gebraucht wird — innerhalb eines offenen Punktes.

## User Stories
- Als Marvin möchte ich mich mit meiner E-Mail-Adresse per Magic Link anmelden, damit ich kein Passwort brauche und trotzdem nur wir beide ins Cockpit kommen
- Als Marvin möchte ich nach dem Login eine Heute-Startseite mit Begrüßung sehen, die mir zeigt, was gerade ansteht (offene Punkte, Lernvorschläge), damit ich sofort weiß, wo ich anpacken soll
- Als Marvin möchte ich unten eine feste Tab-Leiste (Heute · Offene Punkte · Chat) haben, damit ich die Herzstücke mit einem Daumentipp erreiche — wie in den Apps, die ich kenne
- Als Marvin möchte ich das Cockpit als App-Symbol auf meinem Homescreen ablegen können, damit es sich wie eine echte App anfühlt und nicht wie eine Webseite
- Als Marvin möchte ich eingeloggt bleiben, wenn ich die App schließe und später wieder öffne, damit ich nicht ständig auf einen neuen Link warten muss
- Als Julian möchte ich, dass jede Cockpit-Seite ohne gültige Anmeldung auf den Login umleitet, damit keine Betriebsdaten offen im Netz stehen

## Out of Scope
- **Inhalte der Herzstücke:** die interaktive Offene-Punkte-Liste, der Chat und die Lernen-Rückschau kommen mit ihren Features (siehe unten) — hier nur Platzhalter/Vorschau mit „Bald verfügbar"
- **Interaktive Punkt-Logik:** wie ein offener Punkt sich aufklappt, wie Empfehlung + Gegenrede-Eingabe aussehen, wie erkannte Aufgaben nach Hero überführt werden (`aufgabe-*`, Entwurf-first/Gate) — Spec des Offene-Punkte-Features. **Vorgabe:** Aufgaben leben in Hero (führendes System) und werden nie doppelt gepflegt; das Cockpit ist Verifikations-/Gate-Fläche für erkannte Kandidaten, kein zweiter Aufgabenspeicher.
- **Lern-/Wissenskreislauf-Logik** (welche Muster erkannt werden, wie Wissen befördert wird) — PROJ-15; hier nur die Kachel + Platzhalter-Rückschau
- **Tagesdaten auf der Heute-Seite** (echte Termine, echte Punkte-Inhalte) — werden von den jeweiligen Features gefüllt; jetzt: Begrüßung + Kacheln (mit Platzhalter-Zählern)
- **Termine-Bereich** — PROJ-13 (P1), kein eigener Tab; Einstieg später über Heute/Chat
- **Mehrere Konten / Rollen** — bewusst ein gemeinsames Konto (PROJ-1-Entscheidung); Mitarbeiter-Logins siehe PRD-Parkplatz
- **Offline-Modus** — die PWA-Installierbarkeit liefert nur den App-Charakter (Icon, Vollbild), keine Offline-Datenhaltung
- **Strato-SMTP** — Mailer-Umstellung ist Vor-Go-Live-Bedingung bei `/deploy` (PROJ-1-Entscheidung)

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen Marvin ist nicht angemeldet, wenn er eine beliebige Cockpit-Seite aufruft, dann wird er auf die Login-Seite umgeleitet
- [ ] Angenommen Marvin gibt auf der Login-Seite die Cockpit-Adresse ein, wenn er „Link anfordern" tippt, dann bestätigt die Seite den Versand („Schau in dein Postfach") und der Magic Link aus der Mail führt ihn eingeloggt auf die Heute-Seite
- [ ] Angenommen jemand gibt eine fremde E-Mail-Adresse ein, wenn er „Link anfordern" tippt, dann erscheint dieselbe neutrale Versand-Bestätigung, aber es kommt weder Mail noch Konto zustande (keine Auskunft, welche Adresse gültig ist)
- [ ] Angenommen Marvin ist angemeldet, wenn er die Heute-Seite öffnet, dann sieht er das GRÜNSCHNITT-Logo, eine Begrüßung und Kacheln für Offene Punkte und Lernen — solange ohne echte Inhalte als „Bald verfügbar" gekennzeichnet
- [ ] Angenommen Marvin ist angemeldet, wenn er einen Tab in der unteren Leiste (Heute · Offene Punkte · Chat) antippt, dann wechselt die Ansicht sofort, der aktive Tab ist hervorgehoben, und Platzhalterseiten erklären in einem Satz, was dort entstehen wird
- [ ] Angenommen Marvin ist auf der Heute-Seite, wenn er die Lernen-Kachel antippt, dann öffnet sich die (vorerst leere) Rückschau-Ansicht mit einem Satz, der ihren Zweck erklärt
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
- **Sprache:** komplette UI auf Deutsch, neutrale und kurze Beschriftungen
- **Performance:** Erste Seite < 2 s auf mittlerem Mobilfunknetz; keine schweren Abhängigkeiten fürs Grundgerüst

## Open Questions
- [ ] Genauer Begrüßungstext der Heute-Seite (Tageszeit-abhängig? „Moin Marvin"?) — bei `/frontend` mit Julian festlegen
- [ ] iOS zeigt (anders als Android) keinen automatischen Installations-Hinweis — dezenten einmaligen In-App-Hinweis „Zum Home-Bildschirm hinzufügen" (Teilen → Hinzufügen) bei `/frontend` einbauen
- [ ] Beschriftung der Lernen-Rückschau final festlegen („Lernen", „Rückschau", „Wissen"?) — bei `/frontend`

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| App ist interaktive OS-Bedienoberfläche, kein Hero-Nachbau | Der Wert liegt im aktiven Bedienen des OS + Bestätigen der Loops, nicht im Anschauen gespiegelter Hero-Daten (Korrektur Julian) | 2026-07-19 |
| Board (Projektübersicht) entfällt | Hero liefert die Projektübersicht bereits; Nachbau = Doppelung ohne Mehrwert, widerspricht „Hero führt, nicht spiegeln" | 2026-07-19 |
| Herzstücke: Offene Punkte · Chat · Lernen (Rückschau) | Julians Bild: einzelne vom OS aufgedeckte Punkte interaktiv abarbeiten, frei chatten, und eine Rückschau auf das, was das System lernt | 2026-07-19 |
| Offene Punkte bündeln erkannte Aufgaben **und** außenwirksame Entwürfe | Beide sind dasselbe Muster (Punkt → Empfehlung → Gegenrede → Gate-Ausführung); weniger Tabs, konsequenter | 2026-07-19 |
| Offene Punkte sind interaktiv (annehmen/verfeinern/dagegenhalten), nicht nur annehmen/ablehnen | Marvin soll Vorschläge im Dialog schärfen können — technisch ein fokussiertes Chat-Gespräch mit vorgeladenem Kontext | 2026-07-19 |
| Lernen/Rückschau als eigene Kachel auf der Heute-Seite (Aufwertung von PROJ-15) | Wissenskreislauf für Marvin sichtbar machen; Beförderung „erfasst → verifiziert" bleibt menschliche Entscheidung (Gate) | 2026-07-19 |
| Navigation: Heute · Offene Punkte · Chat (3 Tabs) | Radikal einfach, am nächsten an Julians Beschreibung; Lernen erreichbar über Heute-Kachel statt vierten Tab | 2026-07-19 |
| Tab-Leiste unten (nicht Burger-Menü) | Vertrauteste Form für einen Papier-Umsteiger (WhatsApp-Muster); alles einen Daumentipp entfernt | 2026-07-19 |
| PWA-Installierbarkeit ab V1 (nur App-Charakter, kein Offline) | Ein Tipp aufs GRÜNSCHNITT-Icon statt Browser-Lesezeichen — geringer Aufwand, großer Unterschied für Marvin | 2026-07-19 |
| Termine ohne eigenen Tab | P1 (PROJ-13); Einstieg später über Heute/Chat, Erstellung ohnehin per Chat | 2026-07-19 |
| Neutrale Versand-Bestätigung auch bei fremden Adressen | Keine Auskunft, welche Adresse zum Cockpit gehört (Enumeration-Schutz); PROJ-1 blockt fremde Adressen serverseitig | 2026-07-19 |

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
        ├── Handy:   Tab-Leiste unten (Heute · Offene Punkte · Chat)
        └── Desktop: Seitenleiste (gleiche 3 Bereiche, gleiche Reihenfolge)

    Seiten hinter dem Rahmen:
    ├── /heute           Begrüßung + Kacheln:
    │                      • Offene Punkte (Vorschau/Zähler)
    │                      • Lernen/Rückschau (Vorschau) → öffnet /lernen
    ├── /offene-punkte   Platzhalter „Bald verfügbar" (interaktive Liste, eigenes Feature)
    ├── /chat            Platzhalter (PROJ-10)
    └── /lernen          Platzhalter-Rückschau, erreichbar über Heute-Kachel (PROJ-15)
```

### B) „Daten"-Modell
Es wird **nichts Neues in der Datenbank** gespeichert. Die einzige „Information" ist die Anmelde-Sitzung — sie liegt in sicheren, nicht auslesbaren Cookies (HttpOnly), so entschieden in PROJ-1. Die Liste der Bereiche ist eine feste Angabe im Code, keine Datenbank-Tabelle. Damit gibt es auch keine RLS-Policies zu schreiben.

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
