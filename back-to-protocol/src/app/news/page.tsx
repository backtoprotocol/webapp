import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { contentPillars } from "@/lib/content-pillars";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { FEATURED_ARTICLE_QUERY, FILTERED_ARTICLES_COUNT_QUERY, FILTERED_ARTICLES_QUERY, NEWSROOM_AUTHORS_QUERY, NEWSROOM_QUERY } from "@/sanity/lib/queries";

type Article = { _id: string; title: string; subtitle?: string; slug: string; pillar: string; publishedAt?: string; readingMinutes?: number; author?: { _id: string; name: string }; coverImage?: { alt?: string; asset?: { metadata?: { lqip?: string } } } };
type Author = { _id: string; name: string };
const perPage = 9;
function date(value?: string) { return value ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "Coming soon"; }
function Card({ article, featured = false }: { article: Article; featured?: boolean }) { return <Link href={`/news/${article.slug}`} className="group block"><div className={`overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-indigo-600 via-violet-500 to-sky-400 ${featured ? "aspect-[16/9]" : "aspect-[16/10]"}`}>{article.coverImage?.asset ? <SanityImage value={article.coverImage} width={featured ? 1440 : 900} height={featured ? 810 : 560} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" priority={featured} /> : null}</div><p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">{article.pillar}</p><h3 className={`${featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"} mt-3 font-semibold leading-[1.1] tracking-[-0.035em] text-slate-950 group-hover:text-indigo-700`}>{article.title}</h3>{article.subtitle ? <p className="mt-3 text-sm leading-6 text-slate-600">{article.subtitle}</p> : null}<p className="mt-4 text-sm text-slate-500">{date(article.publishedAt)}{article.author?.name ? ` · ${article.author.name}` : ""}{article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}</p></Link>; }

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ pillar?: string; author?: string; page?: string }> }) {
  const params = await searchParams;
  const pillar = contentPillars.some((item) => item.name === params.pillar) ? params.pillar : undefined;
  const author = params.author || undefined;
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const start = (page - 1) * perPage;
  let featured: Article | null = null, latest: Article[] = [], articles: Article[] = [], authors: Author[] = [], total = 0;
  if (isSanityConfigured) {
    [featured, latest, articles, authors, total] = await Promise.all([
      client.fetch(FEATURED_ARTICLE_QUERY) as Promise<Article | null>,
      client.fetch(NEWSROOM_QUERY) as Promise<Article[]>,
      client.fetch(FILTERED_ARTICLES_QUERY, { pillar: pillar ?? null, author: author ?? null, start, end: start + perPage }) as Promise<Article[]>,
      client.fetch(NEWSROOM_AUTHORS_QUERY) as Promise<Author[]>,
      client.fetch(FILTERED_ARTICLES_COUNT_QUERY, { pillar: pillar ?? null, author: author ?? null }) as Promise<number>,
    ]);
  }
  const pages = Math.max(1, Math.ceil(total / perPage));
  const href = (nextPage: number) => `/news?${new URLSearchParams({ ...(pillar ? { pillar } : {}), ...(author ? { author } : {}), page: String(nextPage) }).toString()}#browse`;
  return <main className="px-6 py-9 sm:px-8 lg:px-10 lg:py-12"><div className="mx-auto max-w-7xl">
    <section className="border-b border-slate-200 pb-10"><p className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-600">Back to Protocol / Newsroom</p><h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">The signal for a healthier, more capable life.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Evidence-led reporting across the eight systems that move health forward.</p></section>
    <nav className="flex gap-6 overflow-x-auto border-b border-slate-200 py-5 text-sm font-medium whitespace-nowrap text-slate-600" aria-label="News pillars">{contentPillars.map((item) => <Link key={item.name} href={`/news?pillar=${encodeURIComponent(item.name)}#browse`} className="hover:text-indigo-600">Explore {item.name}</Link>)}</nav>
    {featured ? <section className="py-12"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Featured coverage</p><div className="mt-6 max-w-4xl"><Card article={featured} featured /></div></section> : null}
    <section className="border-t border-slate-200 py-10"><div className="flex items-baseline justify-between"><h2 className="text-2xl font-semibold tracking-tight text-slate-950">Latest news</h2><a href="#browse" className="text-sm font-medium text-indigo-600 hover:text-slate-950">Browse all articles</a></div><div className="mt-6 grid gap-6 md:grid-cols-3">{latest.slice(0, 3).map((article) => <Card key={article._id} article={article} />)}</div></section>
    <section id="browse" className="border-t border-slate-200 py-12"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">Article library</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Browse every article</h2><form className="mt-7 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1fr_1fr_auto]" action="/news" method="get"><select name="pillar" defaultValue={pillar || ""} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><option value="">All categories</option>{contentPillars.map((item) => <option key={item.name} value={item.name}>{item.name}</option>)}</select><select name="author" defaultValue={author || ""} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"><option value="">All authors</option>{authors.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}</select><button className="rounded-xl bg-slate-950 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700">Filter articles</button></form>
      {articles.length ? <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <Card key={article._id} article={article} />)}</div> : <p className="mt-8 text-slate-600">No published articles match these filters yet.</p>}
      {pages > 1 ? <nav className="mt-10 flex items-center gap-3" aria-label="Article pages">{page > 1 ? <Link href={href(page - 1)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:border-indigo-300">Previous</Link> : null}<span className="text-sm text-slate-500">Page {page} of {pages}</span>{page < pages ? <Link href={href(page + 1)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:border-indigo-300">Next</Link> : null}</nav> : null}
    </section>
  </div></main>;
}
