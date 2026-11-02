import { defineField, defineType } from 'sanity'

/**
 * Categories are documents, not strings, so the owner can add or rename a
 * category from the dashboard without touching code (PRD §3.2).
 */
export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Applies to',
      type: 'string',
      options: {
        list: [
          { title: 'Photography', value: 'photography' },
          { title: 'Cinematography', value: 'cinematography' },
          { title: 'Both', value: 'both' },
        ],
      },
      initialValue: 'photography',
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind' },
  },
})
