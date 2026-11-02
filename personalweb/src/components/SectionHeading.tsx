import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Editorial numbering, e.g. `"01"`. */
  index?: string | number
  label: string
  title: string
  description?: string
  to?: string
  linkLabel?: string
}

/** Editorial section opener: numbered label, display heading, optional link. */
export default function SectionHeading({
  index,
  label,
  title,
  description,
  to,
  linkLabel,
}: SectionHeadingProps) {
  return (
    <Reveal className="flex flex-col gap-6 border-b hairline pb-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow flex items-center gap-3">
          {index !== undefined && index !== '' && <span className="text-steel">{index}</span>}
          {label}
        </p>
        <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.02]">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-sm text-mute md:text-base">{description}</p>}
      </div>

      {to && (
        <Link
          to={to}
          className="group inline-flex shrink-0 items-center gap-2 self-start border border-transparent px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.28em] text-cream transition-colors hover:border-cream/25 md:self-auto"
        >
          {linkLabel || 'View all'}
          <ArrowUpRight
            size={14}
            strokeWidth={1.2}
            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      )}
    </Reveal>
  )
}
