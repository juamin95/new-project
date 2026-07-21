import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

const IdSchema = z.string().uuid();

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
