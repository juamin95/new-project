import { test, expect } from "@playwright/test";

// E2E für PROJ-10 Etappe 3 (Termin-Schreibpfad, Sprache-zu-Text).
// Authentifizierte Chat-Flows sind Magic-Link-gebunden und über Integrationstests +
// reale Smoke-Tests (Hero-Termin, OpenAI-Transkription, Claude-Vision) abgedeckt.
// Diese Suite sichert die HTTP-Ebene: die neuen Schreib-/Medien-Endpunkte lehnen
// nicht angemeldete Anfragen mit 401 ab (Middleware lässt /api durch, Route schützt sich selbst).

const UUID = "11111111-1111-4111-8111-111111111111";

test.describe("PROJ-10 Etappe 3: Endpunkte sind auth-geschützt", () => {
  test("POST /api/conversations/[id]/termin ohne Anmeldung -> 401", async ({
    request,
  }) => {
    const res = await request.post(`/api/conversations/${UUID}/termin`, {
      data: {
        titel: "Test",
        von: "2026-07-25 09:00",
        bis: "2026-07-25 10:00",
        kategorie: "buero",
      },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(401);
  });

  test("POST /api/transcribe ohne Anmeldung -> 401", async ({ request }) => {
    const res = await request.post(`/api/transcribe`, {
      headers: { "content-type": "audio/webm" },
      data: "abc",
      maxRedirects: 0,
    });
    expect(res.status()).toBe(401);
  });
});
