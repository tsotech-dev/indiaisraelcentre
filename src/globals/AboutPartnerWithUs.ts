import type { GlobalConfig } from 'payload'

export const AboutPartnerWithUs: GlobalConfig = {
  slug: 'about-partner-with-us',
  label: 'About — Partner with Us',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'paragraph1', type: 'textarea', label: 'Paragraph 1' },
    { name: 'paragraph2', type: 'textarea', label: 'Paragraph 2' },
    { name: 'paragraph3', type: 'textarea', label: 'Paragraph 3' },
  ],
}
