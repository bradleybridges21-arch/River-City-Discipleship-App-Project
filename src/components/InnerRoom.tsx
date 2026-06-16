'use client'

import { useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getDailyQuote } from '@/lib/quotes'
import { getDailyQuestion } from '@/lib/prayer-questions'

// ── Daily verse ───────────────────────────────────────────────
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
  return DAILY_VERSES[Math.floor(Date.now() / 86_400_000) % DAILY_VERSES.length]
}

// ── Types ─────────────────────────────────────────────────────
type EntryType = 'devo' | 'freewrite' | 'study' | 'prayer-list'

interface ScriptureBlock { type: 'scripture'; ref: string; text: string }
interface TextBlock { type: 'text'; html: string }
type Block = ScriptureBlock | TextBlock

interface PrayerItem { id: string; name: string; request: string }

interface RoomEntry {
  v: 2
  entryType?: EntryType
  title: string
  subject?: string
  date: string
  // devo
  prayer?: string
  reflection?: string
  // freewrite
  freeHtml?: string
  // study
  passageRef?: string
  passageText?: string
  observations?: string
  studyApplication?: string
  // prayer-list
  prayerItems?: PrayerItem[]
  // all types
  blocks?: Block[]
}

interface JournalRow { id: string; body: string; created_at: string }
interface Props { userId: string; initialEntries: JournalRow[] }

// ── Helpers ───────────────────────────────────────────────────
function parseEntry(row: JournalRow): RoomEntry | null {
  try {
    if (row.body.startsWith('{"v":2')) return JSON.parse(row.body) as RoomEntry
  } catch {}
  return null
}

const ENTRY_TYPES: { type: EntryType; label: string; description: string; color: string }[] = [
  { type: 'devo',        label: 'Daily Devo',   description: 'Prayer and reflection from your time with God',  color: 'var(--blue)'      },
  { type: 'study',       label: 'Study Notes',  description: 'Inductive study — passage, observations, application', color: 'var(--green)'     },
  { type: 'freewrite',   label: 'Free Write',   description: 'Open canvas — no structure, just you and God',   color: 'var(--gold)'      },
  { type: 'prayer-list', label: 'Prayer List',  description: 'Intercession — names and requests',              color: 'var(--mauve)'     },
]

function entryTypeLabel(type?: EntryType) {
  return ENTRY_TYPES.find(t => t.type === type)?.label ?? 'Devo'
}
function entryTypeColor(type?: EntryType) {
  return ENTRY_TYPES.find(t => t.type === type)?.color ?? 'var(--blue)'
}

// ── Styling atoms ─────────────────────────────────────────────
const toolBtn: React.CSSProperties = {
  padding: '4px 8px', borderRadius: '5px', fontSize: '12px', fontWeight: 700,
  border: '1px solid var(--border-soft)', background: 'rgba(255,255,255,0.7)',
  cursor: 'pointer', color: 'var(--ink)', display: 'flex', alignItems: 'center',
  justifyContent: 'center', minWidth: '28px', minHeight: '28px', fontFamily: 'inherit',
}

const TEXT_COLORS = [
  { label: 'Blue',   value: '#2d5a8e' },
  { label: 'Green',  value: '#1a4434' },
  { label: 'Mauve',  value: '#7a5882' },
  { label: 'Sienna', value: '#8a5a3a' },
  { label: 'Muted',  value: '#96969e' },
]
const HIGHLIGHTS = [
  { label: 'Blue',  value: '#dce8f7' },
  { label: 'Green', value: '#cce8da' },
  { label: 'Gold',  value: '#f0e4c4' },
  { label: 'Mauve', value: '#ecdff2' },
]

// ── Toolbar ───────────────────────────────────────────────────
function Toolbar({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  function exec(cmd: string, val?: string) {
    const el = targetRef.current; if (!el) return
    el.focus(); document.execCommand(cmd, false, val)
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '8px 0', borderBottom: '1px solid var(--border-soft)', marginBottom: '12px' }}>
      <button onClick={() => exec('bold')} style={toolBtn}><b>B</b></button>
      <button onClick={() => exec('italic')} style={{ ...toolBtn, fontStyle: 'italic' }}>I</button>
      <button onClick={() => exec('underline')} style={{ ...toolBtn, textDecoration: 'underline' }}>U</button>
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      <button onClick={() => exec('fontSize', '5')} style={{ ...toolBtn, fontSize: '16px' }}>A</button>
      <button onClick={() => exec('fontSize', '3')} style={toolBtn}>A</button>
      <button onClick={() => exec('fontSize', '2')} style={{ ...toolBtn, fontSize: '10px' }}>A</button>
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      {TEXT_COLORS.map(c => (
        <button key={c.value} onClick={() => exec('foreColor', c.value)} title={c.label}
          style={{ ...toolBtn, background: c.value + '22', color: c.value, border: `1px solid ${c.value}44` }}>A</button>
      ))}
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      {HIGHLIGHTS.map(h => (
        <button key={h.value} onClick={() => exec('backColor', h.value)} title={`Highlight ${h.label}`}
          style={{ ...toolBtn, background: h.value, border: '1px solid var(--border)' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-3.12 3.12-1.93-1.91-1.42 1.42 1.92 1.92L3 17.25V21h3.75l9.22-9.22 1.92 1.92 1.42-1.42-1.92-1.92 3.12-3.12a1 1 0 0 0 0-1.39z"/>
          </svg>
        </button>
      ))}
      <div style={{ width: '1px', background: 'var(--border-soft)', margin: '0 4px', alignSelf: 'stretch' }} />
      <button onClick={() => exec('insertUnorderedList')} style={toolBtn}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/>
          <circle cx="4" cy="6" r="1.5" fill="currentColor"/><circle cx="4" cy="12" r="1.5" fill="currentColor"/><circle cx="4" cy="18" r="1.5" fill="currentColor"/>
        </svg>
      </button>
    </div>
  )
}

// ── Scripture search ──────────────────────────────────────────
interface ScriptureResult { reference: string; text: string }

function ScriptureSearch({ onInsert, onClose }: {
  onInsert: (block: ScriptureBlock) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<ScriptureResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function lookup() {
    const ref = query.trim(); if (!ref) return
    setLoading(true); setError(''); setResult(null)
    try {
      const encoded = encodeURIComponent(ref)
      const res = await fetch(`https://bible-api.com/${encoded}`)
      if (!res.ok) throw new Error('Not found')
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      const text = (data.text as string).replace(/\n/g, ' ').trim()
      setResult({ reference: data.reference, text })
    } catch {
      setError('Reference not found. Try: John 3:16 or Romans 8:28')
    }
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'flex-end' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ width: '100%', background: 'var(--paper)', borderRadius: '20px 20px 0 0', padding: '1.25rem 1.25rem 2rem', boxShadow: '0 -4px 32px rgba(18,18,31,0.15)', maxHeight: '80vh', overflowY: 'auto' }}>
        <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: 'var(--border)', margin: '0 auto 1.25rem' }} />
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>Search Scripture</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && lookup()}
            placeholder="John 3:16 or Romans 8:28–39…"
            autoFocus
            style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', fontSize: '15px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', outline: 'none', fontFamily: 'Newsreader, Georgia, serif' }}
          />
          <button onClick={lookup} disabled={loading || !query.trim()} className="btn-primary" style={{ flexShrink: 0, padding: '10px 18px' }}>
            {loading ? '…' : 'Look up'}
          </button>
        </div>

        {error && <p style={{ fontSize: '13px', color: 'var(--terracotta)', marginBottom: '10px' }}>{error}</p>}

        {result && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '8px' }}>{result.reference}</p>
            <div style={{ display: 'flex', gap: '10px', background: 'rgba(59,110,168,0.06)', borderRadius: '10px', padding: '12px 14px', marginBottom: '1rem' }}>
              <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--blue)' }} />
              <p className="font-reading" style={{ fontSize: '16px', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--ink)' }}>{result.text}</p>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginBottom: '1rem' }}>World English Bible · You can retype in your preferred translation after inserting.</p>
            <button
              onClick={() => { onInsert({ type: 'scripture', ref: result!.reference, text: result!.text }); onClose() }}
              className="btn-primary" style={{ width: '100%' }}
            >
              Insert into entry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Drawing Canvas ────────────────────────────────────────────
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
    const scaleX = canvas.width / rect.width, scaleY = canvas.height / rect.height
    if ('touches' in e) {
      const t = e.touches[0]
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY }
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault(); drawing.current = true; lastPos.current = getPos(e)
  }
  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault(); if (!drawing.current) return
    const pos = getPos(e), ctx = canvasRef.current!.getContext('2d')!
    ctx.beginPath(); ctx.moveTo(lastPos.current!.x, lastPos.current!.y); ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = erasing ? 'rgba(255,255,255,1)' : penColor
    ctx.lineWidth = erasing ? penSize * 6 : penSize; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.globalCompositeOperation = erasing ? 'destination-out' : 'source-over'
    ctx.stroke(); lastPos.current = pos
  }
  function endDraw() { drawing.current = false; lastPos.current = null }
  function clearCanvas() { const c = canvasRef.current!; c.getContext('2d')!.clearRect(0, 0, c.width, c.height) }
  function exportCanvas() {
    const link = document.createElement('a'); link.download = 'drawing.png'
    link.href = canvasRef.current!.toDataURL(); link.click()
  }
  const PEN_COLORS = ['#18181f', '#3b6ea8', '#2d7055', '#7a5882', '#c06040', '#a07020', '#ffffff']

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(7,9,14,0.88)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'rgba(244,241,235,0.96)', borderBottom: '1px solid var(--border-soft)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Draw</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {PEN_COLORS.map(c => (
            <button key={c} onClick={() => { setPenColor(c); setErasing(false) }}
              style={{ width: '22px', height: '22px', borderRadius: '50%', background: c, border: penColor === c && !erasing ? '2px solid var(--blue)' : '1.5px solid var(--border)', cursor: 'pointer' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[2, 4, 8].map(s => (
            <button key={s} onClick={() => { setPenSize(s); setErasing(false) }}
              style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: penSize === s && !erasing ? 'var(--blue-light)' : 'rgba(255,255,255,0.7)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: s * 1.8, height: s * 1.8, borderRadius: '50%', background: 'var(--ink)' }} />
            </button>
          ))}
        </div>
        <button onClick={() => setErasing(e => !e)} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid var(--border)', background: erasing ? 'var(--blue)' : 'rgba(255,255,255,0.7)', color: erasing ? '#fff' : 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Erase</button>
        <button onClick={clearCanvas} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Clear</button>
        <button onClick={exportCanvas} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit' }}>Save PNG</button>
        <button onClick={onClose} style={{ marginLeft: 'auto', padding: '4px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, border: 'none', background: 'var(--ink)', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
      </div>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <canvas ref={canvasRef} width={1200} height={900}
          style={{ width: '100%', height: '100%', touchAction: 'none', cursor: erasing ? 'cell' : 'crosshair' }}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw} />
      </div>
    </div>
  )
}

// ── Block list (rendered below any entry type) ─────────────────
function BlockList({ blocks, onChange }: {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}) {
  const [activeTextToolbar, setActiveTextToolbar] = useState<number | null>(null)
  const textRefs = useRef<Record<number, HTMLDivElement | null>>({})

  function remove(i: number) { onChange(blocks.filter((_, idx) => idx !== i)) }

  function updateTextHtml(i: number, html: string) {
    const next = [...blocks]
    ;(next[i] as TextBlock).html = html
    onChange(next)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {blocks.map((block, i) => {
        if (block.type === 'scripture') {
          return (
            <div key={i} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', gap: '10px', background: 'rgba(59,110,168,0.06)', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--blue)' }} />
                <div style={{ flex: 1 }}>
                  <p className="font-reading" style={{ fontSize: '16px', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--ink)', marginBottom: '6px' }}>{block.text}</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--blue)' }}>{block.ref}</p>
                </div>
              </div>
              <button onClick={() => remove(i)} style={{ position: 'absolute', top: '6px', right: '6px', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(18,18,31,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-muted)' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          )
        }
        // text block
        const ref: React.RefCallback<HTMLDivElement> = (el) => { textRefs.current[i] = el }
        return (
          <div key={i} style={{ position: 'relative', borderBottom: '1px solid var(--border-soft)', paddingBottom: '8px' }}>
            {activeTextToolbar === i && (
              <Toolbar targetRef={{ current: textRefs.current[i] }} />
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Note</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setActiveTextToolbar(t => t === i ? null : i)} style={{ padding: '2px 7px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: activeTextToolbar === i ? 'var(--blue-light)' : 'transparent', color: activeTextToolbar === i ? 'var(--blue)' : 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Format</button>
                <button onClick={() => remove(i)} style={{ padding: '2px 7px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--terracotta)', cursor: 'pointer', fontFamily: 'inherit' }}>Remove</button>
              </div>
            </div>
            <div
              ref={ref}
              contentEditable suppressContentEditableWarning
              onFocus={() => setActiveTextToolbar(i)}
              onInput={e => updateTextHtml(i, (e.target as HTMLDivElement).innerHTML)}
              dangerouslySetInnerHTML={{ __html: block.html }}
              data-placeholder="Write a note…"
              className="font-reading inner-room-editor"
              style={{ minHeight: '60px', outline: 'none', fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ── Add block row ──────────────────────────────────────────────
function AddBlockRow({ onAddScripture, onAddText, onAddDrawing }: {
  onAddScripture: () => void
  onAddText: () => void
  onAddDrawing: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative', marginTop: '1.25rem' }}>
      <button onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: '10px', border: '1.5px dashed var(--border)', background: 'transparent', color: 'var(--ink-muted)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', width: '100%', justifyContent: 'center', transition: 'border-color 0.15s, color 0.15s' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, right: 0, background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: '0 4px 20px rgba(18,18,31,0.10)', overflow: 'hidden', zIndex: 50 }}>
          {[
            { label: 'Scripture', desc: 'Look up and insert a verse', color: 'var(--blue)', action: () => { onAddScripture(); setOpen(false) } },
            { label: 'Text note', desc: 'A freeform note or thought', color: 'var(--green)', action: () => { onAddText(); setOpen(false) } },
            { label: 'Drawing', desc: 'Open the canvas (saves separately)', color: 'var(--mauve)', action: () => { onAddDrawing(); setOpen(false) } },
          ].map(item => (
            <button key={item.label} onClick={item.action} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-soft)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{item.label}</p>
                <p style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Shared contentEditable section ────────────────────────────
function WritingSection({ label, color, placeholder, refEl, showToolbar, onToggleToolbar, onAddImage }: {
  label: string; color: string; placeholder: string
  refEl: React.RefObject<HTMLDivElement | null>
  showToolbar: boolean; onToggleToolbar: () => void; onAddImage: () => void
}) {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color }}>{label}</p>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={onToggleToolbar} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: showToolbar ? color + '18' : 'transparent', color: showToolbar ? color : 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Format</button>
          <button onClick={onAddImage} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Image</button>
        </div>
      </div>
      {showToolbar && <Toolbar targetRef={refEl} />}
      <div ref={refEl} contentEditable suppressContentEditableWarning
        data-placeholder={placeholder} className="font-reading inner-room-editor"
        style={{ minHeight: '120px', outline: 'none', fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--border-soft)' }}
      />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────
export default function InnerRoom({ userId, initialEntries }: Props) {
  const supabase = createClient()
  const [entries, setEntries] = useState<JournalRow[]>(initialEntries)
  const [mode, setMode] = useState<'new' | 'list'>('new')
  const [entryType, setEntryType] = useState<EntryType | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showDrawing, setShowDrawing] = useState(false)
  const [showScriptureSearch, setShowScriptureSearch] = useState(false)
  const [activeToolbar, setActiveToolbar] = useState<string | null>(null)
  const [viewingEntry, setViewingEntry] = useState<JournalRow | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])

  // Devo fields
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const prayerRef = useRef<HTMLDivElement>(null)
  const reflectionRef = useRef<HTMLDivElement>(null)

  // Free write
  const freeRef = useRef<HTMLDivElement>(null)

  // Study notes
  const [passageRef, setPassageRef] = useState('')
  const [passageText, setPassageText] = useState('')
  const [fetchingPassage, setFetchingPassage] = useState(false)
  const [passageError, setPassageError] = useState('')
  const observationsRef = useRef<HTMLDivElement>(null)
  const studyAppRef = useRef<HTMLDivElement>(null)

  // Prayer list
  const [prayerItems, setPrayerItems] = useState<PrayerItem[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemRequest, setNewItemRequest] = useState('')

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  const quote = getDailyQuote()
  const verse = getDailyVerse()
  const question = getDailyQuestion()

  function resetForm() {
    setTitle(''); setSubject(''); setPassageRef(''); setPassageText(''); setPassageError('')
    setBlocks([]); setPrayerItems([]); setNewItemName(''); setNewItemRequest('')
    if (prayerRef.current) prayerRef.current.innerHTML = ''
    if (reflectionRef.current) reflectionRef.current.innerHTML = ''
    if (freeRef.current) freeRef.current.innerHTML = ''
    if (observationsRef.current) observationsRef.current.innerHTML = ''
    if (studyAppRef.current) studyAppRef.current.innerHTML = ''
  }

  async function fetchPassage(ref: string) {
    if (!ref.trim()) return
    setFetchingPassage(true); setPassageError(''); setPassageText('')
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(ref.trim())}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPassageText((data.text as string).replace(/\n/g, ' ').trim())
      setPassageRef(data.reference)
    } catch { setPassageError('Passage not found. Try: Romans 8:28 or Psalm 23') }
    setFetchingPassage(false)
  }

  function addPrayerItem() {
    if (!newItemName.trim()) return
    setPrayerItems(prev => [...prev, { id: crypto.randomUUID(), name: newItemName.trim(), request: newItemRequest.trim() }])
    setNewItemName(''); setNewItemRequest('')
  }

  function addImage(targetRef: React.RefObject<HTMLDivElement | null>) {
    const input = document.createElement('input')
    input.type = 'file'; input.accept = 'image/*'
    input.onchange = () => {
      const file = input.files?.[0]; if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        if (!targetRef.current) return
        targetRef.current.focus()
        document.execCommand('insertHTML', false, `<img src="${reader.result}" style="max-width:100%;border-radius:8px;margin:8px 0;display:block;" />`)
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  function buildEntry(): RoomEntry {
    const base = { v: 2 as const, title: title || 'Untitled', date: today, entryType: entryType ?? 'devo', blocks }
    if (entryType === 'freewrite') return { ...base, freeHtml: freeRef.current?.innerHTML ?? '' }
    if (entryType === 'study') return { ...base, passageRef, passageText, observations: observationsRef.current?.innerHTML ?? '', studyApplication: studyAppRef.current?.innerHTML ?? '' }
    if (entryType === 'prayer-list') return { ...base, prayerItems }
    return { ...base, subject, prayer: prayerRef.current?.innerHTML ?? '', reflection: reflectionRef.current?.innerHTML ?? '' }
  }

  async function save() {
    const entry = buildEntry()
    setSaving(true)
    const { data } = await supabase.from('journal_entries').insert({ user_id: userId, body: JSON.stringify(entry) }).select().single()
    if (data) {
      setEntries(prev => [data, ...prev])
      resetForm()
      setSaved(true); setTimeout(() => setSaved(false), 2500)
    }
    setSaving(false)
  }

  function exportEntry() {
    const e = buildEntry()
    const strip = (html: string) => html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
    const lines: string[] = [e.title, e.date, '']
    if (e.entryType === 'devo') {
      if (e.subject) lines.push(`Subject: ${e.subject}`, '')
      if (e.prayer) lines.push('── Prayer ──', strip(e.prayer), '')
      if (e.reflection) lines.push('── Reflection ──', strip(e.reflection), '')
    } else if (e.entryType === 'study') {
      if (e.passageRef) lines.push(`Passage: ${e.passageRef}`, e.passageText ?? '', '')
      if (e.observations) lines.push('── Observations ──', strip(e.observations), '')
      if (e.studyApplication) lines.push('── Application ──', strip(e.studyApplication), '')
    } else if (e.entryType === 'freewrite') {
      if (e.freeHtml) lines.push(strip(e.freeHtml), '')
    } else if (e.entryType === 'prayer-list') {
      e.prayerItems?.forEach(p => lines.push(`${p.name}: ${p.request}`))
      lines.push('')
    }
    e.blocks?.forEach(b => {
      if (b.type === 'scripture') lines.push(`"${b.text}" — ${b.ref}`, '')
      else lines.push(strip(b.html), '')
    })
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url
    a.download = `${e.title.replace(/\s+/g, '-').toLowerCase()}.txt`; a.click()
    URL.revokeObjectURL(url)
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <div>
      {showDrawing && <DrawingCanvas onClose={() => setShowDrawing(false)} />}
      {showScriptureSearch && (
        <ScriptureSearch
          onInsert={block => setBlocks(prev => [...prev, block])}
          onClose={() => setShowScriptureSearch(false)}
        />
      )}

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
          <button key={m} onClick={() => { setMode(m); if (m === 'new') setEntryType(null) }}
            style={{ padding: '8px 18px', fontSize: '13px', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', color: mode === m ? 'var(--ink)' : 'var(--ink-muted)', borderBottom: mode === m ? '2px solid var(--ink)' : '2px solid transparent', marginBottom: '-2px', fontFamily: 'inherit', transition: 'all 0.15s' }}>
            {label} {m === 'list' ? `(${entries.length})` : ''}
          </button>
        ))}
      </div>

      {/* ── Write mode ── */}
      {mode === 'new' && (
        <div>
          {/* Entry type picker */}
          {!entryType && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '1rem' }}>What kind of entry?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ENTRY_TYPES.map(et => (
                  <button key={et.type} onClick={() => setEntryType(et.type)}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '1rem 1.125rem', borderRadius: '12px', border: '1.5px solid var(--border)', background: 'rgba(255,255,255,0.55)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'border-color 0.15s' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: et.color, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '2px' }}>{et.label}</p>
                      <p style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>{et.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Daily Devo ── */}
          {entryType === 'devo' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '6px', background: 'var(--blue-light)', color: 'var(--blue)' }}>Daily Devo</span>
                <button onClick={() => { setEntryType(null); resetForm() }} style={{ fontSize: '12px', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Change type</button>
              </div>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"
                style={{ width: '100%', fontSize: '24px', fontFamily: 'Newsreader, Georgia, serif', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', padding: '0 0 4px', borderBottom: '1px solid var(--border-soft)', marginBottom: '14px', letterSpacing: '-0.01em' }} />
              <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject or Scripture passage"
                style={{ width: '100%', fontSize: '13px', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink-soft)', padding: '0 0 14px', borderBottom: '1px solid var(--border-soft)', marginBottom: '1.5rem', fontFamily: 'inherit' }} />
              <WritingSection label="Prayer" color="var(--blue)" placeholder="Write your prayer…" refEl={prayerRef} showToolbar={activeToolbar === 'prayer'} onToggleToolbar={() => setActiveToolbar(t => t === 'prayer' ? null : 'prayer')} onAddImage={() => { setActiveToolbar('prayer'); addImage(prayerRef) }} />
              <WritingSection label="Reflection from Devo" color="var(--green)" placeholder="What is God stirring in you today?" refEl={reflectionRef} showToolbar={activeToolbar === 'reflection'} onToggleToolbar={() => setActiveToolbar(t => t === 'reflection' ? null : 'reflection')} onAddImage={() => { setActiveToolbar('reflection'); addImage(reflectionRef) }} />
              <BlockList blocks={blocks} onChange={setBlocks} />
              <AddBlockRow onAddScripture={() => setShowScriptureSearch(true)} onAddText={() => setBlocks(prev => [...prev, { type: 'text', html: '' }])} onAddDrawing={() => setShowDrawing(true)} />
            </div>
          )}

          {/* ── Study Notes ── */}
          {entryType === 'study' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '6px', background: 'var(--green-light)', color: 'var(--green)' }}>Study Notes</span>
                <button onClick={() => { setEntryType(null); resetForm() }} style={{ fontSize: '12px', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Change type</button>
              </div>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Study title"
                style={{ width: '100%', fontSize: '24px', fontFamily: 'Newsreader, Georgia, serif', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', padding: '0 0 4px', borderBottom: '1px solid var(--border-soft)', marginBottom: '1.5rem', letterSpacing: '-0.01em' }} />

              {/* Passage lookup */}
              <div style={{ marginBottom: '1.75rem' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '10px' }}>Passage</p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input value={passageRef} onChange={e => setPassageRef(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchPassage(passageRef)}
                    placeholder="John 15:1–11 or Psalm 23…"
                    style={{ flex: 1, padding: '9px 13px', borderRadius: '9px', fontSize: '14px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', outline: 'none', fontFamily: 'Newsreader, Georgia, serif' }} />
                  <button onClick={() => fetchPassage(passageRef)} disabled={fetchingPassage || !passageRef.trim()} style={{ padding: '9px 14px', borderRadius: '9px', fontSize: '13px', fontWeight: 600, border: 'none', background: 'var(--green)', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
                    {fetchingPassage ? '…' : 'Fetch'}
                  </button>
                </div>
                {passageError && <p style={{ fontSize: '12px', color: 'var(--terracotta)', marginBottom: '10px' }}>{passageError}</p>}
                {passageText && (
                  <div style={{ display: 'flex', gap: '10px', background: 'rgba(45,112,85,0.06)', borderRadius: '10px', padding: '12px 14px' }}>
                    <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--green)' }} />
                    <div>
                      <p className="font-reading" style={{ fontSize: '15px', lineHeight: 1.8, fontStyle: 'italic', color: 'var(--ink)', marginBottom: '6px' }}>{passageText}</p>
                      <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--green)' }}>{passageRef} · World English Bible</p>
                    </div>
                  </div>
                )}
              </div>

              <WritingSection label="Observations" color="var(--blue)" placeholder="What do you see in the text? (Who, what, where, when, how…)" refEl={observationsRef} showToolbar={activeToolbar === 'obs'} onToggleToolbar={() => setActiveToolbar(t => t === 'obs' ? null : 'obs')} onAddImage={() => { setActiveToolbar('obs'); addImage(observationsRef) }} />
              <WritingSection label="Application" color="var(--green)" placeholder="What is God saying to you through this today?" refEl={studyAppRef} showToolbar={activeToolbar === 'app'} onToggleToolbar={() => setActiveToolbar(t => t === 'app' ? null : 'app')} onAddImage={() => { setActiveToolbar('app'); addImage(studyAppRef) }} />
              <BlockList blocks={blocks} onChange={setBlocks} />
              <AddBlockRow onAddScripture={() => setShowScriptureSearch(true)} onAddText={() => setBlocks(prev => [...prev, { type: 'text', html: '' }])} onAddDrawing={() => setShowDrawing(true)} />
            </div>
          )}

          {/* ── Free Write ── */}
          {entryType === 'freewrite' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '6px', background: 'var(--gold-light)', color: 'var(--gold)' }}>Free Write</span>
                <button onClick={() => { setEntryType(null); resetForm() }} style={{ fontSize: '12px', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Change type</button>
              </div>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title"
                style={{ width: '100%', fontSize: '24px', fontFamily: 'Newsreader, Georgia, serif', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', padding: '0 0 4px', borderBottom: '1px solid var(--border-soft)', marginBottom: '1.5rem', letterSpacing: '-0.01em' }} />
              {activeToolbar === 'free' && <Toolbar targetRef={freeRef} />}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', marginBottom: '8px' }}>
                <button onClick={() => setActiveToolbar(t => t === 'free' ? null : 'free')} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: activeToolbar === 'free' ? 'var(--gold-light)' : 'transparent', color: activeToolbar === 'free' ? 'var(--gold)' : 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Format</button>
                <button onClick={() => addImage(freeRef)} style={{ padding: '3px 8px', fontSize: '11px', fontWeight: 600, borderRadius: '5px', border: '1px solid var(--border-soft)', background: 'transparent', color: 'var(--ink-muted)', cursor: 'pointer', fontFamily: 'inherit' }}>Image</button>
              </div>
              <div ref={freeRef} contentEditable suppressContentEditableWarning onFocus={() => setActiveToolbar('free')}
                data-placeholder="Write whatever is in you…" className="font-reading inner-room-editor"
                style={{ minHeight: '260px', outline: 'none', fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)', paddingBottom: '12px', borderBottom: '1px solid var(--border-soft)' }}
              />
              <BlockList blocks={blocks} onChange={setBlocks} />
              <AddBlockRow onAddScripture={() => setShowScriptureSearch(true)} onAddText={() => setBlocks(prev => [...prev, { type: 'text', html: '' }])} onAddDrawing={() => setShowDrawing(true)} />
            </div>
          )}

          {/* ── Prayer List ── */}
          {entryType === 'prayer-list' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', padding: '3px 9px', borderRadius: '6px', background: 'var(--mauve-light)', color: 'var(--mauve)' }}>Prayer List</span>
                <button onClick={() => { setEntryType(null); resetForm() }} style={{ fontSize: '12px', color: 'var(--ink-muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Change type</button>
              </div>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="List title"
                style={{ width: '100%', fontSize: '24px', fontFamily: 'Newsreader, Georgia, serif', fontWeight: 500, border: 'none', outline: 'none', background: 'transparent', color: 'var(--ink)', padding: '0 0 4px', borderBottom: '1px solid var(--border-soft)', marginBottom: '1.5rem', letterSpacing: '-0.01em' }} />

              {/* Add item */}
              <div style={{ background: 'rgba(122,88,130,0.05)', borderRadius: '10px', padding: '14px', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--mauve)', marginBottom: '10px' }}>Add person</p>
                <input value={newItemName} onChange={e => setNewItemName(e.target.value)} placeholder="Name"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', fontSize: '14px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit', marginBottom: '8px' }} />
                <textarea value={newItemRequest} onChange={e => setNewItemRequest(e.target.value)} placeholder="Prayer request (optional)" rows={2}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', fontSize: '14px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.7)', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit', resize: 'none', marginBottom: '10px' }} />
                <button onClick={addPrayerItem} disabled={!newItemName.trim()} style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: 'none', background: 'var(--mauve)', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>Add</button>
              </div>

              {/* Items */}
              {prayerItems.map((item, i) => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-soft)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--mauve)', marginTop: '7px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: item.request ? '3px' : 0 }}>{item.name}</p>
                    {item.request && <p style={{ fontSize: '13px', color: 'var(--ink-soft)', lineHeight: 1.55 }}>{item.request}</p>}
                  </div>
                  <button onClick={() => setPrayerItems(prev => prev.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-muted)', padding: '2px', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
              {prayerItems.length === 0 && <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>No one added yet.</p>}
              <BlockList blocks={blocks} onChange={setBlocks} />
              <AddBlockRow onAddScripture={() => setShowScriptureSearch(true)} onAddText={() => setBlocks(prev => [...prev, { type: 'text', html: '' }])} onAddDrawing={() => setShowDrawing(true)} />
            </div>
          )}

          {/* Save / export row — shown for all types once chosen */}
          {entryType && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '1.75rem' }}>
              <button onClick={save} disabled={saving} className="btn-primary">
                {saved ? 'Saved.' : saving ? 'Saving…' : 'Save'}
              </button>
              <button onClick={exportEntry} style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: '1px solid var(--border)', background: 'transparent', color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Entries list ── */}
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
                if (!parsed) return (
                  <div>
                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '12px' }}>{new Date(viewingEntry.created_at).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    <p className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }}>{viewingEntry.body}</p>
                  </div>
                )
                const type = parsed.entryType ?? 'devo'
                const color = entryTypeColor(type)
                return (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: '6px', background: color + '18', color }}>{entryTypeLabel(type)}</span>
                      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>{parsed.date}</p>
                    </div>
                    <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '26px', fontWeight: 500, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '4px' }}>{parsed.title}</h2>

                    {/* Devo */}
                    {type === 'devo' && (<>
                      {parsed.subject && <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>{parsed.subject}</p>}
                      {parsed.prayer && <div style={{ marginBottom: '1.5rem' }}><p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '8px' }}>Prayer</p><div className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: parsed.prayer }} /></div>}
                      {parsed.reflection && <div style={{ marginBottom: '1.5rem' }}><p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Reflection</p><div className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: parsed.reflection }} /></div>}
                    </>)}

                    {/* Study */}
                    {type === 'study' && (<>
                      {parsed.passageRef && (<div style={{ display: 'flex', gap: '10px', background: 'rgba(45,112,85,0.06)', borderRadius: '10px', padding: '12px 14px', marginBottom: '1.5rem' }}><div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--green)' }} /><div><p className="font-reading" style={{ fontSize: '15px', lineHeight: 1.8, fontStyle: 'italic', color: 'var(--ink)', marginBottom: '6px' }}>{parsed.passageText}</p><p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--green)' }}>{parsed.passageRef}</p></div></div>)}
                      {parsed.observations && <div style={{ marginBottom: '1.5rem' }}><p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: '8px' }}>Observations</p><div className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: parsed.observations }} /></div>}
                      {parsed.studyApplication && <div style={{ marginBottom: '1.5rem' }}><p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '8px' }}>Application</p><div className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: parsed.studyApplication }} /></div>}
                    </>)}

                    {/* Free write */}
                    {type === 'freewrite' && parsed.freeHtml && <div className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)', marginBottom: '1.5rem' }} dangerouslySetInnerHTML={{ __html: parsed.freeHtml }} />}

                    {/* Prayer list */}
                    {type === 'prayer-list' && parsed.prayerItems && (
                      <div style={{ marginBottom: '1.5rem' }}>
                        {parsed.prayerItems.map((item, i) => (
                          <div key={item.id ?? i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: '0.875rem', marginBottom: '0.875rem', borderBottom: '1px solid var(--border-soft)' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--mauve)', marginTop: '6px', flexShrink: 0 }} />
                            <div><p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.3, marginBottom: item.request ? '2px' : 0 }}>{item.name}</p>{item.request && <p style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{item.request}</p>}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Blocks */}
                    {parsed.blocks && parsed.blocks.length > 0 && (
                      <div style={{ marginTop: '1rem' }}>
                        {parsed.blocks.map((block, i) => block.type === 'scripture' ? (
                          <div key={i} style={{ display: 'flex', gap: '10px', background: 'rgba(59,110,168,0.06)', borderRadius: '10px', padding: '12px 14px', marginBottom: '1rem' }}>
                            <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', borderRadius: '2px', background: 'var(--blue)' }} />
                            <div><p className="font-reading" style={{ fontSize: '15px', lineHeight: 1.75, fontStyle: 'italic', color: 'var(--ink)', marginBottom: '6px' }}>{block.text}</p><p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--blue)' }}>{block.ref}</p></div>
                          </div>
                        ) : (
                          <div key={i} className="font-reading" style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--ink)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: block.html }} />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          ) : entries.length === 0 ? (
            <p style={{ color: 'var(--ink-muted)', fontSize: '14px', padding: '1rem 0' }}>No entries yet. Begin writing above.</p>
          ) : (
            entries.map(e => {
              const parsed = parseEntry(e)
              const type = parsed?.entryType ?? 'devo'
              const color = entryTypeColor(type)
              return (
                <button key={e.id} onClick={() => setViewingEntry(e)} style={{ width: '100%', textAlign: 'left', padding: '1rem 0', display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'none', border: 'none', borderBottom: '1px solid var(--border-soft)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, marginTop: '6px', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--ink)', lineHeight: 1.3, marginBottom: '3px' }}>{parsed ? parsed.title : 'Entry'}</p>
                    <p style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{entryTypeLabel(type)} · {parsed ? parsed.date : new Date(e.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border)', flexShrink: 0, marginTop: '4px' }}><path d="M9 18l6-6-6-6"/></svg>
                </button>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
