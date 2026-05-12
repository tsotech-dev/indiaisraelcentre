import type { GlobalConfig } from 'payload'

export const Privacy: GlobalConfig = {
  slug: 'privacy',
  label: 'Privacy Policy',
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
