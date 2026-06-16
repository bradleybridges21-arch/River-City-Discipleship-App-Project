'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { DailyPrayer } from '@/lib/daily-prayers'
import PageHeader from '@/components/PageHeader'

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
    accent: 'var(--gold)',
    prayers: [
      { title: 'Opening', text: 'O Lord, open my lips, and my mouth will declare your praise.', ref: 'Psalm 51:15' },
      { title: "The Lord's Prayer", text: "Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. Lead us not into temptation, but deliver us from evil. For thine is the kingdom, and the power, and the glory, for ever and ever. Amen.", ref: 'Matthew 6:9–13' },
      { title: 'Collect for Grace', text: 'O Lord our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight; through Jesus Christ our Lord. Amen.', ref: 'Book of Common Prayer (1662)' },
    ],
  },
  {
    label: 'Midday',
    accent: 'var(--sage)',
    prayers: [
      { title: 'Pause', text: 'Be still, and know that I am God.', ref: 'Psalm 46:10' },
      { title: 'Midday Collect', text: "Blessed Savior, at this hour you hung upon the cross, stretching out your loving arms. Grant that all the peoples of the earth may look to you and be saved; for your mercies' sake. Amen.", ref: 'Book of Common Prayer' },
      { title: 'Benediction', text: 'The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all.', ref: '2 Corinthians 13:14' },
    ],
  },
  {
    label: 'Evening',
    accent: 'var(--slate)',
    prayers: [
      { title: 'Opening', text: 'Lord, now you are letting your servant depart in peace, according to your word; for my eyes have seen your salvation.', ref: 'Luke 2:29–30' },
      { title: 'Collect for Aid', text: 'Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Savior Jesus Christ. Amen.', ref: 'Book of Common Prayer (1662)' },
      { title: 'Blessing', text: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.', ref: 'Numbers 6:24–26' },
    ],
  },
]

const glowColors: Record<Tab, string> = {
  office: 'rgba(176,120,48,0.22)',
  group: 'rgba(92,122,96,0.22)',
  journal: 'rgba(138,106,144,0.22)',
}

export default function PrayClient({ userId, groupPrayers: initialPrayers, journalEntries: initialEntries }: Props) {
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

  const tabLabels: [Tab, string][] = [['office', 'Daily Office'], ['group', 'Group Prayer'], ['journal', 'Inner Room']]

  return (
    <div>
      <PageHeader
        title="Prayer"
        subtitle="The daily office, group requests, and your inner room."
        glowColor={glowColors[tab]}
      />

      {/* Paper content sheet */}
      <div style={{
        background: 'var(--paper)',
        borderRadius: '24px 24px 0 0',
        marginTop: '-20px',
        position: 'relative',
        zIndex: 1,
        padding: '1.5rem 1.125rem 2rem',
      }}>
        {/* iOS segmented control */}
        <div className="seg-control" style={{ marginBottom: '1.25rem' }}>
          {tabLabels.map(([key, label]) => (
            <button key={key} className={`seg-tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>

        {/* ── Daily office ── */}
        {tab === 'office' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Time-of-day sub-toggle */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              {OFFICE_PRAYERS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setOfficeSection(i)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: officeSection === i ? 'var(--ink)' : 'rgba(255,255,255,0.6)',
                    color: officeSection === i ? '#fff' : 'var(--ink-muted)',
                    border: officeSection === i ? 'none' : '1px solid rgba(255,255,255,0.8)',
                    cursor: 'pointer',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {section.prayers.map((p, i) => (
              <div key={i} className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ height: '2px', background: section.accent }} />
                <div style={{ padding: '1.125rem 1.25rem' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: section.accent, marginBottom: '0.625rem' }}>
                    {p.title}
                  </p>
                  <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '16px', lineHeight: 1.72, marginBottom: '0.625rem' }}>
                    {p.text}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--ink-muted)', fontWeight: 500 }}>{p.ref}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Group prayer ── */}
        {tab === 'group' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="glass" style={{ borderRadius: '16px', padding: '1rem' }}>
              <textarea
                value={prayerDraft}
                onChange={e => setPrayerDraft(e.target.value)}
                rows={3}
                placeholder="Share a prayer request with your group…"
                style={{
                  width: '100%', borderRadius: '10px', padding: '12px', fontSize: '14px',
                  resize: 'none', outline: 'none', border: '1px solid rgba(255,255,255,0.8)',
                  background: 'rgba(255,255,255,0.6)', color: 'var(--ink)', fontFamily: 'inherit',
                }}
              />
              <button
                onClick={postPrayer}
                disabled={posting || !prayerDraft.trim()}
                className="btn-primary"
                style={{ marginTop: '10px' }}
              >
                {posting ? 'Sharing…' : 'Share with group'}
              </button>
            </div>

            {prayers.length === 0 && (
              <p style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--ink-muted)', fontSize: '14px' }}>
                No prayer requests yet. Be the first to share.
              </p>
            )}

            {prayers.map(p => (
              <div key={p.id} className="glass" style={{ borderRadius: '16px', padding: '1.125rem 1.25rem' }}>
                <p style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.6 }}>{p.body}</p>
                <p style={{ fontSize: '12px', color: 'var(--sage)', fontWeight: 600, marginTop: '8px' }}>
                  {p.profiles?.full_name ?? 'Someone'} · {new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Inner room journal ── */}
        {tab === 'journal' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ height: '2px', background: 'var(--mauve)' }} />
              <div style={{ padding: '1.125rem 1.25rem' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '4px' }}>
                  Inner room
                </p>
                <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '12px' }}>
                  Private to you only. No one else can read this.
                </p>
                <textarea
                  value={journalDraft}
                  onChange={e => setJournalDraft(e.target.value)}
                  rows={5}
                  placeholder="What is God stirring in you today?"
                  className="font-reading"
                  style={{
                    width: '100%', borderRadius: '10px', padding: '12px', fontSize: '15px',
                    resize: 'none', outline: 'none', border: '1px solid rgba(255,255,255,0.8)',
                    background: 'rgba(255,255,255,0.6)', color: 'var(--ink)',
                  }}
                />
                <button
                  onClick={saveJournal}
                  disabled={savingJournal || !journalDraft.trim()}
                  className="btn-primary"
                  style={{ marginTop: '10px', background: 'var(--mauve)', boxShadow: '0 2px 8px rgba(138,106,144,0.30)' }}
                >
                  {journalSaved ? 'Saved.' : savingJournal ? 'Saving…' : 'Save to inner room'}
                </button>
              </div>
            </div>

            {entries.map(e => (
              <div key={e.id} className="glass" style={{ borderRadius: '16px', padding: '1.125rem 1.25rem' }}>
                <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '15px', lineHeight: 1.7 }}>{e.body}</p>
                <p style={{ fontSize: '12px', color: 'var(--mauve)', fontWeight: 600, marginTop: '8px' }}>
                  {new Date(e.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
