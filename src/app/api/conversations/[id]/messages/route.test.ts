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

const params = { params: Promise.resolve({ id: "c1" }) };

const postReq = (body: unknown) =>
  new Request("http://localhost/api/conversations/c1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

beforeEach(() => vi.clearAllMocks());

describe("GET /api/conversations/[id]/messages", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: [], error: null }));
    const res = await GET(new Request("http://localhost/x"), params);
    expect(res.status).toBe(401);
  });

  it("liefert die Nachrichten", async () => {
    mockClient(
      fakeSupabase({ id: "u1" }, { data: [{ id: "m1", role: "user" }], error: null }),
    );
    const res = await GET(new Request("http://localhost/x"), params);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.messages).toHaveLength(1);
  });
});

describe("POST /api/conversations/[id]/messages", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null, { data: null, error: null }));
    const res = await POST(postReq({ text: "hallo" }), params);
    expect(res.status).toBe(401);
  });

  it("400 bei leerer Nachricht", async () => {
    mockClient(fakeSupabase({ id: "u1" }, { data: null, error: null }));
    const res = await POST(postReq({}), params);
    expect(res.status).toBe(400);
  });

  it("201 speichert Nutzer- und Assistenten-Nachricht", async () => {
    mockClient(
      fakeSupabase({ id: "u1" }, { data: { id: "m9", role: "assistant" }, error: null }),
    );
    const res = await POST(postReq({ text: "Was habe ich morgen an?" }), params);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.userMessage).toBeTruthy();
    expect(body.assistantMessage).toBeTruthy();
  });
});
