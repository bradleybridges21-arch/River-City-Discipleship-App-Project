'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

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
    <div className="px-5 pt-10">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>Learn</h1>
      <p className="text-sm mb-5" style={{ color: 'var(--ink-soft)' }}>Teaching, catechism, and the creeds.</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {([['teaching', 'This week'], ['catechism', 'Catechism'], ['creeds', 'Creeds']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            style={{
              backgroundColor: tab === key ? 'var(--terracotta)' : 'var(--surface)',
              color: tab === key ? '#fff' : 'var(--ink-soft)',
              border: '1px solid var(--border)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── This week's teaching ── */}
      {tab === 'teaching' && (
        <div className="flex flex-col gap-4">
          {!teaching ? (
            <div className="rounded-xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>Your leader hasn't posted this week's teaching yet. Check back soon.</p>
            </div>
          ) : (
            <>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
                {/* Gradient header */}
                <div className="px-5 pt-5 pb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--terracotta-light) 0%, var(--surface) 70%)' }}>
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: 'var(--terracotta)' }} />
                  <p className="text-xs font-semibold tracking-widest uppercase mb-3 pl-3" style={{ color: 'var(--terracotta)' }}>{teaching.week_label}</p>
                  <p className="text-base leading-relaxed pl-3" style={{ color: 'var(--ink)' }}>{teaching.hook}</p>
                </div>
                <div className="p-5">

                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-0.5 self-stretch rounded-lg flex-shrink-0 mt-1" style={{ backgroundColor: 'var(--sage)' }} />
                    <p className="font-reading italic leading-relaxed" style={{ color: 'var(--ink)', fontSize: '17px' }}>{teaching.scripture_ref}</p>
                  </div>

                  {teaching.application && (
                    <p className="text-sm leading-relaxed mt-4" style={{ color: 'var(--ink-soft)' }}>{teaching.application}</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="h-0.5 w-full" style={{ backgroundColor: 'var(--sage)' }} />
                <div className="p-5">
                  <p className="font-semibold mb-3 leading-snug" style={{ color: 'var(--ink)', fontSize: '16px' }}>{teaching.question}</p>
                  <textarea
                    value={responseDraft}
                    onChange={e => setResponseDraft(e.target.value)}
                    rows={5}
                    placeholder="Write your response… your leader will see this."
                    className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
                    style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
                  />
                  <button
                    onClick={saveResponse}
                    disabled={saving || !responseDraft.trim()}
                    className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold transition-opacity"
                    style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: saving || !responseDraft.trim() ? 0.5 : 1 }}
                  >
                    {saving ? 'Saving…' : response ? 'Update response' : 'Share response'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Catechism — accordion list ── */}
      {tab === 'catechism' && (
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--ink-soft)' }}>
              Westminster Shorter Catechism
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
          </div>

          <div className="flex flex-col gap-0">
            {CATECHISM.map((item, i) => {
              const accent = ACCENTS[i % ACCENTS.length]
              const open = expandedCat === i
              return (
                <div key={i}>
                  <button
                    onClick={() => setExpandedCat(open ? null : i)}
                    className="w-full text-left py-4 flex items-start gap-4"
                    style={{ borderBottom: `1px solid var(--border)` }}
                  >
                    {/* Colored number pill */}
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ backgroundColor: accent + '22', color: accent }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-snug pr-2" style={{ color: 'var(--ink)' }}>
                        {item.q}
                      </p>
                      {open && (
                        <div className="mt-3">
                          {/* Left accent line */}
                          <div className="flex gap-3">
                            <div className="w-0.5 flex-shrink-0 rounded-lg self-stretch" style={{ backgroundColor: accent }} />
                            <p className="font-reading leading-relaxed pb-1" style={{ color: 'var(--ink)', fontSize: '15px' }}>
                              {item.a}
                            </p>
                          </div>
                          <p className="text-xs mt-3 ml-3 font-medium" style={{ color: accent }}>
                            Westminster Shorter Catechism · {item.ref}
                          </p>
                        </div>
                      )}
                    </div>
                    <span className="flex-shrink-0 mt-0.5 transition-transform" style={{ color: 'var(--border)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Creeds ── */}
      {tab === 'creeds' && (
        <div className="flex flex-col gap-4">
          {/* Creed selector — pill toggle */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}>
            {CREEDS.map((c, i) => (
              <button
                key={i}
                onClick={() => setCreedIndex(i)}
                className="flex-1 py-3 text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: creedIndex === i ? 'var(--ink)' : 'transparent',
                  color: creedIndex === i ? '#fff' : 'var(--ink-soft)',
                }}
              >
                {c.shortTitle}
              </button>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <div className="px-5 py-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--gold-light) 0%, var(--surface) 70%)' }}>
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: 'var(--gold)' }} />
              <p className="text-xs font-semibold tracking-widest uppercase pl-3" style={{ color: 'var(--gold)' }}>{creed.title}</p>
              <p className="text-xs pl-3 mt-1" style={{ color: 'var(--ink-muted)' }}>{creed.date}</p>
            </div>
            <div className="p-5">
              {creed.text.split('\n\n').map((para, i) => (
                <div key={i} className="mb-4 flex gap-3 items-start">
                  <div className="w-0.5 flex-shrink-0 self-stretch rounded-lg" style={{ backgroundColor: i === 0 ? 'var(--gold)' : 'var(--border)' }} />
                  <p className="font-reading leading-relaxed" style={{ color: 'var(--ink)', fontSize: '16px' }}>
                    {para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
