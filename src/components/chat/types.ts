// Datentypen für den Chat (PROJ-10), nah an den Supabase-Tabellen.

export type Scope = "allgemein" | "kunde" | "projekt";

export type Conversation = {
  id: string;
  scope: Scope;
  bezug: string | null;
  title: string;
  last_preview: string;
  updated_at: string;
  // Zuordnung + Fortschritts-Schnappschuss (PROJ-17)
  hero_customer_id?: string | null;
  hero_project_id?: string | null;
  hero_project_nr?: string | null;
  project_type_name?: string | null;
  status_label?: string | null;
  step_index?: number | null;
  step_total?: number | null;
  is_inactive?: boolean | null;
};

// Zuordnungs-Vorschlag vom Agenten (PROJ-17) — im Pop-up bestätigt.
export type ZuordnungVorschlag = {
  scope: "projekt" | "kunde";
  projekt_nr?: string | null;
  kunde_id?: string | null;
  titel: string;
};

// Termin-Vorschlag vom Agenten (PROJ-10 Etappe 3) — im Pop-up bestätigt, dann Hero.
export type TerminVorschlag = {
  titel: string;
  von: string;
  bis: string;
  kategorie: string;
  beschreibung?: string | null;
  project_match_id?: number | null;
  bezug?: string | null;
};

// Projekt-Vorschlag vom Agenten (PROJ-10 Etappe 3+) — im Pop-up bestätigt, dann Hero.
export type ProjektVorschlag = {
  name: string;
  customer_id: number;
  address_id: number;
  gewerk?: string | null;
  projekttyp?: string | null;
  bezug?: string | null;
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
