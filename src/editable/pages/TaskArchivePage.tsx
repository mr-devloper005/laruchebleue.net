import Link from 'next/link'
import { ArrowRight, Bookmark, BriefcaseBusiness, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { editableFallbackImage, getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-7 md:grid-cols-2 xl:grid-cols-3', promise: 'Visual notes and profile stories with image-led context.', badge: 'Image note' },
  listing: { icon: BriefcaseBusiness, archiveClass: 'grid gap-7 xl:grid-cols-2', promise: 'Profile directory cards highlight identity, visuals, and useful details.', badge: 'Profile' },
  classified: { icon: Filter, archiveClass: 'grid gap-7 xl:grid-cols-2', promise: 'Profile notices prioritize visual proof, location, and quick action.', badge: 'Profile notice' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-6 space-y-6 md:columns-2 xl:columns-3', promise: 'Gallery-first browsing with strong visuals and compact captions.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Saved visual references and profile collections stay quick to scan.', badge: 'Saved visual' },
  pdf: { icon: Download, archiveClass: 'grid gap-7 md:grid-cols-2 xl:grid-cols-3', promise: 'Portfolio documents and profile media kits surface file context.', badge: 'Profile PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-7 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards focus on identity, visual summary, and direct discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main className="bg-[#070808] text-white">
        <section className={`relative mx-auto grid max-w-[1320px] gap-10 overflow-hidden px-5 py-16 sm:px-8 lg:grid-cols-[1fr_420px] lg:py-24 ${task === 'image' ? 'min-h-[620px] items-center' : ''}`}>
          {task === 'image' ? (
            <>
              <img src={posts[0] ? getEditablePostImage(posts[0]) : editableFallbackImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#070808_0%,rgba(7,8,8,0.95)_48%,rgba(7,8,8,0.76)_100%)]" />
            </>
          ) : null}
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]"><Icon className="h-5 w-5" /> {label}</div>
            <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.96] sm:text-6xl lg:text-7xl">{voice?.headline || `Browse ${label}`}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">{voice?.description || SITE_CONFIG.description}</p>
            <div className="mt-8 max-w-2xl rounded-lg bg-black p-5 text-sm font-bold leading-7 text-white/68">{deck.promise}</div>
          </div>

          <form action={basePath} className="relative self-end rounded-lg border border-white/10 bg-black/85 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/60"><Filter className="h-4 w-4" /> Filter</div>
            <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-lg border border-white/10 bg-[#101212] px-4 text-sm font-bold text-white outline-none">
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
            </select>
            <button className="mt-3 h-12 w-full rounded-lg bg-[var(--slot4-accent-fill)] text-sm font-black text-white">Apply</button>
            <p className="mt-3 text-xs font-bold text-white/55">Showing: {categoryLabel}</p>
          </form>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-10 sm:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/15 bg-black p-14 text-center">
              <Search className="mx-auto h-10 w-10 text-[var(--slot4-accent)]" />
              <h2 className="mt-5 text-4xl font-black">No posts found</h2>
              <p className="mt-3 text-sm text-white/62">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-lg border border-white/15 px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-lg bg-[var(--slot4-accent)] px-5 py-3 text-sm font-black text-black">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-lg border border-white/15 px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  if (task === 'listing') return <HorizontalInfoCard post={post} href={href} icon={BriefcaseBusiness} label="Profile directory" />
  if (task === 'classified') return <HorizontalInfoCard post={post} href={href} icon={MapPin} label={getField(post, ['price', 'amount']) || 'Profile notice'} />
  if (task === 'pdf') return <IconCard post={post} href={href} icon={FileText} label="Profile document" />
  if (task === 'sbm') return <IconCard post={post} href={href} icon={Bookmark} label="Saved visual" />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="editable-card-shine group overflow-hidden rounded-lg bg-black transition duration-300 hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#101212]">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
      <div className="p-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Profile note {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 text-2xl font-black leading-tight">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/62">{getEditableExcerpt(post, 150)}</p>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group mb-6 block break-inside-avoid overflow-hidden rounded-lg bg-black transition duration-300 hover:-translate-y-2">
      <img src={getEditablePostImage(post)} alt="" className={`w-full object-cover transition duration-700 group-hover:scale-110 ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />
      <div className="p-5">
        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight">{post.title}</h2>
      </div>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-lg bg-black p-6 text-center transition duration-300 hover:-translate-y-2 hover:bg-white/[0.035]">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-white/10">
        <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
      </div>
      <h2 className="mt-6 text-xl font-black leading-tight">{post.title}</h2>
      {role ? <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/62">{getEditableExcerpt(post, 110)}</p>
    </Link>
  )
}

function HorizontalInfoCard({ post, href, icon: Icon, label }: { post: SitePost; href: string; icon: typeof BriefcaseBusiness; label: string }) {
  return (
    <Link href={href} className="group grid overflow-hidden rounded-lg bg-black transition duration-300 hover:-translate-y-2 sm:grid-cols-[190px_1fr]">
      <div className="relative min-h-52 bg-[#101212]">
        <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-110" />
      </div>
      <div className="p-7">
        <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]"><Icon className="h-4 w-4" /> {label}</p>
        <h2 className="mt-4 text-3xl font-black leading-tight">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/62">{getEditableExcerpt(post, 150)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black">View details <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

function IconCard({ post, href, icon: Icon, label }: { post: SitePost; href: string; icon: typeof FileText; label: string }) {
  return (
    <Link href={href} className="group block rounded-lg bg-black p-7 transition duration-300 hover:-translate-y-2 hover:bg-white/[0.035]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-lg bg-[var(--slot4-accent)] p-5 text-black"><Icon className="h-8 w-8" /></div>
        <span className="rounded border border-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">{getEditableCategory(post) || label}</span>
      </div>
      <h2 className="mt-9 text-2xl font-black leading-tight">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-white/62">{getEditableExcerpt(post, 155)}</p>
    </Link>
  )
}
