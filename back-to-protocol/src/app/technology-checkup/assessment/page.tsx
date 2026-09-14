import { Check } from "lucide-react";
import { TechnologyCheckupForm } from "@/components/technology-checkup-form";

export const metadata = {
  title: "Build Your Free Technology Report | Back to Protocol",
  description: "Complete a guided personal or small-business technology assessment and receive a free report with practical priorities.",
};

export default function TechnologyCheckupAssessmentPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f2] px-5 py-10 text-[#17211b] sm:px-8 lg:px-12 lg:py-16">
      <section className="mx-auto max-w-[980px] motion-safe:animate-[assessment-rise_700ms_cubic-bezier(0.18,0.7,0.18,1)_both]">
        <TechnologyCheckupForm />
        <div className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#607067]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1f7a4d]" />Your answers create a customer record and a clear technology report. Never include passwords, recovery codes, payment details, or private client information.</div>
      </section>
    </main>
  );
}
