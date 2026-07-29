import Link from "next/link";
import { ArticleBody } from "@/components/article-body";
import { ArticleShareActions } from "@/components/article-share-actions";
import { SanityImage } from "@/components/sanity-image";

type RelatedArticle = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  pillar: string;
  publishedAt?: string;
  readingMinutes?: number;
  coverImage?: { alt?: string; asset?: { metadata?: { lqip?: string } } };
};

type Article = RelatedArticle & {
  topic?: string;
  tags?: string[];
  keywords?: string[];
  mainConcepts?: string[];
  analysis?: {
    analysisStatus?: string;
    similarityScore?: number;
    similarityBand?: string;
    contentFingerprint?: string;
    similarArticles?: Array<{ score?: number; article?: RelatedArticle }>;
  };
  seo?: { metaTitle?: string; metaDescription?: string; focusKeyword?: string };
  author?: { name?: string; role?: string; bio?: string };
  body?: Parameters<typeof ArticleBody>[0]["value"];
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

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">{children}</span>;
}

export function ArticleTemplate({ article, related = [] }: { article: Article; related?: RelatedArticle[] }) {
  const relatedArticles = related.length
    ? related
    : article.analysis?.similarArticles?.map((item) => item.article).filter((item): item is RelatedArticle => Boolean(item)) ?? [];
  const similarScore = article.analysis?.similarityScore !== undefined ? Math.round(article.analysis.similarityScore) : null;

  return (
    <main className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600">
          ← Back to newsroom
        </Link>

        <article className="mx-auto mt-8 max-w-5xl">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-35px_rgba(15,23,42,0.2)] sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Chip>{article.pillar}</Chip>
              {article.topic ? <Chip>{article.topic}</Chip> : null}
              {similarScore !== null ? <Chip>{similarScore}% similar match</Chip> : null}
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <p className="text-sm text-slate-500">
                  {formatDate(article.publishedAt)}
                  {article.readingMinutes ? ` · ${article.readingMinutes} min read` : ""}
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl lg:text-6xl">{article.title}</h1>
                {article.subtitle ? <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{article.subtitle}</p> : null}
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Share article</p>
                <div className="mt-4">
                  <ArticleShareActions title={article.title} />
                </div>
              </div>
            </div>
          </div>

          {article.coverImage?.asset ? (
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100">
              <SanityImage value={article.coverImage} width={1440} height={810} className="h-auto w-full" priority />
            </div>
          ) : (
            <div className="mt-8 aspect-[16/8] rounded-[2rem] bg-gradient-to-br from-indigo-700 via-violet-600 to-sky-500" />
          )}

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:p-8">
                <ArticleBody value={article.body} />
              </div>

              {article.tags?.length || article.keywords?.length || article.mainConcepts?.length ? (
                <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Article metadata</p>
                  <div className="mt-4 space-y-5">
                    {article.tags?.length ? (
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Tags</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <Chip key={tag}>{tag}</Chip>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {article.keywords?.length ? (
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Keywords</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {article.keywords.map((keyword) => (
                            <Chip key={keyword}>{keyword}</Chip>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {article.mainConcepts?.length ? (
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Main concepts</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {article.mainConcepts.map((concept) => (
                            <Chip key={concept}>{concept}</Chip>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Author</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{article.author?.name || "Back to Protocol Editorial"}</p>
                {article.author?.role ? <p className="mt-1 text-sm leading-6 text-slate-500">{article.author.role}</p> : null}
                {article.author?.bio ? <p className="mt-4 text-sm leading-7 text-slate-600">{article.author.bio}</p> : null}
              </div>

              {relatedArticles.length ? (
                <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-lg font-semibold text-slate-950">Related articles</h2>
                    <Link href={`/news/category/${encodeURIComponent(article.pillar)}`} className="text-sm font-medium text-indigo-600 transition hover:text-slate-950">
                      More
                    </Link>
                  </div>
                  <div className="mt-5 space-y-5">
                    {relatedArticles.slice(0, 3).map((item) => (
                      <Link key={item._id} href={`/news/${item.slug}`} className="group block">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-600">{item.pillar}</p>
                        <h3 className="mt-2 text-base font-semibold leading-6 text-slate-950 group-hover:text-indigo-700">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-500">{formatDate(item.publishedAt)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}
