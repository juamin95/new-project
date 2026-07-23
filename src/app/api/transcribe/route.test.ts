import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";
import { createClient } from "@/lib/supabase/server";

vi.mock("@/lib/supabase/server", () => ({ createClient: vi.fn() }));

function fakeSupabase(user: unknown) {
  return { auth: { getUser: async () => ({ data: { user } }) } };
}

const mockClient = (c: unknown) =>
  vi.mocked(createClient).mockResolvedValue(c as never);

const audioReq = (content: string) =>
  new Request("http://localhost/api/transcribe", {
    method: "POST",
    headers: { "content-type": "audio/webm" },
    body: content,
  });

beforeEach(() => vi.clearAllMocks());
afterEach(() => vi.unstubAllGlobals());

describe("POST /api/transcribe", () => {
  it("401 ohne Anmeldung", async () => {
    mockClient(fakeSupabase(null));
    expect((await POST(audioReq("abc"))).status).toBe(401);
  });

  it("400 bei leerem Audio", async () => {
    mockClient(fakeSupabase({ id: "u1" }));
    expect((await POST(audioReq(""))).status).toBe(400);
  });

  it("200 liefert transkribierten Text", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: true, json: async () => ({ text: "Termin morgen um neun" }) })),
    );
    mockClient(fakeSupabase({ id: "u1" }));
    const res = await POST(audioReq("abcd"));
    expect(res.status).toBe(200);
    expect((await res.json()).text).toBe("Termin morgen um neun");
  });

  it("502 wenn der Agent scheitert", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => ({ ok: false, json: async () => ({}) })));
    mockClient(fakeSupabase({ id: "u1" }));
    expect((await POST(audioReq("abc"))).status).toBe(502);
  });
});
