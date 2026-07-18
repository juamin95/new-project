# hero-tools

CLI-Tools für die Hero Software GraphQL API des GRÜNSCHNITT-Betriebs.
Ebene 1 (Fähigkeiten) des KI-Betriebssystems: ein Unterbefehl je atomarer Operation.
Prozesswissen liegt NICHT hier, sondern in den Skills des Vault-Repos;
die Prozessmodelle liegen im Vault unter `03 Bereiche/Grünschnitt (Betrieb Bruder)/Prozesse/`.

## Setup

- `.env.local` mit `HERO_API_KEY=...` (nicht im Git)
- `python3 -m venv venv && ./venv/bin/pip install requests python-dotenv`

## Befehle

```
./hero kontakt suchen "Amini"
./hero kontakt anlegen --nachname ... [--vorname --anrede --typ --firma --email --strasse --plz --ort]
./hero kontakt bearbeiten --id ... [Felder]
./hero kontakt adresse --kunde <customer_id> --strasse ... --plz ... --ort ... [--titel "Baustelle X"]

./hero projekt suchen [--suche ...] [--kunde <id>] [--typ project|copcontact|alle]
                                    # "alle" fragt beide Typen ab (Historie hängt am KONT-Container!)
./hero projekt anlegen --name JJJJMMTT_Kunde_Schlagwort --kunde <id> --adresse <address_id> [--gewerk gartengestaltung|gartenpflege|abo] [--projekttyp projekt|ohne-angebot|abo]
./hero projekt gewerk --id <project_match_id> --gewerk abo   # Nummern-Präfix wechselt mit (UNB-152 -> GABO-152)
./hero projekt status --id <project_match_id> --code <status_code>
./hero projekt logbuch --projekt <id> --text "..."
./hero projekt logbuch-lesen --projekt <id>
./hero projekt aufgaben --projekt <id> [--offen]
./hero projekt aufgabe-anlegen --projekt <id> --titel ... [--kommentar ...] [--faellig "2026-07-20 12:00"]
./hero projekt aufgabe-aendern --id <task_id> [--titel --kommentar --faellig]
./hero projekt aufgabe-erledigt --id <task_id>
./hero projekt aufgabe-loeschen --id <task_id>
./hero projekt checklisten --projekt <id>
./hero projekt checkliste-anlegen --projekt <id> --name ... --punkt "..." [--punkt ...] [--frage "..."]
./hero projekt checkliste-befuellen --id <checklisten_id> --punkt "..." [--frage "..."]
./hero projekt checkliste-abhaken --projekt <id> --id <checklisten_id> --label "<Teilstring>" [--text ...] [--kein-haken]
./hero projekt checkliste-loeschen --id <checklisten_id>

./hero kalender kategorien
./hero kalender termine --von "2026-07-01 00:00" --bis "2026-07-31 23:59"
./hero kalender anlegen --titel ... --von "2026-07-20 09:00" --bis "..." --kategorie vor-ort-termin [--projekt <project_match_id>] [--beschreibung ...]
./hero kalender aendern --id <event_id> [--titel --von --bis --beschreibung]
./hero kalender loeschen --id <event_id>

./hero katalog produkte [--suche ...]
./hero katalog leistungen [--suche ...]
./hero katalog produkt-anlegen --name ... --einheit Stk --mwst 19 --kreis 4000|5000|6000|7000
./hero katalog leistung-anlegen --name ... --einheit Std --kreis 1000|2000|3000

./hero dokument liste --projekt <project_match_id>      # "geloescht": true = soft-gelöscht, ignorieren
./hero dokument positionen --id <document_id>           # Positionen aus dem JSON-Tresor (nur veröffentlichte)
./hero historie rechnungen --kunde <customer_id> [--auch-angebote]   # Preishistorie live, neuester Beleg zuerst
./hero dokument angebot  --projekt <id> --anrede "Herr X" --positionen pos.json [--ersetzt <alte_doc_id>]
./hero dokument rechnung --projekt <id> --anrede "Herr X" --positionen pos.json [--ersetzt <alte_doc_id>]
./hero dokument loeschen --id <document_id>             # nur Entwürfe

./hero query --datei abfrage.graphql   # Escape-Hatch für Erkundung (auch: echo 'query {...}' | ./hero query)
```

## Regeln in Code (nicht im LLM)

- Nummernkreis-Vergabe (höchste Nummer im Kreis + 1, paginiert ermittelt)
- Text→HTML für Positionsbeschreibungen (`<ul><li>`)
- Validierung: Einheiten-Whitelist, MwSt 19/7, Pflichtfelder
- Dokumente immer als Entwurf (`publish: false`) — Versand macht Marvin aus Hero
- DateTime immer ISO 8601 mit Offset (Eingabe "JJJJ-MM-TT HH:MM" wird als Europe/Berlin interpretiert)
- Katalog-Neuanlagen als Skelett (Preis 0.00), `is_fixed_net_price: true`

## Testdaten

Alle Tests laufen gegen den Testkontakt **Julian Amini** (customer_id 5711737).
Aufräumen per Soft-Delete.
