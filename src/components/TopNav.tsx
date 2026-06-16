'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const PAGES = [
  { href: '/home',  label: 'Home',      sub: 'Your daily starting point' },
  { href: '/pray',  label: 'Pray',      sub: 'Office, questions, inner room' },
  { href: '/learn', label: 'Learn',     sub: 'Teachings, creeds & hymns' },
  { href: '/group', label: 'Group',     sub: 'Calendar & members' },
  { href: '/more',  label: 'Resources', sub: 'Scripture & tools' },
]

export default function TopNav({ isLeader }: { isLeader: boolean }) {
  const pathname = usePathname()
  const pages = isLeader ? [...PAGES, { href: '/admin', label: 'Admin', sub: 'Manage group & teachings' }] : PAGES
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const current = pages.find(p => pathname.startsWith(p.href))

  return (
    <header className="top-nav">
      {/* Brand */}
      <Link href="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '8px',
          background: 'linear-gradient(135deg, var(--blue) 0%, var(--green) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
          River City
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
        {pages.map(page => {
          const active = pathname.startsWith(page.href)
          return (
            <Link
              key={page.href}
              href={page.href}
              style={{
                padding: '5px 12px',
                borderRadius: '7px',
                fontSize: '13px',
                fontWeight: active ? 700 : 500,
                textDecoration: 'none',
                color: active ? 'var(--blue)' : 'var(--ink-soft)',
                background: active ? 'var(--blue-light)' : 'transparent',
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
            >
              {page.label}
            </Link>
          )
        })}

        {/* Pages dropdown trigger */}
        <div ref={ref} style={{ position: 'relative', marginLeft: '6px' }}>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 10px', borderRadius: '7px', border: '1px solid var(--border)',
              background: open ? 'var(--blue-light)' : 'rgba(255,255,255,0.60)',
              color: open ? 'var(--blue)' : 'var(--ink-soft)',
              fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.15s ease', fontFamily: 'inherit',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Pages
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {open && (
            <div className="page-dropdown">
              {pages.map(page => {
                const active = pathname.startsWith(page.href)
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    onClick={() => setOpen(false)}
                    className={`page-dropdown-item${active ? ' active' : ''}`}
                  >
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.2 }}>{page.label}</p>
                      <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>{page.sub}</p>
                    </div>
                    {active && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', color: 'var(--blue)', flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
