import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { SupportRequestForm } from "@/components/support-request-form";

export const metadata = {
  title: "Treehouse Support | Get help",
  description:
    "Get help with Treehouse, your account, and keeping everyday details organized.",
};

const faqs = [
  {
    question: "What should I include in a support request?",
    answer:
      "Tell us what you were trying to do, what happened, and the email address associated with your account. Please leave out passwords, verification codes, and private document details.",
  },
  {
    question: "Can I ask about organizing a particular kind of item?",
    answer:
      "Yes. Choose the closest topic in the form and describe the kind of item or information you’re trying to organize. We’ll help point you in the right direction.",
  },
  {
    question: "How do I contact the Treehouse team directly?",
    answer:
      "Write to support@backtoprotocol.com. Back to Protocol is the company behind Treehouse, our app.",
  },
];

export default function SupportPage() {
  return (
    <main className="bg-white text-[#28364b]">
      <section className="border-b border-[#e5ebf3] bg-gradient-to-br from-[#f3f9ff] via-white to-[#edf6ff]">
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <p className="text-sm font-semibold text-[#1769c2]">
            Treehouse support
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl">
            How can we help?
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5b687a]">
            Send the Treehouse team a note about getting started, your account,
            or keeping your everyday essentials organized.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-10 lg:py-20">
        <div>
          <div className="flex items-start gap-4 border-b border-[#e5ebf3] pb-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eaf4ff] text-[#1977cf]">
              <CircleHelp aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-semibold">Tell us what you need</h2>
              <p className="mt-1 text-sm leading-6 text-[#69778b]">
                Share a little context and we’ll help you find the right next
                step.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-start gap-3">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[#1977cf]"
              />
              <div>
                <h3 className="text-sm font-semibold">Your privacy matters</h3>
                <p className="mt-1 text-sm leading-6 text-[#69778b]">
                  Don’t send passwords, sign-in codes, payment details, or
                  private document contents in your message.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <LockKeyhole
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-[#1977cf]"
              />
              <div>
                <h3 className="text-sm font-semibold">
                  Keep your request focused
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#69778b]">
                  A short description of the issue and the steps you tried is
                  usually enough to get started.
                </p>
              </div>
            </div>
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#1769c2] transition hover:text-[#124f97]"
            >
              Read our privacy policy{" "}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-[#e5ebf3] bg-[#f7fbff] p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Mail aria-hidden="true" className="h-4 w-4 text-[#1977cf]" />
              Email the team
            </div>
            <a
              href="mailto:support@backtoprotocol.com?subject=Treehouse%20support"
              className="mt-2 inline-block text-sm text-[#1769c2] underline decoration-[#b4cde8] underline-offset-4 hover:decoration-[#1769c2]"
            >
              support@backtoprotocol.com
            </a>
            <p className="mt-2 text-xs leading-5 text-[#69778b]">
              Treehouse is the app, made by Back to Protocol.
            </p>
          </div>
        </div>

        <SupportRequestForm />
      </section>

      <section className="border-t border-[#e5ebf3] bg-[#f7fbff]">
        <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8 lg:px-10">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            A few quick answers
          </h2>
          <div className="mt-5 divide-y divide-[#e2eaf3] border-t border-[#e2eaf3]">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:content-none">
                  {question}
                  <span
                    aria-hidden="true"
                    className="text-xl text-[#1977cf] transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[#69778b]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
