import { PageShell } from "@/components/page-shell";

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy policy"
      description="This policy explains how Back to Protocol handles the information you share with us through the site."
    >
      <section className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-8 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-10">
        <div className="space-y-6 text-slate-700 leading-8">
          <p>We collect contact information you provide voluntarily, such as when you subscribe to updates or contact us through the site.</p>
          <p>We use this information to respond to your inquiries, send updates you request, and improve the site experience.</p>
          <p>You may request access, correction, or deletion of your personal information by contacting the site owner.</p>
        </div>
      </section>
    </PageShell>
  );
}
