// PROJ-10 Etappe 3: Termin über den OS-Agenten in Hero anlegen (gated Write).
// Wird NUR vom termin-Endpunkt nach menschlicher Bestätigung aufgerufen. Der Agent
// läuft auf demselben Host (localhost) und führt den Hero-Schreibbefehl aus.

const AGENT_URL = process.env.OS_AGENT_URL ?? "http://127.0.0.1:8787";
const AGENT_TOKEN = process.env.OS_AGENT_TOKEN ?? "";

export type TerminInput = {
  titel: string;
  von: string;
  bis: string;
  kategorie: string;
  beschreibung?: string | null;
  project_match_id?: number | null;
};

export async function legeTerminAn(
  termin: TerminInput,
): Promise<{ ok: boolean; event?: unknown; error?: string }> {
  try {
    const res = await fetch(AGENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agent-token": AGENT_TOKEN },
      body: JSON.stringify({ op: "termin-anlegen", termin }),
      signal: AbortSignal.timeout(30000),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || !d?.ok) {
      return { ok: false, error: d?.error ?? d?.detail ?? "Hero-Schreibfehler" };
    }
    return { ok: true, event: d.event };
  } catch {
    return { ok: false, error: "OS-Agent nicht erreichbar" };
  }
}
