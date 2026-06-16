import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LearnClient from '@/components/LearnClient'

export default async function LearnPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: teachings } = await supabase
    .from('teachings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  const { data: myResponse } = teachings?.[0]
    ? await supabase
        .from('responses')
        .select('*')
        .eq('teaching_id', teachings[0].id)
        .eq('user_id', user.id)
        .single()
    : { data: null }

  return <LearnClient userId={user.id} teachings={teachings ?? []} latestResponse={myResponse} />
}
