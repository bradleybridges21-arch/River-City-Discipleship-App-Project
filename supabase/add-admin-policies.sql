-- ============================================================
-- Admin policies — run in Supabase SQL Editor
-- Adds leader ability to create groups, add members, post teachings
-- ============================================================

-- Leaders can create groups
create policy "groups: leaders can insert"
  on groups for insert
  with check (auth.uid() = leader_id);

-- Leaders can update their own groups
create policy "groups: leaders can update"
  on groups for update
  using (auth.uid() = leader_id);

-- Leaders can insert memberships for their groups
create policy "memberships: leaders can insert"
  on memberships for insert
  with check (
    exists (
      select 1 from groups
      where groups.id = memberships.group_id
        and groups.leader_id = auth.uid()
    )
  );

-- Leaders can remove members from their groups
create policy "memberships: leaders can delete"
  on memberships for delete
  using (
    exists (
      select 1 from groups
      where groups.id = memberships.group_id
        and groups.leader_id = auth.uid()
    )
  );

-- Leaders can update teachings they created
create policy "teachings: leaders can update"
  on teachings for update
  using (
    exists (
      select 1 from memberships
      where memberships.group_id = teachings.group_id
        and memberships.user_id = auth.uid()
        and memberships.role = 'leader'
    )
  );
