import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/SignOutButton'
import DailyPrayerBanner from '@/components/DailyPrayerBanner'

const NAV_CARDS = [
  {
    href: '/pray',
    label: 'Daily prayer',
    sub: 'Morning · Midday · Evening',
    bg: 'linear-gradient(135deg, #b85c3a18 0%, #b85c3a08 100%)',
    accent: '#b85c3a',
    border: '#e8c8bc',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    href: '/learn',
    label: 'Learn',
    sub: 'Teachings & catechism',
    bg: 'linear-gradient(135deg, #5c7a6018 0%, #5c7a6008 100%)',
    accent: '#5c7a60',
    border: '#c0d4c2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    href: '/group',
    label: 'Group',
    sub: 'Calendar & members',
    bg: 'linear-gradient(135deg, #5c7a9618 0%, #5c7a9608 100%)',
    accent: '#5c7a96',
    border: '#bcd0e0',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    href: '/more',
    label: 'Resources',
    sub: 'Scripture & tools',
    bg: 'linear-gradient(135deg, #b0783018 0%, #b0783008 100%)',
    accent: '#b07830',
    border: '#dfc898',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    ),
  },
]

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const firstName = profile?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Friend'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{ backgroundColor: 'var(--paper)' }}>
      {/* Header — layered on top of paper */}
      <div className="px-5 pt-12 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>
              River City Church
            </p>
            <h1 className="page-title" style={{ fontSize: '1.85rem' }}>
              {greeting},<br />{firstName}.
            </h1>
          </div>
          <SignOutButton />
        </div>
      </div>

      {/* Daily prayer card — client component reads local time */}
      <div className="mx-4 mb-6">
        <DailyPrayerBanner />
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3 px-5 mb-4">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--ink-muted)' }}>
          Explore
        </p>
        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      {/* Nav cards — 2-col grid, colored backgrounds */}
      <div className="grid grid-cols-2 gap-3 px-4 mb-5">
        {NAV_CARDS.map(card => (
          <a
            key={card.href}
            href={card.href}
            className="flex flex-col gap-3 p-4 active:opacity-75 transition-opacity"
            style={{
              background: card.bg,
              border: `1px solid ${card.border}`,
              borderRadius: '12px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              className="w-9 h-9 flex items-center justify-center"
              style={{
                borderRadius: '8px',
                backgroundColor: card.accent + '20',
                color: card.accent,
              }}
            >
              {card.icon}
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight mb-0.5" style={{ color: 'var(--ink)' }}>{card.label}</p>
              <p style={{ color: 'var(--ink-muted)', fontSize: '11px', lineHeight: 1.4 }}>{card.sub}</p>
            </div>
          </a>
        ))}
      </div>

      {/* This week — accent strip */}
      <div className="px-4 pb-4">
        <a
          href="/learn"
          className="flex items-center justify-between px-5 py-4 active:opacity-75 transition-opacity"
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--terracotta-light) 0%, var(--surface) 100%)',
            border: '1px solid #dfc0b0',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--terracotta)' }}>
              This week
            </p>
            <p className="font-semibold text-sm leading-snug" style={{ color: 'var(--ink)' }}>
              See the latest teaching and share your response
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--terracotta)', flexShrink: 0, marginLeft: '12px' }}>
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </a>
      </div>
    </div>
  )
}
