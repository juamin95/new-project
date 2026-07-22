import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { legeTerminAn } from "@/lib/hero/termin";

type Params = { params: Promise<{ id: string }> };

const IdSchema = z.string().uuid();

// Bestätigter Termin-Vorschlag (nach menschlicher Freigabe im Pop-up).
const TerminSchema = z.object({
  titel: z.string().trim().min(1).max(160),
  von: z.string().trim().min(1).max(40),
  bis: z.string().trim().min(1).max(40),
  kategorie: z.enum([
    "umsetzung",
    "vor-ort-termin",
    "schlechtwetter",
    "buero",
    "besprechung",
    "schule",
  ]),
  beschreibung: z.string().trim().max(1000).nullish(),
  project_match_id: z.number().int().positive().nullish(),
  bezug: z.string().trim().max(160).nullish(),
});

// Gate-Ausführung: Termin nach Bestätigung tatsächlich in Hero anlegen und den
// Vorgang in cockpit_actions protokollieren (Audit-Trail — nie Autoversand).
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

  const parsed = TerminSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Eingabe" }, { status: 400 });
  }
  const t = parsed.data;

  const result = await legeTerminAn({
    titel: t.titel,
    von: t.von,
    bis: t.bis,
    kategorie: t.kategorie,
    beschreibung: t.beschreibung ?? null,
    project_match_id: t.project_match_id ?? null,
  });

  // Audit-Eintrag immer schreiben, Status je nach Ergebnis.
  await supabase.from("cockpit_actions").insert({
    conversation_id: id,
    type: "termin",
    status: result.ok ? "erledigt" : "fehlgeschlagen",
    payload: {
      ...t,
      event: result.ok ? result.event : null,
      error: result.ok ? null : result.error,
    },
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }
  return NextResponse.json({ ok: true, event: result.event });
}
