import imageUrlBuilder from '@sanity/image-url'
import { createClient, type SanityClient } from '@sanity/client'
import type { MediaObject, MediaValue, SanityRef } from '../types/content'

/**
 * Sanity client — configured entirely from environment variables.
 * No credentials are hard coded (PRD §7.3).
 *
 * When VITE_SANITY_PROJECT_ID is empty the app runs in "demo mode" and the
 * data layer falls back to the sample content in src/data/demo.ts, so the site
 * is always previewable before the CMS exists.
 */
export interface SanityConfig {
  projectId: string
  dataset: string
  apiVersion: string
  token?: string
  useCdn: boolean
}

export const sanityConfig: SanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? '',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? '2025-02-19',
  token: import.meta.env.VITE_SANITY_READ_TOKEN || undefined,
  useCdn: true,
}

export const isSanityConfigured = sanityConfig.projectId.length > 0

/** `null` in demo mode — every consumer must handle that. */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({ ...sanityConfig, stega: false })
  : null

/* Inferred, because the package does not export its builder type from the root. */
const builder = client ? imageUrlBuilder(client) : null

const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? ''

const VIDEO_EXT = /\.(mp4|mov|m4v|webm)(\?|$)/i

function isCloudinaryUrl(value: string): boolean {
  return /res\.(cloudinary|delivery)\.com/.test(value) || /\/image\/upload/.test(value)
}

/** Injects quality/size flags into a Cloudinary image URL. */
function optimiseCloudinary(url: string, options: MediaOptions): string {
  if (/[?/]f_auto|q_auto|q_[a-z0-9:]+/i.test(url)) return url
  const quality = typeof options.quality === 'string' ? options.quality : 'auto:good'
  const flags = [`q_${quality}`]
  if (options.width) flags.push(`w_${options.width}`, 'c_limit')
  return url.replace('/upload/', `/upload/${flags.join(',')}/`)
}

export interface MediaOptions {
  width?: number
  height?: number
  /** A number for Sanity assets, or a Cloudinary token such as "auto:good". */
  quality?: number | string
  /** Set false to skip `auto:format` negotiation. */
  format?: boolean
}

function hasRef(value: MediaObject): value is MediaObject & { asset: SanityRef } {
  const asset = value.asset
  return Boolean(asset && typeof asset === 'object' && '_ref' in asset && asset._ref)
}

/**
 * Resolves any supported media shape into a usable URL: Sanity image
 * references (transformed through the CDN), Sanity file objects, Cloudinary
 * URLs, and plain remote URLs used by the demo content.
 */
export function resolveMedia(source: MediaValue, options: MediaOptions = {}): string {
  if (!source) return ''

  if (typeof source === 'string') {
    if (CLOUDINARY_CLOUD && isCloudinaryUrl(source) && !VIDEO_EXT.test(source)) {
      return optimiseCloudinary(source, options)
    }
    return source
  }

  const value = source as MediaObject

  if (typeof value.url === 'string' && value.url.length > 0) return value.url

  if (value.asset && typeof value.asset === 'object' && 'url' in value.asset) {
    return value.asset.url ?? ''
  }

  if (builder && hasRef(value)) {
    // Structural MediaObject → the builder's own reference type.
    let url = builder.image(value as { asset: { _ref: string } })
    if (options.width) url = url.width(options.width)
    if (options.height) url = url.height(options.height)
    if (options.format !== false) url = url.auto('format')
    if (typeof options.quality === 'number') url = url.quality(options.quality)
    return url.url()
  }

  return ''
}

/** Original asset URL, without transformation parameters. */
export function originalUrl(source: MediaValue): string {
  return resolveMedia(source, { format: false })
}
