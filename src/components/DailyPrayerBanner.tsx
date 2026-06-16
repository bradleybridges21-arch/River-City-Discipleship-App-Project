'use client'

import { useMemo } from 'react'
import { getDailyPrayer, getPeriodLabel } from '@/lib/daily-prayers'

export default function DailyPrayerBanner() {
  const prayer = useMemo(() => getDailyPrayer(), [])
  const periodLabel = useMemo(() => getPeriodLabel(), [])

  return (
    <div className="glass-dark" style={{ borderRadius: '20px', padding: '1.5rem' }}>
      {/* Period label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.125rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.10)' }} />
        <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {periodLabel}
        </p>
        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.10)' }} />
      </div>

      {/* Prayer text */}
      <p className="font-reading" style={{ color: 'rgba(255,255,255,0.88)', fontSize: '17px', fontStyle: 'italic', lineHeight: 1.72, marginBottom: '1.125rem' }}>
        "{prayer.text}"
      </p>

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '22px', height: '1px', background: 'rgba(255,255,255,0.22)' }} />
        <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', fontWeight: 500 }}>
          {prayer.attribution}
        </p>
      </div>
    </div>
  )
}
