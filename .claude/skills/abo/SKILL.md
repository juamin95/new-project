---
name: abo
description: >
  Wiederkehrende Abo-Einsätze der GRÜNSCHNITT-Dauerpflegekunden im Hero-System
  steuern. Die Projekte entstehen automatisch aus Wartungsverträgen (Typ "Abo")
  und brauchen nur: Gewerk nachpflegen, Einsatz terminieren, abschließen —
  KEINE Rechnung im Projekt (Abo-Kunden erhalten Jahresrechnungen am Kunden).
  Immer verwenden bei: "plane die offenen Abo-Einsätze ein", "was ist im
  Abo-Board offen?", "neuer Wartungsvertrag für Kunde X", "Abo-Projekte
  aufräumen/abschließen", "Gewerk bei den Abo-Projekten nachziehen". NICHT für
  einmalige Pflegeeinsätze auf Zuruf (Skill projekt-ohne-angebot) und NICHT
  für Vorhaben mit Angebot (Skill bauprojekt).
---

# Prozess: Abo-Einsatz (Dauerpflege über Wartungsverträge)

Die ~20 Dauerobjekte laufen über **Wartungsverträge** (Hero: Wartungsverträge,
API: `field_service_object`): Der Vertrag erzeugt im Intervall automatisch ein
Projekt vom Typ **"Abo"** (ID 65869) und erinnert Marvin vorab. Das Projekt
ist reines Steuerungsobjekt — **Rechnungen entstehen hier nicht** (Abo-Kunden
bekommen Jahresrechnungen direkt am Kunden; Julians Prozess). Prozessmodell:
`vault/01 Prozess/Kernprozesse/Prozess Abo-Einsatz.md`.

## Werkzeug

CLI `tools/hero-tools/hero` (Referenz: `tools/hero-tools/README.md`).

## Pipeline (Projekttyp "Abo", Codes verifiziert 14.07.2026)

| Status (Code) | Was passiert |
|---|---|
| offener Auftrag (201) | vom Wartungsvertrag erzeugt — wartet auf Planung |
| Termin festgelegt (1101) | Einsatztermin steht im Hero-Kalender |
| In Umsetzung (1111) | Einsatz läuft |
| Abgeschlossen (2000) → Archiviert (2100) | fertig |

## Ablauf je Einsatz

1. **Offene Abo-Projekte finden:** `hero projekt suchen --typ project` —
   Projekte mit Status 201, deren Kunde ein Dauerobjekt ist.
2. **Gewerk nachpflegen (Pflicht!):** Die Wartungsvertrag-Automatik erzeugt
   Projekte immer mit Gewerk "Unbekannt" (UNB) — als Erstes korrigieren:

   ```bash
   tools/hero-tools/hero projekt gewerk --id <project_match_id> --gewerk abo
   ```

   Aus UNB-… wird GABO-… (Nummer bleibt). Ohne diesen Schritt fällt der
   Einsatz aus der ABO-Auswertung.
3. **Terminieren:** Kalendereintrag (Kategorie umsetzung, Marvin) + Status:

   ```bash
   tools/hero-tools/hero kalender anlegen --titel "Pflege <Objekt> | <Kunde>" \
     --von "…" --bis "…" --kategorie umsetzung --projekt <id>
   tools/hero-tools/hero projekt status --id <id> --code 1101
   ```

4. **Einsatztag:** Status 1111; Besonderheiten ins Logbuch des Projekts.
5. **Abschließen:** Status 2000. Keine Rechnung anlegen! Auffälligkeiten für
   die Jahresrechnung (Mehraufwand, Zusatzleistungen) ins Logbuch — Julian
   zieht das bei der Jahresabrechnung.
6. **Aufräumen (gesammelt, auf Zuruf):** abgeschlossene Abo-Projekte älterer
   Monate auf 2100 (Archiviert).

## Neuen Dauerkunden aufsetzen

1. Kunde vorhanden? (`hero kontakt suchen`, sonst Skill `hero-stammdaten`)
2. **Wartungsvertrag legt Julian/Marvin im Hero-UI an** (Wartungsverträge →
   hinzufügen): Laufzeit, Intervall, **Aktion bei Fälligkeit = "Projekt
   anlegen (Abo)"**, Erinnerung ~7 Tage vorher an Marvin. Die Partner-API
   kann Wartungsverträge nur lesen, nicht anlegen.
3. Ab dann läuft das Rad automatisch; je Fälligkeit greift der Ablauf oben.

## Harte Regeln

Wie im Skill `bauprojekt` (Abschnitt "Harte Regeln"), zusätzlich:
- **Keine Dokumente an Abo-Projekten** — Jahresrechnung ist Julians Prozess.
- Wartungsverträge nie per API verändern, ohne dass der Nutzer es
  ausdrücklich verlangt (sie sind der Taktgeber des Systems).
- Beobachtungen ins Lernlog (`vault/03 AI/Lernlog/Lernlog Bauprozess.md`).
