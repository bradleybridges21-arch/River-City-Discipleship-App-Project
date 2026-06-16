import { createClient } from '@/lib/supabase/server'
import BottomNav from '@/components/BottomNav'
import TopNav from '@/components/TopNav'

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
    <div style={{ backgroundColor: 'var(--paper)', minHeight: '100vh' }}>
      <TopNav isLeader={isLeader} />
      <main className="app-main" style={{ paddingBottom: '5.5rem' }}>
        {children}
      </main>
      <div className="bottom-nav">
        <BottomNav isLeader={isLeader} />
      </div>
    </div>
  )
}
