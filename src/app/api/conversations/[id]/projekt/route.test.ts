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
  new Request("http://localhost/x/projekt", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const UUID = "11111111-1111-4111-8111-111111111111";
const gueltig = {
  name: "20260723_Amini_Gartenpflege",
  customer_id: 5711737,
  address_id: 123456,
  gewerk: "gartenpflege",
};

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllGlobals());

describe("POST /api/conversations/[id]/projekt", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    expect((await POST(req(gueltig), ctx(UUID))).status).toBe(401);
  });

  it("400 bei fehlender address_id", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    const { address_id, ...ohne } = gueltig;
    void address_id;
    expect((await POST(req(ohne), ctx(UUID))).status).toBe(400);
  });

  it("200 legt Projekt an und protokolliert 'erledigt'", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ ok: true, projekt: { id: 42, project_nr: "PFL-200" } }),
      })),
    );
    const captured: Captured = {};
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }, captured));
    const res = await POST(req(gueltig), ctx(UUID));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    expect(captured.insert?.type).toBe("projekt");
    expect(captured.insert?.status).toBe("erledigt");
  });

  it("502 + 'fehlgeschlagen' wenn Hero-Schreiben scheitert", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ ok: false, error: "Hero-Fehler" }) })),
    );
    const captured: Captured = {};
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }, captured));
    const res = await POST(req(gueltig), ctx(UUID));
    expect(res.status).toBe(502);
    expect(captured.insert?.status).toBe("fehlgeschlagen");
  });
});
