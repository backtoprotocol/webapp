import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ProtocolPlusPricing } from "@/components/protocol-plus-pricing";

const membershipHighlights = [
  "Remote support that fits into your day",
  "A monthly support allowance that keeps your technology moving",
  "Clear approval before larger projects begin",
  "Priority scheduling for member requests",
  "Straightforward recommendations for hardware, software, and next steps",
];

const faqs = [
  {
    question: "What counts as one remote support session?",
    answer: "Any time we spend on the phone, on a screen-share, or working on your systems remotely counts toward your monthly minutes or hours. Simple questions that take a few minutes are handled the same way as longer troubleshooting.",
  },
  {
    question: "What happens if I need more time than my plan includes?",
    answer: "We tell you before going over. Additional time is billed at your member rate instead of the standard hourly rate — the exact rate depends on your plan and is always shown before work begins.",
  },
  {
    question: "Do unused minutes or hours roll over to next month?",
    answer: "No. Each plan resets monthly. We keep it this way so pricing stays simple and predictable for both of us.",
  },
  {
    question: "Can I switch plans later?",
    answer: "Yes. You can move up or down a plan at any time, and the change takes effect on your next billing date.",
  },
  {
    question: "What if my problem needs an on-site visit?",
    answer: "Most issues are solved remotely. If a problem genuinely needs hands-on work, we will schedule an on-site appointment and let you know the cost before it is booked.",
  },
  {
    question: "Is there a contract or minimum commitment?",
    answer: "No. Every plan is billed month to month (or annually if you choose that option) and you can cancel anytime.",
  },
  {
    question: "What if my business is larger than the Complete plan?",
    answer: "Contact us with your number of users and devices and we will put together a custom plan and quote.",
  },
];

export const metadata = {
  title: "Protocol+ Technology Support Membership",
  description: "Priority technology support plans for individuals, households, and small businesses.",
};

export default function ProtocolPlusPage() {
  return (
    <main className="bg-[#f6f7f2] text-[#17211b]">
      <ProtocolPlusPricing />

      <section className="mx-auto max-w-[1480px] px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28">
        <div className="grid gap-8 border-y border-[#17211b]/15 py-12 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-serif text-4xl">What you can count on.</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {membershipHighlights.map((item) => <p key={item} className="flex gap-3 leading-7 text-[#5a685f]"><Check className="mt-1 h-5 w-5 shrink-0 text-[#1f7a4d]" />{item}</p>)}
          </div>
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase text-[#1f7a4d]">Common questions</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">Still deciding? Here's what people ask.</h2>
          </div>
          <div className="mt-8 divide-y divide-[#17211b]/15 border-t border-[#17211b]/15">
            {faqs.map((item) => (
              <details key={item.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
                  {item.question}
                  <span className="shrink-0 text-xl text-[#1f7a4d] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-[#5a685f]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="business-it" className="scroll-mt-28 border-t border-[#17211b]/10 bg-white">
        <div className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="flex flex-col gap-6 border border-[#17211b]/15 bg-[#f6f7f2] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-[#1f7a4d]">Need something bigger?</p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
                Larger businesses and multi-location setups get a custom plan.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#5a685f]">
                If your business is bigger than Protocol Business Complete, or you have compliance, multi-site, or
                specialized system needs, contact us and we will scope a custom monthly plan.
              </p>
            </div>
            <Link href="/support?issue=Custom%20Business%20Plan" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#17211b] px-6 py-3.5 font-semibold text-white">
              Request a custom quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
