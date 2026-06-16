import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PageHeader from '@/components/PageHeader'

const RESOURCES = [
  {
    category: 'Scripture',
    accent: '#c0654a',
    items: [
      {
        label: 'ESV Bible',
        sub: 'Read the English Standard Version online',
        href: 'https://www.esv.org',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
            <line x1="10" y1="8" x2="16" y2="8"/>
            <line x1="10" y1="12" x2="16" y2="12"/>
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Know yourself',
    accent: '#8f9d84',
    items: [
      {
        label: 'DISC Assessment',
        sub: 'Understand how you communicate and lead',
        href: 'https://www.discprofile.com/what-is-disc',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="8" height="8" rx="1"/>
            <rect x="13" y="3" width="8" height="8" rx="1"/>
            <rect x="3" y="13" width="8" height="8" rx="1"/>
            <rect x="13" y="13" width="8" height="8" rx="1"/>
          </svg>
        ),
      },
      {
        label: 'Working Genius',
        sub: 'Discover the work that energizes you',
        href: 'https://www.workinggenius.com',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ),
      },
      {
        label: 'Enneagram',
        sub: 'Nine types — your pattern of seeing the world',
        href: 'https://www.enneagraminstitute.com',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2" x2="12" y2="8"/>
            <line x1="12" y1="16" x2="12" y2="22"/>
          </svg>
        ),
      },
      {
        label: 'Spiritual Gifts Test',
        sub: 'Find out how God has wired you to serve',
        href: 'https://gifts.churchgrowth.org/spiritual-gifts-survey/',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        ),
      },
    ],
  },
]

export default async function MorePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  return (
    <div>
      <PageHeader title="Resources" subtitle="Tools for the walk and for knowing yourself." glowColor="rgba(176,120,48,0.20)" />

      <div style={{ background: 'var(--paper)', borderRadius: '24px 24px 0 0', marginTop: '-20px', position: 'relative', zIndex: 1, padding: '1.75rem 1.125rem 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {RESOURCES.map(section => (
          <div key={section.category}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: section.accent }}>
                {section.category}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {section.items.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '1rem 1.125rem', borderRadius: '16px',
                    textDecoration: 'none',
                    borderLeft: `3px solid ${section.accent}`,
                  }}
                >
                  <div style={{ color: section.accent, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)' }}>{item.label}</p>
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px', lineHeight: 1.4 }}>{item.sub}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-muted)', flexShrink: 0 }}>
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
