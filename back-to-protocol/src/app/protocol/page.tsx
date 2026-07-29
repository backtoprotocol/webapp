import Link from "next/link";
import { protocolPillars } from "@/lib/protocol-pillars";

export default function ProtocolPage() {
  return (
    <main className="bg-slate-50 px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_50px_130px_-60px_rgba(15,23,42,0.3)]">
          <div className="bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">Protocol</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">Eight dedicated systems for a healthier life.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">Each pillar has its own page, playbook, and progression track. Pick one system to focus this week, then layer the next.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/news" className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Read latest coverage</Link>
              <Link href="/games" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950">Play daily games</Link>
            </div>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {protocolPillars.map((pillar) => (
            <Link key={pillar.slug} href={`/protocol/${pillar.slug}`} className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_-45px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:border-slate-300">
              <div className={`h-2 w-full rounded-full bg-gradient-to-r ${pillar.gradient}`} />
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">{pillar.name}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 group-hover:text-slate-700">{pillar.heroTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.heroDescription}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-slate-900">View protocol</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
