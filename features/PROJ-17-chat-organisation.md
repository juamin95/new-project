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
- [ ] In welchem **Hero-Feld** steht der Projekttyp genau (Projektart/Kategorie/Gewerk)? Der Typ ist ein festes Attribut des Projekts — /architecture lokalisiert das Feld und ordnet es den drei Prozessketten (bauprojekt / projekt-ohne-angebot / abo) zu.
- [ ] Genaues **Mapping** der Hero-Statuscodes/-signale auf die Schrittposition je Kette (welche Signale markieren welchen Schritt, Gesamtzahl Y je Projekttyp).
- [ ] Soll der zwischengespeicherte letzte Hero-Status persistiert werden (für Offline/Ladeanzeige), oder immer live lesen?
- [ ] Sortierung/Reihenfolge innerhalb „Aktiv" (zuletzt aktualisiert vs. nach Fortschritt)?

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
| _To be added by /architecture_ | | |

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
