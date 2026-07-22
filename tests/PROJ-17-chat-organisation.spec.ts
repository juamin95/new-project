import { test, expect } from "@playwright/test";

// E2E-Regressionssuite für PROJ-17 (Chat-Organisation).
// Auth ist passwortlos (Magic Link) — ohne Session-Fixture sind authentifizierte
// UI-Flows (Fortschrittsbalken, Zuordnungs-Pop-up) nicht per E2E automatisierbar;
// sie sind über Integrationstests (PATCH/status), die reine Berechnung
// (prozessketten) und eine reale Hero-Prüfung (UNB-142) abgedeckt (siehe Spec).
// Diese Suite sichert die HTTP-Ebene: die Schreib-/Lese-Endpunkte der Zuordnung
// lehnen nicht angemeldete Anfragen mit 401 ab (Middleware lässt /api durch,
// die Route schützt sich selbst).

const UUID = "11111111-1111-4111-8111-111111111111";

test.describe("PROJ-17: Endpunkte sind auth-geschützt", () => {
  test("PATCH /api/conversations/[id] (Zuordnung) ohne Anmeldung -> 401", async ({
    request,
  }) => {
    const res = await request.patch(`/api/conversations/${UUID}`, {
      data: { scope: "kunde", title: "Test" },
      maxRedirects: 0,
    });
    expect(res.status()).toBe(401);
  });

  test("POST /api/conversations/[id]/status ohne Anmeldung -> 401", async ({
    request,
  }) => {
    const res = await request.post(`/api/conversations/${UUID}/status`, {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(401);
  });

  test("DELETE /api/conversations/[id] ohne Anmeldung -> 401", async ({
    request,
  }) => {
    const res = await request.delete(`/api/conversations/${UUID}`, {
      maxRedirects: 0,
    });
    expect(res.status()).toBe(401);
  });
});
