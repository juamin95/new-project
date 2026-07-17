---
tags: [betrieb, wissensbasis, projekttypen]
status: erfasst
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Projekttypen-Wissensbasis, Stand 2026-07-13); Review Julian 2026-07-18, Cluster-Review ausstehend
---

# Projekttypen-Wissensbasis GRÜNSCHNITT

**Status: ENTWURF — Cluster-Review durch Julian ausstehend.** Erst nach dem Review wird diese Notiz in den bauprojekt-Skill (Schritt 3, Preisfindung/Cross-Selling) verdrahtet.

Automatisch abgeleitet aus 131 gültigen Rechnungen **2026** (Jan–12. Jul, 279.059 € netto; stornierte Originale ausgeschlossen, Abgleich mit Hero-Dashboard 99,5 %) via `hero export belege` + Clustering. Ersetzt die gelöschte n8n-Tabelle "auftragstypen" — jederzeit neu generierbar (`hero export belege` + Analyse-Skript).

## Übersicht (nach Umsatz 2026, bereinigt)

| Projektart | Sparte | RE | Umsatz netto | Anteil | Ø | Median | Min–Max |
|---|---|---|---|---|---|---|---|
| Baum- & Gehölzarbeiten ⚠️ | Pflege | 44 | 88.250 € | 32 % | 2.006 € | 1.080 € | 40–14.000 € |
| Objektpflege gewerblich | Pflege | 17 | 49.821 € | 18 % | 2.931 € | 945 € | 100–30.000 € |
| Hecken- & Schnittarbeiten | Pflege | 30 | 41.335 € | 15 % | 1.378 € | 1.025 € | 120–4.975 € |
| Terrassen- & Pflasterbau | Bau | 12 | 36.021 € | 13 % | 3.002 € | 1.468 € | 253–15.645 € |
| Sandaustausch Spielplätze | Bau | 6 | 21.341 € | 8 % | 3.557 € | 3.855 € | 1.138–6.481 € |
| Zaun- & Toranlagen | Bau | 3 | 20.528 € | 7 % | 6.843 € | 7.809 € | 3.995–8.724 € |
| Gartenpflege privat | Pflege | 12 | 16.023 € | 6 % | 1.335 € | 1.382 € | 117–5.000 € |
| Mauer- & Betonarbeiten | Bau | 2 | 3.825 € | 1 % | 1.912 € | — | 975–2.850 € |
| Erdarbeiten & Maschinenvermietung | Bau | 5 | 1.915 € | 1 % | 383 € | 325 € | 130–875 € |

⚠️ **Review-Hinweise:**
1. "Baum- & Gehölzarbeiten" (34 %!) ist vermutlich zu breit — das Muster fängt auch allgemeine Pflegeeinsätze mit Baumbezug. Beim Review ggf. aufteilen (echte Fällungen vs. Pflegeeinsätze).
2. **Saisonhinweis Sandaustausch:** 2026 erst 23 T€ — die großen Kita-Projekte (63 T€, 3 Kitas) liefen im **Oktober 2025**. Vermutlich jährlich wiederkehrend → Herbst-Akquise, Abo-Kandidat.

## Preisanker 2026 (für Schritt 3 Preisfindung)

- **Facharbeiterstunde: 50 → 55 €/Std** — der Übergang läuft (2026 fast gleichauf: 50 € × 18, 55 € × 23); Neuangebote: **55 €** ansetzen, vereinzelte 47,50/48 € sind Ausreißer
- **Entsorgung Grünschnitt: 35 €/m³** Standard (Streuung 30–45)
- **Entsorgung Bauschutt/Sand: 80–105 €/to bzw. m³** — deutlich teurer, nie mit Grünschnitt-Satz kalkulieren!
- **Maschinenkosten Kleingeräte:** 15–25 € pauschal · **Minibagger:** ~130–180 €/Tag

## Typische Positionen je Art (Cross-Selling-Checkliste)

- **Terrasse/Pflaster:** Dienstleistung, Maschinen, Entsorgung Bauschutt, Splitt/Bettung, Mutterboden/Pflanzerde für Randbereiche
- **Zaun/Tor:** Dienstleistung, Material Zaunanlage, Mähstein/Bordstein auf Betonfundament, Entsorgung Aushub, **+ Rollrasen & Dünger zur Wiederherstellung** (in 2026-Belegen durchgängig!)
- **Sandaustausch:** Dienstleistung, Sand-Entfernung + Entsorgung (to-Preise!), neuer Sand/Splitt, Betonestrich, Maschinen
- **Hecken/Schnitt:** Dienstleistung, Kleingeräte, Entsorgung Grünschnitt (m³)
- **Objektpflege gewerblich:** Monatsrechnung Grünpflege, tagesweise Dienstleistung — Abo-Charakter
- **Erdarbeiten:** Minibagger, Ausschachtung, Entsorgung Aushub, Mutterboden-Einbau

## Kundenstruktur 2026 (bereinigt)

- Gewerblich: 50 % Umsatz mit 28 Kunden · Privat: 50 % mit 57 Kunden (Ø-Gewerbekunde 2× größer)
- Bau 30 % / Pflege 70 % des Umsatzes (Bau zieht saisonal ab Sommer/Herbst an)

## Quelle & Aktualisierung

`hero export belege` → `daten/belege.json` → Analyse-Skript (Scope-Filter ≥ 2026-01-01). Klassifikationsregeln in `hero_tools/export.py`.
