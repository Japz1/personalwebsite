import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'photography',
  title: 'Photography',
  type: 'document',
  groups: [
    { name: 'media', title: 'Image', default: true },
    { name: 'details', title: 'Details' },
    { name: 'placement', title: 'Placement' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'media',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'media',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        { name: 'caption', type: 'string', title: 'Internal caption' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text (accessibility + SEO)',
      type: 'string',
      group: 'media',
      description: 'Describe the frame in one sentence.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'details',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'details',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'details' }),
    defineField({
      name: 'captureDate',
      title: 'Date captured',
      type: 'date',
      group: 'details',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on the home page',
      type: 'boolean',
      group: 'placement',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      description: 'Lower numbers appear first. Leave at 0 to sort by date.',
      type: 'number',
      group: 'placement',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      group: 'placement',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      media: 'image',
    },
  },
})
