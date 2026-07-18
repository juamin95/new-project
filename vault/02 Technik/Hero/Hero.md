---
tags: [technik, hero, graphql, moc]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (HERO GraphQL API MOC, Stand 2026-07-09), kuratiert; Review Julian 2026-07-18
---

# Hero — GraphQL-Anbindung

Nachschlagewissen zur GraphQL-Partner-API von Hero Software (führendes System für Angebote, Rechnungen, Kunden), Endpoint `https://login.hero-software.de/api/external/v7/graphql`. Grundlage der Tool-Ebene (`tools/hero-tools/`) und der Prozess-Skills.

Dieser Bereich hat zwei Ebenen mit unterschiedlichem Charakter:

## 1. Referenz (auto-generiert)

Vollständiger Spiegel des Schemas per Introspection (`tools/hero-graphql/introspect.py`): alle Queries, Mutations und Typen.

- Einstieg: [[00 Übersicht|Schema-Übersicht (Queries, Mutations, Typen)]]
- Stand 18.07.2026: 58 Queries, 76 Mutations, 225 Typen (Delta zum Stand 07/2026: +2 Typen im Receipt-/Payment-Bereich — `Receipt_ReceiptDocumentSync`, `Receipt_ReceiptPayment`)

> [!warning] Nicht händisch editieren
> Der Ordner `Referenz (auto-generiert)/` wird vom Generator neu erzeugt und dabei überschrieben. Eigene Erkenntnisse gehören ins Praxiswissen (unten), sonst gehen sie beim nächsten Lauf verloren. Details: [[Notiz-Konventionen]].

## 2. Praxiswissen (verifiziert)

Handkuratiertes, getestetes Wissen: was in der Partner-API real funktioniert, Fallen und Workarounds.

- [[Kalender und Termine (CalendarEvent)]] — Lesen/Anlegen/Soft-Delete, DateTime-Falle (ISO 8601 mit Offset!), project_match-Kette, KONT-Pseudo-Projekte
- [[Gewerke und Projekttypen (Measure, ProjectType)]] — Zielbild Projekttyp × Gewerk, Statuspipelines, Wartungsvertrags-Automatik
- [[Aufgaben (Task)]] — Anlegen per Upsert (kein create_task), User-ID ≠ Partner-ID, Erledigt nicht rücknehmbar
- [[Checklisten (FieldService_Checklist)]] — das strikte data-Format (stille Normalisierung zu `[]`)
- [[Dokument-Entwürfe ändern und ersetzen]] — Entwurf-first (`publish: false`), Ersetzen-Pattern, Storno-Falle bei Auswertungen

## Grundregeln

- **Entwurf-first und Schreib-Gate:** verbindlich in `.claude/rules/hero-tools.md`
- **DateTime immer ISO 8601 mit Offset** — sonst generischer „Internal server error"
- Erste Frage bei jeder neuen Erkundung: Schema-Referenz konsultieren, dann testen, dann ins Praxiswissen destillieren
