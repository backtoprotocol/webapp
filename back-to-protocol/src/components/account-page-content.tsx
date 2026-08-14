"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/logo-mark";
import {
  type ProtocolAuthUser,
  getAuthErrorMessage,
  hasFirebaseConfig,
  observeAuthState,
  signOutAccount,
} from "@/lib/firebase-auth-client";
import { protocolPillars } from "@/lib/protocol-pillars";
import {
  type SleepProtocolPlan,
  getSleepCompletedDays,
  getSleepDayPlan,
  getSleepProgress,
  getStoredSleepPlan,
  toggleSleepAction,
} from "@/lib/sleep-protocol";
import {
  addProtocol,
  getProtocolStartHref,
  getStoredProtocolState,
  protocolCatalog,
  removeProtocol,
  type ProtocolSlug,
  type UserProtocolState,
} from "@/lib/protocol-tracker";

type PortalSection = "home" | "library";

const protocolAccents = [
  "from-cyan-400 via-sky-400 to-emerald-300",
  "from-orange-400 via-amber-300 to-yellow-200",
  "from-indigo-500 via-blue-500 to-cyan-400",
  "from-rose-400 via-pink-300 to-orange-200",
  "from-fuchsia-500 via-violet-500 to-indigo-400",
  "from-slate-900 via-slate-700 to-slate-500",
  "from-emerald-500 via-teal-400 to-cyan-300",
  "from-sky-500 via-cyan-400 to-blue-300",
] as const;

const quickLinks = [
  { label: "Library", href: "/protocol" },
  { label: "Research", href: "/research" },
];

const mediaCollections = [
  {
    title: "Podcast episodes",
    description: "Audio conversations and guided listening for recovery, mindset, and performance.",
    href: "/podcast",
    cta: "Open podcast",
  },
  {
    title: "Article library",
    description: "Long-form writing, practical essays, and protocol explainers you can return to daily.",
    href: "/articles",
    cta: "Browse articles",
  },
  {
    title: "Newsroom",
    description: "Recent coverage, platform updates, and the latest protocol-focused publishing.",
    href: "/news",
    cta: "Read news",
  },
  {
    title: "Research notes",
    description: "Evidence-led summaries and studies translated into clearer next steps.",
    href: "/research",
    cta: "Open research",
  },
  {
    title: "Daily games",
    description: "Interactive training tools and mini experiences designed for everyday momentum.",
    href: "/games",
    cta: "Play now",
  },
  {
    title: "Protocol library",
    description: "Every protocol page in one place, organized for quick scanning and repeat use.",
    href: "/protocols",
    cta: "View all protocols",
  },
] as const;

export function AccountPageContent() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<ProtocolAuthUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [activeSection, setActiveSection] = useState<PortalSection>("home");
  const [sleepPlan, setSleepPlan] = useState<SleepProtocolPlan | null>(null);
  const [protocolState, setProtocolState] = useState<UserProtocolState | null>(null);

  const protocolOfTheDay = useMemo(() => {
    const index = new Date().getDate() % protocolPillars.length;
    return protocolPillars[index];
  }, []);

  const recommendedPlan = protocolPillars.find((pillar) => pillar.slug === "sleep") ?? protocolPillars[0];
  const continueProtocols = protocolPillars.slice(0, 3);
  const libraryHighlights = mediaCollections.slice(0, 3);
  const activeProtocols = protocolState?.activeProtocols ?? ["sleep"];
  const sleepProgress = sleepPlan ? getSleepProgress(sleepPlan) : null;
  const todayPlan = sleepProgress ? getSleepDayPlan(sleepProgress.currentDay) : null;
  const todayLog = sleepProgress ? sleepPlan?.dailyLogs[String(sleepProgress.currentDay)] : null;
  const completedDays = sleepPlan ? getSleepCompletedDays(sleepPlan) : [];

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setAuthUser(user);
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authUser) {
      setSleepPlan(null);
      setProtocolState(null);
      return;
    }

    const plan = getStoredSleepPlan(authUser.uid);
    setSleepPlan(plan);
    const protocolStateFromStorage = getStoredProtocolState(authUser.uid);
    setProtocolState(protocolStateFromStorage);
  }, [authUser]);

  const savePlan = (next: SleepProtocolPlan) => {
    setSleepPlan(next);
  };

  const saveProtocolState = (next: UserProtocolState) => {
    setProtocolState(next);
  };

  const handleToggleAction = (actionId: string) => {
    if (!sleepPlan || !sleepProgress) {
      return;
    }

    const next = toggleSleepAction(sleepPlan, sleepProgress.currentDay, actionId);
    savePlan(next);
  };

  const handleAddProtocol = (slug: ProtocolSlug) => {
    if (!authUser) return;
    const current = protocolState ?? { userId: authUser.uid, activeProtocols: ["sleep"], updatedAt: new Date().toISOString() };
    saveProtocolState(addProtocol(current, slug));
  };

  const handleRemoveProtocol = (slug: ProtocolSlug) => {
    if (!authUser) return;
    const current = protocolState ?? { userId: authUser.uid, activeProtocols: ["sleep"], updatedAt: new Date().toISOString() };
    saveProtocolState(removeProtocol(current, slug));
  };

  const handleOpenProtocol = (slug: ProtocolSlug) => {
    router.push(getProtocolStartHref(slug));
  };

  useEffect(() => {
    if (!authReady) {
      return;
    }

    if (!authUser) {
      router.replace("/sign-in");
    }
  }, [authReady, authUser, router]);

  const handleSignOut = async () => {
    if (busy) {
      return;
    }

    setBusy(true);
    setErrorMessage("");

    try {
      await signOutAccount();
      router.replace("/sign-in");
      router.refresh();
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, "Unable to sign out."));
    } finally {
      setBusy(false);
    }
  };

  if (!hasFirebaseConfig()) {
    return (
      <main className="min-h-screen bg-[#171717] px-6 py-14 text-white sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-300/20 bg-amber-500/10 p-8 text-amber-100 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
          <p className="mt-4 text-base leading-7 text-amber-50/85">
            Firebase web config is missing, so this account page cannot load sign-in state yet.
          </p>
        </div>
      </main>
    );
  }

  if (!authReady || !authUser) {
    return (
      <main className="min-h-screen bg-[#171717] px-6 py-14 text-white sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/55">Account</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">Loading your protocols...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#171717] text-white">
      <section className="min-h-screen bg-[#171717] px-6 pb-16 pt-8 sm:px-10 sm:pt-10 lg:px-16 lg:pb-20 lg:pt-12 xl:px-20">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-6 border-b border-white/8 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link href="/" className="inline-flex items-center gap-3" aria-label="Back to home">
                <LogoMark className="h-8 w-8" />
                <span className="text-2xl font-semibold tracking-tight text-white">Protocol+</span>
              </Link>
              <h2 className="mt-8 text-4xl font-semibold tracking-tight text-white">My Protocols</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                A daily portal for active plans, protocol recommendations, and all your media in one place.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/75 sm:min-w-[18rem]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">Signed in</p>
              <p className="mt-2 font-semibold text-white">{authUser.displayName || "Protocol+ Member"}</p>
              <p className="mt-1 break-all text-white/60">{authUser.email}</p>
              <div className="mt-4 flex items-center gap-3 text-xs">
                <span className="rounded-full border border-white/10 px-3 py-1 text-white/70">
                  {protocolPillars.length} protocols
                </span>
                <span className="rounded-full border border-cyan-400/20 px-3 py-1 text-cyan-200">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-xs text-white/65">
            <button
              type="button"
              onClick={() => setActiveSection("home")}
              className={`rounded-full border px-3 py-1.5 font-medium transition ${activeSection === "home" ? "border-white/25 bg-white text-slate-950" : "border-white/10 hover:bg-white/5 hover:text-white"}`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("library")}
              className={`rounded-full border px-3 py-1.5 font-medium transition ${activeSection === "library" ? "border-white/25 bg-white text-slate-950" : "border-white/10 hover:bg-white/5 hover:text-white"}`}
            >
              Library
            </button>
            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 px-3 py-1.5 font-medium transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/protocol"
              className="rounded-full border border-white/10 px-3 py-1.5 font-medium transition hover:bg-white/5 hover:text-white"
            >
              All protocols
            </Link>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              disabled={busy}
              className="rounded-full border border-white/15 px-3 py-1.5 font-medium text-white transition hover:border-white/30 hover:bg-white/5 disabled:opacity-60"
            >
              {busy ? "Signing out..." : "Sign out"}
            </button>
          </div>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
              {errorMessage}
            </div>
          ) : null}

          {activeSection === "home" ? (
            <div className="mt-10 space-y-10">
              <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] to-indigo-400/10 p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Main protocol hub</p>
                  <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white">Your active protocols</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                    Add and remove protocols here. Start with Sleep, then layer other protocols as needed.
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {protocolCatalog.map((slug) => {
                      const pillar = protocolPillars.find((item) => item.slug === slug);
                      const active = activeProtocols.includes(slug);

                      if (!pillar) return null;

                      return (
                        <div key={slug} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold text-white">{pillar.name}</p>
                              <p className="mt-1 text-sm leading-6 text-white/60">{pillar.heroTitle}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${active ? "bg-emerald-300/15 text-emerald-200" : "bg-white/10 text-white/55"}`}>
                              {active ? "Active" : "Available"}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenProtocol(slug)}
                                      className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                                    >
                                      Open protocol
                                    </button>
                            {active ? (
                              <button
                                type="button"
                                onClick={() => handleRemoveProtocol(slug)}
                                className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                              >
                                Remove
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleAddProtocol(slug)}
                                className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>

                <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">Sleep summary</p>
                  {sleepProgress ? (
                    <>
                      <h3 className="mt-4 text-2xl font-semibold text-white">Day {sleepProgress.currentDay} of {sleepProgress.totalDays}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/65">{sleepProgress.completedDays} completed days. {sleepProgress.completionPercent}% complete.</p>
                      <div className="mt-6 space-y-2">
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300" style={{ width: `${sleepProgress.completionPercent}%` }} />
                        </div>
                        <p className="text-xs text-white/55">Tomorrow updates automatically because the day count is date-based.</p>
                      </div>
                      <Link
                        href="/protocol/sleep/start"
                        className="mt-6 inline-flex rounded-full border border-white/12 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
                      >
                        Continue sleep protocol
                      </Link>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-4 text-2xl font-semibold text-white">Sleep not started yet</h3>
                      <p className="mt-3 text-sm leading-7 text-white/65">Start Sleep to unlock a day-based protocol and progress tracking.</p>
                      <Link
                        href="/protocol/sleep/start"
                        className="mt-6 inline-flex rounded-full border border-white/12 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
                      >
                        Start sleep plan
                      </Link>
                    </>
                  )}

                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">What you&apos;ve already done</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {completedDays.length ? (
                        completedDays.slice(-10).map((day) => (
                          <span key={`done-${day}`} className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                            Day {day}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-white/55">No completed days yet.</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">Continue</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Keep moving through your systems</h3>
                  </div>
                  <Link href="/protocol" className="text-sm font-medium text-white/70 transition hover:text-white">
                    View all
                  </Link>
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {continueProtocols.map((pillar, index) => (
                    <Link
                      key={pillar.slug}
                      href={getProtocolStartHref(pillar.slug as ProtocolSlug)}
                      className="group block overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div className={`h-1.5 w-full rounded-full bg-gradient-to-r ${protocolAccents[index % protocolAccents.length]}`} />
                      <div className="mt-4">
                        <p className="text-lg font-semibold text-white">{pillar.name}</p>
                        <p className="mt-2 text-sm leading-6 text-white/65">{pillar.heroDescription}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">Media portal</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Use Protocol+ every day</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSection("library")}
                    className="text-sm font-medium text-white/70 transition hover:text-white"
                  >
                    Open library
                  </button>
                </div>
                <div className="mt-5 grid gap-5 md:grid-cols-3">
                  {libraryHighlights.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <p className="text-lg font-semibold text-white">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/65">{item.description}</p>
                      <span className="mt-5 inline-flex text-sm font-semibold text-cyan-200">{item.cta}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="mt-10 space-y-8">
              <section className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45">Library</p>
                  <h3 className="mt-3 text-3xl font-semibold text-white">Your media portal</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                    A daily-use library for audio, articles, games, research, and every protocol page across the platform.
                  </p>
                </div>
              </section>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {mediaCollections.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-[1.85rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <div className="h-32 rounded-[1.4rem] border border-white/8 bg-gradient-to-br from-white/[0.08] via-cyan-400/10 to-white/[0.02]" />
                    <h4 className="mt-5 text-xl font-semibold text-white">{item.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-white/65">{item.description}</p>
                    <span className="mt-6 inline-flex text-sm font-semibold text-cyan-200 transition group-hover:text-cyan-100">
                      {item.cta}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}