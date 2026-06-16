'use client'

import { useMemo } from 'react'
import { getDailyPrayer, getPeriodLabel } from '@/lib/daily-prayers'

export default function DailyPrayerBanner() {
  // Runs in the browser — uses the user's local time, not server UTC
  const prayer = useMemo(() => getDailyPrayer(), [])
  const periodLabel = useMemo(() => getPeriodLabel(), [])

  return (
    <div
      className="relative overflow-hidden"
      style={{
        borderRadius: '16px',
        background: 'linear-gradient(145deg, #1e1b16 0%, #2e2820 60%, #3a3028 100%)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at top right, rgba(184,92,58,0.18) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at bottom left, rgba(92,122,96,0.12) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="relative px-6 py-7">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#8fa88c' }}>
            {periodLabel}
          </p>
          <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
        </div>

        <p className="font-reading leading-relaxed mb-6" style={{ color: '#f0ece0', fontSize: '17px', fontStyle: 'italic', lineHeight: 1.7 }}>
          "{prayer.text}"
        </p>

        <div className="flex items-center gap-3">
          <div className="w-8 h-px" style={{ backgroundColor: '#8fa88c' }} />
          <p className="text-xs font-medium" style={{ color: '#8fa88c' }}>
            {prayer.attribution}
          </p>
        </div>
      </div>
    </div>
  )
}
