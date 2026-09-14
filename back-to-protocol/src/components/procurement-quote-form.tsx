"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";

type QuoteKind = "hardware" | "software";

type Props = { kind: QuoteKind };

const inputClass = "mt-2 min-h-12 w-full border border-[#17211b]/20 bg-[#f8f9f5] px-4 outline-none focus:border-[#1f7a4d]";
const textareaClass = "mt-2 w-full border border-[#17211b]/20 bg-[#f8f9f5] px-4 py-3 outline-none focus:border-[#1f7a4d]";

const hardwareCategories = ["Desktops", "Laptops", "Servers", "Monitors", "Printers or scanners", "Networking (Wi-Fi, switches, firewalls)", "Mobile devices", "Accessories"];
const softwareCategories = ["Office & productivity", "Email & communication", "Accounting or finance", "CRM or sales", "Security & antivirus", "Cloud storage & backup", "Industry-specific software", "Custom or line-of-business app"];
const processorOptions = ["Not sure / recommend one", "Entry level (everyday tasks)", "Mid range (multitasking)", "High performance (design, dev, or heavy workloads)"];
const storageOptions = ["Not sure / recommend one", "256 GB", "512 GB", "1 TB", "2 TB+", "Server / NAS storage"];
const ramOptions = ["Not sure / recommend one", "8 GB", "16 GB", "32 GB", "64 GB+"];
const licenseOptions = ["Not sure / recommend one", "Per user / seat", "Per device", "Site or business-wide license", "Free or open source preferred"];
const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits.length) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

type Form = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  address: string;
  users: string;
  categories: string[];
  quantity: string;
  processor: string;
  ram: string;
  storage: string;
  operatingSystem: string;
  brand: string;
  licenseType: string;
  currentSoftware: string;
  products: string;
  budget: string;
  timeline: string;
  current: string;
  goals: string;
  details: string;
};

const initialForm: Form = {
  name: "",
  email: "",
  phone: "",
  businessName: "",
  address: "",
  users: "",
  categories: [],
  quantity: "",
  processor: "",
  ram: "",
  storage: "",
  operatingSystem: "",
  brand: "",
  licenseType: "",
  currentSoftware: "",
  products: "",
  budget: "",
  timeline: "",
  current: "",
  goals: "",
  details: "",
};

export function ProcurementQuoteForm({ kind }: Props) {
  const hardware = kind === "hardware";
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Form>(initialForm);

  const update = <K extends keyof Form>(key: K, value: Form[K]) => setForm((current) => ({ ...current, [key]: value }));
  const toggleCategory = (item: string) => update("categories", form.categories.includes(item) ? form.categories.filter((value) => value !== item) : [...form.categories, item]);

  const submit = async () => {
    setSaving(true);
    setError("");
    const title = hardware ? "Hardware Quote Request" : "Software Quote Request";
    const description = [
      `Business or household name: ${form.businessName || "Not provided"}`,
      `Address: ${form.address || "Not provided"}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Number of users: ${form.users || "Not provided"}`,
      `${hardware ? "Equipment types" : "Software categories"}: ${form.categories.length ? form.categories.join(", ") : "Not provided"}`,
      hardware ? `Number of devices: ${form.quantity || "Not provided"}` : `Number of licenses or seats: ${form.quantity || "Not provided"}`,
      hardware ? `Processor / performance level: ${form.processor || "Not provided"}` : `Licensing type: ${form.licenseType || "Not provided"}`,
      hardware ? `RAM (memory): ${form.ram || "Not provided"}` : `Current software in use: ${form.currentSoftware || "Not provided"}`,
      hardware ? `Storage: ${form.storage || "Not provided"}` : "",
      hardware ? `Operating system: ${form.operatingSystem || "Not provided"}` : "",
      `${hardware ? "Preferred brand or model" : "Preferred software or vendor"}: ${form.brand || "Not provided"}`,
      `${hardware ? "Additional equipment needed" : "Additional software or services needed"}: ${form.products || "Not provided"}`,
      `Budget: ${form.budget || "Not provided"}`,
      `Timeline: ${form.timeline || "Not provided"}`,
      `Current setup: ${form.current || "Not provided"}`,
      `Goals: ${form.goals || "Not provided"}`,
      `Additional details: ${form.details || "Not provided"}`,
    ].filter(Boolean).join("\n");
    try {
      const response = await fetch("/api/checkup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ customerName: form.name, customerEmail: form.email, customerPhone: form.phone, customerCompany: form.businessName, customerAddress: form.address, subject: title, description, service: "Business IT" }) });
      const result = response.ok ? await response.json() : null;
      if (!response.ok) throw new Error(result?.error || "Unable to save your quote request.");
      setTicketNumber(result.ticketNumber || "");
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save your quote request.");
    } finally {
      setSaving(false);
    }
  };

  if (submitted) return <section className="border border-[#17211b]/15 bg-white p-8 shadow-[14px_14px_0_#dff3e7] sm:p-10"><CheckCircle2 className="h-10 w-10 text-[#1f7a4d]" /><p className="mt-6 text-xs font-bold uppercase text-[#1f7a4d]">Quote request received</p><h2 className="mt-2 font-serif text-4xl">We have the details.</h2><p className="mt-4 max-w-xl leading-7 text-[#607067]">Your request{ticketNumber ? <> <strong className="text-[#17211b]">{ticketNumber}</strong></> : null} is now in our operations queue. We will review the project and follow up with the best next step.</p></section>;

  return <section className="border border-[#17211b]/15 bg-white shadow-[14px_14px_0_#dff3e7]">
    <div className="border-b border-[#17211b]/15 px-6 py-6 sm:px-9">
      <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-[#1f7a4d]">{hardware ? "Hardware procurement quote" : "Software procurement quote"}</p><h2 className="mt-2 font-serif text-3xl sm:text-4xl">{hardware ? "Tell us what you need to source." : "Tell us what your software needs to do."}</h2></div><span className="text-sm font-semibold text-[#607067]">Step {step} of 4</span></div>
      <div className="mt-6 grid grid-cols-4 gap-2">{[1, 2, 3, 4].map((item) => <span key={item} className={`h-1.5 ${item <= step ? "bg-[#1f7a4d]" : "bg-[#dfe7e1]"}`} />)}</div>
    </div>
    <div className="p-6 sm:p-9">
      {step === 1 ? <div>
        <p className="text-xs font-bold uppercase text-[#1f7a4d]">About you</p>
        <h3 className="mt-2 text-2xl font-semibold">Who should we prepare this quote for?</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Your name<input required value={form.name} onChange={(event) => update("name", event.target.value)} className={inputClass} placeholder="Your name" /></label>
          <label className="text-sm font-semibold">Email<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} className={inputClass} placeholder="you@example.com" /></label>
          <label className="text-sm font-semibold">Phone number<input required type="tel" inputMode="tel" value={form.phone} onChange={(event) => update("phone", formatPhone(event.target.value))} pattern="\(\d{3}\) \d{3}-\d{4}" title="Format: (999) 999-9999" maxLength={14} className={inputClass} placeholder="(999) 999-9999" /></label>
          <label className="text-sm font-semibold">Business or household name<input value={form.businessName} onChange={(event) => update("businessName", event.target.value)} className={inputClass} placeholder="Your business name" /></label>
          <label className="text-sm font-semibold">Address<input value={form.address} onChange={(event) => update("address", event.target.value)} className={inputClass} placeholder="Street, city, state, zip" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Number of users<input value={form.users} onChange={(event) => update("users", event.target.value)} className={inputClass} placeholder="Example: 8 employees" /></label>
        </div>
      </div> : null}

      {step === 2 ? <div>
        <p className="text-xs font-bold uppercase text-[#1f7a4d]">{hardware ? "Equipment" : "Software"}</p>
        <h3 className="mt-2 text-2xl font-semibold">{hardware ? "What kind of equipment do you need?" : "What kind of software do you need?"}</h3>
        <p className="mt-2 text-[#607067]">Choose everything that applies.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">{(hardware ? hardwareCategories : softwareCategories).map((item) => { const selected = form.categories.includes(item); return <button type="button" key={item} onClick={() => toggleCategory(item)} className={`flex items-center gap-3 border p-4 text-left text-sm font-semibold ${selected ? "border-[#1f7a4d] bg-[#e9f1eb]" : "border-[#17211b]/15"}`}><span className={`grid h-5 w-5 shrink-0 place-items-center border ${selected ? "border-[#1f7a4d] bg-[#1f7a4d] text-white" : "border-[#17211b]/25"}`}>{selected ? <Check className="h-3.5 w-3.5" /> : null}</span>{item}</button>; })}</div>
        <label className="mt-6 block text-sm font-semibold">{hardware ? "How many devices do you need?" : "How many users or licenses?"}<input value={form.quantity} onChange={(event) => update("quantity", event.target.value)} className={inputClass} placeholder={hardware ? "Example: 6 laptops, 2 access points" : "Example: 12 users"} /></label>
      </div> : null}

      {step === 3 ? <div>
        <p className="text-xs font-bold uppercase text-[#1f7a4d]">{hardware ? "Specifications" : "Licensing"}</p>
        <h3 className="mt-2 text-2xl font-semibold">{hardware ? "What specs should the equipment have?" : "How should this software be licensed?"}</h3>
        {hardware ? <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Processor / performance level<select value={form.processor} onChange={(event) => update("processor", event.target.value)} className={inputClass}><option value="">Select an option</option>{processorOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="text-sm font-semibold">RAM (memory)<select value={form.ram} onChange={(event) => update("ram", event.target.value)} className={inputClass}><option value="">Select an option</option>{ramOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="text-sm font-semibold">Storage<select value={form.storage} onChange={(event) => update("storage", event.target.value)} className={inputClass}><option value="">Select an option</option>{storageOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="text-sm font-semibold">Operating system<input value={form.operatingSystem} onChange={(event) => update("operatingSystem", event.target.value)} className={inputClass} placeholder="Example: Windows 11, macOS" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Preferred brand or model<input value={form.brand} onChange={(event) => update("brand", event.target.value)} className={inputClass} placeholder="Example: Lenovo, Dell, Ubiquiti" /></label>
        </div> : <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Licensing type<select value={form.licenseType} onChange={(event) => update("licenseType", event.target.value)} className={inputClass}><option value="">Select an option</option>{licenseOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label className="text-sm font-semibold">Preferred software or vendor<input value={form.brand} onChange={(event) => update("brand", event.target.value)} className={inputClass} placeholder="Example: Microsoft 365, QuickBooks" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Current software in use<input value={form.currentSoftware} onChange={(event) => update("currentSoftware", event.target.value)} className={inputClass} placeholder="What are you using today, if anything?" /></label>
        </div>}
        <label className="mt-5 block text-sm font-semibold">{hardware ? "Additional equipment needed" : "Additional software or services needed"}<textarea rows={3} value={form.products} onChange={(event) => update("products", event.target.value)} className={textareaClass} placeholder={hardware ? "Monitors, docking stations, printers, storage, accessories..." : "Migration, security, backups, integrations, onboarding..."} /></label>
      </div> : null}

      {step === 4 ? <div>
        <p className="text-xs font-bold uppercase text-[#1f7a4d]">Budget and timing</p>
        <h3 className="mt-2 text-2xl font-semibold">Help us build the right recommendation.</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold">Target budget<input value={form.budget} onChange={(event) => update("budget", event.target.value)} className={inputClass} placeholder="Example: $5,000 or $40/user/month" /></label>
          <label className="text-sm font-semibold">Ideal timeline<input value={form.timeline} onChange={(event) => update("timeline", event.target.value)} className={inputClass} placeholder="Example: This month" /></label>
          <label className="text-sm font-semibold sm:col-span-2">Current setup<textarea rows={3} value={form.current} onChange={(event) => update("current", event.target.value)} className={textareaClass} placeholder="What are you using now? What needs to change?" /></label>
          <label className="text-sm font-semibold sm:col-span-2">What would make this a success?<textarea rows={3} value={form.goals} onChange={(event) => update("goals", event.target.value)} className={textareaClass} placeholder="Tell us what you want the finished setup to accomplish." /></label>
          <label className="text-sm font-semibold sm:col-span-2">Anything else we should know?<textarea rows={3} value={form.details} onChange={(event) => update("details", event.target.value)} className={textareaClass} placeholder="Optional additional details." /></label>
        </div>
      </div> : null}

      {error ? <p className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p> : null}
      <div className="mt-9 flex flex-col-reverse gap-3 border-t border-[#17211b]/15 pt-6 sm:flex-row sm:justify-between">
        {step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#17211b]/25 px-5 font-semibold"><ArrowLeft className="h-4 w-4" /> Back</button> : <span />}
        {step < 4 ? <button type="button" onClick={() => setStep((current) => current + 1)} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17211b] px-5 font-semibold text-white">Continue <ArrowRight className="h-4 w-4" /></button> : <button type="button" onClick={submit} disabled={saving || !form.name.trim() || !form.email.trim() || !phonePattern.test(form.phone)} className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#17211b] px-5 font-semibold text-white disabled:opacity-40">{saving ? "Sending quote request..." : "Request my quote"} {!saving ? <ArrowRight className="h-4 w-4" /> : null}</button>}
      </div>
    </div>
  </section>;
}
