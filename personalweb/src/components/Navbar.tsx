import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV } from '../lib/siteConfig'
import { usePortfolioData } from '../lib/PortfolioContext'
import { EASE } from '../lib/motion'
import { VallerianLogo } from './icons'

export default function Navbar() {
  const { settings: owner } = usePortfolioData()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the overlay menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled || open
            ? 'bg-ink/80 backdrop-blur-md border-b hairline'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1700px] items-center justify-between px-[var(--spacing-gutter)] py-4">
          <Link
            to="/"
            className="group flex items-center"
            aria-label={`${owner.name} — home`}
          >
            <VallerianLogo size={46} className="text-cream transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `eyebrow !text-[0.66rem] transition-colors hover:text-cream ${
                      isActive ? 'text-cream' : 'text-mute'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span data-active={String(isActive)} className="link-underline">
                      {item.label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center gap-3 text-cream"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="eyebrow !text-[0.6rem]">{open ? 'Close' : 'Menu'}</span>
            <span className="grid h-9 w-9 place-items-center border hairline">
              {open ? <X size={16} strokeWidth={1.2} /> : <Menu size={16} strokeWidth={1.2} />}
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.3, ease: EASE } }}
            className="fixed inset-0 z-40 bg-ink pt-28 px-[var(--spacing-gutter)] md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.08 + i * 0.06, duration: 0.6, ease: EASE } }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block font-display text-4xl py-2 border-b hairline ${
                        isActive ? 'text-cream' : 'text-mute'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.45 } }}
              className="mt-10 max-w-xs text-sm text-mute"
            >
              {owner.tagline}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
