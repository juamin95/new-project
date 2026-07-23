// PROJ-10 Etappe 3+: neues Projekt über den OS-Agenten in Hero anlegen (gated Write).
// Wird nur vom projekt-Endpunkt nach menschlicher Bestätigung aufgerufen.

const AGENT_URL = process.env.OS_AGENT_URL ?? "http://127.0.0.1:8787";
const AGENT_TOKEN = process.env.OS_AGENT_TOKEN ?? "";

export type ProjektInput = {
  name: string;
  customer_id: number;
  address_id: number;
  gewerk?: string | null;
  projekttyp?: string | null;
};

export async function legeProjektAn(
  projekt: ProjektInput,
): Promise<{ ok: boolean; projekt?: unknown; error?: string }> {
  try {
    const res = await fetch(AGENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agent-token": AGENT_TOKEN },
      body: JSON.stringify({ op: "projekt-anlegen", projekt }),
      signal: AbortSignal.timeout(30000),
    });
    const d = await res.json().catch(() => ({}));
    if (!res.ok || !d?.ok) {
      return { ok: false, error: d?.error ?? d?.detail ?? "Hero-Schreibfehler" };
    }
    return { ok: true, projekt: d.projekt };
  } catch {
    return { ok: false, error: "OS-Agent nicht erreichbar" };
  }
}
