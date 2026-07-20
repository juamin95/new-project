-- PROJ-10 Etappe 1: Chat-Datenmodell (Cockpit).
-- Nur neue cockpit_-Tabellen + privater Bild-Bucket. Website-Tabellen (leads, projekte)
-- werden NICHT angefasst. Ein gemeinsames Konto -> RLS für `authenticated`.

-- ── Gespräche ────────────────────────────────────────────────
create table if not exists public.cockpit_conversations (
  id            uuid primary key default gen_random_uuid(),
  scope         text not null default 'allgemein'
                check (scope in ('allgemein', 'kunde', 'projekt')),
  hero_customer_id text,
  hero_project_id  text,
  bezug         text,
  title         text not null default 'Neuer Chat',
  last_preview  text not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Nachrichten ──────────────────────────────────────────────
create table if not exists public.cockpit_messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.cockpit_conversations(id) on delete cascade,
  role            text not null check (role in ('user', 'assistant')),
  text            text,
  image_path      text,
  thinking        jsonb,
  created_at      timestamptz not null default now()
);

-- ── Aktions-Protokoll (Audit für gated Schreibaktionen, z. B. Termin) ──
create table if not exists public.cockpit_actions (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.cockpit_conversations(id) on delete cascade,
  message_id      uuid references public.cockpit_messages(id) on delete set null,
  type            text not null check (type in ('termin')),
  status          text not null default 'vorschlag'
                  check (status in ('vorschlag', 'bestaetigt', 'erledigt', 'fehlgeschlagen')),
  payload         jsonb not null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Indizes ──────────────────────────────────────────────────
create index if not exists idx_cockpit_messages_conversation
  on public.cockpit_messages(conversation_id, created_at);
create index if not exists idx_cockpit_conversations_updated
  on public.cockpit_conversations(updated_at desc);
create index if not exists idx_cockpit_actions_conversation
  on public.cockpit_actions(conversation_id);

-- ── Gespräch bei neuer Nachricht aktualisieren (Vorschau + Sortierung) ──
create or replace function public.cockpit_touch_conversation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.cockpit_conversations
     set updated_at  = now(),
         last_preview = left(coalesce(new.text, '[Bild]'), 120)
   where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists cockpit_messages_touch on public.cockpit_messages;
create trigger cockpit_messages_touch
  after insert on public.cockpit_messages
  for each row execute function public.cockpit_touch_conversation();

-- ── Row Level Security (ein gemeinsames Konto -> authenticated) ──
alter table public.cockpit_conversations enable row level security;
alter table public.cockpit_messages       enable row level security;
alter table public.cockpit_actions        enable row level security;

drop policy if exists "Cockpit-Nutzer" on public.cockpit_conversations;
create policy "Cockpit-Nutzer" on public.cockpit_conversations
  for all to authenticated using (true) with check (true);

drop policy if exists "Cockpit-Nutzer" on public.cockpit_messages;
create policy "Cockpit-Nutzer" on public.cockpit_messages
  for all to authenticated using (true) with check (true);

drop policy if exists "Cockpit-Nutzer" on public.cockpit_actions;
create policy "Cockpit-Nutzer" on public.cockpit_actions
  for all to authenticated using (true) with check (true);

-- ── Realtime (geräteübergreifende Live-Sync der Nachrichten) ──
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'cockpit_messages'
  ) then
    alter publication supabase_realtime add table public.cockpit_messages;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'cockpit_conversations'
  ) then
    alter publication supabase_realtime add table public.cockpit_conversations;
  end if;
end $$;

-- ── Privater Bild-Bucket + Storage-Policies ──────────────────
insert into storage.buckets (id, name, public)
values ('cockpit-bilder', 'cockpit-bilder', false)
on conflict (id) do nothing;

drop policy if exists "cockpit bilder lesen" on storage.objects;
create policy "cockpit bilder lesen" on storage.objects
  for select to authenticated using (bucket_id = 'cockpit-bilder');

drop policy if exists "cockpit bilder schreiben" on storage.objects;
create policy "cockpit bilder schreiben" on storage.objects
  for insert to authenticated with check (bucket_id = 'cockpit-bilder');

drop policy if exists "cockpit bilder loeschen" on storage.objects;
create policy "cockpit bilder loeschen" on storage.objects
  for delete to authenticated using (bucket_id = 'cockpit-bilder');
