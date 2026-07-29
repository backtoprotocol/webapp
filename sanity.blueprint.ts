import { defineBlueprint, defineDocumentFunction } from "@sanity/blueprints";

export default defineBlueprint({
  values: {
    projectId: process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production",
  },
  resources: [
    defineDocumentFunction({
      name: "article-uniqueness",
      project: "$.values.projectId",
      event: {
        on: ["create", "update"],
        includeDrafts: true,
        filter: '_type == "article" && defined(slug.current)',
        projection: "{_id, title, subtitle, pillar, topic, tags, keywords, mainConcepts, body, analysis{analysisStatus, similarityScore, similarityBand, contentFingerprint, semanticTerms}}",
      },
    }),
  ],
});
