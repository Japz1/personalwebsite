import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Mail } from 'lucide-react'
import Page from '../components/Page'
import Frame from '../components/Frame'
import SectionHeading from '../components/SectionHeading'
import FilmCard from '../components/FilmCard'
import { PatternWaves } from '../components/ui/PatternWaves'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { InstagramIcon, WhatsAppIcon } from '../components/icons'
import { usePortfolioData } from '../lib/PortfolioContext'
import { useSEO } from '../lib/useSEO'
import { resolveMedia } from '../lib/sanity'
import { EASE, fadeUp } from '../lib/motion'
import { EMAIL_LINK } from '../lib/siteConfig'
import type { Film, Photo } from '../types/content'

interface HomeProps {
  /** Opens the shared lightbox on the given list, focused on `id`. */
  onOpenPhotos: (list: Photo[], id: string) => void
  onOpenFilm: (film: Film) => void
}

export default function Home({ onOpenPhotos, onOpenFilm }: HomeProps) {
  const { settings: owner, photos, films, featuredPhotos, featuredFilms } = usePortfolioData()

  const featured = featuredPhotos.length ? featuredPhotos : photos.slice(0, 3)
  const featuredFilmsShown = featuredFilms.length ? featuredFilms : films.slice(0, 2)

  useSEO({
    title: `${owner.name} — Photographer & Cinematographer`,
    description: `${owner.role}. ${owner.tagline}`,
    ogImage: featured[0]?.url,
  })

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const selected: Array<{ kind: 'photo'; item: Photo } | { kind: 'film'; item: Film }> = [
    ...photos.slice(0, 4).map((item) => ({ kind: 'photo' as const, item })),
    ...films.slice(0, 2).map((item) => ({ kind: 'film' as const, item })),
  ].slice(0, 6)

  const portrait = resolveMedia(owner.portrait) || owner.hero.portrait
  const bioPreview = (Array.isArray(owner.bio) ? owner.bio.join(' ') : String(owner.bio || '')).slice(
    0,
    280,
  )

  return (
    <Page resetScroll={false}>
      {/* ─────────────────────────── Hero ─────────────────────────── */}
      <section
        ref={heroRef}
        className="relative grid min-h-svh place-items-center overflow-hidden bg-ink pt-28 pb-32 md:pt-36 md:pb-40"
      >
        {/* Background — PatternWaves with Parallax & Opacity Fade out during scroll */}
        <motion.div
          style={{ y: mediaY, opacity: bgOpacity }}
          className="absolute inset-0 overflow-hidden"
        >
          <PatternWaves
            preset="silk"
            color="#eae6df"
            backgroundColor="#111111"
            fade="bottom"
            fadeSize={0.6}
            interactive
            cursorSize={60}
            cursorStrength={0.5}
            speed={0.25}
            opacity={0.4}
            className="w-full h-full"
          />
          <div className="grain absolute inset-0 pointer-events-none" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 shell flex flex-col items-center text-center mt-6 md:mt-12"
        >
          {/* Introductory label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.4, ease: EASE } }}
            className="eyebrow"
          >
            Creative Portfolio
          </motion.p>

          {/* Main wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1.3, delay: 0.15, ease: EASE } }}
            className="mt-6 font-sans text-[clamp(2.8rem,11vw,9.5rem)] font-[420] leading-[0.92] tracking-[0.12em] uppercase"
          >
            VALLERIAN
          </motion.h1>

          {/* Professional title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 0.7 } }}
            className="mt-6 text-[0.7rem] uppercase tracking-[0.3em] text-cream/75"
          >
            Independent Visual Storyteller
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.95, ease: EASE } }}
            className="mt-8 max-w-md font-display text-2xl italic text-cream/70"
          >
            An ongoing study of seeing.
          </motion.p>


          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.9, delay: 1.3, ease: EASE } }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6"
          >
            <Link
              to="/photography"
              className="group inline-flex items-center justify-center gap-3 border border-cream/60 px-8 py-4 text-[0.7rem] uppercase tracking-[0.28em] text-cream transition-colors duration-500 hover:bg-cream hover:text-ink"
            >
              Explore Works
              <ArrowRight
                size={14}
                strokeWidth={1.2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 border border-transparent px-8 py-4 text-[0.7rem] uppercase tracking-[0.28em] text-cream/80 transition-colors duration-500 hover:text-cream"
            >
              Get in Touch
            </Link>
          </motion.div>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 1.6 } }}
            className="mt-10 text-[0.6rem] uppercase tracking-[0.35em] text-cream/35"
          >
            Based in Manado, Indonesia
          </motion.p>
        </motion.div>

        {/* Fade the base of the hero into the next section */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-44"
          style={{
            // Wide, soft feather: solid ink only at the very bottom, then a
            // long gentle ramp so the blend into the next section is seamless.
            background:
              'linear-gradient(to top, #111111 0%, rgba(17,17,17,0.88) 18%, rgba(17,17,17,0.6) 40%, rgba(17,17,17,0.3) 62%, rgba(17,17,17,0.12) 82%, rgba(17,17,17,0.03) 93%, transparent 100%)',
          }}
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 2, duration: 1 } }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <ArrowDown size={14} strokeWidth={1} className="mx-auto animate-bounce text-mute" />
        </motion.div>
      </section>

      {/* ─────────────────── Featured photography ─────────────────── */}
      <section className="relative z-10 shell mt-32 md:mt-48">
        <SectionHeading
          index="01"
          label="Featured photography"
          title="Stills I keep returning to"
          to="/photography"
          linkLabel="All photography"
        />

        {featured.length > 0 && (
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-12">
            {featured.slice(0, 3).map((photo, i) => (
              <RevealItem
                key={photo.id}
                className={
                  i === 0 ? 'md:col-span-7' : i === 1 ? 'md:col-span-5' : 'md:col-span-5 md:mt-6'
                }
              >
                <button
                  type="button"
                  onClick={() => onOpenPhotos(photos, photo.id)}
                  className="group block w-full text-left"
                >
                  <Frame
                    src={photo.thumb}
                    alt={photo.alt}
                    width={photo.width || 900}
                    height={photo.height || (i === 0 ? 1100 : 800)}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    imgClassName="reveal-img"
                    priority={i === 0}
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-6">
                    <h3 className="font-display text-2xl">{photo.title}</h3>
                    <p className="eyebrow text-[0.62rem]! shrink-0">{photo.category}</p>
                  </div>
                  {photo.description && (
                    <p className="mt-1 max-w-md text-sm text-mute">{photo.description}</p>
                  )}
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </section>

      {/* ────────────────── Featured cinematography ────────────────── */}
      {featuredFilmsShown.length > 0 && (
        <section className="shell mt-28 md:mt-40">
          <SectionHeading
            index="02"
            label="Featured cinematography"
            title="Moving image, same patience"
            to="/cinematography"
            linkLabel="All films"
          />

          <RevealGroup className="mt-14 grid gap-10 md:grid-cols-2">
            {featuredFilmsShown.slice(0, 2).map((film) => (
              <FilmCard key={film.id} film={film} onOpen={onOpenFilm} wide />
            ))}
          </RevealGroup>
        </section>
      )}

      {/* ─────────────────── Selected works index ─────────────────── */}
      <section className="shell mt-28 md:mt-40">
        <SectionHeading index="03" label="Selected works" title="An archive, in order" />

        <ul className="mt-10 border-t hairline">
          {selected.map((entry, i) => (
            <Reveal key={`${entry.kind}-${entry.item.id}`} variants={fadeUp}>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    entry.kind === 'photo'
                      ? onOpenPhotos(photos, entry.item.id)
                      : onOpenFilm(entry.item)
                  }
                  className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b hairline py-6 text-left transition-colors hover:bg-charcoal/60 md:gap-10"
                >
                  <span className="eyebrow text-[0.62rem]! pl-2">{String(i + 1).padStart(2, '0')}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-2xl md:text-3xl">
                      {entry.item.title}
                    </span>
                    <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.2em] text-mute">
                      {entry.kind === 'photo' ? 'Photography' : 'Cinematography'}
                      {entry.item.category ? ` · ${entry.item.category}` : ''}
                    </span>
                  </span>
                  <span className="flex items-center gap-6 pr-2">
                    <span className="hidden text-sm text-mute sm:block">
                      {entry.kind === 'photo' ? entry.item.location : entry.item.year}
                    </span>
                    <ArrowRight
                      size={16}
                      strokeWidth={1.2}
                      className="text-mute transition-all duration-500 group-hover:translate-x-1 group-hover:text-cream"
                    />
                  </span>
                </button>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ─────────────────── About teaser ─────────────────── */}
      <section className="shell mt-28 grid gap-12 md:mt-40 md:grid-cols-[0.85fr_1fr] md:gap-20">
        <Reveal variants={fadeUp}>
          <Frame
            src={portrait}
            alt={`Portrait of ${owner.name}`}
            width={1000}
            height={1250}
            sizes="(min-width: 768px) 40vw, 90vw"
            imgClassName="reveal-img"
          />
        </Reveal>

        <div className="flex flex-col justify-center">
          <Reveal variants={fadeUp}>
            <p className="eyebrow">04 — About</p>
            <h2 className="mt-5 font-display text-[clamp(1.8rem,4.4vw,3.4rem)] leading-[1.08]">
              {owner.intro}
            </h2>
            <p className="mt-6 max-w-xl text-sm text-mute md:text-base">{bioPreview}</p>
          </Reveal>

          <Reveal variants={fadeUp} delay={0.15} className="mt-9">
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
            >
              <span className="link-underline">More about me</span>
              <ArrowRight
                size={14}
                strokeWidth={1.2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────── Contact ─────────────────── */}
      <section className="shell mt-28 border-t hairline pt-16 md:mt-40">
        <Reveal
          variants={fadeUp}
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="eyebrow">05 — Contact</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,5.5vw,4rem)] leading-[1.02]">
              Have a story that needs telling?
            </h2>
            <p className="mt-4 max-w-md text-sm text-mute">{owner.availability}</p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={EMAIL_LINK}
              className="inline-flex items-center gap-3 text-sm text-cream/85 transition-colors hover:text-cream"
            >
              <Mail size={15} strokeWidth={1.2} className="text-steel" />
              {owner.email}
            </a>
            <a
              href={`https://instagram.com/${owner.instagram}`}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 text-sm text-cream/85 transition-colors hover:text-cream"
            >
              <InstagramIcon size={15} className="text-steel" />@{owner.instagram}
            </a>
            <a
              href={owner.whatsappLink}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 text-sm text-cream/85 transition-colors hover:text-cream"
            >
              <WhatsAppIcon size={15} className="text-steel" />
              {owner.phoneDisplay}
            </a>
            <Link
              to="/contact"
              className="mt-3 inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.28em] text-cream"
            >
              <span className="link-underline">Collaboration inquiry</span>
              <ArrowRight size={13} strokeWidth={1.2} />
            </Link>
          </div>
        </Reveal>
      </section>
    </Page>
  )
}
