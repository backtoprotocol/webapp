import { PageShell } from "@/components/page-shell";

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of use"
      description="These terms govern your use of Back to Protocol and the content, services, and resources provided through the site."
    >
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-10">
        <div className="space-y-6 text-slate-700 leading-8">
          <p>By accessing this website, you agree to use it for informational and personal purposes only. You may not reproduce, redistribute, or misrepresent content without permission.</p>
          <p>All content is provided for educational and wellness-oriented purposes. It does not replace professional medical, psychological, or legal advice.</p>
          <p>You are responsible for your own decisions and actions based on any information found on the site.</p>
        </div>
      </section>
    </PageShell>
  );
}
