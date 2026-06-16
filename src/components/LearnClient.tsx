'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import PageHeader from '@/components/PageHeader'

interface Teaching {
  id: string; week_label: string; hook: string
  scripture_ref: string; application: string; question: string
}
interface Response { id: string; body: string }

const CATECHISM = [
  { q: 'What is the chief end of man?', a: 'Man\'s chief end is to glorify God, and to enjoy him forever.', ref: 'Q.1' },
  { q: 'What is God?', a: 'God is a Spirit, infinite, eternal, and unchangeable, in his being, wisdom, power, holiness, justice, goodness, and truth.', ref: 'Q.4' },
  { q: 'Are there more Gods than one?', a: 'There is but one only, the living and true God.', ref: 'Q.5' },
  { q: 'How many persons are there in the Godhead?', a: 'There are three persons in the Godhead: the Father, the Son, and the Holy Ghost; and these three are one God, the same in substance, equal in power and glory.', ref: 'Q.6' },
  { q: 'What are the decrees of God?', a: 'The decrees of God are his eternal purpose, according to the counsel of his will, whereby, for his own glory, he hath foreordained whatsoever comes to pass.', ref: 'Q.7' },
  { q: 'What is the work of creation?', a: 'The work of creation is God\'s making all things of nothing, by the word of his power, in the space of six days, and all very good.', ref: 'Q.9' },
  { q: 'What is sin?', a: 'Sin is any want of conformity unto, or transgression of, the law of God.', ref: 'Q.14' },
  { q: 'Who is the Redeemer of God\'s elect?', a: 'The only Redeemer of God\'s elect is the Lord Jesus Christ, who, being the eternal Son of God, became man, and so was, and continueth to be, God and man in two distinct natures, and one person, forever.', ref: 'Q.21' },
  { q: 'What is faith in Jesus Christ?', a: 'Faith in Jesus Christ is a saving grace, whereby we receive and rest upon him alone for salvation, as he is offered to us in the gospel.', ref: 'Q.86' },
  { q: 'What is repentance unto life?', a: 'Repentance unto life is a saving grace, whereby a sinner, out of a true sense of his sin, and apprehension of the mercy of God in Christ, doth, with grief and hatred of his sin, turn from it unto God, with full purpose of, and endeavor after, new obedience.', ref: 'Q.87' },
]

// Cycle through accent colors per card
const ACCENTS = ['#c0654a', '#8f9d84', '#7a8faa', '#b8956a', '#a07a8f']

const CREEDS = [
  {
    title: 'Apostles\' Creed',
    shortTitle: 'Apostles\'',
    date: 'c. 140 AD',
    text: `I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead.\n\nI believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,
  },
  {
    title: 'Nicene Creed',
    shortTitle: 'Nicene',
    date: '325 AD',
    text: `We believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.\n\nAnd in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all worlds; God of God, Light of Light, very God of very God; begotten, not made, being of one substance with the Father, by whom all things were made.\n\nWho, for us men and for our salvation, came down from heaven, and was incarnate by the Holy Spirit of the virgin Mary, and was made man; and was crucified also for us under Pontius Pilate; He suffered and was buried; and the third day He rose again, according to the Scriptures; and ascended into heaven, and sits on the right hand of the Father; and He shall come again, with glory, to judge the quick and the dead; whose kingdom shall have no end.\n\nAnd we believe in the Holy Ghost, the Lord and Giver of Life; who proceeds from the Father and the Son; who with the Father and the Son together is worshipped and glorified; who spoke by the prophets.\n\nAnd we believe in one holy catholic and apostolic Church. We acknowledge one baptism for the remission of sins. And we look for the resurrection of the dead, and the life of the world to come. Amen.`,
  },
  {
    title: 'The Didache',
    shortTitle: 'Didache',
    date: 'c. 50–120 AD',
    text: `There are two ways, one of life and one of death, and there is a great difference between the two ways.\n\nThe way of life is this: First, you shall love God who made you; and second, your neighbor as yourself; and whatever you do not want to happen to you, do not do to another.\n\nThe teaching of these words is this: Bless those who curse you, and pray for your enemies, and fast for those who persecute you. For what credit is it if you love those who love you? Do not even the Gentiles do the same?\n\nBut you shall love those who hate you, and you will not have an enemy.\n\nAbstain from fleshly and bodily cravings. If someone strikes you on the right cheek, turn the other also, and you will be perfect. If someone compels you to go one mile, go two. If someone takes your cloak, give him your tunic also. If someone takes what is yours, do not ask for it back.\n\nGive to everyone who asks of you, and do not ask for it back; for the Father wants gifts to be given to all from his own free gifts.\n\nAnd concerning baptism, baptize this way: having said all these things beforehand, baptize in the name of the Father and of the Son and of the Holy Spirit in running water.\n\nAnd do not let your fasts be with the hypocrites, for they fast on the second day of the week and on the fifth; but fast on the fourth day and on the day of preparation.\n\nNeither pray as the hypocrites do, but as the Lord commanded in his Gospel: Our Father who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done, as in heaven, so on earth. Give us today our daily bread, and forgive us our debt as we also forgive our debtors. And bring us not into temptation, but deliver us from the evil one; for thine is the power and the glory for ever.\n\nPray this three times each day.\n\nAnd on the Lord's day, gather together, break bread and give thanks, having beforehand confessed your transgressions, that your sacrifice may be pure. But let no one who is at odds with his fellow come together with you, until they be reconciled, that your sacrifice may not be profaned.\n\nWhoever comes and teaches you all these things that have been said before, receive him. But if the teacher himself turns and teaches another doctrine to the destruction of this, hear him not.\n\nWatch for your life's sake. Let not your lamps be quenched, nor your loins unloosed; but be ready, for you know not the hour in which our Lord comes.`,
  },
]

export default function LearnClient({ userId, teachings, latestResponse }: {
  userId: string
  teachings: Teaching[]
  latestResponse: Response | null
}) {
  const supabase = createClient()
  const [tab, setTab] = useState<'teaching' | 'catechism' | 'creeds'>('teaching')
  const [creedIndex, setCreedIndex] = useState(0)
  const [responseDraft, setResponseDraft] = useState(latestResponse?.body ?? '')
  const [response, setResponse] = useState<Response | null>(latestResponse)
  const [saving, setSaving] = useState(false)
  const [expandedCat, setExpandedCat] = useState<number | null>(null)

  const teaching = teachings[0] ?? null

  async function saveResponse() {
    if (!teaching || !responseDraft.trim()) return
    setSaving(true)
    if (response) {
      await supabase.from('responses').update({ body: responseDraft }).eq('id', response.id)
    } else {
      const { data } = await supabase
        .from('responses')
        .insert({ teaching_id: teaching.id, user_id: userId, body: responseDraft })
        .select().single()
      setResponse(data)
    }
    setSaving(false)
  }

  const creed = CREEDS[creedIndex]

  return (
    <div>
      <PageHeader title="Learn" subtitle="Teaching, catechism, and the creeds." glowColor="rgba(176,120,48,0.20)" />

      <div style={{ background: 'var(--paper)', borderRadius: '24px 24px 0 0', marginTop: '-20px', position: 'relative', zIndex: 1, padding: '1.5rem 1.125rem 2rem' }}>

        {/* iOS segmented control */}
        <div className="seg-control" style={{ marginBottom: '1.25rem' }}>
          {([['teaching', 'This Week'], ['catechism', 'Catechism'], ['creeds', 'Creeds']] as const).map(([key, label]) => (
            <button key={key} className={`seg-tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </div>

        {/* ── This week's teaching ── */}
        {tab === 'teaching' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!teaching ? (
              <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem' }}>
                <p style={{ color: 'var(--ink-muted)', fontSize: '14px' }}>Your leader hasn't posted this week's teaching yet. Check back soon.</p>
              </div>
            ) : (
              <>
                <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ height: '2px', background: 'var(--terracotta)' }} />
                  <div style={{ padding: '1.125rem 1.25rem' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.625rem' }}>
                      {teaching.week_label}
                    </p>
                    <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--ink)', marginBottom: '1rem' }}>{teaching.hook}</p>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--sage)' }} />
                      <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '17px', fontStyle: 'italic', lineHeight: 1.7 }}>{teaching.scripture_ref}</p>
                    </div>
                    {teaching.application && (
                      <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{teaching.application}</p>
                    )}
                  </div>
                </div>

                <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <div style={{ height: '2px', background: 'var(--sage)' }} />
                  <div style={{ padding: '1.125rem 1.25rem' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '0.625rem' }}>
                      This week's question
                    </p>
                    <p style={{ fontWeight: 600, fontSize: '15px', lineHeight: 1.55, color: 'var(--ink)', marginBottom: '1rem' }}>{teaching.question}</p>
                    <textarea
                      value={responseDraft}
                      onChange={e => setResponseDraft(e.target.value)}
                      rows={5}
                      placeholder="Write your response… your leader will see this."
                      style={{ width: '100%', borderRadius: '10px', padding: '12px', fontSize: '14px', resize: 'none', outline: 'none', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.6)', color: 'var(--ink)', fontFamily: 'inherit' }}
                    />
                    <button onClick={saveResponse} disabled={saving || !responseDraft.trim()} className="btn-primary" style={{ marginTop: '10px' }}>
                      {saving ? 'Saving…' : response ? 'Update response' : 'Share response'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Catechism ── */}
        {tab === 'catechism' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
                Westminster Shorter Catechism
              </p>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            {CATECHISM.map((item, i) => {
              const accent = ACCENTS[i % ACCENTS.length]
              const open = expandedCat === i
              return (
                <button
                  key={i}
                  onClick={() => setExpandedCat(open ? null : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '1rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', borderBottom: `1px solid var(--border-soft)`, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, background: accent + '20', color: accent, marginTop: '1px' }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.45, color: 'var(--ink)', paddingRight: '8px' }}>{item.q}</p>
                    {open && (
                      <div style={{ marginTop: '12px' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div style={{ width: '2px', flexShrink: 0, borderRadius: '2px', background: accent, alignSelf: 'stretch' }} />
                          <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '15px', lineHeight: 1.7 }}>{item.a}</p>
                        </div>
                        <p style={{ fontSize: '11px', fontWeight: 600, color: accent, marginTop: '10px', marginLeft: '14px' }}>
                          Westminster Shorter Catechism · {item.ref}
                        </p>
                      </div>
                    )}
                  </div>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--ink-muted)', flexShrink: 0, marginTop: '4px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              )
            })}
          </div>
        )}

        {/* ── Creeds ── */}
        {tab === 'creeds' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Creed selector */}
            <div className="seg-control">
              {CREEDS.map((c, i) => (
                <button key={i} className={`seg-tab${creedIndex === i ? ' active' : ''}`} onClick={() => setCreedIndex(i)}>
                  {c.shortTitle}
                </button>
              ))}
            </div>

            <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ height: '2px', background: 'var(--gold)' }} />
              <div style={{ padding: '1.125rem 1.25rem 0.25rem' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '4px' }}>{creed.title}</p>
                <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '1rem' }}>{creed.date}</p>
              </div>
              <div style={{ padding: '0 1.25rem 1.25rem' }}>
                {creed.text.split('\n\n').map((para, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: i === 0 ? 'var(--gold)' : 'var(--border)' }} />
                    <p className="font-reading" style={{ color: 'var(--ink)', fontSize: '16px', lineHeight: 1.72 }}>{para}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
