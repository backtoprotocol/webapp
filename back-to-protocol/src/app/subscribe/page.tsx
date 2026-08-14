import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export const metadata = {
  title: "Protocol+ | Protocol+",
};

export default function SubscribePage() {
  return (
    <main className="relative overflow-hidden bg-white text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,_rgba(250,165,130,0.45),_rgba(255,255,255,0)_60%)]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-220px)] w-full max-w-6xl items-center gap-10 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-20">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <LogoMark className="h-14 w-14 rounded-2xl" />
            <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Protocol+</h1>
          </div>

          <p className="mt-6 text-2xl leading-relaxed text-slate-700 sm:text-3xl">
            Your daily recovery, media, and protocol portal.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/sign-in"
              className="inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Get the app
            </Link>
            <Link
              href="/account"
              className="inline-flex rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              View web portal
            </Link>
          </div>

          <div className="mt-10 w-fit rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.25)]">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fprotocolplus.app"
              alt="QR code to open Protocol+"
              className="h-[190px] w-[190px] rounded-xl border border-slate-100 bg-white p-2"
            />
            <p className="mt-3 max-w-[190px] text-center text-xs font-medium leading-5 text-slate-600">
              Scan with your phone to open Protocol+.
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[330px] justify-center lg:max-w-[380px]">
          <div className="relative w-full rounded-[2.6rem] border border-rose-200 bg-gradient-to-b from-[#111113] to-black p-3 shadow-[0_45px_130px_-50px_rgba(15,23,42,0.6)]">
            <div className="flex h-[620px] w-full flex-col overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0f0f11] px-4 pb-5 pt-4">
              <div className="mx-auto h-1.5 w-24 rounded-full bg-white/14" />

              <div className="mt-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                <span>Protocol+</span>
                <span>Home</span>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-200/20 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/45 p-4">
                <p className="text-[10px] uppercase tracking-[0.22em] text-amber-100/75">Protocol of the day</p>
                <p className="mt-2 text-lg font-semibold text-white">14 minute reset</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Focused breathing, mobility, and posture work to steady your day.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">Active plan</p>
                  <p className="mt-1 text-sm font-medium text-white">Back to protocol - Week 2</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">Library</p>
                  <p className="mt-1 text-sm font-medium text-white">Videos, audio, research</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-3">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">Momentum</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-amber-300 to-rose-300" />
                  </div>
                </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs font-semibold text-white/75">
                  App Store
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs font-semibold text-white/75">
                  Google Play
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
