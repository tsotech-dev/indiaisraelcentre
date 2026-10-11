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
    // ── Event Photos ───────────────────────────────────────────────────────
    {
      name: 'eventImages',
      type: 'array',
      label: 'Event Photos',
      admin: {
        description: 'Photos from the event. These appear as a gallery on the convening page.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          admin: { description: 'Optional caption for this photo.' },
        },
      ],
    },
    // ── Press Coverage ─────────────────────────────────────────────────────
    {
      name: 'pressReleases',
      type: 'array',
      label: 'Press Coverage',
      admin: {
        description: 'Media coverage or press releases about this convening. Each entry appears as a clickable card.',
      },
      fields: [
        {
          name: 'outlet',
          type: 'text',
          required: true,
          admin: { description: 'Name of the publication, e.g. PTI, Economic Times, News18.' },
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          admin: { description: 'Article headline or press release title.' },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: { description: 'Full URL to the article or press release.' },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional thumbnail image for the press card.' },
        },
      ],
    },
  ],
}
