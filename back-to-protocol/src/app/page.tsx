import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CircleDot,
  Clock3,
  Code2,
  Headphones,
  HousePlug,
  Laptop,
  LifeBuoy,
  MonitorCog,
  Network,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { ProtocolPlusTeaser } from "@/components/protocol-plus-teaser";

const services = [
  {
    icon: BriefcaseBusiness,
    label: "Business IT",
    title: "An IT department that fits your business.",
    description: "Domains, email, Microsoft 365, Google Workspace, networks, and ongoing support.",
    price: "Starting at $149/month",
    href: "/services#business-it",
    color: "bg-[#9dd9b7] text-[#17211b]",
    badge: "Most Requested",
  },
  {
    icon: Code2,
    label: "Websites",
    title: "Build a site that earns its keep.",
    description: "Custom business websites, ongoing care, and the technical setup around them.",
    price: "Starting at $999",
    href: "/services#websites",
    color: "bg-[#dff3e7] text-[#165c3a]",
    badge: null as string | null,
  },
  {
    icon: LifeBuoy,
    label: "Tech help",
    title: "Get unstuck without the runaround.",
    description: "Remote troubleshooting for computers, Wi-Fi, printers, software, accounts, and devices.",
    price: "$99/hour",
    href: "/support",
    color: "bg-[#ffead8] text-[#98400c]",
    badge: null as string | null,
  },
];

const commonProblems = [
  { icon: Wifi, label: "Wi-Fi keeps dropping" },
  { icon: Laptop, label: "Computer is slow" },
  { icon: MonitorCog, label: "New device setup" },
  { icon: Network, label: "Business systems" },
  { icon: HousePlug, label: "Smart-home setup" },
  { icon: ShieldCheck, label: "Security & backups" },
];

const steps = [
  ["01", "Tell us what's wrong", "Submit a short request. Photos and error messages help, but they are not required."],
  ["02", "We diagnose it", "We decide whether remote help, an appointment, or a project quote is the right path."],
  ["03", "We get it handled", "You get a clear plan, transparent price, and one person accountable for the result."],
];

const trustPoints = [
  {
    icon: Headphones,
    title: "One person, start to finish",
    description: "No call center and no ticket queue between departments — you work directly with the person doing the work.",
  },
  {
    icon: BadgeCheck,
    title: "Clear pricing before we start",
    description: "You hear the likely cost and approach before billable work begins, so there are no surprise invoices.",
  },
  {
    icon: Clock3,
    title: "Remote-first, not remote-only",
    description: "Most issues are solved without an appointment. We schedule on-site visits only when the problem truly needs it.",
  },
  {
    icon: ShieldCheck,
    title: "Plain-language answers",
    description: "We explain what is wrong and what we are doing about it, without the jargon or the upsell pressure.",
  },
];

export const metadata = {
  title: "Back to Protocol | Your technology person",
  description: "Websites, technology support, and practical IT for people and small businesses.",
};

export default function Home() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="relative overflow-hidden border-b border-[#17211b]/10">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#f6f7f2_0%,#f6f7f2_56%,#dff3e7_56%,#dff3e7_100%)] max-lg:hidden" />
        <div className="relative mx-auto grid min-h-[650px] max-w-[1480px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-20">
          <div className="max-w-3xl fade-rise">
            <div className="inline-flex items-center gap-2 border border-[#17211b]/15 bg-white px-3 py-2 text-xs font-bold uppercase text-[#355244]">
              <CircleDot className="h-3.5 w-3.5 fill-[#1f7a4d] text-[#1f7a4d]" />
              Remote-first · Hendersonville, TN
            </div>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-[82px]">
              Technology should work for you.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4c5c52] sm:text-xl">
              Back to Protocol helps people and small businesses build, fix, and manage their technology. One expert, a clear answer, and no confusing handoffs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/technology-checkup/assessment" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17211b] px-6 py-3 font-semibold text-white transition hover:bg-[#294033]">
                Get your free checkup <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services#websites" className="inline-flex min-h-12 items-center justify-center border border-[#17211b]/25 bg-white px-6 py-3 font-semibold transition hover:border-[#17211b]">
                Build a website
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#4c5c52]">
              <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-[#1f7a4d]" /> Clear pricing</span>
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#1f7a4d]" /> Remote help first</span>
              <span className="flex items-center gap-2"><Headphones className="h-4 w-4 text-[#1f7a4d]" /> One person who knows your setup</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl fade-rise fade-delay-2">
            <div className="border border-[#17211b]/15 bg-[#17211b] p-5 text-white shadow-[16px_16px_0_#f3a45b] sm:p-7">
              <div className="flex items-center justify-between border-b border-white/15 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase text-[#9dd9b7]">Free technology checkup</p>
                  <p className="mt-1 text-xl font-semibold">See what to fix first.</p>
                </div>
                <LifeBuoy className="h-8 w-8 text-[#9dd9b7]" />
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {commonProblems.map(({ icon: Icon, label }) => (
                  <Link key={label} href={`/support?issue=${encodeURIComponent(label)}`} className="flex min-h-14 items-center gap-3 border border-white/15 bg-white/[0.06] px-4 text-sm font-medium transition hover:bg-white/[0.12]">
                    <Icon className="h-4 w-4 shrink-0 text-[#9dd9b7]" /> {label}
                  </Link>
                ))}
              </div>
              <Link href="/technology-checkup/assessment" className="mt-5 flex min-h-12 items-center justify-between bg-[#9dd9b7] px-4 font-semibold text-[#17211b] transition hover:bg-[#b7e8ca]">
                Get my free report <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">How we help</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Start with the outcome, not the jargon.</h2>
          <p className="mt-4 text-lg leading-8 text-[#5a685f]">Choose the path that sounds closest. We will sort out the technical details.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {services.map(({ icon: Icon, label, title, description, price, href, color, badge }) => (
            <Link key={label} href={href} className={`group relative flex min-h-[360px] flex-col border p-7 transition hover:-translate-y-1 sm:p-8 ${badge ? "border-[#17211b] bg-[#17211b] text-white shadow-[10px_10px_0_#f3a45b] hover:shadow-[14px_14px_0_#f3a45b]" : "border-[#17211b]/15 bg-white hover:shadow-[10px_10px_0_rgba(31,122,77,0.18)]"}`}>
              {badge ? (
                <span className="absolute -top-3 left-7 whitespace-nowrap rounded-full bg-[#f3a45b] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#17211b] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]">{badge}</span>
              ) : null}
              <div className={`flex h-12 w-12 items-center justify-center ${color}`}><Icon className="h-6 w-6" /></div>
              <p className={`mt-7 text-xs font-bold uppercase ${badge ? "text-white/60" : "text-[#607067]"}`}>{label}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight">{title}</h3>
              <p className={`mt-4 leading-7 ${badge ? "text-white/70" : "text-[#5a685f]"}`}>{description}</p>
              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <span className="text-sm font-semibold">{price}</span>
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#17211b]/10 bg-white">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-28">
          <div>
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">Protocol+</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">Never deal with a technology problem alone.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#5a685f]">A practical support membership for everyday questions, troubleshooting, and priority access when something stops working.</p>
            <Link href="/protocol-plus" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#165c3a] underline decoration-[#9dd9b7] decoration-2 underline-offset-4">
              Compare Protocol+ plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ProtocolPlusTeaser />
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">What happens next</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A clear path from problem to solved.</h2>
          </div>
          <div className="border-t border-[#17211b]/20">
            {steps.map(([number, title, description]) => (
              <div key={number} className="grid gap-3 border-b border-[#17211b]/20 py-7 sm:grid-cols-[64px_190px_1fr] sm:items-start">
                <span className="font-mono text-sm text-[#1f7a4d]">{number}</span>
                <h3 className="font-semibold">{title}</h3>
                <p className="leading-7 text-[#5a685f]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#17211b]/10 bg-white">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">Why people choose us</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Technology help without the runaround.</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border border-[#17211b]/15 bg-[#f6f7f2] p-6">
                <Icon className="h-6 w-6 text-[#1f7a4d]" />
                <h3 className="mt-5 font-semibold leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5a685f]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3a45b] text-[#17211b]">
        <div className="mx-auto grid max-w-[1480px] items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-12 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase">Not sure where to start?</p>
            <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">Tell us what is not working. We will figure out the rest.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/support" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17211b] px-6 font-semibold text-white">Request help <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/services#business-it" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#17211b]/40 bg-white/50 px-6 font-semibold"><BriefcaseBusiness className="h-4 w-4" /> Get a Business IT quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
