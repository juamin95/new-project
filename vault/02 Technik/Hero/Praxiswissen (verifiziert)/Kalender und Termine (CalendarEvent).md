---
tags: [technik, hero, graphql]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Kalender und Termine (CalendarEvent), Stand 2026-07-09); Spot-Check Schema/Live bestanden 2026-07-18, Review Julian 2026-07-18
---

# HERO GraphQL API – Kalender & Termine (CalendarEvent)

Stand: 07/2026, verifiziert per Live-Introspektion und Testläufen gegen `https://login.hero-software.de/api/external/v7/graphql` (n8n GraphQL-Node, Header Auth).

## 1. Verfügbare Operationen (verifiziert)

Die Partner-API erlaubt für Kalendertermine **Lesen, Anlegen, Ändern und Löschen**.

| Operation | Status | Weg |
|---|---|---|
| Lesen (Zeitraum) | funktioniert | `calendar_events(start, end, ...)` |
| Lesen (Suche) | funktioniert | `search_calendar_events(search, ...)` |
| Kategorien lesen | funktioniert | `calendar_event_categories` |
| Erstellen | funktioniert (verifiziert 09.07.2026) | `create_calendar_event(calendar_event: CalendarEventInput)`, `category_id` PFLICHT |
| Ändern | funktioniert (laut Schema) | `update_calendar_event(calendar_event: CalendarEventInput)` |
| Löschen | funktioniert (Soft-Delete) | `delete_calendar_event(id: Int)` |

**Korrektur (verifiziert 09.07.2026):** Anders als zunächst angenommen, sind `create_calendar_event` und `update_calendar_event` sehr wohl im Schema vorhanden und ausführbar. Beide tragen ein *veraltet*-Flag (Hinweis „Use `Calendar_CreateCalendarEvent` / `Calendar_UpdateCalendarEvent` instead"), funktionieren aber. Der empfohlene Nachfolger `Calendar_*CalendarEvent` ist in der Partner-API dagegen NICHT freigeschaltet (nicht im Schema-Dump).

Erfolgreicher Anlege-Test (n8n, Header Auth): Termin mit `title`, `category_id`, `start`, `end`, `all_day` angelegt → `id` zurück, Termin im HERO-Frontend sichtbar. Wichtig beim Anlegen:
- `category_id` ist **Pflichtfeld** (sonst Fehler `category_id.missing_category`: „Bitte wählen Sie eine Kategorie aus"). IDs siehe Abschnitt `calendar_event_categories` in Kapitel 2.
- `provider` ist beim API-Anlegen `null` (nicht `"scheduler"`) – unterscheidet API-erzeugte von Frontend-Terminen.
- `readonly: false` → der Termin ist danach normal bearbeitbar.
- Die DateTime-Format-Regel aus Kapitel 4 gilt auch hier (ISO 8601 mit Offset).

## 2. Queries

### calendar_events – Lesen per Zeitraum

Argumente (alle optional): `start` (DateTime), `end` (DateTime),
`project_match_id` (Int), `partner_ids` [Int], `resource_ids` [Int],
`show_deleted` (Boolean), `ids` [Int], `orderBy`, `first`, `last`, `offset`.

```graphql
query CalendarEvents {
  calendar_events(
    start: "2026-07-01T00:00:00+00:00"
    end: "2026-07-31T23:59:59+00:00"
    show_deleted: false
    first: 50
  ) {
    id
    title
    description
    start
    end
    all_day
    category { id name color }
    partners { id full_name email }
    resources { id name }
    project_match { id name project_nr customer { full_name } }
    is_done
    is_recurring
    provider
  }
}
```

Vollständige Feldliste `CalendarEvent`: `id`, `title`, `description`,
`start`, `end`, `all_day`, `category`/`category_id`,
`project_match`/`project_match_id`, `partners` (zugewiesene Mitarbeiter,
Typ Partner: id, first_name, last_name, full_name, email, phone, mobile),
`resources` (Geräte/Fahrzeuge, getrennt von Mitarbeitern), `is_done`,
`is_recurring`, `provider`, `color`, `deleted`, `readonly`, `created`,
`modified`.

Nicht verfügbar: Wer den Termin ANGELEGT hat (Frontend-Spalte
"Erstellt von") – kein author-/created_by-Feld im Schema. Sichtbar sind
nur die zugewiesenen Mitarbeiter (`partners`).

### search_calendar_events – Volltextsuche

Sucht über Event-, Kunden- und Projektname. `startDate` ist hier ein **String**, kein DateTime-Scalar.

```graphql
query SearchEvents {
  search_calendar_events(search: "{{ SUCHBEGRIFF }}", first: 10) {
    id
    title
    start
    end
  }
}
```

### calendar_event_categories – Kategorien mit IDs

Liefert die Frontend-Kategorien (Umsetzung, Vor-Ort-Termin, Büro, Besprechung, ...) mit ihren IDs.

```graphql
query Categories {
  calendar_event_categories(show_deleted: false) {
    id
    name
    color
  }
}
```

Verifizierte Kategorien (Stand 09.07.2026):

| ID | Name | Farbe |
|---|---|---|
| 343945 | Umsetzung | #009688 |
| 343946 | Vor-Ort-Termin | #C0CA33 |
| 343947 | Schlechtwetter | #D81B60 |
| 343948 | Büro | #7986CB |
| 343949 | Besprechung | #795548 |
| 343950 | Schule | #EF6C00 |

## 3. Mutation

### create_calendar_event – Termin anlegen (verifiziert 09.07.2026)

Anlegen funktioniert. `category_id` ist Pflicht, der Rest ist optional. Empfohlener Voll-Datensatz: `title`, `description`, `category_id`, `start`, `end`, `all_day`, `partner_ids`, `project_match_id`.

#### Felder im `CalendarEventInput`

| Feld | Status | Bedeutung | Herkunft |
|---|---|---|---|
| `category_id` | PFLICHT | Terminkategorie | Query `calendar_event_categories` (Stammdaten) |
| `title` | empfohlen | Titel des Termins | frei |
| `description` | optional (verifiziert) | Beschreibungstext | frei |
| `start` / `end` | empfohlen | Zeitraum, ISO 8601 mit Offset (siehe Kapitel 4) | frei |
| `all_day` | optional | Ganztägig ja/nein | frei |
| `partner_ids` | optional (empfohlen) | ausführende Mitarbeiter (Liste) | Query `user` bzw. `partner_birthdays` |
| `project_match_id` | optional | Bezug zu Projekt/Kontakt | Query `project_matches` (siehe Kette unten) |

#### Vorgelagerte Schritte (Voraussetzungen)

Bevor ein vollständiger Termin angelegt werden kann, müssen drei Werte beschafft werden:

**1. `category_id` (Pflicht) — Stammdaten, ändern sich selten → einmal abrufen und im Tool cachen.**
```graphql
query Categories {
  calendar_event_categories(show_deleted: false) { id name color }
}
```
Verifizierte IDs siehe Kapitel 2 (Büro 343948, Umsetzung 343945, ...).

**2. `partner_ids` (optional, aber empfohlen) — die ausführende Person. Ebenfalls selten ändernd → cachebar.**
```graphql
# eigener/aktueller User (Token-Inhaber)
query MeinPartner { user { partner { id full_name email } } }

# alle Mitarbeiter (pragmatisch über anstehende Geburtstage)
query Mitarbeiter {
  partner_birthdays(nextDays: 366) { partner_id partner { full_name email } }
}
```
Beispiel: Token hängt am Account Marvin Amini → `partner_id` 134384.

**3. `project_match_id` (für Termin an Kunde/Kontakt) — die WICHTIGSTE Abhängigkeit.**

> [!warning] project_match_id ≠ Kunden-/Kontakt-ID
> Am Termin hängt die **`project_match.id`**, NICHT die Kunden-/Kontakt-ID. Der `project_nr` (`KONT-<n>`) enthält die Kontakt-ID, die project_match.id ist eine andere Nummer. Verwechslung = falsche Zuordnung.

Abhängigkeitskette (verifiziert):
1. Kunde/Kontakt finden → dessen **`customer_id`** (z. B. per `project_matches(search: "Name")` oder Kontakt-Query).
2. Zum `customer_id` das passende `project_match` holen und dessen **`id`** auslesen:
```graphql
query FindeProjectMatch {
  project_matches(type: "copcontact", customer_id: 5711737) {
    id
    project_nr
    customer { id full_name }
  }
}
```
3. Diese `id` als `project_match_id` in die Anlege-Mutation einsetzen.

Konkretes Beispiel: Kontakt „Herr Julian Amini", `customer_id` 5711737 → `project_matches(type: "copcontact", customer_id: 5711737)` → **project_match.id 8412011** (`project_nr` KONT-5711737) → im Termin `project_match_id: 8412011`.

Prefix-Regel: `project_nr` mit `UNB-` = echtes Projekt (`type: "project"`), `KONT-<n>` = Kontakt (`type: "copcontact"`), wobei `n` = Kontakt-/Kunden-ID.

#### Vollständige Anlege-Mutation (verifiziert)

```graphql
mutation CreateEvent {
  create_calendar_event(calendar_event: {
    title: "{{ TITEL }}"
    description: "{{ BESCHREIBUNG }}"
    category_id: 343948          # Pflicht, aus calendar_event_categories
    start: "2026-07-23T09:00:00+00:00"
    end: "2026-07-23T10:00:00+00:00"
    all_day: false
    partner_ids: [134384]        # ausführende Person(en)
    project_match_id: 8412011    # = project_match.id (nicht Kontakt-ID!)
  }) {
    id
    title
    description
    category { id name }
    start
    end
    partners { id full_name }
    project_match { id project_nr customer { full_name } }
    provider
    readonly
  }
}
```

Verifiziert: `title`, `description`, `category`, `start`, `end`, zugewiesene `partners` (Marvin Amini 134384) und `project_match` (KONT-5711737, Julian Amini) kommen korrekt zurück und sind im HERO-Frontend sichtbar.

### delete_calendar_event – Soft-Delete

```graphql
mutation DeleteEvent {
  delete_calendar_event(id: {{ EVENT_ID }}) {
    __typename
  }
}
```

Soft-Delete: Der Termin bleibt erhalten und ist über `show_deleted: true` weiterhin abrufbar. Lese-Queries in Automatisierungen daher immer mit `show_deleted: false`, sonst werden gelöschte Termine mitgeschleppt.

## 4. KRITISCH: DateTime-Format

Der DateTime-Scalar akzeptiert ausschließlich ISO 8601 mit T-Separator und explizitem Zeitzonen-Offset:

```
start: "2026-07-01T00:00:00+00:00"
```

Andere Formate (`"2026-07-01 00:00:00"` mit Leerzeichen, fehlender Offset) führen NICHT zu einer Validierungsfehlermeldung, sondern zu einem generischen **"Internal server error"**. Bei diesem Fehler an `calendar_events` (oder anderen DateTime-Argumenten wie bei `field_service_jobs`, `tasks`) immer zuerst das Datumsformat prüfen.

Faustregel zum Format-Finden: Query ohne Datumsfilter ausführen und das Format der zurückgegebenen `start`/`end`-Felder als Input-Format übernehmen. In n8n liefert `{{ $now.toUTC().toISO() }}` (Luxon) direkt das korrekte Format.

## 5. Verhalten ohne Zeitraumfilter

`calendar_events` ohne `start`/`end` liefert nur aktuelle/zukünftige Termine. Für historische Termine immer explizit einen Zeitraum angeben. Ein leeres Ergebnis-Array bedeutet also nicht zwingend "keine Termine".

## 6. Workarounds für terminähnliche Schreiboperationen

### Aufträge (field_service_jobs)

`FieldService_Job` entspricht dem HERO-Objekt "Auftrag" (Frontend: Aufträge, Nummernkreis JOB-xxx, Status-Pipeline Offen/Zugewiesen/Erledigt/Rechnung/Abgeschlossen/Archiviert) – ein eigenes Fachobjekt mit Lebenszyklus, **KEIN** Kalendertermin.

Das Frontend-Formular "Auftrag hinzufügen" deckt sich 1:1 mit den Schema-Feldern (`customer_id`, `contact_id`, `address_id`, `title`, `type`, `status_code`, `description`, `start`, `end`, `partners`). Voll schreibbar: `create_field_service_job` / `update_field_service_job` mit `FieldService_JobInput`, Mitarbeiter-Zuweisung über `add_field_service_job_assignment(job_id, partner_id)` / `remove_field_service_job_assignment`.

Fachlich oft das bessere Zielobjekt als ein Termin (disponierbarer Prozessschritt statt Kalendereintrag). Schreibtest steht noch aus – vor Nutzung Input-Struktur per Level-3-Introspektion prüfen:

```graphql
__type(name: "FieldService_JobInput") { inputFields { name type { kind name ofType { kind name } } } }
```

### ICS-Import

`create_calendar_import` (mit `CalendarImportInput` und `partner_ids`) bindet einen externen Kalender-Feed ein, z. B. aus n8n generiert. Termine erscheinen im HERO-Kalender, sind aber readonly (`provider`-Feld gesetzt). Dazu: `update_calendar_import`, `delete_calendar_import(uid: String)`, `create_calendar_share_link`.

Manueller Schritt: Agent erkennt/prüft Termine (Dubletten- und Konfliktprüfung per Range-Read), das Anlegen erfolgt manuell im Frontend nach Benachrichtigung.

## 7. Testprotokoll (Referenz)

Durchgeführt am 06.07.2026:

1. Read ohne Filter → leeres Array (nur zukünftige Termine, keine vorhanden)
2. Read mit `"2025-07-01 00:00:00"` (Leerzeichen) → Internal server error
3. `search_calendar_events(search: "...")` → Treffer, natives Datumsformat sichtbar: `2025-07-17T08:00:00+00:00`
4. Read mit ISO-Format + Offset → Erfolg, Testtermin inkl. Kategorie und `project_match_id` zurückgeliefert
5. `delete_calendar_event(id: ...)` → Erfolg, Rückgabe `__typename: "CalendarEvent"`
6. Read mit `show_deleted: true` → gelöschter Termin weiterhin sichtbar (Soft-Delete bestätigt)
7. Erweiterter Read am 07.07.2026 mit description, partners, resources
   und verschachteltem project_match → Erfolg; partners liefert
   zugewiesene Mitarbeiter inkl. full_name und email
8. Anlege-Test am 09.07.2026 via `create_calendar_event` (title,
   category_id 343948, start, end, all_day) → Erfolg, id 5774654 zurück,
   Termin im Frontend sichtbar (`provider` null, `readonly` false).
   Danach per `delete_calendar_event` wieder aufgeräumt.
9. Anlege-Test am 09.07.2026 mit `partner_ids: [134384]` → Person zugewiesen,
   `partners` liefert Marvin Amini zurück, im Frontend als Mitarbeiter sichtbar.
10. Anlege-Test am 09.07.2026 mit `partner_ids` + `project_match_id: 8412011`
    + `description` → voller Termin: Kontakt KONT-5711737 (Julian Amini),
    ausführende Person Marvin, Beschreibung – alles korrekt zurück und im
    Frontend sichtbar. project_match.id (8412011) ≠ Kontakt-ID (5711737) bestätigt.

## 8. Datenmodell-Erkenntnisse (verifiziert 07.07.2026)

### Kundenbezug läuft IMMER über project_match

`CalendarEvent` hat kein direktes customer-Feld. Der Kunde ist nur über
die Verschachtelung `project_match { customer { full_name } }` erreichbar.

### KONT-Pseudo-Projekte bei Kontakt-Terminen

Das Frontend-Feld heißt "Projekt / Kontakt". Wird ein Termin nur an einen
Kontakt (statt an ein echtes Projekt) gehängt, erzeugt HERO im Hintergrund
einen Platzhalter-project_match, erkennbar an:
- `project_nr` mit Präfix `KONT-` (statt Projekt-Nummernkreis)
- `name: ""` (leer)

Konsequenzen für Automatisierungen:
- Nicht davon ausgehen, dass `project_match.name` gefüllt ist
- Am project_nr-Präfix unterscheidbar, ob Termin an echtem Projekt oder
  nur an Kontakt hängt (nützlich für Dubletten-/Terminabgleich)

### provider-Feld

Kennzeichnet die Termin-Herkunft: `"scheduler"` = intern in HERO angelegt;
ICS-importierte Termine tragen einen anderen provider-Wert und sind
readonly.

## Notizen

- Teil der Hero-Anbindung des GRÜNSCHNITT-OS (Schicht 02 Technik).
