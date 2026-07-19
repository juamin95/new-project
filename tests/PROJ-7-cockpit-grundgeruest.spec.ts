import { test, expect } from "@playwright/test";

// E2E-Regressionssuite für PROJ-7 (Cockpit-Grundgerüst).
// Deckt den öffentlichen/nicht angemeldeten Bereich, Auth-Umleitungen, Sicherheits-
// Header, PWA-Manifest und Responsivität ab. Läuft in Chromium + Mobile Safari.

test.describe("PROJ-7: Türsteher (Auth-Schutz)", () => {
  for (const path of ["/", "/offene-punkte", "/chat", "/lernen"]) {
    test(`nicht angemeldet: ${path} leitet auf /login`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/login(\?.*)?$/);
    });
  }
});

test.describe("PROJ-7: Login-Seite", () => {
  test("zeigt Logo, E-Mail-Feld, Button und Vertrauenshinweis", async ({
    page,
  }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "Willkommen im Cockpit" }),
    ).toBeVisible();
    await expect(page.getByLabel("E-Mail")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Link anfordern" }),
    ).toBeVisible();
    await expect(page.getByText("Nur für Marvin und Julian.")).toBeVisible();
    await expect(
      page.getByRole("img", { name: /GRÜNSCHNITT/ }),
    ).toBeVisible();
  });

  test("Versand: neutrale Bestätigung nach Anforderung", async ({ page }) => {
    await page.route("**/auth/v1/otp*", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
    );
    await page.goto("/login");
    await page.getByLabel("E-Mail").fill("marvin@example.com");
    await page.getByRole("button", { name: "Link anfordern" }).click();
    await expect(page.getByText("Schau in dein Postfach")).toBeVisible();
  });

  test("Enumeration-Schutz: fremde Adresse → gleiche neutrale Bestätigung", async ({
    page,
  }) => {
    // Server antwortet mit Fehler (Adresse nicht erlaubt) — UI zeigt trotzdem neutral.
    await page.route("**/auth/v1/otp*", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ error: "user_not_found" }),
      }),
    );
    await page.goto("/login");
    await page.getByLabel("E-Mail").fill("fremd@example.com");
    await page.getByRole("button", { name: "Link anfordern" }).click();
    await expect(page.getByText("Schau in dein Postfach")).toBeVisible();
  });

  test("Rate-Limit: 429 zeigt Wartehinweis, keine kryptische Fehlermeldung", async ({
    page,
  }) => {
    await page.route("**/auth/v1/otp*", (route) =>
      route.fulfill({
        status: 429,
        contentType: "application/json",
        body: JSON.stringify({ error: "over_request_rate_limit" }),
      }),
    );
    await page.goto("/login");
    await page.getByLabel("E-Mail").fill("marvin@example.com");
    await page.getByRole("button", { name: "Link anfordern" }).click();
    await expect(page.getByText(/Zu viele Versuche/)).toBeVisible();
  });

  test("abgelaufener Link: erklärender Hinweis auf der Login-Seite", async ({
    page,
  }) => {
    await page.goto("/login?fehler=link");
    await expect(page.getByText(/Der Link ist abgelaufen/)).toBeVisible();
  });
});

test.describe("PROJ-7: Auth-Rückkehr", () => {
  test("Callback ohne Code → zurück zum Login mit Hinweis", async ({ page }) => {
    await page.goto("/auth/callback");
    await expect(page).toHaveURL(/\/login\?fehler=link/);
    await expect(page.getByText(/Der Link ist abgelaufen/)).toBeVisible();
  });
});

test.describe("PROJ-7: Sicherheit & PWA", () => {
  test("Sicherheits-Header sind gesetzt", async ({ page }) => {
    const res = await page.request.get("/login");
    const h = res.headers();
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("origin-when-cross-origin");
    expect(h["strict-transport-security"]).toContain("max-age=");
  });

  test("Manifest ist installierbar (Name, Start-URL, Icons)", async ({
    page,
  }) => {
    const res = await page.request.get("/manifest.webmanifest");
    expect(res.ok()).toBeTruthy();
    const m = await res.json();
    expect(m.name).toContain("GRÜNSCHNITT");
    expect(m.start_url).toBe("/offene-punkte");
    expect(m.display).toBe("standalone");
    expect(Array.isArray(m.icons) && m.icons.length).toBeGreaterThanOrEqual(2);
    expect(m.theme_color).toBe("#3a6328");
  });
});

test.describe("PROJ-7: Responsivität", () => {
  test("kein horizontaler Überlauf auf der Login-Seite", async ({ page }) => {
    await page.goto("/login");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
