import { useEffect } from 'react'
import { SITE_URL, OWNER } from './siteConfig'

export interface SeoInput {
  title: string
  description?: string
  /** Absolute URL when available. */
  ogImage?: string | null
}

function setMeta(selector: string, attr: 'name' | 'property', value: string | undefined): void {
  if (!value) return
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    const matched = selector.match(/["']([^"']+)["']/)
    const nameOrProp = matched ? matched[1] : undefined
    if (!nameOrProp) return
    el.setAttribute(attr, nameOrProp)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/**
 * Minimal per-route SEO: title, description, canonical-ish og tags (PRD §7.4).
 */
export function useSEO({ title, description, ogImage }: SeoInput): void {
  useEffect(() => {
    const fullTitle = title.includes(OWNER.name) ? title : `${title} — ${OWNER.name}`

    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', description)
    setMeta('meta[property="og:title"]', 'property', fullTitle)
    setMeta('meta[property="og:description"]', 'property', description)
    setMeta('meta[property="og:url"]', 'property', `${SITE_URL}${window.location.pathname}`)
    if (ogImage) setMeta('meta[property="og:image"]', 'property', ogImage)
  }, [title, description, ogImage])
}
