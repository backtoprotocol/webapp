import { PageShell } from "@/components/page-shell";

export default function SubscribePage() {
  return (
    <PageShell
      eyebrow="Subscribe"
      title="Join the newsletter for calm, practical updates."
      description="Get thoughtful guidance, fresh articles, and quiet encouragement delivered with intention."
    >
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">What you’ll receive</p>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• Practical recovery tools and thoughtful prompts</li>
              <li>• Fresh essays, podcast updates, and meaningful news</li>
              <li>• A calmer, more useful way to stay in the loop</li>
            </ul>
          </div>
          <form className="space-y-4 rounded-[1.75rem] border border-slate-200/80 bg-slate-950/5 p-6 shadow-sm shadow-slate-200/40">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email address</label>
              <input type="email" placeholder="you@domain.com" className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
            </div>
            <button type="button" className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
