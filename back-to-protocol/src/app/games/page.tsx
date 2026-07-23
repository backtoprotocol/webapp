import { PageShell } from "@/components/page-shell";

const games = [
  {
    title: "Protocol Sprint",
    pillar: "Mindset",
    description: "A quick challenge that turns a chosen health habit into an intentional next step.",
  },
  {
    title: "Calm Circuit",
    pillar: "Stress",
    description: "A gentle interactive practice for noticing stress signals and downshifting your nervous system.",
  },
  {
    title: "Momentum Loop",
    pillar: "Movement",
    description: "A simple game for linking small movement habits to visible progress.",
  },
];

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="Games"
      title="Small experiments for the habits that support health."
      description="Interactive ways to practice the mindset, movement, stress, and recovery protocols that matter most."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        {games.map((game) => (
          <article key={game.title} className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">{game.pillar}</p>
            <h2 className="mt-4 text-2xl font-semibold text-slate-950">{game.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{game.description}</p>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
