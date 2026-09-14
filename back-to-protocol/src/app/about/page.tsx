import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, Headphones } from "lucide-react";
import { FadeInSection } from "@/components/fade-in-section";

const companyValues = [
  {
    title: "When something breaks",
    copy: "We guide you to a clear next step instead of a wall of troubleshooting forums and guesses.",
  },
  {
    title: "When a project stalls",
    copy: "If a website or system launch has stalled out, we pick it back up and get it shipped.",
  },
  {
    title: "When it feels too technical",
    copy: "We translate technical decisions into plain language so you can make the call with confidence.",
  },
];

const companyPillars = [
  {
    title: "Websites",
    copy: "We design, build, and maintain business websites that are fast, clear, and easy to update.",
  },
  {
    title: "Tech support",
    copy: "We fix the everyday problems with computers, Wi-Fi, printers, accounts, and devices.",
  },
  {
    title: "Business IT",
    copy: "We manage the systems small businesses depend on: email, domains, networks, and security.",
  },
];

const operatingPrinciples = [
  "If something is broken, give a clear next step, not more jargon.",
  "If a request is urgent, respond fast and set expectations early.",
  "If a fix is quick, keep the price and process simple.",
  "If a project is bigger, scope it clearly before work begins.",
];

export default function AboutPage() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="relative overflow-hidden border-b border-[#17211b]/10">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#f6f7f2_0%,#f6f7f2_56%,#dff3e7_56%,#dff3e7_100%)] max-lg:hidden" />
        <div className="relative mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <FadeInSection className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#17211b]/15 bg-white px-3 py-2 text-xs font-bold uppercase text-[#355244]">
              About the company
            </div>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-[72px]">
              Your technology person, without the full-time IT department.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#4c5c52] sm:text-xl">
              Back to Protocol started as a way to help people and small businesses stop wrestling with technology
              alone. We build websites, fix everyday tech problems, and manage the systems that keep small
              businesses running, one clear answer at a time.
            </p>
          </FadeInSection>

          <FadeInSection delayMs={120} className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { value: "Remote-first", label: "support for households and small teams" },
              { value: "3", label: "core services: websites, tech support, business IT" },
              { value: "1", label: "person accountable for the result" },
            ].map((item) => (
              <div key={item.label} className="border border-[#17211b]/15 bg-white p-6">
                <p className="text-3xl font-semibold text-[#17211b]">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#5a685f]">{item.label}</p>
              </div>
            ))}
          </FadeInSection>
        </div>
      </section>

      <section className="border-b border-[#17211b]/10 bg-white px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1480px]">
          <FadeInSection className="max-w-2xl space-y-4">
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">What drives us</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Technology help should be clear, not another chore.
            </h2>
            <p className="text-lg leading-8 text-[#5a685f]">
              Most people do not want to become their own IT department. We handle the setup, the fixes, and the
              maintenance so technology stays out of the way and lets you get back to work.
            </p>
          </FadeInSection>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {companyValues.map((value, index) => (
              <FadeInSection key={value.title} delayMs={index * 90}>
                <article className="h-full border border-[#17211b]/15 bg-[#f6f7f2] p-7">
                  <p className="text-xs font-bold text-[#1f7a4d]">0{index + 1}</p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight">{value.title}</h3>
                  <p className="mt-4 leading-7 text-[#5a685f]">{value.copy}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#17211b]/10 bg-[#17211b] px-5 py-16 text-white sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <FadeInSection className="space-y-4">
            <p className="text-xs font-bold uppercase text-[#9dd9b7]">How we work</p>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
              Websites, support, and business IT in one place.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-white/70">
              Whether you need a new website built, a stubborn computer fixed, or an ongoing IT partner for your
              business, we bring the same approach: figure out what is actually wrong, explain the options plainly,
              and get it handled.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm text-white/70">
              <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#9dd9b7]" /> Clear pricing</span>
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#9dd9b7]" /> Remote help first</span>
              <span className="flex items-center gap-2"><Headphones className="h-4 w-4 text-[#9dd9b7]" /> One person who knows your setup</span>
            </div>
          </FadeInSection>

          <div className="grid gap-5 sm:grid-cols-3">
            {companyPillars.map((pillar, index) => (
              <FadeInSection key={pillar.title} delayMs={index * 100}>
                <article className="h-full border border-white/15 bg-white/[0.06] p-6">
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{pillar.copy}</p>
                </article>
              </FadeInSection>
            ))}
          </div>

          <div className="lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-4">
            {operatingPrinciples.map((item, index) => (
              <FadeInSection key={item} delayMs={index * 100} className="mt-4 lg:mt-0">
                <article className="flex items-start gap-4 border border-white/15 bg-white/[0.04] p-5">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#9dd9b7] text-sm font-semibold text-[#17211b]">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-7 text-white/80">{item}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3a45b] text-[#17211b]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase">Ready when you are</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">
              Tell us what is not working. We will figure out the rest.
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/support" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17211b] px-6 font-semibold text-white">
              Request help <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services#websites" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#17211b]/40 bg-white/50 px-6 font-semibold">
              Build a website
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
