# Kundenstammdaten (Kontakte & Adressen)

## Geschäftsfall

Marvin nimmt Anfragen über Telefon, WhatsApp und E-Mail an. Jeder Kunde muss
genau einmal in Hero existieren — Dubletten führen zu verstreuten Projekten
und falscher Preishistorie. Adressen haben zwei Rollen: die Hauptadresse
(Rechnungsadresse) und ggf. abweichende Baustellen-/Projektadressen.

## 1. Suchen (immer zuerst)

```bash
tools/hero-tools/hero kontakt suchen "Nachname oder Firma"
```

Liefert `id` (= customer_id), Hauptadresse (`address_id`) und alle
`customer_addresses`. Suche großzügig interpretieren: auch Teilnamen und
alternative Schreibweisen probieren, bevor ein Neukontakt angelegt wird.

## 2. Anlegen (nur wenn Suche leer)

```bash
tools/hero-tools/hero kontakt anlegen --nachname "Mustermann" --vorname "Max" \
  --anrede Herr --strasse "Musterstr. 1" --plz 50996 --ort Köln \
  --email max@example.de --mobil "0171 1234567"
```

- `--typ commercial` erfordert zwingend `--firma` (sonst Fehler).
- Kategorien: `customer` (Standard), `supplier`, `partner`.
- Das Tool nutzt `findExisting: true` als zweites Sicherheitsnetz gegen Dubletten.
- Die zurückgegebene `id` für alle Folgeschritte verwenden und dem Nutzer nennen.

## 3. Ändern

```bash
tools/hero-tools/hero kontakt bearbeiten --id 4711 --mobil "0172 9999999"
```

Nur die zu ändernden Felder angeben. Erst suchen, ID bestätigen lassen, dann ändern.

## 4. Baustellen-/Projektadresse hinzufügen

```bash
tools/hero-tools/hero kontakt adresse --kunde 4711 --strasse "Baustellenweg 5" --plz 51109 --ort Köln
```

> **Wichtigste Stolperfalle der ganzen Kundenverwaltung:** Die Antwort enthält
> zwei IDs. Die äußere `id` ist nur die Verknüpfung (Adressbuch-Eintrag).
> Für Projekte zählt ausschließlich die **innere `address.id`** — das Tool
> gibt sie als `address_id_fuer_projekt` aus. Verwechslung = Projekt hängt
> an der falschen Adresse.

## Feldübersicht Kontakt

| Feld | Werte / Format | Pflicht |
|------|----------------|---------|
| category | customer / supplier / partner | ja (Default customer) |
| type | private / commercial | ja (Default private) |
| last_name | Nachname | ja |
| company_name | Firmenname | nur bei commercial |
| title | Herr / Frau | empfohlen |
| first_name, email, telefon, mobil | frei | optional |
| address | street, zipcode, city | empfohlen |
