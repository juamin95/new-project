import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));

type Result = { data: unknown; error: unknown };
type Captured = { insert?: Record<string, unknown> };

function fakeSupabase(user: unknown, result: Result, captured: Captured = {}) {
  const builder: Record<string, unknown> = {
    insert: (v: Record<string, unknown>) => {
      captured.insert = v;
      return builder;
    },
    select: () => builder,
    single: () => builder,
    eq: () => builder,
    then: (resolve: (r: Result) => void) => resolve(result),
  };
  return {
    auth: { getUser: async () => ({ data: { user } }) },
    from: () => builder,
  };
}

const mockClient = (c: unknown) =>
  vi.mocked(createClient).mockResolvedValue(c as never);

const req = (body: unknown) =>
  new Request("http://localhost/x/termin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const UUID = "11111111-1111-4111-8111-111111111111";
const gueltig = {
  titel: "Vor-Ort-Termin Kilian-Patt",
  von: "2026-07-25 09:00",
  bis: "2026-07-25 10:00",
  kategorie: "vor-ort-termin",
};

const agentOk = () =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      json: async () => ({ ok: true, event: { id: 999, title: gueltig.titel } }),
    })),
  );

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllGlobals());

describe("POST /api/conversations/[id]/termin", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    expect((await POST(req(gueltig), ctx(UUID))).status).toBe(401);
  });

  it("400 bei ungültiger Kategorie", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    const res = await POST(req({ ...gueltig, kategorie: "quatsch" }), ctx(UUID));
    expect(res.status).toBe(400);
  });

  it("200 legt Termin an und protokolliert 'erledigt'", async () => {
    agentOk();
    const captured: Captured = {};
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }, captured));
    const res = await POST(req(gueltig), ctx(UUID));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(captured.insert?.type).toBe("termin");
    expect(captured.insert?.status).toBe("erledigt");
  });

  it("502 + 'fehlgeschlagen' wenn Hero-Schreiben scheitert", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ ok: false, error: "Hero-Fehler" }),
      })),
    );
    const captured: Captured = {};
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }, captured));
    const res = await POST(req(gueltig), ctx(UUID));
    expect(res.status).toBe(502);
    expect(captured.insert?.status).toBe("fehlgeschlagen");
  });
});
