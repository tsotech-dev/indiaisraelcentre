import type { GlobalConfig } from 'payload'

export const AboutContactEditorial: GlobalConfig = {
  slug: 'about-contact-editorial',
  label: 'About — Contact / Editorial',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'intro', type: 'textarea', label: 'Intro Text' },
    { name: 'responseNote', type: 'text', label: 'Response Time Note' },
  ],
}
