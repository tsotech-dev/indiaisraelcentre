import type { GlobalConfig } from 'payload'

export const ForumArchive: GlobalConfig = {
  slug: 'forum-archive',
  label: 'Forum — Archive',
  admin: { group: 'Page Content' },
  access: { read: () => true, update: ({ req }) => Boolean(req.user) },
  fields: [
    { name: 'description', type: 'textarea', label: 'Archive Description' },
  ],
}
