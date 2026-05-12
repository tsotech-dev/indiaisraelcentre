import type { GlobalConfig } from 'payload'

export const ResearchCommentary: GlobalConfig = {
  slug: 'research-commentary',
  label: 'Research — Commentary',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'description', type: 'textarea', label: 'Format Description' },
    { name: 'typicalLength', type: 'text', label: 'Typical Length Stat' },
    { name: 'perYear', type: 'text', label: 'Per Year Stat' },
  ],
}
