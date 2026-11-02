import { resolveMedia } from './sanity'
import { OWNER } from './siteConfig'
import type {
  CinematographyProjection,
  Film,
  ImageDimensions,
  Photo,
  PhotographyProjection,
} from '../types/content'

/**
 * Normalises a photography document (CMS or demo) into one predictable shape,
 * so components never have to care where the media came from.
 */
export function asPhoto(item: PhotographyProjection | null | undefined): Photo | null {
  if (!item) return null

  const image = item.image ?? null
  const dims = (item.imageDims ?? image ?? {}) as ImageDimensions
  const url = item.imageRef || resolveMedia(image, { width: 1600 })
  const thumb = resolveMedia(image, { width: 900 })

  return {
    id: item._id || item.slug || url,
    title: item.title || 'Untitled',
    slug: item.slug || '',
    description: item.description || '',
    category: item.category || '',
    location: item.location || '',
    date: item.captureDate || item.publishedAt || '',
    featured: Boolean(item.featured),
    url,
    thumb: thumb || url,
    alt: item.imageAlt || `${item.title || 'Photograph'} by ${OWNER.name}`,
    width: dims.width || dims.w || null,
    height: dims.height || dims.h || null,
  }
}

const YOUTUBE = /(?:youtube\.com\/(?:watch|embed|shorts)|youtu\.be\/)/i
const VIMEO = /vimeo\.com\/\d+/i

function youtubeId(url: string): string {
  return url.match(/(?:v=|embed\/|shorts\/|youtu\.be\/)([\w-]{6,20})/)?.[1] || ''
}

/** Resolves the playback source for a film: direct file, Vimeo, or YouTube. */
export function asFilm(item: CinematographyProjection | null | undefined): Film | null {
  if (!item) return null

  const raw = item.videoUrl || resolveMedia(item.video) || ''
  const thumb = item.thumbnailUrl || resolveMedia(item.thumbnail, { width: 1280 })
  const embed = YOUTUBE.test(raw)
    ? `https://www.youtube-nocookie.com/embed/${youtubeId(raw)}?rel=0`
    : VIMEO.test(raw)
      ? raw.replace(/#.*$/, '')
      : ''

  return {
    id: item._id || item.slug || raw,
    title: item.title || 'Untitled film',
    slug: item.slug || '',
    description: item.description || '',
    category: item.category || '',
    credits: item.credits || '',
    date: item.productionDate || '',
    year: String(item.productionDate || '').slice(0, 4),
    duration: item.duration || '',
    featured: Boolean(item.featured),
    src: raw,
    embed,
    isDirect: Boolean(raw) && !embed,
    thumb,
    alt: item.title || `Cinematography project by ${OWNER.name}`,
  }
}

/** Maps a projection list to normalised models, dropping unusable entries. */
export function asPhotos(items: readonly PhotographyProjection[]): Photo[] {
  return items.map(asPhoto).filter((photo): photo is Photo => photo !== null)
}

export function asFilms(items: readonly CinematographyProjection[]): Film[] {
  return items.map(asFilm).filter((film): film is Film => film !== null)
}

export function formatYear(value: string | null | undefined): string {
  if (!value) return ''
  return String(value).slice(0, 4)
}

export function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
