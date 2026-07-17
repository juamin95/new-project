---
tags: [prozess, supportprozess, buchhaltung]
status: erfasst
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Prozess Belegfluss Buchhaltung, Stand 2026-07-12); Review Julian 2026-07-18, Vervollständigung offen
---

# Prozess Belegfluss Buchhaltung (inkl. Zahlung & Mahnwesen)

Supportprozess S3 der Prozesslandkarte. Verantwortung: Julian. Nimmt Belege aus B5 (Eingangsrechnungen Material) und B7 (Ausgangsrechnungen) des [[Prozess Bauprojekt End-to-End]] auf. Übergabepunkt: Sobald Marvin die Rechnung erstellt hat, ist er raus — ab da läuft alles hier.

**Erfassungsstand:** Grundgerüst, bei Bedarf nachpflegen.

## Eingangsrechnungen (bereits teilautomatisiert)

n8n-Workflow "Email Classifier":
1. Eingehende E-Mail wird als Rechnung erkannt
2. Verschiebung in den Eingangs-Ordner des Strato-Postfachs
3. Upload nach DATEV per DATEV-E-Mail-Upload
4. In DATEV: Überweisung erstellen, oder bei Lastschrift die Zahlung dem Beleg zuordnen

## Ausgangsrechnungen

- Rechnungen werden automatisch in DATEV hochgeladen
- Julian prüft Zahlungseingänge
- Mahnwesen bei überfälligen Rechnungen (Details nachpflegen: Fristen, Eskalationsstufen)

## Systeme

Strato-Postfach, n8n, DATEV, Hero (Rechnungsdaten)
