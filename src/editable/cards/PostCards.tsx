import Link from 'next/link'
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export const editableFallbackImage = 'https://api.seoparadox.com/assets/images/imgi_2_MG_2477-1780564187702-903a2053.webp'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const direct = ['image', 'featuredImage', 'thumbnail', 'avatar', 'logo'].map((key) => content[key]).find((url): url is string => typeof url === 'string' && Boolean(url))
  return mediaUrl || contentImage || direct || editableFallbackImage
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean || 'Explore the full profile, image set, and notes inside.'
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Portfolio'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured image profile' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`editable-card-shine group block min-w-0 overflow-hidden ${dc.surface.dark}`}>
      <div className="relative min-h-[560px] p-7 sm:p-10 lg:min-h-[690px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="editable-image-pan absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95),rgba(0,0,0,0.58),rgba(0,0,0,0.12))]" />
        <div className="relative z-10 flex min-h-[500px] max-w-3xl flex-col justify-end lg:min-h-[620px]">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{label}</span>
          <h3 className="mt-6 text-5xl font-black leading-[0.94] sm:text-6xl lg:text-7xl">{post.title}</h3>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/72">{getEditableExcerpt(post, 180)}</p>
          <span className="mt-9 inline-flex w-fit items-center gap-3 rounded-lg bg-[var(--slot4-accent-fill)] px-7 py-4 text-sm font-black text-white">
            View gallery <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block overflow-hidden ${dc.layout.minRailCard}`}>
      <article className="bg-black">
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          <span className="absolute left-4 top-4 rounded bg-black/75 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">No {String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
          <h3 className="mt-3 line-clamp-2 text-2xl font-black leading-tight text-white">{post.title}</h3>
        </div>
      </article>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block rounded-lg border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-[var(--slot4-accent)] hover:bg-white/[0.06]">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-sm font-black text-black">{index + 1}</span>
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]"><Sparkles className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className="mt-2 line-clamp-2 text-xl font-black leading-tight text-white">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/62">{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const horizontal = index % 2 === 0
  return (
    <Link href={href} className={`group grid min-w-0 gap-0 overflow-hidden rounded-lg border border-white/10 bg-black ${dc.motion.lift} ${horizontal ? 'sm:grid-cols-[260px_minmax(0,1fr)]' : ''}`}>
      <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${horizontal ? 'aspect-[4/3] sm:aspect-auto sm:min-h-[220px]' : 'aspect-[16/10]'}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
      </div>
      <div className="min-w-0 p-6 sm:p-7">
        <p className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]"><ImageIcon className="h-4 w-4" /> Gallery {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-4 line-clamp-3 text-3xl font-black leading-[1.02] text-white">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/64">{getEditableExcerpt(post, 175)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white">Open profile <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  )
}
