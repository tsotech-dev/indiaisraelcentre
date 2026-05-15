import type { CollectionConfig } from "payload";

export const Publications: CollectionConfig = {
  slug: "publications",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "pillar", "publishedDate"],
  },
  access: {
    read: () => true,
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
      admin: {
        description:
          'URL-friendly version of the title (e.g. "india-israel-water-tech").',
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
          admin: { description: "Optional DOI string." },
        },
      ],
    },
  ],
};
