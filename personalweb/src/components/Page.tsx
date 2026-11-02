import { useEffect, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '../lib/motion'

interface PageProps {
  children: ReactNode
  className?: string
  /** Skipped when arriving through an in-page anchor. */
  resetScroll?: boolean
}

/** Route wrapper: cinematic page transition + scroll restore. */
export default function Page({ children, className = '', resetScroll = true }: PageProps) {
  useEffect(() => {
    if (resetScroll) window.scrollTo({ top: 0, behavior: 'auto' })
  }, [resetScroll])

  return (
    <motion.main {...pageTransition} className={className}>
      {children}
    </motion.main>
  )
}
