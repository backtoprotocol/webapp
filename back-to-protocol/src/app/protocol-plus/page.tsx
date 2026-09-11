import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";

const plans = [
  {
    name: "Protocol+",
    price: "$19.99",
    audience: "Everyday technology support for a household.",
    features: ["Priority support requests", "30 minutes remote support each month", "Technology questions and guidance", "Member pricing on additional services", "Cancel anytime"],
    accent: false,
  },
  {
    name: "Protocol+ Pro",
    price: "$49.99",
    audience: "More hands-on help for people who rely on their technology.",
    features: ["Everything in Protocol+", "2 hours remote support each month", "Website, computer, and network assistance", "20% off additional services", "Priority scheduling"],
    accent: true,
  },
  {
    name: "Protocol Business",
    price: "$149+",
    audience: "Ongoing technology help for small businesses.",
    features: ["Named business support contact", "Microsoft 365 or Google Workspace help", "Website and domain support", "Network and security guidance", "Custom monthly support allowance"],
    accent: false,
  },
];

export const metadata = {
  title: "Protocol+ Technology Support Membership",
  description: "Priority technology support plans for households and small businesses.",
};

export default function ProtocolPlusPage() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <section className="border-b border-[#17211b]/10 bg-[#17211b] text-white">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="text-xs font-bold uppercase text-[#9dd9b7]">Protocol+</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Never deal with a technology problem alone.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">Priority access to a technology expert who knows your setup, with clear monthly support limits and better pricing when a problem becomes a larger project.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`flex min-h-[500px] flex-col border p-7 sm:p-8 ${plan.accent ? "border-[#17211b] bg-[#17211b] text-white shadow-[12px_12px_0_#f3a45b]" : "border-[#17211b]/15 bg-white"}`}>
              <p className={`text-sm font-bold ${plan.accent ? "text-[#9dd9b7]" : "text-[#1f7a4d]"}`}>{plan.name}</p>
              <p className="mt-5 text-5xl font-semibold">{plan.price}<span className={`text-base font-normal ${plan.accent ? "text-white/55" : "text-[#607067]"}`}>/month</span></p>
              <p className={`mt-4 min-h-14 leading-7 ${plan.accent ? "text-white/65" : "text-[#5a685f]"}`}>{plan.audience}</p>
              <ul className={`mt-7 space-y-4 border-t pt-7 text-sm ${plan.accent ? "border-white/15" : "border-[#17211b]/15"}`}>
                {plan.features.map((feature) => <li key={feature} className="flex gap-3"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.accent ? "text-[#9dd9b7]" : "text-[#1f7a4d]"}`} />{feature}</li>)}
              </ul>
              <Link href={`/support?issue=${encodeURIComponent(plan.name)}`} className={`mt-auto flex min-h-12 items-center justify-between px-5 font-semibold ${plan.accent ? "bg-[#9dd9b7] text-[#17211b]" : "bg-[#17211b] text-white"}`}>
                Ask about {plan.name} <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-y border-[#17211b]/15 py-12 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-serif text-4xl">What membership is not.</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {["Unlimited labor or around-the-clock monitoring", "Hardware, software, parts, or third-party fees", "Emergency response or guaranteed same-day service", "Unused support time does not roll over"].map((item) => <p key={item} className="flex gap-3 leading-7 text-[#5a685f]"><Minus className="mt-1 h-5 w-5 shrink-0 text-[#b45309]" />{item}</p>)}
          </div>
        </div>
      </section>
    </main>
  );
}
