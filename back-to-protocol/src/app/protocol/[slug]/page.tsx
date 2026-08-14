import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FadeInSection } from "@/components/fade-in-section";
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
              {pillar.slug === "sleep" ? (
                <Link href="/protocol/sleep/start" className="rounded-full border border-indigo-300 bg-indigo-50 px-6 py-3 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-100">
                  Start or continue 30-day Sleep Protocol
                </Link>
              ) : null}
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
  const primaryCtaClass =
    "inline-flex min-h-10 min-w-[9.5rem] items-center justify-center rounded-full bg-sky-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400";
  const secondaryCtaClass =
    "inline-flex min-h-10 min-w-[9.5rem] items-center justify-center rounded-full border border-slate-400 px-6 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-800";
  const heroCtaClass =
    "inline-flex min-h-11 min-w-[10rem] items-center justify-center rounded-full bg-sky-400 px-8 py-3 text-base font-semibold text-slate-950 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.35)] transition hover:bg-sky-300";
  const coaches = ["Mila", "Greg", "Tyrell", "Bakari", "Sam", "Jules"];
  const socialTiles = [
    "from-sky-200 to-blue-300",
    "from-orange-200 to-amber-300",
    "from-indigo-200 to-sky-300",
    "from-emerald-200 to-cyan-300",
    "from-rose-200 to-fuchsia-300",
    "from-teal-200 to-blue-300",
    "from-violet-200 to-indigo-300",
    "from-cyan-200 to-sky-300",
  ];
  const faqItems = [
    "Where can I find the Movement program?",
    "Do I need a wearable to use Movement?",
    "Do I need equipment for Movement workouts?",
    "Can I use Movement on my TV?",
    "Can I combine multiple workouts in one session?",
    "Where is Movement available?",
    "How do I redeem the three-month offer?",
  ];

  return (
    <main className="bg-[#f5f5f7] text-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-[#dbeafe] via-[#c7dcf8] to-[#8db5e3]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.45),transparent_38%),radial-gradient(circle_at_85%_10%,rgba(186,230,253,0.45),transparent_34%)]" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col items-center justify-end px-6 pb-16 pt-14 text-center sm:px-8 lg:pb-20 lg:pt-20">
          <p className="text-xl font-semibold tracking-tight text-white/95 sm:text-2xl">Movement+</p>
          <h1 className="mt-2 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl">
            Stronger every session.
            <br />
            Sharper every day.
          </h1>
          <button className={`mt-10 ${heroCtaClass}`}>Start now</button>
          <div className="mt-14 w-full max-w-5xl">
            <PhoneStage />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-10 lg:py-32">
        <FadeInSection className="text-center" delayMs={30}>
          <div className="mx-auto max-w-4xl space-y-12">
            <p className="text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">
              12 workout types, from Strength to HIIT to Yoga.
              <br className="hidden sm:block" />
              New sessions added every week, from 5 to 45 minutes.
            </p>
            <p className="text-3xl font-semibold tracking-tight text-slate-700 sm:text-4xl">
              Personalized recommendations and ready-made
              <br className="hidden sm:block" />
              Custom Plans based on your favorite activities.
            </p>
            <p className="text-3xl font-semibold tracking-tight text-slate-600 sm:text-4xl">
              Real-time metrics from wearables and
              <br className="hidden sm:block" />
              any Bluetooth heart rate monitor.
            </p>
          </div>

          <div className="mt-24 grid gap-10 border-t border-slate-300 pt-16 md:grid-cols-3 md:gap-12">
              <OfferCard
                title="Always free"
                copy="Movement+ is completely free for everyone. No trial window and no payment required."
                primary="Start now"
              />
              <OfferCard
                title="No subscription required"
                copy="No monthly plan, no annual plan, and no hidden upgrade wall."
                primary="Get access"
              />
              <OfferCard
                title="Everything included"
                copy="All core movement tools and protocol content are included at zero cost."
                primary="See everything"
                secondary="Learn more"
              />
          </div>
        </FadeInSection>

        <FadeInSection className="mt-40" delayMs={60}>
          <h2 className="text-center text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
            Find a routine that works for you.
            <br />
            And with you.
          </h2>

          <div className="mt-16 space-y-10">
            <FeaturePanel
              title="Custom Plans that just get you."
              copy="Jump right in with a workout and recovery schedule based on your favorite activities. Use Get Started for a tailored routine, then keep momentum with Stay Consistent or Push Further."
              align="left"
            />
            <FeaturePanel
              title="Get personalized recommendations in For You."
              copy="From day one, Movement learns your style and adapts recommendations based on activity type, coach preference, duration, and effort trend."
              align="right"
            />
          </div>
        </FadeInSection>

        <FadeInSection className="mt-24 rounded-[2rem] bg-[#ececf1] p-10 sm:p-12" delayMs={90}>
          <h3 className="text-center text-3xl font-semibold tracking-tight text-slate-900">Meet the Movement trainer team:</h3>
          <div className="mt-10 overflow-hidden pb-2">
            <div className="movement-marquee-track flex w-max gap-5">
              {[...coaches, ...coaches].map((coach, index) => (
                <article key={`${coach}-${index}`} className="min-w-[8.75rem] rounded-2xl bg-white p-3 text-center shadow-[0_10px_30px_-25px_rgba(15,23,42,0.5)] sm:min-w-[9.5rem]">
                  <div className={`aspect-[4/3] rounded-xl bg-gradient-to-br ${index % 2 === 0 ? "from-fuchsia-100 to-amber-100" : "from-cyan-100 to-lime-100"}`} />
                  <p className="mt-2 text-xs font-semibold text-slate-700">{coach}</p>
                </article>
              ))}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection className="mt-20 grid gap-10 sm:grid-cols-2" delayMs={120}>
          <article className="rounded-[2rem] bg-[#ececf1] p-10">
            <div className="mx-auto w-full max-w-[14rem]">
              <PhoneMini />
            </div>
            <p className="mx-auto mt-8 max-w-md text-lg font-medium leading-8 text-slate-600">
              Track your fitness journey, learn tips from coaches, and get personalized recommendations in the Summary tab.
            </p>
          </article>

          <article className="rounded-[2rem] bg-[#ececf1] p-10">
            <div className="mx-auto flex h-60 w-60 items-center justify-center rounded-[2.6rem] bg-gradient-to-br from-slate-300 via-slate-200 to-lime-300 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.55)]">
              <span className="text-7xl font-black text-white/90">1</span>
            </div>
            <p className="mx-auto mt-8 max-w-md text-lg font-medium leading-8 text-slate-600">
              Earn Movement awards for milestones, track your progress, and see which activities move you toward your next achievement.
            </p>
          </article>
        </FadeInSection>

        <FadeInSection className="mt-36 rounded-[2.1rem] bg-white px-8 py-14 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.45)] sm:px-12 sm:py-16" delayMs={150}>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Questions? Answers.</p>
          <div className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
            {faqItems.map((item) => (
              <details key={item} className="group py-8">
                <summary className="list-none cursor-pointer text-xl font-semibold tracking-tight text-slate-900 marker:content-none sm:text-2xl">
                  {item}
                </summary>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  Movement keeps this simple: choose your plan, pick your available time, and get recommendations that adapt as you train.
                </p>
              </details>
            ))}
          </div>
        </FadeInSection>

        <FadeInSection className="mt-24 grid gap-10 pb-20 sm:grid-cols-2" delayMs={180}>
          <article className="flex h-full flex-col rounded-[1.6rem] bg-[#ececf1] p-9">
            <p className="text-4xl font-semibold tracking-tight text-slate-900">Protocol+</p>
            <p className="mt-3 max-w-md text-4xl font-semibold tracking-tight text-slate-900">Access every core protocol in one system.</p>
            <div className="mt-8 space-y-2 text-3xl font-semibold tracking-tight">
              <p className="text-blue-900">Movement</p>
              <p className="text-blue-800">Nutrition</p>
              <p className="text-sky-800">Sleep</p>
              <p className="text-sky-700">Stress</p>
              <p className="text-sky-600">Relationships</p>
              <p className="text-sky-500">Recovery</p>
              <p className="text-slate-600">Longevity</p>
              <p className="text-slate-500">Mindset</p>
            </div>
            <div className="mt-auto flex flex-wrap gap-3 pt-10">
              <button className={primaryCtaClass}>Explore protocols</button>
              <button className={secondaryCtaClass}>Learn more</button>
            </div>
          </article>

          <article className="flex h-full flex-col rounded-[1.6rem] bg-[#ececf1] p-9">
            <p className="text-4xl font-semibold tracking-tight text-slate-900">Focus Audio</p>
            <p className="mt-3 max-w-md text-4xl font-semibold tracking-tight text-slate-900">Use curated training playlists and recovery audio to guide each session.</p>
            <div className="mt-auto flex flex-wrap gap-3 pt-10">
              <button className={primaryCtaClass}>Open audio</button>
              <button className={secondaryCtaClass}>Learn more</button>
            </div>
            <div className="mx-auto mt-10 w-full max-w-[12rem]">
              <PhoneMini />
            </div>
          </article>
        </FadeInSection>

        <FadeInSection className="mt-28 pb-12" delayMs={210}>
          <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_-45px_rgba(15,23,42,0.35)]">
            <div className="px-8 py-20 text-center sm:px-12 sm:py-24">
              <h3 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                Join Movement+ for even more inspiration.
              </h3>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Stay up to date with the latest workouts, coaching insights, celebrations, and community moments from the studio.
              </p>
              <button className={`mt-9 ${primaryCtaClass}`}>
                Follow @movementplus
              </button>

              <div className="mt-14 overflow-hidden pb-3">
                <div className="movement-marquee-track flex w-max gap-4">
                  {[...socialTiles, ...socialTiles].map((gradient, index) => (
                    <div key={`${gradient}-${index}`} className={`h-32 min-w-40 rounded-2xl bg-gradient-to-br ${gradient} shadow-[0_15px_30px_-25px_rgba(15,23,42,0.4)] sm:h-36 sm:min-w-48`}>
                      <div className="flex h-full w-full items-end rounded-2xl bg-gradient-to-t from-black/20 to-transparent p-3">
                        <p className="text-xs font-semibold text-white/90">Session {(index % socialTiles.length) + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 bg-[#f5f5f7] px-8 py-16 sm:px-12 sm:py-18">
              <div className="grid gap-10 md:grid-cols-3">
                <article className="flex h-full flex-col items-center text-center">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">Always free</p>
                  <div className="mx-auto mt-4 h-px w-full max-w-[16rem] bg-slate-300" />
                  <p className="mx-auto mt-4 min-h-28 max-w-[18rem] text-base leading-7 text-slate-600">
                    Movement+ is free for everyone, with full access available immediately.
                  </p>
                </article>

                <article className="flex h-full flex-col items-center text-center">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">No billing</p>
                  <div className="mx-auto mt-4 h-px w-full max-w-[16rem] bg-slate-300" />
                  <p className="mx-auto mt-4 min-h-28 max-w-[18rem] text-base leading-7 text-slate-600">
                    No monthly plan, no annual plan, and no credit card needed.
                  </p>
                </article>

                <article className="flex h-full flex-col items-center text-center">
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">All protocols included</p>
                  <div className="mx-auto mt-4 h-px w-full max-w-[16rem] bg-slate-300" />
                  <p className="mx-auto mt-4 min-h-28 max-w-[18rem] text-base leading-7 text-slate-600">
                    Movement, Nutrition, Sleep, Stress, and the rest are available in one free experience.
                  </p>
                </article>
              </div>
            </div>
          </section>
        </FadeInSection>
      </div>
    </main>
  );
}

function PhoneStage() {
  return (
    <div className="relative rounded-[2.8rem] border border-slate-400/70 bg-gradient-to-b from-slate-900 to-slate-700 p-2 shadow-[0_35px_80px_-40px_rgba(15,23,42,0.7)]">
      <div className="relative overflow-hidden rounded-[2.3rem] bg-[linear-gradient(135deg,#7b5a43,#a07750)] px-5 py-5">
        <div className="absolute left-4 top-4 h-16 w-20 rounded-xl bg-black/45 p-2 text-left text-xs font-semibold text-sky-300">
          <p>00:41</p>
          <p className="mt-1 text-white">All Out!</p>
        </div>
        <div className="mx-auto mt-5 grid h-48 max-w-lg grid-cols-3 items-end gap-4">
          <div className="h-24 rounded-xl bg-teal-300/80" />
          <div className="h-36 rounded-xl bg-cyan-300/80" />
          <div className="h-28 rounded-xl bg-fuchsia-300/80" />
        </div>
      </div>
    </div>
  );
}

function PhoneMini() {
  return (
    <div className="rounded-[2.1rem] border border-slate-300 bg-slate-900 p-2 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.75)]">
      <div className="overflow-hidden rounded-[1.7rem] bg-black p-3">
        <div className="h-7 w-24 rounded-full bg-slate-700" />
        <div className="mt-4 grid gap-2">
          <div className="h-20 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-400" />
          <div className="h-16 rounded-xl bg-slate-700" />
          <div className="h-14 rounded-xl bg-slate-600" />
        </div>
      </div>
    </div>
  );
}

function OfferCard({
  title,
  copy,
  primary,
  secondary,
}: {
  title: string;
  copy: string;
  primary: string;
  secondary?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white px-5 py-7 text-center shadow-[0_15px_30px_-25px_rgba(15,23,42,0.4)]">
      <p className="text-2xl font-semibold tracking-tight text-slate-900">{title}</p>
      <p className="mt-4 min-h-24 text-base leading-7 text-slate-600">{copy}</p>
      <div className="mt-auto pt-5 flex flex-wrap items-center justify-center gap-2">
        <button className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400">{primary}</button>
        {secondary ? <button className="rounded-full border border-slate-400 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-800">{secondary}</button> : null}
      </div>
    </article>
  );
}

function FeaturePanel({
  title,
  copy,
  align,
}: {
  title: string;
  copy: string;
  align: "left" | "right";
}) {
  return (
    <article className="grid gap-6 rounded-[2rem] bg-[#ececf1] p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
      {align === "left" ? <div className="mx-auto w-full max-w-[16rem]"><PhoneMini /></div> : null}
      <div>
        <h3 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-4 text-lg leading-8 text-slate-600">{copy}</p>
      </div>
      {align === "right" ? <div className="mx-auto w-full max-w-[16rem]"><PhoneMini /></div> : null}
    </article>
  );
}
