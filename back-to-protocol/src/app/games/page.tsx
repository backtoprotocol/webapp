import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const games = [
  {
    name: "SPIKE",
    pillar: "Front Page",
    description: "Pick the lead headline with the highest public impact across five editorial rounds.",
    href: "/games/spike",
    accent: "from-orange-100 to-amber-50",
  },
  {
    name: "SORTED",
    pillar: "Connections Desk",
    description: "Solve the daily 16-tile board by finding four hidden sets before mistakes run out.",
    href: "/games/sorted",
    accent: "from-violet-100 to-fuchsia-50",
  },
  {
    name: "BLUR",
    pillar: "Redaction Desk",
    description: "Decode missing headline words. Every wrong guess reveals more context.",
    href: "/games/blur",
    accent: "from-emerald-100 to-teal-50",
  },
  {
    name: "GUT",
    pillar: "Timeline Desk",
    description: "Reorder key events into a clean evidence timeline and get a precision score.",
    href: "/games/gut",
    accent: "from-sky-100 to-cyan-50",
  },
];

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="The Daily Stack"
      title="Newspaper-style minis with daily depth."
      description="Daily-seeded puzzles, persistent streaks, and fast rounds built to be replayable and sticky."
    >
      <section className="grid gap-6 sm:grid-cols-2">
        {games.map((game) => (
          <Link key={game.name} href={game.href} className={`group rounded-[2rem] border border-slate-200/80 bg-gradient-to-br ${game.accent} p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.18)]`}>
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-600">{game.pillar}</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{game.name}</h2>
            <p className="mt-4 max-w-md leading-7 text-slate-700">{game.description}</p>
            <span className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-slate-800">Play now →</span>
          </Link>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-white shadow-[0_40px_120px_-40px_rgba(15,23,42,0.32)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Why it sticks</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div><p className="text-lg font-semibold">Fresh every day</p><p className="mt-2 text-sm leading-6 text-slate-300">Seeded daily boards create a shared challenge rhythm.</p></div>
          <div><p className="text-lg font-semibold">Track progress</p><p className="mt-2 text-sm leading-6 text-slate-300">Wins, streaks, and best runs are saved per game.</p></div>
          <div><p className="text-lg font-semibold">Fast but replayable</p><p className="mt-2 text-sm leading-6 text-slate-300">Simple controls with enough variation to keep momentum.</p></div>
        </div>
      </section>
    </PageShell>
  );
}
