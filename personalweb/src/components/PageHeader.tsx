import { Reveal } from './Reveal'
import { fadeUp } from '../lib/motion'

interface PageHeaderProps {
  label: string
  title: string
  lede?: string
  meta?: string
}

/** Large editorial opener for interior pages. */
export default function PageHeader({ label, title, lede, meta }: PageHeaderProps) {
  return (
    <header className="border-b hairline pb-10 pt-36 md:pt-44">
      <Reveal variants={fadeUp}>
        <p className="eyebrow">{label}</p>
        <h1 className="mt-5 font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.95]">{title}</h1>
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          {lede && <p className="max-w-xl text-sm text-mute md:text-base">{lede}</p>}
          {meta && <p className="text-[0.7rem] uppercase tracking-[0.28em] text-mute">{meta}</p>}
        </div>
      </Reveal>
    </header>
  )
}
