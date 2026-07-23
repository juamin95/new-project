import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// PROJ-10 Etappe 3: Sprachmemo → Text. Das Cockpit nimmt das Audio entgegen und
// reicht es an den OS-Agenten weiter, der OpenAI aufruft (AI-Keys bleiben im Agenten).
const AGENT_URL = process.env.OS_AGENT_URL ?? "http://127.0.0.1:8787";
const AGENT_TOKEN = process.env.OS_AGENT_TOKEN ?? "";
const MAX_BYTES = 20 * 1024 * 1024; // 20 MB Schutzgrenze

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const mimetype = request.headers.get("content-type") ?? "audio/webm";
  const buf = Buffer.from(await request.arrayBuffer());
  if (buf.length === 0) {
    return NextResponse.json({ error: "Kein Audio" }, { status: 400 });
  }
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: "Audio zu groß" }, { status: 413 });
  }

  try {
    const res = await fetch(AGENT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-agent-token": AGENT_TOKEN },
      body: JSON.stringify({
        op: "transkription",
        audio_base64: buf.toString("base64"),
        mimetype,
      }),
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Transkription fehlgeschlagen" }, { status: 502 });
    }
    const d = await res.json();
    return NextResponse.json({ text: String(d.text ?? "") });
  } catch {
    return NextResponse.json({ error: "OS-Agent nicht erreichbar" }, { status: 502 });
  }
}
