// PROJ-17: Projekt-Status vom OS-Agenten holen und daraus den Schnappschuss
// fürs Gespräch bauen. Der Agent läuft auf demselben Host (localhost) und liest
// Hero (nur lesend). Ist er nicht erreichbar, geben wir null zurück — der Aufrufer
// speichert die Zuordnung dann ohne Fortschritt (Edge Case "Hero nicht erreichbar").

import { berechneFortschritt } from "./prozessketten";

const AGENT_URL = process.env.OS_AGENT_URL ?? "http://127.0.0.1:8787";
const AGENT_TOKEN = process.env.OS_AGENT_TOKEN ?? "";

export type ProjektStatusResult = {
  found: boolean;
  project?: {
    id: number | null;
    project_nr: string | null;
    name: string | null;
    project_title: string | null;
    customer: { id: number; full_name: string } | null;
    type: { id: number | string; name: string } | null;
    status: { status_code: number; name: string; short_name?: string } | null;
  };
};

export async function ladeProjektStatus(
  ref: string,
): Promise<ProjektStatusResult | null> {
  if (!ref) return null;
  try {
    const res = await fetch(AGENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agent-token": AGENT_TOKEN },
      body: JSON.stringify({ op: "projekt-status", ref }),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;
    return (await res.json()) as ProjektStatusResult;
  } catch {
    return null;
  }
}

export type Snapshot = {
  hero_project_nr: string | null;
  project_type_id: string | null;
  project_type_name: string | null;
  status_code: number | null;
  status_label: string | null;
  step_index: number | null;
  step_total: number | null;
  is_inactive: boolean;
  hero_synced_at: string;
};

// Leerer Schnappschuss (z. B. wenn kein Projekt zugeordnet ist oder Hero nichts liefert).
export function leererSnapshot(): Snapshot {
  return {
    hero_project_nr: null,
    project_type_id: null,
    project_type_name: null,
    status_code: null,
    status_label: null,
    step_index: null,
    step_total: null,
    is_inactive: false,
    hero_synced_at: new Date().toISOString(),
  };
}

// Baut die Snapshot-Spalten aus einem Hero-Projekt (inkl. Schritt X/Y).
export function baueSnapshot(
  project: NonNullable<ProjektStatusResult["project"]>,
): Snapshot {
  const typeId = project.type?.id ?? null;
  const statusCode = project.status?.status_code ?? null;
  const f = berechneFortschritt(typeId, statusCode);
  return {
    hero_project_nr: project.project_nr,
    project_type_id: typeId != null ? String(typeId) : null,
    project_type_name: project.type?.name ?? null,
    status_code: statusCode,
    // Hero-Klartext bevorzugt, sonst das Label aus der Kette.
    status_label: project.status?.name ?? f.statusLabel,
    step_index: f.stepIndex,
    step_total: f.stepTotal,
    is_inactive: f.isInactive,
    hero_synced_at: new Date().toISOString(),
  };
}
