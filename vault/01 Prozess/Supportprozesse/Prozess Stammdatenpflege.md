---
tags: [prozess, supportprozess, stammdaten]
status: erfasst
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Prozess Stammdatenpflege, Stand 2026-07-12); Review Julian 2026-07-18, Vervollständigung offen
---

# Prozess Stammdatenpflege (Katalog: Produkte & Leistungen)

Supportprozess S1 der [[Prozesslandkarte]]. Wird vorausgesetzt von B3 (Angebot) und B7 (Rechnung) im [[Prozess Bauprojekt End-to-End]]: Jede Angebots-/Rechnungsposition muss aus dem Katalog stammen — Positionen werden nie erfunden.

**Erfassungsstand:** aus n8n-Agent abgeleitet, bei Bedarf nachpflegen.

## Regeln

**Suchen vor Anlegen:** Vor jedem Neuanlegen wird der Katalog geprüft (Name + Einheit). Existiert die Position, wird sie verwendet — keine Dubletten.

**Nummernkreise** (nächste freie Nummer im Kreis = höchste vorhandene + 1):

| Kreis | Art | Inhalt |
|-------|-----|--------|
| 1000 | Leistung | Personal & Arbeitszeit |
| 2000 | Leistung | Maschinen & Fuhrpark |
| 3000 | Leistung | Entsorgung |
| 4000 | Produkt | Schüttgüter & Erden (Sand, Kies, Rindenmulch) |
| 5000 | Produkt | Pflanzen, Samen & Dünger |
| 6000 | Produkt | Baustoffe & Steine (Beton, Rohre, Zäune, Pflaster) |
| 7000 | Produkt | Spezialbedarf (z. B. Reinigungsmittel) |

**Skelett-Katalog-Prinzip (Hero):** Katalogeinträge sind Skelette (Preis 0,00). Echte Preise und Beschreibungen werden erst bei der Dokumenterstellung gesetzt. Bei Leistungen mit Preis ist `is_fixed_net_price: true` zwingend, sonst setzt Hero den Preis still auf 0.

**Mehrwertsteuer:** 19 % Regelsatz. 7 % ausschließlich für lebende Pflanzen, Samen, Rollrasen, Rindenmulch und reine Pflanzerde.

**Einheiten (unit_type, Whitelist):** Std, pauschal, Stk, m², m³, m/lfm, to, kg, L, Tag(e), Monat(e), km, %, SRM, Sack, Plt, Ro.

## Systeme

Hero (supply_services, supply_product_versions) — Tool-Anbindung über hero-tools (`katalog`-Modul).
