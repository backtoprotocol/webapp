import Link from "next/link";
import { ArrowRight, Check, Code2, LifeBuoy, BriefcaseBusiness } from "lucide-react";

const offers = [
  {
    id: "websites",
    icon: Code2,
    eyebrow: "Websites",
    title: "A business website built to do a job.",
    description: "From a focused landing page to a complete business site, we handle design, development, launch, and the technical setup around it.",
    items: ["Custom responsive design", "Domain and hosting connection", "Contact forms and basic SEO", "E-commerce when needed", "Ongoing care from $49/month"],
    price: "Starting at $999",
    cta: "Discuss a website",
  },
  {
    id: "tech-support",
    icon: LifeBuoy,
    eyebrow: "Tech support",
    title: "Straight answers when technology stops cooperating.",
    description: "Remote-first support for households and small teams. If it cannot be solved remotely, we decide together what should happen next.",
    items: ["Computer and software troubleshooting", "Wi-Fi, printers, and device setup", "Data transfer and backup setup", "Account and email assistance", "Security basics and cleanup"],
    price: "$75–$100/hour",
    cta: "Request tech help",
  },
  {
    id: "business-it",
    icon: BriefcaseBusiness,
    eyebrow: "Business IT",
    title: "Practical technology management for small business.",
    description: "One accountable technology partner for the systems that keep your business moving, without hiring a full-time IT department.",
    items: ["Microsoft 365 and Google Workspace", "Domains, business email, and DNS", "Network and Wi-Fi planning", "Website management and automation", "Ongoing support from $149/month"],
    price: "Plans from $149/month",
    cta: "Plan your business IT",
  },
];

export const metadata = {
  title: "Technology Services | Back to Protocol",
  description: "Websites, remote technology support, and small-business IT services.",
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
          {offers.map(({ id, icon: Icon, eyebrow, title, description, items, price, cta }, index) => (
            <article id={id} key={id} className="scroll-mt-28 border border-[#17211b]/15 bg-white p-7 sm:p-10 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:p-14">
              <div>
                <div className="flex h-12 w-12 items-center justify-center bg-[#17211b] text-[#9dd9b7]"><Icon className="h-6 w-6" /></div>
                <p className="mt-6 text-xs font-bold uppercase text-[#1f7a4d]">{eyebrow}</p>
                <h2 className="mt-3 max-w-xl font-serif text-4xl leading-tight">{title}</h2>
                <p className="mt-5 max-w-xl leading-7 text-[#5a685f]">{description}</p>
              </div>
              <div className="mt-10 border-t border-[#17211b]/15 pt-8 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <ul className="space-y-4">
                  {items.map((item) => <li key={item} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#1f7a4d]" /><span>{item}</span></li>)}
                </ul>
                <p className="mt-8 text-2xl font-semibold">{price}</p>
                <Link href={`/support?issue=${encodeURIComponent(eyebrow)}`} className="mt-6 inline-flex min-h-12 items-center gap-2 bg-[#17211b] px-5 font-semibold text-white">
                  {cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
