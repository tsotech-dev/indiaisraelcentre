import type { GlobalConfig } from 'payload'

export const AboutContact: GlobalConfig = {
  slug: 'about-contact',
  label: 'About — Contact',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'intro', type: 'textarea', label: 'Intro Text' },
    {
      name: 'routes',
      type: 'array',
      label: 'Contact Route Cards',
      maxRows: 3,
      admin: { description: 'Title + description only — email/href stay in code.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
