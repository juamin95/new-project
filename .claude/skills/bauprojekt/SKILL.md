---
name: bauprojekt
description: >
  Kernprozess Bau des GRÜNSCHNITT-Betriebs end-to-end im Hero-System steuern:
  von der Kundenanfrage über Vor-Ort-Termin/Aufmaß, Angebot, Beauftragung,
  Material und Umsetzung bis zur Rechnung. Immer verwenden, wenn es um ein
  Bauprojekt geht (Terrasse, Pflaster, Zaun, Gartenneuanlage, Erdarbeiten —
  einmalige Projekte mit klarem Ergebnis) ODER wenn ein einzelner Schritt in
  einem bestehenden Projekt ansteht: "erstell ein Angebot", "schreib die
  Rechnung", "trag den Vor-Ort-Termin ein", "setz das Projekt auf beauftragt",
  "leg die Aufgaben an", "was steht bei Projekt X an?". Auch bei neuen
  Anfragen wie "Herr X will eine Terrasse" oder "Anfrage von Frau Y für
  Pflasterarbeiten". Gilt für alle Vorhaben MIT Angebotsphase — auch größere
  Pflegeprojekte mit Angebot. NICHT für einfache Direktaufträge ohne Angebot
  (Stammkunde ruft an, Termin, Rechnung — Skill projekt-ohne-angebot) und
  NICHT für wiederkehrende Wartungsvertrags-Einsätze (Skill abo).
---

# Kernprozess Bauprojekt (End-to-End)

Bau = einmaliges Projekt mit klarem Start, Ziel und Ergebnis (Abgrenzung zu
Pflege = wiederkehrendes Tagesgeschäft). Prozessmodell:
`vault/01 Prozess/Kernprozesse/Prozess Bauprojekt End-to-End.md`.
Der Prozess endet mit der Rechnungserstellung — danach übernimmt Julian
(Buchhaltung), Marvin ist raus.

## Werkzeug

CLI `tools/hero-tools/hero` (Referenz: `tools/hero-tools/README.md`).

## Schritt 0: Kontext-Auflösung (bei JEDEM Aufruf zuerst)

Ein Prozessschritt beginnt nie im leeren Raum. Bevor irgendetwas angelegt wird:

1. **Kunde identifizieren:** `hero kontakt suchen "<Name>"`.
   Kunde fehlt → Skill `hero-stammdaten` (kunde.md) befolgen, dann hierher zurück.
2. **Projekt finden:** `hero projekt suchen --kunde <id>` oder `--suche <Begriff>`.
   Projekt fehlt → das ist Phase B1 (Projekt anlegen). Mehrere Treffer → Nutzer wählen lassen.
3. **Standort bestimmen:** Der Projektstatus sagt, wo im Prozess das Projekt
   steht (Tabelle unten). Den gewünschten Schritt in diesem Kontext ausführen —
   vorhandene Objekte (Termine, Aufgaben, Dokumente, Checklisten) prüfen und
   ggf. ändern statt blind neu anzulegen.

## Hauptschritte = Hero-Statuspipeline

Die Schritte heißen wie die Status in Hero — gleiche Begriffe im Kopf, in der
Software und hier. Der Projektstatus zeigt damit direkt, welcher Schritt dran ist.

| Schritt | Hero-Status (Code) | Inhalt | Schritt-Datei |
|---------|-------------------|--------|---------------|
| 1 | Anfrage eingegangen (201) | Anfrage, Kunde, Projekt + Gewerk, Kunden-Recap | [schritte/1-anfrage-eingegangen.md](schritte/1-anfrage-eingegangen.md) |
| 2 | Vor-Ort-Termin (400) | Terminvorbereitung, Termin, Aufmaß | [schritte/2-vor-ort-termin.md](schritte/2-vor-ort-termin.md) |
| 3 | Angebotserstellung (601) / Detailgespräch (701) | Angebot in zwei Phasen | [schritte/3-angebotserstellung.md](schritte/3-angebotserstellung.md) |
| 4 | Auftragsvergabe (801) / Auftragsbestätigung (1001) | Zustimmung, Status, Anzahlung | [schritte/4-auftragsbestaetigung.md](schritte/4-auftragsbestaetigung.md) |
| 5 | Termin festgelegt (1101) | Beschaffung, Umsetzungstermin, Checklisten & Aufgaben | [schritte/5-termin-festgelegt.md](schritte/5-termin-festgelegt.md) |
| 6 | In Umsetzung (1111) | Operative Ausführung ab Kalendereintrag, Nachträge, Abnahme | [schritte/6-in-umsetzung.md](schritte/6-in-umsetzung.md) |
| 7 | Kundenrechnung (1150); Ende: Abgeschlossen (2000) | Rechnung, Übergabe an Julian | [schritte/7-kundenrechnung.md](schritte/7-kundenrechnung.md) |

> Alle Codes verifiziert 14.07.2026 (dazu: 1500 Reklamation, 2100 Archiviert).
> Dieser Skill gilt für den Projekttyp "Projekt" (voller Weg **mit Angebot**) —
> das gilt auch für größere **Pflegeprojekte mit Angebot** (dann Gewerk
> `gartenpflege` statt `gartengestaltung`). Für einfache Direktaufträge ohne
> Angebot → Skill `projekt-ohne-angebot`; für Wartungsvertrags-Einsätze →
> Skill `abo`.

Nur die Schritt-Datei der aktuell anstehenden Phase lesen.

## Harte Regeln (gelten in jeder Phase)

1. **Zwei-Phasen-Muster für Dokumente:** Erst Entwurf im Chat zeigen
   (Positionen, Preise, Summen) und ausdrücklich fragen: *"Stimmt der Entwurf?
   Soll ich ihn in Hero anlegen?"* Erst nach dem Ja wird geschrieben.
2. **Der Mensch versendet.** Dokumente entstehen immer als Hero-Entwurf
   (`publish: false`, im Tool fest verdrahtet). Angebote und Rechnungen
   verschickt ausschließlich Marvin aus dem Hero-Frontend — der Agent kann
   und darf das nicht.
3. **Katalog-Zwang:** Jede Dokumentposition kommt aus dem Katalog
   (`nr`, `name`, `vat_percent` exakt übernehmen). Fehlende Positionen erst
   über Skill `hero-stammdaten` (katalog.md) anlegen.
4. **Preise bestimmt der Mensch.** Reihenfolge der Preisfindung:
   1. historische Preise des Kunden, 2. Erfahrungswerte je Projekttyp,
   3. Vorschlag machen — aber die finale Zahl bestätigt immer der Nutzer.
5. **Suchen vor Anlegen** — gilt für alles: Kontakte, Projekte, Termine
   (Dublettencheck im Zeitraum), Aufgaben, Dokumente.
6. **Nichts löschen ohne Rückfrage.**
7. **Testdaten:** Tests nur mit Julian Amini (customer_id 5711737).
8. **Beobachtungen loggen.** Korrigiert der Nutzer Preise, Positionen oder
   Abläufe, fehlt eine erwartete Katalogposition, oder weicht die versendete
   Fassung vom Entwurf ab: als Rohbeobachtung ins Lernlog eintragen
   (`vault/03 AI/Lernlog/Lernlog Bauprozess.md`,
   append-only, Format steht dort). Keine eigenen Regeln daraus ableiten —
   Destillation und Beförderung entscheidet Julian im Review.

## Wissensquellen

- Prozessdetails & Backlog: Vault-Prozessnotiz (oben verlinkt)
- API-Stolperfallen: `vault/02 Technik/Hero/Praxiswissen (verifiziert)/`
- Projektarten-Erfahrungswerte (typische Positionen, Preisanker, Cross-Selling):
  `vault/00 Betrieb/Projekttypen-Wissensbasis.md` —
  Status ENTWURF (Cluster-Review durch Julian aussteht); als Orientierung
  nutzbar, finale Preise bestätigt immer der Nutzer.
