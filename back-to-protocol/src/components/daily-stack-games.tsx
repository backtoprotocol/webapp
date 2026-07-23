"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const cardClass = "rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.16)] sm:p-8";
const buttonClass = "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

function GameHeader({ name, kicker, title, description }: { name: string; kicker: string; title: string; description: string }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">{name} · {kicker}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">{description}</p>
      </div>
      <Link href="/games" className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">← All games</Link>
    </div>
  );
}

function PostGameFact({ fact, pillar }: { fact: string; pillar: string }) {
  return (
    <aside className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5 text-amber-950">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-800">The science bonus · {pillar}</p>
      <p className="mt-3 leading-7">{fact}</p>
      <Link href="/articles" className="mt-4 inline-flex text-sm font-semibold underline underline-offset-4">Explore the evidence →</Link>
    </aside>
  );
}

const spikeRounds = [
  { left: "Burpees", leftValue: 120, right: "Mountain climbers", rightValue: 100 },
  { left: "Brisk walking", leftValue: 50, right: "Easy cycling", rightValue: 60 },
  { left: "Jump rope", leftValue: 130, right: "Bodyweight squats", rightValue: 80 },
  { left: "Swimming laps", leftValue: 110, right: "Yoga flow", rightValue: 70 },
];

export function SpikeGame() {
  const [mode, setMode] = useState<"daily" | "endless">("daily");
  const [round, setRound] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const matchup = spikeRounds[round % spikeRounds.length];

  function choose(value: number) {
    if (finished) return;
    if (value === Math.max(matchup.leftValue, matchup.rightValue)) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (mode === "daily" && round === spikeRounds.length - 1) setFinished(true);
      else setRound((current) => current + 1);
    } else {
      setFinished(true);
    }
  }

  function reset(nextMode = mode) {
    setMode(nextMode);
    setRound(0);
    setStreak(0);
    setFinished(false);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:py-14">
      <GameHeader name="SPIKE" kicker={mode === "daily" ? "Daily challenge" : "Endless"} title="Trust your gut. Keep the streak alive." description="Which movement burns more energy in ten minutes? Pick a card—no calculations, just the better call." />
      <section className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2 rounded-full bg-slate-100 p-1">
            {(["daily", "endless"] as const).map((item) => <button key={item} type="button" onClick={() => reset(item)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${mode === item ? "bg-slate-950 text-white" : "text-slate-600 hover:text-slate-950"}`}>{item}</button>)}
          </div>
          <p className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">Current streak: {streak}</p>
        </div>
        {finished ? (
          <div className="py-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Run complete</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-950">{streak} {streak === 1 ? "win" : "wins"}</h2>
            <p className="mt-3 text-slate-600">{streak === spikeRounds.length ? "Perfect daily run. Nicely judged." : "A good instinct gets sharper with another run."}</p>
            <button type="button" onClick={() => reset()} className="mt-7 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Play again</button>
            <PostGameFact pillar="Movement" fact="Energy expenditure varies by body size and intensity, so these matchups use typical relative effort—not a promise of exact calories." />
          </div>
        ) : (
          <div className="py-8 sm:py-12">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Which burns more in 10 minutes?</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button type="button" onClick={() => choose(matchup.leftValue)} className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-orange-50 to-white p-8 text-left transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">Pick one</span><span className="mt-8 block text-3xl font-semibold text-slate-950">{matchup.left}</span>
              </button>
              <button type="button" onClick={() => choose(matchup.rightValue)} className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-sky-50 to-white p-8 text-left transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">Pick one</span><span className="mt-8 block text-3xl font-semibold text-slate-950">{matchup.right}</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

const sortedTiles = [
  ["Coffee", "Deadline", "Poor sleep", "Hard interval"],
  ["Walk outside", "Long exhale", "Warm shower", "Journal"],
  ["Deload week", "Protein meal", "Rest day", "Mobility work"],
  ["Bedtime alarm", "Morning light", "Cool room", "Phone away"],
].map((items, group) => items.map((label) => ({ label, group }))).flat();

export function SortedGame() {
  const tiles = useMemo(() => [...sortedTiles].sort((a, b) => a.label.localeCompare(b.label)), []);
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState("Find four things that belong together.");
  const activeTiles = tiles.filter((tile) => !solved.includes(tile.group));
  const complete = solved.length === 4 || mistakes >= 4;

  function toggle(label: string) { setSelected((current) => current.includes(label) ? current.filter((item) => item !== label) : current.length < 4 ? [...current, label] : current); }
  function submit() {
    const group = activeTiles.find((tile) => tile.label === selected[0])?.group;
    if (selected.length !== 4 || group === undefined) return;
    if (selected.every((label) => activeTiles.find((tile) => tile.label === label)?.group === group)) {
      setSolved((current) => [...current, group]); setSelected([]); setMessage("Connected. Find the next four.");
    } else { setMistakes((current) => current + 1); setSelected([]); setMessage("Not quite—try another connection."); }
  }
  function reset() { setSelected([]); setSolved([]); setMistakes(0); setMessage("Find four things that belong together."); }

  return <main className="mx-auto max-w-4xl px-6 py-10 sm:px-8 lg:py-14"><GameHeader name="SORTED" kicker="Daily puzzle" title="See the connections hiding in plain sight." description="Select four tiles that form a group. Four mistakes ends the run—no answers spoiled until you play." /><section className={cardClass}>
    <div className="flex items-center justify-between gap-3 text-sm font-semibold"><p className="text-slate-600">{message}</p><p className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">Mistakes: {mistakes}/4</p></div>
    {complete ? <div className="py-10 text-center"><h2 className="text-3xl font-semibold">{solved.length === 4 ? "Board cleared." : "Good run."}</h2><p className="mt-3 text-slate-600">You found {solved.length} of 4 hidden groups.</p><button type="button" onClick={reset} className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Play again</button><PostGameFact pillar="Stress & Recovery" fact="Stress management is not one tool: physical load, sleep, recovery, and daily routines all affect how you feel and perform." /></div> : <><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{activeTiles.map((tile) => <button type="button" key={tile.label} onClick={() => toggle(tile.label)} className={`${buttonClass} min-h-20 ${selected.includes(tile.label) ? "border-slate-950 bg-slate-950 text-white" : ""}`}>{tile.label}</button>)}</div><button type="button" disabled={selected.length !== 4} onClick={submit} className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40">Submit group</button></>}
  </section></main>;
}

const blurRounds = [
  { emoji: "🥑", answers: ["Avocado", "Kettlebell", "Sleep mask", "Foam roller"], correct: "Avocado", fact: "Avocados provide unsaturated fats and fiber—useful ingredients in a balanced meal, not a standalone health fix." },
  { emoji: "🏋️", answers: ["Cold plunge", "Strength training", "Meditation", "Protein shake"], correct: "Strength training", fact: "Strength training supports muscle, bone health, and everyday function across the lifespan." },
  { emoji: "🧊", answers: ["Cold exposure", "Hydration", "Sleep tracking", "Mobility"], correct: "Cold exposure", fact: "Cold exposure can feel invigorating, but it is optional—not a replacement for sleep, food, or training basics." },
];

export function BlurGame() {
  const [round, setRound] = useState(0); const [guesses, setGuesses] = useState(0); const [done, setDone] = useState(false); const current = blurRounds[round];
  function choose(answer: string) { if (done) return; if (answer === current.correct || guesses === 2) setDone(true); else setGuesses((value) => value + 1); }
  function next() { setRound((value) => (value + 1) % blurRounds.length); setGuesses(0); setDone(false); }
  return <main className="mx-auto max-w-3xl px-6 py-10 sm:px-8 lg:py-14"><GameHeader name="BLUR" kicker="Daily reveal" title="What are you looking at?" description="Choose an answer. Every miss brings the image into focus—curiosity first, science second." /><section className={`${cardClass} text-center`}>
    <div className="mx-auto flex h-52 w-full max-w-md items-center justify-center rounded-[2rem] bg-gradient-to-br from-emerald-100 via-amber-50 to-sky-100 text-8xl transition duration-500" style={{ filter: done ? "blur(0px)" : `blur(${Math.max(0, 14 - guesses * 5)}px)` }}>{current.emoji}</div>
    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Reveal {guesses + 1} of 3</p>
    {done ? <div><h2 className="mt-4 text-3xl font-semibold text-slate-950">It&apos;s {current.correct}.</h2><button type="button" onClick={next} className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Next reveal</button><PostGameFact pillar="Nutrition & Recovery" fact={current.fact} /></div> : <div className="mt-6 grid gap-3 sm:grid-cols-2">{current.answers.map((answer) => <button type="button" key={answer} onClick={() => choose(answer)} className={buttonClass}>{answer}</button>)}</div>}
  </section></main>;
}

export function GutGame() {
  const target = 72; const [guess, setGuess] = useState(50); const [submitted, setSubmitted] = useState(false); const score = Math.max(0, 100 - Math.abs(target - guess) * 2);
  function reset() { setGuess(50); setSubmitted(false); }
  return <main className="mx-auto max-w-3xl px-6 py-10 sm:px-8 lg:py-14"><GameHeader name="GUT" kicker="Daily spectrum" title="Put the answer where your instinct lands." description="Drag the marker between two extremes. Your score is based on how close you get—not whether you memorized a statistic." /><section className={cardClass}>
    {submitted ? <div className="py-8 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Your result</p><h2 className="mt-3 text-5xl font-semibold text-slate-950">{score}%</h2><p className="mt-4 text-slate-600">You landed {Math.abs(target - guess)}% from the target zone.</p><button type="button" onClick={reset} className="mt-7 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Try again</button><PostGameFact pillar="Sleep" fact="Even modest sleep restriction can impair attention and reaction time. The most reliable performance tool is still enough consistent sleep." /></div> : <div className="py-6"><p className="mx-auto max-w-xl text-center text-xl font-semibold leading-8 text-slate-950">After a short night, where does your reaction time land between fully rested and severely impaired?</p><div className="mt-10"><div className="flex justify-between text-sm font-semibold text-slate-600"><span>Fully rested</span><span>Severely impaired</span></div><input aria-label="Reaction-time estimate" type="range" min="0" max="100" value={guess} onChange={(event) => setGuess(Number(event.target.value))} className="mt-5 w-full accent-slate-950" /><p className="mt-4 text-center text-sm text-slate-500">Place your marker, then reveal the answer.</p></div><div className="mt-8 text-center"><button type="button" onClick={() => setSubmitted(true)} className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Reveal score</button></div></div>}
  </section></main>;
}
