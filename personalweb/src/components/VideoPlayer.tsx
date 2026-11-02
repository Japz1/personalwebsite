import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, Pause, Play, X } from 'lucide-react'
import { EASE } from '../lib/motion'
import { formatDate } from '../lib/normalize'
import type { Film } from '../types/content'

/**
 * Cinematography viewer (FR-10).
 *
 * Direct files (Cloudinary / Sanity assets) get a custom minimal player:
 * poster, play/pause, scrub bar, mute, fullscreen. Vimeo / YouTube links fall
 * back to the provider's embedded player so nothing breaks.
 */

function seconds(value?: string | null): number {
  if (!value) return 0
  const parts = String(value).split(':').map(Number)
  const [m = 0, s = 0] = parts
  return Number.isFinite(m) && Number.isFinite(s) ? m * 60 + s : 0
}

function clock(value: number): string {
  if (!Number.isFinite(value)) return '0:00'
  const m = Math.floor(value / 60)
  const s = Math.floor(value % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

function DirectPlayer({ film }: { film: Film }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(seconds(film.duration))

  const toggle = useCallback(() => {
    const node = videoRef.current
    if (!node) return
    if (node.paused) {
      node.play().catch(() => {})
    } else {
      node.pause()
    }
  }, [])

  useEffect(() => {
    const node = videoRef.current
    if (!node) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onTime = () => setTime(node.currentTime)
    const onMeta = () => setDuration(node.duration || 0)
    node.addEventListener('play', onPlay)
    node.addEventListener('pause', onPause)
    node.addEventListener('timeupdate', onTime)
    node.addEventListener('loadedmetadata', onMeta)
    return () => {
      node.removeEventListener('play', onPlay)
      node.removeEventListener('pause', onPause)
      node.removeEventListener('timeupdate', onTime)
      node.removeEventListener('loadedmetadata', onMeta)
    }
  }, [])

  const progress = duration ? (time / duration) * 100 : 0

  return (
    <div ref={shellRef} className="relative w-full">
      <video
        ref={videoRef}
        src={film.src}
        poster={film.thumb}
        muted={muted}
        playsInline
        preload="metadata"
        onClick={toggle}
        className="w-full cursor-pointer bg-black outline-none"
        style={{ maxHeight: '72vh' }}
      />

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-4 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="text-cream transition-colors hover:text-steel"
        >
          {playing ? <Pause size={18} strokeWidth={1.2} /> : <Play size={18} strokeWidth={1.2} />}
        </button>

        <div className="relative h-px flex-1 bg-cream/25">
          <div className="absolute inset-y-0 left-0 bg-cream" style={{ width: `${progress}%` }} />
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(event) => {
              const next = Number(event.target.value)
              if (videoRef.current) videoRef.current.currentTime = next
              setTime(next)
            }}
            aria-label="Seek"
            className="absolute -top-2 left-0 h-5 w-full cursor-pointer appearance-none bg-transparent opacity-0"
          />
        </div>

        <span className="tabular-nums text-[0.7rem] tracking-widest text-cream/70">
          {clock(time)} / {clock(duration)}
        </span>

        <button
          type="button"
          onClick={() => setMuted((v) => !v)}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-cream"
        >
          {muted ? 'Sound off' : 'Sound on'}
        </button>

        <button
          type="button"
          onClick={() => {
            /* Fullscreen is a nicety — a rejected request must not throw. */
            void shellRef.current?.requestFullscreen().catch(() => {})
          }}
          aria-label="Fullscreen"
          className="text-cream/70 transition-colors hover:text-cream"
        >
          <Maximize2 size={16} strokeWidth={1.2} />
        </button>
      </div>
    </div>
  )
}

function EmbedPlayer({ film }: { film: Film }) {
  return (
    <div className="relative aspect-video w-full">
      <iframe
        src={film.embed}
        title={film.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0 bg-black"
      />
    </div>
  )
}

interface VideoPlayerProps {
  film: Film | null
  onClose: () => void
}

export default function VideoPlayer({ film, onClose }: VideoPlayerProps) {
  useEffect(() => {
    if (!film) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [film, onClose])

  const meta = film
    ? (
        [
          { label: 'Category', value: film.category },
          { label: 'Year', value: film.year },
          { label: 'Duration', value: film.duration },
          { label: 'Shot', value: formatDate(film.date) },
        ] as const
      ).filter((entry) => Boolean(entry.value))
    : []

  return createPortal(
    <AnimatePresence>
      {film && (
        <motion.div
          key="video-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.28 } }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-ink/97"
          role="dialog"
          aria-modal="true"
          aria-label={film.title}
        >
          <div className="mx-auto flex min-h-full max-w-[1300px] flex-col justify-center px-4 py-16 md:px-10">
            <div className="mb-5 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow">{film.category || 'Film'}</p>
                <h2 className="mt-2 font-display text-3xl md:text-4xl">{film.title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close player"
                className="grid h-10 w-10 shrink-0 place-items-center border hairline text-mute transition-colors hover:text-cream"
              >
                <X size={16} strokeWidth={1.2} />
              </button>
            </div>

            <div className="bg-black">
              {film.embed ? <EmbedPlayer film={film} /> : <DirectPlayer film={film} />}
            </div>

            <div className="mt-6 grid gap-8 border-t hairline pt-6 md:grid-cols-[1fr_auto]">
              {film.description && (
                <p className="max-w-2xl text-sm leading-relaxed text-mute md:text-base">
                  {film.description}
                </p>
              )}
              {meta.length > 0 && (
                <dl className="flex flex-wrap gap-x-10 gap-y-4 md:gap-x-14">
                  {meta.map((entry) => (
                    <div key={entry.label}>
                      <dt className="eyebrow !text-[0.6rem]">{entry.label}</dt>
                      <dd className="mt-1 text-sm text-cream/85">{entry.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {film.credits && (
                <p className="max-w-2xl text-xs leading-relaxed tracking-wide text-mute/80 md:col-span-2">
                  <span className="eyebrow mr-3 !text-[0.6rem]">Credits</span>
                  {film.credits}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
