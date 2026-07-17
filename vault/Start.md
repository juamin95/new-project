---
tags: [hub]
status: verifiziert
date: 2026-07-17
---

# Start — GRÜNSCHNITT-OS Vault

Dieser Vault ist der Wissensspeicher des KI-Betriebssystems für den Garten- und Landschaftsbau-Betrieb GRÜNSCHNITT (Marvin Amini). Er ist übergabefähig aufgebaut: Wer diese Notiz liest, versteht den Vault ohne Vorwissen.

## Struktur: Die Schichten des Betriebssystems

Der Vault spiegelt die vier Schichten des OS-Blueprints. Die Nummern 01 bis 04 entsprechen den Schichten 1 bis 4:

| Ordner | Inhalt |
|--------|--------|
| [[00 Betrieb]] | Betriebskontext: Firma, Branding, Schreibstil, Angebot und Zielgruppe |
| [[01 Prozess]] | Schicht 1: Prozesslandkarte, Kernprozesse, Supportprozesse |
| [[02 Technik]] | Schicht 2: angebundene Systeme (Hero, E-Mail, n8n, Supabase) |
| [[03 AI]] | Schicht 3: OS-Blueprint, Wissenskreislauf, Skills-Übersicht, Lernlog |
| [[04 User]] | Schicht 4: Gate-Regeln, Rollen und Freigaben |
| [[05 Anhänge]] | Logo, Bilder, PDFs |

## Einsortier-Regel

Es gibt genau eine Frage beim Einsortieren: **„Zu welcher Schicht gehört dieses Wissen?"** Jede Notiz hat genau eine Heimat-Schicht; Querbezüge laufen über `[[Wikilinks]]`, nicht über Kopien.

## Migrations-Filter: Was gehört in diesen Vault?

**Rein** (GRÜNSCHNITT + OS):
- Prozesswissen des Betriebs (Kern- und Supportprozesse)
- Technisches Wissen zu angebundenen Systemen (Hero-API, E-Mail, n8n, Supabase)
- OS-Methode (Blueprint, Wissenskreislauf, Skills)
- Betriebskontext (Branding, GRÜNSCHNITT-Schreibstil, Angebot, Zielgruppe)

**Raus** (bleibt in Julians privatem Vault):
- Private Projekte und Bereiche (z. B. SAP, Deutz, Training, Weiterbildung)
- Daily Notes und persönliche Notizen
- Persönlicher Schreibstil, der nicht GRÜNSCHNITT betrifft

**Grenzfälle:**
- Schreibstil: Nur der GRÜNSCHNITT-Teil (Kunden siezen, Disallow-Liste für Kundentexte) wandert hierher, private Regeln bleiben draußen
- Betriebsdaten-Auswertungen: Erkenntnisse mit Prozessbezug ja, rohe Ablagen nein
- Migrierte Notizen tragen im Frontmatter ein `quelle`-Feld mit Herkunft und Validierungsdatum

## Spielregeln

- Notiz-Format und Statusstufen: [[Notiz-Konventionen]]
- Schreibrechte des Agenten und Gates: `.claude/rules/vault.md` im Repo (Kurzfassung: Agent schreibt autonom nur im [[Lernlog-Konventionen|Lernlog]], alles andere braucht menschliche Freigabe)
- Nur Notizen mit `status: verifiziert` sind Arbeitsgrundlage des Agenten
- Keine Secrets oder Zugangsdaten im Vault, niemals
