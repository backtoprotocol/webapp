export const protocolCatalog = [
  "movement",
  "nutrition",
  "sleep",
  "stress",
  "relationships",
  "recovery",
  "longevity",
  "mindset",
] as const;

export type ProtocolSlug = (typeof protocolCatalog)[number];

export type UserProtocolState = {
  userId: string;
  activeProtocols: ProtocolSlug[];
  updatedAt: string;
};

const DEFAULT_ACTIVE_PROTOCOLS: ProtocolSlug[] = ["sleep"];

function storageKey(userId: string) {
  return `protocolplus:active-protocols:${userId}`;
}

function hasWindow() {
  return typeof window !== "undefined";
}

export function getDefaultActiveProtocols(): ProtocolSlug[] {
  return [...DEFAULT_ACTIVE_PROTOCOLS];
}

export function getStoredProtocolState(userId: string): UserProtocolState | null {
  if (!hasWindow()) return null;

  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as UserProtocolState;
    if (!parsed || parsed.userId !== userId || !Array.isArray(parsed.activeProtocols)) {
      return null;
    }

    const activeProtocols = parsed.activeProtocols.filter((slug): slug is ProtocolSlug => protocolCatalog.includes(slug as ProtocolSlug));

    return {
      userId,
      activeProtocols,
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveProtocolState(state: UserProtocolState) {
  if (!hasWindow()) return;
  window.localStorage.setItem(storageKey(state.userId), JSON.stringify(state));
}

export function createProtocolState(userId: string, activeProtocols: ProtocolSlug[] = DEFAULT_ACTIVE_PROTOCOLS): UserProtocolState {
  const next: UserProtocolState = {
    userId,
    activeProtocols: normalizeActiveProtocols(activeProtocols),
    updatedAt: new Date().toISOString(),
  };

  saveProtocolState(next);
  return next;
}

export function normalizeActiveProtocols(activeProtocols: ProtocolSlug[]): ProtocolSlug[] {
  const seen = new Set<ProtocolSlug>();
  const next: ProtocolSlug[] = [];

  for (const slug of activeProtocols) {
    if (!protocolCatalog.includes(slug) || seen.has(slug)) {
      continue;
    }

    seen.add(slug);
    next.push(slug);
  }

  return next;
}

export function addProtocol(state: UserProtocolState, slug: ProtocolSlug): UserProtocolState {
  if (state.activeProtocols.includes(slug)) {
    return state;
  }

  const next: UserProtocolState = {
    ...state,
    activeProtocols: normalizeActiveProtocols([...state.activeProtocols, slug]),
    updatedAt: new Date().toISOString(),
  };

  saveProtocolState(next);
  return next;
}

export function removeProtocol(state: UserProtocolState, slug: ProtocolSlug): UserProtocolState {
  const nextProtocols = state.activeProtocols.filter((item) => item !== slug);
  const next: UserProtocolState = {
    ...state,
    activeProtocols: normalizeActiveProtocols(nextProtocols),
    updatedAt: new Date().toISOString(),
  };

  saveProtocolState(next);
  return next;
}

export function resetProtocolState(userId: string): UserProtocolState {
  return createProtocolState(userId, DEFAULT_ACTIVE_PROTOCOLS);
}

export function getProtocolStartHref(slug: ProtocolSlug) {
  return slug === "sleep" ? "/protocol/sleep/start" : `/protocol/${slug}`;
}
