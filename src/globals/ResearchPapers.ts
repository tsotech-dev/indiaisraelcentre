import type { GlobalConfig } from 'payload'

export const ResearchPapers: GlobalConfig = {
  slug: 'research-papers',
  label: 'Research — Papers',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'description', type: 'textarea', label: 'Format Description' },
    { name: 'typicalLength', type: 'text', label: 'Typical Length Stat' },
    { name: 'perYear', type: 'text', label: 'Per Year Stat' },
  ],
}
