'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

interface SubPage { label: string; description: string }
interface NavPage { href: string; label: string; subs: SubPage[] }

const PAGES: NavPage[] = [
  {
    href: '/home',
    label: 'Home',
    subs: [],
  },
  {
    href: '/pray',
    label: 'Pray',
    subs: [
      { label: 'The Hours', description: 'Morning, midday & evening prayer' },
      { label: 'Questions', description: 'Prayers Jesus prayed and asked' },
      { label: 'Group Prayer', description: 'Pray with your community' },
      { label: 'Meditation', description: 'Lectio Divina & sacred reading' },
      { label: 'Inner Room', description: 'Your private journal' },
    ],
  },
  {
    href: '/learn',
    label: 'Learn',
    subs: [
      { label: 'This Week', description: 'Current teaching' },
      { label: 'Catechism', description: 'Westminster Shorter' },
      { label: 'Creeds', description: 'Apostles\' & Nicene' },
      { label: 'Didache', description: 'Teaching of the Twelve' },
      { label: '5 Solas', description: 'The Reformation\'s core claims' },
      { label: 'Hymns', description: 'What they say and why they endure' },
      { label: 'Bible Books', description: 'Prefaces to all 66 books' },
      { label: 'The Blessing', description: 'Christ vs. every counterfeit' },
      { label: 'Hard Words', description: 'Grace behind difficult commands' },
      { label: 'Not in the Bible', description: 'Words taught without being named' },
      { label: 'Flesh or Foe?', description: 'Discerning the three enemies' },
    ],
  },
  {
    href: '/group',
    label: 'Group',
    subs: [
      { label: 'Calendar', description: 'Meetings & upcoming events' },
      { label: 'Members', description: 'Your discipleship community' },
    ],
  },
  {
    href: '/more',
    label: 'Resources',
    subs: [
      { label: 'Scripture', description: 'Read & search the Bible' },
      { label: 'Tools', description: 'Guides & reference material' },
    ],
  },
]

function NavItem({ page, active }: { page: NavPage; active: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  if (page.subs.length === 0) {
    return (
      <Link
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
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '5px 10px 5px 12px', borderRadius: '7px',
          border: 'none', background: active ? 'var(--blue-light)' : open ? 'rgba(18,18,31,0.06)' : 'transparent',
          color: active ? 'var(--blue)' : 'var(--ink-soft)',
          fontSize: '13px', fontWeight: active ? 700 : 500,
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'color 0.15s ease, background 0.15s ease',
        }}
      >
        {page.label}
        <svg
          width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s', marginTop: '1px', opacity: 0.5 }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="page-dropdown" style={{ minWidth: '220px' }}>
          {/* Link to main page */}
          <Link
            href={page.href}
            onClick={() => setOpen(false)}
            className={`page-dropdown-item${active ? ' active' : ''}`}
          >
            <div>
              <p style={{ fontWeight: 700, fontSize: '13px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>{page.label}</p>
              <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>Overview</p>
            </div>
            {active && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', color: 'var(--blue)', flexShrink: 0 }}>
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </Link>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border-soft)', margin: '0' }} />

          {/* Sub-pages */}
          {page.subs.map(sub => (
            <Link
              key={sub.label}
              href={page.href}
              onClick={() => setOpen(false)}
              className="page-dropdown-item"
              style={{ paddingLeft: '24px' }}
            >
              <div>
                <p style={{ fontWeight: 500, fontSize: '13px', lineHeight: 1.2 }}>{sub.label}</p>
                <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>{sub.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TopNav({ isLeader }: { isLeader: boolean }) {
  const pathname = usePathname()
  const pages = isLeader
    ? [...PAGES, { href: '/admin', label: 'Admin', subs: [] }]
    : PAGES

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
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {pages.map(page => (
          <NavItem
            key={page.href}
            page={page}
            active={pathname.startsWith(page.href)}
          />
        ))}
      </nav>
    </header>
  )
}
