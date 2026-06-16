import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getDailyPrayer, getPeriodLabel } from '@/lib/daily-prayers'
import SignOutButton from '@/components/SignOutButton'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const prayer = getDailyPrayer()
  const periodLabel = getPeriodLabel()
  const firstName = profile?.full_name?.split(' ')[0] ?? user.email?.split('@')[0] ?? 'Friend'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="px-5 pt-10 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>
            River City Church
          </p>
          <h1 className="text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
            {greeting}, {firstName}.
          </h1>
        </div>
        <SignOutButton />
      </div>

      {/* Daily prayer */}
      <div className="rounded-3xl p-6 mb-5" style={{ backgroundColor: 'var(--ink)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--sage)' }}>
          {periodLabel}
        </p>
        <p className="font-reading leading-relaxed mb-4" style={{ color: '#f5f0e8', fontSize: '17px', fontStyle: 'italic' }}>
          "{prayer.text}"
        </p>
        <p className="text-xs font-medium" style={{ color: 'var(--sage)' }}>
          — {prayer.attribution}
        </p>
      </div>

      {/* Quick nav cards */}
      <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--ink-soft)' }}>
        Jump to
      </p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { href: '/pray', emoji: '🙏', label: 'Daily prayer', sub: 'Morning · Midday · Evening' },
          { href: '/learn', emoji: '📖', label: 'Learn', sub: 'Teachings & catechism' },
          { href: '/group', emoji: '🕊️', label: 'Group', sub: 'Calendar & notes' },
          { href: '/more', emoji: '✝️', label: 'Resources', sub: 'Links & references' },
        ].map(card => (
          <a
            key={card.href}
            href={card.href}
            className="rounded-2xl p-4 flex flex-col gap-1 active:opacity-70 transition-opacity"
            style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <span style={{ fontSize: '22px' }}>{card.emoji}</span>
            <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{card.label}</p>
            <p style={{ color: 'var(--ink-soft)', fontSize: '11px' }}>{card.sub}</p>
          </a>
        ))}
      </div>

      {/* This week's question teaser */}
      <a href="/learn" className="block rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--terracotta)' }}>
          This week
        </p>
        <p className="font-medium text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
          See the latest teaching and share your response with your group →
        </p>
      </a>
    </div>
  )
}
