'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TEACHING_LIBRARY, THEMES, type LibraryTeaching } from '@/lib/teaching-library'
import PageHeader from '@/components/PageHeader'

interface Group { id: string; name: string; created_at: string }
interface Teaching { id: string; week_label: string; question: string; group_id: string; created_at: string }
interface Membership { group_id: string; role: string; profiles: { id: string; full_name: string } }
interface Response { id: string; body: string; created_at: string; profiles: { full_name: string } }

interface Props {
  userId: string
  groups: Group[]
  teachings: Teaching[]
  memberships: Membership[]
  latestTeaching: Teaching | null
  responses: Response[]
}

type Tab = 'overview' | 'groups' | 'teaching' | 'responses'

export default function AdminClient({ userId, groups: initialGroups, teachings: initialTeachings, memberships, latestTeaching, responses }: Props) {
  const supabase = createClient()

  const [tab, setTab] = useState<Tab>('overview')
  const [groups, setGroups] = useState(initialGroups)
  const [teachings, setTeachings] = useState(initialTeachings)

  // Group creation
  const [newGroupName, setNewGroupName] = useState('')
  const [creatingGroup, setCreatingGroup] = useState(false)
  const [groupCreated, setGroupCreated] = useState('')
  const [groupError, setGroupError] = useState('')

  // Member invite
  const [selectedGroupId, setSelectedGroupId] = useState(initialGroups[0]?.id ?? '')
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'member' | 'leader'>('member')
  const [inviting, setInviting] = useState(false)
  const [inviteMsg, setInviteMsg] = useState('')

  // Teaching post
  const [teachingGroupId, setTeachingGroupId] = useState(initialGroups[0]?.id ?? '')
  const [weekLabel, setWeekLabel] = useState('')
  const [hook, setHook] = useState('')
  const [scriptureRef, setScriptureRef] = useState('')
  const [application, setApplication] = useState('')
  const [question, setQuestion] = useState('')
  const [postingTeaching, setPostingTeaching] = useState(false)
  const [teachingPosted, setTeachingPosted] = useState(false)

  // Teaching library
  const [libraryTheme, setLibraryTheme] = useState('All')
  const [selectedLibraryId, setSelectedLibraryId] = useState('')

  function loadLibraryTeaching(t: LibraryTeaching) {
    setSelectedLibraryId(t.id)
    setWeekLabel(t.week_label)
    setHook(t.hook)
    setScriptureRef(t.scripture_ref)
    setApplication(t.application)
    setQuestion(t.question)
    // Scroll to form
    setTimeout(() => {
      document.getElementById('teaching-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  async function createGroup() {
    if (!newGroupName.trim()) return
    setCreatingGroup(true)
    setGroupError('')
    setGroupCreated('')

    // Ensure profile row exists (may be missing if user signed up before trigger was added)
    await supabase.from('profiles').upsert({ id: userId }, { onConflict: 'id' })

    const { data, error } = await supabase
      .from('groups')
      .insert({ name: newGroupName.trim(), leader_id: userId })
      .select()
      .single()

    if (error) {
      setGroupError(error.message)
      setCreatingGroup(false)
      return
    }

    if (data) {
      // Auto-add leader as a member with leader role
      await supabase.from('memberships').insert({
        group_id: data.id,
        user_id: userId,
        role: 'leader',
      })
      setGroups(prev => [data, ...prev])
      setGroupCreated(data.name)
      setNewGroupName('')
      if (!selectedGroupId) setSelectedGroupId(data.id)
      if (!teachingGroupId) setTeachingGroupId(data.id)
    }
    setCreatingGroup(false)
  }

  async function inviteMember() {
    if (!inviteEmail.trim() || !selectedGroupId) return
    setInviting(true)
    setInviteMsg('')

    // Members must sign up first — we look them up by matching their email
    // via a server action or by asking them to share their user ID.
    // For now: direct the leader to share the sign-up link, then add by name.
    setInviteMsg(`Ask ${inviteEmail} to sign up at the app URL first. Once they've created an account, refresh this page and their name will appear in the members list so you can confirm they joined.`)
    setInviting(false)
  }

  async function postTeaching() {
    if (!hook.trim() || !scriptureRef.trim() || !question.trim() || !weekLabel.trim()) return
    setPostingTeaching(true)
    const { data } = await supabase
      .from('teachings')
      .insert({
        group_id: teachingGroupId || null,
        week_label: weekLabel.trim(),
        hook: hook.trim(),
        scripture_ref: scriptureRef.trim(),
        application: application.trim(),
        question: question.trim(),
      })
      .select()
      .single()
    if (data) {
      setTeachings(prev => [data, ...prev])
      setTeachingPosted(true)
      setWeekLabel(''); setHook(''); setScriptureRef(''); setApplication(''); setQuestion('')
      setTimeout(() => setTeachingPosted(false), 3000)
    }
    setPostingTeaching(false)
  }

  const membersByGroup = (groupId: string) =>
    memberships.filter(m => m.group_id === groupId)

  const inputStyle = { width: '100%', borderRadius: '10px', padding: '12px', fontSize: '14px', outline: 'none', border: '1px solid rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.6)', color: 'var(--ink)', fontFamily: 'inherit' }

  const field = (label: string, value: string, onChange: (v: string) => void, opts?: { multiline?: boolean; placeholder?: string }) => (
    <div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginBottom: '6px' }}>{label}</label>
      {opts?.multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={opts.placeholder} style={{ ...inputStyle, resize: 'none' }} />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={opts?.placeholder} style={inputStyle} />
      )}
    </div>
  )

  const card = (children: React.ReactNode, accent?: string) => (
    <div className="glass" style={{ borderRadius: '16px', overflow: 'hidden' }}>
      {accent && <div style={{ height: '2px', background: accent }} />}
      <div style={{ padding: '1.125rem' }}>{children}</div>
    </div>
  )

  return (
    <div>
      <PageHeader label="Leader" title="Admin" subtitle="Manage your groups, teachings, and members." glowColor="rgba(184,92,58,0.22)" />

      <div style={{ background: 'var(--paper)', borderRadius: '24px 24px 0 0', marginTop: '-20px', position: 'relative', zIndex: 1, padding: '1.5rem 1.125rem 2rem' }}>

        {/* iOS segmented control */}
        <div className="seg-control" style={{ marginBottom: '1.25rem' }}>
          {([['overview', 'Overview'], ['groups', 'Groups'], ['teaching', 'Teaching'], ['responses', 'Responses']] as const).map(([key, label]) => (
            <button key={key} className={`seg-tab${tab === key ? ' active' : ''}`} onClick={() => setTab(key)}>{label}</button>
          ))}
        </div>

        {/* ── Overview ── */}
        {tab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { n: groups.length, label: groups.length === 1 ? 'Group' : 'Groups', color: 'var(--terracotta)' },
                { n: memberships.length, label: 'Members', color: 'var(--sage)' },
                { n: teachings.length, label: 'Teachings', color: 'var(--slate)' },
                { n: responses.length, label: 'Responses', color: 'var(--gold)' },
              ].map(({ n, label, color }) => (
                <div key={label} className="glass" style={{ borderRadius: '16px', padding: '1rem' }}>
                  <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: '2.25rem', fontWeight: 500, color, lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-muted)', marginTop: '4px' }}>{label}</p>
                </div>
              ))}
            </div>

            {latestTeaching && card(
              <>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '6px' }}>Latest teaching</p>
                <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{latestTeaching.week_label}</p>
                <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '4px' }}>{latestTeaching.question}</p>
                <p style={{ fontSize: '12px', color: 'var(--sage)', fontWeight: 600, marginTop: '8px' }}>{responses.length} response{responses.length !== 1 ? 's' : ''} so far</p>
              </>, 'var(--sage)'
            )}

            <button onClick={() => setTab('teaching')} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Post this week's teaching
            </button>
          </div>
        )}

        {/* ── Groups ── */}
        {tab === 'groups' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {card(
              <>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '10px' }}>Create a group</p>
                <input type="text" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} placeholder="e.g. River City Men's Group" style={{ ...inputStyle, marginBottom: '10px' }} />
                {groupCreated && <p style={{ fontSize: '12px', color: 'var(--sage)', marginBottom: '8px' }}>"{groupCreated}" created.</p>}
                {groupError && <p style={{ fontSize: '12px', color: 'var(--terracotta)', marginBottom: '8px' }}>{groupError}</p>}
                <button onClick={createGroup} disabled={creatingGroup || !newGroupName.trim()} className="btn-primary" style={{ opacity: creatingGroup || !newGroupName.trim() ? 0.45 : 1 }}>
                  {creatingGroup ? 'Creating…' : 'Create group'}
                </button>
              </>, 'var(--terracotta)'
            )}

            {groups.length > 0 && card(
              <>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '12px' }}>Add a member</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--ink-muted)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Group</label>
                    <select value={selectedGroupId} onChange={e => setSelectedGroupId(e.target.value)} style={inputStyle}>
                      {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--ink-muted)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Member's email</label>
                    <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="their@email.com" style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(['member', 'leader'] as const).map(r => (
                      <button key={r} onClick={() => setInviteRole(r)} style={{ flex: 1, padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, background: inviteRole === r ? 'var(--ink)' : 'rgba(255,255,255,0.6)', color: inviteRole === r ? '#fff' : 'var(--ink-muted)', border: inviteRole === r ? 'none' : '1px solid rgba(255,255,255,0.8)', cursor: 'pointer' }}>
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>
                  {inviteMsg && <p style={{ fontSize: '12px', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{inviteMsg}</p>}
                  <button onClick={inviteMember} disabled={inviting || !inviteEmail.trim()} className="btn-primary" style={{ background: 'var(--sage)', boxShadow: '0 2px 8px rgba(92,122,96,0.30)', opacity: inviting || !inviteEmail.trim() ? 0.45 : 1 }}>
                    {inviting ? 'Adding…' : 'Add to group'}
                  </button>
                </div>
              </>, 'var(--sage)'
            )}

            {groups.map(g => card(
              <>
                <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--ink)', marginBottom: '10px' }}>{g.name}</p>
                {membersByGroup(g.id).length === 0 ? (
                  <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>No members yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {membersByGroup(g.id).map((m, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '9px', flexShrink: 0, background: m.role === 'leader' ? 'var(--terracotta)' : 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '13px' }}>
                          {(m.profiles?.full_name ?? '?')[0]}
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>{m.profiles?.full_name ?? 'Member'}</p>
                          <p style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        )}

        {/* ── Teaching ── */}
        {tab === 'teaching' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {groups.length === 0 ? (
              card(<p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>Create a group first before posting a teaching.</p>)
            ) : (
              <>
                {/* Teaching library */}
                {card(
                  <>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '8px' }}>Teaching library</p>
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '12px' }}>Choose a teaching to post, or edit the form below.</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {['All', ...THEMES].map(theme => (
                        <button key={theme} onClick={() => setLibraryTheme(theme)} style={{ padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, background: libraryTheme === theme ? 'var(--ink)' : 'rgba(255,255,255,0.6)', color: libraryTheme === theme ? '#fff' : 'var(--ink-muted)', border: libraryTheme === theme ? 'none' : '1px solid rgba(255,255,255,0.8)', cursor: 'pointer' }}>
                          {theme}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {TEACHING_LIBRARY.filter(t => libraryTheme === 'All' || t.theme === libraryTheme).map(t => (
                        <div key={t.id} style={{ padding: '12px', borderRadius: '12px', background: selectedLibraryId === t.id ? 'rgba(184,92,58,0.08)' : 'rgba(255,255,255,0.5)', border: selectedLibraryId === t.id ? '1.5px solid var(--terracotta)' : '1px solid rgba(255,255,255,0.8)' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '6px' }}>
                            <div>
                              <p style={{ fontSize: '10px', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>{t.theme}</p>
                              <p style={{ fontWeight: 600, fontSize: '13px', color: 'var(--ink)' }}>{t.week_label}</p>
                            </div>
                            <button onClick={() => loadLibraryTeaching(t)} className="btn-primary" style={{ fontSize: '11px', padding: '6px 12px', flexShrink: 0 }}>Use this</button>
                          </div>
                          <p style={{ fontSize: '12px', color: 'var(--ink-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.hook}</p>
                        </div>
                      ))}
                    </div>
                  </>, 'var(--slate)'
                )}

                {/* Teaching form */}
                {card(
                  <div id="teaching-form" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)' }}>
                      {selectedLibraryId ? 'Edit & post' : 'Write your own'}
                    </p>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'var(--ink-muted)', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Group</label>
                      <select value={teachingGroupId} onChange={e => setTeachingGroupId(e.target.value)} style={inputStyle}>
                        {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                      </select>
                    </div>
                    {field('Week label', weekLabel, setWeekLabel, { placeholder: 'e.g. Week 1 · The Kingdom' })}
                    {field('Hook / opening thought', hook, setHook, { multiline: true, placeholder: 'The opening idea or story…' })}
                    {field('Scripture reference', scriptureRef, setScriptureRef, { placeholder: 'e.g. Matthew 5:1–12' })}
                    {field('Application', application, setApplication, { multiline: true, placeholder: 'What does this mean for how we live this week?' })}
                    {field('Discussion question', question, setQuestion, { multiline: true, placeholder: 'The question members will respond to…' })}
                    {teachingPosted && <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sage)' }}>Teaching posted. Members can see it now.</p>}
                    <button onClick={postTeaching} disabled={postingTeaching || !hook.trim() || !scriptureRef.trim() || !question.trim() || !weekLabel.trim()} className="btn-primary" style={{ opacity: postingTeaching ? 0.6 : 1 }}>
                      {postingTeaching ? 'Posting…' : 'Post teaching'}
                    </button>
                  </div>, 'var(--terracotta)'
                )}
              </>
            )}

            {teachings.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>Past teachings</p>
                {teachings.map(t => card(
                  <>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{t.week_label}</p>
                    <p style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>{t.question}</p>
                  </>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Responses ── */}
        {tab === 'responses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!latestTeaching ? (
              card(<p style={{ fontSize: '14px', color: 'var(--ink-muted)' }}>No teachings posted yet. Post a teaching to see responses here.</p>)
            ) : (
              <>
                {card(
                  <>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '6px' }}>Responding to</p>
                    <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--ink)' }}>{latestTeaching.week_label}</p>
                    <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '4px' }}>{latestTeaching.question}</p>
                  </>, 'var(--sage)'
                )}
                {responses.length === 0 ? (
                  <p style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--ink-muted)', fontSize: '14px' }}>No responses yet.</p>
                ) : (
                  responses.map(r => card(
                    <>
                      <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--terracotta)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.profiles?.full_name ?? 'Member'}</p>
                      <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--ink)' }}>{r.body}</p>
                      <p style={{ fontSize: '11px', color: 'var(--sage)', fontWeight: 600, marginTop: '8px' }}>
                        {new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                      </p>
                    </>
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
