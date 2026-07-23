import { PageShell } from "@/components/page-shell";

const posts = [
  {
    pillar: "Stress",
    title: "What the new nervous-system research means for daily stress",
    description: "A closer look at useful developments in HRV, breathwork, and recovery measurement.",
  },
  {
    pillar: "Recovery",
    title: "Recovery is becoming a training variable, not an afterthought",
    description: "The important shifts in how athletes and everyday exercisers think about load and rest.",
  },
  {
    pillar: "Longevity",
    title: "The healthspan conversation is getting more practical",
    description: "Which prevention and biomarker stories are worth attention—and which are only noise.",
  },
];

export default function NewsPage() {
  return (
    <PageShell
      eyebrow="News"
      title="The science and stories worth your attention."
      description="Useful updates from the eight pillars—separating actionable physiology from passing wellness noise."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">{post.pillar}</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{post.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{post.description}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
