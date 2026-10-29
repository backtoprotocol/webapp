"use client";

import { useRef, useState, type UIEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  CreditCard,
  Fingerprint,
  LockKeyhole,
  Plus,
  ScanLine,
  Share2,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    id: "secure",
    icon: ShieldCheck,
    title: "Security comes first",
    description:
      "Your documents and photos are encrypted on your device before cloud backup. Keep control of what you save and share.",
    label: "SECURITY FIRST",
    details: ["Encrypted before cloud backup", "You choose what to share"],
  },
  {
    id: "cards",
    icon: CreditCard,
    title: "Keep your cards close",
    description:
      "Store the digital cards and details you reach for, all together and easy to find.",
    label: "CARDS, TOGETHER",
    details: ["Digital cards and memberships", "Scans of physical cards"],
  },
  {
    id: "reminders",
    icon: CalendarClock,
    title: "Stay ahead of expiration dates",
    description:
      "Save expiration dates with your cards and set reminders for when it’s time to renew.",
    label: "A LITTLE REMINDER",
    details: ["Expiration dates in one place", "Reminders before renewal"],
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Share cards your way",
    description:
      "Share a digital card or a saved copy of a physical one. Choose what to share and when.",
    label: "SHARE WITH CARE",
    details: ["Digital cards or saved copies", "You decide when to share"],
  },
  {
    id: "custom",
    icon: Plus,
    title: "Make the details your own",
    description:
      "Add custom fields to a card so the details that matter to you stay right alongside it.",
    label: "MADE TO FIT YOU",
    details: ["Add your own fields", "Keep related details together"],
  },
] as const;

function FeatureArtwork({ featureId }: { featureId: (typeof features)[number]["id"] }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[24px] border border-[#e4edf8] bg-[radial-gradient(ellipse_at_75%_15%,rgba(180,216,255,0.65),transparent_40%),linear-gradient(145deg,#fff_10%,#f2f7ff_100%)] p-5 sm:min-h-[270px] sm:p-8"
    >
      <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#dcecff]/80 blur-2xl" />

      {featureId === "secure" ? (
        <div className="relative w-full max-w-[390px]">
          <div className="rounded-2xl border border-[#e2eaf4] bg-white p-4 shadow-[0_16px_40px_-26px_rgba(29,78,160,0.45)] sm:p-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold text-[#61718a]">
                <CreditCard aria-hidden="true" className="h-4 w-4 text-[#2876d2]" />
                MEMBER CARD
              </span>
              <span className="rounded-full bg-[#edf8f3] px-2.5 py-1 text-[10px] font-semibold text-[#23815d]">
                SAVED
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div>
                <span className="block h-2 w-24 rounded-full bg-[#dfe8f3]" />
                <span className="mt-2 block h-2 w-16 rounded-full bg-[#edf1f7]" />
                <span className="mt-4 block text-sm font-semibold tracking-[0.16em] text-[#495a73]">
                  •••• &nbsp;••••
                </span>
              </div>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#2876d2]">
                <Fingerprint aria-hidden="true" className="h-8 w-8" />
              </span>
            </div>
          </div>
          <div className="absolute -bottom-4 right-3 flex items-center gap-2 rounded-full border border-[#d9e9e2] bg-white px-3 py-2 text-[11px] font-semibold text-[#267253] shadow-lg sm:right-6">
            <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />
            Encrypted on your device
          </div>
        </div>
      ) : null}

      {featureId === "cards" ? (
        <div className="relative w-full max-w-[390px]">
          <div className="absolute left-5 top-1 h-[130px] w-[78%] -rotate-6 rounded-2xl border border-[#dce6f3] bg-white/80 shadow-sm sm:left-8 sm:h-[156px]" />
          <div className="relative ml-auto w-[86%] rotate-2 rounded-2xl bg-gradient-to-br from-[#286fd0] to-[#1751a8] p-5 text-white shadow-[0_20px_40px_-22px_rgba(30,86,164,0.6)] sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-white/75">
                  TREEHOUSE
                </p>
                <p className="mt-2 text-sm font-semibold">Everyday rewards</p>
              </div>
              <CreditCard aria-hidden="true" className="h-5 w-5 text-white/80" />
            </div>
            <p className="mt-7 text-xs tracking-[0.22em] text-white/85">
              •••• &nbsp;•••• &nbsp; 4821
            </p>
            <div className="mt-3 flex items-center justify-between text-[10px] text-white/75">
              <span>MEMBER CARD</span>
              <span>YOUR WALLET, ORGANIZED</span>
            </div>
          </div>
          <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full border border-white bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#526178] shadow-sm">
            <ScanLine aria-hidden="true" className="h-3.5 w-3.5 text-[#2876d2]" />
            Digital cards &amp; saved scans
          </span>
        </div>
      ) : null}

      {featureId === "reminders" ? (
        <div className="relative w-full max-w-[390px] rounded-2xl border border-[#e2eaf4] bg-white p-4 shadow-[0_16px_40px_-26px_rgba(29,78,160,0.45)] sm:p-5">
          <div className="flex items-center justify-between border-b border-[#edf1f7] pb-3">
            <span className="text-sm font-semibold text-[#344258]">
              Upcoming dates
            </span>
            <CalendarClock aria-hidden="true" className="h-5 w-5 text-[#2876d2]" />
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#f7faff] p-3">
            <span className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-white text-[#2876d2] shadow-sm">
              <span className="text-[8px] font-bold tracking-wider">OCT</span>
              <span className="text-sm font-bold leading-4">24</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-[#344258]">
                Membership card
              </span>
              <span className="mt-1 block text-[10px] text-[#7b8798]">
                Expires in 30 days
              </span>
            </span>
            <span className="rounded-full bg-[#fff4df] px-2 py-1 text-[9px] font-semibold text-[#9a6508]">
              REMINDER
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-[#76849a]">
            <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#27815d]" />
            A heads-up before it expires
          </div>
        </div>
      ) : null}

      {featureId === "sharing" ? (
        <div className="relative w-full max-w-[390px] rounded-2xl border border-[#e2eaf4] bg-white p-4 shadow-[0_16px_40px_-26px_rgba(29,78,160,0.45)] sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#344258]">
              Share a saved card
            </span>
            <Share2 aria-hidden="true" className="h-5 w-5 text-[#2876d2]" />
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#e8edf4] p-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf4ff] text-[#2876d2]">
              <CreditCard aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-[#344258]">
                Member card
              </span>
              <span className="mt-1 block text-[10px] text-[#7b8798]">
                Digital card or saved copy
              </span>
            </span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[#8794a5]" />
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#eff6ff] px-3 py-2.5 text-[11px] font-semibold text-[#2869b2]">
            <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5" />
            You choose what to share
          </div>
        </div>
      ) : null}

      {featureId === "custom" ? (
        <div className="relative w-full max-w-[390px] rounded-2xl border border-[#e2eaf4] bg-white p-4 shadow-[0_16px_40px_-26px_rgba(29,78,160,0.45)] sm:p-5">
          <div className="flex items-center justify-between border-b border-[#edf1f7] pb-3">
            <span className="text-sm font-semibold text-[#344258]">
              Your card details
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#2876d2]">
              <Plus aria-hidden="true" className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {[
              ["Card number", "•••• 4821"],
              ["Expires", "10 / 27"],
              ["Member since", "2021"],
              ["Your own field", "Add a detail"],
            ].map(([label, value]) => (
              <span
                key={label}
                className="rounded-xl bg-[#f7faff] px-3 py-2.5"
              >
                <span className="block text-[9px] font-medium text-[#8794a5]">
                  {label}
                </span>
                <span className="mt-1 block text-[11px] font-semibold text-[#46566e]">
                  {value}
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function EssentialsShowcase() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeFeature = features[activeFeatureIndex];
  const ActiveIcon = activeFeature.icon;

  const handleCarouselScroll = (event: UIEvent<HTMLDivElement>) => {
    const carousel = event.currentTarget;
    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(carousel.children).forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);

      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    setActiveFeatureIndex(closestIndex);
  };

  const scrollToFeature = (index: number) => {
    const carousel = carouselRef.current;
    const slide = carousel?.children[index];

    if (!carousel || !slide) return;

    const carouselLeft = carousel.getBoundingClientRect().left;
    const slideLeft = slide.getBoundingClientRect().left;

    carousel.scrollTo({
      left:
        carousel.scrollLeft +
        slideLeft -
        carouselLeft +
        slide.clientWidth / 2 -
        carousel.clientWidth / 2,
      behavior: "smooth",
    });
    setActiveFeatureIndex(index);
  };

  return (
    <section
      id="features"
      className="scroll-mt-24 border-y border-[#e5ebf3] bg-[linear-gradient(145deg,#f8fbff_0%,#fff_48%,#f2f7ff_100%)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#397bd0]">
            Your cards. Your details. Your choice.
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.045em] text-[#243247] sm:text-4xl lg:text-5xl">
            A better place for the cards you count on.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-base leading-7 text-[#748094] sm:text-lg">
            Keep cards close, stay ahead of expiration dates, and share on your
            terms—with security built in from the start.
          </p>
        </div>

        <div className="-mx-5 mt-9 lg:hidden">
          <div
            ref={carouselRef}
            role="region"
            aria-label="Treehouse feature cards"
            aria-roledescription="carousel"
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={handleCarouselScroll}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.id}
                  aria-label={`${index + 1} of ${features.length}: ${feature.title}`}
                  aria-roledescription="slide"
                  className="w-[calc(100vw-64px)] shrink-0 snap-center overflow-hidden rounded-[26px] border border-[#d6e5f7] bg-white p-3.5 shadow-[0_20px_55px_-38px_rgba(29,78,160,0.42)]"
                >
                  <button
                    type="button"
                    aria-label={`Show ${feature.title}`}
                    onClick={() => scrollToFeature(index)}
                    className="block w-full text-left focus-visible:rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2876d2]"
                  >
                    <FeatureArtwork featureId={feature.id} />
                    <div className="px-1 pb-1 pt-5">
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-[#2876d2]">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                        {feature.label}
                      </div>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[#243247]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 min-h-[72px] text-sm leading-6 text-[#69778b]">
                        {feature.description}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {feature.details.map((detail) => (
                          <li
                            key={detail}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f6fc] px-2.5 py-2 text-[10px] font-medium text-[#4f6179]"
                          >
                            <Check
                              aria-hidden="true"
                              className="h-3 w-3 shrink-0 text-[#28805d]"
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between px-5">
            <p className="text-xs font-medium text-[#8290a4]">
              Swipe to explore
            </p>
            <div className="flex items-center gap-3">
              <div aria-label="Choose a feature" className="flex items-center gap-1.5">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    type="button"
                    aria-label={`Show ${feature.title}`}
                    aria-current={activeFeatureIndex === index ? "true" : undefined}
                    onClick={() => scrollToFeature(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeFeatureIndex === index
                        ? "w-5 bg-[#2876d2]"
                        : "w-2 bg-[#cbd4df] hover:bg-[#8ea5c0]"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous feature"
                  disabled={activeFeatureIndex === 0}
                  onClick={() => scrollToFeature(Math.max(0, activeFeatureIndex - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dce5f0] bg-white text-[#526178] transition hover:bg-[#f1f6fc] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next feature"
                  disabled={activeFeatureIndex === features.length - 1}
                  onClick={() =>
                    scrollToFeature(
                      Math.min(features.length - 1, activeFeatureIndex + 1),
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dce5f0] bg-white text-[#526178] transition hover:bg-[#f1f6fc] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 hidden items-start gap-6 lg:mt-14 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div aria-label="Explore Treehouse features" className="space-y-2.5">
            {features.map(({ id, icon: Icon, title, description }, index) => {
              const isActive = activeFeatureIndex === index;

              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="feature-details"
                  onClick={() => setActiveFeatureIndex(index)}
                  className={`group flex min-h-[76px] w-full items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition duration-200 motion-reduce:transition-none sm:gap-4 sm:px-5 ${
                    isActive
                      ? "border-[#2e7be2] bg-white shadow-[0_8px_28px_-18px_rgba(29,78,160,0.45)] ring-1 ring-[#2e7be2]"
                      : "border-[#e1e7ef] bg-white/75 hover:border-[#b8cce5] hover:bg-white"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#eaf4ff] text-[#1d70d5]"
                        : "bg-[#f3f6fa] text-[#64748b] group-hover:bg-[#eaf4ff] group-hover:text-[#1d70d5]"
                    }`}
                  >
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[#344258] sm:text-[15px]">
                      {title}
                    </span>
                    {isActive ? (
                      <span className="mt-1 block text-xs leading-5 text-[#76849a] sm:text-[13px]">
                        {description}
                      </span>
                    ) : null}
                  </span>
                  {isActive ? (
                    <Check
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-[#2876d2]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <article
            id="feature-details"
            aria-live="polite"
            className="overflow-hidden rounded-[28px] border border-[#d6e5f7] bg-white p-3.5 shadow-[0_24px_70px_-44px_rgba(29,78,160,0.42)] sm:rounded-[32px] sm:p-5"
          >
            <FeatureArtwork featureId={activeFeature.id} />
            <div className="px-2 pb-2 pt-5 sm:px-3 sm:pb-3 sm:pt-6">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-[#2876d2]">
                <ActiveIcon aria-hidden="true" className="h-4 w-4" />
                {activeFeature.label}
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-[#243247] sm:text-2xl">
                {activeFeature.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#69778b] sm:text-[15px] sm:leading-7">
                {activeFeature.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {activeFeature.details.map((detail) => (
                  <li
                    key={detail}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f6fc] px-3 py-2 text-[11px] font-medium text-[#4f6179] sm:text-xs"
                  >
                    <Check
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-[#28805d]"
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        <p className="mx-auto mt-8 flex max-w-fit items-center justify-center gap-2 rounded-full border border-[#dce8f6] bg-white/80 px-4 py-2 text-center text-xs font-medium text-[#5d6e86]">
          <LockKeyhole aria-hidden="true" className="h-3.5 w-3.5 text-[#2876d2]" />
          Your personal information stays yours.
        </p>
      </div>
    </section>
  );
}
