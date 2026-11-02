import { useState, type CSSProperties, type ReactNode } from 'react'

interface FrameProps {
  src?: string | null
  alt?: string
  width?: number | null
  height?: number | null
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  objectFit?: CSSProperties['objectFit']
  children?: ReactNode
}

/**
 * Lazy image frame.
 *
 * Reserves the aspect ratio up front (no layout jump in the masonry grid) and
 * fades the picture in once decoded. `priority` is used only above the fold.
 */
export default function Frame({
  src,
  alt = '',
  width,
  height,
  sizes,
  priority = false,
  className = '',
  imgClassName = '',
  objectFit = 'cover',
  children,
}: FrameProps) {
  const [loaded, setLoaded] = useState(false)

  const ratio = width && height ? `${width} / ${height}` : undefined

  return (
    <div
      className={`relative overflow-hidden bg-graphite ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {/* placeholder */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100 animate-pulse'
        }`}
        style={{
          background: 'linear-gradient(110deg, #1b1b1b 30%, #262626 50%, #1b1b1b 70%)',
          backgroundSize: '220% 100%',
        }}
      />

      {src ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          width={width ?? undefined}
          height={height ?? undefined}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`relative h-full w-full transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
          } ${imgClassName}`}
          style={{ objectFit }}
        />
      ) : null}

      {children}
    </div>
  )
}
