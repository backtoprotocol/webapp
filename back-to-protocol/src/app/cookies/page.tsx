import { PageShell } from "@/components/page-shell";

export default function CookiesPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Cookie policy"
      description="This site may use cookies and similar technologies to improve performance and user experience."
    >
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-10">
        <div className="space-y-6 text-slate-700 leading-8">
          <p>Cookies help remember your preferences and understand how visitors use the site.</p>
          <p>You can manage cookie settings through your browser. Disabling cookies may limit some site functionality.</p>
          <p>We use cookies only to provide a better browsing experience and improve site performance.</p>
        </div>
      </section>
    </PageShell>
  );
}
