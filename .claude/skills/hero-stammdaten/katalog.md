# Katalog-Stammdaten (Produkte & Leistungen)

## Geschäftsfall

Der Katalog ist die einzige erlaubte Quelle für Angebots- und
Rechnungspositionen: `nr`, `name` und `vat_percent` werden **nie erfunden**,
sondern immer 1:1 aus dem Katalog übernommen. Fehlt eine Position, wird sie
erst hier als Stammdatum angelegt — dann erst darf sie auf ein Dokument.

Hero arbeitet nach dem **Skelett-Prinzip**: Katalogeinträge tragen Preis 0,00.
Die echten Preise und individuellen Beschreibungen entstehen erst bei der
Dokumenterstellung. Deshalb ist ein Katalogeintrag schnell angelegt — er ist
nur Name + Nummer + Einheit + Steuersatz.

## 1. Suchen (immer zuerst)

```bash
tools/hero-tools/hero katalog produkte --suche "Splitt"      # Material
tools/hero-tools/hero katalog leistungen --suche "Bagger"    # Arbeit/Maschinen/Entsorgung
```

Abgrenzung: **Produkte** = physisches Material (Steine, Pflanzen, Erde).
**Leistungen** = Arbeitszeit, Maschinen, Entsorgung. Vor dem Anlegen beide
Kataloge mit mehreren Suchbegriffen prüfen (Synonyme: Splitt/Kies,
Platten/Pflaster) — die Suche matcht auch Beschreibungstexte.

## 2. Anlegen (nur wenn Suche leer)

```bash
tools/hero-tools/hero katalog leistung-anlegen --name "Steinreinigung Terrasse" --einheit m² --kreis 2000
tools/hero-tools/hero katalog produkt-anlegen --name "Rasensamen Schattenrasen" --einheit kg --mwst 19 --kreis 5000
```

Die nächste freie Nummer im Kreis vergibt das Tool automatisch — nie selbst rechnen.

### Nummernkreise

| Kreis | Art | Inhalt |
|-------|-----|--------|
| 1000 | Leistung | Personal & Arbeitszeit |
| 2000 | Leistung | Maschinen & Fuhrpark |
| 3000 | Leistung | Entsorgung |
| 4000 | Produkt | Schüttgüter & Erden (Sand, Kies, Rindenmulch) |
| 5000 | Produkt | Pflanzen, Samen & Dünger |
| 6000 | Produkt | Baustoffe & Steine (Beton, Rohre, Zäune, Pflaster) |
| 7000 | Produkt | Spezialbedarf (z. B. Reinigungsmittel) |

### Mehrwertsteuer

19 % ist der Regelfall. **7 % ausschließlich** für lebende Pflanzen, Samen,
Rollrasen, Rindenmulch und reine Pflanzerde. Im Zweifel 19 % und den Nutzer
fragen — ein falscher Steuersatz landet auf Rechnungen.

### Einheiten (Whitelist, das Tool validiert)

Std, pauschal, Stk, m², m³, m, lfm, to, kg, L, Tag(e), Monat(e), km, %,
SRM, Sack, Plt, Ro

## Hintergrundwissen

Verifizierte API-Details (product_id ist String-Hash, `is_fixed_net_price`
bei Preisen zwingend, Soft-Delete): Vault
`vault/02 Technik/Hero/Praxiswissen (verifiziert)/`.
