'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Teaching {
  id: string
  hook: string
  scripture_ref: string
  application: string
  question: string
  week_label: string
}

interface Response {
  id: string
  body: string
}

export default function KnowChrist({ userId }: { userId: string }) {
  const supabase = createClient()
  const [teaching, setTeaching] = useState<Teaching | null>(null)
  const [response, setResponse] = useState<Response | null>(null)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: t } = await supabase
        .from('teachings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setTeaching(t)

      if (t) {
        const { data: r } = await supabase
          .from('responses')
          .select('*')
          .eq('teaching_id', t.id)
          .eq('user_id', userId)
          .single()

        setResponse(r)
        setDraft(r?.body ?? '')
      }

      setLoading(false)
    }

    load()
  }, [userId, supabase])

  async function saveResponse() {
    if (!teaching || !draft.trim()) return
    setSaving(true)

    if (response) {
      await supabase
        .from('responses')
        .update({ body: draft })
        .eq('id', response.id)
    } else {
      const { data } = await supabase
        .from('responses')
        .insert({ teaching_id: teaching.id, user_id: userId, body: draft })
        .select()
        .single()
      setResponse(data)
    }

    setSaving(false)
  }

  if (loading) {
    return <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>Loading this week's teaching…</p>
  }

  if (!teaching) {
    return (
      <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
          Your leader hasn't posted this week's teaching yet. Check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>
          {teaching.week_label}
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--ink)' }}>
          {teaching.hook}
        </p>
        <p className="font-reading italic leading-relaxed mb-1" style={{ color: 'var(--ink)', fontSize: '16px' }}>
          {teaching.scripture_ref}
        </p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-soft)' }}>
          {teaching.application}
        </p>
      </div>

      <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="font-medium mb-3" style={{ color: 'var(--ink)', fontSize: '15px' }}>
          {teaching.question}
        </p>
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          rows={5}
          placeholder="Write your response… your leader will see this."
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
          style={{
            backgroundColor: 'var(--paper)',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
          }}
        />
        <button
          onClick={saveResponse}
          disabled={saving || !draft.trim()}
          className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold transition-opacity"
          style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: saving || !draft.trim() ? 0.5 : 1 }}
        >
          {saving ? 'Saving…' : response ? 'Update response' : 'Share response'}
        </button>
      </div>
    </div>
  )
}
