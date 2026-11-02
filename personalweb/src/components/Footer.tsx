import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { NAV } from '../lib/siteConfig'
import { usePortfolioData } from '../lib/PortfolioContext'
import { VallerianLogo } from './icons'

export default function Footer() {
  const { settings: owner } = usePortfolioData()
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-32 border-t hairline">
      <div className="mx-auto max-w-[1700px] px-[var(--spacing-gutter)] py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center">
              <VallerianLogo size={56} className="h-14 w-14 text-cream md:h-16 md:w-16" />
            </div>
            <p className="mt-5 max-w-sm text-sm text-mute">{owner.tagline}</p>
            <p className="mt-1 text-sm text-mute">{owner.location}</p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <p className="eyebrow mb-4">Index</p>
              <ul className="space-y-2">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-cream/75 transition-colors hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow mb-4">Elsewhere</p>
              <ul className="space-y-2">
                {owner.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-cream/75 transition-colors hover:text-cream"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] tracking-[0.18em] uppercase text-mute">
            © {year} {owner.name} — All works reserved
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-xs tracking-widest uppercase text-mute transition-colors hover:text-cream"
          >
            <span>Back to top</span>
            <ArrowUp
              size={13}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
