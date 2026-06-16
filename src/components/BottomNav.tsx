'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BASE_TABS = [
  {
    href: '/home',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    href: '/pray',
    label: 'Pray',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/>
        <path d="M6 8H5a4 4 0 000 8h1"/>
        <path d="M6 12h12"/>
        <path d="M12 2v4M12 18v4"/>
      </svg>
    ),
  },
  {
    href: '/learn',
    label: 'Learn',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    href: '/group',
    label: 'Group',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    href: '/more',
    label: 'More',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" fill={active ? 'currentColor' : 'none'}/>
        <circle cx="19" cy="12" r="1" fill={active ? 'currentColor' : 'none'}/>
        <circle cx="5" cy="12" r="1" fill={active ? 'currentColor' : 'none'}/>
      </svg>
    ),
  },
]

const ADMIN_TAB = {
  href: '/admin',
  label: 'Admin',
  icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
}

export default function BottomNav({ isLeader }: { isLeader: boolean }) {
  const pathname = usePathname()
  const tabs = isLeader ? [...BASE_TABS, ADMIN_TAB] : BASE_TABS

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-2"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        paddingTop: '10px',
      }}
    >
      {tabs.map(tab => {
        const active = pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-1 min-w-[44px]"
            style={{ color: active ? 'var(--terracotta)' : 'var(--ink-soft)' }}
          >
            {tab.icon(active)}
            <span style={{ fontSize: '10px', fontWeight: active ? 600 : 400, letterSpacing: '0.03em' }}>
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
