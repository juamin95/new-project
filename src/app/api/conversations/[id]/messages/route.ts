import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

type Params = { params: Promise<{ id: string }> };

// OS-Agent (Etappe 2). Läuft auf demselben Host (VPS) und wird über localhost
// aufgerufen. Ist OS_AGENT_URL nicht gesetzt, bleibt der Platzhalter (Etappe 1).
const AGENT_URL = process.env.OS_AGENT_URL;
const AGENT_TOKEN = process.env.OS_AGENT_TOKEN ?? "";

async function fragAgent(
  messages: { role: string; content: string }[],
): Promise<{ text: string; thinking: string[] } | null> {
  if (!AGENT_URL || messages.length === 0) return null;
  try {
    const res = await fetch(AGENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agent-token": AGENT_TOKEN },
      body: JSON.stringify({ messages }),
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) return null;
    const d = await res.json();
    return {
      text: String(d.text ?? ""),
      thinking: Array.isArray(d.thinking) ? d.thinking : [],
    };
  } catch {
    return null;
  }
}

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

  // Verlauf für den Agenten aufbauen (inkl. der gerade gespeicherten Nutzer-Nachricht).
  const { data: hist } = await supabase
    .from("cockpit_messages")
    .select("role, text")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });
  const verlauf = (Array.isArray(hist) ? hist : [])
    .filter((m) => m.text)
    .map((m) => ({ role: m.role as string, content: m.text as string }));

  // Etappe 2: echten Agenten fragen; ohne konfigurierten Agenten Platzhalter.
  const agent = await fragAgent(verlauf);
  const assistantText =
    agent?.text ||
    "Der OS-Agent ist noch nicht angebunden. Sobald der Dienst läuft, beantworte ich das aus Vault und Hero.";
  const thinking = agent?.thinking ?? ["(Vorschau) Agent noch nicht verbunden"];

  const { data: assistantMessage, error: aiErr } = await supabase
    .from("cockpit_messages")
    .insert({
      conversation_id: id,
      role: "assistant",
      text: assistantText,
      thinking,
    })
    .select()
    .single();

  if (aiErr) {
    return NextResponse.json({ error: aiErr.message }, { status: 500 });
  }

  return NextResponse.json({ userMessage, assistantMessage }, { status: 201 });
}
