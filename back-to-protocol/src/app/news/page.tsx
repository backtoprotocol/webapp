import { PageShell } from "@/components/page-shell";

const posts = [
  {
    title: "The rise of calm-first content",
    description: "Why thoughtful, slower media is becoming more valuable in a noisy world.",
  },
  {
    title: "Recovery is becoming a daily practice",
    description: "New research and habits point toward steadier, more realistic routines.",
  },
  {
    title: "Performance with less pressure",
    description: "How people are reshaping ambition around sustainability instead of burnout.",
  },
];

export default function NewsPage() {
  return (
    <PageShell
      eyebrow="News"
      title="A clearer view of what matters now."
      description="Useful updates, meaningful shifts, and thoughtful perspectives from the world of recovery and performance."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.title} className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">Update</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{post.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{post.description}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
