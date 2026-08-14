import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export const metadata = {
  title: "Protocol+ | Protocol+",
};

export default function SubscribePage() {
  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-white text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_bottom,_rgba(250,165,130,0.45),_rgba(255,255,255,0)_60%)]" />

      <section className="relative mx-auto grid min-h-[calc(100svh-86px)] w-full max-w-6xl items-center gap-10 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-14">
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

          <div className="mt-10 w-fit rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_20px_55px_-28px_rgba(15,23,42,0.25)] mx-auto lg:mx-0 lg:ml-16">
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

        <div className="mx-auto flex w-full max-w-[280px] justify-center lg:max-w-[320px]">
          <div className="relative w-full">
            <div className="pointer-events-none absolute -left-8 top-10 h-16 w-1.5 rounded-full bg-slate-300/70" />
            <div className="pointer-events-none absolute -left-8 top-32 h-28 w-1.5 rounded-full bg-slate-300/70" />
            <div className="pointer-events-none absolute -right-8 top-24 h-20 w-1.5 rounded-full bg-slate-300/70" />

            <div className="relative rounded-[2.8rem] border border-white/50 bg-[linear-gradient(160deg,#11141b_0%,#0a0d14_55%,#202734_100%)] p-[9px] shadow-[0_55px_140px_-45px_rgba(2,132,199,0.55)]">
              <div className="pointer-events-none absolute inset-1 rounded-[2.45rem] bg-[linear-gradient(130deg,rgba(255,255,255,0.22),transparent_26%,transparent_74%,rgba(255,255,255,0.08))]" />

              <div className="relative flex h-[560px] w-full flex-col overflow-hidden rounded-[2.35rem] border border-white/10 bg-[linear-gradient(180deg,#0b0f18_0%,#090d14_100%)] px-4 pb-5 pt-4">
                <div className="mx-auto flex h-7 w-28 items-center justify-center rounded-full bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                  <div className="h-1.5 w-14 rounded-full bg-white/20" />
                </div>

                <div className="mt-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
                  <span>9:41</span>
                  <span>Protocol+</span>
                  <span>5G</span>
                </div>

                <div className="mt-4 rounded-2xl border border-cyan-200/20 bg-[linear-gradient(135deg,#0f172a_0%,#0c344b_55%,#13365a_100%)] p-4 shadow-[0_18px_45px_-30px_rgba(14,116,144,0.85)]">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/80">Protocol of the day</p>
                  <p className="mt-2 text-lg font-semibold text-white">14 minute reset</p>
                  <p className="mt-2 text-sm leading-6 text-cyan-50/80">
                    Focused breathing, mobility, and posture work to steady your day.
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">Active plan</p>
                    <p className="mt-1 text-sm font-medium text-white">Back to protocol - Week 2</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">Library</p>
                    <p className="mt-1 text-sm font-medium text-white">Videos, audio, research</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/50">Momentum</p>
                      <p className="text-[10px] font-semibold text-cyan-100/85">75%</p>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/15 bg-white/[0.07] px-3 py-2 text-center text-xs font-semibold text-white/85">
                    App Store
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/[0.07] px-3 py-2 text-center text-xs font-semibold text-white/85">
                    Google Play
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
