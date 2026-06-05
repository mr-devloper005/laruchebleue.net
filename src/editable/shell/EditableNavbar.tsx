'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Image', href: '/image' },
  { label: 'Sign in', href: '/login' },
  { label: 'Signup', href: '/signup' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const brandIcon = '/favicon.png'

  return (
    <header className="sticky top-0 z-50 bg-[#080808] text-white">
      <nav className="mx-auto flex min-h-[96px] max-w-[1860px] items-center gap-6 px-5 sm:px-9 lg:px-10">
        <Link href="/" className="inline-flex shrink-0 items-center gap-3 text-2xl font-black">
          <img src={brandIcon} alt="laruchebleue logo" className="h-14 w-14 object-contain" />
          <span>laruchebleue</span>
        </Link>

        <div className="ml-auto hidden items-center gap-9 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link key={item.href} href={item.href} className={`text-sm font-bold transition hover:text-[var(--slot4-accent)] ${active ? 'text-[var(--slot4-accent)]' : 'text-white'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto rounded-lg border border-white/30 p-3 lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-black px-5 py-5 lg:hidden">
          <div className="grid gap-2">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-black">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
