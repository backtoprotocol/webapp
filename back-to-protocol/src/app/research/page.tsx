import { PageShell } from "@/components/page-shell";

const studies = [
  {
    title: "Nervous system regulation and recovery latency",
    summary: "A framework for measuring recovery efficiency after chronic stress exposure.",
    tag: "Clinical",
  },
  {
    title: "Performance habits and habit stacking",
    summary: "How structured routines improve consistency and protect psychological bandwidth.",
    tag: "Behavioral",
  },
  {
    title: "Boundary work and emotional resilience",
    summary: "The relationship between relational clarity and sustainable emotional performance.",
    tag: "Social",
  },
];

const citations = [
  "Journal of Behavioral Science, 2024",
  "Neuroscience and Recovery Review, 2023",
  "Applied Human Performance Quarterly, 2022",
];

export default function ResearchPage() {
  return (
    <PageShell
      eyebrow="Research"
      title="Evidence-led recovery, refined into a system."
      description="Back to Protocol translates modern psychology research into practical, elegant protocols for everyday recovery and performance."
    >
      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          {studies.map((study) => (
            <article key={study.title} className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)]">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">{study.tag}</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">
                  Peer reviewed
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">{study.title}</h2>
              <p className="mt-4 text-slate-600 leading-7">{study.summary}</p>
            </article>
          ))}
        </div>

        <aside className="space-y-6 rounded-[2rem] border border-slate-200/80 bg-slate-950/95 p-8 text-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.28)]">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Signals</p>
            <h2 className="mt-4 text-3xl font-semibold">Measured recovery.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Our research approach focuses on practical change, not vague wellness language.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Citations</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              {citations.map((citation) => (
                <li key={citation} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  {citation}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
