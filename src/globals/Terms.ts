import type { GlobalConfig } from 'payload'

export const Terms: GlobalConfig = {
  slug: 'terms',
  label: 'Terms of Use',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: 'lastReviewed',
      type: 'date',
      label: 'Last Reviewed',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
