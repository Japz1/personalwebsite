/// <reference types="vite/client" />

/**
 * Typed environment variables (PRD §7.3 — credentials stay out of the source).
 * Only VITE_-prefixed values reach the browser, so nothing secret belongs here.
 */
interface ImportMetaEnv {
  /** Sanity project id, e.g. "abc123xy". Empty ⇒ the site runs on demo content. */
  readonly VITE_SANITY_PROJECT_ID?: string
  readonly VITE_SANITY_DATASET?: string
  readonly VITE_SANITY_API_VERSION?: string
  /** Optional. Only needed for a private dataset or draft previews. */
  readonly VITE_SANITY_READ_TOKEN?: string
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
