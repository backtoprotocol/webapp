import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const articleImage = defineType({
  name: "articleImage",
  title: "Article image",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", validation: (rule) => rule.required().warning("Add descriptive alternative text.") })], validation: (rule) => rule.required() }),
    defineField({ name: "caption", type: "string" }),
  ],
  preview: { select: { title: "caption", media: "image" } },
});
