"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getDailyKey, pickDaily, readStats, recordDailyResult, seededShuffle, type DailyStats, writeStats } from "@/lib/daily-games";

const pageClass = "mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:py-14";
const cardClass = "rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_80px_-34px_rgba(15,23,42,0.16)] sm:p-8";
const buttonClass = "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

const defaultStats: DailyStats = { played: 0, wins: 0, streak: 0, bestStreak: 0 };

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

function useDailyStats(gameId: string) {
  const storageKey = `daily-stack:${gameId}:stats`;
  const [stats, setStats] = useState<DailyStats>(defaultStats);

  useEffect(() => {
    setStats(readStats(storageKey));
  }, [storageKey]);

  function saveResult(dayKey: string, didWin: boolean) {
    setStats((current) => {
      const next = recordDailyResult(current, dayKey, didWin);
      writeStats(storageKey, next);
      return next;
    });
  }

  return { stats, saveResult };
}

function StatsRow({ stats }: { stats: DailyStats }) {
  const winRate = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0;
  return (
    <div className="mb-6 grid gap-3 text-sm sm:grid-cols-4">
      <p className="rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-700">Played: {stats.played}</p>
      <p className="rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-800">Win rate: {winRate}%</p>
      <p className="rounded-full bg-amber-100 px-4 py-2 font-semibold text-amber-900">Streak: {stats.streak}</p>
      <p className="rounded-full bg-indigo-100 px-4 py-2 font-semibold text-indigo-900">Best: {stats.bestStreak}</p>
    </div>
  );
}

type SpikeRound = {
  prompt: string;
  choices: { label: string; impact: number; deck: "Data" | "Policy" | "Science" }[];
};

const spikeRounds: SpikeRound[] = [
  {
    prompt: "Lead story: which headline deserves top billing today?",
    choices: [
      { label: "National sleep guideline update", impact: 92, deck: "Policy" },
      { label: "Celebrity wellness routine", impact: 35, deck: "Science" },
      { label: "Local race recap", impact: 24, deck: "Data" },
    ],
  },
  {
    prompt: "Which follow-up has the highest newsroom value?",
    choices: [
      { label: "Long-term obesity trial results", impact: 89, deck: "Science" },
      { label: "Protein bar taste test", impact: 33, deck: "Data" },
      { label: "Gym playlist trends", impact: 21, deck: "Policy" },
    ],
  },
  {
    prompt: "Which story should move to page one?",
    choices: [
      { label: "City opens 24-hour urgent care network", impact: 86, deck: "Policy" },
      { label: "Fitness app redesign", impact: 30, deck: "Data" },
      { label: "New yoga mat colors", impact: 17, deck: "Science" },
    ],
  },
  {
    prompt: "What gets the morning push alert?",
    choices: [
      { label: "Heatwave hydration advisory", impact: 94, deck: "Policy" },
      { label: "Studio class waitlist", impact: 27, deck: "Data" },
      { label: "Protein powder sale", impact: 18, deck: "Science" },
    ],
  },
  {
    prompt: "Pick the strongest evidence-led angle.",
    choices: [
      { label: "Meta-analysis on blood pressure and sleep", impact: 90, deck: "Science" },
      { label: "Viral morning routine", impact: 29, deck: "Data" },
      { label: "Influencer supplement stack", impact: 16, deck: "Policy" },
    ],
  },
  {
    prompt: "Which piece has the broadest public impact?",
    choices: [
      { label: "School meal policy shift", impact: 88, deck: "Policy" },
      { label: "Gym mirror selfie debate", impact: 25, deck: "Data" },
      { label: "New foam roller launch", impact: 14, deck: "Science" },
    ],
  },
];

export function SpikeGame() {
  const dayKey = getDailyKey();
  const rounds = useMemo(() => seededShuffle(spikeRounds, `spike:${dayKey}`).slice(0, 5), [dayKey]);
  const { stats, saveResult } = useDailyStats("spike");
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [recorded, setRecorded] = useState(false);

  const current = rounds[Math.min(round, rounds.length - 1)];
  const bestImpact = Math.max(...current.choices.map((choice) => choice.impact));
  const isComplete = round >= rounds.length;

  useEffect(() => {
    if (isComplete && !recorded) {
      saveResult(dayKey, score >= 4);
      setRecorded(true);
    }
  }, [dayKey, isComplete, recorded, saveResult, score]);

  function choose(index: number) {
    if (picked !== null) return;
    setPicked(index);
    if (current.choices[index].impact === bestImpact) {
      setScore((value) => value + 1);
    }
  }

  function advance() {
    if (round === rounds.length - 1) {
      setRound(rounds.length);
    } else {
      setRound((value) => value + 1);
    }
    setPicked(null);
  }

  function reset() {
    setRound(0);
    setScore(0);
    setPicked(null);
    setRecorded(false);
  }

  return (
    <main className={pageClass}>
      <GameHeader name="SPIKE" kicker="Front page" title="Pick the lead story before deadline." description="Five rapid editorial calls. Choose the headline with the highest public impact each round." />
      <section className={cardClass}>
        <StatsRow stats={stats} />
        {isComplete ? (
          <div className="py-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Edition closed</p>
            <h2 className="mt-3 text-4xl font-semibold text-slate-950">{score} / {rounds.length}</h2>
            <p className="mt-3 text-slate-600">{score >= 4 ? "Sharp editorial instinct. Front page secured." : "Solid run. Tune your signal and run it back."}</p>
            <button type="button" onClick={reset} className="mt-7 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Replay today</button>
            <PostGameFact pillar="Public Health" fact="Editorial priorities should favor broad impact, evidence quality, and actionability over novelty." />
          </div>
        ) : (
          <div className="py-8 sm:py-10">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Round {round + 1} / {rounds.length}</p>
              <p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Score: {score}</p>
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-slate-950 sm:text-3xl">{current.prompt}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {current.choices.map((choice, index) => {
                const isPicked = picked === index;
                const isBest = choice.impact === bestImpact;
                return (
                  <button
                    type="button"
                    key={choice.label}
                    onClick={() => choose(index)}
                    disabled={picked !== null}
                    className={`rounded-[1.25rem] border p-5 text-left transition ${isPicked ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:-translate-y-1 hover:border-slate-400"}`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-[0.24em] ${isPicked ? "text-slate-300" : "text-slate-500"}`}>{choice.deck}</span>
                    <span className="mt-3 block text-lg font-semibold leading-6">{choice.label}</span>
                    {picked !== null && isBest ? <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Top impact</span> : null}
                  </button>
                );
              })}
            </div>
            {picked !== null ? <button type="button" onClick={advance} className="mt-7 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Next round</button> : null}
          </div>
        )}
      </section>
    </main>
  );
}

type SortedBoard = {
  title: string;
  groups: string[][];
};

const sortedBoards: SortedBoard[] = [
  {
    title: "Build a recovery system",
    groups: [
      ["Morning light", "Cool room", "Dark room", "No late caffeine"],
      ["Walk break", "Long exhale", "Journal", "Short stretch"],
      ["Protein meal", "Hydration", "Fiber plate", "Colorful produce"],
      ["Deload week", "Rest day", "Mobility", "Easy spin"],
    ],
  },
  {
    title: "Find the health desk clusters",
    groups: [
      ["RCT", "Meta-analysis", "Cohort", "Systematic review"],
      ["Policy brief", "Regulation", "Guideline", "Mandate"],
      ["VO2 max", "Resting HR", "Grip strength", "Sleep efficiency"],
      ["Stress load", "Burnout", "Recovery debt", "Circadian drift"],
    ],
  },
  {
    title: "Sort the newsroom workflow",
    groups: [
      ["Pitch", "Assign", "Report", "Publish"],
      ["Interview", "Transcript", "Fact-check", "Edit"],
      ["Headline", "Dek", "Pull quote", "Caption"],
      ["Corrections", "Update", "Archive", "Follow-up"],
    ],
  },
];

export function SortedGame() {
  const dayKey = getDailyKey();
  const board = useMemo(() => pickDaily(sortedBoards, "sorted", dayKey), [dayKey]);
  const groups = board.groups.map((labels, group) => labels.map((label) => ({ label, group }))).flat();
  const tiles = useMemo(() => seededShuffle(groups, `sorted:${dayKey}`), [dayKey, board.title]);
  const { stats, saveResult } = useDailyStats("sorted");
  const [selected, setSelected] = useState<string[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState("Find four things that belong together.");
  const [recorded, setRecorded] = useState(false);
  const activeTiles = tiles.filter((tile) => !solved.includes(tile.group));
  const complete = solved.length === 4 || mistakes >= 4;

  useEffect(() => {
    if (complete && !recorded) {
      saveResult(dayKey, solved.length === 4);
      setRecorded(true);
    }
  }, [complete, dayKey, recorded, saveResult, solved.length]);

  function toggle(label: string) { setSelected((current) => current.includes(label) ? current.filter((item) => item !== label) : current.length < 4 ? [...current, label] : current); }
  function submit() {
    const group = activeTiles.find((tile) => tile.label === selected[0])?.group;
    if (selected.length !== 4 || group === undefined) return;
    if (selected.every((label) => activeTiles.find((tile) => tile.label === label)?.group === group)) {
      setSolved((current) => [...current, group]); setSelected([]); setMessage("Connected. Find the next four.");
    } else {
      const byGroup = new Map<number, number>();
      selected.forEach((label) => {
        const selectedGroup = activeTiles.find((tile) => tile.label === label)?.group;
        if (selectedGroup !== undefined) {
          byGroup.set(selectedGroup, (byGroup.get(selectedGroup) ?? 0) + 1);
        }
      });
      const oneAway = Array.from(byGroup.values()).some((count) => count === 3);
      setMistakes((current) => current + 1);
      setSelected([]);
      setMessage(oneAway ? "One away. Swap one tile." : "Not quite. Try another pattern.");
    }
  }
  function reset() {
    setSelected([]);
    setSolved([]);
    setMistakes(0);
    setMessage("Find four things that belong together.");
    setRecorded(false);
  }

  const solvedSets = solved.map((groupId) => board.groups[groupId]);

  return <main className={pageClass}><GameHeader name="SORTED" kicker="Connections desk" title={board.title} description="Four groups are hidden in sixteen cards. Spot patterns, not trivia." /><section className={cardClass}>
    <StatsRow stats={stats} />
    <div className="flex items-center justify-between gap-3 text-sm font-semibold"><p className="text-slate-600">{message}</p><p className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">Mistakes: {mistakes}/4</p></div>
    {complete ? <div className="py-10 text-center"><h2 className="text-3xl font-semibold">{solved.length === 4 ? "Board cleared." : "Edition paused."}</h2><p className="mt-3 text-slate-600">You found {solved.length} of 4 hidden groups.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{solvedSets.map((set) => <div key={set.join("-")} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">{set.join(" · ")}</div>)}</div><button type="button" onClick={reset} className="mt-7 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Replay today</button><PostGameFact pillar="Stress & Recovery" fact="Pattern switching under mild pressure trains attention control, a core part of emotional recovery." /></div> : <><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">{activeTiles.map((tile) => <button type="button" key={tile.label} onClick={() => toggle(tile.label)} className={`${buttonClass} min-h-20 ${selected.includes(tile.label) ? "border-slate-950 bg-slate-950 text-white" : ""}`}>{tile.label}</button>)}</div><button type="button" disabled={selected.length !== 4} onClick={submit} className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40">Submit set</button></>}
  </section></main>;
}

type RedactRound = {
  headline: string;
  choices: string[];
  correct: string;
  fact: string;
};

const redactRounds: RedactRound[] = [
  {
    headline: "New trial shows ___ and morning light improve deep sleep quality",
    choices: ["late snacking", "consistent bedtime", "social media", "cold shower"],
    correct: "consistent bedtime",
    fact: "Consistent sleep timing is one of the strongest behavioral predictors of better sleep quality.",
  },
  {
    headline: "City hospitals report lower readmissions after adding ___ care teams",
    choices: ["integrated nutrition", "influencer coaching", "detox programs", "aroma therapy"],
    correct: "integrated nutrition",
    fact: "Nutrition support in clinical pathways can improve outcomes for recovery and adherence.",
  },
  {
    headline: "Longitudinal study links weekly ___ training to healthier aging markers",
    choices: ["strength", "sauna", "sprint-only", "VR gaming"],
    correct: "strength",
    fact: "Strength training supports long-term function, metabolic health, and resilience with age.",
  },
  {
    headline: "National update: daily ___ exposure recommended to support circadian rhythm",
    choices: ["morning daylight", "blue light", "supplement ads", "iced baths"],
    correct: "morning daylight",
    fact: "Morning daylight is a practical cue that helps anchor circadian timing.",
  },
  {
    headline: "Meta-analysis finds moderate ___ intake linked to lower blood pressure trends",
    choices: ["fiber", "sugar", "energy drinks", "fried snacks"],
    correct: "fiber",
    fact: "Dietary fiber intake is associated with better cardiometabolic profiles in many populations.",
  },
];

export function BlurGame() {
  const dayKey = getDailyKey();
  const rounds = useMemo(() => seededShuffle(redactRounds, `blur:${dayKey}`).slice(0, 4), [dayKey]);
  const { stats, saveResult } = useDailyStats("blur");
  const [round, setRound] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [recorded, setRecorded] = useState(false);

  const isComplete = round >= rounds.length;
  const current = rounds[Math.min(round, rounds.length - 1)];
  const revealLevel = Math.min(3, attempts + (picked ? 3 : 0));

  useEffect(() => {
    if (isComplete && !recorded) {
      saveResult(dayKey, score >= 3);
      setRecorded(true);
    }
  }, [dayKey, isComplete, recorded, saveResult, score]);

  function choose(answer: string) {
    if (picked) return;
    if (answer === current.correct) {
      setPicked(answer);
      setScore((value) => value + (attempts === 0 ? 2 : 1));
      return;
    }

    if (attempts >= 2) {
      setPicked(current.correct);
    } else {
      setAttempts((value) => value + 1);
    }
  }

  function next() {
    setRound((value) => value + 1);
    setAttempts(0);
    setPicked(null);
  }

  function reset() {
    setRound(0);
    setAttempts(0);
    setPicked(null);
    setScore(0);
    setRecorded(false);
  }

  const words = current.headline.split(" ");

  return <main className={pageClass}><GameHeader name="BLUR" kicker="Redaction desk" title="Decode the missing word in each headline." description="Every miss reveals more context. Score points by solving early." /><section className={`${cardClass} text-center`}>
    <StatsRow stats={stats} />
    {isComplete ? <div className="py-10"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Issue complete</p><h2 className="mt-3 text-4xl font-semibold text-slate-950">{score} points</h2><p className="mt-3 text-slate-600">{score >= 6 ? "Excellent read on the cues." : "Good instincts. Tomorrow&apos;s issue drops at midnight."}</p><button type="button" onClick={reset} className="mt-7 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Replay today</button><PostGameFact pillar="Attention" fact="Progressive reveal mechanics reward pattern recognition and confidence calibration under uncertainty." /></div> : <><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Round {round + 1} / {rounds.length}</p><p className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">Points: {score}</p></div><div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 text-left leading-8 sm:p-8">{words.map((word, index) => {
      const shouldReveal = word !== "___" || revealLevel >= 3;
      if (shouldReveal) {
        return <span key={`${word}-${index}`} className="mr-2 inline-block text-2xl font-semibold text-slate-900">{word}</span>;
      }
      const revealHint = revealLevel === 0 ? "" : current.correct.slice(0, revealLevel * 4);
      return <span key={`${word}-${index}`} className="mr-2 inline-flex min-w-24 items-center justify-center rounded-lg bg-slate-900 px-3 py-1 text-xl font-semibold text-white">{revealHint || "..."}</span>;
    })}</div><p className="mt-4 text-sm text-slate-500">Attempts used: {attempts} / 3</p>{picked ? <div><h2 className="mt-5 text-2xl font-semibold text-slate-950">Answer: {current.correct}</h2><button type="button" onClick={next} className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Next round</button><PostGameFact pillar="Evidence literacy" fact={current.fact} /></div> : <div className="mt-6 grid gap-3 sm:grid-cols-2">{current.choices.map((answer) => <button type="button" key={answer} onClick={() => choose(answer)} className={buttonClass}>{answer}</button>)}</div>}</>}
  </section></main>;
}

export function GutGame() {
  const dayKey = getDailyKey();
  const { stats, saveResult } = useDailyStats("gut");
  const [recorded, setRecorded] = useState(false);
  type TimelineEvent = { label: string; rank: number };
  type TimelineScenario = { title: string; events: TimelineEvent[] };

  const timelinePool: TimelineScenario[] = [
    {
      title: "Order the evidence timeline",
      events: [
        { label: "Observational signal appears", rank: 1 },
        { label: "Controlled trial starts", rank: 2 },
        { label: "Peer review publishes", rank: 3 },
        { label: "Guideline committee updates advice", rank: 4 },
      ],
    },
    {
      title: "Build the policy rollout order",
      events: [
        { label: "Draft recommendation", rank: 1 },
        { label: "Public comment window", rank: 2 },
        { label: "Final vote and release", rank: 3 },
        { label: "Hospital implementation", rank: 4 },
      ],
    },
    {
      title: "Arrange a reporting cycle",
      events: [
        { label: "Editor pitch review", rank: 1 },
        { label: "Source interviews", rank: 2 },
        { label: "Fact-check pass", rank: 3 },
        { label: "Morning publication", rank: 4 },
      ],
    },
  ];

  const timeline = useMemo(() => pickDaily(timelinePool, "gut", dayKey), [dayKey]);
  const [ordered, setOrdered] = useState(() => seededShuffle(timeline.events, `gut:${dayKey}`));
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    const distance = ordered.reduce((sum, event, index) => sum + Math.abs(event.rank - (index + 1)), 0);
    return Math.max(0, 100 - distance * 15);
  }, [ordered]);

  useEffect(() => {
    if (submitted && !recorded) {
      saveResult(dayKey, score >= 75);
      setRecorded(true);
    }
  }, [dayKey, recorded, saveResult, score, submitted]);

  function move(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= ordered.length || submitted) return;
    setOrdered((current) => {
      const cloned = [...current];
      [cloned[index], cloned[next]] = [cloned[next], cloned[index]];
      return cloned;
    });
  }

  function reset() {
    setOrdered(seededShuffle(timeline.events, `gut:${dayKey}:${Date.now()}`));
    setSubmitted(false);
    setRecorded(false);
  }

  return <main className={pageClass}><GameHeader name="GUT" kicker="Timeline desk" title={timeline.title} description="Reorder four cards into the most plausible real-world sequence." /><section className={cardClass}>
    <StatsRow stats={stats} />
    {submitted ? <div className="py-8 text-center"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Final board</p><h2 className="mt-3 text-5xl font-semibold text-slate-950">{score}%</h2><p className="mt-4 text-slate-600">Lower total position error means a stronger score.</p><div className="mt-6 grid gap-3 text-left">{ordered.map((event, index) => <div key={event.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"><span className="font-semibold text-slate-500">{index + 1}.</span> <span className="font-semibold text-slate-900">{event.label}</span> <span className="ml-2 text-slate-500">(ideal: {event.rank})</span></div>)}</div><button type="button" onClick={reset} className="mt-7 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Replay today</button><PostGameFact pillar="Reasoning" fact="Timeline ordering strengthens causal reasoning and helps separate anecdote from system-level evidence." /></div> : <div><div className="space-y-3">{ordered.map((event, index) => <div key={event.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"><p className="min-w-6 text-sm font-semibold text-slate-500">{index + 1}</p><p className="flex-1 text-sm font-semibold text-slate-900">{event.label}</p><div className="flex gap-2"><button type="button" onClick={() => move(index, -1)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">Up</button><button type="button" onClick={() => move(index, 1)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400">Down</button></div></div>)}</div><div className="mt-8 text-center"><button type="button" onClick={() => setSubmitted(true)} className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white">Score my order</button></div></div>}
  </section></main>;
}
