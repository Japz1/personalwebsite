import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

interface FilterBarProps {
  options: readonly string[]
  /** `'all'` or one of `options`. */
  value: string
  onChange: (value: string) => void
  allLabel?: string
}

/** Category filter row (FR-08). Underline slides between active options. */
export default function FilterBar({ options, value, onChange, allLabel = 'All work' }: FilterBarProps) {
  const pill = (label: string, option: string) => (
    <button
      key={option}
      type="button"
      onClick={() => onChange(option)}
      className={`relative text-[0.7rem] uppercase tracking-[0.28em] transition-colors ${
        value === option ? 'text-cream' : 'text-mute hover:text-cream'
      }`}
    >
      {label}
      {value === option && (
        <motion.span
          layoutId="filter-line"
          className="absolute -bottom-[6px] left-0 h-px w-full bg-cream"
          transition={{ duration: 0.45, ease: EASE }}
        />
      )}
    </button>
  )

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b hairline pb-5">
      {pill(allLabel, 'all')}
      {options.map((option) => pill(option, option))}
    </div>
  )
}
