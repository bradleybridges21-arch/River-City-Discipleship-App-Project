'use client'

interface Props {
  label?: string
  title: string
  subtitle?: string
  glowColor?: string   // rgba string for the accent radial glow
}

export default function PageHeader({ label, title, subtitle, glowColor = 'rgba(184,92,58,0.20)' }: Props) {
  return (
    <div
      style={{
        background: 'linear-gradient(170deg, var(--dark) 0%, var(--dark-2) 55%, var(--dark-3) 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '3.5rem',
        paddingBottom: '2.5rem',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
      }}
    >
      {/* Accent radial glow — top right */}
      <div style={{
        position: 'absolute', top: '-30%', right: '-15%',
        width: '75%', paddingBottom: '75%',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      {/* Secondary glow — bottom left */}
      <div style={{
        position: 'absolute', bottom: '-20%', left: '-10%',
        width: '55%', paddingBottom: '55%',
        background: 'radial-gradient(circle, rgba(92,122,96,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative' }}>
        {label && (
          <p style={{
            color: 'rgba(255,255,255,0.38)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            {label}
          </p>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && (
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '14px',
            marginTop: '0.6rem',
            lineHeight: 1.5,
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
