import type { GlobalConfig } from 'payload'

export const NotFound: GlobalConfig = {
  slug: 'not-found',
  label: '404 Page',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'heading', type: 'text', label: 'Heading' },
    { name: 'description', type: 'textarea', label: 'Description' },
  ],
}
