import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const NewConversation = z.object({
  scope: z.enum(["allgemein", "kunde", "projekt"]).default("allgemein"),
  title: z.string().trim().min(1).max(120).optional(),
  bezug: z.string().trim().max(120).nullish(),
  hero_customer_id: z.string().trim().max(64).nullish(),
  hero_project_id: z.string().trim().max(64).nullish(),
});

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("cockpit_conversations")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ conversations: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const parsed = NewConversation.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("cockpit_conversations")
    .insert({
      scope: parsed.data.scope,
      title: parsed.data.title ?? "Neuer Chat",
      bezug: parsed.data.bezug ?? null,
      hero_customer_id: parsed.data.hero_customer_id ?? null,
      hero_project_id: parsed.data.hero_project_id ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ conversation: data }, { status: 201 });
}
