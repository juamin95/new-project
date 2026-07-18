---
tags: [prozess, kernprozess, bau]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Prozess Bauprojekt End-to-End, Stand 2026-07-12); Hero-Abgleich bestanden 2026-07-17, Review Julian 2026-07-18
---

# Prozess Bauprojekt End-to-End

Kernprozess des Geschäftsfelds Bau: von der Anfrage bis zur Rechnung. Teil der [[Prozesslandkarte]].

**Erfassungsstand:** umgesetzt, im Echtbetrieb erprobt (Stand 14.07.2026).

---

## B1 — Anfrage & Erstkontakt

**Auslöser:** Kunde meldet sich über Telefon, WhatsApp oder E-Mail. Marvin nimmt alle Anfragen an.

**Ist-Zustand:** Alles läuft auf Papier, bevor etwas in Hero steht.

**Soll (Minimalversion):**
- Direkt nach der Anfrage wird in Hero erfasst:
  1. Kunde anlegen, sofern Neukontakt (vorher Dublettenprüfung — Regel aus n8n-Agent übernehmen)
  2. Projekt zur Anfrage anlegen
  3. Anfrage (Leistungswunsch) als Logbuch-Eintrag
- **Kunden-Recap bei Bestandskunden:** Direkt nach der Projektanlage stellt der Agent die Historie zusammen — Was wurde bisher gemacht (Projekte)? Wie wurde abgerechnet (pauschal oder pro Dienstleisterstunde)? Welche Positionen und Preise? — und fasst sie als **Logbuch-Eintrag im Projekt** zusammen. Terminvorbereitung (B2) und Preisfindung (B3) lesen dann nur noch diesen Eintrag statt alle Belege erneut.
- Kontakt in Hero mit Kategorie (customer), Typ (private/commercial), Adresse; abweichende Baustellenadresse als eigene Adresse am Kunden

**Systeme:** Hero (Kontakt, Projekt)

---

## B2 — Vor-Ort-Termin & Aufmaß

**Auslöser:** Anfrage qualifiziert, Termin mit dem Kunden abgestimmt

**Soll:**
- Der Vor-Ort-Termin wird im **Hero-Kalender** eingetragen (CalendarEvent — verifizierte Erkenntnisse in [[Kalender und Termine (CalendarEvent)]])
- **Terminvorbereitung aus dem Logbuch:** Anfrage-Eintrag und Kunden-Recap (beides seit B1 im Logbuch) als kompakte Vorbereitung für Marvin
- Vor Ort nimmt Marvin auf: **Maße, Notizen, Fotos** — zunächst frei, ohne Vorgaben; Notizen landen danach als Logbuch-Eintrag im Projekt

**Abgrenzung:** Aufträge ohne Vor-Ort-Termin gibt es — das sind die anderen Prozesswege (Zielbild 14.07.2026, siehe [[Prozesslandkarte]]):
- **Mit Angebot** = dieser Prozess (Bauvorhaben und größere Pflegeprojekte)
- **Ohne Angebot** = Direktauftrag → [[Prozess Projekt ohne Angebot]]
- **Abo** = wiederkehrende Dauerpflege → [[Prozess Abo-Einsatz]]

**Systeme:** Hero (Kalender)

---

## B3 — Angebotserstellung

**Auslöser:** Aufmaß liegt vor

**Bekannt (aus n8n-Agent):**
- Projekttyp identifizieren ([[Projekttypen-Wissensbasis]] mit Keywords, typischen Positionen, Preisspannen)
- Jede Position gegen Katalog abgleichen (Produkte 4000–7000, Leistungen 1000–3000); fehlende Positionen erst als Stammdatum anlegen → [[Prozess Stammdatenpflege]]
- Cross-Selling-Check: fehlen zwingende Positionen (Unterbau, Maschinen, Entsorgung)?
- Preisfindung: 1. historische Preise des Kunden, 2. Preisspannen aus der Projekttypen-Wissensbasis, 3. finale Entscheidung beim Menschen
- Zwei Phasen: Entwurf → explizite Freigabe → erst dann Projekt + Angebots-Draft in Hero (publish: false)
- Projektname: Datum_Kunde_Schlagwort

**Versand:**
- Das Angebot wird aus Hero heraus per E-Mail verschickt. Deshalb werden **immer nur Entwürfe** erzeugt (`publish: false`) — das bleibt so, damit Marvin in Hero final anpassen und von dort versenden kann.
- Nachfassen bei unbeantworteten Angeboten gibt es derzeit nicht → Backlog (Nachfass-Loop).

**Systeme:** Hero (Projekt, Dokument, Mailversand), n8n-Agent, Projekttypen-Wissensbasis

---

## B4 — Beauftragung

**Auslöser:** Kunde stimmt zu

**Ist/Soll:**
- Zustimmung kommt heute über verschiedene Kanäle, in der Regel per E-Mail. Ziel: Kunden dahin lenken, die Bestätigung auf das Angebot per E-Mail zu schicken (einheitlicher Kanal).
- Mit **Projektstatus in Hero arbeiten** — die Pipeline existiert bereits (siehe unten), nicht alle Status müssen genutzt werden.
- Anzahlungen/Abschläge: möglich. Hero unterstützt **Teilrechnungen** — einzelne Angebotspositionen abrechnen oder prozentual von der Gesamtsumme.

**Systeme:** Hero (Projektstatus, E-Mail)

---

## B5 — Termin festgelegt (Beschaffung & Vorbereitung)

**Auslöser:** Auftrag erteilt. Umfasst alles, was **vor** dem ersten Baustellentag passiert: Materialbeschaffung, Umsetzungstermin festzurren (Hero-Kalender), Checklisten und Aufgaben anlegen.

**Ist-Zustand Beschaffung:**
- Handvoll Stammlieferanten: Baustoffhandel, Pflanzenhandel
- Lagerware wird meist **abgeholt**, speziellere Sachen **telefonisch bestellt**
- Mengen kommen aus dem Angebot; auf den Einkaufspreis wird ein Prozentsatz aufgeschlagen
- Lieferschein gibt es auf die Hand; **Eingangsrechnungen kommen per E-Mail** ins Kundenkonto/Postfach

**Bereits automatisiert (n8n "Email Classifier"):** Eingehende Rechnung wird erkannt → in den Eingangs-Ordner des Postfachs verschoben → per DATEV-E-Mail-Upload in DATEV geladen. Dort erstellt Julian Überweisungen bzw. ordnet bei Lastschrift die Zahlung dem Beleg zu. → Details im [[Prozess Belegfluss Buchhaltung]]

**Abbildung in Hero:** Status "Termin festgelegt"; die Beschaffung selbst läuft über **Aufgaben/Checklisten im Hero-Projekt** (siehe Abschnitt Hero-Projektfunktionen), der Umsetzungszeitraum als Kalendereintrag (Kategorie Umsetzung).

**Systeme:** Lieferanten (Telefon/Abholung), Strato-Postfach, n8n, DATEV, Hero (Aufgaben, Checklisten, Kalender)

---

## B6 — In Umsetzung (operative Ausführung)

**Auslöser:** Der operative Tag laut Kalendereintrag startet

**Ist/Soll:**
- Keine detaillierte Ressourcenplanung nötig (kleines Team)
- Checkliste auf der Baustelle mitführen und abhaken; bei Bedarf können auch jetzt noch Aufgaben und Checklisten nachgeschoben werden
- Nachträge/Abweichungen vom Angebot ins Logbuch (Grundlage für B7)
- Abnahme mit Kunde dokumentieren
- Baustellenstunden werden **nicht erfasst** → Backlog (Zeiterfassung), nicht jetzt

**Systeme:** Hero (Checklisten, Aufgaben, Logbuch)

---

## B7 — Rechnungsstellung (Prozessende)

**Auslöser:** Baustelle abgeschlossen

**Ablauf:**
- Marvin erstellt die Rechnung nach Abschluss der Baustelle — Basis ist das Angebot (keine Ist-Stunden, da keine Baustellenzeiterfassung)
- Ablauf analog Angebot (Entwurf → Freigabe → Hero-Draft), Positionen in Vergangenheitsform
- Preiskonsistenz über historische Rechnungspositionen des Kunden
- Teilrechnungen möglich (einzelne Positionen oder prozentual, siehe B4)
- Zahlungsziel 14 Tage, fest im Systemtext

**Prozessende & Übergabepunkt:** Mit der Rechnungserstellung ist Marvin raus. Ab hier übernimmt Julian (Buchhaltung): Zahlungseingänge prüfen, Mahnwesen, automatischer Upload der Ausgangsrechnungen in DATEV. → [[Prozess Belegfluss Buchhaltung]]

**Systeme:** Hero (Dokument), n8n-Agent, DATEV

---

## Hero-Statuspipeline (Stand 2026-07-14, Projekttyp "Projekt" 32646)

Die in Hero angelegte Projekt-Pipeline spiegelt die Prozessphasen. Zuordnung (Codes verifiziert 14.07.2026 und erneut per Hero-Abgleich 17.07.2026; Umbenennungen 14.07.: "Neu - Erstkontakt" → "Anfrage eingegangen", "Umsetzungsbeginn" → "Termin festgelegt"):

| Hero-Status (Code) | Prozessphase |
|---|---|
| Anfrage eingegangen (201) | B1 |
| Vor-Ort-Termin (400) | B2 |
| Angebotserstellung (601) | B3 |
| Detailgespräch (701) | B3/B4 |
| Auftragsvergabe (801) | B4 |
| Auftragsbestätigung (1001) | B4 |
| Termin festgelegt (1101) | B5 |
| In Umsetzung (1111) | B6 |
| Kundenrechnung (1150) | B7 |
| Reklamation (1500) | nach B7 (Sonderfall) |
| Abgeschlossen (2000) | Ende |
| Archiviert (2100) | Ende |

Dazu Sammelansichten "Überfällige Projekte" und "Alle Offenen". Nicht alle Status müssen genutzt werden. **Entscheidung 12.07.2026:** Die Prozessschritte übernehmen die Hero-Statusnamen als Hauptschritte (gleiche Begriffe überall); die Beschaffung gehört zu "Termin festgelegt" (B5). Die Codes sind über alle drei Projekttypen konsistent — siehe [[Prozesslandkarte]] (Zielbild) und [[Gewerke und Projekttypen (Measure, ProjectType)]].

## Hero-Projektfunktionen (Stand 2026-07-12, aus der Oberfläche)

Ein Hero-Projekt bietet folgende Bereiche — relevant für die Frage, welche Prozessschritte direkt in Hero abgebildet werden können:

- **Logbuch** — Projekthistorie
- **Bilder** — z. B. Aufmaß-Fotos aus B2 hier ablegen
- **Dokumente** — Angebote, Rechnungen
- **Ausschreibungen (GAEB)**
- **Zeit & Lohn** — für spätere Baustellenzeiterfassung (Backlog)
- **Termine** — Vor-Ort-Termin (B2), Umsetzungszeitraum (B6)
- **Aufgaben** (offen/erledigt, mit Mitarbeiter, Fälligkeit, als Vorlage speicherbar) — z. B. "Material bestellen" in B5
- **Material** — Beleg-Erfassung am Projekt
- **Soll/Ist-Vergleich**
- **Projektbeteiligte**
- **Checklisten** — z. B. künftige Aufmaß-Checklisten je Projektkategorie (Backlog)

## Zukunftsideen (Backlog, bewusst nicht Teil der Minimalversion)

- **Kanal-Bündelung:** Anfragen künftig nur noch per E-Mail annehmen; einmal täglich automatische Aufnahme der Anfragen (Kunde + Projekt in Hero). Erst nach der Minimalversion.
- **Aufnahme-Checklisten je Projektkategorie:** Projekte kategorisieren (z. B. Terrassenbau) und je Kategorie vorgeben, was beim Aufmaß aufzunehmen ist (Empfehlungssystem). Bis dahin nimmt Marvin frei auf.
- **Nachfass-Loop Angebote:** Unbeantwortete Angebote automatisch erkennen und zum Nachhaken vorlegen.
- **Einheitlicher Bestätigungskanal:** Kunden konsequent zur Auftragsbestätigung per E-Mail auf das Angebot lenken.
- **Automatisierte Lieferantenbestellung:** Bestellware (nicht Lagerware) automatisiert per E-Mail beim Lieferanten anfragen, Mengen aus dem Angebot.
- **Baustellenzeiterfassung:** Stunden und Ist-Mengen auf der Baustelle erfassen (Hero "Zeit & Lohn"), damit Rechnungen auf Ist-Basis möglich werden.

## Abhängigkeiten zu Supportprozessen

- [[Prozess Kundenstammdaten]] — Voraussetzung für B1, B3
- [[Prozess Stammdatenpflege]] — Voraussetzung für B3, B7
- [[Prozess Belegfluss Buchhaltung]] — nimmt Belege aus B5 und B7 auf
