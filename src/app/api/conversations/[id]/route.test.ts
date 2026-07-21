import { describe, it, expect, vi, beforeEach } from "vitest";
import { DELETE } from "./route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));

type Result = { data: unknown; error: unknown };

function fakeSupabase(user: unknown, result: Result) {
  const builder = {
    delete: () => builder,
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

const req = () => new Request("http://localhost/api/conversations/x", { method: "DELETE" });
const ctx = (id: string) => ({ params: Promise.resolve({ id }) });
const UUID = "11111111-1111-4111-8111-111111111111";

beforeEach(() => vi.clearAllMocks());

describe("DELETE /api/conversations/[id]", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    const res = await DELETE(req(), ctx(UUID));
    expect(res.status).toBe(401);
  });

  it("400 bei ungültiger ID", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    const res = await DELETE(req(), ctx("kein-uuid"));
    expect(res.status).toBe(400);
  });

  it("200 löscht das Gespräch", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    const res = await DELETE(req(), ctx(UUID));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  it("500 bei Datenbankfehler", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: { message: "boom" } }));
    const res = await DELETE(req(), ctx(UUID));
    expect(res.status).toBe(500);
  });
});
