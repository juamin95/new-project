# PROJ-10: Chat mit dem OS

## Status: Architected
**Created:** 2026-07-19
**Last Updated:** 2026-07-20

## Dependencies
- Requires: PROJ-7 (Cockpit-Grundgerüst) — Chat-Tab, Anmeldung, Rahmen/Navigation
- Requires: PROJ-6 (Migration Prozess-Skills) — der Agent nutzt die Skills (bauprojekt, projekt-ohne-angebot, abo, hero-stammdaten)
- Requires: PROJ-1 (Supabase-Infrastruktur) — Gesprächsverläufe in `cockpit_`-Tabellen
- Requires: PROJ-16 / PROJ-4 (Hero-Tools + GraphQL-Wissen) — Hero lesen + Termin anlegen
- Nutzt: PROJ-2 / PROJ-5 (Vault-Wissen als Antwortgrundlage)
- **Braucht Infrastruktur:** Claude-Agent auf dem VPS (`ANTHROPIC_API_KEY`) — Details klärt `/architecture`

## Ziel

Marvin bedient das Betriebssystem in Alltagssprache: Fragen stellen, Zusammenfassungen holen und Termine anlegen — per Text, Bild oder Sprachmemo. Der Chat ist zugleich die **Interaktions-Engine**, auf der später die offenen Punkte (PROJ-9/11) aufsetzen. Antworten kommen in Echtzeit; wo möglich zeigt der Chat das Zwischendenken des OS (welche Schritte es gerade macht). Der Verlauf bleibt erhalten und ist auf beiden Geräten synchron.

## Zielnutzer
- **Marvin (primär):** stellt Alltagsfragen („Was habe ich morgen an?", „Wie ist der Stand bei Familie Weber?"), lässt sich Dinge zusammenfassen und legt Termine an — mobil, oft von der Baustelle (daher Sprache/Foto).
- **Julian:** nutzt denselben Chat (ein gemeinsames Konto), z. B. zum Prüfen und für Systemfragen.

## MVP-Funktionsumfang (bewusst geschnitten)
Der Chat kann im MVP:
1. **Fragen beantworten & zusammenfassen** — gegründet auf dem Vault (validiertes Wissen) und Hero-**Lese**-Zugriffen (Kunden, Projekte, Termine, Historie).
2. **Termine anlegen** — als einzige schreibende Aktion, immer über **Vorschau → Bestätigen** (Gate).

Nicht im MVP (siehe Out of Scope): Angebote, Rechnungen, Mail-Entwürfe.

## User Stories
- Als Marvin möchte ich dem OS in Alltagssprache eine Frage stellen und in Sekunden eine Antwort bekommen, damit ich schnell weiß, was Sache ist
- Als Marvin möchte ich fragen „Was habe ich morgen an?" und eine klare Zusammenfassung meiner Termine/Aufgaben bekommen, damit ich meinen Tag planen kann
- Als Marvin möchte ich per Sprachmemo diktieren statt tippen, damit ich das Cockpit auch mit dreckigen Händen auf der Baustelle bedienen kann
- Als Marvin möchte ich ein Baustellenfoto anhängen und dazu etwas fragen, damit ich Kontext geben kann, ohne alles zu beschreiben
- Als Marvin möchte ich sagen „Leg mir Dienstag 8 Uhr einen Termin bei Familie Weber an", eine Vorschau prüfen und bestätigen, damit der Termin korrekt in Hero landet und kein Fehleintrag entsteht
- Als Marvin möchte ich mehrere Gespräche parallel führen (je Kunde oder Projekt eins), damit ich nicht ständig den Kontext wechseln muss
- Als Marvin möchte ich, dass ein Gespräch später genau da weitergeht, wo ich aufgehört habe — auch auf dem anderen Gerät —, damit nichts verloren geht
- Als Julian möchte ich sehen können, welche Schritte das OS für eine Antwort gemacht hat, damit ich dem System vertraue und Fehler nachvollziehen kann

## Out of Scope
- **Außenwirksame Aktionen:** Angebote, Rechnungen und Mail-Entwürfe erstellt der Chat im MVP nicht — das sind die Offene-Punkte-Features (PROJ-9 Freigaben, PROJ-11 erkannte Aufgaben)
- **Die Offene-Punkte-Liste selbst** (PROJ-11) und der Einstieg „Im Chat öffnen" aus einem offenen Punkt (Auslöser lebt in PROJ-9/11) — PROJ-10 liefert nur die Fähigkeit, ein projektbezogenes Gespräch zu öffnen/anzulegen
- **Kundenzugang** — Kunden nutzen den Chat nie (PRD-Non-Goal)
- **Buchhaltung / DATEV** — außerhalb des Scopes
- **VPS-Agent-Infrastruktur im Detail** (wie der Agent läuft, getriggert wird, streamt) — Sache von `/architecture`
- **Echtes Schreiben auf Echtdaten vor den E2E-Akzeptanztests** — bis dahin Schreibaktionen nur gegen den Testkunden (5711737)
- **Proaktive/aufgedeckte Meldungen** (das System spricht Marvin von sich aus an) — das ist der Loop-/Offene-Punkte-Teil, nicht der Chat

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen Marvin ist im Chat, wenn er eine Textfrage schickt, dann erscheint sofort ein Tipp-/Denk-Indikator und in Sekunden eine Antwort, gegründet auf Vault- und Hero-Wissen
- [ ] Angenommen Marvin fragt „Was habe ich morgen an?", wenn das OS antwortet, dann bekommt er eine klare Zusammenfassung seiner morgigen Termine (aus Hero gelesen)
- [ ] Angenommen Marvin stellt eine Fachfrage zu GRÜNSCHNITT, wenn das OS keine belastbare Grundlage im Vault findet, dann sagt es das transparent statt zu raten
- [ ] Angenommen Marvin nimmt eine Sprachmemo auf, wenn die Aufnahme endet, dann erscheint der erkannte Text bearbeitbar im Eingabefeld, bevor er ihn abschickt
- [ ] Angenommen Marvin hängt ein Bild an und stellt dazu eine Frage, wenn er abschickt, dann bezieht die Antwort des OS das Bild mit ein
- [ ] Angenommen Marvin bittet um einen Termin, wenn Angaben fehlen (z. B. Uhrzeit oder Kunde), dann fragt das OS gezielt nach, statt zu raten
- [ ] Angenommen alle Termin-Angaben liegen vor, wenn das OS den Termin vorschlägt, dann zeigt es eine Vorschau-Karte (Datum, Uhrzeit, Kunde/Projekt, Notiz) mit „Bestätigen" und „Anpassen" — und schreibt erst nach Bestätigung in Hero
- [ ] Angenommen eine Termin-Vorschau ist offen, wenn Marvin abbricht oder etwas anpasst, dann wird nichts (bzw. nur das Korrigierte) in Hero geschrieben
- [ ] Angenommen Marvin tippt „Neuer Chat", wenn er das Gespräch einem Kunden oder Projekt zuordnet (oder „Allgemein" lässt), dann bekommt der Agent den passenden Hero-Kontext für dieses Gespräch
- [ ] Angenommen Marvin hat mehrere Gespräche, wenn er den Verlauf öffnet, dann sieht er sie als Liste (mit Titel und letzter Nachricht) und kann zwischen ihnen wechseln, ohne Kontext zu verlieren
- [ ] Angenommen Marvin schließt die App oder wechselt das Gerät, wenn er ein Gespräch wieder öffnet, dann ist der komplette Verlauf noch da (in Supabase gespeichert)
- [ ] Angenommen das OS ist gerade nicht erreichbar oder braucht zu lange, wenn Marvin eine Nachricht schickt, dann erscheint eine verständliche Meldung und seine Eingabe bleibt erhalten
- [ ] Angenommen die Terminanlage schlägt in Hero fehl, wenn Marvin bestätigt hat, dann meldet der Chat den Fehler klar und es entsteht kein halb angelegter Termin

## Edge Cases
- **OS nicht erreichbar / Timeout:** verständliche Meldung („Das OS ist gerade nicht erreichbar — gleich nochmal versuchen"), Eingabe/Verlauf bleiben erhalten, erneutes Senden möglich
- **Unklare Anfrage** (fehlendes Datum, mehrere Kunden „Weber"): das OS stellt eine Rückfrage, statt zu raten (deckt sich mit der Vault-Regel „bei Unklarheit erst klären")
- **Hero-Schreibfehler nach Bestätigung:** klare Fehlermeldung, kein halber Zustand, Wiederholung möglich
- **Zwei Geräte im selben Gespräch gleichzeitig** (Marvin + Julian, ein Konto): Nachrichten synchronisieren sich, kein Verlust
- **Schlechte Spracherkennung:** Marvin sieht den Text vor dem Senden und kann ihn korrigieren
- **Bild ohne klare Anweisung:** das OS fragt nach, was damit geschehen soll
- **Kein Netz:** verständliche Offline-Meldung, kein weißer Bildschirm
- **Sehr langer Agent-Lauf:** Denk-Indikator bleibt sichtbar; kann das Zwischendenken nicht gestreamt werden, fällt der Chat auf einen einfachen Tipp-Indikator zurück
- **Langer Verlauf:** ältere Nachrichten bleiben abrufbar; die Antwortqualität leidet nicht (Kontext wird sinnvoll zusammengefasst — Detail in `/architecture`)

## Technical Requirements
- **Echtzeit:** Antwort mit Tipp-/Denk-Indikator; Zielrichtung Sekunden, bei Aktionen bis ~30 s vertretbar
- **Zwischendenken anzeigen — wenn machbar:** die Schritte des OS („schaue in Hero", „lege Termin an") sichtbar machen; sonst einfacher Indikator
- **Gegründet auf GRÜNSCHNITT-Wissen:** Vault zuerst; nur verifizierte Notizen als Faktenbasis; nicht aus Allgemeinwissen raten
- **Gate:** Termin nur nach Bestätigung; keine außenwirksamen Schreibzugriffe (Prinzip aus `hero-tools.md`/`vault.md`)
- **Speicherung:** Gesprächsverläufe in Supabase (`cockpit_`-Tabellen, RLS Pflicht), synchron über beide Geräte
- **Datentor:** echtes Lesen+Schreiben erst nach bestandenen E2E-Akzeptanztests mit Testdaten (Testkunde 5711737)
- **Sprache:** deutsch, Marvins Ton — klar und direkt

## Open Questions
- [x] Zwischendenken streambar? → **Ja** (Claude Agent SDK streamt Schritte; Fallback Tipp-Indikator) — geklärt in `/architecture`
- [x] Spracherkennung On-Device vs. Server? → **Server-Transkription (Whisper)** — geklärt in `/architecture`
- [x] Läuft der Agent auf einem VPS? → **Ja, vorhandener Hostinger-VPS** — geklärt in `/architecture`
- [ ] Genaue Hero-Felder/Objekte für die Termin-Vorschau (Zuordnung Kunde vs. Projekt, Gewerk, Mitarbeiter) — bei `/backend` mit den Hero-Skills abgleichen
- [ ] Transkriptionsdienst: auf dem VPS selbst gehostet vs. externe API — inkl. Datenschutz (Audio verlässt kurz das System?) — bei `/backend`
- [ ] Agent-Dienst dauerhaft laufen lassen, um Kaltstart-Latenz zu vermeiden — Betriebsdetail für `/backend`
- [ ] Ab welcher Verlaufslänge wird der Kontext zusammengefasst (Antwortqualität vs. Kosten) — bei `/backend`
- [ ] Verlaufssuche bei vielen Gesprächen (Suche nötig?) — bei Bedarf in `/refine`

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| MVP: Fragen + Zusammenfassungen + Termine; keine Angebote/Rechnungen/Mails | Fokussierter, testbarer Schnitt; außenwirksame Entwürfe gehören zu PROJ-9/11, keine Überschneidung | 2026-07-19 |
| Echtzeit-Antwort mit Tipp-/Denk-Indikator; Zwischendenken wenn machbar | Es soll sich wie ein echter Chat anfühlen; sichtbare Schritte schaffen Vertrauen (Julians Wunsch) | 2026-07-19 |
| Gespräche an Kunde ODER Projekt gebunden, plus „Allgemein" | Marvins Wunsch; passender Hero-Kontext je Gespräch, ohne ständigen Kontextwechsel | 2026-07-19 |
| Verläufe in Supabase gespeichert, geräteübergreifend synchron | Der VPS-Agent ist stateless → Verlauf muss dauerhaft dort liegen, wo Cockpit und Agent lesen/schreiben; Hero/Vault sind dafür nicht gedacht | 2026-07-19 |
| Drei Eingabearten im MVP: Text, Bild, Sprachmemo | Marvin ist mobil/auf der Baustelle — Foto und Sprache sind schneller als Tippen (bewusst größerer Scope akzeptiert) | 2026-07-19 |
| Termin nur über Vorschau → Bestätigen | Gate-Prinzip; verhindert Fehleinträge, baut Vertrauen; Marvin kann in der Vorschau korrigieren | 2026-07-19 |
| Echtes Schreiben erst nach E2E-Akzeptanztests mit Testdaten | Zusammenspiel zuerst nachweisen, dann echte Terminanlage freischalten (Julians Sicherheitstor) | 2026-07-19 |
| Chat reagiert nur auf Marvin (nicht proaktiv) | Proaktive/aufgedeckte Meldungen sind der Loop-/Offene-Punkte-Teil (PROJ-11), nicht der Chat | 2026-07-19 |
| Standard-Modell des Agenten: Claude Sonnet 5 (statt Opus 4.8) | Marvins Alltag ist überwiegend Q&A/Zusammenfassen/Hero-Lesen; Sonnet 5 reicht dafür bei ~1/3 der Kosten. Starkes Modell später gezielt per Router eskalieren (Julian 20.07.) | 2026-07-20 |
| Chatverhalten des Agenten festgelegt | Duzt Marvin/Julian intern (Kundentexte siezen weiterhin); knapp, kein Jargon, keine Emojis; ehrlich bei Unsicherheit, Rückfrage bei Unklarheit; nur lesen/vorschlagen (Gate, kein Schreiben ohne Freigabe); Antwort + genau EIN nächster Schritt (Julian 20.07.) | 2026-07-20 |

### Technical Decisions
<!-- Added by /architecture -->
| Decision | Rationale | Date |
|----------|-----------|------|
| Cockpit + OS-Agent co-located auf dem Hostinger-VPS; Supabase extern | Julians Entscheidung 20.07.: ganzer OS-Kern an einem Ort, ein Anbieter; Cockpit↔Agent über localhost | 2026-07-20 |
| Cockpit-Betrieb: Next.js als Node-Dienst hinter Reverse-Proxy + TLS + Prozess-Manager | Selbst-Hosting statt Vercel; Details bei `/deploy` | 2026-07-20 |
| OS-Agent auf dem VPS, Claude Agent SDK + ANTHROPIC_API_KEY | Repo/Vault/Skills/hero-tools + HERO_API_KEY liegen dort; API statt Pro-Abo (on-demand aufrufbar) | 2026-07-20 |
| Cockpit ruft den Agenten nur serverseitig über localhost (lokales Token) | Anmeldung erzwingen, Agent-Endpunkt nur lokal, kein Weg übers Internet | 2026-07-20 |
| Echtzeit + Zwischendenken über Streaming (SSE), Fallback Tipp-Indikator | Agent SDK kann Schritte streamen; Cockpit reicht durch — löst die Machbarkeitsfrage | 2026-07-20 |
| Verläufe in Supabase (`cockpit_conversations/messages/actions`) + Realtime; Agent stateless | Dauerhaft + geräteübergreifend; Agent bekommt Verlauf/Kontext je Aufruf mit | 2026-07-20 |
| Agent braucht im Chat KEINEN Supabase-Key; Cockpit-Server schreibt | Minimale Secrets auf dem VPS; direkter Supabase-Zugriff erst für Loops (PROJ-11/15) | 2026-07-20 |
| Termin: Agent schlägt vor → Bestätigung → Ausführung via hero-tools auf dem VPS, Audit in `cockpit_actions` | Gate-Prinzip + nachvollziehbares Protokoll | 2026-07-20 |
| Bilder in Supabase Storage (privat); Sprache per Server-Transkription (Whisper) | Robust auf iPhone/Safari; Bilder brauchen ohnehin einen Speicherort | 2026-07-20 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Überblick — drei Rollen; Cockpit + Agent auf einer Maschine
Der ganze OS-Kern läuft auf dem **Hostinger-VPS** (Julians Entscheidung 20.07.). Drei Rollen mit je einer Aufgabe:

1. **Cockpit** (Next.js) — was Marvin bedient. Läuft als eigener Prozess **auf demselben VPS** wie der Agent. Hält selbst keine Anthropic-/Hero-Schlüssel und spricht Hero nie direkt an.
2. **OS-Agent** (eigener Prozess **auf demselben VPS**) — das „Gehirn": nutzt den Claude-Agent mit `ANTHROPIC_API_KEY`, greift auf Vault, die migrierten Skills und die Hero-Tools zu (`HERO_API_KEY` liegt **nur** hier). Das Cockpit erreicht ihn über **`localhost`** — kein Weg übers Internet.
3. **Supabase** (extern, gemanagt) — speichert Gespräche, Nachrichten und ein Aktions-Protokoll, hält Bilder (Storage) und sorgt über „Realtime" für die Live-Synchronität beider Geräte.

Hero bleibt führendes System für die echten Termine/Kunden/Projekte; das Cockpit spiegelt nichts, es protokolliert nur, was der Chat veranlasst hat.

### A) Bausteine & Abläufe

**Chat-Oberfläche (baut `/frontend`):**
```
Chat (Tab)
├── Verlaufsliste — Gespräche: „Allgemein" · je Kunde · je Projekt
│   └── „Neuer Chat" (+ Zuordnung Kunde / Projekt / Allgemein)
└── Gespräch
    ├── Nachrichtenverlauf (Text, Bild, Antworten)
    ├── Zwischendenken-/Tippanzeige (Schritte des OS)
    ├── Termin-Vorschau-Karte (Bestätigen · Anpassen)
    └── Eingabeleiste: Text · Bild · Sprachmemo
```

**Ablauf „Nachricht senden" (Echtzeit):**
```
Browser → Cockpit-Server (prüft Anmeldung, speichert die Nachricht in Supabase)
        → ruft den OS-Agenten (VPS) mit Verlauf + Kontext (Kunde/Projekt)
             Agent denkt, liest Vault/Hero, nutzt Skills, streamt Schritte + Antwort
        ← reicht den Strom live an den Browser durch
        → speichert die Antwort in Supabase (auch wenn der Browser zwischendurch schließt)
Supabase-Realtime hält das zweite Gerät synchron
```

**Ablauf „Termin" (Gate):**
```
Agent schlägt einen Termin vor (strukturierter Vorschlag — nichts geschrieben)
→ Cockpit zeigt die Vorschau-Karte
→ Marvin bestätigt (oder passt an)
→ Cockpit-Server → OS-Agent (VPS) führt den gated Hero-Schreibzugriff aus (hero-tools)
→ Ergebnis + Protokoll in Supabase; Bestätigung erscheint im Chat
```

**Ablauf „Sprachmemo":** Browser nimmt Audio auf → Cockpit-Server → Transkriptionsdienst → Text zurück → **bearbeitbar** im Eingabefeld (Marvin korrigiert) → senden wie Text.

**Ablauf „Bild":** Browser lädt das Bild in Supabase Storage (privat) → die Nachricht verweist darauf → beim Agent-Aufruf wird das Bild mitgegeben (Claude kann Bilder lesen).

### B) Datenmodell (Klartext)
Neu in Supabase (`cockpit_`-Tabellen, RLS Pflicht; ein gemeinsames Konto → `authenticated`):
- **Gespräch:** Zuordnung (Allgemein / Kunde / Projekt), zugehörige Hero-Kunden- bzw. Projekt-Kennung (optional), automatischer Titel, Zeitstempel, Vorschau der letzten Nachricht.
- **Nachricht:** Gespräch-Bezug, Rolle (Marvin oder OS), Text, optional Bild-Referenz, optional die Zwischendenken-Schritte, Zeitstempel.
- **Aktion (Protokoll):** Typ (Termin), Status (vorgeschlagen / bestätigt / erledigt / fehlgeschlagen), die Termindetails, Bezug zu Gespräch und Nachricht, Zeitstempel — der Audit-Trail für jede gated Schreibaktion.
- **Bilder:** privater Supabase-Storage-Bucket, nur mit angemeldeter Sitzung erreichbar.

Der OS-Agent braucht für den Chat **keinen** eigenen Supabase-Schlüssel — der Cockpit-Server erledigt alle Supabase-Schreibvorgänge. (Direkten Supabase-Zugriff bekommt der Agent erst für die späteren Loops, PROJ-11/15.)

### C) Tech-Entscheidungen (für alle verständlich)
1. **Alles auf dem Hostinger-VPS** (Cockpit + Agent + Hero-Tools + Vault): der ganze OS-Kern an einem Ort, ein Anbieter. Cockpit und Agent sind zwei Prozesse auf einer Maschine.
2. **Agent als privater Dienst.** Dort liegen ohnehin schon Repo (Vault/Skills), die Hero-Tools und `HERO_API_KEY`. Der Agent läuft mit dem `ANTHROPIC_API_KEY` über die API (nicht über ein Pro-Abo).
3. **Cockpit ruft den Agenten nur serverseitig über `localhost`** (nie aus dem Browser): Anmeldung wird erzwungen, der Agent-Endpunkt ist nur lokal erreichbar (kein Weg übers Internet, ein leichtes lokales Token genügt).
4. **Echtzeit + Zwischendenken über Streaming.** Der Claude-Agent kann seine Schritte (Werkzeug-Einsatz/Denken) streamen; der Cockpit-Server reicht den Strom durch. Damit ist die offene Frage geklärt: **machbar** — mit einfachem Tipp-Indikator als Rückfall.
5. **Verläufe in Supabase + Realtime:** dauerhafte Speicherung und Geräte-Sync; der Agent bleibt stateless (bekommt Verlauf + Kontext bei jedem Aufruf mitgegeben).
6. **Termin-Gate:** Der Agent schlägt nur vor; geschrieben wird erst nach Marvins Bestätigung, ausgeführt auf dem VPS über die Hero-Tools, protokolliert in der Aktions-Tabelle.
7. **Bilder in Supabase Storage, Sprache per Server-Transkription** (Whisper-Ansatz) — robust auf dem iPhone/Safari und bei Baustellenlärm.
8. **Testdaten-Tor:** Bis die E2E-Akzeptanztests bestehen, richtet sich der Schreibpfad nur auf den Testkunden; die Umschaltung auf Echtdaten ist eine bewusste Konfigurationsentscheidung.
9. **n8n bleibt außen vor:** Der Chat ist auf Zuruf (on-demand), nicht event-getriggert — n8n kommt erst bei PROJ-12/14.

### D) Abhängigkeiten (Pakete & Dienste)
- **Cockpit (auf dem VPS):** kein schweres neues Paket — Supabase-Client ist da; Streaming über Server-Sent-Events (nativ); Bild-Upload über den vorhandenen Supabase-Storage-Client.
- **VPS (neuer Agent-Dienst):** Claude Agent SDK (`@anthropic-ai/claude-agent-sdk`), ein schlanker, dauerhaft laufender HTTP-Dienst (nur auf `localhost`) mit Zugriff aufs synchronisierte Repo (Vault/Skills/hero-tools); Secrets `ANTHROPIC_API_KEY`, `HERO_API_KEY`, lokales Agent-Token.
- **Transkription:** ein Whisper-basierter Dienst (auf dem VPS gehostet oder als API — genaue Wahl in der Umsetzung).
- **Supabase:** neue `cockpit_`-Tabellen + privater Storage-Bucket (Migrationen über die PROJ-1-Disziplin).
- **Betrieb auf dem VPS:** Next.js als Node-Dienst hinter Reverse-Proxy (Nginx/Caddy) mit HTTPS (Let's Encrypt), gehalten von Prozess-Manager (PM2/systemd) oder Docker — Details bei `/deploy`.
- **Neue Umgebungsvariablen:** Cockpit → lokale Agent-Endpunkt-URL (`localhost`) + Agent-Token; Agent → Anthropic-/Hero-Keys + Agent-Token + Transkriptions-Zugang.

### Backend nötig?
**Ja.** Das Feature braucht Supabase-Schema + Cockpit-Server-Routen **und** den neuen Agent-Dienst auf dem VPS. Reihenfolge: `/frontend` (Chat-UI mit Platzhalter-Anbindung), dann `/backend` (Supabase-Schema, Server-Routen, Agent-Dienst + Verdrahtung), dann `/qa` (E2E-Akzeptanztests mit Testdaten → danach Echtdaten-Freischaltung).

## Implementation Notes (Frontend)
**Umgesetzt am 2026-07-20.** Sichtbare UI-Hülle mit Beispieldaten; die echte Anbindung (Supabase + OS-Agent + Transkription) folgt im `/backend`-Schritt.

- `src/components/chat/mock-data.ts` — Typen (Conversation, ChatMessage, TerminDraft) + Beispielgespräche (Projekt/Kunde/Allgemein)
- `src/components/chat/conversation.tsx` — Gesprächsansicht: Nachrichten-Bubbles, Zwischendenken-Schritte, Tipp-Indikator, **Termin-Vorschau-Karte** (Bestätigen→„in Hero angelegt"), Eingabeleiste mit **Text, Bild (Datei-Auswahl), Sprachmemo** (Mock-Transkription, bearbeitbar)
- `src/components/chat/chat-view.tsx` — Orchestrator: Verlaufsliste + „Neuer Chat"; responsiv über `useIsMobile` — Handy: Liste, Gespräch als Vollbild-Overlay mit Zurück-Pfeil; Desktop: zwei Spalten (Liste links, Gespräch rechts)
- `src/app/(app)/chat/page.tsx` — rendert `ChatView`
- Branding aus PROJ-7 (Grün/Sage, Spectral/Inter); shadcn/Button/Textarea, lucide-Icons

**Bewusst noch Platzhalter/Mock (kommt in `/backend`):** echte Antworten des OS-Agenten (localhost-Aufruf), Persistenz in Supabase + Geräte-Sync, echte Sprach-Transkription (Whisper), Bild-Upload in Supabase Storage, Kunden-/Projekt-Zuordnung per Hero-Suche, tatsächliches Schreiben des Termins in Hero. Ein Hinweis in der UI macht den Vorschau-Charakter transparent.

**Geprüft:** `npm run build` grün (`/chat` als Route), `tsc` ohne Fehler in den Chat-Dateien, Dev-Server kompiliert sauber.

**Nachtrag 2026-07-21 — Chat löschen (kleiner Vorgriff auf PROJ-17).** Löschen per **Wisch-Geste wie bei WhatsApp**: Karte von rechts nach links ziehen gibt rechts eine rote „Löschen"-Fläche frei; Tippen fragt sicherheitshalber nach und löscht dann. Umgesetzt als `ChatCard` mit Pointer-Events (`touch-action: pan-y`, damit vertikales Scrollen erhalten bleibt), Snap bei halber Breite, `moved`-Guard trennt Wischen von Tippen. Der erste Versuch mit fixem Papierkorb-Button überlappte die Karten und war nur unten erreichbar — verworfen. Optimistisch entfernt, Realtime/Reload gleicht ab. Neu: `DELETE /api/conversations/[id]` (Auth + UUID-Validierung; Nachrichten/Aktionen cascaden mit weg) inkl. Integrationstest (401/400/200/500, 4 Fälle grün). Veralteter „Etappe 2"-Hinweistext aus der Liste entfernt, da der Agent echt antwortet.

## Implementation Notes (Backend — Etappe 1: Datenbank + Persistenz)
**Umgesetzt am 2026-07-20.** Gespräche und Nachrichten werden jetzt echt gespeichert und geräteübergreifend synchronisiert. Der OS-Agent (echte Antworten) und Medien-/Termin-Aktionen folgen in Etappe 2/3.

**Supabase-Schema** (`supabase/migrations/20260720120000_cockpit_chat_schema.sql`, selbst angewandt über die Management-API):
- `cockpit_conversations`, `cockpit_messages`, `cockpit_actions` — alle mit RLS (`authenticated`, ein gemeinsames Konto)
- Trigger hält `updated_at` + `last_preview` des Gesprächs aktuell
- Realtime auf `cockpit_messages` + `cockpit_conversations` (Geräte-Sync)
- privater Storage-Bucket `cockpit-bilder` (+ Storage-Policies) für Etappe 3
- Website-Tabellen (leads/projekte) unberührt — per Bestandsschutz-Check bestätigt

**Server-Routen** (selbst-gesichert mit 401, Zod-Validierung):
- `GET/POST /api/conversations` — Liste + Gespräch anlegen
- `GET/POST /api/conversations/[id]/messages` — Nachrichten lesen + senden (POST speichert die Nutzer-Nachricht und legt eine **Platzhalter-Antwort** an; der echte Agent ersetzt sie in Etappe 2)
- Türsteher (`proxy`) lässt `/api` durch, damit Routen JSON-401 liefern statt umzuleiten

**Frontend auf echte Daten umgestellt:** `chat-view.tsx` lädt Gespräche aus der API + Realtime-Liste; `conversation.tsx` lädt Nachrichten, sendet echt, dedupliziert per ID und abonniert Live-Updates. Beispieldaten (`mock-data.ts`) entfernt.

**Tests:** 10 neue Integrationstests (401/400/Happy Path) für beide Routen; `npm test` 1.344 grün; `npm run build` grün.

**Noch offen (Etappe 2/3):** OS-Agent-Dienst auf dem VPS (echte Antworten + Zwischendenken-Streaming), Whisper-Transkription, Bild-Upload in den Bucket, Termin-Schreibpfad nach Hero.

## Implementation Notes (Backend — Etappe 2: OS-Agent, Code geschrieben)
**Geschrieben am 2026-07-20 — noch nicht deployt/getestet (gemeinsamer Schritt mit Julian).**

**Wichtige Klärung:** Der „Claude Agent SDK" ist ein eigenes Produkt; für einen Agenten mit **eigenen** Werkzeugen ist der richtige Weg der **Anthropic-SDK Tool Runner** (TypeScript/Node). So gebaut.

**Agent-Dienst** (`agent/`, läuft auf dem VPS, nur `localhost`):
- `agent/server.mjs` — HTTP-Dienst mit Claude Tool Runner (`@anthropic-ai/sdk`, `betaTool`), Modell `claude-opus-4-8` (per `OS_AGENT_MODEL` z. B. auf `claude-sonnet-5` umstellbar)
- Werkzeuge: **`vault_suchen`** (durchsucht `vault/`, markiert verifiziert/erfasst) und **`hero_lesen`** (nur Lese-Whitelist der hero-tools-CLI)
- System-Prompt verankert die Regeln: Vault zuerst, nur Verifiziertes als Fakt, kein Raten, keine außenwirksamen/Schreib-Aktionen (Gate). **Scope Etappe 2 = nur Lesen/Antworten.**
- Sicherheit: bindet nur `127.0.0.1`, prüft `OS_AGENT_TOKEN`, liest Keys aus der Umgebung
- `agent/README.md` — Anleitung (lokal testen + VPS-Deploy), `agent/node_modules` git-ignoriert

**Cockpit-Verkabelung** (`src/app/api/conversations/[id]/messages/route.ts`):
- Ist `OS_AGENT_URL` gesetzt, ruft die Route den Agenten über localhost auf (mit Token, 60 s Timeout) und nutzt dessen Antwort + Zwischendenken-Schritte; sonst bleibt der Platzhalter (Etappe 1 unversehrt)
- `npm test` 1.344 grün, `npm run build` grün

**Offen (gemeinsamer nächster Schritt):** `ANTHROPIC_API_KEY` in die `.env.local`, Agent starten, `OS_AGENT_URL` + `OS_AGENT_TOKEN` ins Cockpit — erst **lokal** testen (echte Antworten aus Vault/Hero), dann auf den VPS (pm2/systemd). Etappe 3: Termin-Schreibpfad, Whisper-Transkription, Bild-Upload.

## Implementation Notes (Etappe 3 — Termin-Schreibpfad)
**Umgesetzt am 2026-07-22.** Erster **Schreibzugriff auf Hero** — streng gated: Der Agent schlägt nur vor, geschrieben wird ausschließlich nach menschlicher Bestätigung im Pop-up.

- **Agent (`server.mjs`):** Werkzeug **`termin_vorschlagen`** (titel, von, bis, kategorie, optional beschreibung/project_match_id/bezug) — führt nichts aus, liefert den Vorschlag als `termin`. Dazu die **gated Schreib-Op `termin-anlegen`**, die `hero kalender anlegen …` ausführt; erreichbar nur über den Token-gesicherten Endpunkt. **An echtem Hero verifiziert (nur Vorschlag):** „Vor-Ort-Termin … UNB-142" → project_match_id 10449960 selbst aufgelöst, kein Schreiben ohne Freigabe.
- **Route:** `POST /api/conversations/[id]/termin` — Auth + Zod-Validierung (Kategorie-Enum), ruft nach Bestätigung die Schreib-Op, protokolliert den Vorgang in **`cockpit_actions`** (type `termin`, Status `erledigt`/`fehlgeschlagen`) als Audit-Trail. Integrationstest (401/400/200/502, 4 Fälle grün).
- **Frontend (`conversation.tsx`):** Kommt ein Termin-Vorschlag zurück, öffnet dasselbe zentrierte **Dialog**-Pop-up wie die Zuordnung (Titel/Von/Bis/Kategorie/Bezug) → **Bestätigen** legt in Hero an und zeigt „In Hero angelegt"; **Ablehnen** verwirft. (Die alte Mock-`TerminCard` bleibt vorerst ungenutzt daneben bestehen.)
- Gesamte Suite grün (1372). **Live-Test bestanden (2026-07-22, Freigabe Julian):** kontrollierter Rundgang über die echte Schreib-Op — Termin in Hero angelegt (Event 5876182, korrekte Zeitzone + Projektbezug UNB-142), gegengeprüft, wieder gelöscht; keine bleibende Spur. Der Schreibpfad Cockpit → Agent → Hero trägt.
**Sprache-zu-Text (2026-07-23, OpenAI).** Mikro nimmt per MediaRecorder auf; beim Loslassen geht das Audio an `POST /api/transcribe` → OS-Agent → OpenAI (`gpt-4o-mini-transcribe`, Op `transkription`; AI-Key bleibt im Agenten). Der Text landet editierbar im Eingabefeld. **End-to-end an echtem OpenAI verifiziert** (deutsches Test-Audio korrekt transkribiert). Integrationstest (401/400/200/502). Entscheidung OpenAI statt Selbst-Hosting: einfachste Integration, günstig, Top-Deutsch, keine VPS-Last — später ohne Cockpit-Änderung auf Groq/Self-Hosting wechselbar.

- **Restliche Etappe 3 offen:** nur noch **Bild-Upload** in den `cockpit-bilder`-Bucket.

## Erweiterungs-Ideen (Julian, 20.07.2026 — nach erstem echten Test)

1. **Modell-Strategie / Token sparen (Routing).** Nicht ein großes Modell für alles. Standard ein günstigeres Modell für den Alltag (Q&A, Zusammenfassungen, Hero-Reads); ein starkes Modell nur für Schweres (Angebotstexte, kniffliges Planen, hohe Fehlerkosten). Umsetzung: `OS_AGENT_MODEL` als Schalter ist da; später ein einfacher **Router** (Standard günstig → bei Bedarf eskalieren). Zusätzlich **Prompt-Caching** für System-Prompt + Vault-Kontext (spart bei wiederholten Turns stark). Kriterien für „starkes Modell" siehe Antwort im Chat / Decision Log.
2. **Chat löschen.** Nutzer kann ein Gespräch entfernen (DELETE + Papierkorb in der Liste).
3. **Projekt-/Kundenzuordnung + Fortschritt.** Ein Gespräch ordnet sich (automatisch, mit Bestätigung) einem Hero-Projekt oder -Kunden zu (Schema hat bereits `hero_project_id`/`hero_customer_id`). Der Chat-Titel = Projekt-/Kundenname; die Liste zeigt **Fortschritt** (Position in der Statuskette des jeweiligen Projekttyps — aus den migrierten Kernprozessen, z. B. Abo: offener Auftrag → Termin → In Umsetzung → Abgeschlossen) plus einen kurzen Kontext-Text.
4. **Aktiv/Inaktiv.** Abgeschlossene/archivierte Projekte (Status 2000/2100) wandern in einen Bereich „Abgeschlossen/Inaktiv"; aktive Projekt-Chats bleiben im Fokus. Bessere Übersicht.

5. **Universelle Aktions-Vorschau (Gate für alle Schreibaktionen).** Das Vorschau→Bestätigen-Muster nicht nur für Termine, sondern für JEDE gated Hero-Schreibaktion: Angebote/Dokumente, Aufgaben, Checklisten. Jede geplante Aktion erscheint als Vorschau-Karte, dann Bestätigen → Ausführung. Datenmodell ist vorbereitet (`cockpit_actions.type` von "termin" auf "termin/dokument/aufgabe/checkliste" erweitern). Julian findet die Karten-Vorschau universell wertvoll.
6. **Proaktive, agent-geführte Chats + Ungelesen-Markierung (zu bestätigen — aus Sprachnotiz interpretiert).** Der Agent kann Chats selbst anstoßen und führen, nicht nur Marvin. Auslöser: eingehende Anfragen (E-Mail/Lead, n8n-klassifiziert — PROJ-12). Das OS bereitet z. B. eine Terminabsprache als Mail-Entwurf vor, ordnet den Vorgang einem bestehenden oder neuen projektbezogenen Chat zu und markiert ihn **ungelesen**, damit Marvin sieht: hier hat das OS proaktiv etwas getan. Macht den Chat **bidirektional** (Agent-initiiert, nicht nur reaktiv). Verbindet Chat (PROJ-10) ↔ proaktive Loops / Offene Punkte (PROJ-11) ↔ Anfrage-Eingang (PROJ-12) ↔ Chat-Organisation (PROJ-17).

**Einordnung:** Punkt 1+2 sind kleine Ergänzungen. Punkt 5 gehört zur Aktions-/Gate-Vorschau (Etappe 3 verallgemeinert). Punkt 3+4 sind der Ausbau „Chat-Organisation" (PROJ-17). Punkt 6 ist der größte, feature-übergreifende Schritt (proaktiver, bidirektionaler Chat) und berührt PROJ-11/12/17 — eigene Spec, wenn wir dahin kommen.

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
