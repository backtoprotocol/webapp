"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const CHOICE_COOKIE = "btp-privacy-choice";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180;
const ANALYTICS_TOKEN = "e69612ffa20344d1bced1de70dd0c141";
const OPEN_CHOICES_EVENT = "btp:open-privacy-choices";
const CHANGE_PREFERENCES_EVENT = "btp:privacy-choice-changed";

type PrivacyChoice = "essential" | "analytics";

type PreferencesSnapshot = {
  choice: PrivacyChoice | null;
  globalPrivacyControl: boolean;
  resolved: boolean;
};

const serverSnapshot: PreferencesSnapshot = {
  choice: null,
  globalPrivacyControl: false,
  resolved: false,
};

let cachedSnapshot = serverSnapshot;

function readChoice(): PrivacyChoice | null {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CHOICE_COOKIE}=`));
  const value = cookie?.slice(CHOICE_COOKIE.length + 1);

  return value === "essential" || value === "analytics" ? value : null;
}

function saveChoice(choice: PrivacyChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CHOICE_COOKIE}=${choice}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

function hasGlobalPrivacyControl(): boolean {
  return (
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

function getClientSnapshot(): PreferencesSnapshot {
  const savedChoice = readChoice();
  const globalPrivacyControl = hasGlobalPrivacyControl();
  const nextSnapshot: PreferencesSnapshot = {
    choice:
      globalPrivacyControl && savedChoice === "analytics"
        ? "essential"
        : savedChoice,
    globalPrivacyControl,
    resolved: true,
  };

  if (
    cachedSnapshot.choice !== nextSnapshot.choice ||
    cachedSnapshot.globalPrivacyControl !== nextSnapshot.globalPrivacyControl ||
    cachedSnapshot.resolved !== nextSnapshot.resolved
  ) {
    cachedSnapshot = nextSnapshot;
  }

  return cachedSnapshot;
}

function subscribeToPreferences(callback: () => void) {
  window.addEventListener(CHANGE_PREFERENCES_EVENT, callback);
  window.addEventListener("focus", callback);

  return () => {
    window.removeEventListener(CHANGE_PREFERENCES_EVENT, callback);
    window.removeEventListener("focus", callback);
  };
}

function notifyPreferenceChange() {
  window.dispatchEvent(new Event(CHANGE_PREFERENCES_EVENT));
}

export function PrivacyChoices() {
  const preferences = useSyncExternalStore(
    subscribeToPreferences,
    getClientSnapshot,
    () => serverSnapshot,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [persistenceWarning, setPersistenceWarning] = useState(false);

  useEffect(() => {
    const openChoices = () => setIsOpen(true);
    window.addEventListener(OPEN_CHOICES_EVENT, openChoices);

    return () => window.removeEventListener(OPEN_CHOICES_EVENT, openChoices);
  }, []);

  useEffect(() => {
    if (
      !preferences.resolved ||
      preferences.choice !== "analytics" ||
      preferences.globalPrivacyControl
    ) {
      return;
    }

    const script = document.createElement("script");
    script.id = "cloudflare-web-analytics";
    script.type = "module";
    script.src = "https://static.cloudflareinsights.com/beacon.min.js";
    script.dataset.cfBeacon = JSON.stringify({ token: ANALYTICS_TOKEN });
    script.addEventListener("error", () => {
      console.error("Cloudflare Web Analytics failed to load.");
    });
    document.head.appendChild(script);

    return () => script.remove();
  }, [preferences]);

  const choose = (nextChoice: PrivacyChoice) => {
    const effectiveChoice = preferences.globalPrivacyControl
      ? "essential"
      : nextChoice;
    saveChoice(effectiveChoice);
    notifyPreferenceChange();
    const saved = readChoice() === effectiveChoice;
    setPersistenceWarning(!saved);
    setIsOpen(!saved);
    setIsDismissed(false);

    if (
      preferences.choice === "analytics" &&
      effectiveChoice === "essential"
    ) {
      document.getElementById("cloudflare-web-analytics")?.remove();
      window.location.reload();
    }
  };

  if (
    !preferences.resolved ||
    ((preferences.choice !== null || isDismissed) &&
      !isOpen &&
      !persistenceWarning)
  ) {
    return null;
  }

  return (
    <section
      aria-label="Privacy choices"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-[#d6e0ed] bg-white p-5 text-[#28364b] shadow-[0_20px_70px_-20px_rgba(15,35,60,0.3)] sm:bottom-6 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em]">
            Your privacy choices
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5b687a]">
            We use optional Cloudflare Web Analytics to understand website
            visits and performance. It stays off unless you allow it. Your
            choice is saved in this browser for up to 180 days.
          </p>
          {preferences.globalPrivacyControl ? (
            <p className="mt-2 text-sm leading-6 text-[#5b687a]">
              Global Privacy Control is enabled in your browser, so optional
              analytics will remain off.
            </p>
          ) : null}
          <a
            href="/cookies#choices"
            className="mt-2 inline-flex text-sm font-medium text-[#1769c2] underline underline-offset-2 hover:text-[#1257a3]"
          >
            Read our Cookie Policy
          </a>
        </div>
        {preferences.choice !== null || persistenceWarning ? (
          <button
            type="button"
            aria-label="Close privacy choices"
            onClick={() => {
              setPersistenceWarning(false);
              setIsOpen(false);
              setIsDismissed(true);
            }}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d6e0ed] text-lg leading-none text-[#5b687a] hover:bg-[#f4f7fb]"
          >
            ×
          </button>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => choose("essential")}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#aebdd0] bg-white px-5 text-sm font-semibold text-[#28364b] transition hover:bg-[#f4f7fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769c2]"
        >
          Use essential only
        </button>
        <button
          type="button"
          onClick={() => choose("analytics")}
          disabled={preferences.globalPrivacyControl}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#aebdd0] bg-white px-5 text-sm font-semibold text-[#28364b] transition hover:bg-[#f4f7fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769c2] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Allow optional analytics
        </button>
      </div>
      {persistenceWarning ? (
        <p role="status" className="mt-3 text-sm text-[#8a4b08]">
          Your choice applies for this visit, but your browser did not save it.
          You may be asked again later.
        </p>
      ) : null}
    </section>
  );
}

export function PrivacyChoicesLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CHOICES_EVENT))}
      className="transition hover:text-[#2878ce]"
    >
      Privacy choices
    </button>
  );
}
