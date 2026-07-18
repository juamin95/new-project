---
tags: [technik, n8n]
status: verifiziert
date: 2026-07-18
quelle: migriert aus gruenschnitt-wissen (Stand 2026-07-05); Review Julian 2026-07-18 (Gate 3)
---

# n8n: IMAP Community Node als AI-Agent-Tool patchen

**Betrifft:** Community Node `n8n-nodes-imap` (umanamente) auf dem Hostinger VPS (n8n self-hosted, Docker)
**Zweck:** Der Node hat kein `usableAsTool: true` im Code und taucht daher nicht im Tool-Picker des AI Agent auf. Dieses Flag muss manuell in die installierte Node-Datei gepatcht werden.
**Wann nötig:** Nach jedem Update oder jeder Neuinstallation des Pakets über die n8n-Oberfläche (Settings → Community Nodes). Das Update überschreibt die gepatchte Datei, der Patch muss dann erneut ausgeführt werden.

---

## Voraussetzungen (einmalig erledigt, nur zur Info)

- In der `docker-compose.yml` ist unter dem n8n-Service gesetzt:
  `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true`
- Diese Variable bleibt dauerhaft bestehen und muss NICHT erneut gesetzt werden.

## Zugangsdaten / Namen

- SSH-Zugang: `ssh root@srv1738973.hstgr.cloud`
- n8n-Container-Name: `n8n-n8n-1` (prüfbar mit `docker ps`, Spalte NAMES)
- Zu patchende Datei im Container:
  `/home/node/.n8n/nodes/node_modules/n8n-nodes-imap/dist/nodes/Imap/Imap.node.js`

---

## Ablauf nach einem Node-Update

### 1. Per SSH auf den VPS verbinden

```bash
ssh root@srv1738973.hstgr.cloud
```

### 2. Prüfen, ob das Flag fehlt

```bash
docker exec n8n-n8n-1 grep -c "usableAsTool" /home/node/.n8n/nodes/node_modules/n8n-nodes-imap/dist/nodes/Imap/Imap.node.js
```

- Ausgabe `0` → Flag fehlt, weiter mit Schritt 3.
- Ausgabe `1` → Flag ist bereits vorhanden, fertig (nichts weiter tun).

### 3. Ankerzeile verifizieren

Der Patch fügt die neue Zeile hinter `name: 'imap',` ein. Prüfen, dass diese Zeile genau einmal existiert:

```bash
docker exec n8n-n8n-1 sh -c "grep -n \"name: 'imap'\" /home/node/.n8n/nodes/node_modules/n8n-nodes-imap/dist/nodes/Imap/Imap.node.js"
```

Erwartete Ausgabe: genau EINE Zeile, z. B. `18:            name: 'imap',`
(Falls keine oder mehrere Zeilen: NICHT weitermachen, Datei hat sich strukturell geändert → Datei manuell prüfen.)

### 4. Flag einfügen

```bash
docker exec n8n-n8n-1 sed -i "s/name: 'imap',/name: 'imap',\n            usableAsTool: true,/" /home/node/.n8n/nodes/node_modules/n8n-nodes-imap/dist/nodes/Imap/Imap.node.js
```

### 5. Kontrolle

```bash
docker exec n8n-n8n-1 grep -c "usableAsTool" /home/node/.n8n/nodes/node_modules/n8n-nodes-imap/dist/nodes/Imap/Imap.node.js
```

Erwartete Ausgabe: `1`

### 6. n8n neu starten

```bash
docker restart n8n-n8n-1
```

Danach ca. 20-30 Sekunden warten und n8n im Browser neu laden.

### 7. Im Workflow prüfen

Agent-Workflow öffnen → "+" am Tool-Connector des AI Agent → nach "imap" suchen. Der Node erscheint jetzt als anschließbares Tool. Bestehende IMAP-Credentials funktionieren unverändert.

---

## Hintergrund (Warum das Ganze?)

- n8n baut aus einem Node nur dann eine AI-Agent-Tool-Variante, wenn im Node-Code das Flag `usableAsTool: true` gesetzt ist.
- Die Umgebungsvariable `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true` erlaubt Community-Nodes als Tools generell, ersetzt das Flag aber nicht — beides muss vorhanden sein.
- Der Entwickler von `n8n-nodes-imap` hat das Flag (Stand v2.17.0, März 2026) nicht eingebaut. Der Patch schreibt es direkt in die installierte, kompilierte Datei.
- n8n liest Nodes nur beim Start ein, daher ist der Container-Neustart zwingend.
- Bei zukünftigen Node-Versionen lohnt ein Blick ins Changelog/README: Sollte der Entwickler `usableAsTool` irgendwann offiziell einbauen, entfällt dieser Patch komplett (Schritt 2 ergibt dann direkt `1`).

## Hinweise zur Tool-Konfiguration im Agent

- Resource und Operation im Tool fest einstellen (z. B. Email → Get emails list), nicht vom Modell wählen lassen.
- Nur dynamische Felder (Mailbox, Suchfilter, Limit, Email-UID) über das ✦-Symbol ("Let the model define this parameter" / `$fromAI`) vom Modell befüllen lassen.
- Pro Aktion ein eigenes Tool anlegen (z. B. "Emails_abrufen", "Email_verschieben") statt eines Tools mit variabler Operation.

## Notizen
- Teil der n8n-Anbindung des GRÜNSCHNITT-OS (Schicht 02 Technik).
