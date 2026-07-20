// Datentypen für den Chat (PROJ-10), nah an den Supabase-Tabellen.

export type Scope = "allgemein" | "kunde" | "projekt";

export type Conversation = {
  id: string;
  scope: Scope;
  bezug: string | null;
  title: string;
  last_preview: string;
  updated_at: string;
};

export type TerminDraft = {
  datum: string;
  uhrzeit: string;
  bezug: string;
  notiz: string;
  status: "vorschlag" | "bestaetigt";
};

export type ChatMessage = {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  text: string | null;
  image_path: string | null;
  thinking: string[] | null;
  created_at: string;
  // Nur clientseitig (Termin-Vorschlag kommt später vom Agenten):
  termin?: TerminDraft;
};
