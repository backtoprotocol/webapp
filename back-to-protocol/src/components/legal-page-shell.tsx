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
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="relative overflow-hidden border-b border-[#17211b]/10">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#f6f7f2_0%,#f6f7f2_56%,#dff3e7_56%,#dff3e7_100%)] max-lg:hidden" />
        <div className="relative mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-[#17211b]/15 bg-white px-3 py-2 text-xs font-bold uppercase text-[#355244]">
            {eyebrow}
          </div>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4c5c52]">{description}</p>
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-[#607067]">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          <nav className="hidden lg:block">
            <div className="sticky top-28 border border-[#17211b]/15 bg-white p-6">
              <p className="text-xs font-bold uppercase text-[#1f7a4d]">On this page</p>
              <ul className="mt-4 space-y-3 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-[#4c5c52] transition hover:text-[#17211b]">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="space-y-14">
            {sections.map((section, index) => (
              <article key={section.id} id={section.id} className="scroll-mt-28 border-b border-[#17211b]/10 pb-12 last:border-b-0 last:pb-0">
                <p className="text-xs font-bold text-[#1f7a4d]">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{section.title}</h2>
                <div className="mt-5 space-y-4 leading-8 text-[#3f4c44]">{section.content}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#17211b] text-white">
        <div className="mx-auto grid max-w-[1480px] items-center gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-16">
          <div>
            <p className="text-xs font-bold uppercase text-[#9dd9b7]">Questions about this policy?</p>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
              Reach out and we will get back to you directly.
            </h2>
          </div>
          <Link href="/support" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9dd9b7] px-6 font-semibold text-[#17211b] transition hover:bg-[#b7e8ca]">
            Contact us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
