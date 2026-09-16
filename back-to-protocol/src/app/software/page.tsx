import Link from "next/link";
import { ArrowRight, Check, Cloud, KeyRound, Mail, ShieldCheck, Wrench } from "lucide-react";

const softwareServices = [
  {
    icon: ShieldCheck,
    title: "Security and account setup",
    description: "Make the important accounts harder to break into and easier to recover when something goes wrong.",
    items: ["MFA and sign-in security", "Password manager guidance", "Account recovery review", "Updates and device protection"],
  },
  {
    icon: Cloud,
    title: "Email and cloud tools",
    description: "Set up the services you use every day so files, email, calendars, and shared work stay organized.",
    items: ["Microsoft 365 and Google Workspace", "Cloud storage and file organization", "Shared calendars and team tools", "Business email and domain support"],
  },
  {
    icon: Wrench,
    title: "Software setup and cleanup",
    description: "Get your applications installed, configured, updated, and working together without the clutter.",
    items: ["App installation and configuration", "Browser and device settings", "Software updates and cleanup", "A plain-language handoff"],
  },
];

export const metadata = {
  title: "Software Setup and Security | Back to Protocol",
  description: "Software setup, account security, Microsoft 365, Google Workspace, cloud tools, and technology help.",
};

export default function SoftwarePage() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="border-b border-[#17211b]/10 bg-[#17211b] text-white">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-bold uppercase text-[#9dd9b7]">Software</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Make your accounts and software work for you.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">We help you choose, license, configure, and manage the software your home or business depends on, with clear pricing and practical implementation. For teams that need an ongoing partner, software procurement fits naturally inside Business IT.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/software/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9dd9b7] px-6 font-semibold text-[#17211b]">Request a software quote <ArrowRight className="h-4 w-4" /></Link>
            <a href="#software-services" className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/25 px-6 font-semibold text-white">Explore software services <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section id="software-services" className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">Software support</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Software that earns its place in your budget.</h2>
          <p className="mt-5 text-lg leading-8 text-[#5a685f]">We compare plans, review licensing needs, identify waste, and handle the setup so you can get value from the tools you pay for.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {softwareServices.map(({ icon: Icon, title, description, items }) => (
            <article key={title} className="flex flex-col border border-[#17211b]/15 bg-white p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center bg-[#dff3e7] text-[#1f7a4d]"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-7 font-serif text-3xl">{title}</h3>
              <p className="mt-4 leading-7 text-[#5a685f]">{description}</p>
              <ul className="mt-7 flex-1 space-y-3 border-t border-[#17211b]/15 pt-6 text-sm leading-6">
                {items.map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1f7a4d]" />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#17211b]/10 bg-[#dff3e7]">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div><p className="text-xs font-bold uppercase text-[#1f7a4d]">Software procurement</p><h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Pay for the right tools, not unused seats.</h2><p className="mt-5 text-lg leading-8 text-[#5a685f]">We can review your current subscriptions, compare alternatives, help access available business pricing, and give you a quote for setup and ongoing support.</p></div>
            <div className="border-t border-[#17211b]/15">{["Review the tools and subscriptions you use now", "Match plans and licenses to your people and workflow", "Identify available discounts and reduce unnecessary spend", "Configure security, permissions, and the finished workflow"].map((step, index) => <div key={step} className="grid gap-3 border-b border-[#17211b]/15 py-6 sm:grid-cols-[56px_1fr]"><span className="font-mono text-sm text-[#1f7a4d]">0{index + 1}</span><p className="text-lg font-semibold">{step}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#17211b]/10 bg-[#e9f1eb]">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24">
          <div><p className="text-xs font-bold uppercase text-[#1f7a4d]">A useful setup</p><h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Security is part of the setup, not an afterthought.</h2></div>
          <div className="border-t border-[#17211b]/15">
            {["Protect important accounts with stronger sign-in choices", "Make recovery possible before an account is locked", "Keep devices and software current", "Organize files and shared tools so the right people can use them"].map((item) => <p key={item} className="flex gap-3 border-b border-[#17211b]/15 py-5 text-lg leading-7"><KeyRound className="mt-1 h-5 w-5 shrink-0 text-[#1f7a4d]" />{item}</p>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1480px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
        <div className="border border-[#17211b]/15 bg-white p-7 sm:p-9"><Mail className="h-7 w-7 text-[#1f7a4d]" /><h2 className="mt-6 font-serif text-3xl">For personal technology</h2><p className="mt-4 leading-7 text-[#5a685f]">Get your email, photos, files, apps, devices, and accounts organized so technology feels less fragile.</p></div>
        <div className="border border-[#17211b]/15 bg-white p-7 sm:p-9"><Cloud className="h-7 w-7 text-[#1f7a4d]" /><h2 className="mt-6 font-serif text-3xl">For small businesses</h2><p className="mt-4 leading-7 text-[#5a685f]">Create a dependable foundation for email, shared files, staff access, security, and the systems your team uses every day.</p></div>
      </section>

      <section className="bg-[#17211b] text-white">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-20">
          <div><p className="text-xs font-bold uppercase text-[#9dd9b7]">Ready to improve your software stack?</p><h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Request a software quote tailored to your team.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">Tell us what you use, what you are considering, or what is costing too much. We will help you find the right next move.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href="/software/quote" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#9dd9b7] px-6 font-semibold text-[#17211b]">Request my quote <ArrowRight className="h-4 w-4" /></Link><Link href="/services#business-it" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 border border-white/25 px-6 font-semibold text-white">Explore Business IT <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>
    </main>
  );
}
