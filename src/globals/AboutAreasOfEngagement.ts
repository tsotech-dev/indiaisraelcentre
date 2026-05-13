import type { GlobalConfig } from 'payload'

export const AboutAreasOfEngagement: GlobalConfig = {
  slug: 'about-areas-of-engagement',
  label: 'About — Areas of Engagement',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'intro', type: 'textarea', label: 'Intro Paragraph' },
    {
      name: 'areas',
      type: 'array',
      label: 'Areas',
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'href', type: 'text', label: 'Optional link' },
      ],
    },
  ],
}
