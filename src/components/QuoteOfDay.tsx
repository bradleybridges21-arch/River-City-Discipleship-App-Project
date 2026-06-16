'use client'

import { useMemo } from 'react'
import { getDailyQuote } from '@/lib/quotes'

export default function QuoteOfDay() {
  const quote = useMemo(() => getDailyQuote(), [])

  return (
    <div className="animate-up d2" style={{ padding: '0 1.5rem 2.5rem' }}>
      <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.20)', marginBottom: '1.25rem' }} />
      <p
        className="font-reading"
        style={{
          fontSize: '1.25rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,0.82)',
          marginBottom: '1rem',
          letterSpacing: '-0.005em',
        }}
      >
        &ldquo;{quote.text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.22)' }} />
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.38)',
        }}>
          {quote.author}{quote.source ? ` · ${quote.source}` : ''}
        </p>
      </div>
    </div>
  )
}
