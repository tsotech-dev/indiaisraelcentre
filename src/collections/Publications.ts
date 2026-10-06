import type { CollectionConfig } from "payload"

function slugify(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .join('-')
}

export const Publications: CollectionConfig = {
  slug: "publications",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "pillar", "publishedDate"],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.slug) {
          data.slug = data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
        } else if (data.title) {
          data.slug = slugify(data.title)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      validate: (val: string | null | undefined) => {
        if (!val) return 'Slug is required.'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(val))
          return 'Slug may only contain lowercase letters, numbers, and hyphens (no leading/trailing hyphens).'
        return true
      },
      admin: {
        description: 'Auto-generated from title. Only lowercase letters, numbers, and hyphens.',
      },
    },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "paper",
      options: [
        { label: "Paper", value: "paper" },
        { label: "Brief", value: "brief" },
        { label: "Commentary", value: "commentary" },
      ],
    },
    {
      name: "pillar",
      type: "select",
      required: true,
      options: [
        { label: "Identity, Heritage and Society", value: "identity" },
        { label: "Governance and Public Policy", value: "governance" },
        { label: "Security and Strategy", value: "security" },
        { label: "Technology and Innovation", value: "technology" },
        { label: "Development and Economic Cooperation", value: "development" },
        { label: "Culture and Soft Power", value: "culture" },
      ],
    },
    {
      name: "authors",
      type: "array",
      required: true,
      minRows: 1,
      labels: { singular: "Author", plural: "Authors" },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "affiliation", type: "text" },
      ],
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "abstract",
      type: "textarea",
      admin: {
        description:
          "Short summary shown on cards and previews (1–3 sentences).",
      },
    },
    {
      name: "body",
      type: "richText",
    },
    {
      type: "collapsible",
      label: "Supporting files (optional)",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "pdf",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Optional PDF — typically for Papers and Briefs.",
          },
        },
        {
          name: "doi",
          type: "text",
          label: "External Link",
          admin: { description: "Optional external link (URL or DOI)." },
        },
      ],
    },
  ],
};
