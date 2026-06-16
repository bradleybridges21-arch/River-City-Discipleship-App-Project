import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminClient from '@/components/AdminClient'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  // Gate: must be a leader of at least one group or own a group
  const { data: leaderCheck } = await supabase
    .from('groups')
    .select('id')
    .eq('leader_id', user.id)
    .limit(1)

  if (!leaderCheck || leaderCheck.length === 0) redirect('/home')

  // Load all groups this user leads
  const { data: groups } = await supabase
    .from('groups')
    .select('id, name, created_at')
    .eq('leader_id', user.id)
    .order('created_at', { ascending: false })

  // Load all teachings for those groups
  const groupIds = (groups ?? []).map(g => g.id)
  const { data: teachings } = groupIds.length > 0
    ? await supabase
        .from('teachings')
        .select('id, week_label, question, group_id, created_at')
        .in('group_id', groupIds)
        .order('created_at', { ascending: false })
        .limit(20)
    : { data: [] }

  // Load member counts per group
  const { data: memberships } = groupIds.length > 0
    ? await supabase
        .from('memberships')
        .select('group_id, role, profiles(id, full_name)')
        .in('group_id', groupIds)
    : { data: [] }

  // Load responses for latest teaching
  const latestTeaching = (teachings ?? [])[0]
  const { data: responses } = latestTeaching
    ? await supabase
        .from('responses')
        .select('id, body, created_at, profiles(full_name)')
        .eq('teaching_id', latestTeaching.id)
        .order('created_at', { ascending: false })
    : { data: [] }

  return (
    <AdminClient
      userId={user.id}
      groups={(groups ?? []) as any}
      teachings={(teachings ?? []) as any}
      memberships={(memberships ?? []) as any}
      latestTeaching={latestTeaching as any}
      responses={(responses ?? []) as any}
    />
  )
}
