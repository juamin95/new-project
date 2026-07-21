// PROJ-17: Prozessketten je Hero-Projekttyp (verifiziert im Vault,
// "Gewerke und Projekttypen (Measure, ProjectType)", Stand 2026-07-14).
// Die Status-Schritte sind per Hero-API nicht änderbar (nur im UI-Editor),
// darum liegen sie hier als feste Nachschlagetabelle. Quelle der Wahrheit für
// den AKTUELLEN Status bleibt Hero; hier wird nur die Position in der Kette
// berechnet ("Schritt X von Y").

export type Projekttyp = "bauprojekt" | "projekt-ohne-angebot" | "abo";

// Hero-ProjectType-IDs -> unser Kettenschlüssel.
export const PROJEKTTYP_IDS: Record<string, Projekttyp> = {
  "32646": "bauprojekt", // "Projekt" (is_default), voller Weg mit Angebot
  "65686": "projekt-ohne-angebot", // Direktauftrag
  "65869": "abo", // Wartungsvertrags-Einsatz
};

type Schritt = { code: number; label: string };

// Reihenfolge = Prozessreihenfolge. Codes sind typübergreifend konsistent.
const KETTEN: Record<Projekttyp, Schritt[]> = {
  bauprojekt: [
    { code: 201, label: "Anfrage eingegangen" },
    { code: 400, label: "Vor-Ort-Termin" },
    { code: 601, label: "Angebotserstellung" },
    { code: 701, label: "Detailgespräch" },
    { code: 801, label: "Auftragsvergabe" },
    { code: 1001, label: "Auftragsbestätigung" },
    { code: 1101, label: "Termin festgelegt" },
    { code: 1111, label: "In Umsetzung" },
    { code: 1150, label: "Kundenrechnung" },
    { code: 1500, label: "Reklamation" },
    { code: 2000, label: "Abgeschlossen" },
    { code: 2100, label: "Archiviert" },
  ],
  "projekt-ohne-angebot": [
    { code: 201, label: "Anfrage eingegangen" },
    { code: 1101, label: "Termin festgelegt" },
    { code: 1111, label: "In Umsetzung" },
    { code: 1150, label: "Rechnung" },
    { code: 2000, label: "Abgeschlossen" },
    { code: 2100, label: "Archiviert" },
  ],
  abo: [
    { code: 201, label: "Offener Auftrag" },
    { code: 1101, label: "Termin festgelegt" },
    { code: 1111, label: "In Umsetzung" },
    { code: 2000, label: "Abgeschlossen" },
    { code: 2100, label: "Archiviert" },
  ],
};

// Ein Projekt gilt als inaktiv, sobald es abgeschlossen (2000) oder archiviert
// (2100) ist — unabhängig vom Typ.
export function istInaktiv(statusCode: number | null | undefined): boolean {
  return statusCode === 2000 || statusCode === 2100;
}

export type Fortschritt = {
  typ: Projekttyp | null;
  stepIndex: number | null; // 1-basiert; null wenn Typ/Status unbekannt
  stepTotal: number | null;
  statusLabel: string | null; // Label aus der Kette (Fallback zum Hero-Klartext)
  prozent: number | null; // 0..100 für den grünen Balken
  isInactive: boolean;
};

// Berechnet die Kettenposition. typeId = Hero-ProjectType-ID, statusCode = aktueller
// Hero-Statuscode. Unbekannter Typ -> kein Balken (nur roher Status im UI).
export function berechneFortschritt(
  typeId: string | number | null | undefined,
  statusCode: number | null | undefined,
): Fortschritt {
  const typ = typeId != null ? (PROJEKTTYP_IDS[String(typeId)] ?? null) : null;
  const isInactive = istInaktiv(statusCode);

  if (!typ) {
    return { typ: null, stepIndex: null, stepTotal: null, statusLabel: null, prozent: null, isInactive };
  }

  const steps = KETTEN[typ];
  const stepTotal = steps.length;

  if (statusCode == null) {
    return { typ, stepIndex: null, stepTotal, statusLabel: null, prozent: null, isInactive };
  }

  const idx = steps.findIndex((s) => s.code === statusCode);
  if (idx === -1) {
    // Statuscode nicht in der Kette (unerwartet) -> kein Balken, aber Typ bekannt.
    return { typ, stepIndex: null, stepTotal, statusLabel: null, prozent: null, isInactive };
  }

  const stepIndex = idx + 1;
  return {
    typ,
    stepIndex,
    stepTotal,
    statusLabel: steps[idx].label,
    prozent: Math.round((stepIndex / stepTotal) * 100),
    isInactive,
  };
}
