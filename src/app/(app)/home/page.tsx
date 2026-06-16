import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/SignOutButton'
import DailyPrayerBanner from '@/components/DailyPrayerBanner'
import QuoteOfDay from '@/components/QuoteOfDay'

const NAV_ITEMS = [
  {
    href: '/pray',
    label: 'Daily Prayer',
    sub: 'Morning · Midday · Evening',
    iconBg: 'var(--blue-light)',
    iconColor: 'var(--blue)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    href: '/learn',
    label: 'Learn',
    sub: 'Teachings, catechism & creeds',
    iconBg: 'var(--green-light)',
    iconColor: 'var(--green)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    href: '/group',
    label: 'Group',
    sub: 'Calendar & members',
    iconBg: 'var(--sage-light)',
    iconColor: 'var(--sage)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
    sub: 'Scripture & assessment tools',
    iconBg: 'var(--gold-light)',
    iconColor: 'var(--gold)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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

  return (
    <div>
      {/* ── Hero — dark navy ──────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, var(--dark) 0%, var(--dark-2) 60%, var(--dark-3) 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '3.5rem',
      }}>
        {/* Blue glow — top right */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '65%', paddingBottom: '65%',
          background: 'radial-gradient(circle, rgba(59,110,168,0.26) 0%, transparent 68%)',
          pointerEvents: 'none',
          animation: 'glowPulse 7s ease-in-out infinite',
        }} />
        {/* Green glow — bottom left */}
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '48%', paddingBottom: '48%',
          background: 'radial-gradient(circle, rgba(45,112,85,0.18) 0%, transparent 68%)',
          pointerEvents: 'none',
          animation: 'glowPulse 9s ease-in-out infinite 3s',
        }} />
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)',
        }} />

        {/* Greeting + sign out */}
        <div className="animate-up d1" style={{ padding: '0 1.5rem', position: 'relative', marginBottom: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              River City Church
            </p>
            <h1 className="page-title" style={{ fontSize: '1.875rem' }}>
              {firstName}.
            </h1>
          </div>
          <SignOutButton />
        </div>

        {/* Quote of the day — open, no box */}
        <QuoteOfDay />

        {/* Daily prayer banner */}
        <div className="animate-up d3" style={{ padding: '0 1.5rem 2.5rem', position: 'relative' }}>
          <DailyPrayerBanner />
        </div>
      </div>

      {/* ── Paper sheet — curves up ───────────────────────── */}
      <div style={{
        background: 'var(--paper)',
        borderRadius: '28px 28px 0 0',
        marginTop: '-24px',
        position: 'relative',
        zIndex: 1,
        paddingTop: '2rem',
        paddingBottom: '1rem',
      }}>
        {/* Open list nav */}
        <div style={{ padding: '0 1.5rem' }}>
          <div className="section-label" style={{ marginBottom: '0.5rem' }}>
            <span className="section-label-text">Go to</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-soft)' }} />
          </div>

          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`open-row animate-up d${i + 2}`}
            >
              <div
                className="icon-bubble"
                style={{ background: item.iconBg, color: item.iconColor }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, fontSize: '15px', color: 'var(--ink)', lineHeight: 1.3 }}>
                  {item.label}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                  {item.sub}
                </p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border)', flexShrink: 0 }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </a>
          ))}
        </div>

        {/* This week — featured strip */}
        <div className="animate-up d7" style={{ padding: '1.5rem 1.5rem 0' }}>
          <div style={{ width: '100%', height: '1px', background: 'var(--border-soft)', marginBottom: '1.5rem' }} />
          <a
            href="/learn"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg, var(--blue-light) 0%, var(--green-light) 100%)',
              border: '1px solid rgba(255,255,255,0.80)',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-md)',
              textDecoration: 'none',
            }}
          >
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--blue-mid)', marginBottom: '4px' }}>
                This week
              </p>
              <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--ink)', lineHeight: 1.4 }}>
                See the latest teaching and share your response
              </p>
            </div>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
              background: 'rgba(255,255,255,0.70)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--blue)' }}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
