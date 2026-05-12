import type { GlobalConfig } from 'payload'

export const AboutWorkWithUs: GlobalConfig = {
  slug: 'about-work-with-us',
  label: 'About — Work with Us',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'intro', type: 'textarea', label: 'Intro Paragraph' },
    { name: 'openPositionsNote', type: 'textarea', label: 'Open Positions Note' },
    { name: 'fellowshipsHeading', type: 'text', label: 'Fellowships Heading' },
    {
      name: 'fellowships',
      type: 'array',
      label: 'Fellowship Programmes',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    { name: 'affiliationIntro', type: 'textarea', label: 'Affiliation Form Intro' },
  ],
}
