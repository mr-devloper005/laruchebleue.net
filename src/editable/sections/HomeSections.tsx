import Link from 'next/link'
import { ArrowRight, Atom, Eye, Lightbulb, Search, SlidersHorizontal, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, CompactIndexCard, RailPostCard, editableFallbackImage, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function fallbackHeroTitle(primaryTask: TaskKey) {
  return pagesContent.home.hero.title.join(' ') || `Image Galleries for Professional Profiles`
}

function postLink(primaryTask: TaskKey, primaryRoute: string, post: SitePost) {
  return postHref(primaryTask, post, primaryRoute)
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{eyebrow}</p>
      <h2 className="mt-6 text-4xl font-black leading-[1.04] sm:text-5xl lg:text-6xl">{title}</h2>
    </div>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroPost = posts[0]
  const heroImage = heroPost ? getEditablePostImage(heroPost) : editableFallbackImage
  return (
    <section className="relative min-h-[calc(100vh-144px)] overflow-hidden bg-black">
      <img src={heroImage} alt="" className="editable-image-pan absolute inset-0 h-full w-full object-cover opacity-75" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.96)_23%,rgba(7,7,7,0.64)_44%,rgba(7,7,7,0.12)_70%,rgba(7,7,7,0.76)_100%)]" />
      <div className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 grid-cols-1 gap-3 lg:grid">
        {['•', '▣', '▪'].map((icon, index) => (
          <Link key={index} href={index === 0 ? primaryRoute : '/search'} className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--slot4-accent-fill)] text-xl font-black text-white transition hover:-translate-y-1">
            {icon}
          </Link>
        ))}
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-144px)] max-w-[1320px] items-center px-5 py-20 sm:px-8">
        <div className="editable-fade-up max-w-3xl">
          <h1 className={dc.type.heroTitle}>
            Image <span className="text-[var(--slot4-accent-fill)]">Galleries</span> for Professional Profiles
          </h1>
          <p className="mt-8 max-w-xl text-xl leading-8 text-white/72">
            Browse image-rich portfolio posts and profile pages for creators, professionals, teams, and businesses.
          </p>
          <div className="mt-11 flex flex-wrap gap-4">
            <Link href={primaryRoute} className={dc.button.primary}>Get Started</Link>
            <Link href="/search" className={dc.button.secondary}><Search className="h-4 w-4" /> Search</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(180deg,transparent,#070808)]" />
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  if (!railPosts.length) return null
  return (
    <section className="bg-[#070808] py-24">
      <SectionHeading eyebrow="What we do" title="Discover Image Galleries and Profiles Crafted with Style, Quality, and Clarity" />
      <div className="mt-24 flex gap-7 overflow-hidden">
        {railPosts.slice(0, 5).map((post, index) => (
          <div key={post.id || post.slug} className="min-w-[360px] flex-1">
            <RailPostCard post={post} href={postLink(primaryTask, primaryRoute, post)} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const services = [
    [Atom, 'Image context', 'Each image post pairs strong visuals with clear profile-ready context.'],
    [Eye, 'Gallery view', 'Large media blocks make every portfolio easy to inspect and remember.'],
    [Lightbulb, 'Profile clarity', 'Flexible layouts keep people, brands, and image galleries connected.'],
    [SlidersHorizontal, 'Fast discovery', 'Search, categories, and archive pages stay simple on desktop and mobile.'],
  ] as const
  const about = posts[5] || posts[0]
  return (
    <>
      <section className="bg-[#070808] px-5 py-28 sm:px-8">
        <SectionHeading eyebrow="Profile collection" title="Image and Profile Discovery" />
        <div className="mx-auto mt-20 grid max-w-[1320px] gap-7 md:grid-cols-2 xl:grid-cols-4">
          {services.map(([Icon, title, text]) => (
            <article key={title} className="group rounded-lg bg-black px-7 py-11 text-center transition duration-300 hover:-translate-y-2 hover:bg-white/[0.035]">
              <Icon className="mx-auto h-16 w-16 text-[var(--slot4-accent)] transition duration-300 group-hover:scale-110" />
              <h3 className="mt-10 text-2xl font-black">{title}</h3>
              <p className="mt-5 text-base leading-7 text-white/70">{text}</p>
              <ArrowRight className="mx-auto mt-8 h-6 w-6 transition group-hover:translate-x-2" />
            </article>
          ))}
        </div>
      </section>

      {about ? (
        <section className="bg-[#090a0a] px-5 py-32 sm:px-8">
          <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="overflow-hidden border border-white/10">
              <img src={getEditablePostImage(about)} alt="" className="aspect-[4/5] w-full object-cover transition duration-700 hover:scale-105" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">About profiles</p>
              <h2 className="mt-8 max-w-2xl text-5xl font-black leading-[1.02] sm:text-6xl">Built for Visual Identity and Profile Discovery</h2>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72">{getEditableExcerpt(about, 170)}</p>
              <Link href="/about" className={`${dc.button.primary} mt-10`}>About us</Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pooled = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const gallery = pooled.slice(0, 8)
  const latest = pooled.slice(0, 3)
  const compact = pooled.slice(3, 9)
  if (!gallery.length) return null
  return (
    <>
      <section className="bg-[#070808] py-28">
        <SectionHeading eyebrow="Huge gallery" title="Image-Led Profile Design" />
        <div className="mt-12 flex justify-center gap-10 text-sm font-black text-white/62">
          {['Art Direction', 'Illustration', 'Design', 'Creative'].map((item, index) => (
            <Link key={item} href={index === 0 ? primaryRoute : '/search'} className={index === 0 ? 'border-b border-[var(--slot4-accent)] pb-3 text-[var(--slot4-accent)]' : 'pb-3 transition hover:text-[var(--slot4-accent)]'}>{item}</Link>
          ))}
        </div>
        <div className="mt-14 grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {gallery.slice(0, 5).map((post, index) => (
            <Link key={post.id || post.slug} href={postLink(primaryTask, primaryRoute, post)} className="group block overflow-hidden bg-black">
              <img src={getEditablePostImage(post)} alt={post.title} className={`w-full object-cover transition duration-700 group-hover:scale-110 ${index === 2 ? 'aspect-[5/4]' : 'aspect-square'}`} />
            </Link>
          ))}
        </div>
      </section>

      {false ? <section className="bg-[#070808] px-5 py-28 sm:px-8">
        <div className="mx-auto grid max-w-[1300px] gap-8 lg:grid-cols-2">
          {compact.slice(0, 2).map((post, index) => (
            <blockquote key={post.id || post.slug} className="relative rounded-lg bg-black px-10 py-20 text-center">
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6 text-8xl font-black text-[var(--slot4-accent-fill)]">“</span>
              <p className="mx-auto max-w-xl text-2xl leading-10 text-white/78">{getEditableExcerpt(post, 190)}</p>
              <div className="mx-auto mt-10 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white/10">
                <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 text-2xl font-black">{post.title.split(' ').slice(0, 2).join(' ') || 'Creative Voice'}</h3>
              <p className="mt-2 text-sm text-white/70">Portfolio contributor</p>
            </blockquote>
          ))}
        </div>
        <div className="mx-auto mt-20 grid max-w-[1320px] grid-cols-2 gap-8 opacity-35 sm:grid-cols-3 lg:grid-cols-6">
          {['Logoipsum', 'Designlab', 'Studio', 'Maker', 'Visuals', 'Profile'].map((logo) => <div key={logo} className="text-center text-2xl font-black text-white/70">{logo}</div>)}
        </div>
      </section> : null}

      <section className="bg-[#111313] px-5 py-28 sm:px-8">
        <SectionHeading eyebrow="Latest image and profile posts" title="Galleries & Profiles" />
        <div className="mx-auto mt-20 grid max-w-[1320px] gap-8 lg:grid-cols-3">
          {latest.map((post, index) => <ArticleListCard key={post.id || post.slug} post={post} href={postLink(primaryTask, primaryRoute, post)} index={index} />)}
        </div>
        <div className="mx-auto mt-10 grid max-w-[1320px] gap-4 md:grid-cols-2 xl:grid-cols-3">
          {compact.slice(2, 5).map((post, index) => <CompactIndexCard key={post.id || post.slug} post={post} href={postLink(primaryTask, primaryRoute, post)} index={index} />)}
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-black px-5 py-20 text-center sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-black leading-tight sm:text-5xl">Ready to discover the next image gallery or profile?</h2>
        <p className="mt-6 text-lg leading-8 text-white/68">Browse image posts, profile pages, and visual portfolio updates built for quick scanning and deeper discovery.</p>
        <Link href="/image" className={`${dc.button.accent} mt-9`}>Browse images</Link>
      </div>
    </section>
  )
}
