import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Page from '../components/Page'
import SectionHeading from '../components/SectionHeading'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { brandIconFor } from '../components/icons'
import Lanyard from '../components/ui/Lanyard'
import LanyardStage from '../components/LanyardStage'
import { usePortfolioData } from '../lib/PortfolioContext'
import { resolveMedia } from '../lib/sanity'
import { fadeUp } from '../lib/motion'
import { useSEO } from '../lib/useSEO'
import { PHOTO_CATEGORIES } from '../lib/siteConfig'

function Column({ title, items }: { title: string; items?: readonly string[] }) {
  if (!items?.length) return null
  return (
    <Reveal variants={fadeUp} className="border-t hairline pt-7">
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-cream/80">
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export default function About() {
  const { settings: owner, photos, films } = usePortfolioData()

  const bio = Array.isArray(owner.bio) ? owner.bio : String(owner.bio || '').split('\n\n')
  const portrait = resolveMedia(owner.portrait) || owner.hero.portrait

  useSEO({
    title: 'About',
    description: `${owner.name} — ${owner.role}. ${owner.intro}`,
    ogImage: portrait,
  })

  const numbers = [
    { value: String(photos.length), label: 'Published frames' },
    { value: String(films.length), label: 'Film projects' },
    { value: owner.instagram ? `@${owner.instagram}` : '—', label: 'Where most of this starts' },
  ]

  return (
    <Page>
      <div className="shell">
        {/* Portrait lanyard + statement */}
        <section className="grid gap-12 pt-36 md:grid-cols-[0.9fr_1fr] md:gap-20 md:pt-44 items-center">
          {/* Bare stage: no box — the lanyard lives in a fixed portal layer
              (above page content, below the navbar) that tracks this spacer. */}
          <LanyardStage spacerClassName="relative -mt-24 sm:-mt-32 md:-mt-40 h-145 sm:h-165 md:h-180 w-full">
            <Lanyard
              frontImage={portrait}
              backImage={portrait}
              imageFit="cover"
              orientation="portrait"
              finish="matte"
              cornerRadius={0.25}
              size={0.48}
              anchor="center"
              strapLength={0.4}
              strapColor="#111111"
              strapWidth={0.65}
              metal="graphite"
              breeze={0.35}
              className="w-full h-full"
            />
          </LanyardStage>

          <div className="flex flex-col justify-center">
            <Reveal variants={fadeUp}>
              <p className="eyebrow">About</p>
              <h1 className="mt-5 font-display text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.02]">
                {owner.name}
              </h1>
              <p className="mt-4 text-[0.7rem] uppercase tracking-[0.28em] text-mute">{owner.role}</p>
            </Reveal>

            <Reveal variants={fadeUp} delay={0.12} className="mt-8 space-y-5 text-sm md:text-base">
              {bio.slice(0, 4).map((paragraph, i) => (
                <p key={i} className="text-cream/80">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal
              variants={fadeUp}
              delay={0.2}
              className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <span className="text-sm text-mute">{owner.location}</span>
              <span className="text-sm text-steel">{owner.availability}</span>
            </Reveal>
          </div>
        </section>

        {/* Numbers strip */}
        <Reveal
          variants={fadeUp}
          className="mt-24 grid gap-8 border-y hairline py-10 sm:grid-cols-3"
        >
          {numbers.map((entry) => (
            <div key={entry.label}>
              <p className="font-display text-4xl leading-none">{entry.value}</p>
              <p className="eyebrow mt-3 text-[0.6rem]!">{entry.label}</p>
            </div>
          ))}
        </Reveal>

        {/* Interests / skills / equipment */}
        <section className="mt-24">
          <SectionHeading
            label="Practice"
            title="What I look for, and what I use"
            description="Interests, skills, and the tools that carry them — all editable from the CMS."
          />

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            <Column title="Interests" items={PHOTO_CATEGORIES} />
            <Column title="Skills" items={owner.skills} />
            <Column title="Equipment & tools" items={owner.equipment} />
          </div>
        </section>

        {/* Experience */}
        {owner.experience.length > 0 && (
          <section className="mt-24">
            <SectionHeading label="Experience" title="Selected history" />

            <RevealGroup className="mt-12" gap={0.1}>
              {owner.experience.map((entry) => (
                <RevealItem
                  key={`${entry.period}-${entry.role}`}
                  className="grid gap-3 border-b hairline py-8 md:grid-cols-[10rem_1fr] md:gap-12"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-mute">{entry.period}</p>
                  <div>
                    <h3 className="font-display text-2xl">{entry.role}</h3>
                    {entry.place && <p className="mt-1 text-sm text-steel">{entry.place}</p>}
                    {entry.description && (
                      <p className="mt-3 max-w-2xl text-sm text-mute">{entry.description}</p>
                    )}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
        )}

        {/* Elsewhere */}
        <section className="mt-24 border-t hairline pt-12">
          <Reveal
            variants={fadeUp}
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {owner.socials.map((social) => {
                const Icon = brandIconFor(social.label, social.url)
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-3 text-sm text-cream/80 transition-colors hover:text-cream"
                  >
                    {Icon ? <Icon size={15} className="text-steel" /> : null}
                    <span className="link-underline">{social.label}</span>
                    {social.handle && <span className="text-mute">{social.handle}</span>}
                  </a>
                )
              })}
            </div>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 border border-cream/50 px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.28em] transition-colors duration-500 hover:bg-cream hover:text-ink"
            >
              Start a conversation
              <ArrowRight
                size={14}
                strokeWidth={1.2}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </section>
      </div>
    </Page>
  )
}
