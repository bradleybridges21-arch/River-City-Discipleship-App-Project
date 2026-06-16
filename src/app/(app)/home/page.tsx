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
    <div>
      {/* ── Dark hero section ─────────────────────────── */}
      <div style={{
        background: 'linear-gradient(170deg, var(--dark) 0%, var(--dark-2) 55%, var(--dark-3) 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '3.5rem',
        paddingBottom: '3rem',
      }}>
        {/* Terracotta glow — top right */}
        <div style={{ position: 'absolute', top: '-20%', right: '-15%', width: '70%', paddingBottom: '70%', background: 'radial-gradient(circle, rgba(184,92,58,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Sage glow — bottom left */}
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '55%', paddingBottom: '55%', background: 'radial-gradient(circle, rgba(92,122,96,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Greeting row */}
        <div style={{ padding: '0 1.25rem', position: 'relative', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              River City Church
            </p>
            <h1 className="page-title" style={{ fontSize: '2rem' }}>
              {greeting},<br />{firstName}.
            </h1>
          </div>
          <SignOutButton />
        </div>

        {/* Glass prayer card */}
        <div style={{ padding: '0 1.25rem', position: 'relative' }}>
          <DailyPrayerBanner />
        </div>
      </div>

      {/* ── Paper sheet lifts up ──────────────────────── */}
      <div style={{
        background: 'var(--paper)',
        borderRadius: '24px 24px 0 0',
        marginTop: '-20px',
        position: 'relative',
        zIndex: 1,
        paddingTop: '1.75rem',
        paddingBottom: '2rem',
      }}>
        {/* Section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 1.25rem', marginBottom: '1rem' }}>
          <p style={{ color: 'var(--ink-muted)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Explore
          </p>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Nav cards — glass-light, 2-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '0 1rem', marginBottom: '1rem' }}>
          {NAV_CARDS.map(card => (
            <a
              key={card.href}
              href={card.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                padding: '1.125rem',
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(20px) saturate(160%)',
                WebkitBackdropFilter: 'blur(20px) saturate(160%)',
                border: '1px solid rgba(255,255,255,0.90)',
                borderTop: `2.5px solid ${card.accent}`,
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(30,27,22,0.07), inset 0 1px 0 rgba(255,255,255,1)',
                textDecoration: 'none',
              }}
            >
              <div style={{
                width: '38px', height: '38px',
                borderRadius: '10px',
                background: card.accent + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: card.accent,
              }}>
                {card.icon}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', lineHeight: 1.3 }}>{card.label}</p>
                <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px', lineHeight: 1.4 }}>{card.sub}</p>
              </div>
            </a>
          ))}
        </div>

        {/* This week strip — glass */}
        <div style={{ padding: '0 1rem' }}>
          <a
            href="/learn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              background: 'rgba(255,255,255,0.72)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.90)',
              borderLeft: '3px solid var(--terracotta)',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(30,27,22,0.07), inset 0 1px 0 rgba(255,255,255,1)',
              textDecoration: 'none',
            }}
          >
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '3px' }}>
                This week
              </p>
              <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)', lineHeight: 1.4 }}>
                See the latest teaching and share your response
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--terracotta)', flexShrink: 0, marginLeft: '12px' }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
