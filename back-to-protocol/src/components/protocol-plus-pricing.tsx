"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Minus } from "lucide-react";

type Plan = {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  audience: string;
  features: string[];
  accent: boolean;
  badge: string | null;
  startingAt?: boolean;
  cta?: string;
};

const individualPlans: Plan[] = [
  {
    name: "Protocol+",
    monthlyPrice: "$19.99",
    annualPrice: "$199",
    audience: "For occasional technology help.",
    features: [
      "Priority support requests",
      "30 minutes of remote support per month",
      "General technology questions",
      "Remote troubleshooting",
      "Member pricing on additional services",
      "Additional support at $89/hour",
    ],
    accent: false,
    badge: null,
  },
  {
    name: "Protocol+ Pro",
    monthlyPrice: "$49.99",
    annualPrice: "$499",
    audience: "For people who want ongoing technology help.",
    features: [
      "Everything in Protocol+",
      "2 hours of remote support per month",
      "Computer assistance",
      "Network/Wi-Fi assistance",
      "Website assistance",
      "Priority scheduling",
      "20% off additional services",
      "Additional support at $79/hour",
    ],
    accent: true,
    badge: "Most Popular",
  },
];

const businessPlans: Plan[] = [
  {
    name: "Protocol Business Starter",
    monthlyPrice: "$149",
    annualPrice: "$1,490",
    audience: "For small businesses with 1–5 employees.",
    features: [
      "2 hours of remote support per month",
      "Named support contact who knows your setup",
      "Microsoft 365 or Google Workspace assistance",
      "Business email, domain, and DNS support",
      "Basic network troubleshooting",
      "Additional support at $99/hour",
    ],
    accent: false,
    badge: null,
  },
  {
    name: "Protocol Business Growth",
    monthlyPrice: "$299",
    annualPrice: "$2,990",
    audience: "For growing businesses with 6–20 employees.",
    features: [
      "Everything in Business Starter",
      "5 hours of remote support per month",
      "Dedicated account contact for every request",
      "Hardware and software procurement help — we source and recommend, you approve",
      "Website support",
      "Priority scheduling",
      "15% off additional services",
      "Additional support at $89/hour",
    ],
    accent: true,
    badge: "Most Popular",
  },
  {
    name: "Protocol Business Complete",
    monthlyPrice: "$549",
    annualPrice: "$5,490",
    audience: "For established businesses with 21–50 employees.",
    features: [
      "Everything in Business Growth",
      "10 hours of remote support per month",
      "Dedicated account manager (proactive, not just reactive)",
      "Hardware and software procurement managed for you, including vendor ordering",
      "Quarterly technology review",
      "20% off additional services",
      "Additional support at $79/hour",
    ],
    accent: false,
    badge: null,
  },
];

const enterprisePlan: Plan = {
  name: "Protocol Business Enterprise",
  monthlyPrice: "$999",
  annualPrice: "$9,990",
  audience: "For larger businesses with 51–300 employees.",
  features: [
    "Everything in Business Complete",
    "20 hours of remote support per month as a baseline",
    "Senior dedicated account manager plus a backup contact",
    "Full hardware and software procurement, including vendor and licensing negotiation",
    "Scoped after a network and device assessment",
    "Scheduled on-site visits available",
    "20% off additional services",
    "Additional support at $79/hour",
  ],
  accent: true,
  badge: "Custom Scoped",
  startingAt: true,
  cta: "Get a scoped quote",
};

const enterpriseSteps: Array<[string, string, string]> = [
  ["01", "Assessment call", "We walk through your current users, devices, systems, and pain points to understand what support actually looks like."],
  ["02", "Scoped proposal", "You get a fixed monthly price based on your team size and support needs — no open-ended billing."],
  ["03", "Onboarding & support", "We document your environment, set up monitoring where useful, and your dedicated account manager becomes your first call."],
];

const individualComparisonRows: Array<[string, string, string]> = [
  ["Monthly remote support included", "30 minutes", "2 hours"],
  ["Additional support rate", "$89/hour", "$79/hour"],
  ["Priority support requests", "yes", "yes"],
  ["General technology questions", "yes", "yes"],
  ["Remote troubleshooting", "yes", "yes"],
  ["Computer assistance", "no", "yes"],
  ["Network / Wi-Fi assistance", "no", "yes"],
  ["Website assistance", "no", "yes"],
  ["Priority scheduling", "no", "yes"],
  ["Discount on additional services", "no", "20%"],
  ["Cancel anytime, no contract", "yes", "yes"],
];

const businessComparisonRows: Array<[string, string, string, string]> = [
  ["Employees supported", "1–5", "6–20", "21–50"],
  ["Monthly remote support included", "2 hours", "5 hours", "10 hours"],
  ["Additional support rate", "$99/hour", "$89/hour", "$79/hour"],
  ["Dedicated point of contact", "Named contact", "Dedicated contact", "Dedicated account manager"],
  ["Hardware & software procurement", "no", "We source & recommend", "We manage & order for you"],
  ["Microsoft 365 / Google Workspace assistance", "yes", "yes", "yes"],
  ["Business email, domain & DNS support", "yes", "yes", "yes"],
  ["Basic network troubleshooting", "yes", "yes", "yes"],
  ["Website support", "no", "yes", "yes"],
  ["Priority scheduling", "no", "yes", "yes"],
  ["Quarterly technology review", "no", "no", "yes"],
  ["Discount on additional services", "no", "15%", "20%"],
  ["Cancel anytime, no contract", "yes", "yes", "yes"],
];

function Cell({ value }: { value: string }) {
  if (value === "yes") return <Check className="h-5 w-5 text-[#1f7a4d]" />;
  if (value === "no") return <Minus className="h-5 w-5 text-[#b45309]" />;
  return <>{value}</>;
}

function PlanCard({ plan, billing }: { plan: Plan; billing: "monthly" | "annual" }) {
  return (
    <article
      className={`relative flex min-h-[500px] flex-col border px-7 pb-7 sm:px-8 sm:pb-8 ${plan.badge ? "pt-10 sm:pt-12" : "pt-7 sm:pt-8"} ${
        plan.accent ? "border-[#17211b] bg-[#17211b] text-white shadow-[12px_12px_0_#f3a45b]" : "border-[#17211b]/15 bg-white"
      }`}
    >
      {plan.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f3a45b] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#17211b] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]">
          {plan.badge}
        </span>
      ) : null}
      <p className={`text-sm font-bold ${plan.accent ? "text-[#9dd9b7]" : "text-[#1f7a4d]"}`}>{plan.name}</p>
      <p className="mt-5 text-4xl font-semibold sm:text-5xl">
        {plan.startingAt ? <span className="mr-1 align-top text-base font-normal">Starting at</span> : null}
        {billing === "monthly" ? plan.monthlyPrice : plan.annualPrice}
        <span className={`text-base font-normal ${plan.accent ? "text-white/55" : "text-[#607067]"}`}>
          {billing === "monthly" ? "/month" : "/year"}
        </span>
      </p>
      {billing === "annual" ? (
        <p className={`mt-1 text-sm font-semibold ${plan.accent ? "text-[#9dd9b7]" : "text-[#1f7a4d]"}`}>Billed annually · 2 months free</p>
      ) : null}
      <p className={`mt-4 min-h-14 leading-7 ${plan.accent ? "text-white/65" : "text-[#5a685f]"}`}>{plan.audience}</p>
      <ul className={`mt-7 flex-1 space-y-4 border-t pt-7 text-sm ${plan.accent ? "border-white/15" : "border-[#17211b]/15"}`}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.accent ? "text-[#9dd9b7]" : "text-[#1f7a4d]"}`} />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={`/support?issue=${encodeURIComponent(plan.name)}`}
        className={`mt-10 flex min-h-12 items-center justify-between px-6 py-3.5 font-semibold ${
          plan.accent ? "bg-[#9dd9b7] text-[#17211b]" : "bg-[#17211b] text-white"
        }`}
      >
        {plan.cta ?? `Ask about ${plan.name}`} <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}

export function ProtocolPlusPricing() {
  const [audience, setAudience] = useState<"individual" | "business" | "enterprise">("individual");
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div>
      <section className="border-b border-[#17211b]/10 bg-[#17211b] text-white">
        <div className="mx-auto max-w-[1100px] px-5 py-20 text-center sm:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase text-[#9dd9b7]">Protocol+</p>
          <h1 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Flexible support plans for every kind of technology problem.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/65">
            Bring your technology questions to someone who actually knows your setup — as an individual, a small
            business, or a growing enterprise.
          </p>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-full bg-white p-1.5 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]">
              {(
                [
                  ["individual", "Individual plans"],
                  ["business", "Business plans"],
                  ["enterprise", "Enterprise"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAudience(value)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    audience === value ? "bg-[#17211b] text-white" : "text-[#5a685f] hover:text-[#17211b]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1480px] px-5 pb-20 pt-14 sm:px-8 lg:px-12 lg:pb-28">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-[#17211b]/15 bg-white p-1">
            {(["monthly", "annual"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  billing === option ? "bg-[#17211b] text-white" : "text-[#5a685f] hover:text-[#17211b]"
                }`}
              >
                {option === "monthly" ? "Monthly" : "Annual · 2 months free"}
              </button>
            ))}
          </div>
        </div>

      {audience === "individual" ? (
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {individualPlans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} />
          ))}
        </div>
      ) : null}

      {audience === "business" ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:gap-8">
          {businessPlans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} billing={billing} />
          ))}
        </div>
      ) : null}

      {audience === "enterprise" ? (
        <div className="mt-10 mx-auto max-w-xl">
          <PlanCard plan={enterprisePlan} billing={billing} />
        </div>
      ) : null}

      {audience !== "enterprise" ? (
        <div className="mt-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">Side by side</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Exactly what&apos;s included.</h2>
            <p className="mt-4 text-lg leading-8 text-[#5a685f]">No fine print you have to hunt for. Here is every plan detail in one place.</p>
          </div>

          <div className="mt-10 overflow-x-auto border border-[#17211b]/15 bg-white">
            {audience === "individual" ? (
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#17211b]/15">
                    <th className="w-1/2 px-6 py-5 font-semibold text-[#607067]">Plan detail</th>
                    <th className="px-6 py-5 font-semibold text-[#1f7a4d]">Protocol+</th>
                    <th className="px-6 py-5 font-semibold text-[#1f7a4d]">Protocol+ Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {individualComparisonRows.map(([label, plus, pro], index) => (
                    <tr key={label} className={index % 2 === 1 ? "bg-[#f6f7f2]" : undefined}>
                      <td className="px-6 py-4 font-medium">{label}</td>
                      <td className="px-6 py-4"><Cell value={plus} /></td>
                      <td className="px-6 py-4"><Cell value={pro} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#17211b]/15">
                    <th className="w-2/5 px-6 py-5 font-semibold text-[#607067]">Plan detail</th>
                    <th className="px-6 py-5 font-semibold text-[#1f7a4d]">Starter</th>
                    <th className="px-6 py-5 font-semibold text-[#1f7a4d]">Growth</th>
                    <th className="px-6 py-5 font-semibold text-[#1f7a4d]">Complete</th>
                  </tr>
                </thead>
                <tbody>
                  {businessComparisonRows.map(([label, starter, growth, complete], index) => (
                    <tr key={label} className={index % 2 === 1 ? "bg-[#f6f7f2]" : undefined}>
                      <td className="px-6 py-4 font-medium">{label}</td>
                      <td className="px-6 py-4"><Cell value={starter} /></td>
                      <td className="px-6 py-4"><Cell value={growth} /></td>
                      <td className="px-6 py-4"><Cell value={complete} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">How it works</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">From assessment to onboarding.</h2>
            <p className="mt-4 text-lg leading-8 text-[#5a685f]">Enterprise pricing depends on your team size and systems, so we scope it with you instead of guessing.</p>
          </div>
          <div className="mt-10 border-t border-[#17211b]/15">
            {enterpriseSteps.map(([number, title, description]) => (
              <div key={number} className="grid gap-3 border-b border-[#17211b]/15 py-7 sm:grid-cols-[64px_190px_1fr] sm:items-start">
                <span className="font-mono text-sm text-[#1f7a4d]">{number}</span>
                <h3 className="font-semibold">{title}</h3>
                <p className="leading-7 text-[#5a685f]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
