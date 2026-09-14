import { ArrowRight, Check, FileText, LockKeyhole, Router, ShieldCheck, UserRound, UsersRound } from "lucide-react";
import Link from "next/link";

const reviewAreas = [
  {
    icon: ShieldCheck,
    title: "Security basics",
    description: "Account protection, updates, MFA, password habits, device security, and practical next steps.",
  },
  {
    icon: Router,
    title: "Wi-Fi and network health",
    description: "Coverage, speed, router placement, connected devices, guest access, and reliability problems.",
  },
  {
    icon: LockKeyhole,
    title: "Backups and recovery",
    description: "Whether your important photos, documents, and business files can be restored when you need them.",
  },
  {
    icon: FileText,
    title: "Your technology report",
    description: "A clear summary of what is working, what deserves attention, and the best order to handle it.",
  },
];

const personalReport = [
  "Phones, computers, tablets, printers, and smart-home technology",
  "Home Wi-Fi coverage, speed, and reliability",
  "Account security, updates, backups, and privacy basics",
  "A simple priority list that makes your next step obvious",
];

const businessReport = [
  "Users, devices, email, cloud tools, and shared accounts",
  "Wi-Fi, router setup, guest access, and network reliability",
  "MFA, password practices, backups, updates, and recovery readiness",
  "A practical report for improving security and reducing downtime",
];

export const metadata = {
  title: "Free Technology Checkup | Back to Protocol",
  description: "Get a free personal or small-business technology checkup focused on security, Wi-Fi, devices, and backups.",
};

export default function TechnologyCheckupPage() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="border-b border-[#17211b]/10 bg-[#17211b] text-white">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-12 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase text-[#9dd9b7]">Free technology checkup</p>
            <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Know what is secure, what is slowing you down, and what to fix first.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">We will review the technology around you or your business and give you a clear report with practical next steps. No technical vocabulary test. No pressure to buy anything.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/technology-checkup/assessment" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9dd9b7] px-6 font-semibold text-[#17211b]">Build my free report <ArrowRight className="h-4 w-4" /></Link>
              <a href="#what-we-review" className="inline-flex min-h-12 items-center justify-center border border-white/25 px-6 font-semibold text-white">See what we review</a>
            </div>
          </div>
          <div className="border border-white/15 bg-white/5 p-7 sm:p-9">
            <p className="text-xs font-bold uppercase text-[#9dd9b7]">You receive</p>
            <ul className="mt-6 space-y-4">
              {["A conversation about how you use technology", "A review focused on security and Wi-Fi", "A written report in plain language", "A prioritized plan for your next steps"].map((item) => <li key={item} className="flex gap-3 text-lg leading-7"><Check className="mt-1 h-5 w-5 shrink-0 text-[#9dd9b7]" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="what-we-review" className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">A useful starting point</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A full-picture look at the technology you depend on.</h2>
          <p className="mt-5 text-lg leading-8 text-[#5a685f]">The checkup is designed to show you the health of your setup, not overwhelm you with a list of problems. We focus on the details that affect safety, reliability, and everyday peace of mind.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviewAreas.map(({ icon: Icon, title, description }) => (
            <article key={title} className="border border-[#17211b]/15 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center bg-[#dff3e7] text-[#1f7a4d]"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-6 font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#607067]">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#17211b]/10 bg-[#e9f1eb]">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">Choose your report</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Built for the way you actually use technology.</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ReportCard icon={UserRound} title="Personal technology checkup" audience="For your home, family, and personal devices." items={personalReport} />
            <ReportCard icon={UsersRound} title="Small-business technology checkup" audience="For owners and teams who need a clearer view of their systems." items={businessReport} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-28">
        <div>
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">What happens next</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Clear answers, then a plan you can trust.</h2>
        </div>
        <div className="border-t border-[#17211b]/15">
          {["Tell us about your setup", "We review the important details with you", "You receive your report and priorities", "Choose what you want help with next"].map((step, index) => (
            <div key={step} className="grid gap-3 border-b border-[#17211b]/15 py-6 sm:grid-cols-[56px_1fr]">
              <span className="font-mono text-sm text-[#1f7a4d]">0{index + 1}</span>
              <p className="text-lg font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#dff3e7]">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">Start here</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Get your free technology report.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5a685f]">Tell us whether this is for your personal technology or your business, and we will take it from there.</p>
          </div>
          <Link href="/technology-checkup/assessment" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#17211b] px-6 font-semibold text-white">Build the free report <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}

function ReportCard({ icon: Icon, title, audience, items }: { icon: typeof UserRound; title: string; audience: string; items: string[] }) {
  return (
    <article className="border border-[#17211b]/15 bg-white p-7 sm:p-9">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center bg-[#17211b] text-[#9dd9b7]"><Icon className="h-5 w-5" /></div>
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-[#607067]">{audience}</p>
        </div>
      </div>
      <ul className="mt-7 space-y-4 border-t border-[#17211b]/15 pt-6 text-sm leading-6">
        {items.map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1f7a4d]" />{item}</li>)}
      </ul>
    </article>
  );
}
