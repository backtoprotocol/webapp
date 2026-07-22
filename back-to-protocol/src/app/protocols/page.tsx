import { PageShell } from "@/components/page-shell";

const protocols = [
  {
    name: "Anxiety",
    description: "Structured exposure, nervous system regulation, and recovery routines.",
    accent: "from-indigo-500 via-blue-500 to-cyan-400",
  },
  {
    name: "Stress",
    description: "Adaptive pacing, cognitive clarity, and restorative performance habits.",
    accent: "from-slate-900 via-violet-500 to-fuchsia-400",
  },
  {
    name: "Depression",
    description: "Gradual reconnection, behavioral activation, and optimism scaffolding.",
    accent: "from-slate-800 via-slate-500 to-indigo-400",
  },
  {
    name: "Relationships",
    description: "Communication anchors, boundary work, and trust rebuilding rituals.",
    accent: "from-emerald-500 via-teal-400 to-cyan-300",
  },
  {
    name: "Self-Worth",
    description: "Value-based habits, identity repair, and narrative strengthening.",
    accent: "from-purple-500 via-indigo-500 to-sky-400",
  },
  {
    name: "Burnout",
    description: "Energy architecture, demand triage, and sustainable recovery plans.",
    accent: "from-slate-900 via-blue-600 to-cyan-400",
  },
];

export default function ProtocolsPage() {
  return (
    <PageShell
      eyebrow="Protocols"
      title="Frameworks for recovery and performance."
      description="Six premium protocols crafted for people rebuilding energy, clarity, and confidence with modern psychological rigor."
    >
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {protocols.map((protocol) => (
          <div
            key={protocol.name}
            className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] transition hover:-translate-y-1 hover:shadow-[0_40px_100px_-30px_rgba(15,23,42,0.2)]"
          >
            <div className={`absolute inset-x-6 top-0 h-40 rounded-[2rem] bg-gradient-to-br ${protocol.accent} opacity-10 blur-3xl`} />
            <div className="relative space-y-5">
              <div className="inline-flex rounded-full bg-slate-950/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-700">
                {protocol.name}
              </div>
              <p className="text-lg font-semibold text-slate-950">{protocol.name}</p>
              <p className="text-sm leading-7 text-slate-600">{protocol.description}</p>
              <button className="inline-flex items-center rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Learn more
              </button>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
