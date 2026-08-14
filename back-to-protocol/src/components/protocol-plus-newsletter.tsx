"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export function ProtocolPlusNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailValid) {
      setError("Enter a valid email address to continue.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div
      className="relative overflow-hidden rounded-[24px] px-6 py-10 shadow-[0_18px_50px_rgba(15,23,42,0.14)] sm:px-12 sm:py-14"
      style={{ background: "linear-gradient(135deg, #0b1220 0%, #1e1b4b 45%, #0ea5e9 130%)" }}
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center text-white">
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Protocol+ newsletter
        </span>
        <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
          Get member pricing, research drops &amp; early access
        </h2>
        <p className="mt-3 max-w-lg text-sm text-white/75 sm:text-base">
          Join Protocol+ to unlock free delivery, priority research releases, and exclusive gear pricing —
          straight to your inbox, no spam.
        </p>

        {submitted ? (
          <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-5">
            <p className="text-sm font-semibold text-white">
              You&apos;re on the list! Confirm your email to activate Protocol+ perks.
            </p>
            <Link
              href="/protocol-plus"
              className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-blue-50"
            >
              Explore Protocol+
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="protocol-plus-email" className="sr-only">
                Email address
              </label>
              <input
                id="protocol-plus-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-14 w-full rounded-full border border-white/20 bg-white/95 px-6 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-inner outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/60"
              />
              <button
                type="submit"
                className="h-14 shrink-0 rounded-full bg-white px-7 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-blue-50"
              >
                Sign up
              </button>
            </div>
            {error ? <p className="mt-3 text-sm font-medium text-rose-200">{error}</p> : null}
            <p className="mt-4 text-xs text-white/60">
              By signing up you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-white">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-white">
                Terms
              </Link>
              . Prefer the app?{" "}
              <Link href="/protocol-plus" className="underline underline-offset-2 hover:text-white">
                Learn about Protocol+
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
