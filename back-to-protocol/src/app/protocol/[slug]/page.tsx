import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { protocolPillars, protocolPillarsBySlug } from "@/lib/protocol-pillars";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return protocolPillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pillar = protocolPillarsBySlug[slug];
  if (!pillar) {
    return { title: "Protocol" };
  }
  return {
    title: `${pillar.name} Protocol`,
    description: pillar.heroDescription,
  };
}

export default async function ProtocolPillarPage({ params }: Props) {
  const { slug } = await params;
  const pillar = protocolPillarsBySlug[slug];

  if (!pillar) {
    notFound();
  }

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="px-6 pt-10 sm:px-8 lg:px-10 lg:pt-14">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_50px_130px_-60px_rgba(15,23,42,0.3)]">
          <div className={`bg-gradient-to-br ${pillar.gradient} p-8 sm:p-12 lg:p-16`}>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-600">{pillar.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{pillar.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{pillar.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/articles" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Explore articles</Link>
              <Link href="/protocol" className="rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white">All pillars</Link>
            </div>
          </div>

          <div className="grid gap-5 border-t border-slate-200 p-6 sm:grid-cols-3 sm:p-8 lg:p-10">
            {pillar.metrics.map((metric) => (
              <article key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{metric.value}</p>
                <p className="mt-2 text-sm text-slate-600">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Core principles</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">The operating model</h2>
            <div className="mt-6 space-y-4">
              {pillar.principles.map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">{index + 1}</span>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white to-slate-100 p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Daily scorecard</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Run the protocol</h2>
            <div className="mt-7 space-y-3">
              {[
                "Train with intent",
                "Fuel for demand",
                "Protect sleep quality",
                "Downshift stress daily",
              ].map((item) => (
                <p key={item} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">{item}</p>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600">Stacking small daily wins in this pillar makes the whole system more durable.</p>
          </article>
        </div>
      </section>

      <section className="px-6 pb-10 sm:px-8 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Recommended tracks</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Pick your next block</h2>
            </div>
            <Link href="/games" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">Use a game for momentum</Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pillar.tracks.map((track) => (
              <article key={track.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{track.intensity} intensity</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{track.title}</h3>
                <p className="mt-2 text-sm font-medium text-slate-700">{track.duration}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{track.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 sm:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Questions and answers</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Common protocol questions</h2>
          <div className="mt-7 divide-y divide-slate-200 border-t border-slate-200">
            {pillar.faq.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:content-none">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
