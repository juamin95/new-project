import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

const NewMessage = z
  .object({
    text: z.string().trim().max(4000).optional(),
    image_path: z.string().trim().max(400).nullish(),
  })
  .refine((v) => (v.text && v.text.length > 0) || v.image_path, {
    message: "Nachricht darf nicht leer sein",
  });

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("cockpit_messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ messages: data });
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const parsed = NewMessage.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });
  }

  const { data: userMessage, error: userErr } = await supabase
    .from("cockpit_messages")
    .insert({
      conversation_id: id,
      role: "user",
      text: parsed.data.text ?? null,
      image_path: parsed.data.image_path ?? null,
    })
    .select()
    .single();

  if (userErr) {
    return NextResponse.json({ error: userErr.message }, { status: 500 });
  }

  // Etappe 1: Platzhalter-Antwort. Der echte OS-Agent (VPS) wird in Etappe 2 angebunden.
  const { data: assistantMessage, error: aiErr } = await supabase
    .from("cockpit_messages")
    .insert({
      conversation_id: id,
      role: "assistant",
      text: "Der OS-Agent wird in Etappe 2 angebunden — dann beantworte ich das aus Vault und Hero.",
      thinking: ["(Vorschau) Agent noch nicht verbunden"],
    })
    .select()
    .single();

  if (aiErr) {
    return NextResponse.json({ error: aiErr.message }, { status: 500 });
  }

  return NextResponse.json({ userMessage, assistantMessage }, { status: 201 });
}
