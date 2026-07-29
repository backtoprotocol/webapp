import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SanityImage } from "@/components/sanity-image";
import { contentPillars } from "@/lib/content-pillars";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { CATEGORY_ARTICLES_QUERY } from "@/sanity/lib/queries";

type Article = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  pillar: string;
  publishedAt?: string;
  readingMinutes?: number;
  coverImage?: { alt?: string; asset?: { metadata?: { lqip?: string } } };
};

function formatDate(value?: string) {
  return value
    ? new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date(value))
    : "Coming soon";
}

function StoryCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <div className="aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
        {article.coverImage?.asset ? (
          <SanityImage
            value={article.coverImage}
            width={960}
            height={640}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900" />
        )}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">{article.pillar}</p>
      <h2 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-slate-950 group-hover:text-indigo-700">{article.title}</h2>
      {article.subtitle ? <p className="mt-3 text-sm leading-7 text-slate-600">{article.subtitle}</p> : null}
      <p className="mt-4 text-sm text-slate-500">
        {formatDate(article.publishedAt)}
        {article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}
      </p>
    </Link>
  );
}

export async function generateStaticParams() {
  return contentPillars.map((pillar) => ({ category: pillar.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const pillar = contentPillars.find((item) => item.name === category);

  if (!pillar) return {};

  return {
    title: `${pillar.name} articles | Back to Protocol`,
    description: pillar.definition,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const pillar = contentPillars.find((item) => item.name === category);

  if (!pillar) notFound();

  let articles: Article[] = [];

  if (isSanityConfigured) {
    articles = (await client.fetch(CATEGORY_ARTICLES_QUERY, { pillar: category })) as Article[];
  }

  return (
    <main className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600">
          ← Back to newsroom
        </Link>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.2)] sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600">Category</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">{pillar.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{pillar.definition}</p>
        </section>

        <section className="mt-8">
          {articles.length ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => (
                <StoryCard key={article._id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-slate-600">No articles have been published in this category yet.</div>
          )}
        </section>
      </div>
    </main>
  );
}
