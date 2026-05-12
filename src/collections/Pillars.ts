import type { CollectionConfig } from 'payload'

export const Pillars: CollectionConfig = {
  slug: 'pillars',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'code'],
    group: 'Content',
    description: 'Editable framing text for each research pillar. Codes are set at seed time and should not be changed.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'URL-safe identifier. Set once at creation — do not change.',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Pillar Label',
    },
    {
      name: 'framing',
      type: 'textarea',
      label: 'Framing Paragraph',
      admin: { description: 'The longer paragraph shown on the pillar theme page.' },
    },
  ],
}
