'use client'

import { useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { DailyPrayer } from '@/lib/daily-prayers'
import PageHeader from '@/components/PageHeader'
import InnerRoom from '@/components/InnerRoom'
import { PRAYER_QUESTIONS, QUESTION_CATEGORIES } from '@/lib/prayer-questions'

interface GroupPrayer { id: string; body: string; created_at: string; profiles: { full_name: string } | null }
interface JournalEntry { id: string; body: string; created_at: string }

interface Props {
  userId: string
  groupPrayers: GroupPrayer[]
  journalEntries: JournalEntry[]
  dailyPrayer: DailyPrayer
}

type Tab = 'hours' | 'questions' | 'group' | 'meditation' | 'journal'

const LECTIO_STEPS = [
  {
    latin: 'Lectio', english: 'Read', number: 'I', color: 'var(--blue)',
    instruction: 'Read the passage slowly — twice, or even three times. Read aloud if you can. Do not rush to understand. You are not studying; you are listening. Let the words wash over you as if hearing them for the first time. Notice if a word or phrase catches your attention.',
  },
  {
    latin: 'Meditatio', english: 'Meditate', number: 'II', color: 'var(--gold)',
    instruction: 'Take the word or phrase that caught your attention and sit with it. Turn it over slowly in your mind the way you might turn a stone in your hand. Repeat it gently. Do not force meaning — let it speak. Chew on it. The ancient monks called this ruminatio: to ruminate, drawing out every bit of nourishment.',
  },
  {
    latin: 'Oratio', english: 'Pray', number: 'III', color: 'var(--sage)',
    instruction: 'Let what has stirred in you become prayer. This is not a prepared prayer — it rises from what God has shown you. Speak to him. Confess what the Word has revealed. Thank him. Ask for what the passage has made you want. This is conversation, not performance. He is already here.',
  },
  {
    latin: 'Contemplatio', english: 'Rest', number: 'IV', color: 'var(--mauve)',
    instruction: 'Now stop. Stop reading, stop thinking, stop even praying in words. Simply rest in God\'s presence. You do not need to produce anything. You do not need to feel anything. Contemplation is not an emotion — it is consent. I am here. You are here. That is enough.',
  },
]

const MEDITATION_PASSAGES = [
  { ref: 'Psalm 23', text: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.' },
  { ref: 'Isaiah 40:31', text: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.' },
  { ref: 'Matthew 11:28–29', text: 'Come to me, all who labor and are heavy laden, and I will give you rest. Take my yoke upon you, and learn from me, for I am gentle and lowly in heart, and you will find rest for your souls.' },
  { ref: 'Psalm 46:10', text: 'Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!' },
  { ref: 'John 15:4–5', text: 'Abide in me, and I in you. As the branch cannot bear fruit by itself, unless it abides in the vine, neither can you, unless you abide in me. I am the vine; you are the branches.' },
  { ref: 'Romans 8:38–39', text: 'For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.' },
]

const HOURS = [
  {
    label: 'Morning',
    accent: 'var(--blue)',
    intro: 'Begin the day by orienting yourself to God before the noise of the world sets the agenda. Morning prayer is the act of a soul that knows it cannot navigate what is coming on its own.',
    prayers: [
      { title: 'Opening', text: 'O Lord, open my lips, and my mouth will declare your praise.', ref: 'Psalm 51:15' },
      { title: "The Lord's Prayer", text: "Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. Lead us not into temptation, but deliver us from evil. For thine is the kingdom, and the power, and the glory, for ever and ever. Amen.", ref: 'Matthew 6:9–13' },
      { title: 'Collect for Grace', text: 'O Lord our heavenly Father, Almighty and everlasting God, who hast safely brought us to the beginning of this day; Defend us in the same with thy mighty power; and grant that this day we fall into no sin, neither run into any kind of danger; but that all our doings may be ordered by thy governance, to do always that is righteous in thy sight; through Jesus Christ our Lord. Amen.', ref: 'Book of Common Prayer (1662)' },
    ],
  },
  {
    label: 'Midday',
    accent: 'var(--green)',
    intro: 'A pause in the middle of the day is a small act of defiance against the tyranny of productivity. Stop. Even for five minutes. Remember what you are doing and for whom.',
    prayers: [
      { title: 'Pause', text: 'Be still, and know that I am God.', ref: 'Psalm 46:10' },
      { title: 'Midday Collect', text: "Blessed Savior, at this hour you hung upon the cross, stretching out your loving arms. Grant that all the peoples of the earth may look to you and be saved; for your mercies' sake. Amen.", ref: 'Book of Common Prayer' },
      { title: 'Benediction', text: 'The grace of the Lord Jesus Christ and the love of God and the fellowship of the Holy Spirit be with you all.', ref: '2 Corinthians 13:14' },
    ],
  },
  {
    label: 'Evening',
    accent: 'var(--mauve)',
    intro: 'The evening office is a time to release the day — to give back what has been heavy, to confess what needs confessing, and to rest under the protection of the One who neither slumbers nor sleeps.',
    prayers: [
      { title: 'Opening', text: 'Lord, now you are letting your servant depart in peace, according to your word; for my eyes have seen your salvation.', ref: 'Luke 2:29–30' },
      { title: 'Collect for Aid', text: 'Lighten our darkness, we beseech thee, O Lord; and by thy great mercy defend us from all perils and dangers of this night; for the love of thy only Son, our Savior Jesus Christ. Amen.', ref: 'Book of Common Prayer (1662)' },
      { title: 'Blessing', text: 'The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you; the Lord turn his face toward you and give you peace.', ref: 'Numbers 6:24–26' },
    ],
  },
]

const glowColors: Record<Tab, string> = {
  hours: 'rgba(59,110,168,0.20)',
  questions: 'rgba(122,88,130,0.20)',
  group: 'rgba(45,112,85,0.20)',
  meditation: 'rgba(90,106,122,0.18)',
  journal: 'rgba(122,88,130,0.18)',
}

export default function PrayClient({ userId, groupPrayers: initialPrayers, journalEntries: initialEntries }: Props) {
  const supabase = createClient()
  const [tab, setTab] = useState<Tab>('hours')
  const [hourSection, setHourSection] = useState(0)
  const [prayers, setPrayers] = useState(initialPrayers)
  const [prayerDraft, setPrayerDraft] = useState('')
  const [posting, setPosting] = useState(false)
  const [qCategory, setQCategory] = useState<string>('all')

  const section = HOURS[hourSection]

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

  const filteredQuestions = qCategory === 'all'
    ? PRAYER_QUESTIONS
    : PRAYER_QUESTIONS.filter(q => q.category === qCategory)

  const tabs: [Tab, string][] = [
    ['hours', 'The Hours'],
    ['questions', 'Questions'],
    ['group', 'Group'],
    ['meditation', 'Meditation'],
    ['journal', 'Inner Room'],
  ]

  return (
    <div>
      <PageHeader
        title="Prayer"
        subtitle="The daily hours, deep questions, and your inner room."
        glowColor={glowColors[tab]}
      />

      <div style={{ background: 'var(--paper)', position: 'relative', zIndex: 1, padding: '1.5rem 1.25rem 3rem', borderTop: '1px solid rgba(255,255,255,0.12)' }}>

        {/* Pill tabs */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', marginBottom: '1.75rem', paddingBottom: '2px' }}>
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                whiteSpace: 'nowrap', flexShrink: 0, padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.15s ease', fontFamily: 'inherit',
                background: tab === key ? 'var(--ink)' : 'rgba(30,27,22,0.07)',
                color: tab === key ? '#fff' : 'var(--ink-soft)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── The Hours ── */}
        {tab === 'hours' && (
          <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem' }}>
              {HOURS.map((h, i) => (
                <button key={h.label} onClick={() => setHourSection(i)} style={{ padding: '7px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', background: hourSection === i ? h.accent : 'rgba(30,27,22,0.07)', color: hourSection === i ? '#fff' : 'var(--ink-muted)' }}>
                  {h.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ink-soft)', marginBottom: '1.75rem', fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' }}>
              {section.intro}
            </p>
            {section.prayers.map((p, i) => (
              <div key={i} style={{ paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: i < section.prayers.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ width: '3px', height: '16px', borderRadius: '2px', background: section.accent, flexShrink: 0 }} />
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: section.accent }}>{p.title}</p>
                </div>
                <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '17px', lineHeight: 1.78, marginBottom: '8px' }}>{p.text}</p>
                <p style={{ fontSize: '11px', color: 'var(--ink-muted)', fontWeight: 500 }}>{p.ref}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Questions ── */}
        {tab === 'questions' && (
          <div>
            <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1.5rem', fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' }}>
              Questions open what statements close. Jesus asked more questions than he answered. Sit with one of these — slowly, honestly — and let it do its work.
            </p>
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none', marginBottom: '1.75rem', paddingBottom: '2px' }}>
              {QUESTION_CATEGORIES.map(cat => (
                <button key={cat.key} onClick={() => setQCategory(cat.key)} style={{ whiteSpace: 'nowrap', flexShrink: 0, padding: '6px 13px', borderRadius: '16px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', background: qCategory === cat.key ? 'var(--mauve)' : 'rgba(122,88,130,0.10)', color: qCategory === cat.key ? '#fff' : 'var(--mauve)' }}>
                  {cat.label}
                </button>
              ))}
            </div>
            {filteredQuestions.map((q, i) => (
              <div key={q.id} style={{ paddingBottom: '1.75rem', marginBottom: '1.75rem', borderBottom: i < filteredQuestions.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '8px' }}>
                  {QUESTION_CATEGORIES.find(c => c.key === q.category)?.label}
                </p>
                <p className="font-reading" style={{ fontSize: '20px', lineHeight: 1.5, color: 'var(--ink)', marginBottom: '12px', fontStyle: 'italic' }}>
                  &ldquo;{q.question}&rdquo;
                </p>
                <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '8px' }}>{q.context}</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--mauve)' }}>{q.source}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Group prayer ── */}
        {tab === 'group' && (
          <div>
            <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--ink-soft)', marginBottom: '1.5rem', fontFamily: 'Newsreader, Georgia, serif', fontStyle: 'italic' }}>
              Prayer shared with the group is prayer carried by the body. What you bring here does not stay with you alone.
            </p>
            <textarea value={prayerDraft} onChange={e => setPrayerDraft(e.target.value)} rows={3} placeholder="Share a prayer request with your group…" style={{ width: '100%', borderRadius: '8px', padding: '12px', fontSize: '14px', resize: 'none', outline: 'none', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.55)', color: 'var(--ink)', fontFamily: 'inherit', marginBottom: '10px' }} />
            <button onClick={postPrayer} disabled={posting || !prayerDraft.trim()} className="btn-primary" style={{ marginBottom: '2rem' }}>
              {posting ? 'Sharing…' : 'Share with group'}
            </button>
            {prayers.length === 0 && <p style={{ color: 'var(--ink-muted)', fontSize: '14px' }}>No prayer requests yet. Be the first to share.</p>}
            {prayers.map((p, i) => (
              <div key={p.id} style={{ paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: i < prayers.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                <p style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.65, marginBottom: '6px' }}>{p.body}</p>
                <p style={{ fontSize: '12px', color: 'var(--green)', fontWeight: 600 }}>
                  {p.profiles?.full_name ?? 'Someone'} · {new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Meditation / Lectio Divina ── */}
        {tab === 'meditation' && (
          <div>
            <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '20px', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              &ldquo;Divine reading&rdquo; — a way of sitting with Scripture that is less about understanding and more about encounter.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
              One of the oldest Christian spiritual practices, rooted in the monastery rhythms of the 6th century. The goal is not information — it is transformation. You are not reading God&rsquo;s Word so much as letting God&rsquo;s Word read you.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.65, marginBottom: '2rem' }}>
              Choose a passage below — or use your own — and move through the four movements at whatever pace the Spirit leads.
            </p>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1.25rem' }}>The four movements</p>
            {LECTIO_STEPS.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: i < LECTIO_STEPS.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '8px', background: step.color + '16', display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, fontFamily: 'Newsreader, Georgia, serif', fontSize: '16px', fontWeight: 500 }}>{step.number}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                    <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '18px', fontWeight: 500, color: 'var(--ink)', fontStyle: 'italic' }}>{step.latin}</p>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: step.color, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{step.english}</p>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--ink-soft)', lineHeight: 1.65 }}>{step.instruction}</p>
                </div>
              </div>
            ))}
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1.25rem', marginTop: '0.5rem' }}>Passages for today</p>
            {MEDITATION_PASSAGES.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', paddingBottom: '1.25rem', marginBottom: '1.25rem', borderBottom: i < MEDITATION_PASSAGES.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--border)' }} />
                <div>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>{p.ref}</p>
                  <p className="font-reading" style={{ fontSize: '17px', fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1.72 }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Inner Room ── */}
        {tab === 'journal' && (
          <InnerRoom userId={userId} initialEntries={initialEntries} />
        )}
      </div>
    </div>
  )
}
