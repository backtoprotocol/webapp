import Link from "next/link";
import { ArrowRight, Check, HardDrive, Laptop, Printer, Router, ShieldCheck } from "lucide-react";

const hardwareServices = [
  {
    icon: Laptop,
    title: "Computer and device matching",
    description: "A short list of equipment that fits your work, budget, software, and the way you actually use it.",
    items: ["Laptop, desktop, tablet, and monitor recommendations", "Compatibility checks before purchase", "New-device setup and data transfer"],
  },
  {
    icon: Router,
    title: "Wi-Fi and network equipment",
    description: "A more reliable network at home or work, with equipment chosen for your space instead of guesswork.",
    items: ["Router and mesh Wi-Fi recommendations", "Coverage and placement guidance", "Guest access and connected-device setup"],
  },
  {
    icon: Printer,
    title: "Printers and everyday equipment",
    description: "Get the accessories and shared equipment that work with your devices and your routine.",
    items: ["Printer and scanner setup", "Monitor, dock, webcam, and accessory matching", "Connection, updates, and handoff"],
  },
];

export const metadata = {
  title: "Hardware Help and Procurement | Back to Protocol",
  description: "Practical computer, Wi-Fi, printer, and technology hardware recommendations and setup.",
};

export default function HardwarePage() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="border-b border-[#17211b]/10 bg-[#e9f1eb]">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">Hardware</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Buy the right technology once, then enjoy using it.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#5a685f]">Tell us what you need and we will source the right equipment, compare options, look for available discounts, and deliver a setup that is ready to use. For growing teams, hardware procurement can be part of a broader Business IT plan.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/hardware/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17211b] px-6 font-semibold text-white">Request a hardware quote <ArrowRight className="h-4 w-4" /></Link>
            <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#17211b]/30 px-6 font-semibold">See how it works <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">Hardware support</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A better way to buy technology.</h2>
          <p className="mt-5 text-lg leading-8 text-[#5a685f]">You get a clear quote before anything is ordered. We handle the research, compatibility checks, vendor coordination, setup, and handoff while you keep ownership.</p>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {hardwareServices.map(({ icon: Icon, title, description, items }) => (
            <article key={title} className="flex flex-col border border-[#17211b]/15 bg-white p-7 sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center bg-[#17211b] text-[#9dd9b7]"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-7 font-serif text-3xl">{title}</h3>
              <p className="mt-4 leading-7 text-[#5a685f]">{description}</p>
              <ul className="mt-7 flex-1 space-y-3 border-t border-[#17211b]/15 pt-6 text-sm leading-6">
                {items.map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1f7a4d]" />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-[#17211b]/10 bg-[#dff3e7]">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase text-[#1f7a4d]">Procurement that pays for itself</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Spend with confidence. Save where we can.</h2>
              <p className="mt-5 text-lg leading-8 text-[#5a685f]">We look across reputable vendors and available business pricing before we recommend a purchase. Our quote shows the equipment, setup, and service clearly.</p>
            </div>
            <div className="border-t border-[#17211b]/15">
              {["Tell us what you need and your target budget", "We source compatible options and available discounts", "You approve a clear quote before ordering", "We configure, secure, and hand over the finished setup"].map((step, index) => <div key={step} className="grid gap-3 border-b border-[#17211b]/15 py-6 sm:grid-cols-[56px_1fr]"><span className="font-mono text-sm text-[#1f7a4d]">0{index + 1}</span><p className="text-lg font-semibold">{step}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#17211b]/10 bg-[#17211b] text-white">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12 lg:py-24">
          <div>
            <p className="text-xs font-bold uppercase text-[#9dd9b7]">What good hardware supports</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Security, Wi-Fi, and fewer surprises.</h2>
          </div>
          <div className="border-t border-white/20">
            {["Reliable equipment that matches your space and workload", "Up-to-date devices with sensible security settings", "Wi-Fi that covers the places you actually work", "A documented setup you can understand and maintain"].map((item) => <p key={item} className="flex gap-3 border-b border-white/15 py-5 text-lg leading-7"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#9dd9b7]" />{item}</p>)}
          </div>
        </div>
      </section>

      <section className="bg-[#17211b] text-white">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-6 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-20">
          <div><p className="text-xs font-bold uppercase text-[#9dd9b7]">Ready to buy better?</p><h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Get a hardware quote built around your real needs.</h2><p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">Send us the project, the equipment, or the problem. We will come back with practical options and a clear next step.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href="/hardware/quote" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#9dd9b7] px-6 font-semibold text-[#17211b]">Request my quote <ArrowRight className="h-4 w-4" /></Link><Link href="/services#business-it" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 border border-white/25 px-6 font-semibold text-white">Explore Business IT <ArrowRight className="h-4 w-4" /></Link></div>
        </div>
      </section>
    </main>
  );
}
