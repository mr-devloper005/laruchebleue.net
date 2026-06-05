import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Image galleries and professional profile discovery',
      description: 'Discover image-rich galleries, portfolio posts, and profile pages for creators, professionals, and businesses.',
      openGraphTitle: 'Image galleries and professional profile discovery',
      openGraphDescription: 'Explore visual portfolios, image posts, and professional profile pages in one polished directory.',
      keywords: ['image gallery', 'profile directory', 'visual portfolio', 'professional profiles'],
    },
    hero: {
      badge: 'Image and profile discovery',
      title: ['Image Galleries for', 'Professional Profiles'],
      description: 'Explore image-rich portfolio posts and profile pages built for creators, freelancers, teams, and businesses.',
      primaryCta: { label: 'Browse Images', href: '/image' },
      secondaryCta: { label: 'Explore Profiles', href: '/profile' },
      searchPlaceholder: 'Search images, galleries, portfolios, and profiles',
      focusLabel: 'Focus',
      featureCardBadge: 'Featured visual',
      featureCardTitle: 'A strong first impression for every image and profile.',
      featureCardDescription: 'Large visuals, profile context, and clear actions help visitors discover the right portfolio faster.',
    },
    intro: {
      badge: 'What we do',
      title: 'A high-contrast home for image posts and profile pages.',
      paragraphs: [
        'The site brings image posts and profile pages together in one visual browsing experience.',
        'Visitors can move from a gallery image to a professional profile without losing context.',
        'Every section is designed to make visual portfolios immediate, polished, and easy to scan.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Image-led discovery with bold cards and gallery strips.',
        'Profile pages that stay useful even when optional fields are missing.',
        'Search, category chips, and pagination styled for quick image and profile browsing.',
        'Responsive layouts built for portfolios and profiles on mobile and desktop.',
      ],
      primaryLink: { label: 'Browse images', href: '/image' },
      secondaryLink: { label: 'See profiles', href: '/profile' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Find the next image gallery or profile worth opening.',
      description: 'Move between image posts, visual portfolios, and professional profiles through one clear visual system.',
      primaryCta: { label: 'Browse Images', href: '/image' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About us',
    title: 'A cinematic discovery space for image galleries and professional profiles.',
    description: `${slot4BrandConfig.siteName} presents visual portfolios, profile pages, and image-led posts through a polished public browsing experience.`,
    paragraphs: [
      'The experience is designed for creative professionals, freelancers, visual teams, and businesses that want discovery to feel direct and refined.',
      'Images stay prominent, profiles remain easy to scan, and every page keeps enough context to be useful.',
    ],
    values: [
      {
        title: 'Visual first',
        description: 'Large media, clean overlays, and strong contrast help creative work stand out quickly.',
      },
      {
        title: 'Profile ready',
        description: 'Identity, summary, contact, and gallery fields are arranged to work even when some optional details are missing.',
      },
      {
        title: 'Easy discovery',
        description: 'Search, categories, and related profiles keep visitors moving naturally through the gallery archive.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Tell us what image gallery or profile you want to showcase.',
    description: 'Share a short note about your portfolio, profile page, visual campaign, or gallery request.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search image galleries, portfolio posts, and professional profiles across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find image galleries and professional profiles faster.',
      description: 'Use keywords, categories, and gallery types to discover image posts, portfolios, and profiles.',
      placeholder: 'Search by profile, gallery, category, or title',
    },
    resultsTitle: 'Latest image and profile results',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit image posts and profile pages for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create image and profile content.',
      description: 'Use your account to open the image and profile workspace and create image posts or profile pages.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create a polished image post or profile page.',
      description: 'Choose the image or profile type, add profile details, upload imagery, and prepare a clean public entry.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit image/profile',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your image and profile workspace.',
      description: 'Login to browse galleries, manage profile submissions, and create visual content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start showcasing images.',
      description: 'Create an account to access the profile workspace, save details, and submit image-led content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related image posts',
      fallbackTitle: 'Image post details',
    },
    listing: {
      relatedTitle: 'Related profiles',
      fallbackTitle: 'Profile listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
