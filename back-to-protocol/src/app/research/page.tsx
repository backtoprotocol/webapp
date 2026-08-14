import Link from "next/link";
import { cache } from "react";
import { client } from "@/sanity/lib/client";
import { ResearchLoop } from "@/components/research-loop";
import { SanityImage } from "@/components/sanity-image";
import { MainPageScrollReveal } from "@/components/main-page-scroll-reveal";

const researchQuery = /* groq */ `
  *[_type == "article" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc)[0...20] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    pillar,
    publishedAt,
    readingMinutes,
    author->{ _id, name },
    coverImage
  }
`;

type Article = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  pillar: string;
  publishedAt?: string;
  author?: { name?: string };
  coverImage?: { asset?: { metadata?: { lqip?: string } }; alt?: string };
};

const cardAccentPalette = {
  study: ["from-slate-100 to-slate-200", "from-slate-50 to-slate-150"],
  quickRead: ["from-cyan-200 via-sky-100 to-emerald-200", "from-cyan-200 via-sky-100 to-emerald-200", "from-cyan-200 via-sky-100 to-emerald-200"],
  loop: ["from-cyan-200 via-sky-100 to-emerald-200", "from-emerald-200 via-cyan-100 to-sky-200", "from-sky-200 via-cyan-100 to-emerald-200"],
  story: ["from-cyan-200 via-sky-100 to-emerald-200", "from-emerald-200 via-cyan-100 to-sky-200", "from-sky-200 via-cyan-100 to-emerald-200"],
  newsroom: ["from-amber-200 to-orange-300", "from-slate-200 to-slate-300", "from-cyan-200 to-blue-400", "from-emerald-200 to-cyan-300"],
};

function ResearchMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="22" fill="currentColor" />
      <path d="M20 38h24v4H20zm0-8h24v4H20zm0-8h15v4H20z" fill="white" />
    </svg>
  );
}

function formatDate(value?: string) {
  if (!value) return "Coming soon";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Coming soon";

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function chunk<T>(items: T[], size: number) {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}

function revealDelayClass(index: number) {
  const delays = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4", "reveal-delay-5"];
  return delays[index % delays.length];
}

const getResearchArticles = cache(async () => {
  return (await client.fetch(researchQuery)) as Article[];
});

export default async function ResearchPage() {
  const articles = await getResearchArticles();

  const hasLiveArticles = articles.length > 0;
  const heroArticle = hasLiveArticles ? articles[0] : null;
  const featuredStudyData = heroArticle
    ? {
        tag: heroArticle.pillar || "Research Release",
        title: heroArticle.title,
        date: formatDate(heroArticle.publishedAt),
        subtitle: heroArticle.subtitle || "",
      }
    : {
        tag: "Research Release",
        title: "Research content will appear here as soon as Sanity has articles",
        date: formatDate(undefined),
        subtitle: "",
      };

  const studyCardsData = hasLiveArticles
    ? articles.slice(1, 3).map((article, index) => ({
        tag: article.pillar || (index === 0 ? "Research Release" : "Update"),
        title: article.title,
        date: formatDate(article.publishedAt),
        accent: cardAccentPalette.study[index] || cardAccentPalette.study[0],
        slug: article.slug,
        coverImage: article.coverImage,
      }))
    : [];

  const quickReadsData = hasLiveArticles
    ? articles.slice(3, 6).map((article, index) => ({
        tag: article.pillar || "Update",
        title: article.title,
        date: formatDate(article.publishedAt),
        accent: cardAccentPalette.quickRead[index] || cardAccentPalette.quickRead[0],
        slug: article.slug,
        coverImage: article.coverImage,
      }))
    : [];

  const loopCardsData = hasLiveArticles
    ? articles.slice(6, 11).map((article, index) => ({
        author: article.author?.name || "Protocol+ Team",
        title: article.title,
        date: formatDate(article.publishedAt),
        accent: cardAccentPalette.loop[index] || cardAccentPalette.loop[0],
        slug: article.slug,
        coverImage: article.coverImage,
      }))
    : [];

  const storiesCardsData = hasLiveArticles
    ? articles.slice(11, 14).map((article, index) => ({
        tag: article.pillar || "Stories",
        title: article.title,
        date: formatDate(article.publishedAt),
        accent: cardAccentPalette.story[index] || cardAccentPalette.story[0],
        slug: article.slug,
        coverImage: article.coverImage,
      }))
    : [];

  const storiesHeroArticle = hasLiveArticles
    ? (articles[14] ?? articles[11] ?? articles[0] ?? null)
    : null;

  const storiesHeroData = storiesHeroArticle
    ? {
        tag: storiesHeroArticle.pillar || "Stories",
        title: storiesHeroArticle.title,
        date: formatDate(storiesHeroArticle.publishedAt),
        subtitle: storiesHeroArticle.subtitle || "",
        slug: storiesHeroArticle.slug,
        coverImage: storiesHeroArticle.coverImage,
      }
    : null;

  const newsroomRowsData = hasLiveArticles
    ? chunk(articles.slice(14), 2).map((row, rowIndex) =>
        row.map((article) => ({
          tag: (article as Article).pillar || "Update",
          title: (article as Article).title,
          date: formatDate((article as Article).publishedAt),
          accent: cardAccentPalette.newsroom[(rowIndex * 2 + row.indexOf(article)) % cardAccentPalette.newsroom.length],
          slug: (article as Article).slug,
          coverImage: (article as Article).coverImage,
        })),
      )
    : [];

  const studyCardsToRender = studyCardsData.length ? studyCardsData : [];
  const quickReadsToRender = quickReadsData.length ? quickReadsData : [];
  const loopCardsToRender = loopCardsData.length ? loopCardsData : [];
  const storiesCardsToRender = storiesCardsData.length ? storiesCardsData : [];
  const newsroomRowsToRender = newsroomRowsData.length ? newsroomRowsData : [];

  return (
    <main className="bg-[#f3f3f5] px-6 py-10 text-slate-950 sm:px-8 lg:px-10 lg:py-14">
      <MainPageScrollReveal />

      <section className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Latest Research</h1>

        {heroArticle ? (
          <Link href={`/news/${heroArticle.slug}`} data-reveal className="scroll-reveal reveal-delay-1 mt-8 block">
            <article className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,0.3)] lg:grid-cols-[1.65fr_1fr]">
              <div className="flex min-h-[260px] items-center justify-center px-6 py-10 sm:min-h-[290px]">
                <ResearchMark className="h-24 w-24 text-slate-900 sm:h-28 sm:w-28" />
              </div>

              <div className="flex flex-col justify-between px-6 py-8 sm:px-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{featuredStudyData.tag}</p>
                  <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950">
                    {featuredStudyData.title}
                  </h2>
                  {featuredStudyData.subtitle ? (
                    <p className="mt-4 text-sm leading-7 text-slate-600">{featuredStudyData.subtitle}</p>
                  ) : null}
                </div>
                <p className="mt-8 text-base text-slate-500">{featuredStudyData.date}</p>
              </div>
            </article>
          </Link>
        ) : (
          <article data-reveal className="scroll-reveal reveal-delay-1 mt-8 grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,0.3)] lg:grid-cols-[1.65fr_1fr]">
            <div className="flex min-h-[260px] items-center justify-center px-6 py-10 sm:min-h-[290px]">
              <ResearchMark className="h-24 w-24 text-slate-900 sm:h-28 sm:w-28" />
            </div>

            <div className="flex flex-col justify-between px-6 py-8 sm:px-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{featuredStudyData.tag}</p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950">
                  {featuredStudyData.title}
                </h2>
                {featuredStudyData.subtitle ? (
                  <p className="mt-4 text-sm leading-7 text-slate-600">{featuredStudyData.subtitle}</p>
                ) : null}
              </div>
              <p className="mt-8 text-base text-slate-500">{featuredStudyData.date}</p>
            </div>
          </article>
        )}

        <section data-reveal className="scroll-reveal reveal-delay-2 mt-8 grid gap-6 md:grid-cols-2">
          {studyCardsToRender.map((card, index) => {
            const cardContent = (
              <article
                key={card.title}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_65px_-45px_rgba(15,23,42,0.3)]"
              >
                <div className={`relative flex min-h-[250px] items-center justify-center overflow-hidden bg-gradient-to-b ${card.accent} p-8`}>
                  {card.coverImage?.asset ? (
                    <SanityImage value={card.coverImage} width={900} height={560} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                  <ResearchMark className="relative z-10 h-24 w-24 text-slate-900" />
                </div>

                <div className="px-6 pb-8 pt-6 sm:px-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{card.tag}</p>
                  <h3 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-8 text-base text-slate-500">{card.date}</p>
                </div>
              </article>
            );

            if (card.slug) {
              return (
                <Link key={card.title} href={`/news/${card.slug}`} data-reveal className={`scroll-reveal ${revealDelayClass(index + 2)} block`}>
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={card.title} data-reveal className={`scroll-reveal ${revealDelayClass(index + 2)}`}>
                {cardContent}
              </div>
            );
          })}
        </section>

        <section data-reveal className="scroll-reveal reveal-delay-3 mt-10 grid gap-6 md:grid-cols-3">
          {quickReadsToRender.map((item, index) => {
            const cardContent = (
              <article
                key={item.title}
                className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_25px_65px_-45px_rgba(15,23,42,0.35)]"
              >
                <div className={`relative min-h-[180px] overflow-hidden bg-gradient-to-br ${item.accent}`}>
                  {item.coverImage?.asset ? (
                    <SanityImage value={item.coverImage} width={700} height={420} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  {index === 2 ? (
                    <div className="absolute right-4 top-4 h-9 w-9 rounded-full bg-white/85 text-center text-2xl leading-9 text-slate-500">
                      +
                    </div>
                  ) : null}
                </div>
                <div className="px-6 pb-6 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">{item.tag}</p>
                  <h3 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-6 text-sm font-medium text-slate-500">{item.date}</p>
                </div>
              </article>
            );

            if (item.slug) {
              return (
                <Link key={item.title} href={`/news/${item.slug}`} data-reveal className={`scroll-reveal ${revealDelayClass(index + 1)} block`}>
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={item.title} data-reveal className={`scroll-reveal ${revealDelayClass(index + 1)}`}>
                {cardContent}
              </div>
            );
          })}
        </section>

        <div data-reveal className="scroll-reveal reveal-delay-4">
          <ResearchLoop cards={loopCardsToRender} />
        </div>

        <section data-reveal className="scroll-reveal reveal-delay-2 mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Stories</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-7 text-slate-600">
              Creators, developers, and innovators using Protocol+ tools to build healthier routines.
            </p>
          </div>

          {storiesHeroData ? (
            <Link href={`/news/${storiesHeroData.slug}`} data-reveal className="scroll-reveal reveal-delay-3 mt-10 block">
              <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,0.3)]">
                <div className="relative grid min-h-[420px] grid-cols-4 grid-rows-2 overflow-hidden">
                  {storiesHeroData.coverImage?.asset ? (
                    <SanityImage value={storiesHeroData.coverImage} width={1400} height={900} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="bg-gradient-to-br from-cyan-200 via-sky-100 to-emerald-200" />
                  <div className="bg-gradient-to-br from-emerald-200 via-cyan-100 to-sky-200" />
                  <div className="bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200" />
                  <div className="bg-gradient-to-br from-cyan-100 via-sky-100 to-emerald-100" />
                  <div className="bg-gradient-to-br from-emerald-100 via-cyan-100 to-sky-100" />
                  <div className="bg-gradient-to-br from-cyan-200 via-emerald-100 to-sky-200" />
                  <div className="bg-gradient-to-br from-sky-100 via-cyan-100 to-emerald-100" />
                  <div className="bg-gradient-to-br from-emerald-100 via-cyan-100 to-sky-100" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent px-6 pb-7 pt-20 sm:px-8">
                  <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-800">
                    {storiesHeroData.tag}
                  </p>
                  <h3 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                    {storiesHeroData.title}
                  </h3>
                  {storiesHeroData.subtitle ? (
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{storiesHeroData.subtitle}</p>
                  ) : null}
                  <p className="mt-4 text-sm font-semibold text-slate-500">{storiesHeroData.date}</p>
                </div>
              </article>
            </Link>
          ) : (
            <article data-reveal className="scroll-reveal reveal-delay-3 relative mt-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,0.3)]">
              <div className="grid min-h-[420px] grid-cols-4 grid-rows-2">
                <div className="bg-gradient-to-br from-cyan-200 via-sky-100 to-emerald-200" />
                <div className="bg-gradient-to-br from-emerald-200 via-cyan-100 to-sky-200" />
                <div className="bg-gradient-to-br from-sky-200 via-cyan-100 to-emerald-200" />
                <div className="bg-gradient-to-br from-cyan-100 via-sky-100 to-emerald-100" />
                <div className="bg-gradient-to-br from-emerald-100 via-cyan-100 to-sky-100" />
                <div className="bg-gradient-to-br from-cyan-200 via-emerald-100 to-sky-200" />
                <div className="bg-gradient-to-br from-sky-100 via-cyan-100 to-emerald-100" />
                <div className="bg-gradient-to-br from-emerald-100 via-cyan-100 to-sky-100" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/80 to-transparent px-6 pb-7 pt-20 sm:px-8">
                <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-800">
                  Stories
                </p>
                <h3 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  Stories from the newsroom will appear here once Sanity publishes them.
                </h3>
                <p className="mt-4 text-sm font-semibold text-slate-500">Coming soon</p>
              </div>
            </article>
          )}

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {storiesCardsToRender.map((card, index) => {
              const cardContent = (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_25px_65px_-45px_rgba(15,23,42,0.3)]"
                >
                  <div className={`relative h-[250px] bg-gradient-to-br ${card.accent}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.42),transparent_42%)]" />
                  </div>
                  <div className="px-5 pb-6 pt-5">
                    <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-800">
                      {card.tag}
                    </p>
                    <h4 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-950">{card.title}</h4>
                    <p className="mt-4 text-sm font-semibold text-slate-500">{card.date}</p>
                  </div>
                </article>
              );

              if (card.slug) {
                return (
                  <Link key={card.title} href={`/news/${card.slug}`} data-reveal className={`scroll-reveal ${revealDelayClass(index + 1)} block`}>
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={card.title} data-reveal className={`scroll-reveal ${revealDelayClass(index + 1)}`}>
                  {cardContent}
                </div>
              );
            })}
          </div>

          <div data-reveal className="scroll-reveal reveal-delay-4 mt-7 flex justify-center">
            <Link
              href="/news?q=stories"
              className="rounded-full bg-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              View All
            </Link>
          </div>
        </section>

        <section data-reveal className="scroll-reveal reveal-delay-3 mt-20 rounded-[2rem] border border-slate-200 bg-[#f4f5f7] p-6 sm:p-8">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">More from Protocol+ Newsroom</h2>

          <div className="mt-8 space-y-0">
            {newsroomRowsToRender.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                data-reveal
                className={`scroll-reveal ${revealDelayClass(rowIndex + 2)} grid gap-6 py-7 md:grid-cols-2 ${rowIndex > 0 ? "border-t border-slate-300/80" : ""}`}
              >
                {row.map((item, itemIndex) => {
                  const rowItem = (
                    <article key={`${item.title}-${itemIndex}`} className="grid grid-cols-[88px_1fr] gap-4">
                      <div className={`relative h-[88px] w-[88px] overflow-hidden rounded-2xl bg-gradient-to-br ${item.accent}`}>
                        {item.coverImage?.asset ? (
                          <SanityImage value={item.coverImage} width={220} height={220} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{item.tag}</p>
                        <h3 className="mt-1 text-3xl font-semibold leading-tight tracking-tight text-slate-950">{item.title}</h3>
                        <p className="mt-3 text-sm font-medium text-slate-500">{item.date}</p>
                      </div>
                    </article>
                  );

                  if (item.slug) {
                    return (
                      <Link key={`${item.title}-${itemIndex}`} href={`/news/${item.slug}`} className="block">
                        {rowItem}
                      </Link>
                    );
                  }

                  return <div key={`${item.title}-${itemIndex}`}>{rowItem}</div>;
                })}
              </div>
            ))}
          </div>

          <div data-reveal className="scroll-reveal reveal-delay-4 mt-3 flex justify-center">
            <Link
              href="/news?topic=Research"
              className="rounded-full bg-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              View Archive
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
