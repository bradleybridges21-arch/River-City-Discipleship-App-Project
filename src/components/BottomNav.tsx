'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BASE_TABS = [
  {
    href: '/home',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    href: '/pray',
    label: 'Pray',
    icon: (active: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    href: '/learn',
    label: 'Learn',
    icon: (active: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    href: '/group',
    label: 'Group',
    icon: (active: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="1" fill={active ? 'currentColor' : 'none'}/>
        <circle cx="12" cy="12" r="1" fill={active ? 'currentColor' : 'none'}/>
        <circle cx="12" cy="19" r="1" fill={active ? 'currentColor' : 'none'}/>
      </svg>
    ),
  },
]

const ADMIN_TAB = {
  href: '/admin',
  label: 'Admin',
  icon: (active: boolean) => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      <path d="M16 3.5C17.5 4.5 18 6 17.5 7.5"/>
    </svg>
  ),
}

export default function BottomNav({ isLeader }: { isLeader: boolean }) {
  const pathname = usePathname()
  const tabs = isLeader ? [...BASE_TABS, ADMIN_TAB] : BASE_TABS

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-1"
      style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border-soft)',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        paddingTop: '10px',
        boxShadow: '0 -4px 20px rgba(30,27,22,0.07)',
      }}
    >
      {tabs.map(tab => {
        const active = pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-1 min-w-[44px] relative"
            style={{ color: active ? 'var(--terracotta)' : 'var(--ink-muted)' }}
          >
            {/* Active indicator dot */}
            {active && (
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ backgroundColor: 'var(--terracotta)' }}
              />
            )}
            {tab.icon(active)}
            <span style={{ fontSize: '9px', fontWeight: active ? 700 : 400, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
