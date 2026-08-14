export const sleepGoalOptions = [
  "Get my life back on track",
  "Recover from a breakup",
  "Fix my sleep",
  "Get back in shape",
  "Reduce stress",
  "Build discipline",
  "Improve my mental wellbeing",
  "Build better habits",
] as const;

export type SleepGoalOption = (typeof sleepGoalOptions)[number];

export type SleepAssessment = {
  sleep: number;
  energy: number;
  stress: number;
  movement: number;
  nutrition: number;
  mood: number;
  relationships: number;
  motivation: number;
  goals: SleepGoalOption[];
};

export type SleepBaseline = {
  primaryFocus: "Sleep";
  secondaryFocus: "Movement" | "Stress" | "Recovery";
  supportingFocus: "Mindset" | "Nutrition" | "Relationships";
  summary: string;
};

export type SleepAction = {
  id: string;
  pillar: "Sleep" | "Movement" | "Nutrition" | "Recovery" | "Mindset" | "Stress";
  title: string;
  detail: string;
};

export type SleepDayPlan = {
  day: number;
  phase: "Reset" | "Rebuild" | "Stabilize";
  title: string;
  why: string;
  actions: SleepAction[];
};

export type SleepDayLog = {
  completedActionIds: string[];
  updatedAt: string;
};

export type SleepProtocolPlan = {
  version: 1;
  userId: string;
  startedAt: string;
  assessment: SleepAssessment;
  baseline: SleepBaseline;
  dailyLogs: Record<string, SleepDayLog>;
};

const TOTAL_DAYS = 30;

const phaseTitles: Array<{ phase: "Reset" | "Rebuild" | "Stabilize"; title: string; why: string }> = [
  { phase: "Reset", title: "Set your sleep anchor", why: "Consistency lowers nervous-system noise and starts recovery." },
  { phase: "Reset", title: "Protect your evening", why: "Sleep quality improves when your final hour is predictable." },
  { phase: "Reset", title: "Move early, unwind early", why: "Morning movement and early wind-down improve circadian timing." },
  { phase: "Reset", title: "Reduce late stimulation", why: "Lower evening stimulation supports faster sleep onset." },
  { phase: "Reset", title: "Light and food timing reset", why: "Light exposure and meal timing shape sleep pressure." },
  { phase: "Reset", title: "Stress downshift day", why: "Downregulation before bed supports deeper recovery." },
  { phase: "Reset", title: "End of week calibration", why: "Small adjustments now make week two more sustainable." },
  { phase: "Rebuild", title: "Rebuild your evening routine", why: "Ritualized evenings reduce decision fatigue and inconsistency." },
  { phase: "Rebuild", title: "Add daytime structure", why: "Daytime rhythm directly supports nighttime sleep." },
  { phase: "Rebuild", title: "Increase sleep quality", why: "Sleep depth improves with stronger behavioral signals." },
  { phase: "Rebuild", title: "Strengthen recovery stack", why: "Recovery actions reduce stress load before bedtime." },
  { phase: "Rebuild", title: "Sleep and stress integration", why: "Better stress control protects sleep continuity." },
  { phase: "Rebuild", title: "Consistency over intensity", why: "Steady repetition beats occasional perfect days." },
  { phase: "Rebuild", title: "Midpoint reflection", why: "Reflection keeps your plan realistic and effective." },
  { phase: "Rebuild", title: "Week three reset", why: "Refreshing your cues prevents drift." },
  { phase: "Rebuild", title: "Rebuild momentum", why: "Momentum compounds when actions stay simple and repeatable." },
  { phase: "Rebuild", title: "Protect sleep boundaries", why: "Clear boundaries prevent sleep from getting crowded out." },
  { phase: "Rebuild", title: "Dial in pre-bed routine", why: "A repeatable wind-down improves sleep readiness." },
  { phase: "Rebuild", title: "Recover from disruption", why: "Fast recovery after bad nights keeps streaks alive." },
  { phase: "Rebuild", title: "Lower evening activation", why: "Lowering activation helps your brain transition into sleep." },
  { phase: "Rebuild", title: "End of rebuild phase", why: "You are now ready to stabilize this routine long-term." },
  { phase: "Stabilize", title: "Stabilize the baseline", why: "Stability turns short-term progress into lasting behavior." },
  { phase: "Stabilize", title: "Make sleep automatic", why: "Automation reduces reliance on motivation." },
  { phase: "Stabilize", title: "Stress-proof the routine", why: "Resilient routines survive high-pressure days." },
  { phase: "Stabilize", title: "Travel and schedule resilience", why: "Adaptive rules protect progress during disruptions." },
  { phase: "Stabilize", title: "Precision adjustments", why: "Small precision changes improve consistency and quality." },
  { phase: "Stabilize", title: "Protect recovery identity", why: "Identity-driven habits stick longer than temporary goals." },
  { phase: "Stabilize", title: "Consolidate habits", why: "Consolidation prevents regression after the program ends." },
  { phase: "Stabilize", title: "Prepare handoff", why: "A next-step plan maintains momentum past day 30." },
  { phase: "Stabilize", title: "Completion and next protocol", why: "Completion is a transition point, not an endpoint." },
];

const actionTemplates: SleepAction[] = [
  { id: "move-20", pillar: "Movement", title: "20-minute walk", detail: "Take a light walk before 4 PM." },
  { id: "caffeine-cutoff", pillar: "Nutrition", title: "Caffeine cutoff", detail: "No caffeine after 2 PM." },
  { id: "winddown-10", pillar: "Sleep", title: "10-minute wind-down", detail: "Use one calm activity before bed." },
  { id: "phone-away", pillar: "Recovery", title: "Phone away window", detail: "Keep phone away for 30 minutes before sleep." },
  { id: "wake-anchor", pillar: "Sleep", title: "Wake-time anchor", detail: "Wake within a 45-minute window." },
  { id: "breath-reset", pillar: "Stress", title: "Breath reset", detail: "Complete 2 minutes of slow breathing in the evening." },
  { id: "room-cool", pillar: "Sleep", title: "Optimize environment", detail: "Dark, cool room and low light after sunset." },
  { id: "journal-3", pillar: "Mindset", title: "3-line unload", detail: "Write worries and tomorrow priorities before bed." },
];

function dayActions(day: number): SleepAction[] {
  const offset = (day - 1) % actionTemplates.length;
  return [
    actionTemplates[offset % actionTemplates.length],
    actionTemplates[(offset + 1) % actionTemplates.length],
    actionTemplates[(offset + 2) % actionTemplates.length],
    actionTemplates[(offset + 3) % actionTemplates.length],
  ].map((item, index) => ({ ...item, id: `${item.id}-${day}-${index + 1}` }));
}

export const sleep30DayPlan: SleepDayPlan[] = Array.from({ length: TOTAL_DAYS }, (_, index) => {
  const day = index + 1;
  const meta = phaseTitles[index];
  return {
    day,
    phase: meta.phase,
    title: meta.title,
    why: meta.why,
    actions: dayActions(day),
  };
});

export function deriveSleepBaseline(assessment: SleepAssessment): SleepBaseline {
  const secondaryFocus = assessment.movement <= assessment.stress ? "Movement" : "Stress";
  const supportingFocus = assessment.motivation <= assessment.nutrition ? "Mindset" : "Nutrition";

  return {
    primaryFocus: "Sleep",
    secondaryFocus,
    supportingFocus,
    summary:
      "Your biggest opportunity right now is recovery. Sleep consistency should come first, then we layer movement and stress control around it.",
  };
}

function storageKey(userId: string) {
  return `protocolplus:sleep-plan:${userId}`;
}

function hasWindow() {
  return typeof window !== "undefined";
}

export function getStoredSleepPlan(userId: string): SleepProtocolPlan | null {
  if (!hasWindow()) return null;

  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SleepProtocolPlan;
    if (parsed?.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSleepPlan(plan: SleepProtocolPlan) {
  if (!hasWindow()) return;
  window.localStorage.setItem(storageKey(plan.userId), JSON.stringify(plan));
}

export function createSleepPlan(userId: string, assessment: SleepAssessment): SleepProtocolPlan {
  const plan: SleepProtocolPlan = {
    version: 1,
    userId,
    startedAt: new Date().toISOString(),
    assessment,
    baseline: deriveSleepBaseline(assessment),
    dailyLogs: {},
  };

  saveSleepPlan(plan);
  return plan;
}

export function getSleepDayNumber(plan: SleepProtocolPlan, now = new Date()): number {
  const start = new Date(plan.startedAt);
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = nowDay.getTime() - startDay.getTime();
  const day = Math.floor(diffMs / 86400000) + 1;
  return Math.min(TOTAL_DAYS, Math.max(1, day));
}

export function getSleepDayPlan(day: number): SleepDayPlan {
  const safeDay = Math.min(TOTAL_DAYS, Math.max(1, day));
  return sleep30DayPlan[safeDay - 1];
}

export function toggleSleepAction(
  plan: SleepProtocolPlan,
  day: number,
  actionId: string,
): SleepProtocolPlan {
  const key = String(day);
  const current = plan.dailyLogs[key] ?? { completedActionIds: [], updatedAt: new Date().toISOString() };
  const exists = current.completedActionIds.includes(actionId);
  const completedActionIds = exists
    ? current.completedActionIds.filter((id) => id !== actionId)
    : [...current.completedActionIds, actionId];

  const next: SleepProtocolPlan = {
    ...plan,
    dailyLogs: {
      ...plan.dailyLogs,
      [key]: {
        ...current,
        completedActionIds,
        updatedAt: new Date().toISOString(),
      },
    },
  };

  saveSleepPlan(next);
  return next;
}

export function getSleepProgress(plan: SleepProtocolPlan) {
  const completedDays = Object.values(plan.dailyLogs).filter((log) => log.completedActionIds.length > 0).length;
  const completionPercent = Math.round((completedDays / TOTAL_DAYS) * 100);
  const currentDay = getSleepDayNumber(plan);
  const streak = Math.min(currentDay, completedDays);
  return {
    completedDays,
    completionPercent,
    currentDay,
    streak,
    totalDays: TOTAL_DAYS,
  };
}

export function getSleepCompletedDays(plan: SleepProtocolPlan): number[] {
  return Object.keys(plan.dailyLogs)
    .map((day) => Number(day))
    .filter((day) => Number.isFinite(day) && plan.dailyLogs[String(day)]?.completedActionIds.length > 0)
    .sort((left, right) => left - right);
}

export function getSleepRecentActivity(plan: SleepProtocolPlan, limit = 5) {
  return Object.entries(plan.dailyLogs)
    .map(([day, log]) => ({ day: Number(day), log }))
    .filter(({ day, log }) => Number.isFinite(day) && log.completedActionIds.length > 0)
    .sort((left, right) => right.day - left.day)
    .slice(0, limit)
    .map(({ day, log }) => ({
      day,
      completedActionCount: log.completedActionIds.length,
      updatedAt: log.updatedAt,
    }));
}

export function getSleepProtocolEntryHref(slug: string) {
  return slug === "sleep" ? "/protocol/sleep/start" : `/protocol/${slug}`;
}
