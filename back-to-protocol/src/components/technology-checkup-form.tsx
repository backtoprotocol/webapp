"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleAlert, Download, LockKeyhole, Router, ShieldCheck } from "lucide-react";

type CheckupType = "personal" | "business";
type Assessment = {
  type: CheckupType;
  name: string;
  email: string;
  businessName: string;
  deviceCount: string;
  devices: string[];
  wifi: string;
  mfa: string;
  passwords: string;
  updates: string;
  backups: string;
  users: string;
  systems: string[];
  concern: string;
};

type ReportMetric = {
  label: string;
  score: number;
  summary: string;
  icon: typeof ShieldCheck;
};

type Report = {
  title: string;
  intro: string;
  overall: number;
  metrics: ReportMetric[];
  priorities: string[];
  nextStep: string;
};

const initialAssessment: Assessment = {
  type: "personal",
  name: "",
  email: "",
  businessName: "",
  deviceCount: "1-2",
  devices: [],
  wifi: "Not sure",
  mfa: "Not sure",
  passwords: "Not sure",
  updates: "Not sure",
  backups: "Not sure",
  users: "1-5",
  systems: [],
  concern: "",
};

const personalDevices = ["Computer", "Phone or tablet", "Printer", "Smart-home devices"];
const businessSystems = ["Email and calendar", "Cloud files", "Website or domain", "Wi-Fi and networking", "Accounting or payments", "Customer data"];

function score(value: string, points: Record<string, number>) {
  return points[value] ?? 0;
}

function buildReport(assessment: Assessment): Report {
  const security = score(assessment.mfa, { "Most accounts": 3, "Some accounts": 2, "Not sure": 1, No: 0 }) + score(assessment.passwords, { "Password manager": 3, "Mostly separate": 2, "A few reused": 1, "Not sure": 1 }) + score(assessment.updates, { "Usually current": 2, "Sometimes behind": 1, "Often behind": 0, "Not sure": 1 });
  const wifi = score(assessment.wifi, { Good: 3, "Sometimes unreliable": 2, "Frequently unreliable": 0, "Not sure": 1 });
  const backups = score(assessment.backups, { "Yes and tested": 3, "Yes but not tested": 2, "Not sure": 1, No: 0 });
  const securityScore = Math.round((security / 8) * 100);
  const wifiScore = Math.round((wifi / 3) * 100);
  const backupScore = Math.round((backups / 3) * 100);
  const overall = Math.round((securityScore + wifiScore + backupScore) / 3);
  const priorities: string[] = [];

  if (assessment.mfa !== "Most accounts") priorities.push("Strengthen sign-in security with multi-factor authentication on email, financial, cloud, and administrator accounts.");
  if (assessment.passwords !== "Password manager") priorities.push("Create one secure place for passwords and replace reused or hard-to-recover passwords first.");
  if (assessment.wifi !== "Good") priorities.push("Review Wi-Fi coverage, router placement, equipment age, and connected devices before buying anything new.");
  if (assessment.backups !== "Yes and tested") priorities.push("Set up or verify an automatic backup and test that an important file can actually be restored.");
  if (assessment.updates !== "Usually current") priorities.push("Bring devices and key applications up to date, then turn on automatic updates where practical.");
  if (!priorities.length) priorities.push("Keep your current habits consistent and schedule a yearly technology review before small issues become expensive ones.");
  if (assessment.type === "business" && assessment.systems.length < 3) priorities.push("Document the essential systems your team depends on and who should have access to each one.");
  if (assessment.concern.trim()) priorities.unshift(`Start with your concern: ${assessment.concern.trim()}`);

  const level = overall >= 80 ? "Strong foundation" : overall >= 55 ? "Good starting point" : "Worth improving";
  return {
    title: `${assessment.type === "business" ? "Small-business" : "Personal"} technology checkup`,
    intro: `Your current snapshot is a ${level.toLowerCase()}. The report below focuses on the changes most likely to improve security, reliability, and peace of mind.`,
    overall,
    metrics: [
      { label: "Security", score: securityScore, summary: securityScore >= 80 ? "Your answers show a solid security foundation." : "There are a few meaningful ways to make accounts and devices safer.", icon: ShieldCheck },
      { label: "Wi-Fi and network", score: wifiScore, summary: wifiScore >= 80 ? "Your network sounds dependable based on your answers." : "Coverage, equipment, or reliability deserves a closer look.", icon: Router },
      { label: "Backups and recovery", score: backupScore, summary: backupScore >= 80 ? "You have a strong recovery habit in place." : "Your important files would benefit from a verified recovery plan.", icon: LockKeyhole },
    ],
    priorities: priorities.slice(0, 5),
    nextStep: assessment.type === "business" ? "Use this report as a starting point for a business technology review. We can turn the priorities into a simple plan for your team." : "Use this report as a simple home technology plan. We can help you work through the priorities in the order that makes sense for you.",
  };
}

export function TechnologyCheckupForm() {
  const [assessment, setAssessment] = useState<Assessment>(initialAssessment);
  const [step, setStep] = useState(1);
  const [report, setReport] = useState<Report | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof Assessment>(key: K, value: Assessment[K]) => {
    setAssessment((current) => ({ ...current, [key]: value }));
  };

  const toggleItem = (key: "devices" | "systems", item: string) => {
    const current = assessment[key];
    update(key, current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  };

  const finish = async () => {
    setSubmitting(true);
    setSubmitError("");
    const generated = buildReport(assessment);
    const description = [
      `${generated.title} requested by ${assessment.name}.`,
      `Devices/users: ${assessment.type === "business" ? assessment.users : assessment.deviceCount}.`,
      `Wi-Fi: ${assessment.wifi}. MFA: ${assessment.mfa}. Passwords: ${assessment.passwords}. Updates: ${assessment.updates}. Backups: ${assessment.backups}.`,
      assessment.concern ? `Main concern: ${assessment.concern}` : "No specific concern provided.",
      `Report priorities: ${generated.priorities.join(" | ")}`,
    ].join("\n");

    const response = await fetch("/api/checkup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: assessment.name,
        customerEmail: assessment.email,
        customerCompany: assessment.type === "business" ? assessment.businessName : "",
        subject: `Free ${generated.title}`,
        description,
      }),
    });

    if (!response.ok) {
      setSubmitError("We could not save your checklist right now. Please try again, and your report will be generated once the connection is restored.");
      setSubmitting(false);
      return;
    }

    setReport(generated);
    setSubmitting(false);
  };

  if (report) return <ReportView report={report} name={assessment.name} />;

  return (
    <section id="assessment" className="border border-[#17211b]/15 bg-white shadow-[14px_14px_0_#dff3e7]">
      <div className="border-b border-[#17211b]/15 px-6 py-6 sm:px-9">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-bold uppercase text-[#1f7a4d]">Free assessment</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">Build your technology report</h2></div>
          <span className="text-sm font-semibold text-[#607067]">Step {step} of 4</span>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-2" aria-label="Assessment progress">
          {[1, 2, 3, 4].map((item) => <span key={item} className={`h-1.5 ${item <= step ? "bg-[#1f7a4d]" : "bg-[#dfe7e1]"}`} />)}
        </div>
      </div>

      <div className="p-6 sm:p-9">
        {step === 1 ? <StepOne assessment={assessment} update={update} /> : null}
        {step === 2 ? <StepTwo assessment={assessment} update={update} toggleItem={toggleItem} /> : null}
        {step === 3 ? <StepThree assessment={assessment} update={update} /> : null}
        {step === 4 ? <StepFour assessment={assessment} update={update} /> : null}
        {submitError ? <p className="mt-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800" role="alert">{submitError}</p> : null}
        <div className="mt-9 flex flex-col-reverse gap-3 border-t border-[#17211b]/15 pt-6 sm:flex-row sm:justify-between">
          {step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#17211b]/25 px-5 font-semibold"><ArrowLeft className="h-4 w-4" /> Back</button> : <span />}
          {step < 4 ? <button type="button" onClick={() => setStep((current) => current + 1)} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17211b] px-5 font-semibold text-white">Continue <ArrowRight className="h-4 w-4" /></button> : <button type="button" onClick={finish} disabled={submitting || !assessment.name.trim() || !assessment.email.trim()} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17211b] px-5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">{submitting ? "Saving your checklist..." : "Generate my free report"} {!submitting ? <ArrowRight className="h-4 w-4" /> : null}</button>}
        </div>
      </div>
    </section>
  );
}

function StepOne({ assessment, update }: { assessment: Assessment; update: <K extends keyof Assessment>(key: K, value: Assessment[K]) => void }) {
  return <div>
    <p className="text-xs font-bold uppercase text-[#1f7a4d]">First, tell us what we are looking at</p>
    <h3 className="mt-2 text-2xl font-semibold">Is this checkup for you or your business?</h3>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {(["personal", "business"] as const).map((type) => <button key={type} type="button" onClick={() => update("type", type)} className={`border p-5 text-left transition ${assessment.type === type ? "border-[#1f7a4d] bg-[#e9f1eb]" : "border-[#17211b]/15 hover:border-[#1f7a4d]"}`}><p className="font-semibold">{type === "personal" ? "Personal technology" : "Small-business technology"}</p><p className="mt-2 text-sm leading-6 text-[#607067]">{type === "personal" ? "Home Wi-Fi, computers, phones, family devices, accounts, and backups." : "Team devices, business accounts, Wi-Fi, cloud tools, security, and recovery."}</p></button>)}
    </div>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <Field label="Your name"><input value={assessment.name} onChange={(event) => update("name", event.target.value)} required placeholder="Your name" className={inputClass} /></Field>
      <Field label="Email for your report"><input type="email" value={assessment.email} onChange={(event) => update("email", event.target.value)} required placeholder="you@example.com" className={inputClass} /></Field>
      {assessment.type === "business" ? <Field label="Business name"><input value={assessment.businessName} onChange={(event) => update("businessName", event.target.value)} placeholder="Your business name" className={inputClass} /></Field> : null}
    </div>
  </div>;
}

function StepTwo({ assessment, update, toggleItem }: { assessment: Assessment; update: <K extends keyof Assessment>(key: K, value: Assessment[K]) => void; toggleItem: (key: "devices" | "systems", item: string) => void }) {
  const items = assessment.type === "business" ? businessSystems : personalDevices;
  return <div>
    <p className="text-xs font-bold uppercase text-[#1f7a4d]">Your setup</p>
    <h3 className="mt-2 text-2xl font-semibold">What technology should be part of the report?</h3>
    <p className="mt-2 text-[#607067]">Choose everything that applies. This helps us make the report useful instead of generic.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">{items.map((item) => { const key = assessment.type === "business" ? "systems" : "devices"; const selected = assessment[key].includes(item); return <button type="button" key={item} onClick={() => toggleItem(key, item)} className={`flex items-center gap-3 border p-4 text-left text-sm font-semibold ${selected ? "border-[#1f7a4d] bg-[#e9f1eb]" : "border-[#17211b]/15"}`}><span className={`grid h-5 w-5 place-items-center border ${selected ? "border-[#1f7a4d] bg-[#1f7a4d] text-white" : "border-[#17211b]/25"}`}>{selected ? <Check className="h-3.5 w-3.5" /> : null}</span>{item}</button>; })}</div>
    <Field label={assessment.type === "business" ? "How many people use these systems?" : "How many main devices are you managing?"}>
      <select value={assessment.type === "business" ? assessment.users : assessment.deviceCount} onChange={(event) => update(assessment.type === "business" ? "users" : "deviceCount", event.target.value)} className={inputClass}>{(assessment.type === "business" ? ["1-5", "6-20", "21+"] : ["1-2", "3-5", "6+"]).map((option) => <option key={option}>{option}</option>)}</select>
    </Field>
  </div>;
}

function StepThree({ assessment, update }: { assessment: Assessment; update: <K extends keyof Assessment>(key: K, value: Assessment[K]) => void }) {
  return <div>
    <p className="text-xs font-bold uppercase text-[#1f7a4d]">Health snapshot</p>
    <h3 className="mt-2 text-2xl font-semibold">How does your setup feel today?</h3>
    <p className="mt-2 text-[#607067]">Honest answers are more useful than perfect answers. “Not sure” is a good answer.</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <Choice label="Wi-Fi reliability" value={assessment.wifi} options={["Good", "Sometimes unreliable", "Frequently unreliable", "Not sure"]} onChange={(value) => update("wifi", value)} />
      <Choice label="Multi-factor sign-in protection" value={assessment.mfa} options={["Most accounts", "Some accounts", "No", "Not sure"]} onChange={(value) => update("mfa", value)} />
      <Choice label="Password organization" value={assessment.passwords} options={["Password manager", "Mostly separate", "A few reused", "Not sure"]} onChange={(value) => update("passwords", value)} />
      <Choice label="Device and software updates" value={assessment.updates} options={["Usually current", "Sometimes behind", "Often behind", "Not sure"]} onChange={(value) => update("updates", value)} />
      <Choice label="Backups" value={assessment.backups} options={["Yes and tested", "Yes but not tested", "No", "Not sure"]} onChange={(value) => update("backups", value)} />
    </div>
  </div>;
}

function StepFour({ assessment, update }: { assessment: Assessment; update: <K extends keyof Assessment>(key: K, value: Assessment[K]) => void }) {
  return <div>
    <p className="text-xs font-bold uppercase text-[#1f7a4d]">One last detail</p>
    <h3 className="mt-2 text-2xl font-semibold">What would make the biggest difference?</h3>
    <p className="mt-2 text-[#607067]">Tell us what you want to feel better about. We will put it at the top of your report.</p>
    <textarea value={assessment.concern} onChange={(event) => update("concern", event.target.value)} rows={6} placeholder={assessment.type === "business" ? "For example: our Wi-Fi drops during the day, we are unsure about backups, or we need to organize employee access." : "For example: the Wi-Fi is weak upstairs, I am worried about account security, or I do not know if my photos are backed up."} className="mt-6 w-full resize-y border border-[#17211b]/20 bg-[#f8f9f5] px-4 py-3 leading-6 outline-none focus:border-[#1f7a4d]" />
    <div className="mt-5 flex gap-3 border border-[#17211b]/15 bg-[#f6f7f2] p-4 text-sm leading-6 text-[#607067]"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#1f7a4d]" />This report is educational guidance based on your answers. Never include passwords, recovery codes, payment details, or private client information.</div>
  </div>;
}

function ReportView({ report, name }: { report: Report; name: string }) {
  return <section className="border border-[#17211b]/15 bg-white shadow-[14px_14px_0_#dff3e7]" id="report">
    <div className="border-b border-[#17211b]/15 bg-[#17211b] p-6 text-white sm:p-9"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase text-[#9dd9b7]">Your free report</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">{report.title}</h2><p className="mt-3 max-w-2xl leading-7 text-white/70">Prepared for {name}. {report.intro}</p></div><div className="text-left sm:text-right"><p className="text-xs uppercase text-white/55">Overall snapshot</p><p className="mt-1 text-5xl font-semibold text-[#9dd9b7]">{report.overall}<span className="text-2xl text-white/50">/100</span></p></div></div></div>
    <div className="p-6 sm:p-9">
      <div className="grid gap-4 lg:grid-cols-3">{report.metrics.map(({ label, score: metricScore, summary, icon: Icon }) => <article key={label} className="border border-[#17211b]/15 p-5"><div className="flex items-center justify-between"><div className="flex items-center gap-3"><Icon className="h-5 w-5 text-[#1f7a4d]" /><h3 className="font-semibold">{label}</h3></div><span className="text-xl font-semibold">{metricScore}</span></div><div className="mt-4 h-2 bg-[#e3ebe5]"><div className="h-full bg-[#1f7a4d]" style={{ width: `${metricScore}%` }} /></div><p className="mt-4 text-sm leading-6 text-[#607067]">{summary}</p></article>)}</div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]"><div><p className="text-xs font-bold uppercase text-[#1f7a4d]">Priority plan</p><h3 className="mt-2 text-2xl font-semibold">Start here</h3><ol className="mt-5 space-y-4">{report.priorities.map((priority, index) => <li key={priority} className="flex gap-4 border-b border-[#17211b]/10 pb-4"><span className="font-mono text-sm text-[#1f7a4d]">0{index + 1}</span><span className="leading-7">{priority}</span></li>)}</ol></div><div className="border border-[#17211b]/15 bg-[#e9f1eb] p-6"><p className="text-xs font-bold uppercase text-[#1f7a4d]">Recommended next step</p><p className="mt-4 leading-7 text-[#4c5c52]">{report.nextStep}</p><div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col"><button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17211b] px-5 font-semibold text-white"><Download className="h-4 w-4" /> Print or save report</button><a href="/support?issue=Technology%20Checkup" className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#17211b]/25 px-5 font-semibold">Talk through the report <ArrowRight className="h-4 w-4" /></a></div></div></div>
    </div>
  </section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mt-5 block text-sm font-semibold">{label}{children}</label>;
}

function Choice({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return <Field label={label}><select value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>{options.map((option) => <option key={option}>{option}</option>)}</select></Field>;
}

const inputClass = "mt-2 min-h-12 w-full border border-[#17211b]/20 bg-[#f8f9f5] px-4 outline-none focus:border-[#1f7a4d]";
