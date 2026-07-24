"use client";
import { useState } from "react";

export function ArticleShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? "" : window.location.href;
  const open = (target: string) => window.open(target, "_blank", "noopener,noreferrer");
  const copy = async () => { await navigator.clipboard.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  return <div className="mt-3 flex gap-2">
    <button type="button" onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)} aria-label="Share on LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">in</button>
    <button type="button" onClick={() => open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)} aria-label="Share on X" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">X</button>
    <button type="button" onClick={() => void copy()} aria-label="Copy article link" className="min-w-9 rounded-full border border-slate-200 px-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600">{copied ? "Copied" : "Link"}</button>
  </div>;
}
