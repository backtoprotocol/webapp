"use client";

import Link from "next/link";
import { useRef } from "react";
import { CarouselRow, type CarouselRowHandle } from "@/components/carousel-row";

export function CarouselSection({
  title,
  subtitle,
  shopAllHref,
  children,
}: {
  title: string;
  subtitle?: string;
  shopAllHref: string;
  children: React.ReactNode;
}) {
  const carouselRef = useRef<CarouselRowHandle>(null);

  return (
    <div>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-[-0.06em] text-slate-900">{title}</h2>
          {subtitle ? <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p> : null}
        </div>

        <div className="flex items-center gap-4">
          <Link href={shopAllHref} className="text-sm font-semibold text-sky-700 underline-offset-2 hover:underline">
            Shop all
          </Link>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => carouselRef.current?.scrollLeft()}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-base text-slate-700 shadow-[0_4px_10px_rgba(15,23,42,0.1)] transition hover:bg-slate-50"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => carouselRef.current?.scrollRight()}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-base text-slate-700 shadow-[0_4px_10px_rgba(15,23,42,0.1)] transition hover:bg-slate-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <CarouselRow ref={carouselRef}>{children}</CarouselRow>
    </div>
  );
}
