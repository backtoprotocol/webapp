import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  FileText,
  HeartHandshake,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import { APP_STORE_URL } from "@/lib/site-links";

const essentials = [
  {
    icon: FileText,
    title: "Keep important documents close",
    description:
      "Organize important documents and personal records so they are easy to find when you need them.",
  },
  {
    icon: ShieldCheck,
    title: "Keep coverage details together",
    description:
      "Bring insurance information and other essential details into one easier-to-manage place.",
  },
  {
    icon: CreditCard,
    title: "Keep everyday details in reach",
    description:
      "Save the account, card, and household information that helps keep life moving.",
  },
  {
    icon: CalendarDays,
    title: "Remember the details that matter",
    description:
      "Keep track of important dates and renewals alongside the information they relate to.",
  },
  {
    icon: HeartHandshake,
    title: "Keep things personal",
    description:
      "Create a collection around the details that matter in your own life.",
  },
  {
    icon: Search,
    title: "Find the details again",
    description:
      "Organize and search your collection instead of starting from scratch.",
  },
];

export const metadata: Metadata = {
  title: "Treehouse Solutions | Keep life's details organized",
  description:
    "Bring important documents, cards, insurance details, notes, and dates together in Treehouse.",
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "A place for life's important details | Treehouse",
    description:
      "Keep documents, insurance details, cards, notes, and important dates organized together with Treehouse.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-white text-[#28364b]">
      <section className="relative overflow-hidden border-b border-[#e5ebf3] bg-gradient-to-br from-[#f3f9ff] via-white to-[#edf6ff]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#d7ebff] blur-3xl" />
        <div className="relative mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold text-[#1769c2]">
            Everyday organization, made simpler
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            A place for life’s important details.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5b687a] sm:text-xl">
            Important details tend to end up everywhere. Treehouse brings
            documents, cards, insurance information, notes, and dates into one
            thoughtful collection that’s easier to organize and return to.
          </p>
          <a
            href={APP_STORE_URL}
            className="mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-7 font-semibold text-white transition hover:bg-[#1765cc]"
          >
            Explore Treehouse <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#1769c2]">
            Less searching. More peace of mind.
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
            A home for the details you reach for.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#69778b] sm:text-lg">
            Keep the information you choose to save together, with tools to
            scan, organize, search, and find it again when it matters.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {essentials.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-[#e5ebf3] bg-white p-6 shadow-[0_8px_28px_-24px_rgba(27,58,87,0.5)] sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#1977cf]">
                <Icon aria-hidden="true" className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#69778b]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e5ebf3] bg-[#f7fbff]">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[#1769c2]">
              Keep the details that matter together
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em]">
              Start with the details that matter to you.
            </h2>
            <p className="mt-3 leading-7 text-[#69778b]">
              Add what you need, keep related information close, and build a
              personal collection at your own pace.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#cbdcf0] bg-white px-6 font-semibold text-[#1769c2] transition hover:bg-[#f1f7ff]"
          >
            Explore the product{" "}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
