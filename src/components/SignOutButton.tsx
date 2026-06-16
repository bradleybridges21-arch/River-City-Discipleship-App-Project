'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  return (
    <button onClick={signOut} className="text-xs font-medium mt-1" style={{ color: 'var(--ink-soft)' }}>
      Sign out
    </button>
  )
}
