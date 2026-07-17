---
tags: [prozess, supportprozess, stammdaten]
status: erfasst
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Prozess Kundenstammdaten, Stand 2026-07-12); Review Julian 2026-07-18, Vervollständigung offen
---

# Prozess Kundenstammdaten (Kontakt & Adressen)

Supportprozess S2 der Prozesslandkarte. Wird vorausgesetzt von B1 und B3 im [[Prozess Bauprojekt End-to-End]]: Ohne angelegten Kunden kein Projekt, kein Angebot.

**Erfassungsstand:** aus n8n-Agent abgeleitet, bei Bedarf nachpflegen.

## Regeln

**Dublettenschutz:** Vor jedem Anlegen wird nach Name/Firma gesucht. Bei Treffern wird der bestehende Kontakt verwendet; bei mehreren Treffern entscheidet der Mensch.

**Kontaktfelder (Hero):**
- `category`: customer / supplier / partner
- `type`: private (Person) / commercial (Firma — dann `company_name` Pflicht)
- `title` (Herr/Frau), `last_name` Pflicht; optional `first_name`, `email`, Telefon, Adresse

**Adresslogik (wichtig, häufige Fehlerquelle):**
- Die Hauptadresse hängt direkt am Kontakt (`address_id`).
- Baustellen-/Projektadressen werden als `customer_addresses` angelegt. Achtung: deren äußere `id` ist nur die Verknüpfungs-ID — für Projekte zählt die **innere `address.id`** (die echte, physische Adress-ID).

## Systeme

Hero (contacts, create_contact mit `findExisting: true`, update_contact, create_customer_address) — Tool-Anbindung über hero-tools (`kontakt`-Modul).
