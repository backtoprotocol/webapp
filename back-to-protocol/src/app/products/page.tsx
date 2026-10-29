import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  FileText,
  ScanLine,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treehouse Products | Organize everyday essentials",
  description:
    "Discover how Treehouse helps you scan, organize, and find important documents, cards, insurance details, notes, and dates.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Explore Treehouse features",
    description:
      "See how Treehouse helps keep important documents and everyday details organized.",
    type: "website",
  },
};

const features = [
  {
    icon: FileText,
    title: "Keep important documents close",
    description:
      "Bring personal records and important paperwork into one organized collection.",
  },
  {
    icon: ScanLine,
    title: "Add a scan when you need one",
    description:
      "Scan documents with on-device text recognition, then keep the copy with the details around it.",
  },
  {
    icon: CreditCard,
    title: "Organize cards and accounts",
    description:
      "Keep everyday card, membership, and account details together and easier to return to.",
  },
  {
    icon: CalendarDays,
    title: "Keep dates alongside details",
    description:
      "Store important dates and renewals with the information they relate to.",
  },
  {
    icon: Search,
    title: "Find what you saved",
    description:
      "Organize and search your collection so you can get back to the information you need.",
  },
  {
    icon: ShieldCheck,
    title: "Make choices that feel right",
    description:
      "Choose what to add and when to share a saved item. Your collection is yours to shape.",
  },
];

export default function ProductsPage() {
  return (
    <main className="bg-white text-[#28364b]">
      <section className="relative overflow-hidden border-b border-[#e5ebf3] bg-gradient-to-br from-[#f3f9ff] via-white to-[#edf6ff]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#d7ebff] blur-3xl" />
        <div className="relative mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold text-[#1769c2]">
            Meet the Treehouse app
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl">
            A simpler way to keep life organized.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5b687a]">
            Treehouse brings documents, cards, insurance details, notes, and
            important dates into one thoughtful place—so the things you rely on
            are easier to organize and find again.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/support"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-7 font-semibold text-white transition hover:bg-[#1765cc]"
            >
              Get help getting started{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              href="/privacy"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbdcf0] bg-white/80 px-6 font-semibold text-[#1769c2] transition hover:bg-white"
            >
              How privacy works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-[#1769c2]">
            Made for the details of real life
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
            Simple tools for a more organized day.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#69778b] sm:text-lg">
            Create a collection that fits your life, whether you’re keeping one
            important record close or bringing lots of everyday details
            together.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
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

      <section className="border-y border-[#e5ebf3] bg-[#10264a] text-white">
        <div className="mx-auto grid max-w-[1120px] gap-8 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#76cdf1]">
              Your information matters
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em]">
              Privacy should be clear, not a mystery.
            </h2>
          </div>
          <div>
            <p className="text-base leading-7 text-[#d0daea]">
              Treehouse encrypts documents and photos on your device before
              cloud backup. Key handling depends on your sign-in method; our
              privacy information explains the details and the choices
              available to you.
            </p>
            <Link
              href="/privacy"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
            >
              Read the Treehouse Privacy Policy{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
