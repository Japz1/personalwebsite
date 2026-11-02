import { motion, type TargetAndTransition, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, imageReveal, stagger } from '../lib/motion'

/** Shifts every non-`hidden` variant later, without mutating the shared set. */
function withDelay(variants: Variants, delay = 0): Variants {
  if (!delay) return variants
  const next: Variants = {}
  Object.entries(variants).forEach(([key, value]) => {
    if (key === 'hidden' || typeof value !== 'object' || value === null) {
      next[key] = value as Variants[string]
      return
    }
    const target = value as TargetAndTransition
    next[key] = { ...target, transition: { ...target.transition, delay } }
  })
  return next
}

interface RevealProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  amount?: number
  once?: boolean
}

/** Scroll-triggered reveal. Keeps the editorial rhythm without heavy JS. */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  amount = 0.25,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={withDelay(variants, delay)}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  delay?: number
  gap?: number
  amount?: number
}

/**
 * Container that reveals its <RevealItem> children in sequence.
 * `amount: 0` reveals on first intersection so tall grids (masonry) still
 * trigger on short viewports — a fractional threshold can be unreachable when
 * the container is much taller than the viewport, leaving items stuck hidden.
 */
export function RevealGroup({ children, className, delay = 0, gap = 0.09, amount = 0 }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -10% 0px' }}
      variants={withDelay(stagger(delay, gap), 0)}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

/** Curtain-style image reveal for hero and feature frames. */
export function RevealImage({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={withDelay(imageReveal, delay)}
    >
      {children}
    </motion.div>
  )
}
