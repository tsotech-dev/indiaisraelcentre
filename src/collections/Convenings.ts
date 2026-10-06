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

export const Convenings: CollectionConfig = {
  slug: 'convenings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'format'],
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
          return 'Slug may only contain lowercase letters, numbers, and hyphens (no leading/trailing hyphens).'
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
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    {
      name: 'format',
      type: 'select',
      required: true,
      defaultValue: 'lecture',
      options: [
        { label: 'Lecture', value: 'lecture' },
        { label: 'Panel', value: 'panel' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Roundtable', value: 'roundtable' },
        { label: 'Conference', value: 'conference' },
        { label: 'Other', value: 'other' },
      ],
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
      type: 'richText',
      admin: {
        description: 'Optional body text shown on the convening page. Leave blank if uploading a PDF instead.',
      },
    },
    {
      name: 'pdfFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional PDF to embed on the convening page. If provided, this is shown instead of (or alongside) the body text.',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: { description: 'Optional YouTube or Vimeo URL of the recording.' },
    },
  ],
}
