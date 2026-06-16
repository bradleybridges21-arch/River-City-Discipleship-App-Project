'use client'

import { useState } from 'react'

interface Membership { role: string; groups: { id: string; name: string; leader_id: string } }
interface Member { role: string; profiles: { id: string; full_name: string } }

interface Props {
  userId: string
  memberships: Membership[]
  members: Member[]
}

// Placeholder events — leader will fill these in via Supabase or future admin screen
const PLACEHOLDER_EVENTS = [
  { date: 'Jun 22', label: 'Group meeting', note: '7:00 PM — Living room' },
  { date: 'Jun 29', label: 'Group meeting', note: '7:00 PM — Living room' },
  { date: 'Jul 6', label: 'Group meeting', note: '7:00 PM — Living room' },
  { date: 'Jul 13', label: 'Communion Sunday', note: 'Sunday service · 10:00 AM' },
  { date: 'Jul 20', label: 'Group meeting', note: '7:00 PM — Living room' },
]

export default function GroupClient({ memberships, members }: Props) {
  const [tab, setTab] = useState<'calendar' | 'members'>('calendar')

  const group = memberships[0]?.groups

  return (
    <div>
      {/* Group header */}
      <div className="px-5 pt-10 pb-5 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, var(--sage-light) 0%, var(--surface) 60%)' }}>
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: 'var(--sage)' }} />
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--sage)' }}>Your group</p>
        <h1 className="page-title">{group?.name ?? 'Discipleship Group'}</h1>
        <span className="page-title-rule" style={{ background: 'var(--sage)' }} />
      </div>
      <div className="px-5 pt-4">

      {!group && (
        <div className="rounded-xl p-5 mb-5 mt-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
            You're not in a group yet. Your leader will add you. Check back soon.
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-5 mt-4">
        {(['calendar', 'members'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              backgroundColor: tab === t ? 'var(--terracotta)' : 'var(--surface)',
              color: tab === t ? '#fff' : 'var(--ink-soft)',
              border: '1px solid var(--border)',
            }}
          >
            {t === 'calendar' ? 'Calendar' : 'Members'}
          </button>
        ))}
      </div>

      {tab === 'calendar' && (
        <div className="flex flex-col gap-3">
          {PLACEHOLDER_EVENTS.map((e, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl px-5 py-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="flex-shrink-0 w-12 text-center">
                <p className="text-xs font-semibold" style={{ color: 'var(--terracotta)' }}>{e.date.split(' ')[0]}</p>
                <p className="text-xl font-bold leading-tight" style={{ color: 'var(--ink)' }}>{e.date.split(' ')[1]}</p>
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{e.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--ink-soft)' }}>{e.note}</p>
              </div>
            </div>
          ))}
          <p className="text-xs text-center mt-2" style={{ color: 'var(--ink-soft)' }}>
            Your leader can update these dates — more coming soon.
          </p>
        </div>
      )}

      {tab === 'members' && (
        <div className="flex flex-col gap-3">
          {members.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>No members yet.</p>
          ) : (
            members.map((m, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-sm flex-shrink-0"
                  style={{ backgroundColor: 'var(--sage)', color: '#fff' }}
                >
                  {(m.profiles?.full_name ?? '?')[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{m.profiles?.full_name ?? 'Member'}</p>
                  <p className="text-xs" style={{ color: 'var(--sage)' }}>{m.role === 'leader' ? 'Leader' : 'Member'}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      </div>
    </div>
  )
}
