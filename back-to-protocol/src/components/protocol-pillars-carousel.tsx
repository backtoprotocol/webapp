"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Pillar = {
  name: string;
  definition: string;
  focus: string;
};

const cardThemes = [
  "from-slate-950 via-cyan-950 to-cyan-900",
  "from-emerald-950 via-teal-900 to-cyan-900",
  "from-sky-950 via-cyan-900 to-blue-900",
  "from-teal-950 via-emerald-900 to-cyan-900",
  "from-cyan-950 via-slate-900 to-slate-950",
  "from-slate-900 via-teal-900 to-emerald-900",
  "from-emerald-900 via-cyan-900 to-slate-900",
  "from-cyan-900 via-sky-900 to-slate-900",
];

export function ProtocolPillarsCarousel({ pillars }: { pillars: readonly Pillar[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Always start from the true first position so card 1 lines up with the header gutter.
    track.scrollLeft = 0;
  }, []);

  const slide = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-pillars-card]");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 16;
    const delta = direction === "right" ? cardWidth + gap : -(cardWidth + gap);
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section data-reveal className="scroll-reveal reveal-delay-2 overflow-hidden border-y border-white bg-white py-10 sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-700">Protocols</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Get to know every protocol.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            Browse all {pillars.length} protocol pillars and move through them with the arrows.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => slide("left")}
            aria-label="Show previous protocol"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200 bg-white text-slate-700 transition hover:border-cyan-300 hover:text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => slide("right")}
            aria-label="Show next protocol"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200 bg-white text-slate-700 transition hover:border-cyan-300 hover:text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative mt-7">
        <div className="w-full">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pl-5 pr-8 [scroll-padding-left:1.25rem] [scrollbar-width:none] sm:pl-7 sm:pr-12 sm:[scroll-padding-left:1.75rem] lg:pl-[max(2.25rem,calc((100vw-80rem)/2+2.25rem))] lg:pr-16 lg:[scroll-padding-left:max(2.25rem,calc((100vw-80rem)/2+2.25rem))] [&::-webkit-scrollbar]:hidden"
          >
            {pillars.map((pillar, index) => (
              <Link
                key={pillar.name}
                href="/protocol"
                data-pillars-card
                className={`group relative h-[24rem] w-[18rem] shrink-0 snap-start snap-always overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${cardThemes[index % cardThemes.length]} p-5 text-white shadow-[0_24px_55px_-35px_rgba(8,145,178,0.8)] sm:h-[26rem] sm:w-[20rem]`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(110,231,255,0.18),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(74,222,128,0.2),transparent_35%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/85">Protocol {index + 1}</p>
                    <h3 className="mt-3 text-3xl font-semibold leading-tight">{pillar.name}</h3>
                  </div>

                  <div>
                    <p className="text-base leading-7 text-cyan-50/95">{pillar.focus}</p>
                    <p className="mt-3 text-sm leading-6 text-cyan-100/75">{pillar.definition}</p>
                    <span className="mt-5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition group-hover:bg-white/30">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            <div className="h-px w-1 shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
