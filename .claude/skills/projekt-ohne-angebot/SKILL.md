---
name: projekt-ohne-angebot
description: >
  Einfache Direktaufträge des GRÜNSCHNITT-Betriebs im Hero-System abwickeln:
  Stammkunde ruft an, Leistung wird ohne Angebot erbracht — Termin ansetzen,
  Einsatz fahren, Rechnung schreiben, fertig. Immer verwenden, wenn ein
  bekannter Kunde eine überschaubare Leistung abruft ("Herr X will wieder die
  Hecke geschnitten haben", "Frau Y braucht einen Pflegeeinsatz", "trag den
  Einsatz für Montag ein", "schreib die Rechnung wie letztes Mal, nur Stunden
  angepasst") und KEIN Angebot nötig ist. Auch für kleine Bau-Direktaufträge
  ohne Angebotsphase. NICHT bei Angebotswunsch oder größeren Vorhaben (Skill
  bauprojekt) und NICHT für automatische Wartungsvertrags-Einsätze (Skill abo).
---

# Prozess: Projekt ohne Angebot (Direktauftrag)

Der einfache Weg: Anruf → Termin → Einsatz → Rechnung. In Hero läuft jeder
Direktauftrag als Projekt vom Typ **"Projekt ohne Angebot"** (ID 65686) —
schlanke Pipeline, volle Auswertbarkeit. Prozessmodell:
`vault/01 Prozess/Kernprozesse/Prozess Projekt ohne Angebot.md`.

## Werkzeug

CLI `tools/hero-tools/hero` (Referenz: `tools/hero-tools/README.md`).

## Schritt 0: Kontext-Auflösung (bei JEDEM Aufruf zuerst)

1. **Kunde identifizieren:** `hero kontakt suchen "<Name>"`.
   Fehlt er → Skill `hero-stammdaten` (kunde.md), dann hierher zurück.
2. **Offenes Projekt prüfen:** `hero projekt suchen --kunde <id>` — gibt es
   schon einen offenen Direktauftrag, dort weitermachen statt neu anlegen.
3. Der Projektstatus zeigt den Standort (Pipeline unten).

## Pipeline (Projekttyp "Projekt ohne Angebot", Codes verifiziert 14.07.2026)

| Status (Code) | Was passiert |
|---|---|
| Anfrage eingegangen (201) | Projekt anlegen, Wunsch ins Logbuch |
| Termin festgelegt (1101) | Einsatztermin im Hero-Kalender |
| In Umsetzung (1111) | Einsatz läuft (ab Kalendertag) |
| Rechnung (1150) | Rechnungsentwurf, Marvin versendet |
| Abgeschlossen (2000) → Archiviert (2100) | fertig |

### 1. Anfrage eingegangen

```bash
tools/hero-tools/hero projekt anlegen \
  --name "JJJJMMTT_Nachname_Schlagwort" \
  --kunde <customer_id> --adresse <address_id> \
  --gewerk gartenpflege --projekttyp ohne-angebot
```

`--projekttyp ohne-angebot` ist Pflicht — sonst entsteht der Standard-Typ
mit der vollen Angebots-Pipeline.

Gewerk: Pflegeeinsatz → `gartenpflege` (PFL); kleiner Bau-Direktauftrag
(z. B. Zaunreparatur) → `gartengestaltung` (GES). Leistungswunsch ins
Logbuch (`hero projekt logbuch`). Hero setzt den Status automatisch auf 201 —
kein manueller Statuswechsel nötig. Bei Bestandskunden direkt die Historie
ziehen (siehe Rechnung unten), um Aufwand und Preis einschätzen zu können.

### 2. Termin festgelegt

```bash
tools/hero-tools/hero kalender anlegen \
  --titel "Einsatz <Leistung> | <Kunde>" \
  --von "2026-07-21 07:30" --bis "2026-07-21 12:00" \
  --kategorie umsetzung --projekt <project_match_id>
tools/hero-tools/hero projekt status --id <project_match_id> --code 1101
```

### 3. In Umsetzung

Am Einsatztag (laut Kalender): `hero projekt status --id <id> --code 1111`.
Nachträge/Besonderheiten ins Logbuch.

### 4. Rechnung

Kern des Prozesses — **alte Rechnungen sind die Vorlage**:

1. `hero historie rechnungen --kunde <id>` — letzte Positionen und Preise
   des Kunden (neueste zuerst). Gleiche Leistung = gleiche Positionen,
   nur Stunden/Mengen an den Einsatz anpassen.
2. Entwurf im Chat zeigen, Freigabe abwarten (Zwei-Phasen-Muster).
3. `hero dokument rechnung --projekt <id> --anrede "…" --positionen pos.json`
4. `hero projekt status --id <id> --code 1150` — Marvin versendet aus Hero.

### 5. Abschließen

Nach Versand/Erledigung: `hero projekt status --id <id> --code 2000`
(Archivieren 2100 später gesammelt).

## Harte Regeln

Es gelten dieselben Regeln wie im Skill `bauprojekt` (dort Abschnitt "Harte
Regeln"): Zwei-Phasen-Muster für Dokumente, der Mensch versendet,
Katalog-Zwang, Preise bestätigt der Nutzer, Suchen vor Anlegen, nichts
löschen ohne Rückfrage, Tests nur mit Julian Amini (5711737), Beobachtungen
ins Lernlog (`Prozesse/Lernlog Bauprozess.md`).
