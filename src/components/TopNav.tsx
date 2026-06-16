'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/home',  label: 'Home' },
  { href: '/pray',  label: 'Pray' },
  { href: '/learn', label: 'Learn' },
  { href: '/group', label: 'Group' },
  { href: '/more',  label: 'Resources' },
]

export default function TopNav({ isLeader }: { isLeader: boolean }) {
  const pathname = usePathname()
  const links = isLeader ? [...LINKS, { href: '/admin', label: 'Admin' }] : LINKS

  return (
    <header className="top-nav">
      {/* Brand */}
      <Link href="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '9px',
          background: 'linear-gradient(135deg, var(--blue) 0%, var(--green) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
          River City
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {links.map(link => {
          const active = pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13.5px',
                fontWeight: active ? 700 : 500,
                textDecoration: 'none',
                color: active ? 'var(--blue)' : 'var(--ink-soft)',
                background: active ? 'var(--blue-light)' : 'transparent',
                transition: 'color 0.15s ease, background 0.15s ease',
                letterSpacing: '0.01em',
              }}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
