import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/search', title: pagesContent.search.metadata.title, description: pagesContent.search.metadata.description })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : ''].some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/image/${post.slug}`
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0
  return (
    <Link href={href} className={`editable-card-shine group block overflow-hidden rounded-lg border border-white/10 bg-black transition duration-300 hover:-translate-y-2 hover:border-[var(--slot4-accent)] ${strong ? 'md:col-span-2' : ''}`}>
      <div className={`relative overflow-hidden bg-[#101212] ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded bg-[var(--slot4-accent)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-black">{taskLabel}</span>
      </div>
      <div className="p-6">
        <h2 className="line-clamp-3 text-2xl font-black leading-tight text-white">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-white/62">{getEditableExcerpt(post, 160)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Open image/profile <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#070808] text-white">
        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:py-24">
          <div className="relative grid gap-10 overflow-hidden rounded-lg border border-white/10 bg-black p-7 shadow-[0_30px_100px_rgba(0,0,0,0.5)] md:grid-cols-[0.85fr_1.15fr] lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--slot4-accent-fill)]/20 blur-3xl" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
              <h1 className="mt-6 text-5xl font-black leading-[0.94] sm:text-6xl lg:text-7xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/66">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="relative self-end rounded-lg border border-white/10 bg-white/[0.035] p-5">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-lg border border-white/12 bg-black px-4 py-4">
                <Search className="h-5 w-5 text-[var(--slot4-accent)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold text-white outline-none placeholder:text-white/35" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-lg border border-white/12 bg-black px-4 py-3">
                  <Filter className="h-4 w-4 text-[var(--slot4-accent)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold text-white outline-none placeholder:text-white/35" />
                </label>
                <select name="task" defaultValue={task} className="rounded-lg border border-white/12 bg-black px-4 py-3 text-sm font-black text-white outline-none">
                  <option value="">All image and profile types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-lg bg-[var(--slot4-accent-fill)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5" type="submit">Search</button>
            </form>
          </div>
          <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">{results.length} results</p>
              <h2 className="mt-3 text-4xl font-black">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/image" className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-black transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Browse gallery <ArrowRight className="h-4 w-4" /></Link>
          </div>
          {results.length ? <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}</div> : <div className="mt-8 rounded-lg border border-dashed border-white/15 bg-black p-12 text-center"><p className="text-3xl font-black">No matching posts found.</p><p className="mt-3 text-sm font-semibold text-white/60">Try a different keyword, task type, or category.</p></div>}
        </section>
      </main>
    </EditableSiteShell>
  )
}
