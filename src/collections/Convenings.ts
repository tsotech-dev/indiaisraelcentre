import type { CollectionConfig } from 'payload'

export const Convenings: CollectionConfig = {
  slug: 'convenings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'eventDate', 'format'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    {
      name: 'format',
      type: 'select',
      required: true,
      defaultValue: 'lecture',
      options: [
        { label: 'Lecture', value: 'lecture' },
        { label: 'Panel', value: 'panel' },
        { label: 'Workshop', value: 'workshop' },
        { label: 'Roundtable', value: 'roundtable' },
        { label: 'Conference', value: 'conference' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'pillar',
      type: 'select',
      options: [
        { label: 'Identity, Heritage and Society', value: 'identity' },
        { label: 'Governance and Public Policy', value: 'governance' },
        { label: 'Security and Strategy', value: 'security' },
        { label: 'Technology and Innovation', value: 'technology' },
        { label: 'Development and Economic Cooperation', value: 'development' },
        { label: 'Culture and Soft Power', value: 'culture' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: { description: 'Optional YouTube or Vimeo URL of the recording.' },
    },
  ],
}
