import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Back to Protocol",
  description:
    "Premium psychology and human performance for recovery, resilience, and rebuild.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-100 text-slate-950">
        <SiteHeader />
        {children}
        <footer className="border-t border-slate-200/70 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-slate-600 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-950">Back to Protocol</p>
              <p className="mt-2 max-w-xl leading-7">
                Evidence-led recovery frameworks for people rebuilding stability, confidence, and sustainable momentum.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:items-end">
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: "YouTube", href: "https://youtube.com", icon: "YT" },
                  { label: "Instagram", href: "https://instagram.com", icon: "IG" },
                  { label: "X", href: "https://x.com", icon: "X" },
                  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/terms" className="transition hover:text-slate-950">Terms</Link>
                <Link href="/privacy" className="transition hover:text-slate-950">Privacy</Link>
                <Link href="/cookies" className="transition hover:text-slate-950">Cookies</Link>
                <Link href="/accessibility" className="transition hover:text-slate-950">Accessibility</Link>
                <Link href="/about" className="transition hover:text-slate-950">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
