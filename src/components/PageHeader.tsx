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

interface Props {
  label?: string
  title: string
  subtitle?: string
  glowColor?: string
  glowColor2?: string
}

export default function PageHeader({
  label,
  title,
  subtitle,
  glowColor = 'rgba(59,110,168,0.22)',
  glowColor2 = 'rgba(45,112,85,0.14)',
}: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const current = PAGES.find(p => pathname.startsWith(p.href))

  return (
    <div
      style={{
        background: 'linear-gradient(160deg, var(--dark) 0%, var(--dark-2) 60%, var(--dark-3) 100%)',
        position: 'relative',
        overflow: 'visible',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      {/* Primary glow */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%',
        width: '65%', paddingBottom: '65%',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 68%)`,
        pointerEvents: 'none',
        animation: 'glowPulse 7s ease-in-out infinite',
      }} />
      {/* Secondary glow */}
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-5%',
        width: '50%', paddingBottom: '50%',
        background: `radial-gradient(circle, ${glowColor2} 0%, transparent 68%)`,
        pointerEvents: 'none',
        animation: 'glowPulse 9s ease-in-out infinite 2.5s',
      }} />
      {/* Thin top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)',
      }} />

      <div style={{ position: 'relative' }}>
        {/* Page nav dropdown — mobile only (TopNav handles desktop) */}
        <div ref={ref} style={{ display: 'inline-block', marginBottom: '1.25rem' }} className="mobile-page-nav">
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '5px 10px 5px 12px', borderRadius: '20px',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.60)',
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            {current?.label ?? 'Pages'}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.18s', marginTop: '1px' }}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {open && (
            <div className="page-dropdown">
              {PAGES.map(page => {
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

        {label && (
          <p style={{
            color: 'rgba(255,255,255,0.32)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            {label}
          </p>
        )}
        <h1 className="page-title animate-up d1">{title}</h1>
        {subtitle && (
          <p style={{
            color: 'rgba(255,255,255,0.40)',
            fontSize: '15px',
            lineHeight: 1.55,
            marginTop: '0.75rem',
            fontFamily: 'Newsreader, Georgia, serif',
            fontStyle: 'italic',
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
