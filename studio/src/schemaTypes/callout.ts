import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { defineField, defineType } from "sanity";

export const callout = defineType({
  name: "callout",
  title: "Key takeaway",
  type: "object",
  icon: InfoOutlineIcon,
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Key takeaway" }),
    defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.required().max(500) }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});
