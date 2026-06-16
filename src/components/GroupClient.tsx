'use client'

import { useState } from 'react'
import PageHeader from '@/components/PageHeader'

interface Membership { role: string; groups: { id: string; name: string; leader_id: string } }
interface Member { role: string; profiles: { id: string; full_name: string } }

interface Props {
  userId: string
  memberships: Membership[]
  members: Member[]
}

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
      <PageHeader
        label="Your group"
        title={group?.name ?? 'Discipleship Group'}
        subtitle={group ? undefined : "You'll be added to a group by your leader soon."}
        glowColor="rgba(92,122,96,0.22)"
      />

      <div style={{ background: 'var(--paper)', borderRadius: '24px 24px 0 0', marginTop: '-20px', position: 'relative', zIndex: 1, padding: '1.5rem 1.125rem 2rem' }}>

        {/* Segmented control */}
        <div className="seg-control" style={{ marginBottom: '1.25rem' }}>
          {(['calendar', 'members'] as const).map(t => (
            <button key={t} className={`seg-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t === 'calendar' ? 'Calendar' : 'Members'}
            </button>
          ))}
        </div>

        {tab === 'calendar' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {PLACEHOLDER_EVENTS.map((e, i) => (
              <div key={i} className="glass" style={{ borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flexShrink: 0, width: '48px', textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {e.date.split(' ')[0]}
                  </p>
                  <p style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1, fontFamily: 'Newsreader, Georgia, serif' }}>
                    {e.date.split(' ')[1]}
                  </p>
                </div>
                <div style={{ width: '1px', alignSelf: 'stretch', background: 'var(--border)', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{e.label}</p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>{e.note}</p>
                </div>
              </div>
            ))}
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>
              Your leader can update these dates.
            </p>
          </div>
        )}

        {tab === 'members' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {members.length === 0 ? (
              <p style={{ color: 'var(--ink-muted)', fontSize: '14px' }}>No members yet.</p>
            ) : (
              members.map((m, i) => (
                <div key={i} className="glass" style={{ borderRadius: '16px', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--sage) 0%, var(--slate) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '16px',
                  }}>
                    {(m.profiles?.full_name ?? '?')[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{m.profiles?.full_name ?? 'Member'}</p>
                    <p style={{ fontSize: '12px', color: m.role === 'leader' ? 'var(--terracotta)' : 'var(--ink-muted)', fontWeight: 500 }}>
                      {m.role === 'leader' ? 'Leader' : 'Member'}
                    </p>
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
