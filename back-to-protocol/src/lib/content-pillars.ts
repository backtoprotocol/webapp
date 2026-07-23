export const contentPillars = [
  {
    name: "Movement",
    definition: "Strength, cardio, mobility, and athletic performance.",
    focus: "Build a capable body through progressive, repeatable training.",
  },
  {
    name: "Nutrition",
    definition: "Food, fueling, body composition, blood sugar, and gut health.",
    focus: "Use practical nutrition to support energy, performance, and health.",
  },
  {
    name: "Sleep",
    definition: "Sleep quality, light exposure, chronotype, and travel recovery.",
    focus: "Make restorative sleep a repeatable protocol, not an aspiration.",
  },
  {
    name: "Stress",
    definition: "Cortisol, HRV, breathwork, and nervous-system regulation.",
    focus: "Understand and regulate the load your nervous system carries.",
  },
  {
    name: "Hormones",
    definition: "Testosterone, estrogen, thyroid, insulin, and body composition across life.",
    focus: "Explain the physiology that shapes energy, mood, and adaptation.",
  },
  {
    name: "Recovery",
    definition: "Cold and heat exposure, mobility, injury prevention, and deloads.",
    focus: "Recover with enough intention to keep moving forward.",
  },
  {
    name: "Longevity",
    definition: "Biomarkers, prevention, supplementation, and aging science.",
    focus: "Invest in the habits and measures that support a longer healthspan.",
  },
  {
    name: "Mindset",
    definition: "Habit formation, discipline, identity, and adherence.",
    focus: "Close the gap between knowing a protocol and following it.",
  },
] as const;

export const pillarNames = contentPillars.map((pillar) => pillar.name);
