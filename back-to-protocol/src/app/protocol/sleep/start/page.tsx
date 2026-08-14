"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type ProtocolAuthUser,
  observeAuthState,
} from "@/lib/firebase-auth-client";
import { protocolPillars } from "@/lib/protocol-pillars";
import {
  createSleepPlan,
  getSleepCompletedDays,
  getSleepDayPlan,
  getSleepProgress,
  getStoredSleepPlan,
  sleepGoalOptions,
  toggleSleepAction,
  type SleepAssessment,
  type SleepProtocolPlan,
} from "@/lib/sleep-protocol";

const scoreFields: Array<{ key: keyof Omit<SleepAssessment, "goals">; label: string }> = [
  { key: "sleep", label: "Sleep" },
  { key: "energy", label: "Energy" },
  { key: "stress", label: "Stress" },
  { key: "movement", label: "Movement" },
  { key: "nutrition", label: "Nutrition" },
  { key: "mood", label: "Mood" },
  { key: "relationships", label: "Relationships" },
  { key: "motivation", label: "Motivation" },
];

const defaultAssessment: SleepAssessment = {
  sleep: 5,
  energy: 5,
  stress: 5,
  movement: 5,
  nutrition: 5,
  mood: 5,
  relationships: 5,
  motivation: 5,
  goals: ["Fix my sleep"],
};

export default function SleepPlanStartPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [authUser, setAuthUser] = useState<ProtocolAuthUser | null>(null);
  const [busy, setBusy] = useState(false);
  const [assessment, setAssessment] = useState<SleepAssessment>(defaultAssessment);
  const [sleepPlan, setSleepPlan] = useState<SleepProtocolPlan | null>(null);

  const sleepProtocol = useMemo(
    () => protocolPillars.find((pillar) => pillar.slug === "sleep") ?? protocolPillars[0],
    [],
  );

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
      setAuthUser(user);
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);

  const existingPlan = useMemo(() => {
    if (!authUser) return null;
    return getStoredSleepPlan(authUser.uid);
  }, [authUser]);

  useEffect(() => {
    setSleepPlan(existingPlan);
  }, [existingPlan]);

  useEffect(() => {
    if (!authReady) return;

    if (!authUser) {
      router.replace(`/sign-in?next=${encodeURIComponent("/protocol/sleep/start")}`);
      return;
    }
  }, [authReady, authUser, existingPlan, router]);

  const toggleGoal = (goal: (typeof sleepGoalOptions)[number]) => {
    setAssessment((prev) => {
      const hasGoal = prev.goals.includes(goal);
      return {
        ...prev,
        goals: hasGoal ? prev.goals.filter((item) => item !== goal) : [...prev.goals, goal],
      };
    });
  };

  const canSubmit = assessment.goals.length > 0 && !busy && !!authUser;

  const startPlan = () => {
    if (!authUser || !canSubmit) return;

    setBusy(true);
    const plan = createSleepPlan(authUser.uid, assessment);
    setSleepPlan(plan);
    setBusy(false);
  };

  const sleepProgress = sleepPlan ? getSleepProgress(sleepPlan) : null;
  const todayPlan = sleepProgress ? getSleepDayPlan(sleepProgress.currentDay) : null;
  const completedDays = sleepPlan ? getSleepCompletedDays(sleepPlan) : [];

  const handleToggleAction = (actionId: string) => {
    if (!sleepPlan || !sleepProgress) {
      return;
    }

    const next = toggleSleepAction(sleepPlan, sleepProgress.currentDay, actionId);
    setSleepPlan(next);
  };

  if (!authReady || !authUser) {
    return (
      <main className="min-h-screen bg-[#f5f5f1] px-6 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">Sleep Protocol</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950">Preparing your sleep onboarding...</h1>
        </div>
      </main>
    );
  }

  if (sleepPlan) {
    return (
      <main className="min-h-screen bg-[#07111f] px-6 py-12 text-white sm:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200/80">Sleep Protocol</p>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{sleepProtocol.heroTitle}</h1>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">{sleepProtocol.heroDescription}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/account" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5">
                  Back to account
                </Link>
                <Link href="/protocol" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
                  All protocols
                </Link>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {sleepProtocol.metrics.map((metric) => (
                <article key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-sm leading-6 text-white/65">{metric.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Today&apos;s protocol</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">{sleepProgress ? `Day ${sleepProgress.currentDay} of ${sleepProgress.totalDays}` : "No active sleep day"}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65">
                {sleepProgress ? `${sleepProgress.completedDays} days completed. ${sleepProgress.completionPercent}% complete.` : "Create a sleep plan to unlock your dedicated dashboard."}
              </p>

              {sleepProgress && todayPlan ? (
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">Focus block</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{todayPlan.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/65">{todayPlan.why}</p>
                  <div className="mt-5 space-y-3">
                    {todayPlan.actions.map((action) => {
                      const completed = Boolean(sleepPlan.dailyLogs[String(sleepProgress.currentDay)]?.completedActionIds.includes(action.id));

                      return (
                        <button
                          key={action.id}
                          type="button"
                          onClick={() => handleToggleAction(action.id)}
                          className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${completed ? "border-emerald-300/30 bg-emerald-300/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}
                        >
                          <span className={`mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs font-semibold ${completed ? "border-emerald-300 bg-emerald-200 text-emerald-900" : "border-white/30 text-white/60"}`}>
                            {completed ? "✓" : ""}
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-white">{action.title}</span>
                            <span className="mt-1 block text-xs text-white/60">{action.detail}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-sm leading-7 text-white/65">Start a plan below to build your sleep dashboard.</p>
                </div>
              )}
            </article>

            <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Protocol overview</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">Everything you need to know about sleep</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">This page stays separate from Account so you can focus on the protocol itself.</p>

              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">Progress</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300" style={{ width: `${sleepProgress?.completionPercent ?? 0}%` }} />
                </div>
                <p className="mt-3 text-sm text-white/65">{sleepProgress ? `${completedDays.length} completed days tracked so far.` : "No plan started yet."}</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {sleepProtocol.principles.map((principle, index) => (
                  <div key={principle} className="rounded-[1.3rem] border border-white/10 bg-black/20 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">Principle {index + 1}</p>
                    <p className="mt-2 text-sm leading-7 text-white/70">{principle}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {sleepProtocol.tracks.map((track) => (
                  <div key={track.title} className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{track.title}</p>
                      <span className="text-xs text-white/45">{track.intensity}</span>
                    </div>
                    <p className="mt-1 text-xs text-white/55">{track.duration}</p>
                    <p className="mt-2 text-sm leading-6 text-white/65">{track.focus}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-200/70">Completed days</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {completedDays.length ? (
                completedDays.map((day) => (
                  <span key={`completed-${day}`} className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    Day {day}
                  </span>
                ))
              ) : (
                <span className="text-sm text-white/55">No completed days yet.</span>
              )}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f1] px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Back To Protocol Assessment</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Build your 30-day Sleep Protocol</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            We use your baseline to assign a sleep-first daily plan with Reset, Rebuild, and Stabilize phases.
          </p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-950">Where are you right now?</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">Rate each area from 1 to 10.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {scoreFields.map((field) => (
              <label key={field.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-800">{field.label}</span>
                  <span className="text-sm font-semibold text-slate-500">{assessment[field.key]}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={assessment[field.key]}
                  onChange={(event) =>
                    setAssessment((prev) => ({
                      ...prev,
                      [field.key]: Number(event.target.value),
                    }))
                  }
                  className="mt-3 w-full"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-950">What are you trying to change?</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">Select all that apply.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {sleepGoalOptions.map((goal) => {
              const selected = assessment.goals.includes(goal);
              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${selected ? "border-indigo-300 bg-indigo-50 text-indigo-800" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}
                >
                  {goal}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startPlan}
              disabled={!canSubmit}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {busy ? "Creating your protocol..." : "Create my 30-day Sleep Protocol"}
            </button>
            <Link
              href="/protocol/sleep"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Back to Sleep protocol page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
