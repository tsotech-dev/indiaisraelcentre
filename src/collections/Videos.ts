import type { CollectionConfig } from 'payload'

function slugify(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .join('-')
}

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'pillar'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.slug) {
          data.slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
        } else if (data.title) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      validate: (val: string | null | undefined) => {
        if (!val) return 'Slug is required.'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val))
          return 'Slug may only contain lowercase letters, numbers, and hyphens.'
        return true
      },
      admin: {
        description: 'Auto-generated from title. Only lowercase letters, numbers, and hyphens.',
        components: {
          Field: 'src/components/payload/SlugField#SlugField',
        },
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'pillar',
      type: 'select',
      options: [
        { label: 'Identity, Heritage and Society', value: 'identity' },
        { label: 'Governance and Public Policy', value: 'governance' },
        { label: 'Security and Strategy', value: 'security' },
        { label: 'Technology and Innovation', value: 'technology' },
        { label: 'Development and Economic Cooperation', value: 'development' },
        { label: 'Culture and Soft Power', value: 'culture' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Short description shown on the listing and detail page.' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      admin: { description: 'YouTube or Vimeo URL (e.g. https://www.youtube.com/watch?v=xxx).' },
      label: 'Video URL',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional custom thumbnail. If left blank, YouTube thumbnail is used automatically.' },
    },
  ],
}
