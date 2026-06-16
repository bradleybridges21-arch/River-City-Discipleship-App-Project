'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { DailyPrayer } from '@/lib/daily-prayers'

interface GroupPrayer { id: string; body: string; created_at: string; profiles: { full_name: string } | null }
interface JournalEntry { id: string; body: string; created_at: string }

interface Props {
  userId: string
  groupPrayers: GroupPrayer[]
  journalEntries: JournalEntry[]
  dailyPrayer: DailyPrayer
}

type Tab = 'office' | 'group' | 'journal'

const OFFICE_PRAYERS = [
  {
    label: 'Morning',
    icon: '🌅',
    prayers: [
      { title: 'Opening', text: 'O Lord, open my lips, and my mouth will declare your praise.', ref: 'Psalm 51:15' },
      { title: 'The Lord\'s Prayer', text: 'Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. Lead us not into temptation, but deliver us from evil. For thine is the kingdom, and the power, and the glory, for ever and ever. Amen.', ref: 'Matthew 6:9–13' },
      { title: 'Collect for Grace', text: 'O Lord our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight; through Jesus Christ our Lord. Amen.', ref: 'Book of Common Prayer (1662)' },
    ],
  },
  {
    label: 'Midday',
    icon: '☀️',
    prayers: [
      { title: 'Pause', text: 'Be still, and know that I am God.', ref: 'Psalm 46:10' },
      { title: 'Midday Collect', text: 'Blessed Savior, at this hour you hung upon the cross, stretching out your loving arms. Grant that all the peoples of the earth may look to you and be saved; for your mercies\' sake. Amen.', ref: 'Book of Common Prayer' },
      { title: 'Benediction', text: 'The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all.', ref: '2 Corinthians 13:14' },
    ],
  },
  {
    label: 'Evening',
    icon: '🌙',
    prayers: [
      { title: 'Opening', text: 'Lord, now you are letting your servant depart in peace, according to your word; for my eyes have seen your salvation.', ref: 'Luke 2:29–30' },
      { title: 'Collect for Aid', text: 'Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Savior Jesus Christ. Amen.', ref: 'Book of Common Prayer (1662)' },
      { title: 'Blessing', text: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.', ref: 'Numbers 6:24–26' },
    ],
  },
]

export default function PrayClient({ userId, groupPrayers: initialPrayers, journalEntries: initialEntries, dailyPrayer }: Props) {
  const supabase = createClient()
  const [tab, setTab] = useState<Tab>('office')
  const [officeSection, setOfficeSection] = useState(0)
  const [prayers, setPrayers] = useState(initialPrayers)
  const [entries, setEntries] = useState(initialEntries)
  const [prayerDraft, setPrayerDraft] = useState('')
  const [journalDraft, setJournalDraft] = useState('')
  const [posting, setPosting] = useState(false)
  const [savingJournal, setSavingJournal] = useState(false)
  const [journalSaved, setJournalSaved] = useState(false)

  const section = OFFICE_PRAYERS[officeSection]

  async function postPrayer() {
    if (!prayerDraft.trim()) return
    setPosting(true)
    const { data } = await supabase
      .from('prayer_requests')
      .insert({ user_id: userId, body: prayerDraft })
      .select('id, body, created_at, profiles(full_name)')
      .single()
    if (data) setPrayers(prev => [data as any, ...prev])
    setPrayerDraft('')
    setPosting(false)
  }

  async function saveJournal() {
    if (!journalDraft.trim()) return
    setSavingJournal(true)
    const { data } = await supabase
      .from('journal_entries')
      .insert({ user_id: userId, body: journalDraft })
      .select()
      .single()
    if (data) {
      setEntries(prev => [data, ...prev])
      setJournalDraft('')
      setJournalSaved(true)
      setTimeout(() => setJournalSaved(false), 2000)
    }
    setSavingJournal(false)
  }

  return (
    <div className="px-5 pt-10">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>Prayer</h1>
      <p className="text-sm mb-5" style={{ color: 'var(--ink-soft)' }}>The daily office, group requests, and your inner room.</p>

      {/* Daily prayer banner */}
      <div className="rounded-2xl px-5 py-4 mb-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--sage)' }}>
          Today's prayer
        </p>
        <p className="font-reading italic leading-relaxed" style={{ color: 'var(--ink)', fontSize: '15px' }}>
          "{dailyPrayer.text}"
        </p>
        <p className="text-xs mt-2 font-medium" style={{ color: 'var(--ink-soft)' }}>— {dailyPrayer.attribution}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(['office', 'group', 'journal'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
            style={{
              backgroundColor: tab === t ? 'var(--terracotta)' : 'var(--surface)',
              color: tab === t ? '#fff' : 'var(--ink-soft)',
              border: '1px solid var(--border)',
            }}
          >
            {t === 'office' ? 'Daily office' : t === 'group' ? 'Group prayer' : 'Inner room'}
          </button>
        ))}
      </div>

      {/* Daily office */}
      {tab === 'office' && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {OFFICE_PRAYERS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setOfficeSection(i)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: officeSection === i ? 'var(--ink)' : 'var(--surface)',
                  color: officeSection === i ? '#fff' : 'var(--ink-soft)',
                  border: '1px solid var(--border)',
                }}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
          {section.prayers.map((p, i) => (
            <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>{p.title}</p>
              <p className="font-reading leading-relaxed mb-2" style={{ color: 'var(--ink)', fontSize: '16px' }}>{p.text}</p>
              <p className="text-xs font-medium" style={{ color: 'var(--ink-soft)' }}>{p.ref}</p>
            </div>
          ))}
        </div>
      )}

      {/* Group prayer */}
      {tab === 'group' && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <textarea
              value={prayerDraft}
              onChange={e => setPrayerDraft(e.target.value)}
              rows={3}
              placeholder="Share a prayer request with your group…"
              className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
              style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
            />
            <button
              onClick={postPrayer}
              disabled={posting || !prayerDraft.trim()}
              className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'var(--sage)', color: '#fff', opacity: posting || !prayerDraft.trim() ? 0.5 : 1 }}
            >
              {posting ? 'Sharing…' : 'Share with group'}
            </button>
          </div>
          {prayers.length === 0 && (
            <p className="text-sm text-center py-4" style={{ color: 'var(--ink-soft)' }}>No prayer requests yet. Be the first to share.</p>
          )}
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

      {/* Inner room journal */}
      {tab === 'journal' && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>Inner room</p>
            <p className="text-xs mb-3" style={{ color: 'var(--ink-soft)' }}>Private to you only. No one else can read this.</p>
            <textarea
              value={journalDraft}
              onChange={e => setJournalDraft(e.target.value)}
              rows={5}
              placeholder="What is God stirring in you today?"
              className="w-full rounded-xl px-4 py-3 resize-none outline-none font-reading"
              style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)', fontSize: '15px' }}
            />
            <button
              onClick={saveJournal}
              disabled={savingJournal || !journalDraft.trim()}
              className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: savingJournal || !journalDraft.trim() ? 0.5 : 1 }}
            >
              {journalSaved ? 'Saved.' : savingJournal ? 'Saving…' : 'Save to inner room'}
            </button>
          </div>
          {entries.map(e => (
            <div key={e.id} className="rounded-2xl px-5 py-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="font-reading leading-relaxed" style={{ color: 'var(--ink)', fontSize: '15px' }}>{e.body}</p>
              <p className="text-xs mt-2" style={{ color: 'var(--sage)' }}>
                {new Date(e.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
