import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

const pillarOptions = [
  "Movement",
  "Nutrition",
  "Sleep",
  "Stress",
  "Hormones",
  "Recovery",
  "Longevity",
  "Mindset",
].map((title) => ({ title, value: title }));

const similarityLabelOptions = [
  { title: "Unique", value: "unique" },
  { title: "Needs review", value: "needs-review" },
  { title: "Possible duplicate", value: "duplicate" },
];

const analysisStatusOptions = [
  { title: "Pending", value: "pending" },
  { title: "Analyzing", value: "analyzing" },
  { title: "Approved", value: "approved" },
  { title: "Needs review", value: "needs-review" },
  { title: "Possible duplicate", value: "duplicate" },
];

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "metadata", title: "Metadata" },
    { name: "publishing", title: "Publishing" },
    { name: "analysis", title: "Uniqueness" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(110),
      group: "editorial",
    }),
    defineField({
      name: "subtitle",
      title: "Standfirst",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(220).warning("Keep this concise for the article lead."),
      group: "editorial",
    }),
    defineField({
      name: "pillar",
      title: "Category",
      type: "string",
      options: { list: pillarOptions, layout: "dropdown" },
      validation: (rule) => rule.required(),
      initialValue: "Movement",
      group: "editorial",
    }),
    defineField({
      name: "topic",
      title: "Primary topic",
      type: "string",
      description: "A short topic label used by the uniqueness workflow.",
      group: "metadata",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.unique().max(12),
      group: "metadata",
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.unique().max(12),
      group: "metadata",
    }),
    defineField({
      name: "mainConcepts",
      title: "Main concepts",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.unique().max(12),
      group: "metadata",
    }),
    defineField({
      name: "coverImage",
      title: "Lead image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required().warning("Add descriptive alternative text.") })],
      group: "editorial",
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Pull quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  defineField({
                    name: "href",
                    type: "url",
                    validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto"] }),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({ type: "articleImage" }),
        defineArrayMember({ type: "callout" }),
      ],
      validation: (rule) => rule.required().min(1),
      group: "editorial",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
      group: "editorial",
    }),
    defineField({
      name: "newsroomPlacement",
      title: "Newsroom placement",
      description: "Choose Featured for the one article displayed in Featured coverage.",
      type: "string",
      options: {
        list: [
          { title: "Standard article", value: "standard" },
          { title: "Featured coverage", value: "featured" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
      group: "publishing",
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      validation: (rule) => rule.required(),
      group: "publishing",
    }),
    defineField({
      name: "readingMinutes",
      title: "Reading time (minutes)",
      type: "number",
      validation: (rule) => rule.required().integer().min(1).max(60),
      group: "publishing",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      group: "publishing",
    }),
    defineField({
      name: "analysis",
      title: "Uniqueness analysis",
      type: "object",
      group: "analysis",
      fields: [
        defineField({
          name: "analysisStatus",
          title: "Analysis status",
          type: "string",
          options: { list: analysisStatusOptions, layout: "radio" },
          initialValue: "pending",
          readOnly: true,
        }),
        defineField({
          name: "similarityScore",
          title: "Similarity score",
          type: "number",
          description: "0-100 semantic similarity to the closest known article.",
          readOnly: true,
        }),
        defineField({
          name: "similarityBand",
          title: "Similarity band",
          type: "string",
          options: { list: similarityLabelOptions, layout: "radio" },
          readOnly: true,
        }),
        defineField({
          name: "contentFingerprint",
          title: "Content fingerprint",
          type: "string",
          description: "A stable semantic fingerprint used for deduplication.",
          readOnly: true,
        }),
        defineField({
          name: "semanticTerms",
          title: "Semantic terms",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          hidden: true,
          description: "Normalized topic terms used by the semantic similarity engine.",
          readOnly: true,
        }),
        defineField({
          name: "lastAnalyzedAt",
          title: "Last analyzed",
          type: "datetime",
          readOnly: true,
        }),
        defineField({
          name: "similarArticles",
          title: "Similar articles",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "article",
                  type: "reference",
                  to: [{ type: "article" }],
                }),
                defineField({
                  name: "score",
                  type: "number",
                  title: "Similarity score",
                }),
                defineField({
                  name: "reason",
                  type: "string",
                  title: "Why it matched",
                }),
              ],
            }),
          ],
          readOnly: true,
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Search and social",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "pillar", media: "coverImage" },
  },
});
