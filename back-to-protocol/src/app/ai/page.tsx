import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import type { Metadata } from "next";
import { APP_STORE_URL } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Treehouse Document Scanning | On-device text recognition",
  description:
    "Learn how Treehouse uses on-device text recognition to help organize documents while keeping you in control.",
  alternates: { canonical: "/ai" },
  openGraph: {
    title: "Document scanning in Treehouse",
    description:
      "Treehouse uses on-device text recognition to help with document scans and keeps you in control of what you save and share.",
    type: "website",
  },
};

export default function AiPage() {
  return (
    <main className="bg-white text-[#28364b]">
      <section className="border-b border-[#e5ebf3] bg-gradient-to-br from-[#f3f9ff] via-white to-[#edf6ff]">
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold text-[#1769c2]">
            On-device text recognition
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl">
            A little help organizing what matters.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5b687a]">
            Treehouse uses on-device text recognition to help scan documents
            and organize the details you choose to save. It’s a focused tool
            for everyday organization—not a replacement for your judgment or
            professional advice.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1120px] gap-6 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-2 lg:px-10">
        <article className="rounded-2xl border border-[#e5ebf3] bg-white p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1977cf]">
            <FileSearch aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">
            Text recognition on your device
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#69778b]">
            When you scan a document, Treehouse can use on-device text
            recognition to help make its contents easier to organize and
            search. The recognition happens on your device.
          </p>
        </article>
        <article className="rounded-2xl border border-[#e5ebf3] bg-white p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1977cf]">
            <UserRound aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">You stay in control</h2>
          <p className="mt-2 text-sm leading-6 text-[#69778b]">
            You choose what to add to Treehouse and when to share a saved item.
            Text recognition is there to support document organization, not to
            make personal decisions for you.
          </p>
        </article>
        <article className="rounded-2xl border border-[#e5ebf3] bg-white p-7">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1977cf]">
            <LockKeyhole aria-hidden="true" className="h-5 w-5" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">Know how information works</h2>
          <p className="mt-2 text-sm leading-6 text-[#69778b]">
            Documents and photos are encrypted on your device before cloud
            backup. Encryption-key handling varies by sign-in method. Our{" "}
            <Link
              href="/privacy"
              className="font-semibold text-[#1769c2] underline underline-offset-2"
            >
              Privacy Policy
            </Link>{" "}
            explains what is handled and the differences by sign-in method.
          </p>
        </article>
      </section>

      <section className="border-t border-[#e5ebf3] bg-[#f7fbff]">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-5 px-5 py-12 sm:px-8 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              Explore the everyday tools in Treehouse.
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#69778b]">
              See how scanning, search, and thoughtful organization work
              together.
            </p>
          </div>
          <a
            href={APP_STORE_URL}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-6 font-semibold text-white transition hover:bg-[#1765cc]"
          >
            Explore Treehouse <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
