# Schritt 3 — Angebotserstellung

## Geschäftsfall

Aus dem Aufmaß wird ein Angebot. Das läuft **immer in zwei Phasen**: erst der
Entwurf im Chat mit expliziter Freigabe, dann erst die Erzeugung in Hero.
Grund: Preise und Positionen bestimmt der Mensch — der Agent bereitet vor.

## Phase 1: Entwurf (noch KEIN Schreibzugriff auf Hero)

1. **Aufmaß lesen:** Logbuch-Notizen aus Schritt 2 als Grundlage (Mengen,
   Flächen, Besonderheiten).
2. **Katalogabgleich:** Jede geplante Position gegen den Katalog prüfen
   (`hero katalog produkte/leistungen --suche ...`). Fehlt eine Position →
   Skill `hero-stammdaten`/katalog.md, dann weiter. Nummern, Namen und
   Steuersätze exakt aus dem Katalog übernehmen.
3. **Vollständigkeits-Check (Cross-Selling):** Fehlen erwartbare Positionen?
   Bei Erdarbeiten: Maschinen (Minibagger), Entsorgung Aushub, Bettungsmaterial.
   Bei Pflaster/Terrasse: Unterbau, Randbefestigung. Fehlendes aktiv ansprechen.
4. **Preisfindung** (Vorschlag, keine Entscheidung):
   1. Historische Preise des Kunden — **aus dem Kunden-Recap im Logbuch**
      (Schritt 1, lesen mit `hero projekt logbuch-lesen --projekt <id>`);
      nur bei konkreten Lücken gezielt nachschauen:
      `hero historie rechnungen --kunde <id>`
   2. Erfahrungswerte je Projekttyp (Wissensbasis — bis zur Migration:
      beim Nutzer erfragen)
   3. Preisspanne nennen, Nutzer entscheidet
5. **Entwurf im Chat zeigen** — je Position: Nr, Name, Menge, Einheit,
   Einzelpreis, Gesamt, Beschreibungs-Stichpunkte. Darunter Netto, MwSt,
   Brutto. Kein HTML im Chat.
6. **Explizit fragen:** *"Stimmt dieser Entwurf so? Soll ich das Angebot
   jetzt als Entwurf in Hero anlegen?"*

## Phase 2: Erzeugung (erst nach dem Ja)

Positionen als JSON-Datei schreiben (Format siehe unten), dann:

```bash
tools/hero-tools/hero dokument angebot --projekt <project_match_id> \
  --anrede "Herr Nachname" --positionen /pfad/positionen.json
```

Positions-JSON (Beschreibung als Stichpunkt-Liste, wird in Code zu HTML):

```json
[{"nr": "1000", "name": "Facharbeiterstunde Garten- & Landschaftsbau",
  "beschreibung": ["Rüstzeit + Anfahrt", "Oberboden abtragen"],
  "einheit": "Std", "menge": 24, "ep": 50.00, "mwst": 19.0}]
```

**Angebot ändern** (z. B. Mengen nach Rücksprache): neue Positionsdatei,
dann `--ersetzt <alte_dokument_id>` anhängen (IDs: `hero dokument liste
--projekt <id>`; Einträge mit `"geloescht": true` ignorieren). Der alte
Entwurf wird erst nach erfolgreichem Anlegen des neuen gelöscht.

## Versand

Das Angebot bleibt Hero-Entwurf. Marvin prüft, passt ggf. an und versendet
per E-Mail **aus Hero** — nie der Agent. Anschließend sinnvoll: Aufgabe
"Nachfassen falls keine Rückmeldung" mit Fälligkeit ~1 Woche
(`hero projekt aufgabe-anlegen`).

## Ergebnis des Schritts

Angebots-Entwurf hängt am Projekt, Versand-Aufgaben sind gesetzt.
Nächster Schritt: 4 (Auftragsbestätigung), sobald der Kunde antwortet.
