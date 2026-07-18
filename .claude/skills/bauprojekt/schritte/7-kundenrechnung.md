# Schritt 7 — Kundenrechnung (Prozessende)

## Geschäftsfall

Baustelle abgeschlossen → Marvin stellt die Rechnung. Basis ist das Angebot
plus dokumentierte Nachträge aus dem Logbuch (Schritt 6). Mit der
Rechnungserstellung endet dieser Prozess: Versand, Zahlungseingang, Mahnwesen
und DATEV liegen danach bei Julian (Supportprozess Belegfluss Buchhaltung).

## Ablauf — Zwei-Phasen-Muster wie beim Angebot

### Phase 1: Entwurf im Chat

1. **Grundlage laden:** Angebotspositionen (letzter gültiger Angebots-Entwurf
   bzw. vom Nutzer bestätigte Fassung) + Logbuch auf Nachträge prüfen.
2. **Teilrechnung?** Bei vereinbarter An-/Teilzahlung nur die betreffenden
   Positionen bzw. den Prozentsatz ansetzen — beim Nutzer rückversichern.
3. **Beschreibungen in die Vergangenheitsform** bringen ("Rasen gemäht",
   "Terrassenplatten verlegt") — die Arbeit ist erledigt.
4. Entwurf im Chat zeigen (wie Schritt 3), dann explizit fragen:
   *"Stimmt der Rechnungsentwurf? Soll ich ihn in Hero anlegen?"*

### Phase 2: Erzeugung (erst nach dem Ja)

```bash
tools/hero-tools/hero dokument rechnung --projekt <project_match_id> \
  --anrede "Herr Nachname" --positionen /pfad/positionen.json
```

Gleiches JSON-Format wie beim Angebot; Ändern ebenfalls per `--ersetzt`.
Zahlungsziel 14 Tage steht fest im Systemtext.

## Abschlussarbeiten

1. Status auf "Kundenrechnung" — Code noch nicht verifiziert, ggf. Nutzer
   machen lassen. Nach Versand & Abschluss: "Abgeschlossen" = Code 2000.
2. Offene Aufgaben des Projekts prüfen (`hero projekt aufgaben --projekt <id>
   --offen`) und mit dem Nutzer klären: erledigen oder löschen.
3. **Übergabe an Julian:** Die Rechnung verschickt Marvin aus Hero; ab dann
   übernimmt Julian (Zahlungseingang, Mahnwesen, DATEV-Upload automatisch).
   Hier endet die Zuständigkeit dieses Skills.
