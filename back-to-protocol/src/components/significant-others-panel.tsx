"use client";

import { useState } from "react";

type Connection = {
  title: string;
  description: string;
};

export function SignificantOthersPanel({ items }: { items: readonly Connection[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div data-reveal className="scroll-reveal reveal-delay-3 mt-5 overflow-hidden rounded-[2.3rem] border border-slate-200 bg-white p-7 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.38)] sm:p-9 lg:p-12">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="order-1 min-w-0">
          {items.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <section key={item.title} className="border-b border-slate-200 py-6 first:pt-0 last:border-b-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isOpen}
                  aria-controls={`significant-panel-${index}`}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-[2.1rem] font-semibold leading-tight text-slate-900 sm:text-[2.45rem]">
                    {item.title}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-6 w-6 shrink-0 text-slate-500 transition ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />
                  </svg>
                </button>

                {isOpen ? (
                  <div id={`significant-panel-${index}`} className="mt-4">
                    <p className="text-lg leading-9 text-slate-600">{item.description}</p>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

        <div className="order-2 relative min-h-[420px] min-w-0 sm:min-h-[500px]">
          <div className="absolute bottom-0 left-0 z-20 w-[40%] overflow-hidden rounded-[2.2rem] border border-slate-200 bg-slate-950 p-2 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.55)]">
            <div className="h-[340px] w-full rounded-[1.7rem] bg-gradient-to-b from-cyan-300 via-sky-400 to-teal-500 sm:h-[390px]">
              <div className="flex h-full items-end p-4">
                <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  Mobile
                </span>
              </div>
            </div>
          </div>

          <div className="ml-auto w-[84%] overflow-hidden rounded-[2.6rem] border border-slate-200 bg-white p-3 shadow-[0_26px_70px_-40px_rgba(15,23,42,0.45)]">
            <div className="h-[420px] w-full rounded-[1.85rem] border border-slate-100 bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-100 sm:h-[500px]">
              <div className="flex h-full items-center justify-center">
                <span className="rounded-2xl border border-white/80 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                  Gradient placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
