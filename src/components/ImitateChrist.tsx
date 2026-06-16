'use client'

export default function ImitateChrist({ userId: _ }: { userId: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: 'var(--sage)' }}>
          Imitate Christ
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          Obedience and discipling others — this space is coming in the next build.
        </p>
        <p className="font-reading italic mt-4 leading-relaxed" style={{ color: 'var(--ink)', fontSize: '15px' }}>
          "Follow me, and I will make you fishers of men."
        </p>
        <p className="text-xs mt-2 font-medium" style={{ color: 'var(--sage)' }}>Matthew 4:19</p>
      </div>
    </div>
  )
}
