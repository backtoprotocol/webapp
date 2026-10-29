import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Heart,
  Lightbulb,
  LockKeyhole,
  Monitor,
  PackageOpen,
  Smartphone,
} from "lucide-react";
import { APP_STORE_URL } from "@/lib/site-links";

const waysWeWork = [
  {
    icon: Heart,
    title: "People first",
    description:
      "Technology should fit real lives. We start with the people using it and the things they need to get done.",
  },
  {
    icon: Lightbulb,
    title: "Make the useful clear",
    description:
      "We value straightforward tools and thoughtful details over complexity for its own sake.",
  },
  {
    icon: Compass,
    title: "Build with purpose",
    description:
      "Every product, feature, and service should have a reason to exist—and make something work better.",
  },
];

const whatWeDo = [
  {
    icon: PackageOpen,
    eyebrow: "OUR FIRST PRODUCT",
    title: "Treehouse brings our mission to life.",
    description:
      "Our app helps people keep important cards, documents, and personal details organized and close at hand.",
    link: "Explore Treehouse",
    href: APP_STORE_URL,
  },
  {
    icon: Smartphone,
    eyebrow: "APPS & SOFTWARE",
    title: "We design and build digital products.",
    description:
      "Back to Protocol is focused on creating apps and software that are useful, thoughtfully designed, and easy to understand.",
    link: "Explore our products",
    href: "/solutions",
  },
  {
    icon: Monitor,
    eyebrow: "THOUGHTFUL DESIGN",
    title: "We put people at the center.",
    description:
      "We shape each product around real needs, bringing clear design and useful technology together.",
    link: "How we think about design",
    href: "/about#how-we-work",
  },
];

export const metadata = {
  title: "About Back to Protocol | Who we are and what we do",
  description:
    "Get to know Back to Protocol, a technology company designing and building apps and software, including Treehouse.",
};

export default function AboutPage() {
  return (
    <main className="bg-white text-[#1d2939]">
      <section className="relative isolate overflow-hidden border-b border-[#e5ebf3] bg-[#f7faff]">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_10%,rgba(177,214,255,0.65),transparent_38%),radial-gradient(ellipse_at_4%_92%,rgba(226,233,255,0.8),transparent_42%)]" />
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-28">
          <div className="max-w-[680px]">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#dce7f5] bg-white/90 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#3d6ba8] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#49bce8] to-[#0874ed]" />
              Our mission
            </p>
            <h1 className="mt-6 text-[clamp(2rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-[#1b2940]">
              <span className="whitespace-nowrap">Your essentials,</span>{" "}
              <span className="bg-gradient-to-r from-[#49bce8] to-[#0870ed] bg-clip-text text-transparent">
                together.
              </span>
            </h1>
            <p className="mt-6 max-w-[620px] text-base leading-7 text-[#64738a] sm:text-lg sm:leading-8">
              Back to Protocol is a technology company that designs and builds
              apps and software. We create digital products that are useful,
              understandable, and built around the people who use them.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#what-we-do"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(29,112,219,0.65)] transition hover:bg-[#1765cc]"
              >
                What we do
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <a
                href="/support"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d6e0ed] bg-white/90 px-6 text-sm font-semibold text-[#40516a] transition hover:border-[#94b7e5] hover:bg-white"
              >
                Talk about a project
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-5 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(100,166,245,0.22),transparent_70%)] blur-xl" />
            <div className="relative rounded-[30px] border border-[#dfe8f3] bg-white p-5 shadow-[0_30px_90px_-45px_rgba(29,78,160,0.42)] sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#edf1f7] pb-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7faff]">
                  <Image
                    src="/back-to-protocol-logo.png"
                    alt=""
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 object-contain"
                  />
                </span>
                <div>
                  <p className="font-semibold text-[#28364b]">
                    Back to Protocol
                  </p>
                  <p className="mt-0.5 text-xs text-[#8794a5]">
                    Technology with a human point of view
                  </p>
                </div>
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-[#397bd0]">
                What matters to us
              </p>
              <div className="mt-3 space-y-3">
                {[
                  ["Useful products", "Built to solve real everyday needs"],
                  ["Apps & software", "Designed and built with intention"],
                  ["People-first thinking", "Designed around the people using it"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-2xl bg-[#f7faff] p-3.5"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#2876d2] shadow-sm">
                      <LockKeyhole aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-[#344258]">
                        {title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#748094]">
                        {description}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e6ebf2] bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-14 sm:px-8 sm:py-18 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397bd0]">
              Who we are
            </p>
            <h2 className="mt-4 max-w-[440px] text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#23334e] sm:text-4xl">
              People-first technology, built for everyday life.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-[#64738a] sm:text-lg sm:leading-8">
            <p>
              We’re Back to Protocol, a technology company focused on
              designing and building apps and software. We bring product
              thinking, design, and technology together to create digital
              experiences for everyday life.
            </p>
            <p>
              Treehouse is our first product: an app that brings important
              cards, documents, and personal details together. It reflects
              what we believe software should do—make useful things easier to
              organize and access.
            </p>
          </div>
        </div>
      </section>

      <section
        id="what-we-do"
        className="scroll-mt-24 bg-[linear-gradient(145deg,#f7faff_0%,#fff_55%,#f3f8ff_100%)]"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397bd0]">
              What we do
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#23334e] sm:text-4xl">
              We design and build apps and software.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#748198] sm:text-lg">
              From the products we create to the details of each experience,
              our focus is on useful software made for people.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-12">
            {whatWeDo.map(
              ({ icon: Icon, eyebrow, title, description, link, href }) => (
                <article
                  key={title}
                  className="flex h-full flex-col rounded-3xl border border-[#e2eaf4] bg-white p-6 shadow-[0_18px_48px_-38px_rgba(29,78,160,0.42)] sm:p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#2876d2]">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <p className="mt-6 text-[10px] font-bold tracking-[0.14em] text-[#5974bd]">
                    {eyebrow}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.025em] text-[#293951]">
                    {title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#718096]">
                    {description}
                  </p>
                  <Link
                    href={href}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#1769c2] transition hover:text-[#124f97]"
                  >
                    {link}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="how-we-work"
        className="scroll-mt-24 border-y border-[#e5ebf3] bg-white"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="max-w-[680px]">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#397bd0]">
              How we work
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#23334e] sm:text-4xl">
              Good technology starts with good questions.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#748198] sm:text-lg">
              We keep the focus on what people actually need—and make the
              details work toward that.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {waysWeWork.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="rounded-3xl border border-[#e3eaf3] bg-gradient-to-br from-[#f5f8ff] to-white p-6 sm:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#49bce8] to-[#0874ed] text-white">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-6 text-xs font-bold tracking-[0.12em] text-[#6578c6]">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#2c3b53]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6e7c91]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#49bce8] to-[#0870ed] text-white">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-14 sm:px-8 sm:py-16 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/75">
              Back to Protocol
            </p>
            <h2 className="mt-3 max-w-[680px] text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl">
              Have an idea for an app or software?
            </h2>
            <p className="mt-3 max-w-[620px] text-sm leading-6 text-white/85 sm:text-base">
              Tell us what you’re thinking about. We’d love to hear what you
              want to build.
            </p>
          </div>
          <Link
            href="/support"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-white/40 bg-white px-6 text-sm font-semibold text-[#24589d] transition hover:bg-[#eff6ff] md:self-auto"
          >
            Talk about your idea
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
