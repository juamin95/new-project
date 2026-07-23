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
const MODEL = process.env.OS_AGENT_MODEL ?? "claude-sonnet-5";

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("FEHLER: ANTHROPIC_API_KEY ist nicht gesetzt.");
  process.exit(1);
}

const client = new Anthropic(); // liest ANTHROPIC_API_KEY selbst aus der Umgebung

const SYSTEM = `Du bist das GRÜNSCHNITT-Betriebssystem, der Assistent für Marvin — Inhaber eines Garten- und Landschaftsbaubetriebs.

Rolle & Verhalten:
- Du bist ein kompetenter, ruhiger Betriebs-Assistent: hilfsbereit, ohne Show, keine Emojis.
- Sprich Marvin und Julian mit "du" an (kollegial). Hinweis: außenwirksame Kundentexte werden zwar gesiezt, das betrifft dich im internen Chat aber nicht.
- Sei ehrlich bei Unsicherheit: sag klar, wenn etwas nicht im Vault steht oder du es nicht sicher weißt — rate nicht.
- Frag bei unklarer oder unvollständiger Anfrage kurz nach (z. B. welcher Kunde gemeint ist), statt zu raten.
- Du liest und schlägst vor; du schreibst oder versendest nie etwas ohne ausdrückliche Freigabe.
- Biete am Ende genau EINEN sinnvollen nächsten Schritt an (kurze Rückfrage oder Vorschlag), nicht mehrere.

Antwortstil (WICHTIG — die Antwort wird als Markdown gerendert; halte dich strikt daran):
- So KNAPP wie möglich. Beantworte genau die Frage, nicht mehr.
- Steige DIREKT mit der Antwort ein. KEINE Meta- oder Füllsätze wie "Basierend auf dem Vault …", "Aus der Übersicht ergibt sich …" oder "Der Rest ist abgeschlossen". Der Nutzer will nur das Gefragte sehen.
- Formuliere in eigenen Worten; gib NIEMALS den rohen Notiztext 1:1 wieder.
- Jede Aufzählung von mehreren Dingen (Projekte, Aufgaben, Punkte) MUSS eine echte Liste sein: jede Position beginnt mit "- ". Schreibe Aufzählungen NIE als fett-beginnende Fließzeilen.
- Details zu einer Position als eingerückte Unterpunkte (zwei Leerzeichen, dann "- ").
- Absätze IMMER durch eine LEERZEILE trennen. Bei mehreren Themen eine kurze Überschrift "## Titel".
- Namen und Status mit **fett** hervorheben.

Baue die Antwort exakt so auf (Struktur und Knappheit nachahmen, Inhalt ersetzen):

## Aktuell offene Projekte

- **UNB-142 – Kilian-Patt** — **In Umsetzung**
  - Kundin: Christina Kilian-Patt
  - Volumen: 705 €
- **UNB-148 – Greiner** — **Umsetzungsbeginn**

Soll ich zu einem Projekt die offenen Aufgaben zeigen?

Arbeitsweise:
- Bei Fach-, Prozess- und Nachschlagefragen ZUERST den Vault durchsuchen (vault_suchen). Die Treffer sind Roh-Notizen im Markdown-Format — nutze sie nur als Quelle und fasse sie zusammen, kopiere sie nicht. Stütze Fakten nur auf verifizierte Notizen; findest du nichts Belastbares, sag das offen und rate nicht.
- Für Kunden-, Projekt- und Termindaten Hero lesen (hero_lesen, nur Lesebefehle). Für aktuelle/offene Projekte: modul "projekt", aktion "suchen". Für Termine: modul "kalender", aktion "termine" mit --von und --bis. Für Aufgaben eines Projekts: modul "projekt", aktion "aufgaben" mit --projekt und optional --offen.
- WICHTIG — Chat-Zuordnung: Sobald in diesem Gespräch EIN konkretes Hero-Projekt (project_nr) oder ein Kunde eindeutig feststeht (z. B. weil du es gerade in Hero nachgeschlagen hast), rufe IMMER zuordnung_vorschlagen auf — zusätzlich zu deiner Antwort, auch wenn die Frage bereits beantwortet ist. Übergib scope ("projekt" oder "kunde"), projekt_nr bzw. kunde_id und einen kurzen titel (z. B. "UNB-142 – Kilian-Patt"). Rufe das Werkzeug möglichst VOR deiner eigentlichen Antwort auf und gib danach keine Zusatzbestätigung wie "Erledigt" aus. Tu das nur bei Eindeutigkeit; bei allgemeinen Fragen ohne konkreten Projekt-/Kundenbezug NICHT. Es ist nur ein Vorschlag — der Mensch bestätigt im Cockpit; du ordnest nichts selbst zu.
- Will Marvin einen Termin anlegen, rufe termin_vorschlagen auf (titel, von, bis im Format "JJJJ-MM-TT HH:MM", kategorie aus umsetzung/vor-ort-termin/schlechtwetter/buero/besprechung/schule; bei Projektbezug vorher die project_match_id via hero_lesen auflösen). Du legst den Termin NIE selbst an — es ist ein Vorschlag; der Mensch bestätigt im Cockpit, dann wird geschrieben. Fehlt eine Eckdatei (Datum/Uhrzeit/Kategorie), frag kurz nach.
- Du erstellst und versendest nichts nach außen (keine Mails, Angebote, Rechnungen). Außer Termin-Vorschlägen schreibst du nichts in Hero. Solche Aktionen macht ein eigener, vom Menschen freigegebener Schritt.`;

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

// Strukturierter Projekt-Status (ohne LLM/Token) — für das Cockpit (PROJ-17).
// Liest ein Projekt per hero-tools (JSON-Ausgabe) und gibt Typ + aktuellen Status
// zurück. Nur lesend. Wirft bei Hero-Fehler; der Aufrufer antwortet dann sanft.
function heroProjektStatus(ref) {
  const term = String(ref ?? "").trim();
  if (!term) throw new Error("ref fehlt");
  const raw = execFileSync(HERO_CLI, ["projekt", "suchen", "--suche", term], {
    cwd: REPO,
    encoding: "utf-8",
    timeout: 30000,
  });
  const list = JSON.parse(raw);
  const arr = Array.isArray(list) ? list : [];
  const p = arr.find((x) => x.project_nr === term) ?? arr[0] ?? null;
  if (!p) return { found: false };
  return {
    found: true,
    project: {
      id: p.id ?? null,
      project_nr: p.project_nr ?? null,
      name: p.name ?? null,
      project_title: p.project_title ?? null,
      customer: p.customer ?? null,
      type: p.type ?? null, // { id, name }
      status: p.current_project_match_status ?? null, // { status_code, name, short_name }
    },
  };
}

// ── Schreib-Op: Termin in Hero anlegen (PROJ-10 Etappe 3) ────
// Gated: wird NUR vom Cockpit nach menschlicher Bestätigung aufgerufen (Token +
// auth-geschützter Endpunkt). Legt einen echten Kalendereintrag in Hero an.
function heroTerminAnlegen(t) {
  const titel = String(t?.titel ?? "").trim();
  const von = String(t?.von ?? "").trim();
  const bis = String(t?.bis ?? "").trim();
  const kategorie = String(t?.kategorie ?? "").trim();
  if (!titel || !von || !bis || !kategorie) {
    throw new Error("titel, von, bis und kategorie sind Pflicht");
  }
  const args = ["kalender", "anlegen", "--titel", titel, "--von", von, "--bis", bis, "--kategorie", kategorie];
  if (t.beschreibung) args.push("--beschreibung", String(t.beschreibung));
  if (t.project_match_id) args.push("--projekt", String(t.project_match_id));
  const raw = execFileSync(HERO_CLI, args, { cwd: REPO, encoding: "utf-8", timeout: 30000 });
  return { ok: true, event: JSON.parse(raw) };
}

// ── Op: Sprache-zu-Text (PROJ-10 Etappe 3) ──────────────────
// Transkribiert ein kurzes Audio über OpenAI. Der Key bleibt im Agenten (env),
// das Cockpit reicht nur das Audio durch. Nur Transkription, kein LLM-Lauf.
async function transkribiere(audioBase64, mimetype) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY fehlt");
  const b64 = String(audioBase64 ?? "");
  if (!b64) throw new Error("audio fehlt");
  const bytes = Buffer.from(b64, "base64");
  const blob = new Blob([bytes], { type: mimetype || "audio/webm" });
  const form = new FormData();
  form.append("file", blob, "audio");
  form.append("model", process.env.OPENAI_TRANSCRIBE_MODEL ?? "gpt-4o-mini-transcribe");
  form.append("language", "de");
  const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body: form,
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`OpenAI ${res.status}: ${t.slice(0, 300)}`);
  }
  const d = await res.json();
  return { text: String(d.text ?? "").trim() };
}

// ── Werkzeug: Zuordnung vorschlagen (PROJ-17) ────────────────
// Schlägt vor, DIESEN Chat einem Hero-Projekt/Kunden zuzuordnen. Führt nichts aus
// (Gate) — der Server liest die Argumente aus dem tool_use-Block und reicht sie ans
// Cockpit weiter, wo der Mensch im Pop-up bestätigt.
const zuordnungTool = betaTool({
  name: "zuordnung_vorschlagen",
  description:
    "Schlägt vor, DIESEN Chat einem Hero-Projekt oder -Kunden zuzuordnen. Nur aufrufen, wenn aus dem Gespräch ein konkretes Projekt/Kunde sicher hervorgeht (vorher mit hero_lesen auflösen). Führt nichts aus — der Mensch bestätigt im Cockpit.",
  inputSchema: {
    type: "object",
    properties: {
      scope: { type: "string", enum: ["projekt", "kunde"], description: "projekt oder kunde" },
      projekt_nr: { type: "string", description: "Hero project_nr, z. B. UNB-142 (bei scope projekt)" },
      kunde_id: { type: "string", description: "Hero-Kunden-ID (bei scope kunde)" },
      titel: { type: "string", description: "kurzer Titel für den Chat, z. B. UNB-142 – Kilian-Patt oder Kundenname" },
    },
    required: ["scope", "titel"],
    additionalProperties: false,
  },
  run: async () => "Vorschlag notiert — der Mensch bestätigt im Cockpit.",
});

// ── Werkzeug: Termin vorschlagen (PROJ-10 Etappe 3) ──────────
// Schlägt einen Kalendereintrag vor. Führt NICHTS aus (Gate) — der Server reicht
// den Vorschlag ans Cockpit, wo der Mensch im Pop-up bestätigt; erst dann wird
// über die Schreib-Op tatsächlich in Hero angelegt.
const terminTool = betaTool({
  name: "termin_vorschlagen",
  description:
    "Schlägt einen Kalendereintrag (Termin) in Hero vor. Nur aufrufen, wenn Marvin klar einen Termin anlegen will und die Eckdaten feststehen. Führt nichts aus — der Mensch bestätigt im Cockpit. Wenn ein konkretes Projekt gemeint ist, löse zuerst mit hero_lesen die project_match_id (Feld id) auf.",
  inputSchema: {
    type: "object",
    properties: {
      titel: { type: "string", description: "kurzer Titel, z. B. Vor-Ort-Termin Kilian-Patt" },
      von: { type: "string", description: "Start, Format 'JJJJ-MM-TT HH:MM' (Europe/Berlin)" },
      bis: { type: "string", description: "Ende, Format 'JJJJ-MM-TT HH:MM'" },
      kategorie: {
        type: "string",
        enum: ["umsetzung", "vor-ort-termin", "schlechtwetter", "buero", "besprechung", "schule"],
        description: "Terminkategorie",
      },
      beschreibung: { type: "string", description: "optionale Notiz" },
      project_match_id: { type: "number", description: "Hero project_match_id (Feld id), falls projektbezogen" },
      bezug: { type: "string", description: "menschenlesbarer Bezug für die Anzeige, z. B. Projekt/Kunde" },
    },
    required: ["titel", "von", "bis", "kategorie"],
    additionalProperties: false,
  },
  run: async () => "Termin-Vorschlag notiert — der Mensch bestätigt im Cockpit.",
});

function schrittLabel(name) {
  if (name === "vault_suchen") return "Wissensspeicher durchsucht";
  if (name === "hero_lesen") return "Hero gelesen";
  if (name === "zuordnung_vorschlagen") return "Zuordnung vorgeschlagen";
  if (name === "termin_vorschlagen") return "Termin vorgeschlagen";
  return name;
}

// ── Agentenlauf ──────────────────────────────────────────────
async function beantworte(messages) {
  const runner = client.beta.messages.toolRunner({
    model: MODEL,
    max_tokens: 4096,
    system: SYSTEM,
    tools: [vaultTool, heroTool, zuordnungTool, terminTool],
    messages,
  });

  const thinking = [];
  const textteile = [];
  let zuordnung = null;
  let termin = null;
  for await (const message of runner) {
    for (const block of message.content) {
      // Text über den ganzen Lauf sammeln, damit die Antwort nicht verloren geht,
      // falls der Agent danach noch ein Werkzeug (z. B. Vorschlag) aufruft.
      if (block.type === "text" && block.text.trim()) {
        textteile.push(block.text.trim());
      }
      if (block.type === "tool_use") {
        const label = schrittLabel(block.name);
        if (!thinking.includes(label)) thinking.push(label);
        // Letzter Vorschlag gewinnt (Argumente direkt aus dem tool_use).
        if (block.name === "zuordnung_vorschlagen") zuordnung = block.input ?? null;
        if (block.name === "termin_vorschlagen") termin = block.input ?? null;
      }
    }
  }
  const text = textteile.join("\n\n").trim();
  return { text: text || "(keine Antwort)", thinking, zuordnung, termin };
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
    let parsed;
    try {
      parsed = JSON.parse(body || "{}");
    } catch {
      return json(400, { error: "Ungültiges JSON" });
    }

    // Cockpit-Leseop (PROJ-17): strukturierter Projekt-Status, ohne LLM.
    if (parsed && parsed.op === "projekt-status") {
      try {
        return json(200, heroProjektStatus(parsed.ref));
      } catch (e) {
        console.error("projekt-status Fehler:", e?.message ?? e);
        return json(502, { error: "Hero-Lesefehler" });
      }
    }

    // Cockpit-Op (PROJ-10 Etappe 3): Sprachmemo transkribieren (OpenAI).
    if (parsed && parsed.op === "transkription") {
      try {
        return json(200, await transkribiere(parsed.audio_base64, parsed.mimetype));
      } catch (e) {
        console.error("transkription Fehler:", e?.message ?? e);
        return json(502, { error: "Transkription fehlgeschlagen" });
      }
    }

    // Cockpit-Schreibop (PROJ-10 Etappe 3): Termin in Hero anlegen — NUR nach
    // menschlicher Bestätigung im Cockpit (Gate). Der Token schützt den Zugang.
    if (parsed && parsed.op === "termin-anlegen") {
      try {
        return json(200, heroTerminAnlegen(parsed.termin ?? {}));
      } catch (e) {
        console.error("termin-anlegen Fehler:", e?.message ?? e);
        return json(502, {
          error: "Hero-Schreibfehler",
          detail: String(e?.message ?? e).slice(0, 500),
        });
      }
    }

    const messages = parsed?.messages;
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
