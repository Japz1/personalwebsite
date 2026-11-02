import { useState, type ChangeEvent, type ComponentType } from 'react'
import { Check, Copy, Mail } from 'lucide-react'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import { Reveal } from '../components/Reveal'
import { InstagramIcon, VimeoIcon, WhatsAppIcon, YouTubeIcon, brandIconFor, type BrandIcon } from '../components/icons'
import { usePortfolioData } from '../lib/PortfolioContext'
import { fadeUp } from '../lib/motion'
import { useSEO } from '../lib/useSEO'
import { EMAIL_LINK } from '../lib/siteConfig'

/** Fallback lookup for social labels whose mark is not a Lucide-compatible SVG. */
const ICONS: Record<string, BrandIcon | undefined> = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  vimeo: VimeoIcon,
  youtube: YouTubeIcon,
}

type IconComponent = ComponentType<{ size?: number; className?: string; strokeWidth?: number }>

interface ChannelCardProps {
  label: string
  value: string
  href: string
  icon?: IconComponent
  note?: string
}

/** Direct channels — no server needed (PRD §2.2: no custom backend). */
function ChannelCard({ label, value, href, icon: Icon, note }: ChannelCardProps) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel="noreferrer noopener"
      className="group flex items-start gap-5 border hairline px-6 py-7 transition-colors duration-500 hover:border-cream/30 hover:bg-charcoal/60"
    >
      <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center border hairline text-steel transition-colors group-hover:text-cream">
        {Icon ? <Icon size={15} /> : null}
      </span>
      <span className="min-w-0">
        <span className="eyebrow block text-[0.6rem]!">{label}</span>
        <span className="mt-2 block truncate font-display text-xl text-cream">{value}</span>
        {note && <span className="mt-1 block text-xs text-mute">{note}</span>}
      </span>
    </a>
  )
}

interface InquiryForm {
  name: string
  email: string
  project: string
  date: string
  budget: string
  message: string
}

const EMPTY_FORM: InquiryForm = {
  name: '',
  email: '',
  project: 'Photography',
  date: '',
  budget: '',
  message: '',
}

const PROJECT_TYPES = ['Photography', 'Cinematography', 'Event coverage', 'Commercial', 'Music video', 'Other']

export default function Contact() {
  const { settings: owner } = usePortfolioData()

  const [form, setForm] = useState<InquiryForm>(EMPTY_FORM)
  const [copied, setCopied] = useState(false)

  useSEO({
    title: 'Contact',
    description: `Commission ${owner.name} for photography or cinematography. Email, Instagram and WhatsApp.`,
  })

  const update =
    (key: keyof InquiryForm) =>
      (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [key]: event.target.value }))

  const subject = `Project inquiry — ${form.project}${form.name ? ` / ${form.name}` : ''}`
  const body = [
    `Name: ${form.name || '—'}`,
    `Email: ${form.email || '—'}`,
    `Type of project: ${form.project}`,
    `Target date: ${form.date || 'Flexible'}`,
    `Budget range: ${form.budget || 'To be discussed'}`,
    '',
    form.message || '',
  ].join('\n')
  const mailtoHref = `${EMAIL_LINK}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(owner.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const field =
    'w-full border-b hairline bg-transparent py-3 text-sm text-cream placeholder:text-mute/60 focus:border-steel focus:outline-none transition-colors'

  const facts = [
    { label: 'Based in', value: owner.location },
    { label: 'Response time', value: 'Within 1–2 days' },
    { label: 'Coverage', value: 'Local commissions and travel-ready projects' },
    {
      label: 'Delivery',
      value: 'Edited selection, originals on request, streaming-ready film masters',
    },
  ]

  return (
    <Page>
      <div className="shell">
        <PageHeader
          label="Contact"
          title="Let's make something"
          lede="Commissions, collaborations, or a frame you have been trying to make for months."
          meta={owner.availability}
        />

        {/* Channels */}
        <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ChannelCard
            label="Email"
            value={owner.email}
            href={EMAIL_LINK}
            icon={Mail}
            note="Best for briefs and references"
          />
          <ChannelCard
            label="WhatsApp"
            value={owner.phoneDisplay}
            href={owner.whatsappLink}
            icon={WhatsAppIcon}
            note="Quick questions and scheduling"
          />
          <ChannelCard
            label="Instagram"
            value={`@${owner.instagram}`}
            href={`https://instagram.com/${owner.instagram}`}
            icon={InstagramIcon}
            note="Latest work, daily frames"
          />
        </section>

        {/* Inquiry composer */}
        <section className="mt-24 grid gap-16 lg:grid-cols-[1.05fr_0.85fr]">
          <div>
            <SectionHeading
              label="Collaboration inquiry"
              title="Tell me about the project"
              description="This form opens your mail app with everything filled in — no data is stored anywhere on the site."
            />

            <Reveal variants={fadeUp} className="mt-10">
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  window.location.href = mailtoHref
                }}
                className="grid gap-8 sm:grid-cols-2"
              >
                <label className="block">
                  <span className="eyebrow text-[0.6rem]!">Your name</span>
                  <input
                    className={field}
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Name"
                    required
                  />
                </label>

                <label className="block">
                  <span className="eyebrow text-[0.6rem]!">Email</span>
                  <input
                    type="email"
                    className={field}
                    value={form.email}
                    onChange={update('email')}
                    placeholder="you@email.com"
                    required
                  />
                </label>

                <label className="block">
                  <span className="eyebrow text-[0.6rem]!">Project type</span>
                  <select className={field} value={form.project} onChange={update('project')}>
                    {PROJECT_TYPES.map((option) => (
                      <option key={option} value={option} className="bg-ink">
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="eyebrow text-[0.6rem]!">Target date</span>
                  <input type="date" className={field} value={form.date} onChange={update('date')} />
                </label>

                <label className="block sm:col-span-2">
                  <span className="eyebrow text-[0.6rem]!">Budget range (optional)</span>
                  <input
                    className={field}
                    value={form.budget}
                    onChange={update('budget')}
                    placeholder="e.g. IDR 5–10 jt"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <span className="eyebrow text-[0.6rem]!">The brief</span>
                  <textarea
                    rows={5}
                    className={`${field} resize-none`}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Location, mood, deliverables, anything you already know."
                    required
                  />
                </label>

                <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 border border-cream/60 px-8 py-4 text-[0.7rem] uppercase tracking-[0.28em] transition-colors duration-500 hover:bg-cream hover:text-ink"
                  >
                    Compose inquiry
                    <Mail size={14} strokeWidth={1.2} />
                  </button>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-mute transition-colors hover:text-cream"
                  >
                    {copied ? <Check size={13} strokeWidth={1.4} /> : <Copy size={13} strokeWidth={1.2} />}
                    {copied ? 'Copied' : 'Copy email'}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>

          {/* Side notes */}
          <Reveal variants={fadeUp} delay={0.12} className="border hairline p-8">
            <p className="eyebrow">Working together</p>
            <ul className="mt-6 space-y-6">
              {facts.map((fact) => (
                <li key={fact.label} className="border-b hairline pb-5 last:border-0 last:pb-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-mute">{fact.label}</p>
                  <p className="mt-2 text-sm text-cream/85">{fact.value}</p>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t hairline pt-6">
              {owner.socials.map((social) => {
                const Icon =
                  brandIconFor(social.label, social.url) ?? ICONS[social.label.toLowerCase()]
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-mute transition-colors hover:text-cream"
                  >
                    {Icon ? <Icon size={14} /> : null}
                    {social.label}
                  </a>
                )
              })}
            </div>
          </Reveal>
        </section>
      </div>
    </Page>
  )
}
