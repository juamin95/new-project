import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));

type Result = { data: unknown; error: unknown };
type Captured = { update?: Record<string, unknown> };

function fakeSupabase(user: unknown, result: Result, captured: Captured = {}) {
  const builder: Record<string, unknown> = {
    select: () => builder,
    update: (v: Record<string, unknown>) => {
      captured.update = v;
      return builder;
    },
    eq: () => builder,
    single: () => builder,
    then: (resolve: (r: Result) => void) => resolve(result),
  };
  return {
    auth: { getUser: async () => ({ data: { user } }) },
    from: () => builder,
  };
}

const mockClient = (c: unknown) =>
  vi.mocked(createClient).mockResolvedValue(c as never);

const req = () => new Request("http://localhost/x/status", { method: "POST" });
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const UUID = "11111111-1111-4111-8111-111111111111";

const agentFound = () =>
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: true,
      json: async () => ({
        found: true,
        project: {
          project_nr: "GABO-152",
          type: { id: 65869, name: "Abo" },
          status: { status_code: 1111, name: "In Umsetzung" },
        },
      }),
    })),
  );

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllGlobals());

describe("POST /api/conversations/[id]/status", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    expect((await POST(req(), ctx(UUID))).status).toBe(401);
  });

  it("404 wenn Gespräch fehlt", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    expect((await POST(req(), ctx(UUID))).status).toBe(404);
  });

  it("refreshed:false bei Kunden-Scope", async () => {
    mockClient(
      fakeSupabase({ id: "u1" }, { data: { id: UUID, scope: "kunde" }, error: null }),
    );
    const res = await POST(req(), ctx(UUID));
    expect(res.status).toBe(200);
    expect((await res.json()).refreshed).toBe(false);
  });

  it("refreshed:true bei Projekt + Agent liefert Status", async () => {
    agentFound();
    const captured: Captured = {};
    mockClient(
      fakeSupabase(
        { id: "u1" },
        { data: { id: UUID, scope: "projekt", hero_project_nr: "GABO-152" }, error: null },
        captured,
      ),
    );
    const res = await POST(req(), ctx(UUID));
    expect(res.status).toBe(200);
    expect((await res.json()).refreshed).toBe(true);
    expect(captured.update?.step_index).toBe(3);
    expect(captured.update?.step_total).toBe(4);
  });

  it("refreshed:false bei offline-Agent", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("offline");
      }),
    );
    mockClient(
      fakeSupabase(
        { id: "u1" },
        { data: { id: UUID, scope: "projekt", hero_project_nr: "GABO-152" }, error: null },
      ),
    );
    const res = await POST(req(), ctx(UUID));
    expect(res.status).toBe(200);
    expect((await res.json()).refreshed).toBe(false);
  });
});
