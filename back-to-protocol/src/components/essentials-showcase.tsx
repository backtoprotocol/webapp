"use client";

import { useState } from "react";
import {
  CalendarDays,
  CreditCard,
  FileText,
  HeartPulse,
  IdCard,
  ScanLine,
  Share2,
} from "lucide-react";

const benefits = [
  {
    title: "Everything in one place",
    description:
      "Keep documents, insurance details, accounts, and notes together.",
  },
  {
    title: "Ready when you need it",
    description:
      "Find the details you need without searching through drawers and folders.",
  },
  {
    title: "Your details stay yours",
    description:
      "Use device security and choose when you share a saved item.",
  },
];

const items = [
  {
    icon: IdCard,
    title: "Personal records",
    description: "Keep the personal details you rely on close at hand.",
  },
  {
    icon: FileText,
    title: "Documents",
    description: "Save important paperwork and scanned copies.",
  },
  {
    icon: HeartPulse,
    title: "Insurance",
    description: "Find your insurance information when you need it.",
  },
  {
    icon: CreditCard,
    title: "Cards & accounts",
    description: "Keep everyday card and account details together.",
  },
  {
    icon: CalendarDays,
    title: "Important dates",
    description: "Keep track of renewals and the dates that matter.",
  },
  {
    icon: Share2,
    title: "Sharing",
    description: "Choose when to share a saved card or document.",
  },
  {
    icon: ScanLine,
    title: "Scanned copies",
    description: "Add a digital copy of a document to Treehouse.",
  },
];

export function EssentialsShowcase() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <section
      id="features"
      className="scroll-mt-24 bg-[linear-gradient(110deg,#fff8fb_0%,#fff_29%,#fff_70%,#f3f8ff_100%)] px-5 pb-20 pt-14 sm:px-8 sm:pb-24 sm:pt-16 lg:px-10 lg:pt-20"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-[650px] text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
            What you can keep in Treehouse
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl">
            Your essentials, together.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#748094] sm:text-lg">
            Hover over an item to see how Treehouse keeps life’s details close.
          </p>
        </div>

        <div className="mt-10 grid gap-8 text-center sm:grid-cols-3 sm:gap-6 lg:mt-12">
          {benefits.map(({ title, description }) => (
            <article key={title} className="mx-auto max-w-[300px]">
              <h3 className="text-lg font-semibold tracking-tight text-[#2c3a50]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#707c8f]">
                {description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-semibold text-[#343f50]">
            Treehouse keeps:
          </p>
          <div className="mx-auto mt-3 grid min-h-[190px] max-w-[1050px] grid-cols-3 content-start justify-items-center gap-x-1 gap-y-3 sm:grid-cols-4 sm:gap-x-3 lg:grid-cols-7 lg:gap-x-2">
            {items.map(({ icon: Icon, title, description }) => {
              const isActive = activeItem === title;

              return (
                <div
                  key={title}
                  className="relative flex w-full max-w-[128px] flex-col items-center"
                  onMouseEnter={() => setActiveItem(title)}
                  onMouseLeave={() =>
                    setActiveItem((current) =>
                      current === title ? null : current,
                    )
                  }
                  onFocus={() => setActiveItem(title)}
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null,
                      )
                    ) {
                      setActiveItem(null);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setActiveItem(null);
                  }}
                >
                  <button
                    type="button"
                    aria-label={`${title}: ${description}`}
                    aria-expanded={isActive}
                    className="group flex min-h-[82px] w-full flex-col items-center justify-start gap-1 rounded-2xl px-2 py-1.5 text-[#586477] outline-none transition duration-200 hover:text-[#1a73e8] focus-visible:ring-2 focus-visible:ring-[#8db5e8] motion-reduce:transition-none"
                    onClick={() =>
                      setActiveItem((current) =>
                        current === title ? null : title,
                      )
                    }
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-[#2876d2] transition duration-300 motion-reduce:transition-none ${
                        isActive
                          ? "scale-110 bg-white shadow-[0_3px_12px_-4px_rgba(29,78,160,0.3)]"
                          : "bg-transparent group-hover:scale-110 group-hover:bg-white/90 group-hover:shadow-sm group-focus-visible:bg-white/90"
                      }`}
                    >
                      <Icon aria-hidden="true" className="h-8 w-8" />
                    </span>
                    <span className="text-[11px] leading-4 sm:text-xs">
                      {title}
                    </span>
                  </button>

                  <div
                    aria-hidden={!isActive}
                    className={`absolute left-1/2 top-1 z-20 w-[min(176px,calc(100vw-40px))] -translate-x-1/2 rounded-[20px] border border-[#e1e6ed] bg-white px-4 pb-4 pt-3 text-center shadow-[0_8px_24px_-10px_rgba(15,35,65,0.42)] transition duration-200 motion-reduce:transition-none ${
                      isActive
                        ? "translate-y-0 scale-100 opacity-100"
                        : "pointer-events-none translate-y-2 scale-95 opacity-0"
                    }`}
                  >
                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf4ff] text-[#2876d2]">
                      <Icon aria-hidden="true" className="h-8 w-8" />
                    </span>
                    <h4 className="mt-2 text-sm font-semibold text-[#2d394b]">
                      {title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-[#6f7a8a]">
                      {description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
