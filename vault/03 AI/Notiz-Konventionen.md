---
tags: [ai, konventionen]
status: verifiziert
date: 2026-07-17
---

# Notiz-Konventionen

Format-Regeln für jede Notiz in diesem Vault. Eine Pflegestelle: Regeln und Skills verweisen hierher, statt zu kopieren.

## Frontmatter (Pflicht)

```yaml
---
tags: [prozess, kernprozess]
status: verifiziert
date: 2026-07-17
---
```

- **tags** — Schlagworte, klein geschrieben
- **status** — Wissenskreislauf-Stufe, siehe unten
- **date** — Datum der Erstellung bzw. letzten inhaltlichen Änderung

**Zusätzlich bei migrierten Notizen:**

```yaml
quelle: migriert aus gruenschnitt-wissen, validiert 2026-07-20
```

## Statusstufen

| Status | Bedeutung | Arbeitsgrundlage für den Agenten? |
|--------|-----------|-----------------------------------|
| `erfasst` | Beobachtung oder Entwurf, noch nicht geprüft | Nein |
| `verifiziert` | Durch Praxis/Test bestätigt und vom Menschen freigegeben | Ja |

Die Beförderung von `erfasst` zu `verifiziert` ist eine bewusste menschliche Entscheidung (Gate), nie automatisch.

## Ausnahme: Auto-generierte Referenz

Der Ordner `02 Technik/Hero/Referenz (auto-generiert)/` ist ein maschineller Spiegel des Hero-Schemas (erzeugt von `tools/hero-graphql/introspect.py`) und vom Frontmatter- und Statusmodell **ausgenommen**:

- Kein Frontmatter, kein `status` — die Dateien sind weder „erfasst" noch „verifiziert", sie SIND das Schema
- **Nicht händisch editieren** — der nächste Generator-Lauf überschreibt den Ordner komplett
- Eigene Erkenntnisse gehören ins `Praxiswissen (verifiziert)/`, nie in die Referenz

## Verlinkung

- **Atomare Notizen:** eine Idee pro Notiz, wo möglich — das hält den Vault verlinkbar und den Agenten-Kontext schlank
- Querbezüge über `[[Wikilinks]]`, keine Inhaltskopien
- Jede Notiz hat genau eine Heimat-Schicht (siehe Einsortier-Fragen in den Schicht-Übersichten)
- Deutsche Datei- und Ordnernamen inklusive Umlaute sind erlaubt und erwünscht

## Bezug

- Struktur und Migrations-Filter: [[Start]]
- Schreibrechte und Gates: `.claude/rules/vault.md` im Repo
