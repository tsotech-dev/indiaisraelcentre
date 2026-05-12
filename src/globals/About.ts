import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About — Landing',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'missionHeading', type: 'text', label: 'Mission Heading' },
    { name: 'missionParagraph1', type: 'textarea', label: 'Mission Paragraph 1' },
    { name: 'missionParagraph2', type: 'textarea', label: 'Mission Paragraph 2' },
    { name: 'chairSummary', type: 'textarea', label: 'Chair Feature — Summary' },
    { name: 'whatWeDoHeading', type: 'text', label: '"What We Do" Heading' },
    {
      name: 'whatWeDo',
      type: 'array',
      label: '"What We Do" Cards',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    { name: 'governanceNote', type: 'textarea', label: 'Governance Note' },
  ],
}
