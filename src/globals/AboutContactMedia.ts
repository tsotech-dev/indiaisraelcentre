import type { GlobalConfig } from 'payload'

export const AboutContactMedia: GlobalConfig = {
  slug: 'about-contact-media',
  label: 'About — Contact / Media',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'intro', type: 'textarea', label: 'Intro Text' },
    { name: 'pressNote', type: 'textarea', label: 'Press Note' },
  ],
}
