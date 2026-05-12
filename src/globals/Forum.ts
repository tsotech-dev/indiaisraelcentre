import type { GlobalConfig } from 'payload'

export const Forum: GlobalConfig = {
  slug: 'forum',
  label: 'Forum — Landing',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'chairBlockquote', type: 'textarea', label: 'Chair Pull-Quote / Section Heading' },
    { name: 'chairParagraph1', type: 'textarea', label: 'Chair Paragraph 1' },
    { name: 'chairParagraph2', type: 'textarea', label: 'Chair Paragraph 2' },
    { name: 'chairParagraph3', type: 'textarea', label: 'Chair Paragraph 3' },
    { name: 'chairSignature', type: 'text', label: 'Chair Signature Line' },
    { name: 'chairBio', type: 'textarea', label: 'Chair Bio Snippet (sidebar)' },
  ],
}
