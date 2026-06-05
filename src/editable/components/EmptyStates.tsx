import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'Nothing published here yet',
  description = 'Fresh posts will appear here automatically once this section has published content.',
  actionLabel = 'Back to home',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-lg border border-white/10 bg-black p-10 text-center text-white', className)}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-black">
        <SearchX className="h-7 w-7" />
      </div>
      <h2 className="mt-6 text-3xl font-black">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/62">{description}</p>
      <Link href={actionHref} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--slot4-accent-fill)] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`Published ${taskLabel} will appear here automatically. The layout stays polished even when the feed is empty.`}
      actionLabel="Explore the site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Thanks for reaching out. Your request has been saved and routed through the contact workflow."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
