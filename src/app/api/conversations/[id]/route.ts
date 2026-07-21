import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  ladeProjektStatus,
  baueSnapshot,
  leererSnapshot,
} from "@/lib/hero/projekt-snapshot";

type Params = { params: Promise<{ id: string }> };

const IdSchema = z.string().uuid();

// Zuordnung eines Gesprächs zu einem Hero-Projekt/Kunden (nach Bestätigung im Pop-up).
const AssignSchema = z.object({
  scope: z.enum(["allgemein", "kunde", "projekt"]),
  title: z.string().trim().min(1).max(120).optional(),
  hero_customer_id: z.string().trim().max(64).nullish(),
  hero_project_id: z.string().trim().max(64).nullish(),
  hero_project_nr: z.string().trim().max(64).nullish(),
});

// Gespräch löschen. Nachrichten und Aktionen hängen per ON DELETE CASCADE am
// Gespräch und werden automatisch mit entfernt. RLS (for all) sichert zusätzlich ab.
export async function DELETE(_request: Request, { params }: Params) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const { id } = await params;
  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });
  }

  const { error } = await supabase
    .from("cockpit_conversations")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

// Zuordnung setzen/ändern. Bei Projekt-Scope wird zusätzlich der Fortschritts-
// Schnappschuss aus Hero geholt (über den OS-Agenten). Ist Hero nicht erreichbar,
// wird die Zuordnung trotzdem gespeichert — ohne Fortschritt (nachladbar via /status).
export async function PATCH(request: Request, { params }: Params) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const { id } = await params;
  if (!IdSchema.safeParse(id).success) {
    return NextResponse.json({ error: "Ungültige ID" }, { status: 400 });
  }

  const parsed = AssignSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });
  }
  const b = parsed.data;

  const update: Record<string, unknown> = {
    scope: b.scope,
    hero_customer_id: b.hero_customer_id ?? null,
    hero_project_id: b.hero_project_id ?? null,
  };
  if (b.title) update.title = b.title;

  if (b.scope === "projekt") {
    const ref = (b.hero_project_nr ?? b.hero_project_id ?? "").trim();
    const result = ref ? await ladeProjektStatus(ref) : null;
    if (result?.found && result.project) {
      Object.assign(update, baueSnapshot(result.project));
    } else {
      // Hero nicht erreichbar/nicht gefunden: Referenz merken, Fortschritt bleibt leer.
      const empty = leererSnapshot();
      empty.hero_project_nr = ref || null;
      Object.assign(update, empty);
    }
  } else {
    // Kunde/Allgemein: kein Prozessfortschritt -> Schnappschuss leeren.
    Object.assign(update, leererSnapshot());
  }

  const { data, error } = await supabase
    .from("cockpit_conversations")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ conversation: data });
}
