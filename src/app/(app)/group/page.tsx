import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import GroupClient from '@/components/GroupClient'

export default async function GroupPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: memberships } = await supabase
    .from('memberships')
    .select('role, groups(id, name, leader_id)')
    .eq('user_id', user.id)

  const { data: members } = await supabase
    .from('memberships')
    .select('role, profiles(id, full_name)')
    .limit(20)

  return <GroupClient userId={user.id} memberships={(memberships ?? []) as any} members={(members ?? []) as any} />
}
