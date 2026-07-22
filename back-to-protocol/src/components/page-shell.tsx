import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  className,
}: PageShellProps) {
  return (
    <main className={`relative overflow-hidden px-6 py-10 sm:px-8 lg:px-10 lg:py-14 ${className ?? ""}`}>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_24%),radial-gradient(circle_at_90%_10%,rgba(14,165,233,0.1),transparent_20%),radial-gradient(circle_at_15%_85%,rgba(168,85,247,0.08),transparent_22%)]" />
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.18)] sm:p-10 lg:p-12">
          {eyebrow ? <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">{eyebrow}</p> : null}
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          {description ? <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{description}</p> : null}
        </section>
        {children}
      </div>
    </main>
  );
}
