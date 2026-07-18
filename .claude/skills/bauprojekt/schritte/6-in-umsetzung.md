# Schritt 6 — In Umsetzung (operative Ausführung)

## Geschäftsfall

Beginnt, wenn der operative Tag laut Kalendereintrag startet. Kleines Team,
keine detaillierte Ressourcenplanung — der Fokus liegt auf Mitführen der
Checkliste, Dokumentieren von Abweichungen und sauberer Abnahme. Auch jetzt
können noch Aufgaben und Checklisten nachgeschoben werden, wenn auf der
Baustelle Neues auftaucht.

## Ablauf

1. **Checkliste mitführen:** Erledigte Punkte fortlaufend abhaken:

   ```bash
   tools/hero-tools/hero projekt checkliste-abhaken --projekt <id> \
     --id <checklisten_id> --label "<Teilstring des Punkts>"
   ```

2. **Nachträge dokumentieren:** Abweichungen vom Angebot (Mehrmengen,
   Zusatzarbeiten auf Kundenwunsch) sofort als Logbuch-Eintrag festhalten —
   Schritt 7 braucht sie für die Rechnung. Bei Bedarf zusätzliche Aufgaben
   (`aufgabe-anlegen`) oder eine weitere Checkliste nachschieben.
3. **Abnahme:** Mit dem Kunden abnehmen, Checklistenpunkt abhaken und das
   Freitextfeld füllen:

   ```bash
   tools/hero-tools/hero projekt checkliste-abhaken --projekt <id> \
     --id <checklisten_id> --label "Besonderheiten" \
     --text "<Ergebnis der Abnahme, Restarbeiten>"
   ```

Baustellenstunden werden derzeit nicht erfasst (Backlog) — die Rechnung in
Schritt 7 basiert auf dem Angebot plus dokumentierten Nachträgen.

## Ergebnis des Schritts

Arbeiten abgeschlossen, Checkliste abgearbeitet, Abnahme und Nachträge im
Logbuch. Statuswechsel auf "In Umsetzung": Code noch nicht verifiziert.
Nächster Schritt: 7 (Kundenrechnung).
