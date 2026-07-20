// Beispieldaten für die Chat-Vorschau (PROJ-10, Frontend-Hülle).
// Die echte Anbindung an den OS-Agenten + Supabase kommt im /backend-Schritt.

export type Scope = "allgemein" | "kunde" | "projekt";

export type TerminDraft = {
  datum: string;
  uhrzeit: string;
  bezug: string;
  notiz: string;
  status: "vorschlag" | "bestaetigt";
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text?: string;
  image?: string;
  thinking?: string[];
  termin?: TerminDraft;
};

export type Conversation = {
  id: string;
  title: string;
  scope: Scope;
  bezug?: string;
  preview: string;
  zeit: string;
  messages: ChatMessage[];
};

export const seedConversations: Conversation[] = [
  {
    id: "c-weber",
    title: "Garten Weber",
    scope: "projekt",
    bezug: "Garten Weber",
    preview: "Termin-Vorschlag: Do, 24. Juli, 08:00",
    zeit: "9:32",
    messages: [
      {
        id: "m1",
        role: "user",
        text: "Leg mir Donnerstag 8 Uhr einen Termin bei Familie Weber an, Rollrasen verlegen.",
      },
      {
        id: "m2",
        role: "assistant",
        text: "Ich habe einen Termin vorbereitet — bitte prüfen:",
        thinking: ["Kunde „Weber“ in Hero suchen", "Freien Slot prüfen"],
        termin: {
          datum: "Do, 24. Juli",
          uhrzeit: "08:00",
          bezug: "Garten Weber",
          notiz: "Rollrasen verlegen",
          status: "vorschlag",
        },
      },
    ],
  },
  {
    id: "c-meyer",
    title: "Hof Meyer",
    scope: "kunde",
    bezug: "Hof Meyer",
    preview: "Pflasterfläche 60 m², Stand …",
    zeit: "Gestern",
    messages: [
      { id: "m1", role: "user", text: "Wie ist der Stand bei Hof Meyer?" },
      {
        id: "m2",
        role: "assistant",
        text: "(Beispielantwort) Sobald der OS-Agent angebunden ist, fasse ich dir den Stand aus Hero zusammen — offene Punkte, letzter Termin, nächster Schritt.",
        thinking: ["Projekt in Hero lesen", "Verlauf zusammenfassen"],
      },
    ],
  },
  {
    id: "c-allgemein",
    title: "Allgemein",
    scope: "allgemein",
    preview: "Was habe ich morgen an?",
    zeit: "Mo",
    messages: [
      { id: "m1", role: "user", text: "Was habe ich morgen an?" },
      {
        id: "m2",
        role: "assistant",
        text: "(Beispielantwort) Hier fasse ich dir deine morgigen Termine aus Hero zusammen, sobald ich angebunden bin.",
        thinking: ["Termine für morgen aus Hero lesen"],
      },
    ],
  },
];
