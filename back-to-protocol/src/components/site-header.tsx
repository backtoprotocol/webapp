"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";

const mainNavItems = [
  { href: "/services", label: "Services" },
  { href: "/hardware", label: "Hardware" },
  { href: "/software", label: "Software" },
  { href: "/protocol-plus", label: "Protocol+" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <span className="hidden font-semibold text-white sm:inline">Back to Protocol</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
          {mainNavItems.map((item) => (
            <Link key={item.href} href={item.href} className={`text-sm font-medium transition hover:text-[#9dd9b7] ${pathname === item.href ? "text-[#9dd9b7]" : "text-white/80"}`}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 text-sm text-white lg:flex">
          <Link href="/technology-checkup/assessment" className="inline-flex min-h-10 items-center gap-2 bg-[#9dd9b7] px-4 font-semibold text-[#17211b] transition hover:bg-[#b7e8ca]">
            Free checkup <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex rounded-lg border border-white/20 p-2 text-white lg:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-white/10 bg-[#0b1220] px-4 py-4 text-sm text-white lg:hidden">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="block border-b border-white/10 px-2 py-3 font-medium">
                {item.label}
              </Link>
            ))}
            <Link href="/technology-checkup/assessment" onClick={() => setIsMenuOpen(false)} className="mt-3 flex min-h-11 items-center justify-between bg-[#9dd9b7] px-4 font-semibold text-[#17211b]">
              Free technology checkup <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
