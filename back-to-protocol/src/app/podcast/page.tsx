import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";
import styles from "./podcast-hero.module.css";

const lineup = [
  {
    title: "Recovery Stories",
    description: "Science-backed recovery stories from practical voices.",
    accent: "from-cyan-200 via-sky-100 to-emerald-200",
    className: styles.characterOne,
  },
  {
    title: "Protocol Deep Dives",
    description: "Investigative conversations that go beyond surface wellness.",
    accent: "from-emerald-200 via-cyan-100 to-sky-200",
    className: styles.characterTwo,
  },
  {
    title: "Mindset + Momentum",
    description: "Build consistency with conversations on mental endurance.",
    accent: "from-sky-200 via-cyan-100 to-emerald-200",
    className: styles.characterThree,
  },
  {
    title: "Sleep + Reset",
    description: "Guided audio for better evenings and stronger mornings.",
    accent: "from-cyan-100 via-sky-100 to-emerald-100",
    className: styles.characterFour,
  },
  {
    title: "Performance Radio",
    description: "Training, recovery, and performance strategy in one feed.",
    accent: "from-emerald-100 via-cyan-100 to-sky-100",
    className: styles.characterFive,
  },
  {
    title: "Founder Conversations",
    description: "Talks with builders and operators on resilience and growth.",
    accent: "from-cyan-200 via-emerald-100 to-sky-200",
    className: styles.characterSix,
  },
];

export default function PodcastPage() {
  return (
    <main className={styles.heroShell}>
      <section className={styles.promoBar}>
        <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-3 text-center text-sm font-medium sm:px-8 lg:px-10">
          New episodes every week for Protocol+ members. Start listening and build your daily reset routine.
        </div>
      </section>

      <section className="relative overflow-hidden px-6 pb-10 pt-14 text-slate-950 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-14 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-200/35 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <div className={`${styles.brandBadge} inline-flex flex-col items-center`}>
            <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-[0_18px_45px_-30px_rgba(15,23,42,0.35)]">
              <LogoMark className="h-10 w-10" />
            </div>
            <p className="mt-3 text-xl font-semibold tracking-tight">Protocol+ Podcast</p>
          </div>

          <h1 className={`${styles.headline} mx-auto mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl`}>
            A world of healing stories.
            <br />
            One trusted podcast.
          </h1>

          <p className={`${styles.subline} mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600`}>
            Conversations on recovery, performance, sleep, and mindset with guests who turn science into practical daily steps.
          </p>

          <div className={`${styles.ctaButton} mt-8 flex items-center justify-center gap-3`}>
            <Link
              href="/protocol-plus"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-3 text-lg font-semibold text-white transition hover:brightness-105"
            >
              Listen now
            </Link>
            <Link
              href="/news?q=podcast"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              Explore episodes
            </Link>
          </div>
        </div>

        <div className="mt-14">
          <div className={styles.carouselViewport}>
            <div className={styles.carouselTrack}>
              {[...lineup, ...lineup].map((item, index) => (
                <article key={`${item.title}-${index}`} className={`${styles.characterCard} ${index < lineup.length ? item.className : ""}`}>
                  <div className={`h-full bg-gradient-to-br ${item.accent}`}>
                    <div className="flex h-full flex-col justify-end p-5">
                      <div className="rounded-2xl border border-white/65 bg-white/82 p-4 backdrop-blur-sm">
                        <p className="text-xl font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
