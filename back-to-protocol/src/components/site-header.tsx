"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/protocol", label: "Protocol" },
  { href: "/podcast", label: "Podcast" },
  { href: "/games", label: "Games" },
  { href: "/news", label: "News" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isMovementPage = pathname === "/protocol/movement";
  const isMovementScrolled = isMovementPage && scrollProgress > 0.08;
  const ctaLabel = isMovementPage && scrollProgress > 0.35 ? "Join Movement+ for free" : "Subscribe";

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const next = Math.min(1, Math.max(0, window.scrollY / 260));
      setScrollProgress(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const motion = isMovementPage ? scrollProgress : 0;
  const navOpacity = 1 - motion;
  const navTranslate = -8 * motion;
  const headerBgOpacity = 0.8 + 0.15 * motion;
  const headerBorderOpacity = 0.6 + 0.2 * motion;
  const headerShadowOpacity = 0.35 * motion;
  const verticalPadding = 16 - 4 * motion;

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ease-out"
      style={{
        borderColor: `rgba(148, 163, 184, ${headerBorderOpacity})`,
        backgroundColor: `rgba(255, 255, 255, ${headerBgOpacity})`,
        boxShadow: `0 10px 30px -20px rgba(15, 23, 42, ${headerShadowOpacity})`,
      }}
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 ease-out sm:px-6"
        style={{ paddingTop: `${verticalPadding}px`, paddingBottom: `${verticalPadding}px` }}
      >
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-950">
          Back to Protocol
        </Link>

        <nav
          className="hidden items-center gap-8 transition-all duration-500 ease-out md:flex"
          style={{
            opacity: navOpacity,
            transform: `translateY(${navTranslate}px)`,
            width: isMovementPage && navOpacity < 0.02 ? "0px" : "auto",
            overflow: isMovementPage ? "hidden" : "visible",
            pointerEvents: isMovementPage && navOpacity < 0.2 ? "none" : "auto",
          }}
        >
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
            {ctaLabel}
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
              {ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
