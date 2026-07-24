import Link from "next/link";
import { SanityImage } from "@/components/sanity-image";
import { contentPillars } from "@/lib/content-pillars";
import { isSanityConfigured } from "@/sanity/env";
import { client } from "@/sanity/lib/client";
import { NEWSROOM_QUERY } from "@/sanity/lib/queries";

type NewsArticle = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  pillar: string;
  publishedAt?: string;
  readingMinutes?: number;
  coverImage?: { alt?: string; asset?: { metadata?: { lqip?: string } } };
};

const artTreatments = [
  "from-indigo-600 via-violet-500 to-sky-400",
  "from-teal-500 via-cyan-500 to-sky-300",
  "from-slate-950 via-indigo-900 to-violet-600",
  "from-amber-400 via-orange-400 to-rose-400",
  "from-emerald-500 via-teal-500 to-cyan-400",
  "from-fuchsia-600 via-violet-600 to-indigo-500",
  "from-sky-500 via-blue-600 to-indigo-700",
  "from-rose-400 via-fuchsia-500 to-violet-600",
];

function Arrow({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-5 w-5 ${className}`} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13m-5-5 5 5-5 5" /></svg>;
}

function AbstractArt({ index, className = "" }: { index: number; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${artTreatments[index % artTreatments.length]} ${className}`} aria-hidden="true">
      <div className="absolute -left-10 top-8 h-40 w-40 rounded-full border border-white/45" />
      <div className="absolute right-[18%] top-[14%] h-24 w-24 rotate-45 rounded-[1.5rem] border border-white/35 bg-white/10" />
      <div className="absolute -bottom-14 right-0 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute bottom-7 left-8 h-px w-1/2 bg-white/60" />
      <div className="absolute bottom-5 right-8 font-mono text-[10px] tracking-[0.3em] text-white/70">BTP / SIGNAL</div>
    </div>
  );
}

function StoryVisual({ article, index, className = "", priority = false }: { article: NewsArticle; index: number; className?: string; priority?: boolean }) {
  if (article.coverImage?.asset) {
    return <div className={`relative overflow-hidden bg-slate-100 ${className}`}><SanityImage value={article.coverImage} width={1200} height={800} className="h-full w-full object-cover" priority={priority} /></div>;
  }
  return <AbstractArt index={index} className={className} />;
}

function StoryCard({ article, index, visual = "card" }: { article: NewsArticle; index: number; visual?: "lead" | "card" | "compact" }) {
  const visualHeight = visual === "lead" ? "aspect-[4/3]" : visual === "compact" ? "aspect-[4/3]" : "aspect-[16/10]";
  return (
    <Link href={`/news/${article.slug}`} className="group block">
      <StoryVisual article={article} index={index} className={`rounded-[1.5rem] ${visualHeight}`} priority={visual === "lead"} />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">{article.pillar}</p>
      <h3 className={`${visual === "lead" ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"} mt-3 font-semibold leading-[1.1] tracking-[-0.035em] text-slate-950 transition group-hover:text-indigo-700`}>{article.title}</h3>
      {visual !== "compact" && article.subtitle ? <p className="mt-3 text-sm leading-6 text-slate-600">{article.subtitle}</p> : null}
      <p className="mt-4 text-sm text-slate-500">{article.readingMinutes ? `${article.readingMinutes} min read` : "Read article"}</p>
    </Link>
  );
}

export default async function NewsPage() {
  let articles: NewsArticle[] = [];
  if (isSanityConfigured) {
    try {
      articles = await client.fetch(NEWSROOM_QUERY) as NewsArticle[];
    } catch {
      articles = [];
    }
  }

  const [lead, ...remaining] = articles;
  const supporting = remaining.slice(0, 2);
  const latest = (lead ? remaining.slice(2, 6) : remaining.slice(0, 4));

  return (
    <main className="relative overflow-hidden px-6 py-9 sm:px-8 lg:px-10 lg:py-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_5%_0%,rgba(79,70,229,0.13),transparent_22%),radial-gradient(circle_at_92%_12%,rgba(14,165,233,0.10),transparent_18%)]" />
      <div className="mx-auto max-w-7xl">
        <section className="border-b border-slate-200/80 pb-8 sm:pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-600">Back to Protocol / Newsroom</p>
          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div><h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">The signal for a healthier, more capable life.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Evidence-led reporting across the eight systems that move health forward.</p></div>
            <Link href="/subscribe" className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700">Get the weekly signal <Arrow /></Link>
          </div>
        </section>

        <nav aria-label="News pillars" className="flex gap-x-6 gap-y-3 overflow-x-auto border-b border-slate-200/80 py-5 text-sm font-medium whitespace-nowrap text-slate-600">
          {contentPillars.map((pillar) => <a key={pillar.name} href={`#${pillar.name.toLowerCase()}`} className="transition hover:text-indigo-600">{pillar.name}</a>)}
        </nav>

        <section className="py-10 sm:py-14">
          <div className="mb-6 flex items-baseline justify-between gap-4"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Featured coverage</p><p className="text-sm text-slate-500">Latest thinking, clearly translated</p></div>
          {lead ? (
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(16rem,.7fr)_minmax(15rem,.55fr)]">
              <StoryCard article={lead} index={0} visual="lead" />
              <div className="space-y-8">{supporting.length ? supporting.map((article, index) => <StoryCard key={article._id} article={article} index={index + 1} />) : <div className="border-t border-slate-200 pt-5"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">In the works</p><p className="mt-3 text-lg font-medium leading-7 text-slate-700">More evidence-led reporting is on its way.</p></div>}</div>
              <aside className="border-t border-slate-900 pt-4 xl:border-t-0 xl:border-l xl:pl-7">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Latest news</h2>
                <div className="mt-4 divide-y divide-slate-200 border-t border-slate-900">{latest.length ? latest.map((article, index) => <Link key={article._id} href={`/news/${article.slug}`} className="group flex gap-4 py-5"><div className="min-w-0 flex-1"><p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600">{article.pillar}</p><h3 className="mt-2 text-base font-semibold leading-5 text-slate-950 group-hover:text-indigo-700">{article.title}</h3></div><StoryVisual article={article} index={index + 3} className="h-16 w-16 shrink-0 rounded-xl" /></Link>) : <p className="py-5 text-sm leading-6 text-slate-500">Fresh reporting will appear here as it is published.</p>}</div>
              </aside>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-7 py-12 sm:px-10"><AbstractArt index={0} className="absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-90" /><div className="relative max-w-xl"><p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">Newsroom is warming up</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">The first dispatch is being prepared.</h2><p className="mt-4 leading-7 text-slate-600">Every published article will live here, organised by the pillar it helps strengthen.</p></div></div>
          )}
        </section>

        <div className="space-y-0 border-t border-slate-200">
          {contentPillars.map((pillar, pillarIndex) => {
            const pillarArticles = articles.filter((article) => article.pillar === pillar.name).slice(0, 3);
            return <section id={pillar.name.toLowerCase()} key={pillar.name} className="grid gap-8 border-b border-slate-200 py-10 sm:py-14 lg:grid-cols-[minmax(13rem,.72fr)_minmax(0,1.5fr)]">
              <div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">Pillar 0{pillarIndex + 1}</p><h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{pillar.name}</h2><p className="mt-4 max-w-xs leading-7 text-slate-600">{pillar.definition}</p>{pillarArticles.length ? <a href={`#${pillar.name.toLowerCase()}`} className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-slate-950 hover:text-indigo-700">Explore {pillar.name} <Arrow className="h-4 w-4" /></a> : <p className="mt-6 text-sm font-medium text-slate-500">New reporting coming soon.</p>}</div>
              {pillarArticles.length ? <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">{pillarArticles.map((article, index) => <StoryCard key={article._id} article={article} index={pillarIndex + index} visual="compact" />)}</div> : <div className="relative min-h-48 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-7"><AbstractArt index={pillarIndex} className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full opacity-70" /><div className="relative max-w-sm"><p className="text-sm font-semibold text-slate-950">{pillar.name}, queued up.</p><p className="mt-2 text-sm leading-6 text-slate-600">We are curating the research and practical stories worth bringing into this section.</p></div></div>}
            </section>;
          })}
        </div>
      </div>
    </main>
  );
}
