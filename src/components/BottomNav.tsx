'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BASE_TABS = [
  {
    href: '/home',
    label: 'Home',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    href: '/pray',
    label: 'Pray',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    href: '/learn',
    label: 'Learn',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    ),
  },
  {
    href: '/group',
    label: 'Group',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="1.2" fill={active ? 'currentColor' : 'none'}/>
        <circle cx="12" cy="12" r="1.2" fill={active ? 'currentColor' : 'none'}/>
        <circle cx="19" cy="12" r="1.2" fill={active ? 'currentColor' : 'none'}/>
      </svg>
    ),
  },
]

const ADMIN_TAB = {
  href: '/admin',
  label: 'Admin',
  icon: (active: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
}

export default function BottomNav({ isLeader }: { isLeader: boolean }) {
  const pathname = usePathname()
  const tabs = isLeader ? [...BASE_TABS, ADMIN_TAB] : BASE_TABS

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
      paddingTop: '10px',
      paddingLeft: '4px',
      paddingRight: '4px',
      background: 'rgba(244,241,235,0.86)',
      backdropFilter: 'blur(30px) saturate(200%)',
      WebkitBackdropFilter: 'blur(30px) saturate(200%)',
      borderTop: '1px solid rgba(255,255,255,0.70)',
      boxShadow: '0 -1px 0 var(--border-soft), 0 -8px 28px rgba(18,18,31,0.06)',
    }}>
      {tabs.map(tab => {
        const active = pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              minWidth: '44px',
              position: 'relative',
              textDecoration: 'none',
              color: active ? 'var(--blue)' : 'var(--ink-muted)',
              transition: 'color 0.15s ease',
            }}
          >
            {active && (
              <div style={{
                position: 'absolute',
                top: '-3px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '38px',
                height: '28px',
                borderRadius: '10px',
                background: 'var(--blue-light)',
              }} />
            )}
            <div style={{ position: 'relative' }}>
              {tab.icon(active)}
            </div>
            <span style={{
              fontSize: '9.5px',
              fontWeight: active ? 700 : 500,
              letterSpacing: '0.02em',
            }}>
              {tab.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
