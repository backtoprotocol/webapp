import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CircleHelp,
  LockKeyhole,
  MessageCircle,
  ScanLine,
} from "lucide-react";
import type { Metadata } from "next";
import { APP_STORE_URL } from "@/lib/site-links";

export const metadata: Metadata = {
  title: "Treehouse Resources | Help and answers",
  description:
    "Find Treehouse FAQs, product details, support, privacy information, and account guidance.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Treehouse help and resources",
    description:
      "Answers, product information, privacy details, and support for Treehouse.",
    type: "website",
  },
};

const resources = [
  {
    icon: CircleHelp,
    title: "Answers to common questions",
    description:
      "Learn what Treehouse is for, what you can keep in it, and how to get help.",
    label: "Read the FAQs",
    href: "/#faq",
  },
  {
    icon: MessageCircle,
    title: "Support from our team",
    description:
      "Get help with getting started, your account, or keeping your essentials organized.",
    label: "Visit Treehouse support",
    href: "/support",
  },
  {
    icon: LockKeyhole,
    title: "Privacy and your information",
    description:
      "Read how Treehouse handles documents, sign-in, cloud backup, and account deletion.",
    label: "Read the Privacy Policy",
    href: "/privacy",
  },
  {
    icon: ScanLine,
    title: "Scanning and organizing",
    description:
      "Explore the app’s document scanning, on-device text recognition, search, and everyday organization tools.",
    label: "Explore Treehouse",
    href: APP_STORE_URL,
  },
  {
    icon: BookOpenText,
    title: "The story behind Treehouse",
    description:
      "Meet Back to Protocol, the company creating Treehouse and other thoughtful technology.",
    label: "About Back to Protocol",
    href: "/about",
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-white text-[#28364b]">
      <section className="border-b border-[#e5ebf3] bg-gradient-to-br from-[#f3f9ff] via-white to-[#edf6ff]">
        <div className="mx-auto max-w-[1120px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
          <p className="text-sm font-semibold text-[#1769c2]">
            Help for your Treehouse essentials
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl">
            Find your way around Treehouse.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5b687a]">
            Get to know the app, understand how your information is handled,
            and find help from the Treehouse team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-5 sm:grid-cols-2">
          {resources.map(({ icon: Icon, title, description, label, href }) => (
            <article
              key={title}
              className="rounded-2xl border border-[#e5ebf3] bg-white p-6 shadow-[0_8px_28px_-24px_rgba(27,58,87,0.5)] sm:p-7"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#1977cf]">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#69778b]">
                {description}
              </p>
              <Link
                href={href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1769c2] transition hover:text-[#124f97]"
              >
                {label} <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#e5ebf3] bg-[#f7fbff]">
        <div className="mx-auto grid max-w-[1120px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
              Treehouse FAQs
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247]">
              A few useful things to know.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#748094]">
              Looking for something else? Our support team can help.
            </p>
            <Link
              href="/support"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1769c2] hover:text-[#124f97]"
            >
              Contact support <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="border-t border-[#e2eaf3]">
            <details className="group border-b border-[#e2eaf3]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold [&::-webkit-details-marker]:hidden">
                What can I keep in Treehouse?
                <span aria-hidden="true" className="text-[#1977cf]">+</span>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-6 text-[#69778b]">
                Treehouse helps you organize documents, scanned copies, cards,
                account details, insurance information, notes, and important
                dates.
              </p>
            </details>
            <details className="group border-b border-[#e2eaf3]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold [&::-webkit-details-marker]:hidden">
                How does document scanning work?
                <span aria-hidden="true" className="text-[#1977cf]">+</span>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-6 text-[#69778b]">
                Treehouse can use on-device text recognition when scanning
                documents. See the{" "}
                <Link
                  href="/ai"
                  className="font-semibold text-[#1769c2] underline underline-offset-2"
                >
                  technology and text recognition page
                </Link>{" "}
                for details.
              </p>
            </details>
            <details className="group border-b border-[#e2eaf3]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold [&::-webkit-details-marker]:hidden">
                How is my information protected?
                <span aria-hidden="true" className="text-[#1977cf]">+</span>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-6 text-[#69778b]">
                Documents and photos are encrypted on your device before cloud
                backup. Encryption-key handling depends on your sign-in method.
                Read the{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#1769c2] underline underline-offset-2"
                >
                  Privacy Policy
                </Link>{" "}
                for the full explanation.
              </p>
            </details>
            <details className="group border-b border-[#e2eaf3]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold [&::-webkit-details-marker]:hidden">
                How do I delete my account?
                <span aria-hidden="true" className="text-[#1977cf]">+</span>
              </summary>
              <p className="max-w-2xl pb-5 text-sm leading-6 text-[#69778b]">
                Account deletion and cloud backup removal are available from
                the app’s Settings. Review the{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-[#1769c2] underline underline-offset-2"
                >
                  Privacy Policy
                </Link>{" "}
                for related details.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
