import { useMemo, useState } from 'react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import FilterBar from '../components/FilterBar'
import FilmCard from '../components/FilmCard'
import VideoPlayer from '../components/VideoPlayer'
import { GridLoading, EmptyState } from '../components/States'
import { RevealGroup } from '../components/Reveal'
import { usePortfolioData } from '../lib/PortfolioContext'
import { buildFilters } from '../lib/portfolio'
import { FILM_CATEGORIES } from '../lib/siteConfig'
import { useSEO } from '../lib/useSEO'
import type { Film } from '../types/content'

export default function Cinematography() {
  const { films, loading, settings } = usePortfolioData()

  const [filter, setFilter] = useState('all')
  const [playing, setPlaying] = useState<Film | null>(null)

  const categories = useMemo(() => buildFilters(films, FILM_CATEGORIES), [films])
  const visible = useMemo(
    () => (filter === 'all' ? films : films.filter((f) => f.category === filter)),
    [films, filter],
  )

  useSEO({
    title: 'Cinematography',
    description: `Cinematography and film work by ${settings.name} — cinematic films, event documentation, music videos and commercials.`,
    ogImage: films[0]?.thumb,
  })

  return (
    <>
      <Page>
        <div className="shell">
          <PageHeader
            label="Index — Cinematography"
            title="Cinematography"
            lede="Film is photography extended into time. Selected projects, documented with the same restraint."
            meta={`${films.length} ${films.length === 1 ? 'project' : 'projects'}`}
          />

          <div className="sticky top-[68px] z-30 -mx-[var(--spacing-gutter)] bg-ink/85 px-[var(--spacing-gutter)] pt-8 backdrop-blur-sm">
            <FilterBar options={categories} value={filter} onChange={setFilter} allLabel="All films" />
          </div>

          {loading ? (
            <div className="py-16">
              <GridLoading rows={4} />
            </div>
          ) : visible.length === 0 ? (
            <div className="py-20">
              <EmptyState
                title="No films published yet"
                hint="Upload a video or paste a Cloudinary / Vimeo / YouTube link in Sanity Studio, then publish it."
              />
            </div>
          ) : (
            <RevealGroup key={filter} className="grid gap-x-10 gap-y-16 py-14 md:grid-cols-2" gap={0.12}>
              {visible.map((film, i) => (
                <FilmCard
                  key={film.id}
                  film={film}
                  onOpen={setPlaying}
                  wide
                  /* A lone leftover frame takes the full row, so the grid never
                     ends with a half-empty column. */
                  className={
                    i === visible.length - 1 && visible.length % 2 === 1 ? 'md:col-span-2' : ''
                  }
                />
              ))}
            </RevealGroup>
          )}

          <p className="pb-10 text-xs text-mute/70">
            Films stream directly from the media host. Fullscreen playback is available inside the
            player.
          </p>
        </div>
      </Page>

      <VideoPlayer film={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
