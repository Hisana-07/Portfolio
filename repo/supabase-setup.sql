-- Hisana public guestbook: run this whole file in Supabase > SQL Editor.
create table if not exists public.guestbook_notes (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 40),
  link text check (link is null or char_length(link) <= 200),
  message text not null check (char_length(message) between 1 and 320),
  created_at timestamptz not null default now()
);

create table if not exists public.guestbook_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.guestbook_notes enable row level security;
alter table public.guestbook_admins enable row level security;

-- Everyone can read public notes and post a note. Nobody can update notes.
drop policy if exists "Anyone can read guestbook notes" on public.guestbook_notes;
create policy "Anyone can read guestbook notes"
on public.guestbook_notes for select to anon, authenticated using (true);

drop policy if exists "Anyone can add a guestbook note" on public.guestbook_notes;
create policy "Anyone can add a guestbook note"
on public.guestbook_notes for insert to anon, authenticated
with check (
  char_length(trim(name)) between 1 and 40
  and char_length(trim(message)) between 1 and 320
  and (link is null or char_length(link) <= 200)
);

-- Only a signed-in user listed in guestbook_admins can delete notes.
drop policy if exists "Only wall admins can delete notes" on public.guestbook_notes;
create policy "Only wall admins can delete notes"
on public.guestbook_notes for delete to authenticated
using (
  exists (
    select 1 from public.guestbook_admins a
    where a.user_id = (select auth.uid())
  )
);

-- Admin users can check their own admin membership; clients cannot edit this table.
drop policy if exists "Admins can see own admin record" on public.guestbook_admins;
create policy "Admins can see own admin record"
on public.guestbook_admins for select to authenticated
using (user_id = (select auth.uid()));

grant select, insert, delete on public.guestbook_notes to anon, authenticated;
grant usage, select on sequence public.guestbook_notes_id_seq to anon, authenticated;
grant select on public.guestbook_admins to authenticated;
