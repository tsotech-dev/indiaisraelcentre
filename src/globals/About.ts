import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About — Landing',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Page Eyebrow' },
    { name: 'title', type: 'text', label: 'Title' },
    { name: 'subtitle', type: 'text', label: 'Subtitle' },
    { name: 'openingFraming', type: 'textarea', label: 'Opening Framing' },
    {
      name: 'aboutBodyParagraphs',
      type: 'array',
      label: 'About the Centre — body paragraphs',
      fields: [{ name: 'body', type: 'textarea', required: true }],
    },
    { name: 'chairSummary', type: 'textarea', label: 'Chair Feature — Summary' },
  ],
}
