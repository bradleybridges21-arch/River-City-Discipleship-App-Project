'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getDailyQuote } from '@/lib/quotes'
import { getDailyQuestion } from '@/lib/prayer-questions'

const DAILY_VERSES = [
  { ref: 'Psalm 46:10', text: 'Be still, and know that I am God.' },
  { ref: 'Matthew 11:28', text: 'Come to me, all who labor and are heavy laden, and I will give you rest.' },
  { ref: 'Isaiah 40:31', text: 'Those who wait for the Lord shall renew their strength.' },
  { ref: 'John 15:5', text: 'I am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit.' },
  { ref: 'Philippians 4:7', text: 'The peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.' },
  { ref: 'Romans 8:38–39', text: 'Neither death nor life… nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.' },
  { ref: 'Lamentations 3:22–23', text: 'The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.' },
  { ref: 'Psalm 23:1', text: 'The Lord is my shepherd; I shall not want.' },
  { ref: '2 Corinthians 5:17', text: 'If anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come.' },
  { ref: 'Hebrews 4:16', text: 'Let us then with confidence draw near to the throne of grace, that we may receive mercy and find grace to help in time of need.' },
  { ref: 'Psalm 139:23–24', text: 'Search me, O God, and know my heart! Try me and know my thoughts! And see if there be any grievous way in me, and lead me in the way everlasting!' },
  { ref: 'Romans 12:2', text: 'Do not be conformed to this world, but be transformed by the renewal of your mind.' },
  { ref: 'Philippians 3:8', text: 'I count everything as loss because of the surpassing worth of knowing Christ Jesus my Lord.' },
  { ref: '1 John 1:9', text: 'If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.' },
  { ref: 'Psalm 27:4', text: 'One thing have I asked of the Lord, that will I seek after: that I may dwell in the house of the Lord all the days of my life.' },
]

function getDailyVerse() {
  const dayIndex = Math.floor(Date.now() / 86_400_000)
  return DAILY_VERSES[dayIndex % DAILY_VERSES.length]
}

interface RoomEntry {
  v: 2
  title: string
  subject: string
  date: string
  prayer: string
  reflection: string
}

interface JournalRow { id: string; body: string; created_at: string }

interface Props {
  userId: string
  initialEntries: JournalRow[]
}

const TEXT_COLORS = [
  { label: 'Default', value: 'inherit' },
  { label: 'Blue', value: '#2d5a8e' },
  { label: 'Green', value: '#1a4434' },
  { label: 'Mauve', value: '#7a5882' },
  { label: 'Sienna', value: '#8a5a3a' },
  { label: 'Muted', value: '#96969e' },
]

const HIGHLIGHTS = [
  { label: 'None', value: 'transparent' },
  { label: 'Blue', value: '#dce8f7' },
  { label: 'Green', value: '#cce8da' },
  { label: 'Gold', value: '#f0e4c4' },
  { label: 'Mauve', value: '#ecdff2' },
]

function Toolbar({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  function exec(cmd: string, val?: string) {
    const el = targetRef.current
    if (!el) return
    el.focus()
    document.execCommand(cmd, false, val)
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '8px 0', borderBottom: '1px solid var(--border-soft)', marginBottom: '12px' }}>
      <button onClick={() => exec('bold')} title="Bold" style={toolBtn}>B</button>
      <button onClick={() => exec('italic')} title="Italic" style={{ ...toolBtn, fontStyle: 'italic' }}>I</button>
      <button onClick={() => exec('underline')} title="Underline" style={{ ...toolBtn, textDecoration: 'underline' }}>U</button>
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      <button onClick={() => exec('fontSize', '3')} title="Normal" style={toolBtn}>A</button>
      <button onClick={() => exec('fontSize', '5')} title="Large" style={{ ...toolBtn, fontSize: '16px' }}>A</button>
      <button onClick={() => exec('fontSize', '2')} title="Small" style={{ ...toolBtn, fontSize: '10px' }}>A</button>
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      {TEXT_COLORS.slice(1).map(c => (
        <button
          key={c.value}
          onClick={() => exec('foreColor', c.value)}
          title={c.label}
          style={{ ...toolBtn, background: c.value + '22', color: c.value, border: `1px solid ${c.value}44` }}
        >
          A
        </button>
      ))}
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      {HIGHLIGHTS.slice(1).map(h => (
        <button
          key={h.value}
          onClick={() => exec('backColor', h.value)}
          title={`Highlight ${h.label}`}
          style={{ ...toolBtn, background: h.value, border: '1px solid var(--border)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.42 1.42 1.92 1.92L3 17.25V21h3.75l9.22-9.22 1.92 1.92 1.42-1.42-1.92-1.92 3.12-3.12a1 1 0 0 0 0-1.39z"/></svg>
        </button>
      ))}
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      <button onClick={() => exec('insertUnorderedList')} title="List" style={toolBtn}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1.5" fill="currentColor"/><circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/></svg>
      </button>
    </div>
  )
}

const toolBtn: React.CSSProperties = {
  padding: '4px 8px',
  borderRadius: '5px',
  fontSize: '12px',
  fontWeight: 700,
  border: '1px solid var(--border-soft)',
  background: 'rgba(255,255,255,0.7)',
  cursor: 'pointer',
  color: 'var(--ink)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '28px',
  minHeight: '28px',
  fontFamily: 'inherit',
}

// ── Drawing Canvas ─────────────────────────────────────────
function DrawingCanvas({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)
  const [penColor, setPenColor] = useState('#18181f')
  const [penSize, setPenSize] = useState(3)
  const [erasing, setErasing] = useState(false)

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      const t = e.touches[0]
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY }
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    drawing.current = true
    lastPos.current = getPos(e)
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    if (!drawing.current) return
    const pos = getPos(e)
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.beginPath()
    ctx.moveTo(lastPos.current!.x, lastPos.current!.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = erasing ? 'rgba(255,255,255,1)' : penColor
    ctx.lineWidth = erasing ? penSize * 6 : penSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalCompositeOperation = erasing ? 'destination-out' : 'source-over'
    ctx.stroke()
    lastPos.current = pos
  }

  function endDraw() { drawing.current = false; lastPos.current = null }

  function clearCanvas() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function exportCanvas() {
    const canvas = canvasRef.current!
    const link = document.createElement('a')
    link.download = 'inner-room-drawing.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const PEN_COLORS = ['#18181f', '#3b6ea8', '#2d7055', '#7a5882', '#c06040', '#a07020', '#ffffff']

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(7,9,14,0.88)', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'rgba(244,241,235,0.96)', borderBottom: '1px solid var(--border-soft)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Draw</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {PEN_COLORS.map(c => (
            <button key={c} onClick={() => { setPenColor(c); setErasing(false) }} style={{ width: '22px', height: '22px', borderRadius: '50%', background: c, border: penColor === c && !erasing ? '2px solid var(--blue)' : '1.5px solid var(--border)', cursor: 'pointer' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[2, 4, 8].map(s => (
            <button key={s} onClick={() => { setPenSize(s); setErasing(false) }} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: penSize === s && !erasing ? 'var(--blue-light)' : 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: s * 1.8, height: s * 1.8, borderRadius: '50%', background: 'var(--ink)' }} />
            </button>
          ))}
        </div>
        <button onClick={() => setErasing(e => !e)} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid var(--border)', background: erasing ? 'var(--blue)' : 'rgba(255,255,255,0.7)', color: erasing ? '#fff' : 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Erase</button>
        <button onClick={clearCanvas} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
        <button onClick={exportCanvas} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Save PNG</button>
        <button onClick={onClose} style={{ marginLeft: 'auto', padding: '4px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, border: 'none', background: 'var(--ink)', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
      </div>
      {/* Canvas */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <canvas
          ref={canvasRef}
          width={1200}
          height={900}
          style={{ width: '100%', height: '100%', touchAction: 'none', cursor: erasing ? 'cell' : 'crosshair' }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function InnerRoom({ userId, initialEntries }: Props) {
  const supabase = createClient()
  const [entries, setEntries] = useState<JournalRow[]>(initialEntries)
  const [mode, setMode] = useState<'new' | 'list'>('new')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showDrawing, setShowDrawing] = useState(false)
  const [activeToolbar, setActiveToolbar] = useState<'prayer' | 'reflection' | null>(null)
  const [viewingEntry, setViewingEntry] = useState<JournalRow | null>(null)

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const prayerRef = useRef<HTMLDivElement>(null)
  const reflectionRef = useRef<HTMLDivElement>(null)

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const quote = getDailyQuote()
  const verse = getDailyVerse()
  const question = getDailyQuestion()

  function getContent() {
    return {
      v: 2 as const,
      title: title || 'Untitled',
      subject,
      date: today,
      prayer: prayerRef.current?.innerHTML ?? '',
      reflection: reflectionRef.current?.innerHTML ?? '',
    }
  }

  async function save() {
    const content = getContent()
    if (!content.prayer && !content.reflection && !content.title.match(/[a-zA-Z]/)) return
    setSaving(true)
    const body = JSON.stringify(content)
    const { data } = await supabase
      .from('journal_entries')
      .insert({ user_id: userId, body })
      .select()
      .single()
    if (data) {
      setEntries(prev => [data, ...prev])
      setTitle('')
      setSubject('')
      if (prayerRef.current) prayerRef.current.innerHTML = ''
      if (reflectionRef.current) reflectionRef.current.innerHTML = ''
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
    setSaving(false)
  }

  function exportEntry() {
    const content = getContent()
    const strip = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    const text = [
      content.title,
      content.date,
      content.subject ? `Subject: ${content.subject}` : '',
      '',
      '── Prayer ──',
      strip(content.prayer),
      '',
      '── Reflection ──',
      strip(content.reflection),
    ].filter(l => l !== undefined).join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${content.title.replace(/\s+/g, '-').toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  function addImage() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        const el = activeToolbar === 'reflection' ? reflectionRef.current : prayerRef.current
        if (!el) return
        el.focus()
        document.execCommand('insertHTML', false, `<img src="${reader.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;" />`)
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  function parseEntry(row: JournalRow): RoomEntry | null {
    try {
      if (row.body.startsWith('{"v":2')) return JSON.parse(row.body) as RoomEntry
    } catch {}
    return null
  }

  return (
    <div>
      {showDrawing && <DrawingCanvas onClose={() => setShowDrawing(false)} />}

      {/* Daily verse + quote */}
      <div style={{ padding: '0 0 1.5rem' }}>
        <div style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '8px' }}>Today · {today}</p>
          <p className="font-reading" style={{ fontSize: '18px', fontStyle: 'italic', lineHeight: 1.7, color: 'var(--ink)' }}>&ldquo;{verse.text}&rdquo;</p>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--blue)', marginTop: '6px' }}>{verse.ref}</p>
        </div>
        <div>
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '6px' }}>A word for today</p>
          <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink-soft)', fontStyle: 'italic' }}>&ldquo;{quote.text}&rdquo;</p>
          <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '4px' }}>— {quote.author}</p>
        </div>
      </div>

      {/* Question of the day */}
      <div style={{ borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)', padding: '1.25rem 0', marginBottom: '1.75rem' }}>
        <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '8px' }}>Today&rsquo;s question</p>
        <p className="font-reading" style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--ink)', fontStyle: 'italic', marginBottom: '8px' }}>&ldquo;{question.question}&rdquo;</p>
        <p style={{ fontSize: '12px', color: 'var(--ink-muted)', lineHeight: 1.55 }}>{question.context}</p>
        <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--mauve)', marginTop: '6px' }}>{question.source}</p>
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '2px solid var(--border-soft)' }}>
        {([['new', 'Write'] as const, ['list', 'Entries'] as const]).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)} style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', color: mode === m ? 'var(--ink)' : 'var(--ink-muted)', borderBottom: mode === m ? '2px solid var(--ink)' : '2px solid transparent', marginBottom: '-2px', fontFamily: 'inherit', transition: 'all 0.15s' }}>
            {label} {m === 'list' ? `(${entries.length})` : ''}
          </button>
        ))}
      </div>

      {/* ── New entry ── */}
      {mode === 'new' && (
        <div>
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            style={{ width: '100%', fontSize: '24px', fontFamily: 'Newsreader, Georgia, serif', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', padding: '0 0 4px', borderBottom: '1px solid var(--border-soft)', marginBottom: '14px', letterSpacing: '-0.01em' }}
          />

          {/* Subject */}
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject or Scripture passage"
            style={{ width: '100%', fontSize: '13px', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink-soft)', padding: '0 0 14px', borderBottom: '1px solid var(--border-soft)', marginBottom: '1.5rem', fontFamily: 'inherit' }}
          />

          {/* Prayer section */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--blue)' }}>Prayer</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setActiveToolbar(t => t === 'prayer' ? null : 'prayer')} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: activeToolbar === 'prayer' ? 'var(--blue-light)' : 'transparent', color: activeToolbar === 'prayer' ? 'var(--blue)' : 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Format</button>
                <button onClick={() => { setActiveToolbar('prayer'); addImage() }} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Image</button>
              </div>
            </div>
            {activeToolbar === 'prayer' && <Toolbar targetRef={prayerRef} />}
            <div
              ref={prayerRef}
              contentEditable
              suppressContentEditableWarning
              onFocus={() => setActiveToolbar('prayer')}
              data-placeholder="Write your prayer…"
              className="font-reading inner-room-editor"
              style={{ minHeight: '120px', outline: 'none', fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--border-soft)' }}
            />
          </div>

          {/* Reflection section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--green)' }}>Reflection from Devo</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setActiveToolbar(t => t === 'reflection' ? null : 'reflection')} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: activeToolbar === 'reflection' ? 'var(--green-light)' : 'transparent', color: activeToolbar === 'reflection' ? 'var(--green)' : 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Format</button>
                <button onClick={() => { setActiveToolbar('reflection'); addImage() }} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Image</button>
              </div>
            </div>
            {activeToolbar === 'reflection' && <Toolbar targetRef={reflectionRef} />}
            <div
              ref={reflectionRef}
              contentEditable
              suppressContentEditableWarning
              onFocus={() => setActiveToolbar('reflection')}
              data-placeholder="What is God stirring in you today?"
              className="font-reading inner-room-editor"
              style={{ minHeight: '100px', outline: 'none', fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--border-soft)' }}
            />
          </div>

          {/* Action row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={save} disabled={saving} className="btn-primary">
              {saved ? 'Saved.' : saving ? 'Saving…' : 'Save to Inner Room'}
            </button>
            <button onClick={exportEntry} style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: '1px solid var(--border)', background: 'transparent', color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export
            </button>
            <button onClick={() => setShowDrawing(true)} style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: '1px solid var(--border)', background: 'transparent', color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
              Draw
            </button>
          </div>
        </div>
      )}

      {/* ── Entry list ── */}
      {mode === 'list' && (
        <div>
          {viewingEntry ? (
            <div>
              <button onClick={() => setViewingEntry(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 1.5rem', fontFamily: 'inherit' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                All entries
              </button>
              {(() => {
                const parsed = parseEntry(viewingEntry)
                if (parsed) {
                  return (
                    <div>
                      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '6px' }}>{parsed.date}</p>
                      <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '26px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '4px' }}>{parsed.title}</h2>
                      {parsed.subject && <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>{parsed.subject}</p>}
                      {parsed.prayer && (
                        <div style={{ marginBottom: '1.5rem' }}>
                          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '8px' }}>Prayer</p>
                          <div className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: parsed.prayer }} />
                        </div>
                      )}
                      {parsed.reflection && (
                        <div>
                          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Reflection</p>
                          <div className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: parsed.reflection }} />
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <div>
                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '12px' }}>{new Date(viewingEntry.created_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }}>{viewingEntry.body}</p>
                  </div>
                )
              })()}
            </div>
          ) : entries.length === 0 ? (
            <p style={{ color: 'var(--ink-muted)', fontSize: '14px', padding: '1rem 0' }}>No entries yet. Begin writing above.</p>
          ) : (
            entries.map(e => {
              const parsed = parseEntry(e)
              return (
                <button
                  key={e.id}
                  onClick={() => setViewingEntry(e)}
                  style={{ width: '100%', textAlign: 'left', padding: '1rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-soft)', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--ink)', lineHeight: 1.3, marginBottom: '3px' }}>
                      {parsed ? parsed.title : 'Entry'}
                    </p>
                    {parsed?.subject && <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '4px' }}>{parsed.subject}</p>}
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>
                      {parsed ? parsed.date : new Date(e.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border)', flexShrink: 0, marginTop: '4px' }}>
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
