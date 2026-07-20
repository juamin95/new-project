# GRÜNSCHNITT-OS-Agent (PROJ-10, Etappe 2)

Kleiner HTTP-Dienst, der die echten Chat-Antworten liefert. Er läuft auf demselben
Host wie das Cockpit (dein Hostinger-VPS) und ist **nur über `localhost`** erreichbar.
Das Cockpit ruft ihn pro Nachricht auf; der Agent antwortet aus dem **Vault**
(Wissensspeicher) und **Hero** (nur Lesebefehle) über den Claude Tool Runner.

**Scope Etappe 2:** Fragen beantworten und zusammenfassen (Vault + Hero **lesen**).
Er schreibt nichts nach außen und nichts in Hero — Termin-Anlage & Co. kommen in
Etappe 3.

## Secrets (nur in der Umgebung, nie im Repo)

| Variable | Wo | Zweck |
|----------|----|-------|
| `ANTHROPIC_API_KEY` | Agent-Umgebung | Zugriff auf Claude (API) |
| `OS_AGENT_TOKEN` | Agent **und** Cockpit | gemeinsames lokales Geheimnis (nur Cockpit darf den Agenten aufrufen) |
| `OS_AGENT_MODEL` | Agent (optional) | Standard `claude-opus-4-8`; für weniger Kosten `claude-sonnet-5` |
| `HERO_API_KEY` | `.env.local` im Repo-Root | wird von den Hero-Tools gelesen (für Hero-Lesebefehle) |

Das Cockpit braucht zusätzlich:

| Variable | Wo | Wert |
|----------|----|------|
| `OS_AGENT_URL` | Cockpit `.env.local` | `http://127.0.0.1:8787` |
| `OS_AGENT_TOKEN` | Cockpit `.env.local` | dasselbe Token wie beim Agenten |

Ist `OS_AGENT_URL` **nicht** gesetzt, bleibt das Cockpit beim Platzhalter (Etappe 1) — nichts bricht.

## Lokal testen (auf dem Mac, vor dem VPS)

```bash
# 1) Agent-Abhängigkeiten
cd agent
npm install

# 2) Agent starten (Key + Token in die Umgebung; NICHT in den Chat)
ANTHROPIC_API_KEY=... OS_AGENT_TOKEN=einlanges-geheimnis npm start
# → "GRÜNSCHNITT-OS-Agent läuft auf http://127.0.0.1:8787"
```

Dann in der Cockpit-`.env.local` (Repo-Root) ergänzen und speichern:

```
OS_AGENT_URL=http://127.0.0.1:8787
OS_AGENT_TOKEN=einlanges-geheimnis
```

Cockpit-Dev-Server neu starten (`npm run dev`) und im Chat eine Frage stellen —
jetzt kommt eine echte Antwort. Schnelltest des Agenten allein:

```bash
curl -s http://127.0.0.1:8787/health   # {"ok":true}
```

Hinweis: Ohne gültigen `HERO_API_KEY` funktionieren Vault-Antworten trotzdem;
Hero-Lesebefehle scheitern dann sauber mit einer Fehlermeldung.

## Auf dem VPS betreiben

```bash
git pull                      # holt agent/ + Vault + Hero-Tools
cd agent && npm install
# dauerhaft laufen lassen, z. B. mit pm2:
ANTHROPIC_API_KEY=... OS_AGENT_TOKEN=... pm2 start server.mjs --name os-agent
```

Das Cockpit (läuft auf demselben VPS) bekommt `OS_AGENT_URL=http://127.0.0.1:8787`
und dasselbe `OS_AGENT_TOKEN`. Da beide auf `localhost` reden, verlässt nichts den Server.

## Sicherheit

- Bindet nur an `127.0.0.1` — von außen nicht erreichbar.
- Prüft das `OS_AGENT_TOKEN` bei jeder Anfrage.
- Liest alle Keys selbst aus der Umgebung; sie stehen nie im Repo.
- Nur Hero-**Lese**befehle (Whitelist), keine Schreibzugriffe.
