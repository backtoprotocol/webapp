"use client";

import Link from "next/link";
import { useRef } from "react";
import { getSleepProtocolEntryHref } from "@/lib/sleep-protocol";

type OfferCarouselItem = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  gradient: string;
};

type ProtocolOfferCarouselProps = {
  title: string;
  items: OfferCarouselItem[];
};

export function ProtocolOfferCarousel({
  title,
  items,
}: ProtocolOfferCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const slide = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-offer-card]");
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 16;
    const delta = direction === "right" ? cardWidth + gap : -(cardWidth + gap);
    track.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="border-b border-slate-200 bg-white py-10 text-slate-950 sm:py-14">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-6 sm:px-8 lg:px-10">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-700">Protocol stack</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => slide("left")}
            aria-label={`Show previous items for ${title}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => slide("right")}
            aria-label={`Show next items for ${title}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="relative mt-7">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pl-5 pr-8 [scroll-padding-left:1.25rem] [scrollbar-width:none] sm:pl-7 sm:pr-12 sm:[scroll-padding-left:1.75rem] lg:pl-[max(2.25rem,calc((100vw-80rem)/2+2.25rem))] lg:pr-16 lg:[scroll-padding-left:max(2.25rem,calc((100vw-80rem)/2+2.25rem))] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, index) => (
            <Link
              key={`${title}-${item.slug}-${item.name}-${index}`}
              href={getSleepProtocolEntryHref(item.slug)}
              data-offer-card
              className={`group relative h-[22rem] w-[17rem] shrink-0 snap-start snap-always overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${item.gradient} p-5 text-white shadow-[0_24px_55px_-35px_rgba(8,145,178,0.8)] sm:h-[24rem] sm:w-[19rem]`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(110,231,255,0.18),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(74,222,128,0.2),transparent_35%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/85">{item.tag}</p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight">{item.name}</h3>
                </div>

                <div>
                  <p className="text-sm leading-7 text-cyan-50/95">{item.blurb}</p>
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
    </section>
  );
}
