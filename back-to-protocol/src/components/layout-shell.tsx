import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { HomeBrandLink } from "@/components/home-brand-link";
import {
  PrivacyChoices,
  PrivacyChoicesLink,
} from "@/components/privacy-choices";

const footerLinks = [
  {
    title: "TREEHOUSE",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Products", href: "/products" },
      { label: "AI and your information", href: "/ai" },
      { label: "Pricing", href: "/pricing" },
      { label: "Resources", href: "/resources" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "BACK TO PROTOCOL",
    links: [{ label: "About the company", href: "/about" }],
  },
];

const legalLinks = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
];

export function LayoutShell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      {children}
      <PrivacyChoices />
      <footer className="border-t border-[#e5eaf1] bg-white">
        <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.9fr] lg:gap-16">
            <div>
              <HomeBrandLink className="inline-flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <Image
                    src="/treehouse-logo.png"
                    alt=""
                    width={40}
                    height={40}
                    loading="eager"
                    unoptimized
                    className="h-10 w-10 object-contain"
                  />
                </span>
                <span>
                  <span className="block text-sm font-bold tracking-tight text-[#2b3a50]">
                    Treehouse
                  </span>
                  <span className="mt-0.5 block text-[11px] text-[#7b8798]">
                    by Back to Protocol
                  </span>
                </span>
              </HomeBrandLink>
              <p className="mt-5 max-w-sm text-sm font-semibold leading-6 text-[#526178]">
                Your essentials, together.
              </p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#748094]">
                Treehouse is Back to Protocol’s app for keeping the details
                that matter organized and close at hand.
              </p>
            </div>

            {footerLinks.map((group) => (
              <div key={group.title}>
                <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#596981]">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#748094] transition hover:text-[#2878ce]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-[#e9edf3] pt-5 text-xs text-[#7b8798] sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Back to Protocol. Treehouse is our app.</p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-[#2878ce]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <PrivacyChoicesLink />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
