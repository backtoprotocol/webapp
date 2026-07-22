import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="Why Back to Protocol exists."
      description="We build modern psychology systems for people who need more than advice. Back to Protocol is for those rebuilding from breakdown, recovering from overload, and returning to their strongest self."
    >
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200/80 bg-slate-950/5 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)]">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Mission</p>
          <p className="mt-4 text-lg leading-8 text-slate-700">Provide elegant, research-informed protocols that help people recover with confidence.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200/80 bg-slate-950/5 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)]">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Approach</p>
          <p className="mt-4 text-lg leading-8 text-slate-700">Combine human performance, clinical insight, and premium design to make psychology feel intuitive and powerful.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200/80 bg-slate-950/5 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)]">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Vision</p>
          <p className="mt-4 text-lg leading-8 text-slate-700">Create a psychology platform that feels as seamless and premium as the best technology experiences.</p>
        </div>
      </section>
    </PageShell>
  );
}
