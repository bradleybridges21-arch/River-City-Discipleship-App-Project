'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (mode === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setMessage(error.message)
      } else {
        router.push('/home')
        router.refresh()
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Check your email for a confirmation link.')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="w-full max-w-sm">
        {/* Opening prayer */}
        <p className="font-reading text-center italic mb-10 leading-relaxed" style={{ color: 'var(--ink-soft)', fontSize: '15px' }}>
          Lord, open our eyes to see you,<br />
          our ears to hear you,<br />
          and our hearts to follow you.
        </p>

        <h1 className="text-2xl font-semibold text-center mb-1" style={{ color: 'var(--ink)' }}>
          River City Discipleship
        </h1>
        <p className="text-center mb-8" style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>
          {mode === 'signin' ? 'Welcome back.' : 'Create your account.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ink)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--ink)',
              }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--ink)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--ink)',
              }}
              placeholder="••••••••"
            />
          </div>

          {message && (
            <p className="text-sm text-center" style={{ color: 'var(--terracotta)' }}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity"
            style={{ backgroundColor: 'var(--terracotta)', color: '#fff', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'One moment…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: 'var(--ink-soft)' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage('') }}
            className="font-medium underline"
            style={{ color: 'var(--ink)' }}
          >
            {mode === 'signin' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
