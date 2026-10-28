"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { APP_STORE_URL } from "@/lib/site-links";

const mainNavItems = [
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/ai", label: "AI" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const homeAnchor = (href: string) =>
    pathname === "/" && href.startsWith("/#") ? href.slice(1) : href;
  const contactHref = "/support";

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5ebf3] bg-white/95 text-[#28364b] shadow-[0_4px_18px_-16px_rgba(27,58,87,0.5)] backdrop-blur-xl">
      <div className="mx-auto flex min-h-[64px] max-w-[1240px] items-center justify-between gap-5 px-4 sm:px-8 lg:px-10">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            aria-label="Treehouse by Back to Protocol home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
              <Image
                src="/treehouse-logo.png"
                alt=""
                width={36}
                height={36}
                loading="eager"
                unoptimized
                className="h-9 w-9 object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block text-[15px] font-bold tracking-[-0.03em]">
                Treehouse
              </span>
              <span className="mt-0.5 block text-[10px] font-medium text-[#8994a4]">
                by Back to Protocol
              </span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 lg:flex"
          >
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={homeAnchor(item.href)}
                className="whitespace-nowrap text-[13px] font-medium text-[#5b687a] transition hover:text-[#1977cf]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={contactHref}
            className="hidden min-h-10 items-center justify-center rounded-full border border-[#d6e0ed] bg-white px-5 text-xs font-semibold text-[#1769c2] transition hover:border-[#94b6df] hover:bg-[#f8fbff] sm:inline-flex"
          >
            Contact us
          </a>
          <a
            href={APP_STORE_URL}
            className="hidden min-h-10 items-center justify-center rounded-full bg-[#1a73e8] px-5 text-xs font-semibold text-white transition hover:bg-[#1765cc] sm:inline-flex"
          >
            Get started
          </a>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e8f1] text-[#41516a] transition hover:bg-[#f1f6fc] lg:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#49bce8] to-[#0870ed] px-4 py-2 text-center text-xs text-white sm:px-6">
        <span>Your essentials, together.</span>{" "}
        <a
          href={APP_STORE_URL}
          className="ml-1 inline-flex items-center gap-1 font-semibold underline decoration-white/60 underline-offset-2 transition hover:decoration-white"
        >
          Explore Treehouse
          <ArrowRight aria-hidden="true" className="h-3 w-3" />
        </a>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-[#edf1f7] bg-white px-4 pb-5 pt-2 shadow-lg lg:hidden"
        >
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={homeAnchor(item.href)}
              onClick={() => setIsMenuOpen(false)}
              className="block border-b border-[#edf1f7] px-2 py-3.5 text-sm font-medium text-[#526178] transition hover:text-[#1977cf]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={contactHref}
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#d6e0ed] bg-white px-5 text-sm font-semibold text-[#1769c2] transition hover:bg-[#f8fbff]"
          >
            Contact us
          </a>
          <a
            href={APP_STORE_URL}
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#1a73e8] px-5 text-sm font-semibold text-white transition hover:bg-[#1765cc]"
          >
            Get started
          </a>
        </nav>
      ) : null}
    </header>
  );
}
