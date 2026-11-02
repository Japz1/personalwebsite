import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Info, X } from 'lucide-react'
import Frame from './Frame'
import { EASE } from '../lib/motion'
import { formatDate } from '../lib/normalize'
import type { Photo } from '../types/content'

interface LightboxProps {
  photos: readonly Photo[]
  /** `null` keeps the viewer closed. */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

/**
 * Fullscreen image viewer with keyboard, swipe-free next/prev, caption and
 * project information (FR-09).
 */
export default function Lightbox({ photos, index, onIndexChange, onClose }: LightboxProps) {
  const [showInfo, setShowInfo] = useState(true)

  const position = index === null ? -1 : index
  const photo = position >= 0 ? (photos[position] ?? null) : null
  const open = photo !== null

  const step = useCallback(
    (delta: number) => {
      if (!photos.length || index === null) return
      onIndexChange((index + delta + photos.length) % photos.length)
    },
    [index, onIndexChange, photos],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === 'i') setShowInfo((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [open, onClose, step])

  const facts = open
    ? (
        [
          { label: 'Category', value: photo.category },
          { label: 'Location', value: photo.location },
          { label: 'Captured', value: formatDate(photo.date) },
        ] as const
      ).filter((fact) => Boolean(fact.value))
    : []

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.45, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: EASE } }}
          className="fixed inset-0 z-[70] bg-ink/97 grain"
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
        >
          {/* Top bar */}
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 md:px-10">
            <p className="eyebrow">
              {String(position + 1).padStart(2, '0')}
              <span className="mx-2 text-mute/60">/</span>
              {String(photos.length).padStart(2, '0')}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowInfo((v) => !v)}
                aria-pressed={showInfo}
                className="grid h-10 w-10 place-items-center border hairline text-mute transition-colors hover:text-cream"
                aria-label="Toggle project information"
              >
                <Info size={15} strokeWidth={1.2} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center border hairline text-mute transition-colors hover:text-cream"
                aria-label="Close viewer"
              >
                <X size={16} strokeWidth={1.2} />
              </button>
            </div>
          </div>

          {/* Image stage */}
          <div className="absolute inset-0 grid place-items-center px-4 pb-28 pt-20 md:px-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } }}
                exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.2 } }}
                className="max-h-full"
              >
                <Frame
                  src={photo.url}
                  alt={photo.alt}
                  priority
                  objectFit="contain"
                  className="!bg-transparent max-h-[72vh] w-auto"
                  imgClassName="!w-auto !h-auto max-h-[72vh] max-w-[92vw] md:max-w-[calc(100vw-12rem)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center text-mute transition-colors hover:text-cream md:left-6"
          >
            <ChevronLeft size={26} strokeWidth={1} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center text-mute transition-colors hover:text-cream md:right-6"
          >
            <ChevronRight size={26} strokeWidth={1} />
          </button>

          {/* Caption + project information */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                key="caption"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
                exit={{ opacity: 0, y: 18, transition: { duration: 0.25 } }}
                className="absolute inset-x-0 bottom-0 border-t hairline bg-gradient-to-t from-ink via-ink/85 to-transparent px-5 pb-7 pt-8 md:px-10"
              >
                <div className="mx-auto flex max-w-[1400px] flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-12">
                  <div className="max-w-xl">
                    <h2 className="font-display text-3xl leading-tight">{photo.title}</h2>
                    {photo.description && (
                      <p className="mt-2 text-sm text-mute">{photo.description}</p>
                    )}
                  </div>
                  <dl className="grid grid-cols-2 gap-x-10 gap-y-3 text-right sm:grid-cols-3">
                    {facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="eyebrow !text-[0.6rem]">{fact.label}</dt>
                        <dd className="mt-1 text-sm text-cream/85">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
