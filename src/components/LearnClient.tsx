'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Teaching {
  id: string; week_label: string; hook: string
  scripture_ref: string; application: string; question: string
}
interface Response { id: string; body: string }

const CATECHISM = [
  { q: 'What is the chief end of man?', a: 'Man\'s chief end is to glorify God, and to enjoy him forever.', ref: 'Westminster Shorter Catechism, Q.1' },
  { q: 'What is God?', a: 'God is a Spirit, infinite, eternal, and unchangeable, in his being, wisdom, power, holiness, justice, goodness, and truth.', ref: 'Westminster Shorter Catechism, Q.4' },
  { q: 'Are there more Gods than one?', a: 'There is but one only, the living and true God.', ref: 'Westminster Shorter Catechism, Q.5' },
  { q: 'How many persons are there in the Godhead?', a: 'There are three persons in the Godhead: the Father, the Son, and the Holy Ghost; and these three are one God, the same in substance, equal in power and glory.', ref: 'Westminster Shorter Catechism, Q.6' },
  { q: 'What are the decrees of God?', a: 'The decrees of God are, his eternal purpose, according to the counsel of his will, whereby, for his own glory, he hath foreordained whatsoever comes to pass.', ref: 'Westminster Shorter Catechism, Q.7' },
  { q: 'What is the work of creation?', a: 'The work of creation is, God\'s making all things of nothing, by the word of his power, in the space of six days, and all very good.', ref: 'Westminster Shorter Catechism, Q.9' },
  { q: 'What is sin?', a: 'Sin is any want of conformity unto, or transgression of, the law of God.', ref: 'Westminster Shorter Catechism, Q.14' },
  { q: 'Who is the Redeemer of God\'s elect?', a: 'The only Redeemer of God\'s elect is the Lord Jesus Christ, who, being the eternal Son of God, became man, and so was, and continueth to be, God and man in two distinct natures, and one person, forever.', ref: 'Westminster Shorter Catechism, Q.21' },
  { q: 'What is faith in Jesus Christ?', a: 'Faith in Jesus Christ is a saving grace, whereby we receive and rest upon him alone for salvation, as he is offered to us in the gospel.', ref: 'Westminster Shorter Catechism, Q.86' },
  { q: 'What is repentance unto life?', a: 'Repentance unto life is a saving grace, whereby a sinner, out of a true sense of his sin, and apprehension of the mercy of God in Christ, doth, with grief and hatred of his sin, turn from it unto God, with full purpose of, and endeavor after, new obedience.', ref: 'Westminster Shorter Catechism, Q.87' },
]

const CREEDS = [
  {
    title: 'Apostles\' Creed',
    text: `I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead.\n\nI believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,
  },
  {
    title: 'Nicene Creed',
    text: `We believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.\n\nAnd in one Lord Jesus Christ, the only-begotten Son of God, begotten of the Father before all worlds; God of God, Light of Light, very God of very God; begotten, not made, being of one substance with the Father, by whom all things were made.\n\nWho, for us men and for our salvation, came down from heaven, and was incarnate by the Holy Spirit of the virgin Mary, and was made man; and was crucified also for us under Pontius Pilate; He suffered and was buried; and the third day He rose again, according to the Scriptures; and ascended into heaven, and sits on the right hand of the Father; and He shall come again, with glory, to judge the quick and the dead; whose kingdom shall have no end.\n\nAnd we believe in the Holy Ghost, the Lord and Giver of Life; who proceeds from the Father and the Son; who with the Father and the Son together is worshipped and glorified; who spoke by the prophets.\n\nAnd we believe in one holy catholic and apostolic Church. We acknowledge one baptism for the remission of sins. And we look for the resurrection of the dead, and the life of the world to come. Amen.`,
  },
]

export default function LearnClient({ userId, teachings, latestResponse }: {
  userId: string
  teachings: Teaching[]
  latestResponse: Response | null
}) {
  const supabase = createClient()
  const [tab, setTab] = useState<'teaching' | 'catechism' | 'creeds'>('teaching')
  const [catechismIndex, setCatechismIndex] = useState(0)
  const [creedIndex, setCreedIndex] = useState(0)
  const [responseDraft, setResponseDraft] = useState(latestResponse?.body ?? '')
  const [response, setResponse] = useState<Response | null>(latestResponse)
  const [saving, setSaving] = useState(false)

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

  const catQ = CATECHISM[catechismIndex]
  const creed = CREEDS[creedIndex]

  return (
    <div className="px-5 pt-10">
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>Learn</h1>
      <p className="text-sm mb-5" style={{ color: 'var(--ink-soft)' }}>Teaching, catechism, and the creeds.</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {([['teaching', 'This week'], ['catechism', 'Catechism'], ['creeds', 'Creeds']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className="px-4 py-2 rounded-full text-sm font-semibold"
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

      {/* Teaching */}
      {tab === 'teaching' && (
        <div className="flex flex-col gap-4">
          {!teaching ? (
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>Your leader hasn't posted this week's teaching yet. Check back soon.</p>
            </div>
          ) : (
            <>
              <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>{teaching.week_label}</p>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--ink)' }}>{teaching.hook}</p>
                <p className="font-reading italic leading-relaxed mb-1" style={{ color: 'var(--ink)', fontSize: '16px' }}>{teaching.scripture_ref}</p>
                {teaching.application && (
                  <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--ink-soft)' }}>{teaching.application}</p>
                )}
              </div>
              <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="font-semibold mb-3" style={{ color: 'var(--ink)', fontSize: '15px' }}>{teaching.question}</p>
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
                  className="mt-3 px-5 py-2 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: saving || !responseDraft.trim() ? 0.5 : 1 }}
                >
                  {saving ? 'Saving…' : response ? 'Update response' : 'Share response'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Catechism */}
      {tab === 'catechism' && (
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>
              Question {catechismIndex + 1} of {CATECHISM.length}
            </p>
            <p className="font-semibold leading-relaxed mb-4" style={{ color: 'var(--ink)', fontSize: '16px' }}>
              {catQ.q}
            </p>
            <p className="font-reading leading-relaxed mb-3" style={{ color: 'var(--ink)', fontSize: '16px' }}>
              {catQ.a}
            </p>
            <p className="text-xs font-medium" style={{ color: 'var(--ink-soft)' }}>{catQ.ref}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCatechismIndex(i => Math.max(0, i - 1))}
              disabled={catechismIndex === 0}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold"
              style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--ink-soft)', opacity: catechismIndex === 0 ? 0.4 : 1 }}
            >
              ← Previous
            </button>
            <button
              onClick={() => setCatechismIndex(i => Math.min(CATECHISM.length - 1, i + 1))}
              disabled={catechismIndex === CATECHISM.length - 1}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold"
              style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: catechismIndex === CATECHISM.length - 1 ? 0.4 : 1 }}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Creeds */}
      {tab === 'creeds' && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 mb-1">
            {CREEDS.map((c, i) => (
              <button
                key={i}
                onClick={() => setCreedIndex(i)}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: creedIndex === i ? 'var(--ink)' : 'var(--surface)',
                  color: creedIndex === i ? '#fff' : 'var(--ink-soft)',
                  border: '1px solid var(--border)',
                }}
              >
                {c.title.split('\'')[0].trim()}
              </button>
            ))}
          </div>
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--sage)' }}>{creed.title}</p>
            {creed.text.split('\n\n').map((para, i) => (
              <p key={i} className="font-reading leading-relaxed mb-3" style={{ color: 'var(--ink)', fontSize: '16px' }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
