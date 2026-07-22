import { PageShell } from "@/components/page-shell";

const episodes = [
  {
    title: "Protocol Reset",
    description: "A practical reset for burnout and overwhelm.",
    duration: "32 min",
  },
  {
    title: "Momentum Mapping",
    description: "How to build small wins into sustainable performance.",
    duration: "28 min",
  },
];

const categories = ["Recovery", "Performance", "Research", "Leadership"];

const guests = ["Dr. Maya Ellis", "Jordan Tate", "Amira Grant"];

export default function PodcastPage() {
  return (
    <PageShell
      eyebrow="Podcast"
      title="Conversations for recovery, resilience, and return."
      description="Modern audio episodes that explore high-performance psychology, healing frameworks, and evidence-based growth."
    >
      <section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-slate-950/5 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)]">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Episode categories</p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700">
                {category}
              </span>
            ))}
          </div>
        </div>

        <div id="featured-player" className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Featured guest</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Professional recovery with elite minds.</h2>
            </div>
            <div className="rounded-full bg-slate-950/95 px-4 py-2 text-sm font-semibold text-white">Now playing</div>
          </div>
          <div className="mt-8 rounded-[1.75rem] bg-slate-950 px-6 py-6 text-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)]">
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-400">Audio player</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xl font-semibold">Protocol Reset</p>
                <p className="mt-2 text-sm text-slate-400">32 min · Recovery rituals</p>
              </div>
              <a href="#episodes" className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Play</a>
            </div>
            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" />
            </div>
          </div>
        </div>
      </section>

      <section id="episodes" className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.18)] sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-950">Latest episodes</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {episodes.map((episode) => (
            <div key={episode.title} className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950/5 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Episode</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">{episode.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{episode.description}</p>
              <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                <span>{episode.duration}</span>
                <a href="#featured-player" className="rounded-full border border-slate-200 px-4 py-2 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">Listen</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-950/5 via-white to-slate-100 p-8 shadow-[0_40px_120px_-40px_rgba(79,70,229,0.14)] sm:p-10">
        <h2 className="text-2xl font-semibold text-slate-950">Featured guests</h2>
        <p className="mt-4 max-w-2xl text-slate-600 leading-7">
          High-achievers, clinicians, and thinkers share modern recovery frameworks and psychological insight.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {guests.map((guest) => (
            <div key={guest} className="rounded-[1.75rem] border border-slate-200/80 bg-white px-5 py-6 text-slate-950 shadow-sm shadow-slate-200/50">
              <p className="text-lg font-semibold">{guest}</p>
              <p className="mt-2 text-sm text-slate-600">Featured conversation leader</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
