import Link from "next/link";
import { Suspense } from "react";
import { LogoMark } from "@/components/logo-mark";
import { SignInForm } from "@/components/sign-in-form";

export const metadata = {
  title: "Sign In | Protocol+",
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f1] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[380px_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)]">
        <section className="relative overflow-hidden border-b border-slate-200 bg-white px-6 py-8 lg:border-b-0 lg:border-r lg:border-slate-200 lg:px-12 lg:py-10">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Back to main menu">
            <LogoMark className="h-8 w-8" />
            <span className="text-2xl font-semibold tracking-tight text-slate-950">Protocol+</span>
          </Link>

          <div className="mt-16 max-w-[20rem] space-y-6 lg:mt-24">
            <h1 className="text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-[2.4rem]">
              Return to the routines that keep you steady every day.
            </h1>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/protocol-plus"
                className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Get the app
              </Link>
              <Link
                href="/"
                className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to main menu
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-16 flex h-[420px] w-[240px] items-center justify-center lg:mt-24 lg:h-[470px] lg:w-[270px]">
            <div className="absolute inset-6 rounded-full bg-slate-300/60 blur-3xl" />
            <div className="relative h-full w-full rounded-[2.75rem] border border-slate-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-3 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.75)]">
              <div className="flex h-full flex-col overflow-hidden rounded-[2.2rem] border border-white/8 bg-[#111111] px-4 pb-5 pt-4">
                <div className="mx-auto h-1.5 w-20 rounded-full bg-white/12" />
                <div className="mt-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  <span>Morning</span>
                  <span>Calm</span>
                </div>
                <div className="mt-5 rounded-[1.5rem] border border-cyan-300/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/60 p-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/65">Daily reset</p>
                  <p className="mt-3 text-xl font-semibold">14 min recovery</p>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Breathwork, mobility, and focus prompts for a calmer start.
                  </p>
                </div>
                <div className="mt-5 space-y-3 text-sm text-white/75">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Sleep score</p>
                    <p className="mt-1 text-lg font-semibold text-white">7h 52m</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Focus block</p>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 to-blue-400" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Check-in</p>
                    <div className="mt-2 flex gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      <span className="h-2 w-2 rounded-full bg-cyan-300/45" />
                      <span className="h-2 w-2 rounded-full bg-cyan-300/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex justify-center overflow-y-auto bg-[#f5f5f1] px-6 pb-16 pt-10 sm:px-10 sm:pt-12 lg:items-start lg:px-16 lg:pb-12 lg:pt-16 xl:pt-20">
          <Suspense fallback={<div className="mt-8 text-sm text-slate-500">Loading sign in…</div>}>
            <SignInForm />
          </Suspense>
        </section>
      </div>
    </main>
  );
}