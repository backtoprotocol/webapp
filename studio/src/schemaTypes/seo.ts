import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "metaTitle", title: "Meta title", type: "string", validation: (rule) => rule.max(60).warning("Aim for 50–60 characters.") }),
    defineField({ name: "metaDescription", title: "Meta description", type: "text", rows: 3, validation: (rule) => rule.max(160).warning("Aim for 150–160 characters.") }),
  ],
});
