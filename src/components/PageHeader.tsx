'use client'

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
  glowColor2 = 'rgba(45,112,85,0.15)',
}: Props) {
  return (
    <div
      className="animate-up d1"
      style={{
        background: 'linear-gradient(160deg, var(--dark) 0%, var(--dark-2) 60%, var(--dark-3) 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '3.5rem',
        paddingBottom: '2.75rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
      }}
    >
      {/* Primary glow — top right */}
      <div style={{
        position: 'absolute', top: '-25%', right: '-12%',
        width: '70%', paddingBottom: '70%',
        background: `radial-gradient(circle, ${glowColor} 0%, transparent 68%)`,
        pointerEvents: 'none',
        animation: 'glowPulse 6s ease-in-out infinite',
      }} />
      {/* Secondary glow — bottom left */}
      <div style={{
        position: 'absolute', bottom: '-25%', left: '-8%',
        width: '52%', paddingBottom: '52%',
        background: `radial-gradient(circle, ${glowColor2} 0%, transparent 68%)`,
        pointerEvents: 'none',
        animation: 'glowPulse 8s ease-in-out infinite 2s',
      }} />

      {/* Thin accent line at very top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.08) 70%, transparent 100%)',
      }} />

      <div style={{ position: 'relative' }}>
        {label && (
          <p style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            {label}
          </p>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && (
          <p style={{
            color: 'rgba(255,255,255,0.42)',
            fontSize: '14px',
            lineHeight: 1.55,
            marginTop: '0.625rem',
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
