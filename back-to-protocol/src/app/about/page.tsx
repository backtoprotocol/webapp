import { FadeInSection } from "@/components/fade-in-section";

const companyValues = [
  {
    title: "When work runs late",
    copy: "When the day gets away from you, we guide you to one practical step that still moves your health forward.",
  },
  {
    title: "When routine slips",
    copy: "After missed workouts, poor sleep, or inconsistent meals, we make restarting feel possible without guilt or overwhelm.",
  },
  {
    title: "When stress is high",
    copy: "When motivation is low and mental load is heavy, we keep guidance simple enough to use in the real moment.",
  },
];

const companyPillars = [
  {
    title: "Editorial",
    copy: "We publish practical health reporting that translates research and expert ideas into everyday language.",
  },
  {
    title: "Product",
    copy: "We build tools and experiences that let people apply the work instead of just reading about it.",
  },
  {
    title: "Community",
    copy: "We design for people who want support, structure, and a shared language for getting healthier.",
  },
];

const operatingPrinciples = [
  "If someone is exhausted, give them one clear next step.",
  "If routine breaks, make restarting feel simple.",
  "If life is busy, keep actions short and repeatable.",
  "If stress spikes, lead with calm and clarity.",
];

const companyTags = ["Clear", "Calm", "Practical"];

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-950">
      <section className="border-b border-white/15 bg-gradient-to-br from-slate-950 via-cyan-950 to-emerald-950 text-white">
        <div className="mx-auto min-h-[100svh] max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-10 px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 xl:px-8">
            <FadeInSection className="space-y-6">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-cyan-100/75">
                <span className="h-2 w-2 rounded-full bg-cyan-200" />
                About the company
              </div>
              <h1 className="max-w-[12ch] text-5xl font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
                Back to Protocol brings people back to what works.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-cyan-50/80 sm:text-xl">
                Some days you are exhausted, behind on sleep, skipping meals, and trying to keep up with everything.
                We build for those situations. We bring people back to habits that work in real life, especially
                when schedules are full and routines feel hard to maintain.
              </p>
            </FadeInSection>

            <FadeInSection delayMs={120} className="grid gap-4 sm:grid-cols-3">
              {[
                { value: "Everyday", label: "real-life situations we design for" },
                { value: "3", label: "focus areas: editorial, product, community" },
                { value: "1", label: "core theme: get back to what works" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 text-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.35)] backdrop-blur-md"
                >
                  <p className="text-4xl font-semibold tracking-[-0.06em] text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-cyan-50/72">{item.label}</p>
                </div>
              ))}
            </FadeInSection>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <FadeInSection className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">What drives us</p>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
              What works should be easier to find and easier to follow.
            </h2>
            <p className="text-base leading-8 text-slate-600 sm:text-lg">
              We are thinking about real situations: getting home late and still wanting to eat better, waking up tired
              for the third day in a row, trying to recover after travel, or losing routine after a hard week. Our
              goal is to make the path back feel clear, calm, and possible.
            </p>
          </FadeInSection>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {companyValues.map((value, index) => (
              <FadeInSection key={value.title} delayMs={index * 90}>
                <article className="h-full rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.4)]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{value.copy}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/15 bg-gradient-to-br from-slate-950 via-cyan-950 to-emerald-950 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <FadeInSection className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100/75">How we work</p>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              We bring people back to what works, step by step.
            </h2>
            <p className="max-w-xl text-base leading-8 text-cyan-50/78 sm:text-lg">
              We translate health information into guidance people can use on busy mornings, stressful afternoons, and
              low-energy evenings. Our approach is simple: clarify the next action, reduce friction, and let people
              restart quickly when life knocks them off routine.
            </p>
          </FadeInSection>

          <div className="grid gap-4">
            {operatingPrinciples.map((item, index) => (
              <FadeInSection key={item} delayMs={index * 100}>
                <article className="grid gap-4 rounded-[1.4rem] border border-white/15 bg-white/95 p-5 shadow-[0_20px_60px_-50px_rgba(15,23,42,0.35)] sm:grid-cols-[5rem_1fr] sm:items-start sm:p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950">{item}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Each decision is designed to let people reset quickly and continue with confidence.
                    </p>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <FadeInSection className="grid gap-8 rounded-[2rem] border border-white/15 bg-gradient-to-br from-slate-950 via-cyan-950 to-emerald-950 p-8 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.5)] lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-10">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">The company in one line</p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                Back to Protocol brings people back to what works.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                We exist for the moments when people feel off track: after travel, during stressful seasons, or when
                healthy routines have slipped. Everything we create is designed to let people reset, recover, and move
                forward with habits that hold up in real life.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Mission", "Make healthy routines repeatable"],
                ["Tone", "Calm, direct, and practical"],
                ["Focus", "Clear guidance over clutter"],
                ["Outcome", "Better habits that last"],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-[1.1rem] border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/75">{subtitle}</p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
