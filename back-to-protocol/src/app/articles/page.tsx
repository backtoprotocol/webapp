import { PageShell } from "@/components/page-shell";

const topics = ["Recovery", "Health", "Performance", "Habits", "Mindset"];

const featured = [
  {
    title: "Designing stronger recovery systems",
    subtitle: "The principles behind protocols that last.",
  },
  {
    title: "Why clarity beats motivation",
    subtitle: "A practical framework for sustained momentum.",
  },
];

export default function ArticlesPage() {
  return (
    <PageShell
      eyebrow="Articles"
      title="Magazine-grade writing for modern recovery."
      description="Deep, elegant writing that distills psychology, performance, and protocol design into clean insight."
    >
      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-[2rem] border border-slate-200/80 bg-slate-950/5 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)]">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Topics</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {topics.map((topic) => (
              <span key={topic} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {featured.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">Featured article</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">{item.title}</h2>
              <p className="mt-4 text-slate-600 leading-7">{item.subtitle}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-950/5 via-white to-slate-100 p-8 shadow-[0_40px_120px_-40px_rgba(79,70,229,0.14)] sm:p-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {topics.slice(0, 3).map((topic) => (
            <div key={topic} className="rounded-[1.75rem] bg-white p-6 shadow-sm shadow-slate-200/50">
              <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">{topic}</p>
              <p className="mt-4 text-lg font-semibold text-slate-950">Latest thinking</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
