import Link from "next/link";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Heart,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import { APP_STORE_URL } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Treehouse Pricing | Free to download and use",
  description:
    "Treehouse is free to download and use, with no paid tiers, subscriptions, or in-app purchases.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Treehouse is free to download and use",
    description:
      "Keep everyday essentials together in Treehouse, free to download and use.",
    type: "website",
  },
};

const included = [
  "Organize important documents and scanned copies",
  "Keep cards, insurance details, notes, and dates together",
  "Use on-device text recognition when scanning documents",
  "Search and return to the details you’ve saved",
  "Choose when to share a saved item",
];

const faqs = [
  {
    question: "Is Treehouse really free?",
    answer:
      "Yes. Treehouse is free to download and use. There are no paid tiers or features hidden behind an upgrade screen.",
  },
  {
    question: "Is there a subscription or an in-app purchase?",
    answer:
      "No. Treehouse has no subscription plans or in-app purchases.",
  },
  {
    question: "Will the price change when I download it?",
    answer:
      "Treehouse is free. The App Store will show the current price and availability for your region before you download, so you can check there too.",
  },
  {
    question: "What do I get for free?",
    answer:
      "The Treehouse app experience is free to use: organize your essentials, scan documents, search your collection, and choose when to share a saved item.",
  },
  {
    question: "How is my information protected?",
    answer:
      "Documents and photos are encrypted on your device before cloud backup. Encryption-key handling depends on your sign-in method. Read our Privacy Policy for the full details.",
  },
];

export default function PricingPage() {
  return (
    <main className="overflow-hidden bg-white text-[#28364b]">
      <section className="relative border-b border-[#e5ebf3] bg-[radial-gradient(ellipse_at_78%_28%,_rgba(205,229,255,0.78),_transparent_44%),linear-gradient(135deg,#f3f9ff_0%,#fff_55%,#eef6ff_100%)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#d7ebff]/70 blur-3xl" />
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#dce7f5] bg-white/80 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#46689b]">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-[#1977cf]" />
              Straightforward pricing
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-0.06em] text-[#202b3b] sm:text-6xl lg:text-7xl">
              A little more organized.
              <span className="mt-2 block text-[#1977cf]">A lot less expensive.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5b687a]">
              Treehouse is free to download and use. No pricing maze, no
              subscription surprise, no tiny asterisk wearing a fake mustache.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={APP_STORE_URL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-7 font-semibold text-white shadow-[0_8px_24px_-12px_rgba(29,112,219,0.65)] transition hover:bg-[#1765cc]"
              >
                See what’s included{" "}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link
                href="/support"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbdcf0] bg-white/80 px-6 font-semibold text-[#1769c2] transition hover:bg-white"
              >
                Ask us a question
              </Link>
            </div>
          </div>

          <article className="relative mx-auto w-full max-w-[420px] rounded-[28px] border border-[#dce7f5] bg-white p-7 shadow-[0_28px_90px_-42px_rgba(29,78,160,0.42)] sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#526178]">
                  Treehouse
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  The whole app
                </h2>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#1977cf]">
                <Heart aria-hidden="true" className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-7 flex items-end gap-2">
              <span className="text-6xl font-semibold leading-none tracking-[-0.07em] text-[#1d2939]">
                $0
              </span>
              <span className="pb-1 text-sm font-medium text-[#748094]">
                forever
              </span>
            </p>
            <p className="mt-4 text-sm leading-6 text-[#69778b]">
              Free to download and use. No paid tiers, subscriptions, or
              in-app purchases.
            </p>
            <div className="my-6 h-px bg-[#e8edf4]" />
            <ul className="space-y-3">
              {[
                "Everyday essentials in one place",
                "Document scanning and search",
                "You choose what to share",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#526178]">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#16835d]"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={APP_STORE_URL}
              className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-5 text-sm font-semibold text-white transition hover:bg-[#1765cc]"
            >
              Explore Treehouse{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
            Included, not upsold
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl">
            Everything useful. Nothing behind a paywall.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#748094] sm:text-lg">
            Treehouse helps make the details of life easier to keep together.
            The price for using the app is refreshingly uncomplicated.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-x-10 gap-y-5 sm:grid-cols-2">
          {included.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf7f1] text-[#16835d]">
                <Check aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="text-sm leading-6 text-[#526178]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e5ebf3] bg-[#10264a] text-white">
        <div className="mx-auto grid max-w-[1120px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#76cdf1]">
              No funny business
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Free should mean free. So we say what we mean.
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-[#d0daea]">
              Treehouse has no paid plans, subscriptions, or in-app purchases.
              We think a clear price is part of a good experience. The only
              surprise we’re aiming for is how nice it feels to find the thing
              you were looking for.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <LockKeyhole
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[#76cdf1]"
              />
              <p className="text-sm leading-6 text-[#d0daea]">
                Free doesn’t mean careless with your information. Learn how
                Treehouse handles encryption and sign-in in our{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
            Good questions
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl">
            The price is simple. Here are the details.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#748094]">
            Still wondering about something? We’re happy to help—no sales maze
            required.
          </p>
          <Link
            href="/support"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1769c2] transition hover:text-[#124f97]"
          >
            Contact Treehouse support{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="border-t border-[#e5eaf1]">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group border-b border-[#e5eaf1]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-semibold text-[#344258] [&::-webkit-details-marker]:hidden">
                {question}
                <CircleHelp
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#397bd0] transition group-open:rotate-12"
                />
              </summary>
              <p className="max-w-[640px] pb-5 pr-8 text-sm leading-6 text-[#748094]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e5ebf3] bg-[#f2f6fc]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-5 px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
            No calculator needed
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-[#243247] sm:text-4xl">
            Free forever. Your bill, nowhere.
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#748094]">
            Treehouse is free to download and use. Take a look at what it can
            help you keep close.
          </p>
          <a
            href={APP_STORE_URL}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-7 font-semibold text-white transition hover:bg-[#1765cc]"
          >
            Explore Treehouse{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
