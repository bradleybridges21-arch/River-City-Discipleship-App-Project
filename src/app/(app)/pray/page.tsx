import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PrayClient from '@/components/PrayClient'
import { getDailyPrayer } from '@/lib/daily-prayers'

export default async function PrayPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: prayers } = await supabase
    .from('prayer_requests')
    .select('id, body, created_at, profiles(full_name)')
    .order('created_at', { ascending: false })
    .limit(20)

  const { data: journal } = await supabase
    .from('journal_entries')
    .select('id, body, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(7)

  const morningPrayer = getDailyPrayer()

  return (
    <PrayClient
      userId={user.id}
      groupPrayers={(prayers ?? []) as any}
      journalEntries={journal ?? []}
      dailyPrayer={morningPrayer}
    />
  )
}
