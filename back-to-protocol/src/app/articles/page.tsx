import type { Metadata } from "next";
import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { contentPillars } from "@/lib/content-pillars";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { ARCHIVE_ARTICLES_COUNT_QUERY, ARCHIVE_ARTICLES_QUERY, NEWSROOM_AUTHORS_QUERY } from "@/sanity/lib/queries";

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

type Author = { _id: string; name: string };

const perPage = 12;

export const metadata: Metadata = {
  title: "Article archive | Back to Protocol",
  description: "Search every Back to Protocol article by category, author, or keyword.",
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

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ pillar?: string; author?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const pillar = contentPillars.some((item) => item.name === params.pillar) ? params.pillar : undefined;
  const author = params.author || undefined;
  const searchTerm = params.q?.trim() || undefined;
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const start = (page - 1) * perPage;

  let articles: Article[] = [];
  let authors: Author[] = [];
  let total = 0;

  if (isSanityConfigured) {
    [articles, authors, total] = await Promise.all([
      client.fetch(ARCHIVE_ARTICLES_QUERY, {
        pillar,
        author,
        searchTerm,
        start,
        end: start + perPage,
      }) as Promise<Article[]>,
      client.fetch(NEWSROOM_AUTHORS_QUERY) as Promise<Author[]>,
      client.fetch(ARCHIVE_ARTICLES_COUNT_QUERY, {
        pillar,
        author,
        searchTerm,
      }) as Promise<number>,
    ]);
  }

  const pages = Math.max(1, Math.ceil(total / perPage));

  const buildHref = (next: number) => {
    const searchParams = new URLSearchParams();
    if (pillar) searchParams.set("pillar", pillar);
    if (author) searchParams.set("author", author);
    if (searchTerm) searchParams.set("q", searchTerm);
    searchParams.set("page", String(next));
    return `/articles?${searchParams.toString()}`;
  };

  return (
    <main className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8">
          <section className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.2)] sm:px-8 lg:px-10">
            <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600">
              ← Back to newsroom
            </Link>
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600">Archive</p>
                <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Search every article in one clean archive.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Filter by category, author, or keyword to find the exact article you need.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Coverage</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {contentPillars.length} categories, {total} published articles, and a structured archive ready to scale.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {contentPillars.map((pillarItem) => (
              <Link
                key={pillarItem.name}
                href={`/news/category/${encodeURIComponent(pillarItem.name)}`}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_50px_-35px_rgba(79,70,229,0.3)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-950">{pillarItem.name}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{pillarItem.definition}</p>
              </Link>
            ))}
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)] sm:p-8">
            <form className="grid gap-3 lg:grid-cols-[1.1fr_1fr_1fr_auto]" action="/articles" method="get">
              <input
                name="q"
                defaultValue={searchTerm}
                placeholder="Search titles, topics, tags, or concepts"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
              <select
                name="pillar"
                defaultValue={pillar || ""}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option value="">All categories</option>
                {contentPillars.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                name="author"
                defaultValue={author || ""}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option value="">All authors</option>
                {authors.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">Apply filters</button>
            </form>
          </section>

          <section>
            <div className="mb-5 flex items-baseline justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                {total} result{total === 1 ? "" : "s"}
              </p>
              {searchTerm || pillar || author ? <Link href="/articles" className="text-sm font-medium text-indigo-600 transition hover:text-slate-950">Clear filters</Link> : null}
            </div>

            {articles.length ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <StoryCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 text-slate-600">
                No published articles match those filters.
              </div>
            )}

            {pages > 1 ? (
              <nav className="mt-10 flex items-center gap-3">
                {page > 1 ? (
                  <Link href={buildHref(page - 1)} className="rounded-full border border-slate-200 px-4 py-2 text-sm">
                    Previous
                  </Link>
                ) : null}
                <span className="text-sm text-slate-500">
                  Page {page} of {pages}
                </span>
                {page < pages ? (
                  <Link href={buildHref(page + 1)} className="rounded-full border border-slate-200 px-4 py-2 text-sm">
                    Next
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
