'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'
import { globalContent } from '@/editable/content/global.content'

const footerLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Contact', '/contact'],
  ['Image', '/image'],
  ['Sign in', '/login'],
  ['Signup', '/signup'],
]

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-[980px] gap-16 px-5 py-24 sm:px-8 md:grid-cols-[1.1fr_0.8fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 text-2xl font-black">
            <span className="flex h-14 w-14 items-center justify-center bg-white/[0.035]">
              <img src="/favicon.png" alt="laruchebleue logo" className="h-11 w-11 object-contain" />
            </span>
            <span>laruchebleue</span>
          </Link>
          <p className="mt-10 max-w-xs text-sm leading-7 text-white/70">
            {globalContent.footer?.description || 'A visual directory for image galleries, portfolios, and professional profile pages.'}
          </p>
          <p className="mt-8 text-sm leading-7 text-white/70">Copyright (c) {year} laruchebleue.<br />All Rights Reserved.</p>
        </div>

        <div>
          <h3 className="text-2xl font-black">Explore</h3>
          <div className="mt-10 grid gap-5 text-base text-white/72">
            {footerLinks.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-[var(--slot4-accent)]">{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <Link href="#" aria-label="Back to top" className="editable-glow-button fixed bottom-9 right-8 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-white transition hover:-translate-y-1">
        <ArrowUp className="h-8 w-8" />
      </Link>
    </footer>
  )
}
