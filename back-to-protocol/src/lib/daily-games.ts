export type DailyStats = {
  played: number;
  wins: number;
  streak: number;
  bestStreak: number;
  lastPlayedKey?: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function getDailyKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function hashString(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const out = [...items];
  let state = hashString(seed) || 1;
  for (let i = out.length - 1; i > 0; i -= 1) {
    state = (1664525 * state + 1013904223) >>> 0;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function pickDaily<T>(items: readonly T[], gameId: string, dateKey = getDailyKey()): T {
  if (!items.length) {
    throw new Error("pickDaily requires a non-empty item list");
  }
  const seed = hashString(`${gameId}:${dateKey}`);
  return items[seed % items.length];
}

export function readStats(storageKey: string): DailyStats {
  if (typeof window === "undefined") {
    return { played: 0, wins: 0, streak: 0, bestStreak: 0 };
  }
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return { played: 0, wins: 0, streak: 0, bestStreak: 0 };
  }

  try {
    const parsed = JSON.parse(raw) as DailyStats;
    return {
      played: parsed.played ?? 0,
      wins: parsed.wins ?? 0,
      streak: parsed.streak ?? 0,
      bestStreak: parsed.bestStreak ?? 0,
      lastPlayedKey: parsed.lastPlayedKey,
    };
  } catch {
    return { played: 0, wins: 0, streak: 0, bestStreak: 0 };
  }
}

export function writeStats(storageKey: string, stats: DailyStats): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(storageKey, JSON.stringify(stats));
}

function dayToNumber(dayKey: string): number {
  return Math.floor(new Date(`${dayKey}T00:00:00Z`).getTime() / DAY_MS);
}

export function recordDailyResult(stats: DailyStats, dayKey: string, didWin: boolean): DailyStats {
  const alreadyPlayedToday = stats.lastPlayedKey === dayKey;
  if (alreadyPlayedToday) {
    return stats;
  }

  const nextPlayed = stats.played + 1;
  const nextWins = didWin ? stats.wins + 1 : stats.wins;

  let nextStreak = stats.streak;
  if (didWin) {
    if (!stats.lastPlayedKey) {
      nextStreak = 1;
    } else {
      const gap = dayToNumber(dayKey) - dayToNumber(stats.lastPlayedKey);
      nextStreak = gap === 1 ? stats.streak + 1 : 1;
    }
  } else {
    nextStreak = 0;
  }

  return {
    played: nextPlayed,
    wins: nextWins,
    streak: nextStreak,
    bestStreak: Math.max(stats.bestStreak, nextStreak),
    lastPlayedKey: dayKey,
  };
}
