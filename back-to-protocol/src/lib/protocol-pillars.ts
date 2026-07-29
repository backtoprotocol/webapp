export type ProtocolTrack = {
  title: string;
  duration: string;
  focus: string;
  intensity: "Easy" | "Moderate" | "Advanced";
};

export type ProtocolMetric = {
  label: string;
  value: string;
  note: string;
};

export type ProtocolFAQ = {
  question: string;
  answer: string;
};

export type ProtocolPillarPage = {
  slug: string;
  name: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  gradient: string;
  metrics: ProtocolMetric[];
  principles: string[];
  tracks: ProtocolTrack[];
  faq: ProtocolFAQ[];
};

export const protocolPillars: ProtocolPillarPage[] = [
  {
    slug: "movement",
    name: "Movement",
    eyebrow: "Protocol Pillar",
    heroTitle: "Train capability, not just fatigue.",
    heroDescription: "Build strength, mobility, and engine capacity with repeatable sessions that compound over months.",
    gradient: "from-orange-200 via-amber-100 to-white",
    metrics: [
      { label: "Weekly sessions", value: "4-5", note: "Strength and aerobic split" },
      { label: "Zone 2 minutes", value: "120+", note: "Low-intensity base work" },
      { label: "Mobility floor", value: "10 min", note: "Daily maintenance" },
    ],
    principles: [
      "Progress load slowly and track reps before adding volume.",
      "Keep one day focused on movement quality over intensity.",
      "Anchor every week with a long easy aerobic effort.",
    ],
    tracks: [
      { title: "Strength Base", duration: "6 weeks", focus: "Foundational compound lifts and form", intensity: "Moderate" },
      { title: "Engine Builder", duration: "4 weeks", focus: "Aerobic capacity and pacing discipline", intensity: "Easy" },
      { title: "Athletic Blend", duration: "8 weeks", focus: "Power, mobility, and conditioning balance", intensity: "Advanced" },
    ],
    faq: [
      { question: "How many hard days should I do?", answer: "Most people progress best with two hard days, two moderate days, and one low-stress technique day." },
      { question: "What if I only have 30 minutes?", answer: "Keep one lift, one accessory, and a short conditioning finisher. Consistency beats perfect duration." },
    ],
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    eyebrow: "Protocol Pillar",
    heroTitle: "Fuel adaptation with structure you can sustain.",
    heroDescription: "Use practical nutrition systems to stabilize energy, body composition, and performance across real life.",
    gradient: "from-emerald-200 via-teal-100 to-white",
    metrics: [
      { label: "Protein target", value: "1.6 g/kg", note: "Daily baseline for recovery" },
      { label: "Fiber floor", value: "30 g", note: "Support metabolic and gut health" },
      { label: "Hydration rhythm", value: "3 checkpoints", note: "Morning, midday, evening" },
    ],
    principles: [
      "Build meals around protein and whole-food carbohydrates first.",
      "Use preplanned defaults for travel days and high-stress weeks.",
      "Adjust intake from training demand, not mood alone.",
    ],
    tracks: [
      { title: "Energy Stabilizer", duration: "3 weeks", focus: "Blood sugar rhythm and meal timing", intensity: "Easy" },
      { title: "Body Comp Reset", duration: "6 weeks", focus: "Calorie awareness and protein consistency", intensity: "Moderate" },
      { title: "Performance Fuel", duration: "8 weeks", focus: "Training-day carb periodization", intensity: "Advanced" },
    ],
    faq: [
      { question: "Do I need to count every calorie?", answer: "No. Start with repeatable meal templates and portion anchors, then add tracking only if progress stalls." },
      { question: "How should I eat on rest days?", answer: "Keep protein steady, reduce training carbs slightly, and prioritize micronutrient density." },
    ],
  },
  {
    slug: "sleep",
    name: "Sleep",
    eyebrow: "Protocol Pillar",
    heroTitle: "Protect sleep like it powers everything else.",
    heroDescription: "Improve recovery, mood, and performance with repeatable timing, light control, and wind-down systems.",
    gradient: "from-sky-200 via-cyan-100 to-white",
    metrics: [
      { label: "Sleep window", value: "8 hrs", note: "Consistent time in bed" },
      { label: "Wake variance", value: "<45 min", note: "Across all days" },
      { label: "Light timing", value: "AM first", note: "Sunlight early, dim nights" },
    ],
    principles: [
      "Hold wake time steady before chasing perfect bedtime.",
      "Reduce bright light and cognitive load in the final hour.",
      "Use short naps strategically, not as a nightly debt fix.",
    ],
    tracks: [
      { title: "Circadian Reset", duration: "2 weeks", focus: "Wake anchors and morning light", intensity: "Easy" },
      { title: "Deep Sleep Builder", duration: "4 weeks", focus: "Pre-bed routine and environment tuning", intensity: "Moderate" },
      { title: "Travel Recovery", duration: "3 weeks", focus: "Jet lag and schedule-shift protocols", intensity: "Advanced" },
    ],
    faq: [
      { question: "What matters most first?", answer: "Wake time consistency and morning light are the highest-leverage starting points." },
      { question: "Can supplements replace routine?", answer: "No. Supplements are optional and secondary to schedule, light, and behavior." },
    ],
  },
  {
    slug: "stress",
    name: "Stress",
    eyebrow: "Protocol Pillar",
    heroTitle: "Regulate load before it regulates you.",
    heroDescription: "Use nervous-system aware routines to maintain output without slipping into chronic overload.",
    gradient: "from-violet-200 via-fuchsia-100 to-white",
    metrics: [
      { label: "Downshift reps", value: "2/day", note: "Breath-led resets" },
      { label: "Focus blocks", value: "90 min", note: "Protected deep work windows" },
      { label: "Recovery break", value: "15 min", note: "Midday reset ritual" },
    ],
    principles: [
      "Treat stress like training load: measurable and adjustable.",
      "Pair high-cognitive work with deliberate downregulation.",
      "Protect recovery windows before symptoms escalate.",
    ],
    tracks: [
      { title: "Daily Regulation", duration: "2 weeks", focus: "Breathing and nervous-system cues", intensity: "Easy" },
      { title: "Workload Pacing", duration: "5 weeks", focus: "Output planning and demand triage", intensity: "Moderate" },
      { title: "Resilience Builder", duration: "7 weeks", focus: "Stress inoculation and rebound speed", intensity: "Advanced" },
    ],
    faq: [
      { question: "How do I know if I am overreaching?", answer: "Watch for sleep disruption, irritability, and performance drops that persist for several days." },
      { question: "Is breathwork enough?", answer: "Breathwork helps quickly, but long-term stress control needs scheduling, boundaries, and recovery design." },
    ],
  },
  {
    slug: "hormones",
    name: "Hormones",
    eyebrow: "Protocol Pillar",
    heroTitle: "Understand the signals behind energy and adaptation.",
    heroDescription: "Translate endocrine patterns into practical training, nutrition, and lifestyle decisions.",
    gradient: "from-rose-200 via-pink-100 to-white",
    metrics: [
      { label: "Lab cadence", value: "2-4x/yr", note: "Trend over isolated values" },
      { label: "Sleep minimum", value: "7+ hrs", note: "Core endocrine support" },
      { label: "Training rhythm", value: "Wave load", note: "Stress matched to recovery" },
    ],
    principles: [
      "Use biomarkers as trend signals, not isolated verdicts.",
      "Align intake and training with life-phase and cycle demands.",
      "Address basics before chasing advanced interventions.",
    ],
    tracks: [
      { title: "Baseline Map", duration: "4 weeks", focus: "Symptom tracking and bloodwork context", intensity: "Easy" },
      { title: "Metabolic Tune", duration: "6 weeks", focus: "Insulin sensitivity and body comp levers", intensity: "Moderate" },
      { title: "High-Performance Hormone", duration: "8 weeks", focus: "Load cycling and recovery matching", intensity: "Advanced" },
    ],
    faq: [
      { question: "Should I optimize every marker?", answer: "Prioritize markers linked to symptoms and outcomes, then iterate with a clinician-informed plan." },
      { question: "What changes fastest?", answer: "Sleep, energy balance, and training stress management can shift symptom profile within weeks." },
    ],
  },
  {
    slug: "recovery",
    name: "Recovery",
    eyebrow: "Protocol Pillar",
    heroTitle: "Make recovery a system, not an afterthought.",
    heroDescription: "Design routines that preserve momentum while reducing injury risk and cumulative fatigue.",
    gradient: "from-cyan-200 via-sky-100 to-white",
    metrics: [
      { label: "Deload rhythm", value: "Every 4-6 wks", note: "Planned intensity reduction" },
      { label: "Soft tissue", value: "3x/week", note: "Mobility and tissue quality" },
      { label: "Active recovery", value: "2 sessions", note: "Low-intensity circulation work" },
    ],
    principles: [
      "Program recovery in advance instead of earning it reactively.",
      "Use low-intensity movement to accelerate readiness.",
      "Treat pain signals as data and adjust load early.",
    ],
    tracks: [
      { title: "Rebuild Week", duration: "10 days", focus: "Joint-friendly reload and mobility", intensity: "Easy" },
      { title: "Anti-Burnout Block", duration: "5 weeks", focus: "Stress/load balancing", intensity: "Moderate" },
      { title: "Return to Peak", duration: "7 weeks", focus: "Smart ramp after heavy phases", intensity: "Advanced" },
    ],
    faq: [
      { question: "Do recovery tools replace sleep?", answer: "No. Tools are additive; sleep and training load management are the foundation." },
      { question: "How often should I deload?", answer: "Most lifters benefit from a planned deload every four to six weeks depending on volume and stress." },
    ],
  },
  {
    slug: "longevity",
    name: "Longevity",
    eyebrow: "Protocol Pillar",
    heroTitle: "Build for decades, not just this quarter.",
    heroDescription: "Prioritize the markers and habits that protect long-term function, cognition, and metabolic resilience.",
    gradient: "from-lime-200 via-emerald-100 to-white",
    metrics: [
      { label: "Strength standard", value: "Maintain", note: "Relative to body weight" },
      { label: "Cardio base", value: "Zone 2", note: "Weekly aerobic continuity" },
      { label: "Risk review", value: "Annual", note: "Biomarkers and prevention" },
    ],
    principles: [
      "Aim for durable function and mobility as top outcomes.",
      "Measure trend lines yearly and intervene early.",
      "Favor protocols that remain realistic for decades.",
    ],
    tracks: [
      { title: "Healthspan Core", duration: "8 weeks", focus: "Strength, aerobic base, and sleep foundations", intensity: "Moderate" },
      { title: "Metabolic Defense", duration: "6 weeks", focus: "Nutrition and movement against drift", intensity: "Easy" },
      { title: "Decade Plan", duration: "12 weeks", focus: "Long-horizon habit architecture", intensity: "Advanced" },
    ],
    faq: [
      { question: "What should I track most?", answer: "Track behavior adherence first, then pair it with key metabolic and cardiovascular markers." },
      { question: "Can longevity work be intense?", answer: "Yes, if intensity is cyclic and paired with robust recovery and consistency." },
    ],
  },
  {
    slug: "mindset",
    name: "Mindset",
    eyebrow: "Protocol Pillar",
    heroTitle: "Turn good intentions into automatic execution.",
    heroDescription: "Use identity-based behavior design to close the gap between knowing and doing.",
    gradient: "from-indigo-200 via-blue-100 to-white",
    metrics: [
      { label: "Habit anchors", value: "3", note: "Morning, midday, evening" },
      { label: "Execution score", value: "80%+", note: "Weekly adherence threshold" },
      { label: "Review cadence", value: "Weekly", note: "Adjust and recommit" },
    ],
    principles: [
      "Design the environment so desired behavior is friction-light.",
      "Measure adherence before judging outcomes.",
      "Use short reflection loops to keep identity aligned.",
    ],
    tracks: [
      { title: "Identity Reset", duration: "3 weeks", focus: "Behavior cues and identity statements", intensity: "Easy" },
      { title: "Consistency Engine", duration: "6 weeks", focus: "Habit tracking and friction removal", intensity: "Moderate" },
      { title: "Performance Mindset", duration: "8 weeks", focus: "Stress-proof routines and execution", intensity: "Advanced" },
    ],
    faq: [
      { question: "How do I recover after missing days?", answer: "Use a 24-hour reset rule: reduce scope, restart the next day, and protect streak continuity." },
      { question: "Do I need motivation to start?", answer: "No. Build systems that lower friction so action can happen before motivation appears." },
    ],
  },
];

export const protocolPillarsBySlug = Object.fromEntries(
  protocolPillars.map((pillar) => [pillar.slug, pillar]),
) as Record<string, ProtocolPillarPage>;
