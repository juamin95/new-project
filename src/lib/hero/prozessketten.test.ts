import { describe, it, expect } from "vitest";
import { berechneFortschritt, istInaktiv, PROJEKTTYP_IDS } from "./prozessketten";

describe("berechneFortschritt", () => {
  it("Abo, Status 1111 -> Schritt 3 von 4 (75%), Archiviert zählt nicht", () => {
    const f = berechneFortschritt("65869", 1111);
    expect(f.typ).toBe("abo");
    expect(f.stepIndex).toBe(3);
    expect(f.stepTotal).toBe(4);
    expect(f.prozent).toBe(75);
    expect(f.statusLabel).toBe("In Umsetzung");
    expect(f.isInactive).toBe(false);
  });

  it("Bauprojekt, Status 201 -> Schritt 1 von 11", () => {
    const f = berechneFortschritt("32646", 201);
    expect(f.typ).toBe("bauprojekt");
    expect(f.stepIndex).toBe(1);
    expect(f.stepTotal).toBe(11);
    expect(f.prozent).toBe(9);
  });

  it("Projekt ohne Angebot, Status 1150 -> Schritt 4 von 5 (80%)", () => {
    const f = berechneFortschritt("65686", 1150);
    expect(f.typ).toBe("projekt-ohne-angebot");
    expect(f.stepIndex).toBe(4);
    expect(f.stepTotal).toBe(5);
    expect(f.prozent).toBe(80);
  });

  it("Status 2000 -> inaktiv, letzter Schritt = 100%", () => {
    const f = berechneFortschritt("65869", 2000);
    expect(f.isInactive).toBe(true);
    expect(f.stepIndex).toBe(4);
    expect(f.stepTotal).toBe(4);
    expect(f.prozent).toBe(100);
  });

  it("Status 2100 (Archiviert) -> inaktiv, aber nicht in der Kette (kein Balken)", () => {
    const f = berechneFortschritt("32646", 2100);
    expect(f.isInactive).toBe(true);
    expect(f.stepIndex).toBeNull();
  });

  it("unbekannter Typ -> kein Balken", () => {
    const f = berechneFortschritt("99999", 1111);
    expect(f.typ).toBeNull();
    expect(f.stepIndex).toBeNull();
    expect(f.prozent).toBeNull();
  });

  it("fehlender Typ/Status -> kein Balken, kein Absturz", () => {
    expect(berechneFortschritt(null, null).prozent).toBeNull();
    expect(berechneFortschritt("65869", null).stepIndex).toBeNull();
  });

  it("Statuscode nicht in der Kette -> kein Balken, Typ bekannt", () => {
    const f = berechneFortschritt("65869", 601); // 601 gibt es nur im Bauprojekt
    expect(f.typ).toBe("abo");
    expect(f.stepIndex).toBeNull();
  });

  it("istInaktiv erkennt 2000/2100", () => {
    expect(istInaktiv(2000)).toBe(true);
    expect(istInaktiv(2100)).toBe(true);
    expect(istInaktiv(1111)).toBe(false);
    expect(istInaktiv(null)).toBe(false);
  });

  it("kennt die drei aktiven Projekttyp-IDs", () => {
    expect(PROJEKTTYP_IDS["32646"]).toBe("bauprojekt");
    expect(PROJEKTTYP_IDS["65686"]).toBe("projekt-ohne-angebot");
    expect(PROJEKTTYP_IDS["65869"]).toBe("abo");
  });
});
