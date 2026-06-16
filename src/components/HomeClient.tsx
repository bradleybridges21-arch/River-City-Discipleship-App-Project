'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import KnowChrist from './KnowChrist'
import SeekChrist from './SeekChrist'
import ImitateChrist from './ImitateChrist'

type Tab = 'know' | 'seek' | 'imitate'

interface Props {
  user: { id: string; email?: string }
  profile: { full_name: string } | null
}

export default function HomeClient({ user, profile }: Props) {
  const [tab, setTab] = useState<Tab>('know')
  const router = useRouter()
  const supabase = createClient()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  const firstName = profile?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Friend'

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--paper)' }}>
      {/* Header */}
      <header className="px-5 pt-10 pb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>
            River City
          </p>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--ink)' }}>
            Good to see you, {firstName}.
          </h1>
        </div>
        <button
          onClick={signOut}
          className="text-xs mt-1 font-medium"
          style={{ color: 'var(--ink-soft)' }}
        >
          Sign out
        </button>
      </header>

      {/* Opening prayer */}
      <div className="mx-5 mb-6 px-5 py-4 rounded-2xl" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-reading italic leading-relaxed" style={{ color: 'var(--ink-soft)', fontSize: '15px' }}>
          "Be still, and know that I am God."
        </p>
        <p className="text-xs mt-2 font-medium" style={{ color: 'var(--sage)' }}>Psalm 46:10</p>
      </div>

      {/* Tab bar */}
      <div className="flex mx-5 mb-6 rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        {([
          { key: 'know', label: 'Know' },
          { key: 'seek', label: 'Seek' },
          { key: 'imitate', label: 'Imitate' },
        ] as { key: Tab; label: string }[]).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 py-3 text-sm font-semibold transition-colors rounded-xl"
            style={{
              backgroundColor: tab === t.key ? 'var(--terracotta)' : 'transparent',
              color: tab === t.key ? '#fff' : 'var(--ink-soft)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <main className="flex-1 px-5 pb-10">
        {tab === 'know' && <KnowChrist userId={user.id} />}
        {tab === 'seek' && <SeekChrist userId={user.id} />}
        {tab === 'imitate' && <ImitateChrist userId={user.id} />}
      </main>
    </div>
  )
}
