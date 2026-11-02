import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import type { Film, Photo, PortfolioPayload, SiteProfile } from '../types/content'
import { client, isSanityConfigured } from './sanity'
import { DEMO_STATE, fetchPortfolio } from './portfolio'
import { asFilms, asPhotos } from './normalize'

/**
 * One fetch + one live subscription for the whole app.
 *
 * React Query owns caching and refetching; `client.listen` (Sanity Server
 * Events) invalidates the cache the moment the owner publishes, so new work
 * shows up without a rebuild or redeploy (FR-06).
 */

export const PORTFOLIO_QUERY_KEY = ['portfolio'] as const

/** Normalised, ready-to-render view of the payload. Pages never see raw CMS shapes. */
export interface PortfolioView {
  photos: Photo[]
  films: Film[]
  featuredPhotos: Photo[]
  featuredFilms: Film[]
  settings: SiteProfile
  loading: boolean
  /** True while demo content stands in for unpublished work. */
  demo: boolean
  error: string | null
}

const PortfolioContext = createContext<PortfolioView | null>(null)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /* Content changes are pushed, so polling would only waste bandwidth. */
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function usePortfolioView(): PortfolioView {
  const { data, isPending, isError, error } = useQuery<PortfolioPayload>({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: fetchPortfolio,
    enabled: isSanityConfigured,
  })

  /* Publishes and edits invalidate the single portfolio query. */
  useEffect(() => {
    if (!isSanityConfigured || !client) return
    const subscription = client
      .listen(
        '*[_type in ["photography", "cinematography", "siteSettings"]]',
        {},
        { includeDrafts: false, events: ['mutation'] },
      )
      .subscribe({
        next: () => queryClient.invalidateQueries({ queryKey: PORTFOLIO_QUERY_KEY }),
        error: () => {
          /* Live updates are an optimisation — polling and a reload still work. */
        },
      })

    return () => subscription.unsubscribe()
  }, [])

  return useMemo<PortfolioView>(() => {
    /* Demo mode, or a failed request: never leave the site blank. */
    const payload = data ?? DEMO_STATE
    const fallback = isSanityConfigured && (isError || !data)

    return {
      photos: asPhotos(payload.photos),
      films: asFilms(payload.films),
      featuredPhotos: asPhotos(payload.featuredPhotos),
      featuredFilms: asFilms(payload.featuredFilms),
      settings: payload.settings,
      loading: isSanityConfigured && isPending,
      demo: payload.demo === true || fallback || !isSanityConfigured,
      error: isError && error ? (error instanceof Error ? error.message : String(error)) : null,
    }
  }, [data, isPending, isError, error])
}

function PortfolioValue({ children }: { children: ReactNode }) {
  const value = usePortfolioView()
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioValue>{children}</PortfolioValue>
    </QueryClientProvider>
  )
}

export function usePortfolioData(): PortfolioView {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolioData must be used inside <PortfolioProvider>')
  return ctx
}
