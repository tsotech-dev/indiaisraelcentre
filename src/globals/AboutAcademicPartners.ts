import type { GlobalConfig } from 'payload'

export const AboutAcademicPartners: GlobalConfig = {
  slug: 'about-academic-partners',
  label: 'About — Academic Partners',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'partnerName', type: 'text', label: 'Partner Name (heading)' },
    { name: 'paragraph1', type: 'textarea', label: 'Paragraph 1' },
    { name: 'paragraph2', type: 'textarea', label: 'Paragraph 2' },
    { name: 'addressLine1', type: 'text', label: 'Address — Line 1' },
    { name: 'addressLine2', type: 'text', label: 'Address — Line 2' },
    { name: 'addressLine3', type: 'text', label: 'Address — Line 3' },
  ],
}
