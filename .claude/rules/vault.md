# Vault-Governance (GRÜNSCHNITT-OS Wissensspeicher)

Gilt für `vault/` — den Obsidian-kompatiblen Wissensspeicher dieses Repos. Diese Regeln sind toolneutral: Sie gelten für jeden Agenten, der auf den Vault zugreift (Claude Code heute, Cockpit-Chat und Lernkreislauf später).

## Leseregeln (Arbeitsgrundlage)

- Nur Notizen mit `status: verifiziert` sind verlässliche Arbeitsgrundlage.
- Notizen mit `status: erfasst` sind Rohmaterial (Beobachtungen, Entwürfe) — nutzbar als Hinweis, niemals als Faktenbasis für Außenwirksames oder Schreibzugriffe auf Zielsysteme.

## Schreibregeln (Gate)

- **Autonom erlaubt:** Neue Einträge in `vault/03 AI/Lernlog/` — immer mit `status: erfasst`, Namensschema und Regeln siehe die Notiz „Lernlog-Konventionen" dort.
- **Alles andere ist gated:** Notizen außerhalb des Lernlogs werden nur nach ausdrücklicher menschlicher Freigabe im aktuellen Vorgang angelegt oder geändert. Ohne Freigabe: Änderung als Vorschlag/Entwurf präsentieren, nicht schreiben.
- Die Beförderung `erfasst` → `verifiziert` ist immer eine menschliche Entscheidung. Nichts wird automatisch zur Regel.

## Format

- Jede Notiz folgt den Konventionen in `vault/03 AI/Notiz-Konventionen.md` (Frontmatter mit `tags`, `status`, `date`; bei migrierten Notizen zusätzlich `quelle`).
- Querbezüge über Wikilinks, keine Inhaltskopien. Jede Notiz hat genau eine Heimat-Schicht.

## Migrations-Filter

- In den Vault gehört ausschließlich GRÜNSCHNITT- und OS-Wissen (Prozesse, Technik-Wissen zu angebundenen Systemen, OS-Methode, Betriebskontext).
- Privates aus Julians altem Vault (SAP, Deutz, Training, Daily Notes, persönlicher Schreibstil) wird nicht übernommen. Details und Grenzfälle: `vault/Start.md`.

## Sicherheit

- Keine Secrets, Zugangsdaten oder API-Keys im Vault — Credentials nur über das `.env`-Pattern des Repos.
- Personenbezogene Kundendaten sparsam: Wissen abstrahieren statt Kundenakten anlegen; führendes System für Kundendaten ist Hero.
