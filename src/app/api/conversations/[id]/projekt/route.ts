import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { legeProjektAn } from "@/lib/hero/projekt-anlegen";

type Params = { params: Promise<{ id: string }> };

const IdSchema = z.string().uuid();

// Bestätigter Projekt-Vorschlag (nach menschlicher Freigabe im Pop-up).
const ProjektSchema = z.object({
  name: z.string().trim().min(1).max(160),
  customer_id: z.number().int().positive(),
  address_id: z.number().int().positive(),
  gewerk: z.enum(["gartengestaltung", "gartenpflege", "abo", "unbekannt"]).nullish(),
  projekttyp: z.enum(["projekt", "ohne-angebot", "abo"]).nullish(),
  bezug: z.string().trim().max(160).nullish(),
});

// Gate-Ausführung: Projekt nach Bestätigung in Hero anlegen und in cockpit_actions
// protokollieren (Audit). Projekte haben keinen Entwurfsmodus -> direkte Anlage.
export async function POST(request: Request, { params }: Params) {
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

  const parsed = ProjektSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });
  }
  const p = parsed.data;

  const result = await legeProjektAn({
    name: p.name,
    customer_id: p.customer_id,
    address_id: p.address_id,
    gewerk: p.gewerk ?? null,
    projekttyp: p.projekttyp ?? null,
  });

  await supabase.from("cockpit_actions").insert({
    conversation_id: id,
    type: "projekt",
    status: result.ok ? "erledigt" : "fehlgeschlagen",
    payload: {
      ...p,
      projekt: result.ok ? result.projekt : null,
      error: result.ok ? null : result.error,
    },
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, projekt: result.projekt });
}
