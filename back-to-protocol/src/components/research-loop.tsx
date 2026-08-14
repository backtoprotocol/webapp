"use client";

import Link from "next/link";
import { useRef } from "react";

type LoopCard = {
  author: string;
  title: string;
  date: string;
  accent: string;
  slug: string;
};

export function ResearchLoop({ cards }: { cards: LoopCard[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLoop = (direction: "left" | "right") => {
    if (!trackRef.current) return;

    const amount = 320;
    trackRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-slate-950">In the Loop</h2>
          <p className="mt-2 text-base text-slate-600">Swipe through updates from coaches, creators, and the Protocol+ team.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollLoop("left")}
            aria-label="Show previous story"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollLoop("right")}
            aria-label="Show next story"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <Link
            href="/news?q=protocol%20updates"
            className="ml-1 rounded-full bg-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-300"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="relative mt-6 mr-[calc(50%-50vw)]">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pr-6 [scrollbar-width:none] sm:pr-8 lg:pr-10 [&::-webkit-scrollbar]:hidden"
        >
          {cards.map((card) => {
            const cardContent = (
              <article
                key={card.title}
                data-loop-card
                className="relative w-[280px] shrink-0 snap-start overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white text-slate-950 shadow-[0_25px_65px_-45px_rgba(15,23,42,0.3)]"
              >
                <div className={`h-[350px] bg-gradient-to-br ${card.accent}`} />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-xs font-semibold text-slate-500">{card.author}</p>
                  <p className="mt-2 text-xl font-semibold leading-tight text-slate-900">{card.title}</p>
                  <p className="mt-4 text-sm font-medium text-slate-500">{card.date}</p>
                </div>
              </article>
            );

            if (card.slug) {
              return (
                <Link key={card.title} href={`/news/${card.slug}`} className="block">
                  {cardContent}
                </Link>
              );
            }

            return <div key={card.title}>{cardContent}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
