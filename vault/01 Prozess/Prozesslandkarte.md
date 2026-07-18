---
tags: [prozess, landkarte]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Prozesslandkarte, Stand 2026-07-14); Hero-Abgleich bestanden 2026-07-17, Review Julian 2026-07-18
---

# Prozesslandkarte GRÜNSCHNITT

Übersicht aller Prozesse des Betriebs. Grundlage für das KI-Betriebssystem ([[KI-Betriebssystem Blueprint]]): Jeder Kernprozess ist als Hero-Projekttyp konfiguriert und als Skill + Tools codebasiert abgebildet.

## Zielbild (Entscheidung 14.07.2026): Projekttyp × Gewerk

Jede Abwicklung läuft als Hero-Projekt. Zwei unabhängige Achsen:

- **Projekttyp = Prozessweg** (wie läuft der Vorgang?) — in Hero als Statuspipeline konfiguriert
- **Gewerk = Geschäftsfeld** (wo zählt der Umsatz?) — Gartengestaltung (GES) / Gartenpflege (PFL) / Gartenpflege im ABO (GABO); das Kürzel wird Projektnummern-Präfix

| Prozessweg | Hero-Projekttyp | Pipeline | Skill | Prozessnotiz |
|---|---|---|---|---|
| **Mit Angebot** (aufwendig) | "Projekt" (32646, Standard) | Anfrage eingegangen → Vor-Ort-Termin → Angebotserstellung → Detailgespräch → Auftragsvergabe → Auftragsbestätigung → Termin festgelegt → In Umsetzung → Kundenrechnung → Abgeschlossen | `bauprojekt` | [[Prozess Bauprojekt End-to-End]] |
| **Ohne Angebot** (einfach) | "Projekt ohne Angebot" (65686) | Anfrage eingegangen → Termin festgelegt → In Umsetzung → Rechnung → Abgeschlossen | `projekt-ohne-angebot` | [[Prozess Projekt ohne Angebot]] |
| **Abo** (wiederkehrend) | "Abo" (65869) | offener Auftrag → Termin festgelegt → In Umsetzung → Abgeschlossen | `abo` | [[Prozess Abo-Einsatz]] |

Status-Codes sind über alle Typen konsistent (gleicher Schritt = gleicher Code): 201 / 400–1001 (nur Vertriebsphase) / 1101 / 1111 / 1150 / 2000 / 2100. Details: [[Gewerke und Projekttypen (Measure, ProjectType)]].

**Regeln aus dem Zielbild:**
- Bauvorhaben → Typ "Projekt" + Gewerk GES; größeres Pflegeprojekt mit Angebot → Typ "Projekt" + Gewerk PFL
- Direktauftrag (Stammkunde ruft an) → Typ "Projekt ohne Angebot" + Gewerk PFL (bzw. GES bei kleinem Bau)
- Dauerobjekte (~20) → **Wartungsvertrag** je Kunde/Objekt, Aktion bei Fälligkeit = "Projekt anlegen (Abo)"; das erzeugte Projekt bekommt Gewerk GABO nachgepflegt (Automatik vererbt keins)
- **Jahresrechnungen der Abo-Kunden hängen am Kunden**, nicht am Projekt — Abo-Projekte sind reine Steuerungsobjekte; die ABO-Umsatzauswertung läuft über die GABO-Kennung des Kunden (`hero export belege`, Feld `abo_kunde`)

## Supportprozesse

| Nr | Prozess | Notiz | Wird vorausgesetzt von | Status Erfassung |
|----|---------|-------|------------------------|------------------|
| S1 | Stammdatenpflege Katalog (Produkte & Leistungen) | [[Prozess Stammdatenpflege]] | Angebot/Rechnung nur mit gepflegtem Katalog | offen |
| S2 | Kundenstammdaten (Kontakt & Adressen) | [[Prozess Kundenstammdaten]] | jeder Kernprozess (kein Projekt ohne Kunden) | offen |
| S3 | Belegfluss Buchhaltung inkl. Zahlung & Mahnwesen (DATEV) | [[Prozess Belegfluss Buchhaltung]] | Rechnungs-Schritte; Jahresrechnungen Abo | offen — Eingangsrechnungen teilautomatisiert (n8n "Email Classifier" → DATEV) |

## Legende Status Erfassung

- **offen** — noch nicht im Detail erfasst
- **erfasst** — Prozessnotiz vollständig (Auslöser, Schritte, Regeln, Tool-Bedarf)
- **umgesetzt** — als Skill + Tools im KI-Betriebssystem abgebildet

Stand: Bau **umgesetzt** (im Echtbetrieb, Fall Greiner); Projekt ohne Angebot und Abo **umgesetzt** (Skills + Praxistests bestanden 14.07.2026); Supportprozesse Kunde/Katalog als Skill `hero-stammdaten` umgesetzt.

## Historie

- 12.07.2026: Bau-Kernprozess modelliert, Schritte = Hero-Statusnamen
- 14.07.2026: Zielbild Projekttyp × Gewerk; drei Prozesswege statt Bau/Pflege-Zweiteilung; Pflege zerfällt in "ohne Angebot" (Abruf), "mit Angebot" (läuft über Typ Projekt) und "Abo" (Wartungsverträge)
- 18.07.2026: Migration in den GRÜNSCHNITT-OS-Vault; Projekttyp-IDs, Pipelines und Status-Codes per Live-Abgleich gegen Hero bestätigt
