import { PageShell } from "@/components/page-shell";

export default function AccessibilityPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Accessibility statement"
      description="We are committed to making this website accessible and usable for a wide range of visitors."
    >
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-10">
        <div className="space-y-6 text-slate-700 leading-8">
          <p>We aim to design pages with clear text, strong contrast, keyboard-friendly navigation, and readable spacing.</p>
          <p>If you experience any difficulty using the site, please contact us so we can improve the experience.</p>
        </div>
      </section>
    </PageShell>
  );
}
