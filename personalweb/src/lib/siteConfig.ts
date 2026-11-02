import type { ExperienceEntry, HeroMedia, SiteProfile, SocialLink } from '../types/content'
import { DEMO_HERO } from '../data/demo'

/**
 * Static site identity & navigation.
 *
 * Everything here can be overridden from the CMS (sanity → siteSettings),
 * which is why the data layer merges these values as defaults.
 *
 * NOTE: the biography, experience, equipment and contact values below are
 * editorial PLACEHOLDERS so the layout can be reviewed. Replace them with
 * the real content in Sanity Studio → "Site settings" before going live.
 */

/** SiteProfile minus the derived WhatsApp URL. */
export type OwnerProfile = Omit<SiteProfile, 'whatsappLink'>

export const OWNER: OwnerProfile = {
  name: 'Vallerian Dava Dayoh',
  initials: 'VDD',
  role: 'Photographer / Cinematographer / Visual Storyteller',
  tagline: 'Capturing moments, preserving stories.',
  intro: 'I make images that hold onto the in-between moments — the light before it goes, the gesture just before it is remembered.',
  bio: [
    'Vallerian Dava Dayoh is a photographer and cinematographer working between documentary stills and cinematic moving image. His practice begins with observation: patience, available light, and a respect for the people in front of the lens.',
    'Across portrait, street, and landscape work he looks for the frame that feels inevitable — quiet, editorial, and honest. In film he extends the same attention into time, building sequences where sound, colour, and restraint carry the story.',
    'This portfolio is a living archive of that journey. Each photo and project is kept here with the same care it was made with.',
  ],
  location: 'Manado, Indonesia',
  availability: 'Open for commissions and collaborations',
  email: 'valleriandayoh@gmail.com',
  phone: '6285849549846',
  phoneDisplay: '+62 858 4954 9846',
  instagram: 'joshuadyh_',
  socials: [
    { label: 'Instagram', handle: '@vallerian.d', url: 'https://instagram.com/vallerian.d' },
    { label: 'Vimeo', handle: 'Vallerian Dayoh', url: 'https://vimeo.com/' },
    { label: 'YouTube', handle: 'Vallerian Dayoh', url: 'https://youtube.com/@' },
    { label: 'Behance', handle: 'vallerian', url: 'https://behance.net/' },
  ] satisfies SocialLink[],
  skills: [
    'Editorial & documentary photography',
    'Cinematic direction & camera operation',
    'Colour grading & post production',
    'Lighting for available-light scenes',
    'Story & sequence building',
    'Sound-aware editing',
  ],
  equipment: [
    'Sony α7 series bodies',
    'Prime glass 24 / 35 / 50 / 85',
    'Manual cine primes for film work',
    'Gimbal & slider setups',
    'DaVinci Resolve grading suite',
    'Adobe Lightroom / Photoshop',
  ],
  experience: [
    {
      period: '2025 — now',
      role: 'Independent photographer & cinematographer',
      place: 'Freelance',
      description: 'Portrait, event, and commercial commissions across photography and film.',
    },
    {
      period: '2024 — 2025',
      role: 'Visual documentation',
      place: 'Events & campaigns',
      description: 'Covering events and short-form campaigns end to end: shot list, capture, edit, delivery.',
    },
    {
      period: '2023 — now',
      role: 'Personal projects',
      place: 'Street & landscape',
      description: 'Ongoing self-initiated series on light, memory, and public space.',
    },
  ] satisfies ExperienceEntry[],
  hero: DEMO_HERO satisfies HeroMedia,
}

export interface NavItem {
  to: string
  label: string
}

export const NAV: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/photography', label: 'Photography' },
  { to: '/cinematography', label: 'Cinematography' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export const PHOTO_CATEGORIES: readonly string[] = [
  'Portrait',
  'Street Photography',
  'Landscape',
  'Event',
  'Architecture',
  'Experimental',
]

export const FILM_CATEGORIES: readonly string[] = [
  'Cinematic Film',
  'Event Documentation',
  'Music Video',
  'Commercial',
  'Personal Project',
]

export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'

/** wa.me only accepts digits, so the CMS can store the number however it likes. */
export function whatsappLinkFor(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : 'https://wa.me/'
}

export function emailLinkFor(email: string): string {
  return `mailto:${email}`
}

export const WHATSAPP_LINK = whatsappLinkFor(OWNER.phone)
export const EMAIL_LINK = emailLinkFor(OWNER.email)
