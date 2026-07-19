# PROJ-10: Chat mit dem OS

## Status: Planned
**Created:** 2026-07-19
**Last Updated:** 2026-07-19

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
- [ ] Anzeige des Zwischendenkens hängt davon ab, ob der VPS-Agent seine Schritte streamen kann — in `/architecture` klären (Fallback: Tipp-Indikator)
- [ ] Spracherkennung: On-Device (Browser) vs. Server-Transkription — technische Entscheidung in `/architecture`
- [ ] Genaue Hero-Felder/Objekte für die Termin-Vorschau (Zuordnung Kunde vs. Projekt, Gewerk, Mitarbeiter) — mit `/architecture` und den Hero-Skills abgleichen
- [ ] Wie tief sucht/filtert die Gesprächs-/Verlaufsliste bei vielen Gesprächen (Suche nötig?) — bei Bedarf in `/refine`

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
