---
tags: [technik, hero, graphql]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Dokument-Entwürfe ändern und ersetzen, Stand 2026-07-12); Spot-Check Schema/Live bestanden 2026-07-18, Review Julian 2026-07-18
---

# HERO GraphQL API – Dokument-Entwürfe ändern und ersetzen

Stand: 12.07.2026, verifiziert per Live-Tests (hero-tools) am Testprojekt UNB-144.

## Grundsatz (Prozessregel GRÜNSCHNITT)

Der KI-Agent erzeugt Angebote und Rechnungen **ausschließlich als Entwurf** (`publish: false`, hart codiert). Der finale Versand an den Kunden erfolgt **immer durch einen Menschen** im Hero-Frontend. Die Mutation `transition_customer_document_status` (Statuswechsel/Veröffentlichung) ist in hero-tools **bewusst nicht angebunden** — der Agent kann technisch nicht versenden.

## Entwurf ändern = Ersetzen

Ein `update_document` existiert nicht in der Partner-API (Introspection 12.07.2026). Änderungs-Pattern:

1. Neuen Entwurf mit geänderten Positionen anlegen (`create_document`)
2. **Erst nach erfolgreichem Anlegen** den alten löschen (`delete_document(document_id)`)

So geht bei einem Fehler im Anlegen nichts verloren. In hero-tools: `dokument angebot|rechnung --ersetzt <alte_id>`.

## status_code und status_name bei CustomerDocument (beobachtet/verifiziert)

| Code | Bedeutung |
|------|-----------|
| 0 | aktiver Entwurf |
| 1000 | soft-gelöscht (bleibt in `customer_documents` sichtbar!) |

**Wichtiger für Auswertungen ist `status_name`** (verifiziert 13.07.2026): Werte
"Erstellt", "Versendet", **"Storniert"**. Eine per Stornorechnung aufgehobene
Originalrechnung behält ihren status_code (z. B. 600), trägt aber
`status_name: "Storniert"` — **für Umsatzanalysen zwingend ausfiltern**, sonst
zählt man stornierte Umsätze mit (Differenz zum Hero-Dashboard!). Außerdem:
`value`/`vat` = offizieller Netto-Belegwert und Steuer — für Summen `value`
verwenden statt eigener Positionsrechnung. Der Bezahlt-/Offen-Status steckt
NICHT in status_name, sondern im Payment-Bereich (create_payment,
transition_payment_relevance_status — noch unerkundet).

Beim Lesen von Dokumentlisten gelöschte Einträge (`status_code: 1000`) herausfiltern. Unveröffentlichte Entwürfe tragen Platzhalter-Nummern ("AN-xxxx" / "RE-xxxx") — die echte Nummer entsteht erst beim Veröffentlichen.

## Notizen

- Tool-Anbindung: hero-tools `dokument liste / loeschen / angebot / rechnung [--ersetzt]`
- Teil von [[Prozess Bauprojekt End-to-End]] (B3/B7); Kontrollprinzip siehe dort
