import Link from "next/link";
import { ArticleBody } from "@/components/article-body";
import { SanityImage } from "@/components/sanity-image";

type Article = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  pillar: string;
  publishedAt?: string;
  readingMinutes?: number;
  coverImage?: { alt?: string; asset?: { metadata?: { lqip?: string } } };
  author?: { name?: string; role?: string; bio?: string; image?: { alt?: string; asset?: { metadata?: { lqip?: string } } } };
  body?: Parameters<typeof ArticleBody>[0]["value"];
};

function formatDate(value?: string) {
  if (!value) return "Coming soon";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function ArticleTemplate({ article, related = [] }: { article: Article; related?: Article[] }) {
  return (
    <main className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600">← Back to newsroom</Link>
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">{article.pillar}</p>
            <p className="mt-4 text-sm text-slate-500">{formatDate(article.publishedAt)}{article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">{article.title}</h1>
            {article.subtitle ? <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">{article.subtitle}</p> : null}
          </div>
          <div className="border-t border-slate-200 pt-5 lg:border-t-0 lg:border-l lg:pl-7 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Share article</p>
            <div className="mt-3 flex gap-2">
              {["in", "X", "↗"].map((label) => <button key={label} type="button" aria-label={`Share on ${label}`} className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">{label}</button>)}
            </div>
          </div>
        </div>

        {article.coverImage?.asset ? <div className="mt-10 overflow-hidden rounded-[2rem] bg-slate-100"><SanityImage value={article.coverImage} width={1440} height={810} className="h-auto w-full" priority /></div> : <div className="mt-10 aspect-[16/8] rounded-[2rem] bg-gradient-to-br from-indigo-700 via-violet-600 to-sky-500" />}

        <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[10rem_minmax(0,42rem)]">
          <aside className="border-t border-slate-200 pt-5 lg:border-t-0 lg:border-r lg:pr-7 lg:pt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Author</p>
            <p className="mt-3 font-semibold text-slate-950">{article.author?.name || "Back to Protocol Editorial"}</p>
            {article.author?.role ? <p className="mt-1 text-sm leading-5 text-slate-500">{article.author.role}</p> : null}
          </aside>
          <article><ArticleBody value={article.body} /></article>
        </div>

        {article.author?.bio ? <section className="mx-auto mt-16 max-w-5xl border-t border-slate-200 pt-8"><p className="text-sm leading-7 text-slate-600"><span className="font-semibold text-slate-950">About {article.author.name}. </span>{article.author.bio}</p></section> : null}

        {related.length ? <section className="mt-16 border-t border-slate-200 pt-10"><div className="flex items-baseline justify-between"><h2 className="text-2xl font-semibold tracking-tight text-slate-950">More from {article.pillar}</h2><Link href="/news" className="text-sm font-medium text-indigo-600 hover:text-slate-950">View all</Link></div><div className="mt-7 grid gap-5 md:grid-cols-3">{related.map((item) => <Link key={item._id} href={`/news/${item.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">{item.pillar}</p><h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 group-hover:text-indigo-700">{item.title}</h3><p className="mt-3 text-sm text-slate-500">{formatDate(item.publishedAt)}</p></Link>)}</div></section> : null}
      </div>
    </main>
  );
}
