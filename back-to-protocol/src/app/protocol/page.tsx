import { PageShell } from "@/components/page-shell";
import { contentPillars } from "@/lib/content-pillars";

export default function ProtocolPage() {
  return (
    <PageShell
      eyebrow="Protocol"
      title="Back to the fundamentals that move the body forward."
      description="Back to Protocol cuts through wellness noise with practical, physiology-led guidance across eight connected pillars."
    >
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-10">
        <p className="max-w-3xl text-lg leading-8 text-slate-700">
          Every article, episode, game, and update starts with one primary pillar and may connect to one secondary pillar. That keeps the advice specific, useful, and grounded in how the body actually works.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contentPillars.map((pillar) => (
            <article key={pillar.name} className="rounded-[1.5rem] border border-slate-200/80 bg-slate-950/5 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-950">{pillar.name}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.definition}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
