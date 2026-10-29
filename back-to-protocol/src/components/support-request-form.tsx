"use client";

import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@backtoprotocol.com";

export function SupportRequestForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [emailFallback, setEmailFallback] = useState(false);

  const openRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Treehouse support: ${topic}`;
    const description = [
      `Topic: ${topic}`,
      "",
      "How we can help:",
      details,
    ].join("\n");
    const emailBody = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      ...description.split("\n"),
    ].join("\n");

    setEmailFallback(true);
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <form
      onSubmit={openRequest}
      className="rounded-2xl border border-[#e1e9f2] bg-white p-6 shadow-[0_18px_48px_-38px_rgba(27,58,87,0.6)] sm:p-8"
    >
      <h2 className="text-xl font-semibold tracking-[-0.025em]">
        Send us a message
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#69778b]">
        Your email app will open with a message you can review and send.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold">
          Your name
          <input
            required
            autoComplete="name"
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-lg border border-[#d7e0eb] bg-white px-4 font-normal outline-none transition focus:border-[#3d8fe8] focus:ring-3 focus:ring-[#d9ecff]"
          />
        </label>
        <label className="text-sm font-semibold">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 min-h-12 w-full rounded-lg border border-[#d7e0eb] bg-white px-4 font-normal outline-none transition focus:border-[#3d8fe8] focus:ring-3 focus:ring-[#d9ecff]"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold">
        Topic
        <select
          required
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          className="mt-2 min-h-12 w-full rounded-lg border border-[#d7e0eb] bg-white px-4 font-normal outline-none transition focus:border-[#3d8fe8] focus:ring-3 focus:ring-[#d9ecff]"
        >
          <option value="">Choose a topic</option>
          <option>Getting started</option>
          <option>Pricing and availability</option>
          <option>Organizing my essentials</option>
          <option>Account and access</option>
          <option>Privacy and my information</option>
          <option>Something else</option>
        </select>
      </label>

      <label className="mt-5 block text-sm font-semibold">
        How can we help?
        <textarea
          required
          maxLength={2000}
          rows={6}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Describe what you need help with. Please don’t include passwords or private document details."
          className="mt-2 w-full resize-y rounded-lg border border-[#d7e0eb] bg-white px-4 py-3 font-normal leading-6 outline-none transition placeholder:text-[#8994a4] focus:border-[#3d8fe8] focus:ring-3 focus:ring-[#d9ecff]"
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1a73e8] px-5 font-semibold text-white transition hover:bg-[#1765cc] sm:w-auto"
      >
        Open email to send
        <ArrowRight aria-hidden="true" className="h-4 w-4" />
      </button>

      {emailFallback ? (
        <p role="status" className="mt-4 text-sm leading-6 text-[#5b687a]">
          Your email app should open with the message ready to send. If it
          doesn’t, email{" "}
          <a
            className="font-semibold text-[#1769c2] underline underline-offset-2"
            href={`mailto:${SUPPORT_EMAIL}`}
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      ) : (
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#748094]">
          <Mail aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          We’ll only use these details to respond to your request.
        </p>
      )}
    </form>
  );
}
