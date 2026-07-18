---
name: hero-stammdaten
description: >
  Stammdaten im Hero-System des GRÜNSCHNITT-Betriebs anlegen und pflegen:
  Kunden/Kontakte (mit Adressen und Baustellenadressen) sowie der Katalog
  (Produkte/Artikel und Leistungen mit Nummernkreisen). Immer verwenden, wenn
  ein Kunde, Kontakt, Lieferant, Partner, Artikel, Produkt oder eine Leistung
  in Hero angelegt, gesucht, geändert oder geprüft werden soll — auch bei
  Formulierungen wie "leg den Kunden an", "ändere die Telefonnummer",
  "neue Baustellenadresse", "gibt es die Position schon im Katalog?",
  "neue Leistung Steinreinigung", "Artikel für Rasensamen". Auch verwenden,
  wenn ein anderer Prozess (z. B. bauprojekt) einen fehlenden Kunden oder
  eine fehlende Katalogposition feststellt.
---

# Hero-Stammdaten (Supportprozesse S1 + S2)

Stammdaten sind die Voraussetzung für alle Kernprozesse: Ohne angelegten
Kunden kein Projekt, ohne Katalogposition kein Angebot. Prozessmodell im
Vault: `vault/01 Prozess/Supportprozesse/` (Prozess
Kundenstammdaten, Prozess Stammdatenpflege).

## Werkzeug

Alle Operationen laufen über das CLI `tools/hero-tools/hero` (Befehlsreferenz:
`tools/hero-tools/README.md`). Ausgabe ist JSON; Fehler kommen als Klartext
mit Exit-Code 1.

## Grundregeln (gelten für alle Stammdaten)

1. **Suchen vor Anlegen.** Immer zuerst prüfen, ob der Datensatz existiert.
   Dubletten sind teurer als eine Suche. Bei genau einem Treffer: verwenden.
   Bei mehreren Treffern: dem Nutzer die Treffer zeigen und auswählen lassen —
   nie selbst raten.
2. **Ändern statt neu anlegen.** Wenn sich Daten eines bestehenden Datensatzes
   geändert haben (Telefonnummer, Adresse), wird der Datensatz aktualisiert.
3. **Löschen nur auf ausdrückliche Anweisung** und nach Rückfrage. Hero
   arbeitet mit Soft-Delete.
4. **Testdaten:** Für Tests immer den Testkontakt **Julian Amini**
   (customer_id 5711737) verwenden, nie echte Kunden.

## Je nach Aufgabe weiterlesen

- Kunden, Kontakte, Adressen → [kunde.md](kunde.md)
- Katalog: Produkte und Leistungen → [katalog.md](katalog.md)
