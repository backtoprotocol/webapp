"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";

export function ProtocolPlusTeaser() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <div>
      <div className="flex sm:justify-end">
        <div className="inline-flex border border-[#17211b]/15 bg-white p-1">
          {(["monthly", "annual"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBilling(option)}
              className={`px-4 py-1.5 text-xs font-semibold transition ${
                billing === option ? "bg-[#17211b] text-white" : "text-[#5a685f] hover:text-[#17211b]"
              }`}
            >
              {option === "monthly" ? "Monthly" : "Annual · 2 months free"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="border border-[#17211b]/15 bg-[#f6f7f2] p-7">
          <p className="text-sm font-bold text-[#1f7a4d]">PROTOCOL+</p>
          <p className="mt-3 text-4xl font-semibold">
            {billing === "monthly" ? "$19.99" : "$199"}
            <span className="text-base font-normal text-[#607067]">{billing === "monthly" ? "/mo" : "/yr"}</span>
          </p>
          <p className="mt-2 text-sm text-[#607067]">For occasional technology help.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Priority support requests", "30 minutes remote support/month", "Additional support at $89/hour", "Cancel anytime"].map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1f7a4d]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative border border-[#17211b] bg-[#17211b] px-7 pb-7 pt-9 text-white">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#f3a45b] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[#17211b] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.5)]">
            Most Popular
          </span>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#9dd9b7]">PROTOCOL+ PRO</p>
            <Sparkles className="h-5 w-5 text-[#f3a45b]" />
          </div>
          <p className="mt-3 text-4xl font-semibold">
            {billing === "monthly" ? "$49.99" : "$499"}
            <span className="text-base font-normal text-white/60">{billing === "monthly" ? "/mo" : "/yr"}</span>
          </p>
          <p className="mt-2 text-sm text-white/65">For people who want ongoing technology help.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Everything in Protocol+", "2 hours remote support/month", "20% off additional services", "Additional support at $79/hour"].map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#9dd9b7]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
