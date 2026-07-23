import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const games = [
  {
    name: "SPIKE",
    pillar: "Movement",
    description: "Pick which movement wins the head-to-head. Keep your streak alive in Daily or Endless mode.",
    href: "/games/spike",
    accent: "from-orange-100 to-amber-50",
  },
  {
    name: "SORTED",
    pillar: "Stress · Recovery",
    description: "Find four hidden connections among sixteen tiles. Four mistakes ends the run.",
    href: "/games/sorted",
    accent: "from-violet-100 to-fuchsia-50",
  },
  {
    name: "BLUR",
    pillar: "Nutrition",
    description: "Name the blurred image before the reveal gets clearer. Fast guesses, satisfying reveal.",
    href: "/games/blur",
    accent: "from-emerald-100 to-teal-50",
  },
  {
    name: "GUT",
    pillar: "Sleep · Hormones",
    description: "Put the science answer on a spectrum, then see how close your instinct landed.",
    href: "/games/gut",
    accent: "from-sky-100 to-cyan-50",
  },
];

export default function GamesPage() {
  return (
    <PageShell
      eyebrow="The Daily Stack"
      title="A daily rep for your health instincts."
      description="Four under-a-minute games. The fun comes first; the useful science arrives after the reveal."
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
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">How it works</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div><p className="text-lg font-semibold">One minute</p><p className="mt-2 text-sm leading-6 text-slate-300">Low-effort calls, instant feedback, and no essays to write.</p></div>
          <div><p className="text-lg font-semibold">Daily drop</p><p className="mt-2 text-sm leading-6 text-slate-300">A fresh challenge feels like a small ritual, not homework.</p></div>
          <div><p className="text-lg font-semibold">Science bonus</p><p className="mt-2 text-sm leading-6 text-slate-300">Every reveal connects back to a practical health pillar.</p></div>
        </div>
      </section>
    </PageShell>
  );
}
