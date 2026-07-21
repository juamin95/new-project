import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DELETE, PATCH } from "./route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));

type Result = { data: unknown; error: unknown };
type Captured = { update?: Record<string, unknown> };

function fakeSupabase(user: unknown, result: Result, captured: Captured = {}) {
  const builder: Record<string, unknown> = {
    select: () => builder,
    insert: () => builder,
    update: (v: Record<string, unknown>) => {
      captured.update = v;
      return builder;
    },
    delete: () => builder,
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

const delReq = () => new Request("http://localhost/x", { method: "DELETE" });
const patchReq = (body: unknown) =>
  new Request("http://localhost/x", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const UUID = "11111111-1111-4111-8111-111111111111";

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllGlobals());

describe("DELETE /api/conversations/[id]", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    expect((await DELETE(delReq(), ctx(UUID))).status).toBe(401);
  });
  it("400 bei ungültiger ID", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    expect((await DELETE(delReq(), ctx("kein-uuid"))).status).toBe(400);
  });
  it("200 löscht das Gespräch", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    const res = await DELETE(delReq(), ctx(UUID));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });
  it("500 bei Datenbankfehler", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: { message: "boom" } }));
    expect((await DELETE(delReq(), ctx(UUID))).status).toBe(500);
  });
});

describe("PATCH /api/conversations/[id] (Zuordnung)", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    expect((await PATCH(patchReq({ scope: "kunde" }), ctx(UUID))).status).toBe(401);
  });

  it("400 bei ungültigem scope", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    expect((await PATCH(patchReq({ scope: "quatsch" }), ctx(UUID))).status).toBe(400);
  });

  it("Kunden-Zuordnung: speichert ohne Fortschritt (leerer Schnappschuss)", async () => {
    const captured: Captured = {};
    mockClient(
      fakeSupabase({ id: "u1" }, { data: { id: UUID, scope: "kunde" }, error: null }, captured),
    );
    const res = await PATCH(
      patchReq({ scope: "kunde", title: "Christina Kilian-Patt", hero_customer_id: "5711737" }),
      ctx(UUID),
    );
    expect(res.status).toBe(200);
    expect(captured.update?.scope).toBe("kunde");
    expect(captured.update?.title).toBe("Christina Kilian-Patt");
    expect(captured.update?.hero_customer_id).toBe("5711737");
    expect(captured.update?.step_index).toBeNull();
    expect(captured.update?.is_inactive).toBe(false);
  });

  it("Projekt-Zuordnung: holt Status vom Agenten und berechnet Schritt X/Y", async () => {
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
    const captured: Captured = {};
    mockClient(fakeSupabase({ id: "u1" }, { data: { id: UUID }, error: null }, captured));
    const res = await PATCH(
      patchReq({ scope: "projekt", hero_project_nr: "GABO-152", title: "GABO-152 – Abo" }),
      ctx(UUID),
    );
    expect(res.status).toBe(200);
    expect(captured.update?.project_type_id).toBe("65869");
    expect(captured.update?.status_code).toBe(1111);
    expect(captured.update?.step_index).toBe(3);
    expect(captured.update?.step_total).toBe(4);
    expect(captured.update?.status_label).toBe("In Umsetzung");
    expect(captured.update?.is_inactive).toBe(false);
  });

  it("Projekt-Zuordnung bei offline-Agent: speichert Referenz, aber ohne Fortschritt", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("offline");
      }),
    );
    const captured: Captured = {};
    mockClient(fakeSupabase({ id: "u1" }, { data: { id: UUID }, error: null }, captured));
    const res = await PATCH(
      patchReq({ scope: "projekt", hero_project_nr: "GABO-152" }),
      ctx(UUID),
    );
    expect(res.status).toBe(200);
    expect(captured.update?.hero_project_nr).toBe("GABO-152");
    expect(captured.update?.step_index).toBeNull();
  });
});
