import type { Variants } from 'framer-motion'

/** Shared easing and variants — restrained, cinematic, never bouncy. */

/** cubic-bezier(0.16, 1, 0.3, 1) — the "ease-out-expo" feel used site-wide. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE } },
}

/** Vertical mask wipe used for image reveals. */
export const imageReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.15, ease: EASE },
  },
}

export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
})

export const scaleImage: Variants = {
  hidden: { scale: 1.12 },
  show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.4, ease: EASE } },
} as const

export const overlayOut = {
  initial: { scaleY: 0 },
  animate: { scaleY: 1 },
  exit: { scaleY: 0 },
  transition: { duration: 0.7, ease: EASE },
} as const
