import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Homepage',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Header Eyebrow', admin: { description: '"An Independent Policy Research Forum"' } },
    { name: 'title', type: 'text', label: 'Title', admin: { description: '"India Israel Centre"' } },
    { name: 'subtitle', type: 'text', label: 'Subtitle', admin: { description: 'Italic line beneath title.' } },
    { name: 'openingFraming', type: 'textarea', label: 'Opening Framing' },
    { name: 'newsletterHeading', type: 'text', label: 'Newsletter Section Heading' },
    { name: 'newsletterDescription', type: 'textarea', label: 'Newsletter Description' },
    { name: 'newsletterPrivacyNote', type: 'text', label: 'Newsletter Privacy Note' },
  ],
}
