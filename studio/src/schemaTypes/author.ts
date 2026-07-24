import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 4, validation: (rule) => rule.max(400).warning("Keep author bios brief.") }),
    defineField({ name: "image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
