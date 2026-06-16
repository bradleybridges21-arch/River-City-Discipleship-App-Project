'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { TEACHING_LIBRARY, THEMES, type LibraryTeaching } from '@/lib/teaching-library'

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

  const field = (label: string, value: string, onChange: (v: string) => void, opts?: { multiline?: boolean; placeholder?: string }) => (
    <div>
      <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-soft)' }}>{label}</label>
      {opts?.multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          placeholder={opts.placeholder}
          className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
          style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={opts?.placeholder}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
        />
      )}
    </div>
  )

  return (
    <div className="px-5 pt-10">
      <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--terracotta)' }}>Leader</p>
      <h1 className="text-2xl font-semibold mb-1" style={{ color: 'var(--ink)' }}>Admin</h1>
      <p className="text-sm mb-5" style={{ color: 'var(--ink-soft)' }}>Manage your groups, teachings, and members.</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {([
          ['overview', 'Overview'],
          ['groups', 'Groups'],
          ['teaching', 'Teaching'],
          ['responses', 'Responses'],
        ] as const).map(([key, label]) => (
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

      {/* Overview */}
      {tab === 'overview' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>{groups.length}</p>
              <p className="text-xs font-medium mt-1" style={{ color: 'var(--ink-soft)' }}>{groups.length === 1 ? 'Group' : 'Groups'}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>{memberships.length}</p>
              <p className="text-xs font-medium mt-1" style={{ color: 'var(--ink-soft)' }}>Members</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>{teachings.length}</p>
              <p className="text-xs font-medium mt-1" style={{ color: 'var(--ink-soft)' }}>Teachings</p>
            </div>
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>{responses.length}</p>
              <p className="text-xs font-medium mt-1" style={{ color: 'var(--ink-soft)' }}>Responses</p>
            </div>
          </div>

          {latestTeaching && (
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--sage)' }}>Latest teaching</p>
              <p className="font-semibold" style={{ color: 'var(--ink)' }}>{latestTeaching.week_label}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--ink-soft)' }}>{latestTeaching.question}</p>
              <p className="text-xs mt-2" style={{ color: 'var(--sage)' }}>{responses.length} response{responses.length !== 1 ? 's' : ''} so far</p>
            </div>
          )}

          <button
            onClick={() => setTab('teaching')}
            className="w-full py-3 rounded-2xl font-semibold text-sm"
            style={{ backgroundColor: 'var(--terracotta)', color: '#fff' }}
          >
            Post this week's teaching
          </button>
        </div>
      )}

      {/* Groups */}
      {tab === 'groups' && (
        <div className="flex flex-col gap-5">
          {/* Create group */}
          <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>Create a group</p>
            <input
              type="text"
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              placeholder="e.g. River City Men's Group"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-3"
              style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
            />
            {groupCreated && <p className="text-xs mb-2" style={{ color: 'var(--sage)' }}>"{groupCreated}" created.</p>}
            {groupError && <p className="text-xs mb-2" style={{ color: 'var(--terracotta)' }}>{groupError}</p>}
            <button
              onClick={createGroup}
              disabled={creatingGroup || !newGroupName.trim()}
              className="px-5 py-2 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: creatingGroup || !newGroupName.trim() ? 0.5 : 1 }}
            >
              {creatingGroup ? 'Creating…' : 'Create group'}
            </button>
          </div>

          {/* Add member */}
          {groups.length > 0 && (
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--sage)' }}>Add a member</p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-soft)' }}>Group</label>
                  <select
                    value={selectedGroupId}
                    onChange={e => setSelectedGroupId(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
                  >
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-soft)' }}>Member's email</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={e => setInviteEmail(e.target.value)}
                    placeholder="their@email.com"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-soft)' }}>Role</label>
                  <div className="flex gap-2">
                    {(['member', 'leader'] as const).map(r => (
                      <button
                        key={r}
                        onClick={() => setInviteRole(r)}
                        className="flex-1 py-2 rounded-xl text-sm font-semibold"
                        style={{
                          backgroundColor: inviteRole === r ? 'var(--ink)' : 'var(--paper)',
                          color: inviteRole === r ? '#fff' : 'var(--ink-soft)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {r.charAt(0).toUpperCase() + r.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                {inviteMsg && <p className="text-xs" style={{ color: inviteMsg.includes('added') ? 'var(--sage)' : 'var(--terracotta)' }}>{inviteMsg}</p>}
                <button
                  onClick={inviteMember}
                  disabled={inviting || !inviteEmail.trim()}
                  className="py-3 rounded-xl text-sm font-semibold"
                  style={{ backgroundColor: 'var(--sage)', color: '#fff', opacity: inviting || !inviteEmail.trim() ? 0.5 : 1 }}
                >
                  {inviting ? 'Adding…' : 'Add to group'}
                </button>
              </div>
            </div>
          )}

          {/* Existing groups */}
          {groups.map(g => (
            <div key={g.id} className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="font-semibold mb-3" style={{ color: 'var(--ink)' }}>{g.name}</p>
              {membersByGroup(g.id).length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>No members yet.</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {membersByGroup(g.id).map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                        style={{ backgroundColor: m.role === 'leader' ? 'var(--terracotta)' : 'var(--sage)', color: '#fff' }}
                      >
                        {(m.profiles?.full_name ?? '?')[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{m.profiles?.full_name ?? 'Member'}</p>
                        <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Teaching */}
      {tab === 'teaching' && (
        <div className="flex flex-col gap-5">
          {groups.length === 0 ? (
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>Create a group first before posting a teaching.</p>
            </div>
          ) : (
            <>
              {/* ── Teaching library ── */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--sage)' }}>Teaching library</p>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                </div>
                <p className="text-xs mb-4" style={{ color: 'var(--ink-soft)' }}>
                  Choose a teaching to post as-is, or use it as a starting point and edit the form below.
                </p>

                {/* Theme filter */}
                <div className="flex gap-2 flex-wrap mb-4">
                  <button
                    onClick={() => setLibraryTheme('All')}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: libraryTheme === 'All' ? 'var(--ink)' : 'var(--surface)',
                      color: libraryTheme === 'All' ? '#fff' : 'var(--ink-soft)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    All
                  </button>
                  {THEMES.map(theme => (
                    <button
                      key={theme}
                      onClick={() => setLibraryTheme(theme)}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: libraryTheme === theme ? 'var(--ink)' : 'var(--surface)',
                        color: libraryTheme === theme ? '#fff' : 'var(--ink-soft)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {theme}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {TEACHING_LIBRARY
                    .filter(t => libraryTheme === 'All' || t.theme === libraryTheme)
                    .map(t => (
                      <div
                        key={t.id}
                        className="rounded-2xl p-4"
                        style={{
                          backgroundColor: 'var(--surface)',
                          border: selectedLibraryId === t.id ? '1.5px solid var(--terracotta)' : '1px solid var(--border)',
                        }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>{t.theme}</p>
                            <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{t.week_label}</p>
                          </div>
                          <button
                            onClick={() => loadLibraryTeaching(t)}
                            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold"
                            style={{ backgroundColor: 'var(--terracotta)', color: '#fff' }}
                          >
                            Use this
                          </button>
                        </div>
                        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--ink-soft)' }}>{t.hook}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* ── Manual / edit form ── */}
              <div id="teaching-form" className="rounded-2xl p-5 flex flex-col gap-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3">
                  <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--sage)' }}>
                    {selectedLibraryId ? 'Edit & post' : 'Write your own'}
                  </p>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink-soft)' }}>Group</label>
                  <select
                    value={teachingGroupId}
                    onChange={e => setTeachingGroupId(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{ backgroundColor: 'var(--paper)', border: '1px solid var(--border)', color: 'var(--ink)' }}
                  >
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>

                {field('Week label', weekLabel, setWeekLabel, { placeholder: 'e.g. Week 1 · The Kingdom' })}
                {field('Hook / opening thought', hook, setHook, { multiline: true, placeholder: 'The opening idea or story that frames the week…' })}
                {field('Scripture reference', scriptureRef, setScriptureRef, { placeholder: 'e.g. Matthew 5:1–12' })}
                {field('Application', application, setApplication, { multiline: true, placeholder: 'What does this mean for how we live this week?' })}
                {field('Discussion question', question, setQuestion, { multiline: true, placeholder: 'The question members will respond to…' })}

                {teachingPosted && <p className="text-sm font-medium" style={{ color: 'var(--sage)' }}>Teaching posted. Members can see it now.</p>}

                <button
                  onClick={postTeaching}
                  disabled={postingTeaching || !hook.trim() || !scriptureRef.trim() || !question.trim() || !weekLabel.trim()}
                  className="py-3 rounded-2xl font-semibold text-sm"
                  style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: postingTeaching ? 0.6 : 1 }}
                >
                  {postingTeaching ? 'Posting…' : 'Post teaching'}
                </button>
              </div>
            </>
          )}

          {teachings.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--ink-soft)' }}>Past teachings</p>
              {teachings.map(t => (
                <div key={t.id} className="rounded-2xl px-5 py-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{t.week_label}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>{t.question}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Responses */}
      {tab === 'responses' && (
        <div className="flex flex-col gap-4">
          {!latestTeaching ? (
            <div className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
              <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>No teachings posted yet. Post a teaching to see responses here.</p>
            </div>
          ) : (
            <>
              <div className="rounded-2xl px-5 py-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'var(--sage)' }}>Responding to</p>
                <p className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{latestTeaching.week_label}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>{latestTeaching.question}</p>
              </div>

              {responses.length === 0 ? (
                <p className="text-sm text-center py-4" style={{ color: 'var(--ink-soft)' }}>No responses yet.</p>
              ) : (
                responses.map(r => (
                  <div key={r.id} className="rounded-2xl p-5" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: 'var(--terracotta)' }}>{r.profiles?.full_name ?? 'Member'}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{r.body}</p>
                    <p className="text-xs mt-2" style={{ color: 'var(--sage)' }}>
                      {new Date(r.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
