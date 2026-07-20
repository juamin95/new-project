import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "./route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));

type Result = { data: unknown; error: unknown };

function fakeSupabase(user: unknown, result: Result) {
  const builder = {
    select: () => builder,
    insert: () => builder,
    eq: () => builder,
    order: () => builder,
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

const postReq = (body: unknown) =>
  new Request("http://localhost/api/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

beforeEach(() => vi.clearAllMocks());

describe("GET /api/conversations", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: [], error: null }));
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("liefert die Gesprächsliste für angemeldete Nutzer", async () => {
    mockClient(
      fakeSupabase({ id: "u1" }, { data: [{ id: "c1", title: "Test" }], error: null }),
    );
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.conversations).toHaveLength(1);
  });
});

describe("POST /api/conversations", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    const res = await POST(postReq({ scope: "allgemein" }));
    expect(res.status).toBe(401);
  });

  it("400 bei ungültigem scope", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    const res = await POST(postReq({ scope: "unsinn" }));
    expect(res.status).toBe(400);
  });

  it("201 legt ein Gespräch an", async () => {
    mockClient(
      fakeSupabase({ id: "u1" }, { data: { id: "c9", title: "Neuer Chat" }, error: null }),
    );
    const res = await POST(postReq({ scope: "allgemein" }));
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.conversation.id).toBe("c9");
  });
});
