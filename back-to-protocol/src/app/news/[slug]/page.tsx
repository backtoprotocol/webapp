import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/article-template";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { ARTICLE_BY_SLUG_QUERY, RELATED_ARTICLES_QUERY } from "@/sanity/lib/queries";

const placeholderArticle = {
  _id: "coming-soon",
  slug: "coming-soon",
  pillar: "Coming soon",
  title: "Coming soon",
  subtitle: "This article will appear here once it is published in Sanity.",
  publishedAt: "",
  readingMinutes: 0,
  author: { name: "Back to Protocol Editorial", role: "Research team", bio: "This article is pending publication in Sanity." },
};

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSanityConfigured) {
    return <ArticleTemplate article={{ ...placeholderArticle, slug }} />;
  }

  let article: typeof placeholderArticle | null = null;
  let related: typeof placeholderArticle[] = [];

  try {
    article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug });
    if (article?.pillar) {
      related = await client.fetch(RELATED_ARTICLES_QUERY, { pillar: article.pillar, articleId: article._id });
    }
  } catch (error) {
    console.error("Unable to load article from Sanity", error);
  }

  if (!article) {
    article = { ...placeholderArticle, slug };
  }

  return <ArticleTemplate article={article} related={related} />;
}
