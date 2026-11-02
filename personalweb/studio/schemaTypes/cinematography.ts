import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cinematography',
  title: 'Cinematography',
  type: 'document',
  groups: [
    { name: 'media', title: 'Video', default: true },
    { name: 'details', title: 'Project' },
    { name: 'placement', title: 'Placement' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
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
      name: 'video',
      title: 'Video file',
      type: 'file',
      group: 'media',
      options: { accept: 'video/mp4,video/quicktime,video/webm' },
      description:
        'Upload a file (Sanity stores it) or leave empty and paste a link below for large masters.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Or hosted video URL',
      type: 'url',
      group: 'media',
      description:
        'Cloudinary mp4, Vimeo or YouTube link. Used when no file is uploaded — takes priority only if the file field is empty.',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'media',
      description: 'Written as mm:ss, e.g. 03:24',
    }),
    defineField({
      name: 'description',
      title: 'Project description',
      type: 'text',
      rows: 5,
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
    defineField({
      name: 'productionDate',
      title: 'Production date',
      type: 'date',
      group: 'details',
    }),
    defineField({
      name: 'credits',
      title: 'Production credits',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'Role, crew, client, equipment — whatever should be recorded.',
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
      media: 'thumbnail',
    },
  },
})
