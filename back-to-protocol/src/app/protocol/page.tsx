import { PageShell } from "@/components/page-shell";

export default function ProtocolPage() {
  return (
    <PageShell
      eyebrow="Protocol"
      title="A single, clear way to think about recovery."
      description="A grounded framework for building calm, momentum, and sustainable performance without overwhelm."
    >
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">What it includes</p>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• Practical routines for everyday steadiness</li>
              <li>• A simple structure for calmer decision-making</li>
              <li>• Recovery habits that support long-term performance</li>
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200/80 bg-slate-950/5 p-6">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Why it works</p>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              The protocol is designed to feel useful, humane, and realistic rather than idealized or overly complicated.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
