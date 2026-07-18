---
tags: [technik, hero, graphql]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Gewerke und Projekttypen (Measure, ProjectType), Stand 2026-07-14); Spot-Check Schema/Live bestanden 2026-07-18, Review Julian 2026-07-18
---

# HERO GraphQL API – Gewerke und Projekttypen (Measure, ProjectType)

Stand: 14.07.2026, verifiziert per Live-Tests (hero-tools) an Testprojekten des Kunden Julian Amini (149–154).

## Gewerk = Measure

Die in den Firmeneinstellungen gepflegten „Gewerke & Leistungen" heißen in der API `Measure` (`company { measures }`). Bei GRÜNSCHNITT:

| Gewerk | ID | Kürzel | Verwendung |
|---|---|---|---|
| Gartengestaltung | 5695 | GES | Bau |
| Gartenpflege | 5696 | PFL | Pflege auf Abruf |
| Gartenpflege im ABO | 8102 | GABO | Dauerobjekte |
| Unbekannt (System) | 6985 | UNB | Default/Altbestand |
| Kontakt (System) | 7081 | KONT | Kunden-Container |

**Das Gewerk lebt ausschließlich am Projekt** (`ProjectMatch.measure_id`). Aufträge (FieldService_Job), Angebote/Rechnungen (CustomerDocument) und Checklisten haben kein eigenes Gewerk-Feld — sie erben es über ihre `project_match_id`-Kante. Belege direkt am Kunden-Container tragen damit immer „Kontakt".

## Gewerk-Kürzel = Nummernkreis-Präfix

`project_nr` = `<Kürzel>-<laufende Nummer>`; die Nummer läuft **global** über alle Gewerke weiter (…UNB-148, PFL-149, GES-150…). Gewerk-Wechsel per `update_project_match(project_match: {id, measure_id})` tauscht nur das Präfix, die Zahl bleibt (UNB-152 → GABO-152, rückwärts genauso — verifiziert, voll reversibel). Tool: `hero projekt gewerk --id <pm_id> --gewerk abo`.

## Projekttyp = ProjectType (eigene Status-Pipeline)

Projekttypen sind in den Firmeneinstellungen anlegbar; jeder hat eigene `project_status_steps`. **Finaler Stand 14.07.2026 — drei aktive Typen** (Zielbild in [[Prozesslandkarte]]):

- **„Projekt" (32646, is_default)**: voller Prozessweg **mit Angebot**, 12 Schritte: 201 Anfrage eingegangen, 400 Vor-Ort-Termin, 601 Angebotserstellung, 701 Detailgespräch, 801 Auftragsvergabe, 1001 Auftragsbestätigung, 1101 Termin festgelegt, 1111 In Umsetzung, 1150 Kundenrechnung, 1500 Reklamation, 2000 Abgeschlossen, 2100 Archiviert → Skill `bauprojekt`
- **„Projekt ohne Angebot" (65686)**: Direktauftrag, 6 Schritte: 201 Anfrage eingegangen, 1101 Termin festgelegt, 1111 In Umsetzung, 1150 Rechnung, 2000, 2100 → Skill `projekt-ohne-angebot`
- **„Abo" (65869)**: Wartungsvertrags-Einsatz ohne Rechnung, 5 Schritte: 201 offener Auftrag, 1101 Termin festgelegt, 1111 In Umsetzung, 2000, 2100 → Skill `abo`
- Inaktiv/Altbestand: 65622 „Pflege ohne Angebot", 65868 „Projekte" (Vorlagen-Duplikat), 1 (alter Default)

Die Codes sind **typübergreifend konsistent** (gleicher Schritt = gleicher Code, Wording harmonisiert: „Termin festgelegt" heißt in allen drei Typen gleich) → `hero projekt status --code` funktioniert für alle Typen unverändert.

**Modell-Prinzip: Projekttyp und Gewerk sind orthogonale Achsen.** Der Typ bestimmt den Prozessweg (mit Angebot / ohne Angebot / Abo), das Gewerk das Geschäftsfeld (GES/PFL/GABO) — jede Kombination ist zulässig.

**API-Grenzen bei Projekttypen** (verifiziert): `create/update_project_type` können Typen anlegen, umbenennen, (de)aktivieren — `name` und `name_plural` sind dabei Pflichtfelder. Die **Status-Schritte sind per API nicht änderbar** (keine Mutation für project_status_steps) — Schritte pflegt man nur im UI-Editor (Zahnrad).

## Wartungsverträge = FieldService_ServiceObject

UI „Wartungsverträge" (`/field-service/objects`) → API `field_service_object(id)`. Felder: `recurring_start/next/period/num` (Intervall), `recurring_action`, `reminder_*`, `project_match_id`.

- `recurring_action` codiert die „Aktion bei Fälligkeit": z. B. `create_project_<project_type_id>` (Projekttyp ist wählbar!), alternativ Aufgabe/Benachrichtigung/Auftrag.
- ⚠️ **Automatisch erzeugte Projekte bekommen immer Gewerk „Unbekannt"** — der Vertrag vererbt kein Gewerk (verifiziert an UNB-152). Nachpflege nötig: `hero projekt gewerk --id … --gewerk abo`.

## Aufträge = FieldService_Job

- `type` = Auftragsart (technischer Schlüssel, String ohne Enum): `maintenance` (Wartung), `repair` (Reparatur); `localized_type` = deutsche Anzeige.
- `documents`-Liste: Belege lassen sich im UI „im Auftrag" erstellen, hängen API-seitig aber weiter am `project_match` (create_document kennt nur `project_match_id`) — die Auftrags-Verknüpfung ist eine Zusatzkante.
- `tracking_times` (Zeiterfassung) vorhanden — Anker fürs Stundenerfassungs-Backlog.

## Projekte löschen: per API nicht möglich

Die Partner-API hat **keine delete-Mutation für project_matches**, und das Input-Feld `is_deleted: true` wird bei `update_project_match` **stillschweigend ignoriert** (verifiziert 14.07.2026). Aufräum-Pattern: Status auf **2100 (Archiviert)** setzen (`hero projekt status --id … --code 2100`); endgültiges Löschen nur manuell in der Hero-UI.

## Notizen

- Konstanten in hero-tools: `stammdaten.GEWERKE`; Anlegen mit Gewerk: `hero projekt anlegen --gewerk gartengestaltung …`
- Zielbild-Diskussion (Projekttyp = Kernprozess, Wartungsvertrag als Motor für ~20 Dauerobjekte): siehe [[Prozesslandkarte]]
