import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Image notes',
    headline: 'Visual stories that support portfolio and profile discovery.',
    description: 'Browse image-led writeups, portfolio notes, and profile context that help visitors understand the work behind each visual.',
    filterLabel: 'Choose image topic',
    secondaryNote: 'Every text page should support image discovery and profile context.',
    chips: ['Image context', 'Profile notes', 'Visual reading'],
  },
  classified: {
    eyebrow: 'Profile notices',
    headline: 'Profile-led opportunities and visual showcase notices.',
    description: 'These posts should stay quick to scan while still pointing visitors toward image galleries, profiles, and portfolio details.',
    filterLabel: 'Filter profile notice category',
    secondaryNote: 'Prioritize profile identity, visual proof, and direct browsing.',
    chips: ['Profile notice', 'Gallery cue', 'Quick scan'],
  },
  sbm: {
    eyebrow: 'Saved visuals',
    headline: 'Saved image and profile references arranged like visual collections.',
    description: 'Bookmark pages should feel like shelves of useful galleries, creator pages, profile references, and visual collections.',
    filterLabel: 'Filter visual collection',
    secondaryNote: 'Curated references need image context and profile metadata.',
    chips: ['Saved galleries', 'Profile refs', 'Visual collection'],
  },
  profile: {
    eyebrow: 'Professional profiles',
    headline: 'Profiles with identity, gallery previews, and trust cues.',
    description: 'Profile pages make people, brands, creators, and businesses discoverable with clear summaries and image-led context.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make identity and credibility visible before the grid begins.',
    chips: ['Identity first', 'Gallery preview', 'Creator/business cards'],
  },
  pdf: {
    eyebrow: 'Profile documents',
    headline: 'Downloadable profile and portfolio documents.',
    description: 'Document pages should support image and profile discovery with media kits, portfolio PDFs, reference sheets, and visual summaries.',
    filterLabel: 'Filter portfolio document',
    secondaryNote: 'Document surfaces need file context, profile value, and clear browsing.',
    chips: ['Portfolio PDF', 'Media kit', 'Profile document'],
  },
  listing: {
    eyebrow: 'Profile directory',
    headline: 'Business and creator profiles built for discovery.',
    description: 'Listing pages should behave like a profile directory with identity cues, gallery previews, metadata, and practical browsing.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Prioritize identity, visual proof, location, and direct action paths.',
    chips: ['Profile directory', 'Gallery preview', 'Business discovery'],
  },
  image: {
    eyebrow: 'Image gallery',
    headline: 'Image posts with a gallery-first portfolio experience.',
    description: 'Image pages lead with visual impact, strong media cards, and a profile-ready browsing rhythm.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery', 'Visual-first', 'Portfolio mood'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
