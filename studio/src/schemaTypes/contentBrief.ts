import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ContentBriefComposerInput } from "./contentBriefComposerInput";

const categoryOptions = [
  "Breakup & Relationship Recovery",
  "Anxiety & Stress Reset",
  "Discipline, Habits & Motivation",
  "Fat Loss & Metabolic Health",
  "Muscle Building & Strength",
  "Sleep & Recovery",
  "Grief & Loss",
  "Burnout & Career Reset",
  "Confidence & Self-Worth Rebuild",
  "Life Reset",
].map((title) => ({ title, value: title }));

const pillarOptions = [
  "Movement",
  "Nutrition",
  "Sleep",
  "Stress",
  "Relationships",
  "Recovery",
  "Longevity",
  "Mindset",
].map((title) => ({ title, value: title }));

const phaseOptions = [
  { title: "Breakdown", value: "Breakdown" },
  { title: "Reset", value: "Reset" },
  { title: "Rebuild", value: "Rebuild" },
  { title: "Upgrade", value: "Upgrade" },
];

const statusOptions = [
  { title: "Planning", value: "planning" },
  { title: "Drafting", value: "drafting" },
  { title: "Ready to publish", value: "ready" },
  { title: "Published", value: "published" },
];

export const contentBrief = defineType({
  name: "contentBrief",
  title: "Content brief",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Working title",
      type: "string",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: statusOptions, layout: "dropdown" },
      initialValue: "planning",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: categoryOptions, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pillar",
      title: "Primary pillar",
      type: "string",
      options: { list: pillarOptions, layout: "dropdown" },
      initialValue: "Mindset",
    }),
    defineField({
      name: "primaryAudience",
      title: "Primary audience",
      type: "string",
      description: "Who is this article for?",
    }),
    defineField({
      name: "specificScenario",
      title: "Specific struggle",
      type: "text",
      rows: 3,
      description: "Open with one concrete scenario, not a broad problem.",
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "angle",
      title: "Angle / promise",
      type: "text",
      rows: 3,
      description: "What makes this article distinct and useful?",
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "biologyPsychology",
      title: "Biology / psychology frame",
      type: "text",
      rows: 4,
      description: "Explain the mechanism in plain language.",
    }),
    defineField({
      name: "researchFocus",
      title: "Research focus",
      type: "text",
      rows: 4,
      description: "What studies or evidence will this article cover?",
    }),
    defineField({
      name: "protocolPhases",
      title: "Protocol phases",
      type: "array",
      of: [defineArrayMember({ type: "string", options: { list: phaseOptions } })],
      description: "Map the article to Breakdown, Reset, Rebuild, and Upgrade.",
    }),
    defineField({
      name: "mythBust",
      title: "Myth to bust",
      type: "text",
      rows: 3,
      description: "One common bad piece of advice to correct.",
    }),
    defineField({
      name: "cta",
      title: "Next step / CTA",
      type: "text",
      rows: 3,
      description: "What should the reader do next?",
    }),
    defineField({
      name: "avoidOverlap",
      title: "Avoid overlap",
      type: "text",
      rows: 3,
      description: "List related topics, themes, or past articles to avoid repeating.",
    }),
    defineField({
      name: "topicFingerprint",
      title: "Topic fingerprint",
      type: "string",
      description: "A short unique tag such as breakup-sleep-recovery-01.",
    }),
    defineField({
      name: "relatedArticles",
      title: "Related articles",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "article" }] })],
    }),
    defineField({
      name: "notes",
      title: "Writer notes",
      type: "text",
      rows: 6,
      description: "Anything extra the writer should remember.",
    }),
    defineField({
      name: "articlePrompt",
      title: "Drafting prompt",
      type: "text",
      rows: 8,
      description: "A reusable prompt that turns this brief into an article draft.",
      components: {
        input: ContentBriefComposerInput,
      },
    }),
    defineField({
      name: "slug",
      title: "Brief slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
