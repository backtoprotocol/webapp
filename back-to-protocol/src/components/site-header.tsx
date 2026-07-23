"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/protocol", label: "Protocol" },
  { href: "/podcast", label: "Podcast" },
  { href: "/games", label: "Games" },
  { href: "/articles", label: "Articles" },
  { href: "/news", label: "News" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950"
        >
          <Image
            src="/back-to-protocol-logo.png"
            alt=""
            width={48}
            height={48}
            priority
            className="h-11 w-11 object-contain"
          />
          <span>Back to Protocol</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition ${isActive ? "text-slate-950" : "text-slate-600 hover:text-slate-950"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/subscribe"
            className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-950 transition hover:border-slate-300 hover:bg-slate-100 sm:inline-flex"
          >
            Subscribe
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div id="mobile-nav" className="border-t border-slate-200/70 bg-white/95 px-4 pb-4 pt-2 md:hidden">
          <div className="space-y-2 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-2xl px-3 py-2 text-sm font-medium ${isActive ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-white hover:text-slate-950"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/subscribe" className="block rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-slate-950">
              Subscribe
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
