import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  ChevronDown,
  CreditCard,
  FileText,
  Fingerprint,
  HeartPulse,
  KeyRound,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { APP_STORE_URL } from "@/lib/site-links";
import Image from "next/image";
import Link from "next/link";
import { EssentialsShowcase } from "@/components/essentials-showcase";

const faqs = [
  {
    question: "What is Treehouse?",
    answer:
      "Treehouse is an app from Back to Protocol that brings important documents, cards, accounts, insurance information, and notes together in one thoughtfully organized place.",
  },
  {
    question: "How does Treehouse protect my information?",
    answer:
      "Treehouse encrypts your documents and photos on your device before cloud backup. How encryption keys are handled depends on how you sign in; see our Privacy Policy for details. You can also use your device's biometric security to help protect access.",
  },
  {
    question: "Can I share a document from Treehouse?",
    answer:
      "Yes. Treehouse includes a sharing flow for copies of saved items, so you can choose when to share information.",
  },
  {
    question: "What can I keep in Treehouse?",
    answer:
      "Treehouse helps you organize documents, scanned copies, cards, account details, insurance information, and important dates in one place.",
  },
];

function ProductPreview() {
  return (
    <div
      aria-label="Illustration of the Treehouse app"
      className="relative mx-auto w-full max-w-[500px] px-3 pb-10 pt-5 sm:px-7 lg:h-[350px]"
    >
      <div className="absolute inset-x-10 top-8 bottom-12 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,_rgba(112,178,255,0.34),_rgba(231,239,255,0.20)_63%,_transparent_72%)] blur-2xl" />

      <div className="relative rotate-[-1.2deg] rounded-[30px] border border-[#dfe8f3] bg-white p-4 shadow-[0_30px_90px_-40px_rgba(29,78,160,0.34)] sm:p-6 lg:absolute lg:left-1/2 lg:top-5 lg:w-[500px] lg:-translate-x-1/2 lg:origin-top lg:scale-[0.68]">
        <div className="flex items-center justify-between border-b border-[#edf1f7] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white">
              <Image
                src="/treehouse-logo.png"
                alt=""
                width={40}
                height={40}
                loading="eager"
                unoptimized
                className="h-10 w-10 object-contain"
              />
            </span>
            <div>
              <p className="text-sm font-bold tracking-tight text-[#233247]">
                treehouse
              </p>
              <p className="text-[11px] text-[#8490a1]">
                YOUR ESSENTIALS, TOGETHER.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0f6ff] px-3 py-1.5 text-[11px] font-medium text-[#386eb0]">
            <LockKeyhole aria-hidden="true" className="h-3 w-3" />
            Protected
          </span>
        </div>

        <div className="pb-5 pt-6">
          <p className="text-xs font-medium text-[#8794a5]">YOUR TREEHOUSE</p>
          <h2 className="mt-1 text-[25px] font-semibold tracking-[-0.04em] text-[#243247] sm:text-[30px]">
            Your essentials, together.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#e9eef5] bg-[#fbfcff] p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f3ff] text-[#357bcc]">
              <FileText aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="mt-4 text-sm font-semibold text-[#2e3d53]">
              Important documents
            </p>
            <p className="mt-1 text-xs text-[#8a95a5]">Saved in Treehouse</p>
          </div>
          <div className="rounded-2xl border border-[#e9eef5] bg-[#fbfcff] p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0efff] text-[#7057cb]">
              <HeartPulse aria-hidden="true" className="h-4 w-4" />
            </span>
            <p className="mt-4 text-sm font-semibold text-[#2e3d53]">
              Insurance
            </p>
            <p className="mt-1 text-xs text-[#8a95a5]">Details close at hand</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-[#e9eef5] bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4ff] text-[#567cbb]">
                <CreditCard aria-hidden="true" className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[#2e3d53]">
                  Cards &amp; accounts
                </p>
                <p className="mt-0.5 text-xs text-[#8a95a5]">••••  ••••</p>
              </div>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 text-[#8995a5]"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#eef6ff] to-[#f3f1ff] px-4 py-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#437bd1]">
            <CalendarClock aria-hidden="true" className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-[#3d5683]">
              A little more peace of mind
            </p>
            <p className="mt-0.5 text-[11px] text-[#7787a2]">
              Keep track of important dates
            </p>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="ml-auto h-4 w-4 text-[#7d8fc2]"
          />
        </div>
      </div>

      <div className="absolute -bottom-1 -left-1 flex items-center gap-2.5 rounded-2xl border border-[#e5ebf3] bg-white px-4 py-3 shadow-[0_16px_40px_-24px_rgba(29,78,160,0.45)] sm:left-0">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf4ff] text-[#4779ca]">
          <ScanLine aria-hidden="true" className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold text-[#435268]">
          Scan a document
        </span>
        <Check aria-hidden="true" className="h-4 w-4 text-[#4c7fe0]" />
      </div>
      <div className="absolute -right-1 bottom-8 hidden items-center gap-2 rounded-full border border-[#e5ebf3] bg-white/95 px-3 py-2 text-[11px] font-medium text-[#536987] shadow-lg sm:flex">
        <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#4b7ed3]" />
        Made for your privacy
      </div>
    </div>
  );
}

export const metadata = {
  title: "Treehouse | Your essentials, together.",
  description:
    "Your essentials, together. Treehouse brings important documents, cards, accounts, and everyday details into one thoughtful place.",
};

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#fcfdff] text-[#1d2939]">
      <section id="treehouse" className="relative scroll-mt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_38%,_rgba(218,235,255,0.72),_transparent_42%),radial-gradient(ellipse_at_4%_84%,_rgba(232,230,255,0.42),_transparent_37%)]" />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-5 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-14 lg:min-h-[570px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:px-10 lg:py-16">
          <div className="mx-auto max-w-[520px] text-center lg:mx-0 lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dce7f5] bg-white/90 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#46689b] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#49bce8] to-[#0874ed]" />
              Treehouse by Back to Protocol
            </div>
            <h1 className="mt-6 text-[clamp(2.8rem,5vw,4.2rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-[#202b3b]">
              Your essentials,
              <br className="hidden sm:block" /> together.
            </h1>
            <p className="mx-auto mt-6 max-w-[450px] text-base leading-7 text-[#687487] sm:text-lg sm:leading-8 lg:mx-0">
              Treehouse is made by Back to Protocol to bring documents,
              insurance, cards, and notes together in one thoughtful place.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href={APP_STORE_URL}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-7 text-sm font-semibold text-white shadow-[0_8px_20px_-10px_rgba(25,112,224,0.8)] transition hover:bg-[#1765cc]"
              >
                Explore Treehouse
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link
                href="/solutions"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d6e0ed] bg-white/80 px-6 text-sm font-semibold text-[#1769c2] transition hover:bg-white"
              >
                See what it can hold
              </Link>
            </div>
            <p className="mt-5 text-xs font-medium text-[#8994a4]">
              Free to download and use · No subscriptions or in-app purchases
            </p>
          </div>

          <ProductPreview />
        </div>
      </section>

      <nav
        aria-label="On this page"
        className="relative z-10 mx-auto -mt-5 flex w-fit max-w-[calc(100%-2rem)] flex-wrap items-center justify-center gap-1 rounded-full border border-[#e5eaf1] bg-white/95 p-1.5 shadow-[0_12px_34px_-22px_rgba(32,54,78,0.45)] sm:gap-2 sm:px-3"
      >
        <Link
          href="/solutions"
          className="rounded-full px-3 py-2 text-xs font-medium text-[#4e5e72] transition hover:bg-[#eff5ff] hover:text-[#2867bb] sm:px-4 sm:text-sm"
        >
          Solutions
        </Link>
        <Link
          href="/products"
          className="rounded-full px-3 py-2 text-xs font-medium text-[#4e5e72] transition hover:bg-[#eff5ff] hover:text-[#2867bb] sm:px-4 sm:text-sm"
        >
          Products
        </Link>
        <Link
          href="#ai"
          className="rounded-full px-3 py-2 text-xs font-medium text-[#4e5e72] transition hover:bg-[#eff5ff] hover:text-[#2867bb] sm:px-4 sm:text-sm"
        >
          AI
        </Link>
        <Link
          href="#pricing"
          className="rounded-full px-3 py-2 text-xs font-medium text-[#4e5e72] transition hover:bg-[#eff5ff] hover:text-[#2867bb] sm:px-4 sm:text-sm"
        >
          Pricing
        </Link>
        <Link
          href="/resources"
          className="rounded-full px-3 py-2 text-xs font-medium text-[#4e5e72] transition hover:bg-[#eff5ff] hover:text-[#2867bb] sm:px-4 sm:text-sm"
        >
          Resources
        </Link>
      </nav>

      <EssentialsShowcase />

      <section
        id="privacy"
        className="scroll-mt-24 border-y border-[#e5ebf3] bg-[#f4f8fe]"
      >
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#76cdf1]">
              Thoughtful by design
            </p>
            <h2 className="mt-4 max-w-[540px] text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl lg:text-5xl">
              Your details are personal. Your choices should be, too.
            </h2>
            <p className="mt-5 max-w-[520px] text-base leading-7 text-[#687487]">
              Documents and photos are encrypted on your device before cloud
              backup. Choose what to keep, and when to share it. Our privacy
              page explains how key handling differs by sign-in method.
            </p>
            <Link
              href="/privacy"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#1769c2] transition hover:text-[#124f97]"
            >
              Read how privacy works
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-3xl border border-[#e2eaf4] bg-white p-6 shadow-[0_18px_45px_-35px_rgba(35,68,120,0.42)] sm:col-span-2 sm:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#2876d2]">
                <LockKeyhole aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold text-[#2e3d53]">
                Encrypted before cloud backup
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#687487]">
                Your documents and photos are encrypted on your device before
                they are backed up.
              </p>
            </article>
            <article className="rounded-3xl border border-[#e2eaf4] bg-white p-6 shadow-[0_18px_45px_-35px_rgba(35,68,120,0.42)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef0ff] text-[#6657c7]">
                <Fingerprint aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold text-[#2e3d53]">
                Your device, your unlock
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#687487]">
                Use device biometrics as part of how you open Treehouse.
              </p>
            </article>
            <article className="rounded-3xl border border-[#e2eaf4] bg-white p-6 shadow-[0_18px_45px_-35px_rgba(35,68,120,0.42)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf7f1] text-[#24815d]">
                <KeyRound aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-semibold text-[#2e3d53]">
                You choose what to share
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#687487]">
                Sharing starts with you. Choose when to send a saved item.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        id="ai"
        className="scroll-mt-24 border-b border-[#e5eaf1] bg-white"
      >
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
              On-device text recognition
            </p>
            <h2 className="mt-4 max-w-[540px] text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl lg:text-5xl">
              Less retyping. More time for everything else.
            </h2>
            <p className="mt-5 max-w-[520px] text-base leading-7 text-[#687487] sm:text-lg">
              When you scan a document, Treehouse can use on-device text
              recognition to help make it easier to organize and search. Your
              information stays under your control.
            </p>
            <a
              href="/ai"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3475c8] transition hover:text-[#1758ae]"
            >
              Learn about scanning in Treehouse
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,_rgba(167,210,255,0.48),_rgba(235,243,255,0.2)_62%,_transparent_72%)] blur-2xl" />
            <div className="relative rounded-[30px] border border-[#e3eaf3] bg-[#f8fbff] p-5 shadow-[0_24px_70px_-44px_rgba(29,78,160,0.5)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#748094]">
                    Scan to organize
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-[#243247]">
                    Keep the details together.
                  </h3>
                </div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#2876d2] shadow-sm">
                  <ScanLine aria-hidden="true" className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-7 rounded-2xl border border-[#e3eaf3] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#2876d2]">
                    <FileText aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#344258]">
                      Document scan
                    </p>
                    <p className="mt-0.5 text-xs text-[#8794a5]">
                      Text recognition on your device
                    </p>
                  </div>
                  <Check
                    aria-hidden="true"
                    className="ml-auto h-5 w-5 text-[#24815d]"
                  />
                </div>
                <div className="mt-5 space-y-2.5">
                  <span className="block h-2.5 w-full rounded-full bg-[#edf2f8]" />
                  <span className="block h-2.5 w-4/5 rounded-full bg-[#edf2f8]" />
                  <span className="block h-2.5 w-3/5 rounded-full bg-[#edf2f8]" />
                </div>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-[#748094]">
                Scan. Organize. Find it when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="scroll-mt-24 border-b border-[#e5eaf1] bg-[#f4f8fe]"
      >
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
              Simple, just like it should be
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl lg:text-5xl">
              A calmer place for your essentials. Free to use.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#748094] sm:text-lg">
              Treehouse is free to download and use, with no paid tiers,
              subscriptions, or in-app purchases. No pricing maze, no surprise
              bill—just a refreshingly short number.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#dce7f5] bg-white p-6 shadow-[0_20px_60px_-40px_rgba(29,78,160,0.42)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#397bd0]">
              Treehouse
            </p>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-6xl font-semibold leading-none tracking-[-0.07em] text-[#202b3b]">
                $0
              </span>
              <span className="pb-1 text-sm text-[#748094]">to download and use</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#687487]">
              All the essentials. No subscription. That’s the whole pricing
              page, really.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-6 text-sm font-semibold text-white transition hover:bg-[#1765cc]"
            >
              See pricing details
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto grid max-w-[1120px] scroll-mt-24 gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10 lg:py-28"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
            Good questions
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl">
            A few things you might be wondering.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#748094]">
            Still curious? We’d be happy to hear from you.
          </p>
          <Link
            href="/support"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3475c8] transition hover:text-[#1758ae]"
          >
            Ask about Treehouse
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-t border-[#e5eaf1]">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group border-b border-[#e5eaf1]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-semibold text-[#344258] [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-[#738198] transition group-open:rotate-180"
                />
              </summary>
              <p className="max-w-[640px] pb-5 pr-8 text-sm leading-6 text-[#748094]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e5eaf1] bg-[#f2f6fc]">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-6 px-5 py-14 text-center sm:px-8 sm:py-16">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
            <Image
              src="/treehouse-logo.png"
              alt=""
              width={48}
              height={48}
              loading="eager"
              unoptimized
              className="h-12 w-12 object-contain"
            />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
              Treehouse by Back to Protocol
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#243247] sm:text-3xl">
              Your essentials, together.
            </h2>
            <p className="mt-3 text-sm text-[#748094]">
              Keep important documents, cards, insurance details, and dates
              together with Treehouse.
            </p>
          </div>
          <a
            href={APP_STORE_URL}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#39b8e9] to-[#0871ee] px-5 text-sm font-semibold text-white transition hover:brightness-105"
          >
            Get started
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
