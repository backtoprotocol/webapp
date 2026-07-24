import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/article-template";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG_QUERY, RELATED_ARTICLES_QUERY } from "@/sanity/lib/queries";

const starterArticle = {
  _id: "starter-article",
  slug: "your-first-article",
  pillar: "Movement",
  title: "A streamlined start for your first Back to Protocol article",
  subtitle: "This is a layout preview. Replace it by publishing your first article in Sanity.",
  publishedAt: "2026-07-24T12:00:00.000Z",
  readingMinutes: 4,
  author: { name: "Back to Protocol Editorial", role: "Evidence-led health reporting", bio: "We translate useful health research into clear, practical next steps across the eight pillars." },
  body: [
    { _key: "intro", _type: "block", style: "normal", markDefs: [], children: [{ _key: "intro-span", _type: "span", marks: [], text: "Your articles should feel calm, precise, and easy to follow. This starter shows the structure every Sanity article will use once your project is connected." }] },
    { _key: "heading", _type: "block", style: "h2", markDefs: [], children: [{ _key: "heading-span", _type: "span", marks: [], text: "A repeatable editorial rhythm" }] },
    { _key: "body", _type: "block", style: "normal", markDefs: [], children: [{ _key: "body-span", _type: "span", marks: [], text: "Start with a clear title and short standfirst. The main image creates a visual pause, then the narrow reading column keeps attention on the story. Use headings only when they help the reader move through the idea." }] },
  ],
};

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSanityConfigured) {
    if (slug !== starterArticle.slug) notFound();
    return <ArticleTemplate article={starterArticle} />;
  }

  const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
  if (!article) notFound();
  const related = await client.fetch(RELATED_ARTICLES_QUERY, { pillar: article.pillar, articleId: article._id });
  return <ArticleTemplate article={article} related={related} />;
}
