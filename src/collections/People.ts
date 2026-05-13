import type { CollectionConfig } from 'payload'

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
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: { description: 'e.g. Director, Senior Fellow, Research Associate.' },
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
