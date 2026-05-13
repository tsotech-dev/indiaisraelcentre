import type { GlobalConfig } from 'payload'

export const AboutStrategicObjective: GlobalConfig = {
  slug: 'about-strategic-objective',
  label: 'About — Strategic Objective',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'paragraph1', type: 'textarea', label: 'Paragraph 1' },
    { name: 'paragraph2', type: 'textarea', label: 'Paragraph 2' },
  ],
}
