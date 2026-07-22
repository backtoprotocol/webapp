import { PageShell } from "@/components/page-shell";

const games = [
  {
    title: "Protocol Sprint",
    description: "A quick, reflective challenge around focus, reset, and intention.",
  },
  {
    title: "Calm Circuit",
    description: "A gentle interactive practice for slowing the mind and rebuilding balance.",
  },
  {
    title: "Momentum Loop",
    description: "A simple game that turns small habits into visible progress.",
  },
];

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="Games"
      title="Lightweight experiences that make recovery feel more alive."
      description="Short, thoughtful games designed to support pause, reflection, and steady momentum."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {games.map((game) => (
          <article key={game.title} className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">Interactive</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{game.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{game.description}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
