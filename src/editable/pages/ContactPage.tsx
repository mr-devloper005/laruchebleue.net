'use client'

import { Image as ImageIcon, Mail, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableFallbackImage } from '@/editable/cards/PostCards'

const lanes = [
  { icon: ImageIcon, title: 'Image gallery showcases', body: 'Discuss gallery launches, profile features, and visual portfolio campaigns.' },
  { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
  { icon: Mail, title: 'Profile support', body: 'Request profile page help, creator decks, gallery support, or visual feature placement.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="relative overflow-hidden bg-[#070808] text-white">
        <img src={editableFallbackImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070808_0%,rgba(7,8,8,0.97)_48%,rgba(7,8,8,0.82)_100%)]" />
        <section className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-[1320px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[0.96] sm:text-6xl lg:text-7xl">{pagesContent.contact.title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/68">{pagesContent.contact.description}</p>
            <div className="mt-10 grid gap-3">
              {lanes.map((lane) => (
                <article key={lane.title} className="group flex gap-5 rounded-lg border border-white/10 bg-black/70 p-5 backdrop-blur transition duration-300 hover:border-[var(--slot4-accent)] hover:bg-black">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[var(--slot4-accent)] text-black"><lane.icon className="h-5 w-5" /></div>
                  <div>
                    <h2 className="text-xl font-black">{lane.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-white/62">{lane.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/80 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">Start a conversation</p>
            <h2 className="mt-4 text-4xl font-black">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
