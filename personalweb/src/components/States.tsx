import type { ReactNode } from 'react'
import { isSanityConfigured } from '../lib/sanity'
import { usePortfolioData } from '../lib/PortfolioContext'

/** Suspense-style placeholder while the first CMS response is in flight. */
export function GridLoading({ rows = 6 }: { rows?: number }) {
  return (
    <div className="masonry columns-1 sm:columns-2 lg:columns-3" aria-busy="true" aria-label="Loading work">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-gradient-to-br from-charcoal to-graphite"
          style={{ aspectRatio: i % 3 === 0 ? '3 / 4' : i % 3 === 1 ? '3 / 2' : '1 / 1' }}
        />
      ))}
    </div>
  )
}

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string
  hint?: string
  action?: ReactNode
}) {
  return (
    <div className="border hairline px-8 py-20 text-center">
      <p className="font-display text-3xl">{title}</p>
      {hint && <p className="mx-auto mt-3 max-w-md text-sm text-mute">{hint}</p>}
      {action}
    </div>
  )
}

/**
 * Development-only banner: tells the owner the site is running on bundled
 * sample content and what to do to switch to the CMS.
 */
export function DemoNotice() {
  const { demo, error } = usePortfolioData()
  if (!import.meta.env.DEV) return null
  if (!demo && !error) return null

  return (
    <div className="border-y border-steel/40 bg-steel/10 px-[var(--spacing-gutter)] py-3">
      <p className="mx-auto max-w-[1700px] text-[0.7rem] uppercase tracking-[0.22em] text-cream/80">
        {error
          ? `Content API unreachable (${error}) — showing demo content`
          : isSanityConfigured
            ? 'No published work yet — add documents in Sanity Studio and press Publish'
            : 'Demo content — add VITE_SANITY_PROJECT_ID to .env and publish in Sanity Studio to replace it'}
      </p>
    </div>
  )
}
