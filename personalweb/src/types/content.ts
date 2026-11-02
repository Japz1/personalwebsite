/**
 * Types for everything that crosses the CMS boundary.
 *
 * Two layers on purpose:
 *  1. `*Projection` — the shape returned by the GROQ queries in lib/queries.ts
 *     (fields are renamed/flattened there, so it is NOT the raw document).
 *  2. `Photo` / `Film` — normalised, non-optional where the UI needs a value,
 *     which is what components actually consume.
 */

export interface SanityRef {
  _ref: string
  _type?: string
}

/** Anything a Sanity asset reference or a plain hosted file can look like. */
export interface MediaObject {
  _type?: string
  asset?: SanityRef | { url?: string; _id?: string }
  url?: string
  width?: number | null
  height?: number | null
}

/**
 * Union of every media shape the site accepts: a Sanity image/file field, a
 * Sanity asset reference, a Cloudinary URL, or the plain `{ url }` objects the
 * demo content uses. Deliberately structural rather than imported from
 * @sanity/image-url, so a package bump cannot break the data layer.
 */
export type MediaValue = string | MediaObject | null | undefined

export interface ImageDimensions {
  w?: number | null
  h?: number | null
  width?: number | null
  height?: number | null
}

/* ------------------------------------------------------------------ *
 * 1. Query projections
 * ------------------------------------------------------------------ */

export interface PhotographyProjection {
  _id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  category?: string | null
  location?: string | null
  captureDate?: string | null
  featured?: boolean | null
  publishedAt?: string | null
  image?: MediaValue
  imageRef?: string | null
  imageAlt?: string | null
  imageDims?: ImageDimensions | null
}

export interface CinematographyProjection {
  _id: string
  title?: string | null
  slug?: string | null
  description?: string | null
  category?: string | null
  productionDate?: string | null
  credits?: string | null
  featured?: boolean | null
  duration?: string | null
  video?: MediaValue
  videoUrl?: string | null
  thumbnail?: MediaValue
  thumbnailUrl?: string | null
}

export interface SocialLink {
  label: string
  url: string
  handle?: string | null
}

export interface ExperienceEntry {
  period?: string | null
  role?: string | null
  place?: string | null
  description?: string | null
}

export interface SiteSettingsProjection {
  name?: string | null
  initials?: string | null
  role?: string | null
  tagline?: string | null
  intro?: string | null
  bio?: string | string[] | null
  email?: string | null
  phone?: string | null
  phoneDisplay?: string | null
  instagram?: string | null
  location?: string | null
  availability?: string | null
  portrait?: string | null
  socials?: SocialLink[] | null
  skills?: string[] | null
  equipment?: string[] | null
  experience?: ExperienceEntry[] | null
  heroMedia?: MediaValue
  heroImageUrl?: string | null
  heroVideo?: MediaValue
  heroVideoUrl?: string | null
}

/* ------------------------------------------------------------------ *
 * 2. Normalised models used by components
 * ------------------------------------------------------------------ */

export interface Photo {
  id: string
  title: string
  slug: string
  description: string
  category: string
  location: string
  date: string
  featured: boolean
  /** Full resolution, for the lightbox. */
  url: string
  /** Grid-sized rendition. */
  thumb: string
  alt: string
  width: number | null
  height: number | null
}

export interface Film {
  id: string
  title: string
  slug: string
  description: string
  category: string
  credits: string
  date: string
  year: string
  duration: string
  featured: boolean
  /** Direct file URL (Cloudinary / Sanity asset). */
  src: string
  /** Non-empty when the source is a Vimeo or YouTube page. */
  embed: string
  isDirect: boolean
  thumb: string
  alt: string
}

export interface HeroMedia {
  image: string
  video: string
  portrait: string
}

/** Everything the site knows about the owner, after defaults are merged. */
export interface SiteProfile {
  name: string
  initials: string
  role: string
  tagline: string
  intro: string
  bio: string | string[]
  location: string
  availability: string
  email: string
  phone: string
  phoneDisplay: string
  /** Derived from `phone`, so the CMS never has to maintain two fields. */
  whatsappLink: string
  instagram: string
  socials: SocialLink[]
  skills: string[]
  equipment: string[]
  experience: ExperienceEntry[]
  hero: HeroMedia
  /** CMS-only fields kept loose because they arrive as assets or URLs. */
  heroImageUrl?: string
  heroVideoUrl?: string
  heroMedia?: MediaValue
  heroVideo?: MediaValue
  portrait?: string
}

/** The single payload the app renders from. */
export interface PortfolioPayload {
  photos: PhotographyProjection[]
  films: CinematographyProjection[]
  featuredPhotos: PhotographyProjection[]
  featuredFilms: CinematographyProjection[]
  settings: SiteProfile
  /** True when nothing is published yet, so demo content is being shown. */
  demo?: boolean
}

/** Overlay state for the home page viewers (gallery pages keep local state). */
export type Viewer =
  | { kind: 'photos'; list: Photo[]; index: number }
  | { kind: 'film'; film: Film }
  | null
