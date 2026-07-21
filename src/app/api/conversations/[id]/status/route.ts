import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { ladeProjektStatus, baueSnapshot } from "@/lib/hero/projekt-snapshot";

type Params = { params: Promise<{ id: string }> };

const IdSchema = z.string().uuid();

// Fortschritt eines zugeordneten Chats mit Hero abgleichen (beim Öffnen/Laden).
// Liest den aktuellen Hero-Status über den OS-Agenten und aktualisiert den
// Schnappschuss am Gespräch. Nur lesend gegenüber Hero.
export async function POST(_request: Request, { params }: Params) {
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

  const { data: conv, error: readErr } = await supabase
    .from("cockpit_conversations")
    .select("id, scope, hero_project_id, hero_project_nr")
    .eq("id", id)
    .single();

  if (readErr || !conv) {
    return NextResponse.json({ error: "Gespräch nicht gefunden" }, { status: 404 });
  }

  // Nur Projekt-Chats haben einen Fortschritt.
  if (conv.scope !== "projekt") {
    return NextResponse.json({ refreshed: false });
  }

  const ref = String(conv.hero_project_nr ?? conv.hero_project_id ?? "").trim();
  const result = ref ? await ladeProjektStatus(ref) : null;
  if (!result?.found || !result.project) {
    // Hero nicht erreichbar oder Projekt nicht gefunden: alten Stand behalten.
    return NextResponse.json({ refreshed: false });
  }

  const { data, error } = await supabase
    .from("cockpit_conversations")
    .update(baueSnapshot(result.project))
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ refreshed: true, conversation: data });
}
