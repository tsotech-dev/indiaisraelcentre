'use client'

import { useState } from 'react'

interface ContactFormProps {
  type: 'editorial' | 'media' | 'partner' | 'work'
  recipientHint?: string
}

export default function ContactForm({ type, recipientHint }: ContactFormProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', organisation: '', message: '' })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type }),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-sm border border-green-200 bg-green-50 p-6 text-sm text-green-800">
        Thank you. Your message has been received. We aim to respond within five working days.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-xs font-sans font-medium text-stone-700 mb-1">Name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className="w-full border border-stone-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-iic-accent"
        />
      </div>

      <div>
        <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          className="w-full border border-stone-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-iic-accent"
        />
      </div>

      {(type === 'partner' || type === 'work') && (
        <div>
          <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
            Organisation
          </label>
          <input
            type="text"
            value={form.organisation}
            onChange={(e) => set('organisation', e.target.value)}
            className="w-full border border-stone-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-iic-accent"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-sans font-medium text-stone-700 mb-1">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          className="w-full border border-stone-200 rounded px-3 py-2 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-iic-accent resize-y"
        />
      </div>

      {state === 'error' && (
        <p className="text-xs font-sans text-red-600">
          Something went wrong. Please write directly to{' '}
          {recipientHint ?? 'research@indiaisraelcentre.org'}.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-iic-navy text-white text-sm font-sans font-medium px-6 py-2.5 rounded hover:bg-iic-blue transition-colors disabled:opacity-50"
      >
        {state === 'loading' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
