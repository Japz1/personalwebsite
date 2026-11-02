import type { ComponentType } from 'react'

/**
 * Brand marks as inline SVG.
 * Lucide deprecated its brand icons (they are scheduled for removal), and the
 * PRD calls for Instagram / WhatsApp links, so they live here instead.
 */

export interface BrandIconProps {
  size?: number
  className?: string
}

export type BrandIcon = ComponentType<BrandIconProps>

export function VallerianLogo({ size = 28, className = '' }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 210 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M61.8 45H84.8L97.9 94.3L77.7 102.5L61.8 45ZM78.8 106.5L98.9 98.1L105 121L125.2 45H148.2L115 165H95L78.8 106.5ZM134.6 45H138L109.1 149.6L105 156.5L105.9 148.4L134.6 45Z"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      />
    </svg>
  )
}

const svg = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export function InstagramIcon({ size = 16, className = '' }: BrandIconProps) {
  return (
    <svg width={size} height={size} {...svg} className={className}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WhatsAppIcon({ size = 16, className = '' }: BrandIconProps) {
  return (
    <svg width={size} height={size} {...svg} className={className}>
      <path d="M3 21l1.6-4.4A8.6 8.6 0 1 1 8 20.2L3 21z" />
      <path d="M9 9.6c.3 2.1 2.3 4.1 4.4 4.4l1-1.3 1.7.9c-.2 1-1.1 1.5-2.1 1.4-2.9-.3-5.6-3-5.9-5.9-.1-1 .4-1.9 1.4-2.1l.9 1.7-1.3 1z" />
    </svg>
  )
}

export function VimeoIcon({ size = 16, className = '' }: BrandIconProps) {
  return (
    <svg width={size} height={size} {...svg} className={className}>
      <path d="M3 8.5c1.5-1.4 3-2.6 4-2.6 1.3 0 1.7 1.6 2 4 .3 2.6.7 4.3 1.7 4.3 1 0 2.6-1.9 3.6-3.6.9-1.6-.3-2-1.3-1.4.6-3 3.2-4.4 4.9-3.4 1.4.8 1.2 3-.3 5.4-1.9 3.1-4.6 7-8 7-2.4 0-3.6-2.6-4.4-5.6L3 8.5z" />
    </svg>
  )
}

export function YouTubeIcon({ size = 16, className = '' }: BrandIconProps) {
  return (
    <svg width={size} height={size} {...svg} className={className}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" />
    </svg>
  )
}

const MARKS = [
  ['instagram', InstagramIcon],
  ['whatsapp', WhatsAppIcon],
  ['vimeo', VimeoIcon],
  ['youtube', YouTubeIcon],
] as const satisfies ReadonlyArray<readonly [string, BrandIcon]>

/** Picks a brand mark from a label or URL, falling back to null. */
export function brandIconFor(label = '', url = ''): BrandIcon | null {
  const haystack = `${label} ${url}`.toLowerCase()
  const match = MARKS.find(([name]) => haystack.includes(name))
  return match ? match[1] : null
}
