import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Compass,
  Heart,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { APP_STORE_URL } from "@/lib/site-links";

const principles = [
  {
    icon: Heart,
    title: "People before technology",
    description:
      "The best solution starts with listening. We build around real people, real needs, and how life actually works.",
  },
  {
    icon: Lightbulb,
    title: "Clarity over complexity",
    description:
      "We believe good technology should make things feel simpler—not leave you with more to figure out.",
  },
  {
    icon: Compass,
    title: "Useful, by intention",
    description:
      "We care about the details, but always come back to one question: does this make something better?",
  },
];

export const metadata = {
  title: "About Back to Protocol | The company behind Treehouse",
  description:
    "Meet Back to Protocol, the company behind Treehouse, and our mission to help keep life’s important details organized.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#fcfdff] text-[#1d2939]">
      <section className="relative overflow-hidden border-b border-[#e5ebf3]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_22%,_rgba(197,224,255,0.78),_transparent_44%),radial-gradient(ellipse_at_14%_100%,_rgba(220,225,255,0.50),_transparent_44%)]" />
        <div className="relative mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
          <div className="max-w-[800px] space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dce7f5] bg-white/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#3d6ba8]">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#49bce8] to-[#0874ed]" />
              The people behind the products
            </div>
            <h1 className="text-[clamp(3rem,8vw,6.25rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-[#1b2940]">
              Thoughtful technology for{" "}
              <span className="bg-gradient-to-r from-[#49bce8] to-[#0870ed] bg-clip-text text-transparent">
                everyday life.
              </span>
            </h1>
            <p className="max-w-[680px] text-lg leading-8 text-[#64738a] sm:text-xl sm:leading-9">
              This is the mission behind Treehouse, our app from Back to
              Protocol: bring life’s important details into one thoughtful
              place, so they’re easier to organize and return to.
            </p>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <a
                href={APP_STORE_URL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#39b8e9] to-[#0871ee] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(29,112,219,0.75)] transition hover:brightness-105"
              >
                Get Treehouse
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link
                href="/support"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#dce5f0] bg-white/80 px-6 text-sm font-semibold text-[#40516a] transition hover:border-[#94b7e5] hover:bg-white"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e6ebf2] bg-white">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-24">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397bd0]">
              Our mission
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#23334e] sm:text-4xl">
              Your essentials, together.
            </h2>
          </div>
          <div className="space-y-5">
            <p className="text-lg leading-8 text-[#5f6f85]">
              Treehouse brings documents, cards, insurance details, notes, and
              important dates into one clear, personal collection.
            </p>
            <p className="text-base leading-7 text-[#748198]">
              Back to Protocol is the company behind Treehouse. We build
              thoughtful technology around a simple idea: help people keep the
              details that matter close at hand.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="max-w-[680px]">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397bd0]">
            What guides us
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#23334e] sm:text-4xl">
            Thoughtful in the details. Clear about the purpose.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#748198] sm:text-lg">
            We’re here for useful work that respects people’s time, attention,
            and trust.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description }, index) => (
            <div key={title}>
              <article className="h-full rounded-3xl border border-[#e3eaf3] bg-gradient-to-br from-[#f5f8ff] to-white p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#49bce8] to-[#0874ed] text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-7 text-xs font-bold tracking-[0.12em] text-[#6578c6]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#2c3b53]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6e7c91]">
                  {description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e1e8f2] bg-[#f2f6fc]">
        <div className="mx-auto grid max-w-[1160px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397bd0]">
              What we’re building
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#23334e] sm:text-4xl">
              A company with room for good ideas.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#748198]">
              We make our own products and work alongside people who want to
              make their technology work better.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <article className="flex gap-5 rounded-3xl border border-[#e2e8f1] bg-white p-6 sm:p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white">
                  <Image
                    src="/treehouse-logo.png"
                    alt=""
                    width={44}
                    height={44}
                    loading="eager"
                    unoptimized
                    className="h-11 w-11 object-contain"
                  />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5974bd]">
                    Our first product
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#293951]">
                    Treehouse
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#718096]">
                    Your essentials, together. Treehouse brings documents,
                    cards, accounts, and important details of everyday life
                    into one thoughtful place.
                  </p>
                  <a
                    href={APP_STORE_URL}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3475c8] transition hover:text-[#1758ae]"
                  >
                    Explore Treehouse
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </div>
            <div>
              <article className="flex gap-5 rounded-3xl border border-[#e2e8f1] bg-white p-6 sm:p-7">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#496ec4]">
                  <Sparkles aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#5974bd]">
                    Working together
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-[#293951]">
                    Digital services &amp; expertise
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#718096]">
                    We help people and small businesses with websites, practical
                    technology support, and the systems they rely on.
                  </p>
                  <Link
                    href="/solutions"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3475c8] transition hover:text-[#1758ae]"
                  >
                    See how we help
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#49bce8] to-[#0870ed] text-white">
        <div className="mx-auto flex max-w-[1160px] flex-col gap-7 px-5 py-14 sm:px-8 sm:py-16 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/75">
              Back to Protocol
            </p>
            <h2 className="mt-3 max-w-[620px] text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
              Your essentials, together.
            </h2>
          </div>
          <Link
            href="/support"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/40 bg-white px-6 text-sm font-semibold text-[#24589d] transition hover:bg-[#eff6ff] md:self-auto"
          >
            Start a conversation
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
