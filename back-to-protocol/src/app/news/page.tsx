import Link from "next/link";
import { contentPillars } from "@/lib/content-pillars";

const featuredStories = [
  {
    pillar: "Movement",
    title: "Train for the life you want to keep living.",
    description: "The useful intersection of strength, aerobic capacity, mobility, and athletic performance.",
    treatment: "from-indigo-600 via-violet-600 to-sky-500",
    number: "01",
  },
  {
    pillar: "Nutrition",
    title: "Food is information. Learn how to read the signal.",
    description: "Practical notes on fueling, body composition, blood sugar, and gut health.",
    treatment: "from-amber-400 via-orange-400 to-rose-400",
    number: "02",
  },
  {
    pillar: "Sleep",
    title: "Build nights that make better days possible.",
    description: "Sleep quality, light, chronotype, and the small levers that change recovery.",
    treatment: "from-slate-900 via-indigo-950 to-indigo-700",
    number: "03",
  },
  {
    pillar: "Stress",
    title: "Regulate the system before it runs the day.",
    description: "A clearer way to think about cortisol, HRV, breathwork, and nervous-system load.",
    treatment: "from-emerald-600 via-teal-600 to-cyan-500",
    number: "04",
  },
];

const latestStories = [
  ["Movement", "The minimum effective dose for getting stronger"],
  ["Nutrition", "Why a steadier plate creates steadier energy"],
  ["Sleep", "The travel-day reset that starts before bedtime"],
  ["Stress", "What HRV can—and cannot—tell you this week"],
];

const editorialNotes = [
  ["Movement", "Build a body that can carry more of your life.", "Strength, cardio, mobility, and athletic performance."],
  ["Nutrition", "Make nourishment more useful, not more complicated.", "Food, fueling, body composition, blood sugar, and gut health."],
  ["Sleep", "Protect the recovery system that touches everything else.", "Sleep quality, light exposure, chronotype, and travel recovery."],
  ["Stress", "Create more room between demand and your response.", "Cortisol, HRV, breathwork, and nervous-system regulation."],
] as const;

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-5 w-5 ${className}`} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h13m-5-5 5 5-5 5" />
    </svg>
  );
}

export default function NewsPage() {
  const supportingPillars = contentPillars.slice(4);

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_25%),radial-gradient(circle_at_92%_13%,rgba(14,165,233,0.10),transparent_18%)]" />
      <div className="mx-auto max-w-7xl">
        <section className="border-b border-slate-200/80 pb-10 sm:pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-indigo-600">Back to Protocol / Newsroom</p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-6xl">
                The health signals worth paying attention to.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Clear, evidence-led reporting for the systems that shape how you feel, train, and recover.
              </p>
            </div>
            <Link href="/subscribe" className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 lg:self-auto">
              Get the weekly signal <Arrow />
            </Link>
          </div>
        </section>

        <nav aria-label="News topics" className="flex gap-x-6 gap-y-3 overflow-x-auto border-b border-slate-200/80 py-5 text-sm font-medium whitespace-nowrap text-slate-500">
          {contentPillars.map((pillar, index) => (
            <a key={pillar.name} href={`#${pillar.name.toLowerCase()}`} className={index < 4 ? "text-slate-950 transition hover:text-indigo-600" : "transition hover:text-slate-950"}>
              {pillar.name}
            </a>
          ))}
        </nav>

        <section className="py-10 sm:py-14">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Featured stories</p>
            <span className="text-sm text-slate-500">Four systems, one healthier baseline</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredStories.map((story, index) => (
              <article key={story.pillar} id={story.pillar.toLowerCase()} className={`group relative min-h-72 overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${story.treatment} p-7 text-white shadow-[0_28px_60px_-28px_rgba(15,23,42,0.5)] sm:min-h-80 sm:p-9 ${index === 0 ? "lg:row-span-2 lg:min-h-[41rem]" : ""}`}>
                <div className="absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/20" />
                <div className="absolute -bottom-20 right-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">{story.pillar}</p>
                    <span className="font-mono text-xs text-white/60">{story.number}</span>
                  </div>
                  <div className="mt-auto max-w-lg pt-20">
                    <h2 className={`font-semibold tracking-[-0.035em] ${index === 0 ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{story.title}</h2>
                    <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base">{story.description}</p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium transition group-hover:gap-3">Explore topic <Arrow /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200/80 py-10 sm:py-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Latest notes</h2>
            <Link href="/articles" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 transition hover:text-slate-950">View all <Arrow className="h-4 w-4" /></Link>
          </div>
          <div className="mt-7 grid gap-x-7 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            {latestStories.map(([pillar, title], index) => (
              <article key={title} className="group border-t border-slate-200 py-5 lg:border-t-0 lg:border-l lg:pl-7 first:lg:border-l-0 first:lg:pl-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{pillar} · 0{index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold leading-6 tracking-tight text-slate-950 transition group-hover:text-indigo-600">{title}</h3>
                <span className="mt-5 inline-flex items-center text-sm text-slate-500 transition group-hover:translate-x-1 group-hover:text-slate-950"><Arrow className="h-4 w-4" /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">More from the core four</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-4xl">A practical library for the foundations.</h2>
          </div>
          <div className="mt-8 grid gap-px overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {editorialNotes.map(([pillar, headline, description], index) => (
              <article key={pillar} className="group bg-white p-7 transition hover:bg-slate-50 sm:p-9">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">{pillar}</p>
                  <span className="text-sm text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-12 max-w-sm text-2xl font-semibold tracking-tight text-slate-950">{headline}</h3>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">{description}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-950 transition group-hover:gap-3">Read the latest <Arrow /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-4 border-t border-slate-200/80 py-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">The full protocol</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Keep exploring.</h2>
              <p className="mt-4 max-w-sm leading-7 text-slate-600">The supporting systems behind a durable, capable life.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {supportingPillars.map((pillar) => (
                <a key={pillar.name} href="/articles" className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-950/5">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-slate-950">{pillar.name}</h3>
                    <Arrow className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.definition}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
