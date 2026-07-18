# Schritt 1 — Anfrage eingegangen

## Geschäftsfall

Kunde meldet sich (Telefon, WhatsApp, E-Mail) mit einem Bauvorhaben. Ziel:
Anfrage sofort in Hero erfassen statt auf Papier — Kunde und Projekt anlegen,
und bei Bestandskunden direkt die Historie aufbereiten, damit alle
Folgeschritte davon zehren.

## Ablauf

1. **Kunde:** `hero kontakt suchen "<Name>"`. Fehlt er → Skill
   `hero-stammdaten`/kunde.md. Bestandskunde → dessen `id` verwenden.
2. **Adresse klären:** Ist die Baustelle die Hauptadresse oder eine andere?
   Abweichende Baustellenadresse über `hero kontakt adresse` anlegen und die
   zurückgegebene `address_id_fuer_projekt` verwenden (innere address.id —
   siehe hero-stammdaten/kunde.md).
3. **Projekt anlegen:**

   ```bash
   tools/hero-tools/hero projekt anlegen \
     --name "JJJJMMTT_Nachname_Schlagwort" \
     --kunde <customer_id> --adresse <address_id> \
     --gewerk gartengestaltung
   ```

   Namenskonvention: Datum der Anfrage + Kundenname + Vorhaben,
   z. B. `20260712_Amini_Terrassenbau`. Gewerk: Bauvorhaben →
   `gartengestaltung` (GES); größeres Pflegeprojekt mit Angebot →
   `gartenpflege` (PFL). Neues Projekt startet automatisch im Status
   "Anfrage eingegangen" (201).
4. **Anfrage ins Logbuch:** Leistungswunsch festhalten:
   `hero projekt logbuch --projekt <id> --text "Anfrage: ..."`.
5. **Kunden-Recap (nur Bestandskunden):** Historie zusammenstellen und als
   eigenen Logbuch-Eintrag ins neue Projekt schreiben — einmal aufbereitet,
   nutzen ihn Terminvorbereitung (Schritt 2) und Preisfindung (Schritt 3),
   ohne die Belege erneut einlesen zu müssen:
   - Bisherige Projekte: `hero projekt suchen --kunde <id> --typ alle`
   - Alle Rechnungspositionen mit Preisen: `hero historie rechnungen --kunde <id>`
     (liest die veröffentlichten Belege live aus Hero, neuester zuerst)
   - Inhalt des Recap-Eintrags: Was wurde bisher gemacht? Wie wurde
     abgerechnet — pauschal oder pro Stunde? Welche Positionen und Preise
     (bei Preisspannen den neuesten Wert als Anker nennen)?

## Ergebnis des Schritts

Kunde und Projekt existieren in Hero, Anfrage und (bei Bestandskunden)
Kunden-Recap stehen im Logbuch, Status "Anfrage eingegangen".
Nächster Schritt: 2 (Vor-Ort-Termin).
