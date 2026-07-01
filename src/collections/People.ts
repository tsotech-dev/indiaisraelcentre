import type { CollectionConfig } from 'payload'

function slugify(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .join('-')
}

export const People: CollectionConfig = {
  slug: 'people',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
    description: 'Team members shown on the About / People page. Not linked to publications.',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.slug) {
          data.slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
        } else if (data.name) {
          data.slug = slugify(data.name)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
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
      custom: { watchField: 'name' },
      admin: {
        description: 'Auto-generated from name. Only lowercase letters, numbers, and hyphens.',
        components: {
          Field: 'src/components/payload/SlugField#SlugField',
        },
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Director, Senior Fellow, Research Associate.' },
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      defaultValue: 'academic',
      options: [
        { label: 'Academic', value: 'academic' },
        { label: 'Media', value: 'media' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Which group this person appears under on the People page.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        step: 1,
        description: 'Order within the section (lower shows first).',
      },
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'areasOfFocus',
      type: 'array',
      label: 'Areas of Focus',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    {
      name: 'pillarAffiliations',
      type: 'array',
      label: 'Pillar Affiliations',
      fields: [
        {
          name: 'pillarCode',
          type: 'select',
          required: true,
          options: [
            { label: 'I. Civilizational Resilience & National Renewal', value: 'identity' },
            { label: 'II. Democratic Transformation & Sovereign Governance', value: 'governance' },
            { label: 'III. Security, Stability & Counter-Terror Cooperation', value: 'security' },
            { label: 'IV. Innovation, Technology & Strategic Competitiveness', value: 'technology' },
            { label: 'V. Sustainable & Inclusive Development', value: 'development' },
            { label: 'VI. Shared Cultural & Spiritual Heritage', value: 'culture' },
          ],
        },
        {
          name: 'role',
          type: 'select',
          required: true,
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
        },
      ],
    },
    {
      name: 'externalAffiliations',
      type: 'array',
      label: 'External Affiliations / Publications',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
  ],
}
