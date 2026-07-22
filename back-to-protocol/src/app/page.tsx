import Link from "next/link";

const latestArticles = [
  {
    title: "Recovery protocols that actually fit real life",
    description: "A simple framework for creating calm, clarity, and better daily routines.",
    href: "/articles",
  },
  {
    title: "The hidden cost of overthinking under pressure",
    description: "Why modern performance depends on recovery as much as discipline.",
    href: "/articles",
  },
  {
    title: "How to rebuild momentum after burnout",
    description: "Practical steps to regain energy without forcing yourself back into overload.",
    href: "/articles",
  },
];

const exploreCards = [
  {
    label: "Protocols",
    title: "Practical systems for steadier days",
    description: "Tools for recovery, focus, and calmer routines.",
    href: "/articles",
  },
  {
    label: "Podcast",
    title: "Conversations that feel grounded and human",
    description: "Thoughtful audio for people navigating stress and change.",
    href: "/podcast",
  },
  {
    label: "News",
    title: "A clearer view of what matters now",
    description: "Relevant stories, updates, and fresh perspectives.",
    href: "/news",
  },
  {
    label: "Games",
    title: "Small interactive experiences with meaning",
    description: "Short, reflective exercises that feel rewarding.",
    href: "/games",
  },
];

const episodes = [
  { title: "Protocol Reset", subtitle: "A practical reset for burnout and overwhelm", href: "/podcast" },
  { title: "Anchor the Day", subtitle: "A calm morning routine for steady energy", href: "/podcast" },
];

const featuredPosts = [
  {
    title: "How to rebuild after chronic stress",
    category: "Recovery",
    description: "A practical guide to creating steadiness after burnout and overload.",
    href: "/articles",
  },
  {
    title: "Why high performers need better recovery systems",
    category: "Performance",
    description: "How structure can protect focus, energy, and long-term resilience.",
    href: "/podcast",
  },
  {
    title: "The daily reset that actually lasts",
    category: "Habits",
    description: "A simple framework for returning to calm after a difficult week.",
    href: "/research",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden px-6 pb-20 pt-8 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:gap-14">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6 text-white shadow-[0_30px_90px_-35px_rgba(15,23,42,0.24)] sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_35%)]" />
          <div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full border border-white/15" />
          <div className="absolute bottom-[-12px] left-[-8px] h-20 w-20 rounded-full border border-white/10" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-300">Stay in the loop</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Join the newsletter for thoughtful updates and practical guidance.
              </h2>
            </div>
            <form className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Your email"
                className="w-full min-w-[240px] rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-300 outline-none backdrop-blur transition focus:border-white/40 focus:ring-2 focus:ring-white/20 sm:w-72"
              />
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Subscribe
              </Link>
            </form>
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/90 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.12)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white lg:border-b-0 lg:border-r">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-300">Featured story</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">A calmer kind of media for people rebuilding their lives.</h2>
              <p className="mt-4 max-w-xl text-sm leading-8 text-slate-300">
                We blend thoughtful essays, practical guidance, audio conversations, and playful experiences into one soft, intentional place to explore.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={latestArticles[0].href} className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                  Read the feature
                </Link>
                <Link href="/podcast" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                  Listen now
                </Link>
              </div>
            </div>

            <div className="grid gap-4 p-8 sm:grid-cols-2">
              {exploreCards.map((card) => (
                <Link key={card.title} href={card.href} className="rounded-[1.5rem] border border-slate-200/80 bg-slate-950/5 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-500">{card.label}</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">{card.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Latest podcast</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">Practical conversations for recovery and performance.</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.32em] text-slate-500">Audio</span>
            </div>
            <div className="mt-8 space-y-4">
              {episodes.map((episode) => (
                <Link key={episode.title} href={episode.href} className="block rounded-[1.75rem] border border-slate-200/80 bg-slate-950/5 p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white">
                  <p className="text-lg font-semibold text-slate-950">{episode.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{episode.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-8 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.12)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Editor’s picks</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">A richer feed of thoughtful posts and articles.</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.32em] text-slate-500">Read</span>
            </div>
            <div className="mt-8 space-y-4">
              {featuredPosts.map((post) => (
                <Link key={post.title} href={post.href} className="block rounded-[1.75rem] border border-slate-200/80 bg-slate-950/5 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white">
                  <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500">{post.category}</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">{post.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{post.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-slate-950/5 via-slate-50 to-white p-8 shadow-[0_40px_120px_-40px_rgba(79,70,229,0.14)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Stay connected</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">Get practical recovery tools and weekly guidance.</h2>
              <p className="mt-4 max-w-xl text-slate-600 leading-7">
                Join for research-backed updates, simple protocols, and thoughtful support that helps you take the next step with confidence.
              </p>
            </div>
            <form className="space-y-4 rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/40">
              <div>
                <label className="block text-sm font-medium text-slate-700">Email address</label>
                <input type="email" placeholder="you@domain.com" className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200" />
              </div>
              <a href="/subscribe" className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Subscribe
              </a>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
