-- ============================================================
-- River City Discipleship App — Database Schema
-- Run this in the Supabase SQL Editor (Project > SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── profiles ────────────────────────────────────────────────
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz default now()
);

alter table profiles enable row level security;

-- A user can read any profile (needed for names in group views)
create policy "profiles: read any"
  on profiles for select
  using (true);

-- A user can only update their own profile
create policy "profiles: update own"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── groups ───────────────────────────────────────────────────
create table if not exists groups (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  leader_id   uuid not null references profiles(id),
  created_at  timestamptz default now()
);

alter table groups enable row level security;

create policy "groups: members can read"
  on groups for select
  using (
    exists (
      select 1 from memberships
      where memberships.group_id = groups.id
        and memberships.user_id = auth.uid()
    )
  );

-- ── memberships ──────────────────────────────────────────────
create table if not exists memberships (
  id         uuid primary key default uuid_generate_v4(),
  group_id   uuid not null references groups(id) on delete cascade,
  user_id    uuid not null references profiles(id) on delete cascade,
  role       text not null check (role in ('leader', 'member')),
  created_at timestamptz default now(),
  unique (group_id, user_id)
);

alter table memberships enable row level security;

create policy "memberships: group members can read"
  on memberships for select
  using (
    exists (
      select 1 from memberships m2
      where m2.group_id = memberships.group_id
        and m2.user_id = auth.uid()
    )
  );

-- ── teachings ────────────────────────────────────────────────
create table if not exists teachings (
  id             uuid primary key default uuid_generate_v4(),
  group_id       uuid references groups(id) on delete cascade,
  week_label     text not null,
  hook           text not null,
  scripture_ref  text not null,
  application    text,
  question       text not null,
  created_at     timestamptz default now()
);

alter table teachings enable row level security;

create policy "teachings: group members can read"
  on teachings for select
  using (
    group_id is null
    or exists (
      select 1 from memberships
      where memberships.group_id = teachings.group_id
        and memberships.user_id = auth.uid()
    )
  );

create policy "teachings: leaders can insert"
  on teachings for insert
  with check (
    exists (
      select 1 from memberships
      where memberships.group_id = teachings.group_id
        and memberships.user_id = auth.uid()
        and memberships.role = 'leader'
    )
  );

-- ── responses ────────────────────────────────────────────────
-- Leader-visible: owner + the leader of that member's group
create table if not exists responses (
  id          uuid primary key default uuid_generate_v4(),
  teaching_id uuid not null references teachings(id) on delete cascade,
  user_id     uuid not null references profiles(id) on delete cascade,
  body        text not null,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique (teaching_id, user_id)
);

alter table responses enable row level security;

create policy "responses: owner can read"
  on responses for select
  using (auth.uid() = user_id);

create policy "responses: leader of group can read"
  on responses for select
  using (
    exists (
      select 1
      from teachings t
      join memberships m_member on m_member.group_id = t.group_id and m_member.user_id = responses.user_id
      join memberships m_leader on m_leader.group_id = t.group_id and m_leader.user_id = auth.uid() and m_leader.role = 'leader'
      where t.id = responses.teaching_id
    )
  );

create policy "responses: owner can insert"
  on responses for insert
  with check (auth.uid() = user_id);

create policy "responses: owner can update"
  on responses for update
  using (auth.uid() = user_id);

-- ── journal_entries ──────────────────────────────────────────
-- THE INNER ROOM — owner only, no exceptions, no overrides
create table if not exists journal_entries (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references profiles(id) on delete cascade,
  body       text not null,
  created_at timestamptz default now()
);

alter table journal_entries enable row level security;

-- This is the only policy. There is no leader override. There is no admin override.
create policy "journal_entries: owner only"
  on journal_entries for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── prayer_requests ──────────────────────────────────────────
create table if not exists prayer_requests (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references profiles(id) on delete cascade,
  group_id   uuid references groups(id) on delete cascade,
  body       text not null,
  created_at timestamptz default now()
);

alter table prayer_requests enable row level security;

create policy "prayer_requests: group members can read"
  on prayer_requests for select
  using (
    group_id is null
    or exists (
      select 1 from memberships
      where memberships.group_id = prayer_requests.group_id
        and memberships.user_id = auth.uid()
    )
  );

create policy "prayer_requests: owner can insert"
  on prayer_requests for insert
  with check (auth.uid() = user_id);

create policy "prayer_requests: owner can delete"
  on prayer_requests for delete
  using (auth.uid() = user_id);

-- ── VERIFY THE FLOOR ─────────────────────────────────────────
-- Before any real person uses this app, test this manually:
-- 1. Create two accounts: one leader, one member.
-- 2. Write a journal entry as the member.
-- 3. Sign in as the leader and run:
--    select * from journal_entries;
-- 4. You should get 0 rows. If you get any rows, STOP — the floor is broken.
