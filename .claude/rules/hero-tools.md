# Hero-Tools (Fähigkeiten-Ebene) — Nutzungsregeln

Gilt für die CLI unter `tools/hero-tools/` und jeden anderen Weg, auf dem ein Agent
in Hero schreibt oder liest (Claude Code heute, Cockpit-Chat später). Hero ist das
führende System — Fehler dort sind Datenmüll beim Kunden.

## Entwurf-first (Kernprinzip)

- Außenwirksame Dokumente entstehen **ausschließlich als Entwurf**: Angebote und
  Rechnungen immer als Hero-Draft (`publish: false`), niemals veröffentlicht.
- Gleiches Prinzip für künftige Kanäle: Eine Mail-Anbindung erzeugt nur **Entwürfe im
  Postfach**, nie Versand.
- Versand und Veröffentlichung macht immer ein Mensch (Marvin/Julian) — im Quellsystem
  (Hero, Mail-Client), nicht der Agent.
- Zweck: Das OS beweist seine Zuverlässigkeit am Entwurf, ohne dass etwas ungeprüft
  beim Kunden ankommt. Eine Lockerung dieser Regel ist möglich, aber nur als bewusste,
  hier dokumentierte menschliche Entscheidung — nie als schleichende Praxis.

## Lese-/Schreib-Gate

- **Lesebefehle — frei:** `suchen`, `kategorien`, `termine`, `logbuch-lesen`,
  `aufgaben`, `checklisten`, `historie`, `export`. Erkunden, Kontext auflösen,
  Fragen beantworten ist jederzeit erlaubt („Reads erkunden").
- **Schreibbefehle — im Dienst von Marvins Anfrage erlaubt** (Klarstellung Julian
  23.07.2026): Der Agent darf **anlegen/ändern** — `anlegen`, `bearbeiten`,
  `adresse`, `status`, `gewerk`, `logbuch`, `aufgabe-*`, `checkliste-*` und
  Dokument-Erzeugungen. Der Schutz liegt **nicht** in „kein Schreiben", sondern in
  **Draft-first** (Kernprinzip oben): Alles mit Entwurfsmodus (Angebote, Rechnungen,
  künftig Mails) entsteht **immer als Entwurf**; **Veröffentlichen/Versenden macht ein
  Mensch** im Quellsystem. Objekte ohne Entwurfsmodus (Termin, Projekt, Aufgabe) darf
  der Agent direkt anlegen.
- Keine eigeninitiativen Aktionen ohne Anlass im Gespräch — insbesondere Aufgaben/
  Status nur ändern, wenn Marvin es will, nie aus dem Kontext schließen
  (Lernlog-Beobachtung vom 12.07.2026).
- Löschen/Archivieren bleibt bestätigungspflichtig: Projekte sind per API ohnehin
  nicht löschbar; Aufräumen = Status 2100 (Archiviert), nur nach Freigabe.

## Betrieb

- Der `HERO_API_KEY` liegt nur in der `.env.local` im Repo-Root; die Tools lesen ihn
  selbst zur Laufzeit. Der Agent liest oder zitiert den Key nie.
- Setup und Befehlsreferenz: `tools/README.md` und `tools/hero-tools/README.md`.
