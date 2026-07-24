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

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "publishing", title: "Publishing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(110) }),
    defineField({ name: "subtitle", title: "Standfirst", type: "text", rows: 3, validation: (rule) => rule.max(220).warning("Keep this concise for the article lead.") }),
    defineField({ name: "pillar", type: "string", options: { list: pillarOptions, layout: "dropdown" }, validation: (rule) => rule.required(), group: "editorial" }),
    defineField({ name: "coverImage", title: "Lead image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required().warning("Add descriptive alternative text.") })], group: "editorial" }),
    defineField({ name: "body", title: "Article body", type: "array", of: [
      defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 2", value: "h2" }, { title: "Heading 3", value: "h3" }, { title: "Pull quote", value: "blockquote" }], lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }], marks: { annotations: [
        { name: "link", type: "object", title: "Link", fields: [defineField({ name: "href", type: "url", validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto"] }) })] },
      ] } }),
      defineArrayMember({ type: "articleImage" }),
      defineArrayMember({ type: "callout" }),
    ], validation: (rule) => rule.required().min(1), group: "editorial" }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }], validation: (rule) => rule.required(), group: "editorial" }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", validation: (rule) => rule.required(), group: "publishing" }),
    defineField({ name: "readingMinutes", title: "Reading time (minutes)", type: "number", validation: (rule) => rule.required().integer().min(1).max(60), group: "publishing" }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required(), group: "publishing" }),
    defineField({ name: "seo", title: "Search and social", type: "seo", group: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "pillar", media: "coverImage" } },
});
