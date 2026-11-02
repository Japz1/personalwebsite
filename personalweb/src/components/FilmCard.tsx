import { Play } from 'lucide-react'
import Frame from './Frame'
import { RevealItem } from './Reveal'
import type { Film } from '../types/content'

interface FilmCardProps {
  film: Film
  onOpen: (film: Film) => void
  /** 16:9 rather than 4:3, for the home page's two-column row. */
  wide?: boolean
  className?: string
}

/** Thumbnail card for a cinematography project; opens the player. */
export default function FilmCard({ film, onOpen, wide = false, className = '' }: FilmCardProps) {
  return (
    <RevealItem className={className}>
      <button
        type="button"
        onClick={() => onOpen(film)}
        className="group block w-full text-left"
        aria-label={`Play ${film.title}`}
      >
        <Frame
          src={film.thumb}
          alt={film.alt}
          width={wide ? 1600 : 1280}
          height={wide ? 900 : 720}
          sizes="(min-width: 1024px) 50vw, 100vw"
          imgClassName="reveal-img !grayscale-[0.45]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

          <span className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full border border-cream/45 bg-ink/25 backdrop-blur-[2px] transition-all duration-700 group-hover:border-cream group-hover:bg-cream group-hover:text-ink">
              <Play size={18} strokeWidth={1} className="ml-0.5 translate-x-px" />
            </span>
          </span>

          {film.duration && (
            <span className="absolute bottom-3 right-3 bg-ink/75 px-2 py-1 text-[0.65rem] tracking-[0.18em] text-cream/85">
              {film.duration}
            </span>
          )}
        </Frame>

        <div className="mt-4 flex items-baseline justify-between gap-6">
          <div className="min-w-0">
            <h3 className="truncate font-display text-xl text-cream/90 transition-colors group-hover:text-cream">
              {film.title}
            </h3>
            {film.description && (
              <p className="mt-1 line-clamp-2 text-sm text-mute">{film.description}</p>
            )}
          </div>
          <p className="shrink-0 text-[0.65rem] uppercase tracking-[0.22em] text-mute">
            {film.year || film.category}
          </p>
        </div>
      </button>
    </RevealItem>
  )
}
