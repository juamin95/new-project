# Git & Synchronisation

Dieses Repo wird über GitHub synchron gehalten (Mac, Server, weitere Geräte). Damit jedes Gerät denselben Stand hat, gilt in jeder Session:

## Bei Session-Start
- Immer zuerst `git pull` ausführen, um den aktuellen Stand vom Remote zu holen — bevor Dateien gelesen oder geändert werden.

## Vor Session-Ende / nach abgeschlossener Arbeit
- Änderungen committen und pushen (`git add`, `git commit`, `git push`) — nichts Unversioniertes liegen lassen.
- Das gilt auch für Zwischenstände am Ende einer Arbeitseinheit, nicht nur für „fertige" Features.

## Konventionen
- Commit-Format wie in `general.md`: `type(PROJ-X): Beschreibung`
- Gerätespezifische Dateien (z. B. `vault/.obsidian/workspace.json`, Cache) sind per `.gitignore` ausgeschlossen, damit es keine Sync-Konflikte gibt.
