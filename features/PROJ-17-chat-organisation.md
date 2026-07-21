# PROJ-17: Chat-Organisation (Projektzuordnung, Fortschritt, aktiv/inaktiv)

## Status: Planned
**Created:** 2026-07-21
**Last Updated:** 2026-07-21

## Dependencies
- Requires: PROJ-10 (Chat mit dem OS) — die Chat-Fläche und der OS-Agent, die hier erweitert werden
- Requires: PROJ-7 (Cockpit-Grundgerüst) — Navigation/Branding
- Requires: PROJ-1 (Supabase-Infrastruktur) — Persistenz der Zuordnung am Gespräch (`hero_project_id`/`hero_customer_id`/`scope` bestehen bereits)
- Nutzt: PROJ-16 (hero-tools) + PROJ-4 (Hero-Wissen) + PROJ-3/PROJ-6 (Prozessketten je Projekttyp) — für Suche, Status und Schrittketten

## Ziel
Chats sind heute eine flache Liste. Dieses Feature gibt ihnen Ordnung: Ein Gespräch bezieht sich (mit Bestätigung) auf ein **Hero-Projekt oder einen Kunden**, zeigt in der Liste den **Fortschritt** entlang der Prozesskette seines Projekttyps und rutscht automatisch in einen Bereich **„Abgeschlossen"**, sobald das Projekt in Hero fertig oder archiviert ist. So sieht Marvin auf einen Blick, worum es bei einem Chat geht und wie weit das Projekt ist — ohne Doppelpflege, denn führend bleibt Hero.

## Zielnutzer
- **Marvin (operativ, mobil):** will Chats schnell dem richtigen Kunden/Projekt zuordnen können, den Stand sehen und fertige Vorgänge aus dem Weg haben.
- (Julian nutzt es mit, aber der Nutzen zielt auf Marvins Alltag.)

## User Stories
- Als Marvin möchte ich, dass ein Chat sich dem passenden Hero-Projekt/Kunden zuordnet, damit ich später sofort weiß, worum es ging.
- Als Marvin möchte ich eine Zuordnung bestätigen, bevor sie gilt, damit nichts falsch verknüpft wird.
- Als Marvin möchte ich in der Chat-Liste den Fortschritt eines Projekts als Text plus grünen Balken sehen, damit ich den Stand ohne Öffnen erkenne.
- Als Marvin möchte ich eine falsche oder fehlende Zuordnung im Chat korrigieren können, damit die Liste stimmt.
- Als Marvin möchte ich, dass abgeschlossene/archivierte Projekte in einen eingeklappten Bereich wandern, damit meine aktive Liste aufgeräumt bleibt.
- Als Marvin möchte ich abgeschlossene Chats weiterhin lesen und öffnen können, damit nichts verloren geht.

## MVP-Funktionsumfang (bewusst geschnitten)
1. **Vorschlag der Zuordnung durch den Agenten** — nur wenn aus dem Gespräch ein konkretes Projekt/Kunde sicher erkennbar ist; sonst bleibt der Chat **Allgemein** (keine Nachfrage).
2. **Bestätigung per Pop-up im Chat** — der Agent fragt im Gespräch, ein Bestätigungs-Pop-up (dieselbe Empfehlungs-/Karten-Logik wie sonst im OS) öffnet sich; erst nach Bestätigung gilt die Zuordnung.
3. **Manuelle Korrektur im Chat** — Marvin sagt im Gespräch das richtige Projekt; der Agent schlägt neu vor, Pop-up zum Bestätigen.
4. **Titel + Fortschritt in der Liste** — bei Zuordnung wird der Titel zum Projekt-/Kundennamen; bei konkretem Projekt zusätzlich **Status-Text (z. B. „In Umsetzung") + grüner Ladebalken** (Anteil = aktueller Schritt von Gesamtschritten der Prozesskette).
5. **Aktiv/Inaktiv automatisch** — Projekt in Hero abgeschlossen (2000) oder archiviert (2100) → Chat wandert in den eingeklappten Bereich **„Abgeschlossen"**, bleibt lesbar/öffenbar. Aktive und allgemeine Chats bleiben oben.

## Out of Scope
- **Eigener Hero-Such-Picker als Standardweg** — Zuordnen/Korrigieren läuft chat-nativ über den Agenten + Bestätigungs-Pop-up, nicht über einen separaten Suchdialog. (Der Agent nutzt intern die Hero-Suche.)
- **Fortschrittsbalken für Kunden-Scope** — ein Balken erscheint nur bei genau einem konkreten Projekt. Kunden-Chats (mehrere/kein Projekt) zeigen nur den Kundennamen. Aggregierter Kundenfortschritt: später.
- **Manuelles Archivieren beliebiger Chats** — Inaktiv-Werden kommt allein aus dem Hero-Status; allgemeine Chats räumt man per Löschen/Wischen weg (PROJ-10). Manuelles „als erledigt markieren": später.
- **Schreiben der Zuordnung nach Hero** — die Verknüpfung lebt am Gespräch in Supabase, nicht in Hero (keine Doppelpflege, Hero bleibt führend).
- **Chat löschen** — bereits in PROJ-10 umgesetzt (Wisch-Geste).
- **Proaktive, agent-geführte Chats + Ungelesen-Markierung** — eigener, größerer Ausbau (PROJ-10-Erweiterungsidee, berührt PROJ-11/PROJ-12); nicht hier.

## Acceptance Criteria

**Format:** Angenommen [Vorbedingung] / Wenn [Aktion] / Dann [Ergebnis]

- [ ] Angenommen ein Chat lässt ein konkretes Hero-Projekt sicher erkennen, wenn der Agent antwortet, dann schlägt er die Zuordnung vor und öffnet ein Bestätigungs-Pop-up.
- [ ] Angenommen der Agent kann kein Projekt/Kunde sicher erkennen, wenn Marvin schreibt, dann bleibt der Chat „Allgemein" ohne Zuordnungsnachfrage.
- [ ] Angenommen ein Zuordnungs-Pop-up ist offen, wenn Marvin bestätigt, dann wird der Chat mit dem Projekt/Kunden verknüpft und der Titel auf dessen Namen gesetzt.
- [ ] Angenommen ein Zuordnungs-Pop-up ist offen, wenn Marvin es ablehnt/schließt, dann bleibt der Chat unverändert (keine Verknüpfung, kein Schreibzugriff).
- [ ] Angenommen ein Chat ist einem konkreten Projekt zugeordnet, wenn die Liste geladen wird, dann zeigt die Karte den Hero-Status als Text und einen grünen Balken mit dem Anteil (Schritt X von Y).
- [ ] Angenommen ein Chat ist nur einem Kunden zugeordnet, wenn er in Liste und Kopf angezeigt wird, dann erscheint oben nur der Kundenname und kein Fortschrittsbalken (Kunde ist Stammdatum, kein Prozess).
- [ ] Angenommen der Agent hat falsch zugeordnet, wenn Marvin im Chat das richtige Projekt nennt, dann schlägt der Agent die neue Zuordnung vor und öffnet erneut ein Bestätigungs-Pop-up.
- [ ] Angenommen das zugeordnete Projekt ist in Hero abgeschlossen (2000) oder archiviert (2100), wenn die Liste geladen wird, dann erscheint der Chat im eingeklappten Bereich „Abgeschlossen" und nicht mehr in der aktiven Liste.
- [ ] Angenommen ein Chat liegt unter „Abgeschlossen", wenn Marvin ihn antippt, dann öffnet er sich normal und ist voll lesbar.
- [ ] Angenommen Hero ist beim Laden nicht erreichbar, wenn die Liste angezeigt wird, dann bleiben alle Chats sichtbar und der Fortschritt zeigt einen neutralen Zustand statt eines Fehlers/Absturzes.

## Edge Cases
- **Hero nicht erreichbar / langsam:** Liste bleibt nutzbar; Status/Balken zeigen „Status nicht verfügbar" oder den letzten bekannten Stand, kein Blockieren.
- **Mehrdeutigkeit (mehrere passende Projekte):** Der Agent präsentiert die Auswahl im Pop-up (antippbare Liste), statt zu raten.
- **Projekt wird nach Zuordnung in Hero abgeschlossen/archiviert:** Chat wandert beim nächsten Laden automatisch nach „Abgeschlossen".
- **Zugeordnetes Projekt nicht mehr auffindbar (Grenzfall):** Hinweis am Chat, Chat bleibt lesbar, Zuordnung entfernbar/änderbar im Chat.
- **Falsche Bestätigung:** korrigierbar im Chat (Agent schlägt neu vor).
- **Projekttyp/Kette unbekannt:** Ist der Projekttyp nicht bestimmbar, zeigt die Karte nur den rohen Hero-Status (Text) ohne Schritt-Balken, statt eine falsche Kette zu erfinden.
- **Zwei Geräte gleichzeitig:** Zuordnung liegt in Supabase; die bestehende Realtime-Sync hält die Liste aktuell.
- **Pop-up ignoriert (nicht bestätigt/abgelehnt):** Chat bleibt „Allgemein"; kein Auto-Schreibzugriff.

## Technical Requirements (optional)
- Zuordnung wird am Gespräch in Supabase gespeichert (Felder `scope`, `hero_project_id`, `hero_customer_id` bestehen bereits); ob ein zwischengespeicherter „letzter Hero-Status" nötig ist, entscheidet /architecture.
- Hero-Status/Fortschritt sind **Lesezugriffe** (frei, kein Gate) und werden beim Laden der Liste und beim Öffnen eines Chats gelesen.
- Mobile-first, GRÜNSCHNITT-Branding; Ladebalken in Grün (Primary).
- Auth erforderlich (Cockpit-Login).

## Open Questions
- [x] ~~In welchem Hero-Feld steht der Projekttyp?~~ Gelöst (/architecture): `ProjectMatch.type`, IDs 32646/65686/65869.
- [x] ~~Mapping Status → Schrittposition?~~ Gelöst: Position des `status_code` in der fixen Kette des Typs (12/6/5 Schritte, verifiziert).
- [x] ~~Letzten Hero-Status cachen oder live?~~ Gelöst: Schnappschuss am Gespräch, Abgleich beim Öffnen/Schreiben.
- [x] ~~Sortierung innerhalb „Aktiv"?~~ Gelöst: zuletzt aktualisiert; „Abgeschlossen" eingeklappt darunter.
- [ ] **Backend-To-do:** `projekt suchen` (hero-tools) um `type { id name }` erweitern, damit der Projekttyp im Leseergebnis ankommt.

## Decision Log

### Product Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Zuordnung nur bei Sicherheit vorschlagen, sonst „Allgemein" | Vermeidet Fehlvorschläge; Alltagsfragen ohne Projekt bleiben unbehelligt | 2026-07-21 |
| Zuordnung immer erst nach Bestätigung (Gate) | Konsistent mit OS-Gate-Prinzip; nichts wird still verknüpft | 2026-07-21 |
| Zuordnen/Korrigieren chat-nativ über Agent + Bestätigungs-Pop-up | Kein separater Such-Picker nötig; gleiche Empfehlungs-Pop-up-Logik wie sonst im OS; passt zu „Chat ist die Engine" | 2026-07-21 |
| Fortschritt = Hero-Status (Text) + grüner Balken (Schritt X von Y) | Hero ist führend/verlässlich; Balken macht den Stand anschaulich | 2026-07-21 |
| Projekttyp kommt fest vom Hero-Projekt | Jedes Projekt hat seinen Typ als festes Attribut; daraus folgt direkt die richtige Prozesskette — nichts wird geraten | 2026-07-21 |
| Kunde ist Stammdatum → kein Fortschritt, nur Name | Eine reine Kundenzuordnung hat keinen Prozessstand; im Chat/Titel steht nur der Kundenname, kein Balken | 2026-07-21 |
| Balken nur bei genau einem konkreten Projekt | Bei Kunde (Stammdatum, ggf. mehrere Projekte) ist ein einzelner Balken nicht sinnvoll | 2026-07-21 |
| Titel = Projekt-/Kundenname bei Zuordnung | Wiedererkennbarkeit in der Liste | 2026-07-21 |
| Aktiv/Inaktiv automatisch aus Hero-Status (2000/2100) | Keine Handpflege; „nichts geht verloren" durch Lesbarkeit im Bereich „Abgeschlossen" | 2026-07-21 |
| Zuordnung in Supabase am Gespräch, nicht in Hero | Keine Doppelpflege; Hero bleibt führendes System | 2026-07-21 |

### Technical Decisions
| Decision | Rationale | Date |
|----------|-----------|------|
| Projekttyp aus `ProjectMatch.type` (IDs 32646/65686/65869) | Fester Attribut des Projekts; bestimmt eindeutig die Prozesskette | 2026-07-21 |
| `projekt suchen` um `type { id name }` erweitern | Liest heute nur Status + Gewerk; Typ ist für die Kette nötig (Backend-To-do) | 2026-07-21 |
| Schritt X/Y aus fixer Ketten-Konstante je Typ, Position via Statuscode | Ketten per API nicht änderbar, typübergreifend konsistente Codes, verifiziert im Vault | 2026-07-21 |
| Status-Schnappschuss am Gespräch cachen, Abgleich beim Öffnen/Schreiben | Schnelle Liste, robust bei Hero-Ausfall; vermeidet N Live-Calls je Listenaufbau | 2026-07-21 |
| Zuordnung als Aktion/Pop-up (wie Termin-Vorschau), Persistenz nur in Supabase | Konsistente Bedienung, kein Such-Picker; Hero bleibt führend, keine Doppelpflege | 2026-07-21 |
| Aktiv sortiert nach zuletzt aktualisiert; „Abgeschlossen" eingeklappt | Übernimmt bestehende Ordnung; hält aktive Liste im Fokus | 2026-07-21 |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Überblick
Kein neuer Bildschirm — die bestehende **Chat-Fläche (PROJ-10) wird erweitert**. Drei Bausteine: (1) Zuordnungs-Vorschlag mit Bestätigungs-Pop-up, (2) Fortschrittsanzeige in der Liste, (3) Gruppierung Aktiv / Abgeschlossen. Backend nötig (kleine Erweiterung am Gespräch in Supabase + ein Hero-Lesepfad); Hero bleibt führend, geschrieben wird nur der Gesprächs-Datensatz in Supabase.

### A) Ablauf — die drei Bausteine
1. **Zuordnung (Gate über Pop-up).** Erkennt der OS-Agent im Gespräch sicher ein Projekt/Kunde (über die Hero-Suche), gibt er zusätzlich zur Antwort einen **Zuordnungs-Vorschlag** zurück. Das Cockpit zeigt ihn als **Bestätigungs-Pop-up** (gleiche Karten-/Vorschau-Logik wie die Termin-Vorschau in PROJ-10). Bei „Bestätigen" speichert das Cockpit Bezug + Titel am Gespräch (Supabase). Bei Mehrdeutigkeit listet das Pop-up die Kandidaten zum Antippen. Korrektur = Marvin nennt es im Chat, der Agent schlägt neu vor.
2. **Fortschritt.** Beim Öffnen eines Chats bzw. beim Schreiben liest der Agent das zugeordnete Hero-Projekt (Typ + aktueller Status) und legt einen kompakten **Status-Schnappschuss** am Gespräch ab. Die Liste zeigt daraus: Status-Text (z. B. „In Umsetzung") + grünen Balken (Schritt X von Y). Reiner Kunden-Chat: nur der Kundenname, kein Balken.
3. **Aktiv / Abgeschlossen.** Aus dem Schnappschuss-Status: Codes **2000/2100** → Abschnitt „Abgeschlossen" (eingeklappt, aufklappbar, voll lesbar). Alles andere und alle allgemeinen Chats → aktiver Bereich oben.

### B) Datenmodell (Klartext)
Am Gespräch (Supabase `cockpit_conversations`) — die Felder **scope, hero_project_id, hero_customer_id, title bestehen bereits**; neu hinzu kommt nur ein kleiner **Status-Schnappschuss** (zuletzt aus Hero gelesen):
```
Je Gespräch zusätzlich:
- Projekttyp (z. B. „Abo")
- aktueller Status: Code + Klartext (z. B. 1111 / „In Umsetzung")
- Schritt X von Y (aus der Kette des Typs)
- Zeitpunkt des letzten Hero-Abgleichs
```
Die **Prozessketten** je Typ liegen als feste Nachschlagetabelle im Cockpit (aus dem verifizierten Hero-Wissen, per API ohnehin nicht änderbar):
```
Projekt (Typ 32646, „bauprojekt")        12 Schritte: 201→400→601→701→801→1001→1101→1111→1150→1500→2000→2100
Projekt ohne Angebot (Typ 65686)          6 Schritte: 201→1101→1111→1150→2000→2100
Abo (Typ 65869)                           5 Schritte: 201→1101→1111→2000→2100
```
Quelle der Wahrheit bleibt **Hero**: Typ über `ProjectMatch.type`, Status über `current_project_match_status.status_code`. Die **Zuordnung selbst wird nur in Supabase** am Gespräch gehalten (keine Doppelpflege).

### C) Komponentenstruktur (Baum)
```
Chat-Liste (bestehend, erweitert)
├── Aktiv-Bereich
│   └── ChatCard (erweitert)
│       ├── Titel = Projekt-/Kundenname · Zeit · Vorschau
│       └── [NEU] Status-Zeile: Text + grüner Fortschrittsbalken (nur bei Projekt)
├── Abschnitt „Abgeschlossen" (NEU, eingeklappt/aufklappbar)
│   └── ChatCard (inaktiv, gleiche Karte)
└── Wischen-zum-Löschen (bestehend)

Gesprächsansicht (bestehend, erweitert)
├── Kopf: Titel = Projekt-/Kundenname
└── [NEU] Zuordnungs-Pop-up (Bestätigungs-Karte)
    └── „Zu Projekt X / Kunde Y zuordnen?" · Bestätigen · Ablehnen · (Kandidatenliste bei Mehrdeutigkeit)
```

### D) Tech-Entscheidungen (WARUM)
- **Projekttyp aus `ProjectMatch.type`** (fixe IDs 32646/65686/65869): fester Attribut des Projekts, keine Rateei. Löst offene Frage 1. **Folge fürs Backend:** die Leseabfrage `projekt suchen` muss `type { id name }` mitliefern (liefert heute nur Status + Gewerk).
- **Schritt X/Y aus fixen Prozessketten je Typ** (Position des Statuscodes in der Kette): Codes sind typübergreifend konsistent und per API nicht änderbar → als Konstante im Cockpit verlässlich. Löst offene Frage 2. (Sonderfälle 1500 Reklamation / 2100 Archiviert sind Abzweige am Ende — für den Balken zählt der lineare Kettenindex.)
- **Status-Schnappschuss am Gespräch cachen, Abgleich beim Öffnen/Schreiben** statt N Live-Calls bei jedem Listenaufbau: hält die Liste schnell und bei Hero-Ausfall nutzbar (Edge Case „Hero nicht erreichbar" → letzter Stand/neutral). Löst offene Frage 3.
- **Zuordnungs-Vorschlag als Aktion/Pop-up** über dieselbe Vorschau-/Bestätigungs-Logik wie die Termin-Vorschau (PROJ-10) und die geplante universelle Aktions-Vorschau — kein separater Such-Picker, konsistente Bedienung.
- **Nur Lesen an Hero, Schreiben nur an Supabase-Gespräch:** Reads sind gate-frei; die Zuordnung ist ein Supabase-Update über eine Cockpit-API, kein Hero-Schreibzugriff. Hero bleibt führend.
- **Sortierung:** Aktiv nach zuletzt aktualisiert (bestehende Reihenfolge), „Abgeschlossen" eingeklappt darunter. Löst offene Frage 4.

### Dependencies (Pakete)
Keine neuen Laufzeit-Pakete nötig. Genutzt wird Bestehendes: **Supabase** (Persistenz + Realtime-Sync der Liste), **hero-tools** (Lesen von Typ/Status), **OS-Agent** (Erkennen + Lesen), **React/Tailwind** (UI). Der grüne Fortschrittsbalken ist einfache UI; optional die shadcn-Komponente `progress`, ein schlichter Balken genügt aber.

## Implementation Notes (Backend)
**Umgesetzt am 2026-07-21.** Deterministische Grundlage (Berechnung + Datenmodell) und die Zuordnungs-/Refresh-API stehen; die UI-Anbindung + der Agent-Vorschlag folgen im `/frontend`-Schritt.

- **hero-tools:** `projekt suchen` liefert jetzt zusätzlich `type { id name }` (der Projekttyp fehlte bisher im Leseergebnis).
- **`src/lib/hero/prozessketten.ts`** — feste Prozessketten je Typ (bauprojekt 12 / ohne-Angebot 6 / abo 5 Schritte) + `berechneFortschritt(typeId, statusCode)` → Schritt X/Y, Prozent, `is_inactive`. Unit-getestet (10 Fälle; Kontrolle Abo 1111 = 3/5 = 60 %).
- **`src/lib/hero/projekt-snapshot.ts`** — holt den Projekt-Status vom OS-Agenten (localhost, nur lesend) und baut daraus den Schnappschuss; bei Agent-/Hero-Ausfall sauberer Fallback (Zuordnung ohne Fortschritt).
- **Agent (`agent/server.mjs`):** neue Leseop `projekt-status` (ohne LLM, also ohne Token-Kosten) liefert Typ + aktuellen Status strukturiert aus dem hero-tools-JSON. An echtem Projekt **UNB-142** verifiziert (Typ 32646 „Projekt", Status 1111 „In Umsetzung" → Schritt 8/12).
- **Migration `20260721120000_cockpit_chat_organisation.sql`** — Schnappschuss-Spalten am Gespräch (`hero_project_nr`, `project_type_id/name`, `status_code/label`, `step_index/total`, `is_inactive`, `hero_synced_at`) + Index auf `is_inactive`. Angewandt auf Projekt bnzpdujupmmrwcbunbql.
- **API:** `PATCH /api/conversations/[id]` (Zuordnung bestätigen; bei Projekt-Scope Schnappschuss aus Hero, bei Kunde/Allgemein leer) und `POST /api/conversations/[id]/status` (Fortschritt neu abgleichen). Auth + Zod + Integrationstests (401/400/200, Kunde vs. Projekt, Agent offline). Gesamte Testsuite grün (1368).

**Noch offen (nächste Etappe — `/frontend` + Agent):** Der Agent muss die erkannte Zuordnung im Chat als strukturierten **Vorschlag** zurückgeben (Payload fürs Bestätigungs-Pop-up); UI: Fortschrittsbalken in der Karte, eingeklappter Abschnitt „Abgeschlossen", Zuordnungs-Pop-up; Aufruf von `/status` beim Öffnen/Laden eines Chats.

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
