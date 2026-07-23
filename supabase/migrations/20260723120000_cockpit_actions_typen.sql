-- PROJ-10 Etappe 3+ / universelle Aktions-Vorschau: cockpit_actions.type für weitere
-- gated Schreibaktionen öffnen (bisher nur 'termin'). Draft-first-Aktionen (Angebot,
-- Rechnung, Mail) kommen mit PROJ-9/11 dazu; hier schon vorbereitet.
alter table public.cockpit_actions
  drop constraint if exists cockpit_actions_type_check;

alter table public.cockpit_actions
  add constraint cockpit_actions_type_check
  check (type in ('termin', 'projekt', 'aufgabe', 'checkliste', 'dokument'));
