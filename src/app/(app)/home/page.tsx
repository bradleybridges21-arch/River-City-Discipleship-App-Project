import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getDailyPrayer, getPeriodLabel } from '@/lib/daily-prayers'
import SignOutButton from '@/components/SignOutButton'

const NAV_CARDS = [
  {
    href: '/pray',
    label: 'Daily prayer',
    sub: 'Morning · Midday · Evening',
    accent: '#c0654a',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    href: '/learn',
    label: 'Learn',
    sub: 'Teachings & catechism',
    accent: '#8f9d84',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    href: '/group',
    label: 'Group',
    sub: 'Calendar & members',
    accent: '#7a8faa',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
    accent: '#b8956a',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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

  const prayer = getDailyPrayer()
  const periodLabel = getPeriodLabel()
  const firstName = profile?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Friend'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="px-5 pt-10 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>
            River City Church
          </p>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
            {greeting}, {firstName}.
          </h1>
        </div>
        <SignOutButton />
      </div>

      {/* Daily prayer */}
      <div className="rounded-3xl p-6 mb-6" style={{ backgroundColor: 'var(--ink)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--sage)' }}>
            {periodLabel}
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
        </div>
        <p className="font-reading leading-relaxed mb-5" style={{ color: '#f5f0e8', fontSize: '17px', fontStyle: 'italic' }}>
          "{prayer.text}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-6 h-px" style={{ backgroundColor: 'var(--sage)' }} />
          <p className="text-xs font-medium" style={{ color: 'var(--sage)' }}>
            {prayer.attribution}
          </p>
        </div>
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 mb-4">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--ink-soft)' }}>
          Jump to
        </p>
        <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      {/* Quick nav cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {NAV_CARDS.map(card => (
          <a
            key={card.href}
            href={card.href}
            className="rounded-2xl p-4 flex flex-col gap-3 active:opacity-70 transition-opacity"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            {/* Icon with accent color */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: card.accent + '18', color: card.accent }}
            >
              {card.icon}
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{card.label}</p>
              <p className="mt-0.5" style={{ color: 'var(--ink-soft)', fontSize: '11px' }}>{card.sub}</p>
            </div>
          </a>
        ))}
      </div>

      {/* This week teaser */}
      <a
        href="/learn"
        className="flex items-center justify-between rounded-2xl px-5 py-4 active:opacity-70 transition-opacity"
        style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--terracotta)' }}>
            This week
          </p>
          <p className="font-medium text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
            See the latest teaching and share your response
          </p>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border)', flexShrink: 0, marginLeft: '12px' }}>
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </a>
    </div>
  )
}
