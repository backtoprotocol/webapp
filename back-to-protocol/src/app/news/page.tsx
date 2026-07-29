import type { Metadata } from "next";
import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { contentPillars } from "@/lib/content-pillars";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { FEATURED_ARTICLE_QUERY, NEWSROOM_QUERY } from "@/sanity/lib/queries";

type Article = {
  _id: string;
  title: string;
  subtitle?: string;
  topic?: string;
  tags?: string[];
  keywords?: string[];
  mainConcepts?: string[];
  slug: string;
  pillar: string;
  publishedAt?: string;
  readingMinutes?: number;
  author?: { name: string };
  coverImage?: { alt?: string; asset?: { metadata?: { lqip?: string } } };
};

export const metadata: Metadata = {
  title: "News | Back to Protocol",
  description: "Clean, evidence-led reporting across movement, nutrition, sleep, stress, hormones, recovery, longevity, and mindset.",
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

function StoryCard({ article, large = false }: { article: Article; large?: boolean }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <div
        className={`overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 ${
          large ? "aspect-[16/9]" : "aspect-[16/10]"
        }`}
      >
        {article.coverImage?.asset ? (
          <SanityImage
            value={article.coverImage}
            width={large ? 1440 : 960}
            height={large ? 810 : 640}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            priority={large}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900" />
        )}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">{article.pillar}</p>
      <h3 className={`${large ? "mt-3 text-3xl sm:text-4xl" : "mt-2 text-xl sm:text-2xl"} font-semibold tracking-[-0.04em] text-slate-950 group-hover:text-indigo-700`}>
        {article.title}
      </h3>
      {article.subtitle ? <p className="mt-3 text-sm leading-7 text-slate-600">{article.subtitle}</p> : null}
      <p className="mt-4 text-sm text-slate-500">
        {formatDate(article.publishedAt)}
        {article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}
      </p>
    </Link>
  );
}

export default async function NewsPage() {
  let articles: Article[] = [];
  let featured: Article | null = null;

  if (isSanityConfigured) {
    [articles, featured] = await Promise.all([
      client.fetch(NEWSROOM_QUERY) as Promise<Article[]>,
      client.fetch(FEATURED_ARTICLE_QUERY) as Promise<Article | null>,
    ]);
  }

  const displayFeatured = featured || articles[0] || null;
  const latest = articles.filter((article) => article._id !== displayFeatured?._id).slice(0, 3);

  return (
    <main className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:gap-12">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.2)] sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_18rem] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600">Back to Protocol / News</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
                A calmer, more precise newsroom for modern health reporting.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Evidence-led articles across movement, nutrition, sleep, stress, hormones, recovery, longevity, and mindset.
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Archive</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Search the full article library, filter by author or category, and jump into any topic stream.
              </p>
              <Link
                href="/articles"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Open archive
              </Link>
            </div>
          </div>
        </section>

        {displayFeatured ? (
          <section className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)]">
            <div className="space-y-5">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Featured coverage</p>
                <Link href="/articles" className="text-sm font-medium text-indigo-600 transition hover:text-slate-950">
                  All articles
                </Link>
              </div>
              <StoryCard article={displayFeatured} large />
            </div>

            <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Latest dispatches</p>
              <div className="mt-5 space-y-5 divide-y divide-slate-200">
                {latest.map((article) => (
                  <Link key={article._id} href={`/news/${article.slug}`} className="group block pt-5 first:pt-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600">{article.pillar}</p>
                    <h2 className="mt-2 text-base font-semibold leading-6 text-slate-950 group-hover:text-indigo-700">{article.title}</h2>
                    <p className="mt-2 text-sm text-slate-500">
                      {formatDate(article.publishedAt)}
                      {article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          </section>
        ) : (
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-slate-600">
            Published articles will appear here once Sanity is connected.
          </section>
        )}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {contentPillars.map((pillar) => (
            <div key={pillar.name} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">{pillar.name}</p>
            </div>
          ))}
        </section>

        <section className="space-y-8">
          {contentPillars.map((pillar) => {
            const items = articles.filter((article) => article.pillar === pillar.name).slice(0, 3);

            return (
              <div key={pillar.name} className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)] sm:px-8">
                <div className="flex flex-col gap-3 border-b border-slate-200 pb-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">{pillar.name}</p>
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">Latest reporting</h2>
                </div>

                <div className="mt-6">
                  {items.length ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {items.map((article) => (
                        <StoryCard key={article._id} article={article} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">New reporting coming soon.</p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
