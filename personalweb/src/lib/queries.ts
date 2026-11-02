/**
 * GROQ queries. Field names mirror the Sanity schema in /studio/schemaTypes.
 * Each projection is typed by hand in src/types/content.ts, so a schema change
 * shows up as a compile error instead of an undefined at runtime.
 */

const IMAGE_PROJECTION = `
  "imageRef": image.asset->url,
  "imageAlt": alt || title,
  "imageDims": image { "w": width, "h": height }
`

export const PHOTOGRAPHY_QUERY = `
*[_type == "photography"] | order(order asc, captureDate desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "category": category->title,
  location,
  captureDate,
  featured,
  "publishedAt": coalesce(publishedAt, _createdAt),
  image,
  ${IMAGE_PROJECTION}
}`

export const PHOTOGRAPHY_FEATURED_QUERY = `
*[_type == "photography" && featured == true] | order(captureDate desc) [0...4] {
  _id,
  title,
  "slug": slug.current,
  description,
  "category": category->title,
  location,
  captureDate,
  featured,
  image,
  ${IMAGE_PROJECTION}
}`

const FILM_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  description,
  "category": category->title,
  productionDate,
  credits,
  featured,
  duration,
  video,
  "videoUrl": coalesce(video.asset->url, videoUrl, ""),
  thumbnail,
  "thumbnailUrl": coalesce(thumbnail.asset->url, "")
`

export const CINEMATOGRAPHY_QUERY = `
*[_type == "cinematography"] | order(order asc, productionDate desc) {
  ${FILM_PROJECTION}
}`

export const CINEMATOGRAPHY_FEATURED_QUERY = `
*[_type == "cinematography" && featured == true] | order(productionDate desc) [0...3] {
  ${FILM_PROJECTION}
}`

export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0] {
  name,
  role,
  tagline,
  intro,
  bio,
  email,
  phone,
  phoneDisplay,
  instagram,
  location,
  socials[] { label, url, handle },
  "portrait": portrait.asset->url,
  skills,
  equipment,
  experience[] { period, role, place, description },
  heroMedia,
  "heroImageUrl": coalesce(heroMedia.asset->url, ""),
  heroVideo,
  "heroVideoUrl": coalesce(heroVideo.asset->url, ""),
  availability
}`
