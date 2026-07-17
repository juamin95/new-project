---
tags: [prozess, kernprozess, abo]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Prozess Abo-Einsatz, Stand 2026-07-14); Hero-Abgleich bestanden 2026-07-18 (inkl. Wartungsvertrag 96920 live geprüft), Review Julian 2026-07-18
---

# Prozess: Abo-Einsatz (Dauerpflege über Wartungsverträge)

Der wiederkehrende Kernprozess-Weg (Entscheidung 14.07.2026, Teil des Zielbilds in der [[Prozesslandkarte]]): Die ~20 Dauerpflege-Objekte (Objektpflege gewerblich, Gartenpflege-Abos) laufen automatisiert über Hero-**Wartungsverträge**.

## Mechanik

1. **Je Dauerkunde/Objekt ein Wartungsvertrag** (Hero UI: Wartungsverträge): Laufzeit, Intervall (z. B. monatlich), Erinnerung vor Fälligkeit an Marvin (Test-Vertrag 96920: 4 Wochen; Stand Live-Abgleich 18.07.2026).
2. **Aktion bei Fälligkeit: "Projekt anlegen (Abo)"** — Hero erzeugt automatisch je Intervall ein Projekt vom Typ "Abo" (65869) im Status "offener Auftrag".
3. Das Abo-Board (Projekte → Abo) ist damit das **Operations-Radar**: Alles was auf "offener Auftrag" steht, muss eingeplant werden.

## Ablauf je Einsatz (Hero-Projekttyp "Abo", 65869)

| Schritt | Hero-Status (Code) | Inhalt |
|---|---|---|
| 0 | — | **Gewerk nachpflegen**: Automatik erzeugt UNB → `hero projekt gewerk --gewerk abo` (wird GABO-…) |
| 1 | offener Auftrag (201) | vom Wartungsvertrag erzeugt |
| 2 | Termin festgelegt (1101) | Einsatztermin im Kalender |
| 3 | In Umsetzung (1111) | Einsatz; Besonderheiten ins Logbuch |
| 4 | Abgeschlossen (2000) | fertig — **keine Rechnung im Projekt** |

## Abrechnung: Jahresrechnung am Kunden

Entscheidung 14.07.2026: Abo-Kunden erhalten **Jahresrechnungen, die direkt am Kunden hängen** (nicht an einem der 12 Monats-Projekte) — das Vertragsverhältnis ist die Rechnungsebene, die Projekte sind reine Steuerung. Erstellung durch Marvin/Julian; Grundlage sind die Logbuch-Einträge der Abo-Projekte (Mehraufwand, Zusatzleistungen).

**Auswertbarkeit:** Da die Jahresrechnung am Kunden-Container hängt (Gewerk "Kontakt"), markiert der Belege-Export jeden Kunden mit ≥1 GABO-Projekt als `abo_kunde` — so bleibt der ABO-Umsatz ohne Handarbeit auswertbar (Belege-Export, Feld `abo_kunde`).

## Regeln

- Wartungsverträge sind der Taktgeber — **Anlage nur im Hero-UI** (keine create-Mutation); Ändern per API möglich (`update_field_service_object`, z. B. Aktion — Vorsicht: Update berechnet `recurring_next` neu), aber nur auf ausdrückliche Anweisung.
- Gewerk-Nachpflege ist Pflicht (Schritt 0), sonst fehlt der Einsatz in der GABO-Auswertung.
- Archivierung abgeschlossener Monats-Projekte gesammelt auf Zuruf.

## Umsetzung

Skill: `.claude/skills/abo/` · Tools: hero-tools CLI (`projekt gewerk`, Export-Feld `abo_kunde`) · Status: umgesetzt und Praxistest bestanden 14.07.2026 (GABO-156, kompletter Durchlauf inkl. Gewerk-Nachpflege); Test-Wartungsvertrag 96920 auf Aktion 'Projekt anlegen (Abo)' umgestellt, erster automatischer Lauf 13.09.2026 (`recurring_next`, Live-Abgleich 18.07.2026 — die Aktions-Umstellung hat `recurring_next` neu berechnet, ursprünglich war ~13.08. erwartet).
