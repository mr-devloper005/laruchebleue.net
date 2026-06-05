'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass = 'h-13 rounded-lg border border-white/12 bg-white/[0.055] px-4 text-base font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-[var(--slot4-accent)] focus:bg-white/[0.08]'

export function EditableContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.message || 'Unable to send your message.')
      setStatus('success')
      setMessage(data?.message || 'Thanks. Your message has been received.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Full name" placeholder="Your name" required />
        <Field name="email" type="email" label="Email address" placeholder="you@example.com" required />
        <Field name="phone" label="Phone number" placeholder="Optional" />
        <Field name="subject" label="Subject" placeholder="How can we help?" />
      </div>
      <label className="mt-4 grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/60">
        Message
        <textarea name="message" required rows={6} placeholder="Tell us what you need help with..." className="rounded-lg border border-white/12 bg-white/[0.055] px-4 py-4 text-base font-semibold normal-case tracking-normal text-white outline-none transition placeholder:text-white/35 focus:border-[var(--slot4-accent)]" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? <div className={`mt-5 flex items-start gap-3 rounded-lg px-4 py-3 text-sm font-bold ${status === 'success' ? 'bg-emerald-400/15 text-emerald-200' : 'bg-red-400/15 text-red-200'}`}>{status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}<span>{message}</span></div> : null}
      <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex h-13 w-full items-center justify-center gap-3 rounded-lg bg-[var(--slot4-accent-fill)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(91,0,255,0.38)] disabled:opacity-60">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send message
      </button>
    </form>
  )
}

function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/60">{label}<input name={name} type={type} required={required} placeholder={placeholder} className={fieldClass} /></label>
}
