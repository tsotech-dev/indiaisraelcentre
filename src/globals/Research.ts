import type { GlobalConfig } from 'payload'

export const Research: GlobalConfig = {
  slug: 'research',
  label: 'Research — Landing',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: 'formatCards',
      type: 'array',
      label: 'Format Cards (Papers / Briefs / Commentary)',
      maxRows: 3,
      admin: { description: 'Body text for the three format cards on the research landing page.' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. Papers' } },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
