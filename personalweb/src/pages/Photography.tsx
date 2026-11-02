import { useMemo, useState } from 'react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import FilterBar from '../components/FilterBar'
import PhotoCard from '../components/PhotoCard'
import Lightbox from '../components/Lightbox'
import { GridLoading, EmptyState } from '../components/States'
import { RevealGroup } from '../components/Reveal'
import { usePortfolioData } from '../lib/PortfolioContext'
import { buildFilters } from '../lib/portfolio'
import { PHOTO_CATEGORIES } from '../lib/siteConfig'
import { useSEO } from '../lib/useSEO'

export default function Photography() {
  const { photos, loading, settings } = usePortfolioData()

  const [filter, setFilter] = useState('all')
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const categories = useMemo(() => buildFilters(photos, PHOTO_CATEGORIES), [photos])
  const visible = useMemo(
    () => (filter === 'all' ? photos : photos.filter((p) => p.category === filter)),
    [photos, filter],
  )

  useSEO({
    title: 'Photography',
    description: `Photography archive by ${settings.name} — portrait, street, landscape, event, architecture and experimental work.`,
    ogImage: photos[0]?.url,
  })

  return (
    <>
      <Page>
        <div className="shell">
          <PageHeader
            label="Index — Photography"
            title="Photography"
            lede="Everything I have kept: commissions, documentary work, and frames made for no reason but the light."
            meta={`${photos.length} ${photos.length === 1 ? 'frame' : 'frames'}`}
          />

          <div className="sticky top-[68px] z-30 -mx-[var(--spacing-gutter)] bg-ink/85 px-[var(--spacing-gutter)] pt-8 backdrop-blur-sm">
            <FilterBar options={categories} value={filter} onChange={setFilter} />
          </div>

          {loading ? (
            <div className="py-16">
              <GridLoading rows={9} />
            </div>
          ) : visible.length === 0 ? (
            <div className="py-20">
              <EmptyState
                title="Nothing published here yet"
                hint="Add photography in Sanity Studio and press Publish — it appears on this page automatically."
              />
            </div>
          ) : (
            <RevealGroup
              key={filter}
              className="masonry columns-1 py-14 sm:columns-2 lg:columns-3"
              gap={0.07}
            >
              {visible.map((photo, i) => (
                <PhotoCard key={photo.id} photo={photo} index={i} onOpen={setActiveIndex} />
              ))}
            </RevealGroup>
          )}
        </div>
      </Page>

      <Lightbox
        photos={visible}
        index={activeIndex}
        onIndexChange={setActiveIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  )
}
