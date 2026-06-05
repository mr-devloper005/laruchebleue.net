import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#070808',
  '--slot4-page-text': '#ffffff',
  '--slot4-panel-bg': '#050505',
  '--slot4-surface-bg': '#000000',
  '--slot4-muted-text': '#cbd3df',
  '--slot4-soft-muted-text': '#8e98a8',
  '--slot4-accent': '#00f5d4',
  '--slot4-accent-fill': '#5b00ff',
  '--slot4-accent-soft': 'rgba(0,245,212,0.12)',
  '--slot4-dark-bg': '#000000',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#111818',
  '--slot4-cream': '#090a0a',
  '--slot4-warm': '#070808',
  '--slot4-lavender': '#090909',
  '--slot4-gray': '#0b0c0c',
  '--slot4-body-gradient': 'radial-gradient(circle at 72% 12%, rgba(0,245,212,0.08), transparent 30%), linear-gradient(180deg, #050606 0%, #070808 38%, #0b0c0c 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-white/10',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_18px_70px_rgba(0,0,0,0.34)]',
  shadowStrong: 'shadow-[0_30px_110px_rgba(0,0,0,0.56)]',
  overlay: 'bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.72)_35%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.78)_100%)]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-28',
  },
  layout: {
    safeGrid: 'grid gap-7 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center',
    rail: 'flex snap-x gap-7 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[280px] shrink-0 snap-start sm:w-[330px]',
  },
  type: {
    eyebrow: 'text-xs font-black uppercase tracking-[0.18em]',
    heroTitle: 'text-5xl font-black leading-[0.94] sm:text-6xl lg:text-[6.35rem]',
    sectionTitle: 'text-4xl font-black leading-[0.98] sm:text-5xl lg:text-6xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-lg border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-lg border ${editablePalette.border} bg-white/[0.035]`,
    dark: `rounded-lg ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-lg bg-[var(--slot4-accent-fill)] px-8 py-4 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(91,0,255,0.38)]`,
    secondary: `inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-4 text-sm font-black text-white transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]`,
    accent: `inline-flex items-center justify-center rounded-lg bg-[var(--slot4-accent)] px-8 py-4 text-sm font-black text-black transition duration-300 hover:-translate-y-0.5`,
  },
  media: {
    frame: `relative overflow-hidden rounded-lg ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-2 hover:shadow-[0_26px_90px_rgba(0,245,212,0.12)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep all editable visual changes inside src/editable/.',
  'Use the dark teal and violet system for every public route.',
  'Preserve task data, post props, and postHref links.',
  'Render missing images, summaries, and categories with graceful fallbacks.',
  'Use varied post cards: featured, compact, horizontal, editorial, and image-first.',
] as const
