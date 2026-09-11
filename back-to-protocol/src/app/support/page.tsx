import { Clock3, Laptop, MapPin, ShieldCheck } from "lucide-react";
import { SupportRequestForm } from "@/components/support-request-form";

export const metadata = {
  title: "Get Technology Help | Back to Protocol",
  description: "Request remote computer, Wi-Fi, device, website, or small-business technology support.",
};

export default async function SupportPage({ searchParams }: { searchParams?: Promise<{ issue?: string }> }) {
  const params = searchParams ? await searchParams : {};
  const initialIssue = typeof params.issue === "string" ? params.issue : "";

  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="mx-auto grid max-w-[1480px] gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-12 lg:py-24">
        <div>
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">Request support</p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[1.02] sm:text-6xl">Tell us what is not working.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#5a685f]">You do not need to diagnose it first. Describe what you see and what you were trying to do. We will determine the right next step.</p>

          <div className="mt-10 border-t border-[#17211b]/15">
            {[
              [Laptop, "Remote help first", "Most computer, software, account, and website problems can be handled remotely."],
              [Clock3, "Clear scope and price", "We confirm the likely approach and cost before larger work begins."],
              [MapPin, "On-site when necessary", "Local appointments are scheduled only when the problem truly needs hands-on work."],
              [ShieldCheck, "Privacy matters", "Never include passwords, recovery codes, or payment details in your request."],
            ].map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof Laptop;
              return <div key={String(title)} className="grid grid-cols-[32px_1fr] gap-3 border-b border-[#17211b]/15 py-5"><ItemIcon className="mt-0.5 h-5 w-5 text-[#1f7a4d]" /><div><h2 className="font-semibold">{String(title)}</h2><p className="mt-1 text-sm leading-6 text-[#607067]">{String(text)}</p></div></div>;
            })}
          </div>
        </div>
        <div>
          <SupportRequestForm initialIssue={initialIssue} />
          <p className="mt-7 text-sm leading-6 text-[#607067]">For emergencies involving immediate danger, fire, suspected electrical damage, or active financial fraud, contact the appropriate emergency service, utility, bank, or device manufacturer first.</p>
        </div>
      </section>
    </main>
  );
}
