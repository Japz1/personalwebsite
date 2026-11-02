import { defineField, defineType } from 'sanity'

/**
 * Singleton document.
 *
 * After the first publish its id must stay `siteSettings` — the website reads
 * exactly that document (see src/lib/queries.js → SITE_SETTINGS_QUERY).
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site settings & profile',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'contact', title: 'Contact & socials' },
    { name: 'profile', title: 'About page' },
    { name: 'hero', title: 'Home page media' },
  ],
  fields: [
    // ---- Identity ----
    defineField({ name: 'name', title: 'Full name', type: 'string', group: 'identity' }),
    defineField({
      name: 'role',
      title: 'Professional identity',
      type: 'string',
      group: 'identity',
      description: 'e.g. Photographer / Cinematographer / Visual Storyteller',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'identity',
      description: 'e.g. Capturing moments, preserving stories.',
    }),
    defineField({
      name: 'intro',
      title: 'Short introduction',
      type: 'text',
      rows: 3,
      group: 'identity',
    }),

    // ---- Contact ----
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({
      name: 'phone',
      title: 'WhatsApp number',
      type: 'string',
      group: 'contact',
      description: 'Digits with country code, e.g. 628123456789',
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Number as displayed',
      type: 'string',
      group: 'contact',
      description: 'e.g. +62 812 3456 7890',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram username',
      type: 'string',
      group: 'contact',
      description: 'Without the @ sign',
    }),
    defineField({ name: 'location', title: 'Based in', type: 'string', group: 'contact' }),
    defineField({
      name: 'availability',
      title: 'Availability line',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          name: 'social',
          title: 'Social link',
          fields: [
            { name: 'label', type: 'string', title: 'Label', options: { list: ['Instagram', 'Vimeo', 'YouTube', 'Behance', 'TikTok', 'LinkedIn'] } },
            { name: 'handle', type: 'string', title: 'Handle / name' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
          preview: { select: { title: 'label', subtitle: 'handle' } },
        },
      ],
    }),

    // ---- About page ----
    defineField({
      name: 'portrait',
      title: 'Personal portrait',
      type: 'image',
      group: 'profile',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'array',
      group: 'profile',
      description: 'One item per paragraph.',
      of: [{ type: 'text', rows: 4 }],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      group: 'profile',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'equipment',
      title: 'Equipment & tools',
      type: 'array',
      group: 'profile',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'array',
      group: 'profile',
      of: [
        {
          type: 'object',
          name: 'experienceEntry',
          title: 'Experience',
          fields: [
            { name: 'period', type: 'string', title: 'Period', description: 'e.g. 2025 — now' },
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'place', type: 'string', title: 'Place / client' },
            { name: 'description', type: 'text', rows: 3, title: 'Description' },
          ],
          preview: { select: { title: 'role', subtitle: 'period' } },
        },
      ],
    }),

    // ---- Home page media ----
    defineField({
      name: 'heroMedia',
      title: 'Hero background image',
      type: 'image',
      group: 'hero',
      options: { hotspot: true },
      description: 'Used behind the name on the home page.',
    }),
    defineField({
      name: 'heroVideo',
      title: 'Hero background video (optional)',
      type: 'file',
      group: 'hero',
      options: { accept: 'video/mp4,video/webm' },
      description: 'If set, it replaces the hero image. Keep it short, silent and loopable.',
    }),
  ],

  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
})
