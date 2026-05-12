import type { GlobalConfig } from 'payload'

export const AboutGovernance: GlobalConfig = {
  slug: 'about-governance',
  label: 'About — Governance',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'paragraph1', type: 'textarea', label: 'Paragraph 1' },
    { name: 'paragraph2', type: 'textarea', label: 'Paragraph 2' },
    { name: 'paragraph3', type: 'textarea', label: 'Paragraph 3' },
  ],
}
