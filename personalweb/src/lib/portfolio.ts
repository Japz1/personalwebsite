import type {
  CinematographyProjection,
  HeroMedia,
  PhotographyProjection,
  PortfolioPayload,
  SiteProfile,
  SiteSettingsProjection,
} from '../types/content'
import { client } from './sanity'
import { OWNER, whatsappLinkFor } from './siteConfig'
import {
  CINEMATOGRAPHY_FEATURED_QUERY,
  CINEMATOGRAPHY_QUERY,
  PHOTOGRAPHY_FEATURED_QUERY,
  PHOTOGRAPHY_QUERY,
  SITE_SETTINGS_QUERY,
} from './queries'
import {
  DEMO_CINEMATOGRAPHY,
  DEMO_HERO,
  DEMO_PAYLOAD_FILMS,
  DEMO_PAYLOAD_PHOTOS,
  DEMO_PHOTOGRAPHY,
} from '../data/demo'

/**
 * Data access layer — no React in here on purpose, so the same functions can be
 * used by the query hooks, and so the fallback rules stay easy to read.
 *
 * - CMS not configured → demo content, so the site is always presentable.
 * - CMS configured     → published documents, refreshed live from
 *   `client.listen` (see PortfolioContext), so new work appears on the site
 *   without a rebuild or redeploy (FR-06).
 */

/** CMS fields are sparse — only override defaults with values actually set. */
function isFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'string') return value.trim().length > 0
  return true
}

function heroFrom(cms: SiteSettingsProjection | null): HeroMedia {
  const hero = { ...DEMO_HERO }
  if (!cms) return hero
  if (isFilled(cms.heroImageUrl)) hero.image = String(cms.heroImageUrl)
  if (isFilled(cms.heroVideoUrl)) hero.video = String(cms.heroVideoUrl)
  if (isFilled(cms.portrait)) hero.portrait = String(cms.portrait)
  return hero
}

/**
 * Site identity = static defaults merged with whatever the owner has actually
 * filled in under Sanity → Site settings. Empty CMS fields never blank the UI.
 */
export function mergeSettings(cms: SiteSettingsProjection | null = null): SiteProfile {
  const base: Record<string, unknown> = { ...OWNER }

  if (cms) {
    for (const [key, value] of Object.entries(cms)) {
      if (key === 'heroMedia' || key === 'heroVideo') continue
      if (isFilled(value)) base[key] = value
    }
  }

  base.hero = heroFrom(cms)
  base.portrait = isFilled(cms?.portrait) ? cms?.portrait : OWNER.portrait
  base.whatsappLink = whatsappLinkFor(String(base.phone ?? ''))

  return base as unknown as SiteProfile
}

export const DEMO_STATE: PortfolioPayload = {
  photos: DEMO_PHOTOGRAPHY,
  films: DEMO_CINEMATOGRAPHY,
  featuredPhotos: DEMO_PAYLOAD_PHOTOS,
  featuredFilms: DEMO_PAYLOAD_FILMS,
  settings: mergeSettings(),
}

/** Everything the app renders, fetched in one round of parallel queries. */
export async function fetchPortfolio(): Promise<PortfolioPayload> {
  if (!client) return DEMO_STATE

  const [photos, films, featuredPhotos, featuredFilms, settings] = await Promise.all([
    client.fetch<PhotographyProjection[]>(PHOTOGRAPHY_QUERY),
    client.fetch<CinematographyProjection[]>(CINEMATOGRAPHY_QUERY),
    client.fetch<PhotographyProjection[]>(PHOTOGRAPHY_FEATURED_QUERY),
    client.fetch<CinematographyProjection[]>(CINEMATOGRAPHY_FEATURED_QUERY),
    client.fetch<SiteSettingsProjection | null>(SITE_SETTINGS_QUERY).catch(() => null),
  ])

  const hasContent = Boolean(photos?.length || films?.length)

  return {
    photos: photos ?? [],
    films: films ?? [],
    featuredPhotos: featuredPhotos ?? [],
    featuredFilms: featuredFilms ?? [],
    settings: mergeSettings(settings),
    demo: !hasContent,
  }
}

/** Category list for a filter bar: CMS-curated order first, then anything extra. */
export function buildFilters(
  items: readonly { category?: string | null }[],
  preferred: readonly string[] = [],
): string[] {
  const titles: string[] = []
  preferred.forEach((title) => {
    if (items.some((item) => item.category === title)) titles.push(title)
  })
  items.forEach((item) => {
    if (item.category && !titles.includes(item.category)) titles.push(item.category)
  })
  return titles
}
