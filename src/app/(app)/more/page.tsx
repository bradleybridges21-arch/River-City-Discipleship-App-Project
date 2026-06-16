import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

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
    <div className="px-5 pt-10 pb-4">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>Resources</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--ink-soft)' }}>Tools for the walk and for knowing yourself.</p>

      <div className="flex flex-col gap-8">
        {RESOURCES.map(section => (
          <div key={section.category}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: section.accent }}>
                {section.category}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            </div>

            <div className="flex flex-col gap-3">
              {section.items.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 active:opacity-70 transition-opacity"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  <div className="w-0.5 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: section.accent }} />
                  <div className="flex-shrink-0" style={{ color: section.accent }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{item.label}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{item.sub}</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border)', flexShrink: 0 }}>
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
