'use client'

import { useState } from 'react'

type Variant = 'dark' | 'light'

export default function NewsletterSignup({
  source = 'unknown',
  variant = 'dark',
}: {
  source?: string
  variant?: Variant
}) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      if (res.ok) {
        setState('success')
        setEmail('')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <p className={`text-sm font-sans ${variant === 'dark' ? 'text-green-400' : 'text-iic-navy'}`}>
        Thank you. Please confirm your subscription via the email we have sent you.
      </p>
    )
  }

  const inputClass =
    variant === 'dark'
      ? 'text-xs font-sans bg-stone-800 border border-stone-600 text-white placeholder-stone-500 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-iic-saffron'
      : 'text-sm font-sans bg-white border border-stone-300 text-stone-900 placeholder-stone-400 rounded px-4 py-3 flex-1 focus:outline-none focus:ring-2 focus:ring-iic-saffron focus:border-transparent'

  const buttonClass =
    variant === 'dark'
      ? 'text-xs font-sans bg-iic-saffron text-white px-3 py-2 rounded hover:bg-iic-saffron-deep transition-colors disabled:opacity-50'
      : 'text-sm font-sans font-semibold bg-iic-saffron text-white px-6 py-3 rounded hover:bg-iic-saffron-deep transition-colors disabled:opacity-50'

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
      <button type="submit" disabled={state === 'loading'} className={buttonClass}>
        {state === 'loading' ? '…' : 'Subscribe'}
      </button>
    </form>
  )
}
