import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPageShell({ eyebrow, title, description, lastUpdated, sections }: LegalPageShellProps) {
  return (
    <main className="bg-[#f8fbff] text-[#1d2939]">
      <section className="relative overflow-hidden border-b border-[#dce7f5]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_15%,rgba(75,160,239,0.18),transparent_36%),linear-gradient(115deg,#fff_0%,#fff_56%,#edf5ff_56%,#edf5ff_100%)] max-lg:bg-[radial-gradient(ellipse_at_90%_15%,rgba(75,160,239,0.14),transparent_42%),linear-gradient(180deg,#fff_0%,#f4f8ff_100%)]" />
        <div className="relative mx-auto max-w-[1120px] px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d5e5f7] bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#2869b2] shadow-sm">
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.055em] text-[#1f2d42] sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#607087] sm:text-lg sm:leading-8">{description}</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#718198]">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1120px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-16">
          <nav className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-[#dce7f5] bg-white p-6 shadow-[0_12px_35px_-28px_rgba(27,76,135,0.45)]">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#2869b2]">On this page</p>
              <ul className="mt-4 space-y-3 text-sm leading-5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-[#63738a] transition hover:text-[#1769c2] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769c2]">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} className="scroll-mt-28 border-b border-[#dce5f0] pb-10 last:border-b-0 last:pb-0">
                <p className="text-xs font-bold tracking-[0.12em] text-[#2876c8]">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em] text-[#26364c] sm:text-3xl">{section.title}</h2>
                <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#53647a] [&_a]:font-semibold [&_a]:text-[#1769c2] [&_a]:underline [&_a]:decoration-[#9dc4ef] [&_a]:decoration-2 [&_a]:underline-offset-4 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-[#34465d]">{section.content}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#102b50] text-white">
        <div className="mx-auto grid max-w-[1120px] items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10 lg:py-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8fc9ff]">Questions about this policy?</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
              Contact our team about this policy.
            </h2>
          </div>
          <Link href="mailto:support@backtoprotocol.com?subject=Back%20to%20Protocol%20policy%20question" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-6 text-sm font-semibold text-white transition hover:bg-[#3186ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
