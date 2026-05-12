import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Homepage',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    {
      name: 'missionHeading',
      type: 'text',
      label: 'Mission Section Heading',
      admin: { description: '"A think tank built for the long argument."' },
    },
    {
      name: 'missionBody',
      type: 'textarea',
      label: 'Mission Body Paragraph',
    },
    {
      name: 'missionCards',
      type: 'array',
      label: 'Mission Cards (3)',
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    {
      name: 'pillarsHeading',
      type: 'text',
      label: 'Pillars Section Heading',
    },
    {
      name: 'pillarsBody',
      type: 'textarea',
      label: 'Pillars Section Description',
    },
    {
      name: 'pullQuote',
      type: 'textarea',
      label: 'Pull Quote Text',
    },
    {
      name: 'pullQuoteAttribution',
      type: 'text',
      label: 'Pull Quote — Name',
    },
    {
      name: 'pullQuoteRole',
      type: 'text',
      label: 'Pull Quote — Role',
    },
    {
      name: 'newsletterHeading',
      type: 'text',
      label: 'Newsletter Section Heading',
    },
    {
      name: 'newsletterDescription',
      type: 'textarea',
      label: 'Newsletter Description',
    },
    {
      name: 'newsletterPrivacyNote',
      type: 'text',
      label: 'Newsletter Privacy Note',
    },
    {
      name: 'featuredPublication',
      type: 'relationship',
      relationTo: 'publications',
      label: 'Featured Publication',
      admin: {
        description: 'Leave empty to automatically show the most recent publication.',
      },
    },
    {
      name: 'partners',
      type: 'array',
      label: 'Partners Marquee',
      admin: { description: 'Institutions shown in the scrolling marquee.' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    {
      name: 'marqueeItems',
      type: 'array',
      label: 'Dark Marquee Strip Items',
      fields: [{ name: 'text', type: 'text', required: true }],
    },
  ],
}
