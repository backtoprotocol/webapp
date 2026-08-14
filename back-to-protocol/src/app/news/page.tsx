import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { NEWSROOM_QUERY } from "@/sanity/lib/queries";

type Article = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  pillar: string;
  publishedAt?: string;
  readingMinutes?: number;
  author?: { name: string };
  isPlaceholder?: boolean;
  coverImage?: {
    alt?: string;
    asset?: { metadata?: { lqip?: string } };
  };
};

type SearchParams = {
  topic?: string | string[];
  year?: string | string[];
  month?: string | string[];
  q?: string | string[];
};

function getFirst(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function getMonthName(index: number) {
  return new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(2026, index, 1));
}

function formatMonthYear(dateInput?: string) {
  if (!dateInput) return "Undated";

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "Undated";
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);
}

function formatPublishedDate(dateInput?: string) {
  if (!dateInput) return "Date unavailable";

  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date);
}

function groupByMonth(articles: Article[]) {
  const grouped = new Map<string, Article[]>();

  articles.forEach((article) => {
    const key = formatMonthYear(article.publishedAt);
    const existing = grouped.get(key);
    if (existing) {
      existing.push(article);
      return;
    }

    grouped.set(key, [article]);
  });

  return Array.from(grouped.entries());
}

function fadeDelayClass(index: number) {
  const delays = ["fade-delay-1", "fade-delay-2", "fade-delay-3", "fade-delay-4"];
  return delays[index % delays.length];
}

function ArchiveRow({ article }: { article: Article }) {
  if (article.isPlaceholder) {
    return (
      <div className="block py-8">
        <article className="grid items-center gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50">
            <div className="flex aspect-[16/9] items-center justify-center text-5xl font-semibold text-slate-400">?</div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">Coming soon</p>
            <h3 className="mt-1.5 text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl">
              {article.title}
            </h3>
            <p className="mt-2 text-base text-slate-500">{article.subtitle || "A new article will appear here once it is published in Sanity."}</p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <Link href={`/news/${article.slug}`} className="group block py-8">
      <article className="grid items-center gap-6 md:grid-cols-[280px_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-cyan-100 via-white to-emerald-100">
          <div className="aspect-[16/9]">
            {article.coverImage?.asset ? (
              <SanityImage
                value={article.coverImage}
                width={900}
                height={506}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-5xl font-semibold text-slate-900">+</div>
            )}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{article.pillar || "News"}</p>
          <h3 className="mt-1.5 text-2xl font-semibold leading-tight tracking-tight text-slate-950 transition group-hover:text-cyan-800 sm:text-3xl">
            {article.title}
          </h3>
          <p className="mt-2 text-base text-slate-500">{formatPublishedDate(article.publishedAt)}</p>
        </div>
      </article>
    </Link>
  );
}

export default async function NewsPage({ searchParams }: { searchParams?: Promise<SearchParams> | SearchParams }) {
  let articles: Article[] = [];
  if (isSanityConfigured) {
    try {
      articles = (await client.fetch(NEWSROOM_QUERY)) as Article[];
    } catch (error) {
      console.error("Unable to load news articles from Sanity", error);
    }
  }

  const params = searchParams ? await searchParams : {};
  const hasLiveArticles = articles.length > 0;
  const displayArticles = hasLiveArticles
    ? articles
    : [
        {
          _id: "coming-soon",
          title: "Coming soon",
          subtitle: "A new newsroom article will appear here once it is published in Sanity.",
          slug: "",
          pillar: "Coming soon",
          publishedAt: "",
          isPlaceholder: true,
        } satisfies Article,
      ];
  const selectedTopic = getFirst(params.topic) ?? "all";
  const selectedYear = getFirst(params.year) ?? "all";
  const selectedMonth = getFirst(params.month) ?? "all";
  const searchQuery = (getFirst(params.q) ?? "").trim();

  const topics = Array.from(new Set(displayArticles.map((article) => article.pillar).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );

  const years = Array.from(
    new Set(
      displayArticles
        .map((article) => {
          if (!article.publishedAt) return null;
          const year = new Date(article.publishedAt).getFullYear();
          return Number.isNaN(year) ? null : String(year);
        })
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((a, b) => Number(b) - Number(a));

  const months = Array.from(
    new Set(
      displayArticles
        .map((article) => {
          if (!article.publishedAt) return null;
          const month = new Date(article.publishedAt).getMonth();
          return Number.isNaN(month) ? null : String(month);
        })
        .filter((value): value is string => Boolean(value)),
    ),
  ).sort((a, b) => Number(a) - Number(b));

  const filteredArticles = displayArticles.filter((article) => {
    if (selectedTopic !== "all" && article.pillar !== selectedTopic) return false;

    if (selectedYear !== "all") {
      const articleYear = article.publishedAt ? String(new Date(article.publishedAt).getFullYear()) : null;
      if (articleYear !== selectedYear) return false;
    }

    if (selectedMonth !== "all") {
      const articleMonth = article.publishedAt ? String(new Date(article.publishedAt).getMonth()) : null;
      if (articleMonth !== selectedMonth) return false;
    }

    if (searchQuery) {
      const searchValue = [article.title, article.subtitle, article.pillar, article.author?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!searchValue.includes(searchQuery.toLowerCase())) return false;
    }

    return true;
  });

  const groupedArticles = groupByMonth(filteredArticles);

  return (
    <main className="bg-white text-slate-950">
      <section className="fade-rise fade-delay-1 border-b border-slate-200 bg-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-3 px-6 py-4 sm:px-8 md:grid-cols-[1fr_auto] lg:px-10">
          <h1 className="text-4xl font-semibold tracking-tight">Newsroom</h1>

          <form method="get" className="flex items-center justify-start gap-2 md:justify-end">
            <input type="hidden" name="topic" value={selectedTopic} />
            <input type="hidden" name="year" value={selectedYear} />
            <input type="hidden" name="month" value={selectedMonth} />
            <label htmlFor="news-search" className="sr-only">
              Search Newsroom
            </label>
            <div className="relative w-full max-w-[220px]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
              </svg>
              <input
                id="news-search"
                name="q"
                defaultValue={searchQuery}
                placeholder="Search Newsroom"
                className="w-full rounded-full border border-slate-200 bg-slate-100 py-1.5 pl-9 pr-10 text-sm text-slate-800 outline-none transition focus:border-slate-400"
              />
              <button
                type="submit"
                aria-label="Search Newsroom"
                className="absolute right-1.5 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
                </svg>
              </button>
            </div>

            {searchQuery ? (
              <Link
                href={`/news?topic=${encodeURIComponent(selectedTopic)}&year=${encodeURIComponent(selectedYear)}&month=${encodeURIComponent(selectedMonth)}`}
                className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 transition hover:text-slate-900"
              >
                Clear
              </Link>
            ) : null}
          </form>
        </div>
      </section>

      <section className="fade-rise fade-delay-2 border-b border-slate-200 bg-[#ebedf1]">
        <div className="mx-auto max-w-6xl px-6 py-6 sm:px-8 lg:px-10">
          <form method="get" className="grid gap-3 md:grid-cols-[auto_1fr_1fr_1fr_auto] md:items-center">
            <input type="hidden" name="q" value={searchQuery} />
            <p className="text-sm font-semibold text-slate-500">Filter</p>

            <label className="sr-only" htmlFor="topic-select">
              All Topics
            </label>
            <select
              id="topic-select"
              name="topic"
              defaultValue={selectedTopic}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-slate-400"
            >
              <option value="all">All Topics</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="year-select">
              All Years
            </label>
            <select
              id="year-select"
              name="year"
              defaultValue={selectedYear}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-slate-400"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <label className="sr-only" htmlFor="month-select">
              All Months
            </label>
            <select
              id="month-select"
              name="month"
              defaultValue={selectedMonth}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-800 outline-none transition focus:border-slate-400"
            >
              <option value="all">All Months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {getMonthName(Number(month))}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="inline-flex h-[50px] items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Apply
            </button>
          </form>
        </div>
      </section>

      <section className="fade-rise fade-delay-3 mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
        {searchQuery ? (
          <p className="mb-4 text-sm text-slate-600">
            Showing results for <span className="font-semibold text-slate-900">"{searchQuery}"</span>
          </p>
        ) : null}

        {!filteredArticles.length ? (
          <p className="text-lg text-slate-600">No articles found for this filter set yet.</p>
        ) : (
          groupedArticles.map(([group, groupItems], groupIndex) => (
            <section key={group} className={`fade-rise ${fadeDelayClass(groupIndex)} mb-6`}>
              <h2 className="text-5xl font-semibold tracking-tight text-slate-950">{group}</h2>

              <div className="mt-5 border-t border-slate-300/80">
                {groupItems.map((article, index) => (
                  <div
                    key={article._id}
                    className={`${index > 0 ? "border-t border-slate-300/80 " : ""}fade-rise ${fadeDelayClass(index + 1)}`}
                  >
                    <ArchiveRow article={article} />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </section>
    </main>
  );
}
