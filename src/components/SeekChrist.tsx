'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface JournalEntry {
  id: string
  body: string
  created_at: string
}

interface PrayerRequest {
  id: string
  body: string
  created_at: string
  profiles: { full_name: string } | null
}

export default function SeekChrist({ userId }: { userId: string }) {
  const supabase = createClient()
  const [journal, setJournal] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [prayers, setPrayers] = useState<PrayerRequest[]>([])
  const [prayerDraft, setPrayerDraft] = useState('')
  const [postingPrayer, setPostingPrayer] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: j } = await supabase
        .from('journal_entries')
        .select('id, body, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5)

      setEntries(j ?? [])

      const { data: p } = await supabase
        .from('prayer_requests')
        .select('id, body, created_at, profiles(full_name)')
        .order('created_at', { ascending: false })
        .limit(10)

      setPrayers((p as unknown as PrayerRequest[]) ?? [])
    }

    load()
  }, [userId, supabase])

  async function saveJournal() {
    if (!journal.trim()) return
    setSaving(true)

    const { data } = await supabase
      .from('journal_entries')
      .insert({ user_id: userId, body: journal })
      .select()
      .single()

    if (data) {
      setEntries(prev => [data, ...prev.slice(0, 4)])
      setJournal('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }

    setSaving(false)
  }

  async function postPrayer() {
    if (!prayerDraft.trim()) return
    setPostingPrayer(true)

    const { data } = await supabase
      .from('prayer_requests')
      .insert({ user_id: userId, body: prayerDraft })
      .select('id, body, created_at, profiles(full_name)')
      .single()

    if (data) {
      setPrayers(prev => [data as unknown as PrayerRequest, ...prev.slice(0, 9)])
      setPrayerDraft('')
    }

    setPostingPrayer(false)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Private journal */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>
          Inner room
        </p>
        <p className="text-sm mb-3" style={{ color: 'var(--ink-soft)' }}>
          Private to you only. No one else can read this.
        </p>
        <textarea
          value={journal}
          onChange={e => setJournal(e.target.value)}
          rows={5}
          placeholder="What is God stirring in you today?"
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none font-reading"
          style={{
            backgroundColor: 'var(--paper)',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
            fontSize: '15px',
          }}
        />
        <button
          onClick={saveJournal}
          disabled={saving || !journal.trim()}
          className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold transition-opacity"
          style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: saving || !journal.trim() ? 0.5 : 1 }}
        >
          {saved ? 'Saved.' : saving ? 'Saving…' : 'Save to inner room'}
        </button>
      </div>

      {/* Recent journal entries */}
      {entries.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--sage)' }}>Recent reflections</p>
          {entries.map(e => (
            <div key={e.id} className="rounded-2xl px-5 py-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="font-reading text-sm leading-relaxed" style={{ color: 'var(--ink)', fontSize: '15px' }}>{e.body}</p>
              <p className="text-xs mt-2" style={{ color: 'var(--sage)' }}>
                {new Date(e.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Prayer requests */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>Group prayer</p>
        <textarea
          value={prayerDraft}
          onChange={e => setPrayerDraft(e.target.value)}
          rows={3}
          placeholder="Share a prayer request with your group…"
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
          style={{
            backgroundColor: 'var(--paper)',
            border: '1px solid var(--border)',
            color: 'var(--ink)',
          }}
        />
        <button
          onClick={postPrayer}
          disabled={postingPrayer || !prayerDraft.trim()}
          className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold transition-opacity"
          style={{ backgroundColor: 'var(--sage)', color: '#fff', opacity: postingPrayer || !prayerDraft.trim() ? 0.5 : 1 }}
        >
          {postingPrayer ? 'Posting…' : 'Share with group'}
        </button>
      </div>

      {prayers.length > 0 && (
        <div className="flex flex-col gap-3">
          {prayers.map(p => (
            <div key={p.id} className="rounded-2xl px-5 py-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{p.body}</p>
              <p className="text-xs mt-2" style={{ color: 'var(--sage)' }}>
                {p.profiles?.full_name ?? 'Someone'} · {new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
