"use client";

import Link from "next/link";
import { useRef } from "react";
import { FadeInSection } from "@/components/fade-in-section";
import { LogoMark } from "@/components/logo-mark";
import { ProtocolOfferCarousel } from "@/components/protocol-offer-carousel";
import { protocolPillars } from "@/lib/protocol-pillars";
import { getSleepProtocolEntryHref } from "@/lib/sleep-protocol";

const featured = protocolPillars.find((pillar) => pillar.slug === "movement") ?? protocolPillars[0];
const spotlightPillars = protocolPillars.filter((pillar) => ["movement", "sleep", "recovery", "mindset"].includes(pillar.slug));
const trendingProtocols = protocolPillars;

const protocolSections = protocolPillars.map((pillar) => ({
  slug: pillar.slug,
  title: pillar.name,
  items: pillar.tracks.map((track) => ({
    slug: pillar.slug,
    name: track.title,
    tag: pillar.name,
    blurb: `${track.duration} · ${track.focus}`,
    gradient: offerGradient(pillar.slug),
  })),
}));

export default function ProtocolPage() {
  const trendingTrackRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    dragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const handleTrendingPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trendingTrackRef.current;
    if (!track) return;

    dragStateRef.current.dragging = true;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startScrollLeft = track.scrollLeft;
    dragStateRef.current.moved = false;
    track.setPointerCapture(event.pointerId);
  };

  const handleTrendingPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trendingTrackRef.current;
    if (!track || !dragStateRef.current.dragging) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    if (Math.abs(deltaX) > 4) {
      dragStateRef.current.moved = true;
    }

    track.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
  };

  const handleTrendingPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trendingTrackRef.current;
    if (!track) return;

    dragStateRef.current.dragging = false;
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  const handleTrendingClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragStateRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragStateRef.current.moved = false;
    }
  };

  const scrollTrending = (direction: "left" | "right") => {
    const track = trendingTrackRef.current;
    if (!track) return;

    const firstCard = track.querySelector<HTMLElement>("[data-trending-card]");
    if (!firstCard) return;

    const gap = 16;
    const delta = firstCard.offsetWidth + gap;
    track.scrollBy({
      left: direction === "right" ? delta : -delta,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <section
        className="border-b border-slate-200 bg-white text-slate-950"
      >
        <div className="mx-auto flex min-h-[92svh] w-full max-w-[1600px] flex-col justify-between px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8 lg:px-8 lg:pb-10">
          <Link
            href="/"
            className="absolute left-4 top-4 z-20 inline-flex items-center gap-2.5 rounded-md border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50 sm:left-6 sm:top-6 lg:left-8"
            aria-label="Back to Protocol home"
          >
            <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-900">Protocol+</span>
          </Link>

          <FadeInSection className="max-w-[38rem] space-y-5 pt-2 sm:pt-8 lg:pt-10">

            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-900">
              <span>Featured</span>
              <span className="text-slate-500">2026</span>
              <span className="text-slate-500">8 Protocols</span>
            </div>

            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              {featured.heroTitle}
            </h2>

            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              {featured.heroDescription}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/protocol/${featured.slug}`}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore
              </Link>
              <Link
                href="/protocol"
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                All protocols
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection className="mt-8 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 sm:mt-10 sm:ml-auto sm:w-fit sm:px-5" delayMs={80}>
            Published 2026
          </FadeInSection>

          <FadeInSection className="mt-8 space-y-4" delayMs={120}>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Trending Now</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollTrending("left")}
                  aria-label="Scroll trending protocols left"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrending("right")}
                  aria-label="Scroll trending protocols right"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={trendingTrackRef}
              onPointerDown={handleTrendingPointerDown}
              onPointerMove={handleTrendingPointerMove}
              onPointerUp={handleTrendingPointerUp}
              onPointerCancel={handleTrendingPointerUp}
              onPointerLeave={handleTrendingPointerUp}
              onClickCapture={handleTrendingClickCapture}
              className="cursor-grab overflow-x-auto pb-2 select-none [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex w-max gap-3 sm:gap-4">
                {trendingProtocols.map((pillar, index) => (
                  <Link
                    key={pillar.slug}
                    href={getSleepProtocolEntryHref(pillar.slug)}
                    data-trending-card
                    className="group relative w-[11.5rem] shrink-0 overflow-hidden rounded-lg border border-white/15 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.8)] sm:w-[13rem]"
                  >
                    <div
                      className="aspect-[2/3]"
                      style={{
                        backgroundImage: `linear-gradient(140deg, ${posterGradient(pillar.slug)})`,
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_8%,rgba(0,0,0,0.7)_100%)]" />
                    <div className="absolute left-2 top-2 rounded-md border border-white/20 bg-black/25 p-1.5 backdrop-blur-sm">
                      <LogoMark tone="white" className="h-4 w-4" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75">Protocol {index + 1}</p>
                      <p className="mt-1 text-xl font-semibold tracking-tight text-white">{pillar.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-700">Protocol navigation</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Choose your protocol focus</h3>
            </div>
          <div className="flex flex-wrap gap-2.5">
            {spotlightPillars.map((pillar) => (
              <Link
                key={`spotlight-${pillar.slug}`}
                href={getSleepProtocolEntryHref(pillar.slug)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
              >
                {pillar.name}
              </Link>
            ))}
            <Link
              href="/protocol"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              See all
            </Link>
          </div>
          </div>
        </div>
      </section>

      {protocolSections.map((section) => (
        <ProtocolOfferCarousel
          key={section.slug}
          title={section.title}
          items={section.items}
        />
      ))}
    </main>
  );
}

function posterGradient(slug: string) {
  switch (slug) {
    case "movement":
      return "#06b6d4, #0f172a";
    case "nutrition":
      return "#10b981, #164e63";
    case "sleep":
      return "#6366f1, #0f172a";
    case "stress":
      return "#0ea5e9, #0f766e";
    case "relationships":
      return "#14b8a6, #0f172a";
    case "recovery":
      return "#38bdf8, #0f172a";
    case "longevity":
      return "#22d3ee, #134e4a";
    case "mindset":
      return "#0ea5e9, #1e3a8a";
    default:
      return "#06b6d4, #0f172a";
  }
}

function offerGradient(slug: string) {
  switch (slug) {
    case "movement":
      return "from-cyan-950 via-blue-900 to-slate-900";
    case "nutrition":
      return "from-emerald-950 via-teal-900 to-cyan-900";
    case "sleep":
      return "from-slate-950 via-indigo-900 to-blue-900";
    case "stress":
      return "from-slate-950 via-cyan-900 to-emerald-900";
    case "relationships":
      return "from-emerald-950 via-cyan-900 to-slate-900";
    case "recovery":
      return "from-blue-950 via-cyan-900 to-teal-900";
    case "longevity":
      return "from-teal-950 via-cyan-900 to-slate-900";
    case "mindset":
      return "from-slate-900 via-cyan-900 to-blue-900";
    default:
      return "from-slate-900 via-cyan-900 to-emerald-900";
  }
}
