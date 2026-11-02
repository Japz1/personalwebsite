import Frame from './Frame'
import { RevealItem } from './Reveal'
import type { Photo } from '../types/content'

interface PhotoCardProps {
  photo: Photo
  index: number
  /** Opens the lightbox at this position of the visible list. */
  onOpen: (index: number) => void
}

/** A single frame in the masonry grid. Whole card is a button → lightbox. */
export default function PhotoCard({ photo, index, onOpen }: PhotoCardProps) {
  return (
    <RevealItem>
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="group block w-full cursor-zoom-in text-left cursor-target"
        data-cursor-label="View"
        aria-label={`Open ${photo.title} in fullscreen viewer`}
      >
        <Frame
          src={photo.thumb}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          imgClassName="reveal-img"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </Frame>

        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg leading-snug text-cream/90 transition-colors group-hover:text-cream">
            {photo.title}
          </h3>
          <p className="shrink-0 text-[0.65rem] uppercase tracking-[0.22em] text-mute">
            {photo.category}
          </p>
        </div>
        {photo.location && <p className="text-xs text-mute/70">{photo.location}</p>}
      </button>
    </RevealItem>
  )
}
