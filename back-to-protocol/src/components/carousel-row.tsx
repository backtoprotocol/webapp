"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export type CarouselRowHandle = {
  scrollLeft: () => void;
  scrollRight: () => void;
};

export const CarouselRow = forwardRef<CarouselRowHandle, { children: React.ReactNode }>(function CarouselRow(
  { children },
  ref,
) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  };

  useImperativeHandle(ref, () => ({
    scrollLeft: () => scroll(-1),
    scrollRight: () => scroll(1),
  }));

  return (
    <div
      ref={scrollRef}
      className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
});
