# Schritt 5 — Termin festgelegt (Beschaffung & Vorbereitung)

## Geschäftsfall

Alles, was **vor** dem ersten Baustellentag passieren muss: Material
beschaffen, Umsetzungstermin festzurren, Checklisten und Aufgaben anlegen.
Mengen stehen im Angebot; Marvin holt Lagerware beim Baustoff-/Pflanzenhandel
ab, Spezielles bestellt er telefonisch.

## Ablauf

1. **Materialbedarf aus dem Angebot ableiten:** Produktpositionen (nicht die
   Leistungen) mit Mengen auflisten.
2. **Beschaffungs-Aufgabe(n) anlegen:**

   ```bash
   tools/hero-tools/hero projekt aufgabe-anlegen --projekt <id> \
     --titel "Material bestellen: <Positionen mit Mengen>" \
     --kommentar "<Lieferant/Abholung, Bezug zum Angebot>" \
     --faellig "2026-07-20 12:00"
   ```

3. **Umsetzungstermin anlegen** (nach Abstimmung mit dem Kunden; Material
   muss bis dahin verfügbar sein):

   ```bash
   tools/hero-tools/hero kalender anlegen \
     --titel "Umsetzung <Vorhaben> | <Kunde>" \
     --von "2026-07-27 07:30" --bis "2026-07-29 16:00" \
     --kategorie umsetzung --projekt <project_match_id> \
     --beschreibung "<Kurzbeschreibung lt. Angebot>"
   ```

   Mehrtägige Umsetzung = ein Eintrag (erster Tag früh bis letzter Tag
   Feierabend). Verschieben (z. B. Schlechtwetter): `hero kalender aendern`.
4. **Umsetzungs-Checkliste anlegen** (einmal je Projekt):

   ```bash
   tools/hero-tools/hero projekt checkliste-anlegen --projekt <id> \
     --name "Umsetzung <Vorhaben>" \
     --punkt "Material bestellen/abholen: <…>" \
     --punkt "Maschinen reservieren: <…>" \
     --punkt "Entsorgung/Container organisieren" \
     --punkt "Kunde über Baubeginn informieren" \
     --frage "Besonderheiten bei der Abnahme / Restarbeiten?"
   ```

   Punkte projektspezifisch aus den Angebotspositionen formulieren, nicht
   generisch.
5. **Belege:** Eingangsrechnungen der Lieferanten laufen automatisch über den
   n8n-"Email Classifier" nach DATEV (Julians Prozess) — hier nichts zu tun.
   Lieferscheine sammelt Marvin.

## Ergebnis des Schritts

Beschaffung läuft (Aufgaben, Marvin zugewiesen), Umsetzungstermin steht im
Kalender, Checkliste hängt am Projekt. Statuswechsel auf "Termin festgelegt"
(Code 1101): `hero projekt status --id <id> --code 1101`. Nächster Schritt:
6 (In Umsetzung), sobald der operative Tag laut Kalendereintrag startet.
