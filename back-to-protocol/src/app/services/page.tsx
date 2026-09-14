import Link from "next/link";
import { ArrowRight, Check, Code2, LifeBuoy, BriefcaseBusiness } from "lucide-react";

const offers = [
  {
    id: "business-it",
    icon: BriefcaseBusiness,
    eyebrow: "Business IT",
    title: "Your outsourced IT department.",
    description: "For small businesses that do not have their own IT person or department. Plans are customized to the number of users, devices, and support you need.",
    items: ["Microsoft 365 and Google Workspace assistance", "Business email, domain, and DNS support", "Website support", "Computer and software assistance", "Basic network troubleshooting", "Technology consulting", "Named business contact and priority support"],
    pricing: [{ label: "Protocol Business", price: "Starting at $149/month" }],
    note: "Plans include a defined monthly support allowance. Additional work, projects, hardware, software, parts, third-party services, and on-site work may be billed separately. Contact us for a custom plan.",
    cta: "Plan your business IT",
    badge: "Most Requested",
  },
  {
    id: "websites",
    icon: Code2,
    eyebrow: "Websites",
    title: "A website that works as hard as you do.",
    description: "Professional websites designed and built for individuals, startups, and small businesses, with ongoing care to keep everything running.",
    items: ["Custom website design", "Mobile responsive design", "Contact forms", "Domain connection", "Basic SEO setup", "Analytics setup", "Deployment and launch"],
    pricing: [
      { label: "Website Development", price: "Starting at $999" },
      { label: "Website Care", price: "$79/month" },
    ],
    note: "Larger or more complex websites receive a custom quote. Website Care covers hosting, backups, updates, basic security monitoring, and small content changes — major redesigns, new features, and custom development are quoted separately.",
    cta: "Discuss a website",
    badge: null as string | null,
  },
  {
    id: "tech-support",
    icon: LifeBuoy,
    eyebrow: "Tech Support",
    title: "Having a technology problem? We can help.",
    description: "We diagnose and fix everyday technology issues for individuals and small businesses. A few examples of what this covers:",
    items: ["Computer troubleshooting and setup", "Device and software setup", "Printer and Wi-Fi troubleshooting", "Network troubleshooting", "Email and account setup", "Data transfers", "Website troubleshooting", "General technology troubleshooting"],
    pricing: [{ label: "Tech Support", price: "$99/hour" }],
    note: null,
    cta: "Request tech help",
    badge: null as string | null,
  },
];

export const metadata = {
  title: "Technology Services | Back to Protocol",
  description: "Websites, technology support, and small-business IT services.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="border-b border-[#17211b]/10 bg-[#dff3e7]">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-bold uppercase text-[#1f7a4d]">Technology services</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">The technology department for people who do not have one.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#4c5c52]">Bring us a broken workflow, a website idea, or the technology you are tired of managing. We will turn it into a clear plan.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="space-y-8">
          {offers.map(({ id, icon: Icon, eyebrow, title, description, items, pricing, note, cta, badge }) => (
            <article id={id} key={id} className={`relative scroll-mt-28 border p-7 sm:p-10 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:p-14 ${badge ? "border-[#17211b] bg-[#17211b] text-white" : "border-[#17211b]/15 bg-white"}`}>
              {badge ? (
                <span className="absolute -top-3 left-10 whitespace-nowrap rounded-full bg-[#f3a45b] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#17211b] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]">{badge}</span>
              ) : null}
              <div>
                <div className={`flex h-12 w-12 items-center justify-center ${badge ? "bg-[#9dd9b7] text-[#17211b]" : "bg-[#17211b] text-[#9dd9b7]"}`}><Icon className="h-6 w-6" /></div>
                <p className={`mt-6 text-xs font-bold uppercase ${badge ? "text-[#9dd9b7]" : "text-[#1f7a4d]"}`}>{eyebrow}</p>
                <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight">{title}</h2>
                <p className={`mt-5 max-w-xl leading-7 ${badge ? "text-white/70" : "text-[#5a685f]"}`}>{description}</p>
              </div>
              <div className={`mt-10 border-t pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 ${badge ? "border-white/15" : "border-[#17211b]/15"}`}>
                <ul className="space-y-4">
                  {items.map((item) => <li key={item} className="flex gap-3"><Check className={`mt-0.5 h-5 w-5 shrink-0 ${badge ? "text-[#9dd9b7]" : "text-[#1f7a4d]"}`} /><span>{item}</span></li>)}
                </ul>
                <div className={`mt-8 space-y-3 border-t pt-6 ${badge ? "border-white/15" : "border-[#17211b]/15"}`}>
                  {pricing.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4">
                      <span className={`text-sm font-semibold ${badge ? "text-white/70" : "text-[#5a685f]"}`}>{row.label}</span>
                      <span className="text-2xl font-semibold">{row.price}</span>
                    </div>
                  ))}
                </div>
                {note ? <p className={`mt-4 text-sm leading-6 ${badge ? "text-white/60" : "text-[#607067]"}`}>{note}</p> : null}
                <Link href={`/support?issue=${encodeURIComponent(eyebrow)}`} className={`mt-6 inline-flex min-h-12 items-center gap-2 px-5 font-semibold ${badge ? "bg-[#9dd9b7] text-[#17211b]" : "bg-[#17211b] text-white"}`}>
                  {cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#17211b]/10 bg-[#e9f1eb]">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">Start with clarity</p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Get a free report before you spend money.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-[#5a685f]">Our Technology Checkup looks at security, Wi-Fi, devices, accounts, and backups for your home or business.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/technology-checkup/assessment" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#17211b] px-6 font-semibold text-white">Get the free checkup <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/hardware" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#17211b]/30 px-6 font-semibold">Explore hardware <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/software" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#17211b]/30 px-6 font-semibold">Explore software <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
