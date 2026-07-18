# Schritt 2 — Vor-Ort-Termin (& Aufmaß)

## Geschäftsfall

Termin mit dem Kunden abstimmen, im Hero-Kalender eintragen, und Marvin für
den Termin vorbereiten. Vor Ort nimmt Marvin Maße, Notizen und Fotos auf —
die landen danach im Projekt.

## Ablauf

1. **Terminvorbereitung aus dem Logbuch:** Anfrage-Eintrag und (bei
   Bestandskunden) den Kunden-Recap aus Schritt 1 lesen
   (`hero projekt logbuch-lesen --projekt <id>`) und Marvin als kompakte
   Vorbereitung geben. Fehlt der Recap noch (z. B. Projekt wurde manuell
   angelegt), jetzt nachholen — siehe Schritt 1, Punkt 5.
2. **Dublettencheck Kalender:** `hero kalender termine --von ... --bis ...`
   für den Zielzeitraum — existiert schon ein Termin mit diesem Kunden?
3. **Termin anlegen** (nach Abstimmung mit dem Kunden):

   ```bash
   tools/hero-tools/hero kalender anlegen \
     --titel "Vor-Ort-Termin Aufmaß <Vorhaben> | <Kunde>" \
     --von "2026-07-16 09:00" --bis "2026-07-16 10:00" \
     --kategorie vor-ort-termin --projekt <project_match_id> \
     --beschreibung "Aufmaß <Vorhaben>: <was zu prüfen ist>"
   ```

   Zeiten ohne Offset werden als Europe/Berlin interpretiert. Marvin wird
   automatisch als Mitarbeiter zugewiesen. Verschieben: `hero kalender aendern`.
4. **Nach dem Termin:** Aufmaß-Notizen als Logbuch-Eintrag erfassen
   (`hero projekt logbuch`) — Datum/Uhrzeit des Termins, Maße, Untergrund,
   Zuwegung, Kundenwünsche, Besonderheiten. Fotos lädt Marvin unter
   "Bilder" hoch (kein API-Weg).

## Stolperfalle

Am Termin hängt die **project_match_id**, nicht die Kunden-ID. Für Termine an
Kontakten ohne Projekt existiert ein KONT-Platzhalter-project_match — Details:
Praxiswissen "Kalender und Termine (CalendarEvent)".

## Ergebnis des Schritts

Termin steht im Hero-Kalender am Projekt, Aufmaß-Notizen sind im Logbuch.
Nächster Schritt: 3 (Angebotserstellung). Statuswechsel auf "Vor-Ort-Termin":
Code noch nicht verifiziert — dem Nutzer überlassen (siehe SKILL.md).
