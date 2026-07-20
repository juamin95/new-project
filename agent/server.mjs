// GRÜNSCHNITT-OS-Agent (PROJ-10, Etappe 2)
//
// Kleiner HTTP-Dienst, der auf dem VPS läuft und NUR über localhost erreichbar
// sein sollte. Das Cockpit ruft ihn pro Chat-Nachricht auf; der Agent beantwortet
// aus dem Vault (Wissensspeicher) und Hero (nur Lesebefehle) über den Claude
// Tool Runner. Er schreibt nichts nach außen und nichts in Hero (Gate-Prinzip) —
// Termin-Anlage & Co. kommen als eigener Schritt (Etappe 3).
//
// Start:  ANTHROPIC_API_KEY=... OS_AGENT_TOKEN=... node server.mjs
// Secrets werden aus der Umgebung gelesen (nie im Repo).

import http from "node:http";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import Anthropic from "@anthropic-ai/sdk";
import { betaTool } from "@anthropic-ai/sdk/helpers/beta/json-schema";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "..");
const VAULT = join(REPO, "vault");
const HERO_CLI = join(REPO, "tools", "hero-tools", "hero");

// Secrets aus der Repo-.env.local in die Umgebung laden (Repo-Muster: der Dienst
// liest den Key selbst zur Laufzeit; explizit gesetzte Umgebungsvariablen gewinnen).
function loadEnvLocal() {
  let txt;
  try {
    txt = readFileSync(join(REPO, ".env.local"), "utf-8");
  } catch {
    return;
  }
  for (const line of txt.split("\n")) {
    const m = line.match(/^\s*(?:export\s+)?([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    const val = m[2].trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnvLocal();

const PORT = Number(process.env.OS_AGENT_PORT ?? 8787);
const TOKEN = process.env.OS_AGENT_TOKEN ?? "";
const MODEL = process.env.OS_AGENT_MODEL ?? "claude-opus-4-8";

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("FEHLER: ANTHROPIC_API_KEY ist nicht gesetzt.");
  process.exit(1);
}

const client = new Anthropic(); // liest ANTHROPIC_API_KEY selbst aus der Umgebung

const SYSTEM = `Du bist das GRÜNSCHNITT-Betriebssystem, der Assistent für Marvin — Inhaber eines Garten- und Landschaftsbaubetriebs.

Antwortstil (wichtig):
- Schreibe kurzen, klaren Fließtext, den ein Handwerker in Sekunden erfasst. Komm sofort zum Punkt.
- Formuliere SELBST in eigenen Worten. Gib NIEMALS den rohen Notiztext 1:1 wieder.
- Benutze KEINE Markdown-Zeichen: keine ##, keine ** für Fettdruck, keine Backticks, keine Tabellen. Wenn du aufzählst, dann schlicht mit einem Bindestrich am Zeilenanfang.
- Lieber 3 klare Sätze als eine lange Notiz.

Arbeitsweise:
- Bei Fach-, Prozess- und Nachschlagefragen ZUERST den Vault durchsuchen (vault_suchen). Die Treffer sind Roh-Notizen im Markdown-Format — nutze sie nur als Quelle und fasse sie zusammen, kopiere sie nicht. Stütze Fakten nur auf verifizierte Notizen; findest du nichts Belastbares, sag das offen und rate nicht.
- Für Kunden-, Projekt- und Termindaten Hero lesen (hero_lesen, nur Lesebefehle). Für aktuelle/offene Projekte: modul "projekt", aktion "suchen". Für Termine: modul "kalender", aktion "termine" mit --von und --bis. Für Aufgaben eines Projekts: modul "projekt", aktion "aufgaben" mit --projekt und optional --offen.
- Du erstellst und versendest nichts nach außen (keine Mails, Angebote, Rechnungen) und schreibst nichts in Hero. Solche Aktionen macht später ein eigener, vom Menschen freigegebener Schritt.`;

// ── Werkzeug: Vault durchsuchen ──────────────────────────────
function listMarkdown(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) listMarkdown(p, acc);
    else if (extname(name) === ".md") acc.push(p);
  }
  return acc;
}

function vaultSearch(begriff) {
  const term = String(begriff ?? "").toLowerCase().trim();
  if (!term) return "Kein Suchbegriff angegeben.";
  const treffer = [];
  for (const file of listMarkdown(VAULT)) {
    let text;
    try {
      text = readFileSync(file, "utf-8");
    } catch {
      continue;
    }
    const idx = text.toLowerCase().indexOf(term);
    if (idx === -1) continue;
    const start = Math.max(0, idx - 200);
    const excerpt = text.slice(start, idx + 400).replace(/\s+/g, " ").trim();
    const rel = file.slice(VAULT.length + 1);
    const verifiziert = /status:\s*verifiziert/i.test(text);
    treffer.push(`### ${rel}${verifiziert ? " (verifiziert)" : " (nur erfasst)"}\n…${excerpt}…`);
    if (treffer.length >= 5) break;
  }
  return treffer.length ? treffer.join("\n\n") : `Kein Treffer im Vault für „${begriff}".`;
}

// ── Werkzeug: Hero lesen (nur Lesebefehle) ───────────────────
// Echte Hero-CLI-Struktur: hero <modul> <aktion> [args]. Nur Lese-Kombinationen.
const HERO_READ = new Set([
  "kontakt suchen",
  "projekt suchen",
  "projekt logbuch-lesen",
  "projekt aufgaben",
  "projekt checklisten",
  "kalender kategorien",
  "kalender termine",
  "katalog produkte",
  "katalog leistungen",
  "dokument liste",
  "dokument positionen",
  "historie rechnungen",
]);

function heroRead(modul, aktion, argumente) {
  const m = String(modul ?? "").trim();
  const a = String(aktion ?? "").trim();
  const key = `${m} ${a}`.trim();
  if (!HERO_READ.has(key)) {
    return `„${key}" ist kein erlaubter Lesebefehl. Erlaubt: ${[...HERO_READ].join("; ")}.`;
  }
  const args = [m, a, ...(Array.isArray(argumente) ? argumente.map(String) : [])];
  try {
    return execFileSync(HERO_CLI, args, { cwd: REPO, encoding: "utf-8", timeout: 30000 }).slice(0, 8000);
  } catch (e) {
    const out = `${e?.stdout ?? ""}${e?.stderr ?? ""}`.trim();
    return `Hero-Lesefehler: ${(out || e?.message || String(e)).slice(0, 1000)}`;
  }
}

const vaultTool = betaTool({
  name: "vault_suchen",
  description:
    "Durchsucht den GRÜNSCHNITT-Wissensspeicher (Vault) nach einem Stichwort. Nutze dies ZUERST bei Fach-, Prozess- und Nachschlagefragen. Liefert passende Notizen mit Markierung, ob sie verifiziert sind.",
  inputSchema: {
    type: "object",
    properties: { begriff: { type: "string", description: "Suchbegriff, zum Beispiel Abo oder Bauprojekt" } },
    required: ["begriff"],
    additionalProperties: false,
  },
  run: async ({ begriff }) => vaultSearch(begriff),
});

const heroTool = betaTool({
  name: "hero_lesen",
  description:
    "Liest Daten aus Hero (führendes System für Kunden, Projekte, Termine). Nur Lesebefehle, Struktur modul + aktion + argumente. Wichtige Beispiele: projekt suchen (Projekte auflisten/finden; argumente z. B. --suche Weber, --kunde ID, --typ project|copcontact|alle); projekt aufgaben (--projekt ID, optional --offen); projekt logbuch-lesen (--projekt ID); kontakt suchen (Suchbegriff als argument); kalender termine (--von JJJJ-MM-TT HH:MM --bis ...); historie rechnungen (--kunde ID). Verfügbar außerdem: kalender kategorien, katalog produkte, katalog leistungen, dokument liste, dokument positionen, projekt checklisten.",
  inputSchema: {
    type: "object",
    properties: {
      modul: { type: "string", description: "z. B. projekt, kontakt, kalender, katalog, dokument, historie" },
      aktion: { type: "string", description: "z. B. suchen, aufgaben, termine, liste, rechnungen" },
      argumente: {
        type: "array",
        items: { type: "string" },
        description: "zusätzliche Argumente inkl. Werte, z. B. [--suche, Weber] oder [--projekt, GABO-152, --offen]",
      },
    },
    required: ["modul", "aktion"],
    additionalProperties: false,
  },
  run: async ({ modul, aktion, argumente }) => heroRead(modul, aktion, argumente),
});

function schrittLabel(name) {
  if (name === "vault_suchen") return "Wissensspeicher durchsucht";
  if (name === "hero_lesen") return "Hero gelesen";
  return name;
}

// ── Agentenlauf ──────────────────────────────────────────────
async function beantworte(messages) {
  const runner = client.beta.messages.toolRunner({
    model: MODEL,
    max_tokens: 4096,
    system: SYSTEM,
    tools: [vaultTool, heroTool],
    messages,
  });

  const thinking = [];
  let last;
  for await (const message of runner) {
    last = message;
    for (const block of message.content) {
      if (block.type === "tool_use") {
        const label = schrittLabel(block.name);
        if (!thinking.includes(label)) thinking.push(label);
      }
    }
  }
  const text = (last?.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
  return { text: text || "(keine Antwort)", thinking };
}

// ── HTTP-Server (nur localhost binden) ───────────────────────
const server = http.createServer((req, res) => {
  const json = (code, obj) => {
    res.writeHead(code, { "Content-Type": "application/json" });
    res.end(JSON.stringify(obj));
  };

  if (req.method === "GET" && req.url === "/health") return json(200, { ok: true });
  if (req.method !== "POST") return json(405, { error: "Nur POST" });
  if (TOKEN && req.headers["x-agent-token"] !== TOKEN) return json(401, { error: "Token fehlt/falsch" });

  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    let messages;
    try {
      messages = JSON.parse(body || "{}").messages;
    } catch {
      return json(400, { error: "Ungültiges JSON" });
    }
    if (!Array.isArray(messages) || messages.length === 0) {
      return json(400, { error: "messages fehlt" });
    }
    try {
      const result = await beantworte(messages);
      json(200, result);
    } catch (e) {
      console.error("Agentfehler:", e?.message ?? e);
      json(500, { error: "Agentfehler" });
    }
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`GRÜNSCHNITT-OS-Agent läuft auf http://127.0.0.1:${PORT} (Modell: ${MODEL})`);
});
