"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@backtoprotocol.com";

export function SupportRequestForm({ initialIssue = "" }: { initialIssue?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState(initialIssue);
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  const openRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const subject = `Support request: ${issue || "Technology help"}`;
    const body = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      `Request type: ${issue || "Other"}`,
      "",
      "What is happening:",
      details,
    ].join("\n");

    if (supabase) {
      const service = issue === "Website" ? "Website" : issue === "Business IT" ? "Business IT" : issue.startsWith("Protocol+") ? "Protocol+" : "Tech Support";
      const { data, error } = await supabase.rpc("submit_support_request", {
        customer_name: name,
        customer_email: email,
        request_subject: subject,
        request_description: details,
        request_service: service,
      });

      if (!error && typeof data === "string") {
        setTicketNumber(data);
        setSubmitting(false);
        return;
      }
    }

    setSubmitting(false);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (ticketNumber) {
    return (
      <div className="border border-[#17211b]/15 bg-white p-8 shadow-[12px_12px_0_#dff3e7]">
        <CheckCircle2 className="h-10 w-10 text-[#1f7a4d]" />
        <h2 className="mt-5 font-serif text-3xl">Request received.</h2>
        <p className="mt-3 leading-7 text-[#607067]">Your request number is <strong className="text-[#17211b]">{ticketNumber}</strong>. We will reply to {email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={openRequest} className="border border-[#17211b]/15 bg-white p-6 shadow-[12px_12px_0_#dff3e7] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">Your name
          <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-12 w-full border border-[#17211b]/20 bg-[#f8f9f5] px-4 outline-none focus:border-[#1f7a4d]" />
        </label>
        <label className="text-sm font-semibold">Email
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 w-full border border-[#17211b]/20 bg-[#f8f9f5] px-4 outline-none focus:border-[#1f7a4d]" />
        </label>
      </div>
      <label className="mt-5 block text-sm font-semibold">What do you need help with?
        <select value={issue} onChange={(event) => setIssue(event.target.value)} className="mt-2 min-h-12 w-full border border-[#17211b]/20 bg-[#f8f9f5] px-4 outline-none focus:border-[#1f7a4d]">
          <option value="">Choose one</option>
          {["Computer is slow", "Wi-Fi keeps dropping", "Printer or device problem", "New device setup", "Website", "Business IT", "Security & backups", "Something else"].map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>
      <label className="mt-5 block text-sm font-semibold">Tell us what is happening
        <textarea required rows={6} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="What were you trying to do? What happened instead? Include any error message you see." className="mt-2 w-full resize-y border border-[#17211b]/20 bg-[#f8f9f5] px-4 py-3 outline-none focus:border-[#1f7a4d]" />
      </label>
      <button type="submit" disabled={submitting} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#17211b] px-5 font-semibold text-white disabled:opacity-60 sm:w-auto">
        {submitting ? "Submitting..." : "Submit request"} <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#607067]"><Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />If online submission is unavailable, your email app opens with the request prefilled to {SUPPORT_EMAIL}.</p>
    </form>
  );
}
