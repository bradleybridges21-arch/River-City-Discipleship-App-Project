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
        icon: '📖',
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
        icon: '🔷',
      },
      {
        label: 'Working Genius',
        sub: 'Discover the work that energizes you',
        href: 'https://www.workinggenius.com',
        icon: '⚡',
      },
      {
        label: 'Enneagram',
        sub: 'Nine types — your pattern of seeing the world',
        href: 'https://www.enneagraminstitute.com',
        icon: '⭕',
      },
      {
        label: 'Spiritual Gifts Test',
        sub: 'Find out how God has wired you to serve',
        href: 'https://gifts.churchgrowth.org/spiritual-gifts-survey/',
        icon: '✝️',
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
            {/* Section header with line */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: section.accent }}>
                {section.category}
              </span>
              <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            </div>

            <div className="flex flex-col gap-3">
              {section.items.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl px-5 py-4 active:opacity-70 transition-opacity"
                  style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  {/* Left accent line */}
                  <div className="w-1 self-stretch rounded-full flex-shrink-0" style={{ backgroundColor: section.accent }} />

                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>

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
