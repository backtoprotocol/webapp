"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { LogoMark } from "@/components/logo-mark";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.8-.1-1.8-.2-3-.2-3 0-5.1 1.8-5.1 5.2v1.5H5.8v3.2h2.9V22h4.8Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M18.9 3H22l-6.8 7.8L23 21h-6.3l-4.9-6.1L6.4 21H3.2l7.4-8.5L1 3h6.5l4.4 5.5L18.9 3Zm-1.1 16.1h1.7L6.6 4.8H4.8l13 14.3Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 2.5A5.3 5.3 0 1 1 6.7 12 5.3 5.3 0 0 1 12 6.7Zm0 2.1A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8Zm5.8-3.6a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.7 12 4.7 12 4.7s-5.7 0-7.5.4a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.4 7.5.4 7.5.4s5.7 0 7.5-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.8l1.5-6.1s-.4-.8-.4-1.9c0-1.8 1-3.1 2.2-3.1 1 0 1.5.8 1.5 1.7 0 1-.7 2.5-1 3.9-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.9-2.3 3.9-5.7 0-3-2.1-5.1-5.2-5.1-3.6 0-5.7 2.7-5.7 5.6 0 1 .4 2.1.9 2.7.1.1.1.3.1.4l-.4 1.6c-.1.5-.3.6-.7.4-1.2-.6-2-2.6-2-4.2 0-3.4 2.5-6.5 7.2-6.5 3.8 0 6.8 2.7 6.8 6.3 0 3.8-2.4 6.9-5.8 6.9-1.1 0-2.1-.6-2.5-1.3l-.7 2.7c-.3 1-.9 2.2-1.3 2.9A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

const footerLinks = [
  {
    title: "SERVICES",
    links: [
      { label: "Free technology checkup", href: "/technology-checkup/assessment" },
      { label: "Hardware", href: "/hardware" },
      { label: "Software", href: "/software" },
      { label: "Business IT", href: "/services#business-it" },
      { label: "Websites", href: "/services#websites" },
      { label: "Tech support", href: "/support" },
    ],
  },
  {
    title: "BACK TO PROTOCOL",
    links: [
      { label: "Protocol+ membership", href: "/protocol-plus" },
      { label: "About", href: "/about" },
      { label: "Request help", href: "/support" },
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YouTubeIcon },
  { label: "Pinterest", href: "https://pinterest.com", icon: PinterestIcon },
];

export function LayoutShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      {children}
      <footer className="border-t border-slate-200 bg-[#f7f6f4]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-slate-900 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.75fr_0.75fr] lg:gap-16">
            <div>
              <LogoMark className="h-10 w-10" />
              <h2 className="mt-10 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Your technology person, without the full-time IT department.
              </h2>
            </div>

            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-900">
                  {group.title}
                </p>
                <div className="space-y-4 text-base text-slate-900">
                  {group.links.map((link) => (
                    <Link key={link.label} href={link.href} className="block transition hover:text-slate-600">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-slate-200 pt-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-900">
                <span>©2026 Back to Protocol</span>
                <Link href="/privacy" className="transition hover:text-slate-600">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="transition hover:text-slate-600">
                  Terms
                </Link>
                <Link href="/accessibility" className="transition hover:text-slate-600">
                  Accessibility
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-4 text-slate-900">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.label}
                        className="transition hover:text-slate-500"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}