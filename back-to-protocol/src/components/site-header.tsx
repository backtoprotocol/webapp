"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogoMark } from "@/components/logo-mark";

const mainNavItems = [
  { href: "/about", label: "About" },
  { href: "/protocol", label: "Protocol" },
  { href: "/research", label: "Research" },
  { href: "/podcast", label: "Podcast" },
  { href: "/news", label: "News" },
];

const categoryNavItems = [
  { label: "Laptops", href: "/search?q=laptop" },
  { label: "Desktops", href: "/search?q=desktop" },
  { label: "Peripherals", href: "/search?q=accessories" },
  { label: "Software", href: "/search?q=software" },
  { label: "Shop", href: "/search" },
  { label: "Deals", href: "/search" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const evaluateScroll = () => {
      ticking = false;
      // wide hysteresis gap (well past the ~70px the header shrinks by) stops the collapse from re-triggering itself
      setIsScrolled((current) => {
        if (current) {
          return window.scrollY > 20;
        }
        return window.scrollY > 96;
      });
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(evaluateScroll);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <header
      className={`sticky top-0 z-50 w-full text-white transition-all duration-500 ${ease} [overflow-anchor:none] ${
        isScrolled
          ? "border-b border-white/15 bg-[#0b1220]/85 shadow-[0_12px_30px_rgba(2,6,23,0.45)] backdrop-blur-xl"
          : "border-b border-white/10 bg-[#0b1220] shadow-[0_4px_16px_rgba(11,22,55,0.18)]"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1480px] items-center gap-4 px-4 transition-all duration-500 ${ease} sm:px-6 lg:px-8 ${
          isScrolled ? "py-2" : "py-3"
        }`}
      >
        <Link href="/" aria-label="Back to Protocol home" className="flex shrink-0 items-center gap-3">
          <LogoMark
            className={`origin-left transition-all duration-500 ${ease} ${isScrolled ? "h-7 w-7 sm:h-8 sm:w-8" : "h-9 w-9 sm:h-10 sm:w-10"}`}
          />
          <span
            className={`hidden origin-left font-semibold tracking-tight text-white transition-all duration-500 ${ease} sm:inline ${
              isScrolled ? "text-lg" : "text-xl"
            }`}
          >
            Protocol+
          </span>
        </Link>

        <div className="flex flex-1 justify-center">
          <form onSubmit={handleSearch} className="relative w-full max-w-[960px]">
            <input
              aria-label="Search technology and protocols"
              placeholder="Search Protocol tech"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={`w-full rounded-xl border border-white/15 bg-white px-5 pr-14 text-base text-slate-900 placeholder:text-slate-500 shadow-inner outline-none ring-0 transition-all duration-500 ${ease} ${
                isScrolled ? "h-10" : "h-12"
              }`}
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-slate-500 transition hover:text-slate-900"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="6" />
                <path strokeLinecap="round" d="M16 16l4 4" />
              </svg>
            </button>
          </form>
        </div>

        <div className="hidden items-center gap-5 text-sm text-white lg:flex">
          <Link href="/account" className="flex items-center gap-2 whitespace-nowrap font-medium hover:text-cyan-100">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.25a7.5 7.5 0 0 1 15 0" />
            </svg>
            <span>Account</span>
          </Link>

          <Link href="/sign-in" className="flex items-center gap-2 whitespace-nowrap font-medium hover:text-cyan-100">
            <span>Sign in</span>
          </Link>

          <Link href="/protocol-plus" className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white transition hover:bg-white/15">
            Get the app
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex rounded-lg border border-white/20 p-2 text-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      <div
        className={`grid border-white/10 bg-black/25 transition-[grid-template-rows,opacity] duration-500 ${ease} ${
          isScrolled ? "grid-rows-[0fr] border-t-0 opacity-0" : "grid-rows-[1fr] border-t opacity-100"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="mx-auto flex max-w-[1480px] items-center justify-between gap-3 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-white">
              {categoryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex items-center whitespace-nowrap rounded-full border border-white/15 px-3 py-2 transition hover:border-white/30 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-4 whitespace-nowrap text-sm text-white/90 xl:flex">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`whitespace-nowrap transition hover:text-white ${isActive ? "text-white" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-white/10 bg-black/30 px-4 py-3 text-sm text-white lg:hidden">
          <div className="space-y-2">
            {categoryNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 text-white/85">
              {mainNavItems.map((item) => (
                <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 hover:bg-white/5">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
