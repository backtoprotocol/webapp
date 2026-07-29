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

  if (slug === "movement") {
    return <MovementProtocolPage />;
  }

  return <GenericProtocolPage pillar={pillar} />;
}

function GenericProtocolPage({ pillar }: { pillar: (typeof protocolPillars)[number] }) {
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
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
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

function MovementProtocolPage() {
  const disciplines = [
    "Strength",
    "HIIT",
    "Zone 2",
    "Mobility",
    "Power",
    "Pilates",
    "Core",
    "Running",
    "Cycling",
    "Athletic Skills",
    "Low Impact",
    "Recovery Flow",
  ];

  const coaches = ["Rae", "Mason", "Nia", "Joel", "Sora", "Dante", "Ava", "Theo"];

  const plans = [
    {
      label: "Get Started",
      title: "Movement baseline",
      copy: "4 sessions per week, mixed intensity, technique-first progression.",
    },
    {
      label: "Stay Consistent",
      title: "Capacity builder",
      copy: "6-week arc of strength + engine work with scheduled recovery days.",
    },
    {
      label: "Push Further",
      title: "Performance block",
      copy: "Advanced split with progression targets and weekly benchmark tests.",
    },
  ];

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="px-6 pt-8 sm:px-8 lg:px-10 lg:pt-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] border border-slate-200 bg-white shadow-[0_55px_140px_-68px_rgba(15,23,42,0.34)]">
          <div className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 px-7 py-10 text-white sm:px-12 sm:py-14 lg:px-16 lg:py-18">
            <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-orange-300/25 blur-3xl" />
            <div className="absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-white/70">Movement Protocol</p>
                <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">Train every system that keeps you capable.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">A dedicated movement platform: progressive strength, aerobic base, and daily mobility with plans tailored to your schedule.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/subscribe" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">Start movement plan</Link>
                  <Link href="/games/spike" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white">Daily movement game</Link>
                </div>
              </div>

              <div className="grid gap-3 rounded-[1.6rem] border border-white/20 bg-white/5 p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">Live session metrics</p>
                <div className="grid grid-cols-2 gap-3">
                  <article className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/70">Heart rate</p>
                    <p className="mt-2 text-2xl font-semibold">148</p>
                  </article>
                  <article className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/70">Zone</p>
                    <p className="mt-2 text-2xl font-semibold">3 / 5</p>
                  </article>
                  <article className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/70">Session</p>
                    <p className="mt-2 text-2xl font-semibold">38 min</p>
                  </article>
                  <article className="rounded-xl bg-white/10 p-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/70">Workload</p>
                    <p className="mt-2 text-2xl font-semibold">+12%</p>
                  </article>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 p-6 sm:grid-cols-3 sm:p-8 lg:p-10">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">12 movement types</p>
              <p className="mt-3 text-xl font-semibold">Strength to mobility</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Daily sessions for energy systems, skill, and durability.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">5 to 45 minutes</p>
              <p className="mt-3 text-xl font-semibold">Flexible duration</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Build consistency with short or full-format sessions.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Weekly progression</p>
              <p className="mt-3 text-xl font-semibold">Auto-adjusted plans</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Recommendations evolve from your completion and effort.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="mx-auto max-w-7xl rounded-[2.1rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.35)] sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">Find your routine</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em]">A plan that works for you and with you.</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.7rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Custom plans</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Built from your favorite training modes</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Choose your priorities, available days, and equipment. The movement track builds a schedule automatically.</p>
              <div className="mt-5 space-y-3">
                {plans.map((plan) => (
                  <div key={plan.title} className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{plan.label}</p>
                    <p className="mt-1 text-base font-semibold text-slate-900">{plan.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{plan.copy}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-slate-200 bg-gradient-to-br from-orange-50 via-white to-cyan-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">For you</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Personalized picks after every completed session</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">Daily recommendations adapt by duration, coach style, and intensity history so the next workout always feels relevant.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["Upper Strength 30", "Zone 2 Ride 20", "Mobility Reset 10", "Power Intervals 25"].map((item) => (
                  <p key={item} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">{item}</p>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 sm:px-8 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-7xl rounded-[2.1rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.35)] sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">Metrics that keep you on track</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em]">Real-time feedback while you move.</h2>
          <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
            <article className="rounded-[1.7rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Session dashboard</p>
              <h3 className="mt-3 text-2xl font-semibold">Track load and readiness in one glance.</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Heart rate trend", "Effort consistency", "Pace drift", "Weekly output"].map((item, index) => (
                  <div key={item} className="rounded-xl border border-white/20 bg-white/10 p-4">
                    <p className="text-sm text-white/70">{item}</p>
                    <p className="mt-2 text-xl font-semibold">{["Stable", "High", "Low", "+8%"][index]}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.7rem] border border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Coach bench</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">Meet your movement team</h3>
              <div className="mt-5 grid grid-cols-4 gap-3">
                {coaches.map((coach) => (
                  <div key={coach} className="flex aspect-square items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700">{coach}</div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">Switch coaches any day without breaking your progression track.</p>
            </article>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Summary</p>
              <h3 className="mt-3 text-xl font-semibold">Your movement journal</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">Review completed sessions, pace notes, and training signals in one weekly snapshot.</p>
            </article>
            <article className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Awards</p>
              <h3 className="mt-3 text-xl font-semibold">Consistency milestones</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">Earn badges for streaks, progressive overload, and recovery compliance.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 pb-10 sm:px-8 lg:px-10 lg:pb-14">
        <div className="mx-auto max-w-7xl rounded-[2.1rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.35)] sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">More ways to move</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em]">Pick your discipline. Tune your preferences.</h2>
          <div className="mt-7 flex flex-wrap gap-2">
            {disciplines.map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">{item}</span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Duration</p>
              <p className="mt-3 text-lg font-semibold">5, 10, 20, 30, 45 min</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Equipment</p>
              <p className="mt-3 text-lg font-semibold">Bodyweight or full gym</p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Filters</p>
              <p className="mt-3 text-lg font-semibold">Coach, intensity, goal</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 sm:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-7xl rounded-[2.1rem] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.35)] sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">Questions and answers</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">Movement, answered.</h2>
          <div className="mt-8 divide-y divide-slate-200 border-t border-slate-200">
            {[
              {
                q: "Do I need equipment for this movement protocol?",
                a: "No. You can train with bodyweight-only tracks, then add dumbbells or gym tools when available.",
              },
              {
                q: "Can beginners use the same platform as advanced athletes?",
                a: "Yes. Plans adapt by session selection, workload history, and intensity preferences.",
              },
              {
                q: "How often should I train each week?",
                a: "Most users start with four days: two strength, one aerobic, and one mobility-focused session.",
              },
              {
                q: "How is progress measured?",
                a: "The platform tracks consistency, workload trend, completion rate, and benchmark session improvements.",
              },
              {
                q: "Can I combine movement with other pillars?",
                a: "Yes. Movement tracks are designed to pair with Nutrition, Sleep, and Recovery protocols.",
              },
            ].map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:content-none">{item.q}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
