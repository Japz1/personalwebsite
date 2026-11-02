import { Link } from 'react-router-dom'
import Page from '../components/Page'
import { usePortfolioData } from '../lib/PortfolioContext'
import { useSEO } from '../lib/useSEO'

export default function NotFound() {
  const { settings } = usePortfolioData()
  useSEO({ title: 'Not found', description: 'This page is not part of the archive.' })

  return (
    <Page>
      <div className="shell grid min-h-[70vh] place-items-center text-center">
        <div>
          <p className="eyebrow">Error 404</p>
          <p className="mt-6 font-display text-[clamp(3rem,14vw,9rem)] leading-none">—</p>
          <h1 className="mt-6 font-display text-4xl md:text-5xl">This frame does not exist</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm text-mute">
            The page you were looking for is not in {settings.name}'s archive.
          </p>
          <Link
            to="/"
            className="mt-10 inline-flex items-center gap-3 border border-cream/50 px-8 py-4 text-[0.7rem] uppercase tracking-[0.28em] transition-colors duration-500 hover:bg-cream hover:text-ink"
          >
            Back to the portfolio
          </Link>
        </div>
      </div>
    </Page>
  )
}
