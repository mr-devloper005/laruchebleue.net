import { ArrowRight, Camera, Search, Sparkles, UserRound } from 'lucide-react'

import { editableFallbackImage } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const valueIcons = [Camera, UserRound, Search]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="overflow-hidden bg-[#070808] text-[#050505]">
        <section className="relative min-h-[calc(100vh-92px)] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <img src={editableFallbackImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#070808_0%,rgba(7,8,8,0.9)_42%,rgba(7,8,8,0.72)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070808] to-transparent" />

          <div className="relative mx-auto grid max-w-[var(--editable-container)] items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="max-w-4xl rounded-[2rem] border border-white/10 bg-[#fff8ef]/95 p-7 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur sm:p-10">
              <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.34em] text-black">
                <Sparkles className="h-4 w-4" />
                {pagesContent.about.badge}
              </p>
              <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                {pagesContent.about.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-bold leading-8 text-black">{pagesContent.about.description}</p>
              <div className="mt-9 grid max-w-3xl gap-4 sm:grid-cols-2">
                {pagesContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="rounded-[1.4rem] border border-black/20 bg-white/82 p-5 text-sm font-bold leading-7 text-black shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <aside className="grid gap-4">
              {pagesContent.about.values.map((value, index) => {
                const Icon = valueIcons[index % valueIcons.length]

                return (
                  <section
                    key={value.title}
                    className="group rounded-[1.6rem] border border-black/20 bg-white/88 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.12)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-black"
                  >
                    <div className="flex items-start gap-5">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#08f5d7] text-black shadow-[0_0_40px_rgba(8,245,215,0.3)]">
                        <Icon className="h-7 w-7" />
                      </span>
                      <div>
                        <h2 className="text-2xl font-black tracking-[-0.04em]">{value.title}</h2>
                        <p className="mt-3 text-sm font-bold leading-7 text-black">{value.description}</p>
                      </div>
                    </div>
                  </section>
                )
              })}
            </aside>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#101414] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="rounded-[1.7rem] border border-white/10 bg-[#fff8ef] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-black">Image and profile focus</p>
              <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
                Built for portfolios that need to be seen fast.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {['Image-led posts', 'Profile context', 'Gallery discovery'].map((item, index) => (
                <div key={item} className="rounded-[1.5rem] border border-black/20 bg-[#fff8ef] p-6 text-black transition duration-300 hover:-translate-y-1 hover:border-black">
                  <span className="text-4xl font-black text-black">0{index + 1}</span>
                  <h3 className="mt-6 text-xl font-black tracking-[-0.04em]">{item}</h3>
                  <ArrowRight className="mt-8 h-6 w-6 text-black" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
