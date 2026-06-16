import { createClient } from '@/lib/supabase/server'
import BottomNav from '@/components/BottomNav'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let isLeader = false
  if (user) {
    const { data } = await supabase
      .from('memberships')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'leader')
      .limit(1)
    isLeader = (data?.length ?? 0) > 0

    // Also treat the user as leader if they own any groups directly
    if (!isLeader) {
      const { data: owned } = await supabase
        .from('groups')
        .select('id')
        .eq('leader_id', user.id)
        .limit(1)
      isLeader = (owned?.length ?? 0) > 0
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--paper)' }}>
      <main className="flex-1 pb-24">
        {children}
      </main>
      <BottomNav isLeader={isLeader} />
    </div>
  )
}
