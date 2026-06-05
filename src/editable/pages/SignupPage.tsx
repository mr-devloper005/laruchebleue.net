import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, UserPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { editableFallbackImage } from '@/editable/cards/PostCards'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="relative overflow-hidden bg-[#070808] text-white">
        <img src={editableFallbackImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-26" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,8,0.76)_0%,rgba(7,8,8,0.96)_50%,#070808_100%)]" />
        <section className="relative mx-auto grid min-h-[calc(100vh-96px)] max-w-[1320px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1fr]">
          <div className="rounded-lg border border-white/10 bg-black/82 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[var(--slot4-accent)] text-black"><UserPlus className="h-6 w-6" /></div>
            <h1 className="mt-7 text-4xl font-black">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-white/62">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent)] hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]"><Sparkles className="h-4 w-4" /> {pagesContent.auth.signup.badge}</p>
            <h2 className="mt-7 max-w-2xl text-5xl font-black leading-[0.96] sm:text-6xl lg:text-7xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-white/68">{pagesContent.auth.signup.description}</p>
            <Link href="/image" className="mt-9 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-accent)]">Explore the gallery <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
