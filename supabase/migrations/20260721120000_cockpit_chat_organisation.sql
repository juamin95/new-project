-- PROJ-17: Chat-Organisation — Status-Schnappschuss am Gespräch.
-- Die Zuordnung (scope/hero_customer_id/hero_project_id/title) besteht bereits.
-- Neu: ein kleiner, zwischengespeicherter Hero-Status je Gespräch, damit die Liste
-- schnell und bei Hero-Ausfall nutzbar bleibt. Quelle der Wahrheit bleibt Hero.

alter table public.cockpit_conversations
  add column if not exists hero_project_nr   text,        -- z. B. "GABO-152" (Anzeige/Referenz)
  add column if not exists project_type_id   text,        -- Hero ProjectType-ID (32646/65686/65869)
  add column if not exists project_type_name text,        -- Klartext-Typ (z. B. "Abo")
  add column if not exists status_code       integer,     -- aktueller Hero-Statuscode
  add column if not exists status_label      text,        -- Klartext-Status (z. B. "In Umsetzung")
  add column if not exists step_index        integer,     -- Position X in der Kette
  add column if not exists step_total        integer,     -- Gesamtzahl Y der Kette
  add column if not exists is_inactive       boolean not null default false, -- 2000/2100 -> abgeschlossen
  add column if not exists hero_synced_at    timestamptz; -- Zeitpunkt des letzten Hero-Abgleichs

-- Aktive vs. abgeschlossene Chats werden nach is_inactive gruppiert.
create index if not exists idx_cockpit_conversations_inactive
  on public.cockpit_conversations(is_inactive, updated_at desc);
