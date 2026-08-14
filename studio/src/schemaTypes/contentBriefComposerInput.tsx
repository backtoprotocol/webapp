import { useEffect, useMemo, useState } from "react";
import { useClient, useFormValue } from "sanity";

type ContentBriefComposerInputProps = {
  value?: string;
  onChange: (value: string) => void;
};

function normalize(text?: string) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function buildTitle(title?: string, category?: string, pillar?: string, scenario?: string) {
  if (title) return title;

  const fallbackCategory = category || "recovery";
  const fallbackScenario = (scenario || "stress").split(/\.|\!|\?/)[0].trim();
  const fallbackPillar = pillar || "recovery";

  return `How to rebuild ${fallbackCategory.toLowerCase()} when ${fallbackScenario.toLowerCase()} — a ${fallbackPillar.toLowerCase()} first protocol`;
}

export function ContentBriefComposerInput({ value, onChange }: ContentBriefComposerInputProps) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const title = useFormValue(["title"]) as string | undefined;
  const category = useFormValue(["category"]) as string | undefined;
  const pillar = useFormValue(["pillar"]) as string | undefined;
  const specificScenario = useFormValue(["specificScenario"]) as string | undefined;
  const angle = useFormValue(["angle"]) as string | undefined;
  const biologyPsychology = useFormValue(["biologyPsychology"]) as string | undefined;
  const researchFocus = useFormValue(["researchFocus"]) as string | undefined;
  const protocolPhases = useFormValue(["protocolPhases"]) as string[] | undefined;
  const mythBust = useFormValue(["mythBust"]) as string | undefined;
  const cta = useFormValue(["cta"]) as string | undefined;
  const [existingBriefs, setExistingBriefs] = useState<Array<{ title?: string; category?: string; pillar?: string; specificScenario?: string }>>([]);

  useEffect(() => {
    client
      .fetch<Array<{ title?: string; category?: string; pillar?: string; specificScenario?: string }>>(
        `*[_type == "contentBrief"]{ title, category, pillar, specificScenario }`
      )
      .then(setExistingBriefs)
      .catch(() => setExistingBriefs([]));
  }, [client, category, pillar, specificScenario]);

  const overlapMatches = useMemo(() => {
    const baseTokens = normalize(title).split(" ").filter(Boolean);
    const scenarioTokens = normalize(specificScenario).split(" ").filter(Boolean);

    return existingBriefs.filter((brief) => {
      const similarTitle = brief.title ? normalize(brief.title).split(" ").filter(Boolean).some((token) => baseTokens.includes(token)) : false;
      const similarScenario = brief.specificScenario ? normalize(brief.specificScenario).split(" ").filter(Boolean).some((token) => scenarioTokens.includes(token)) : false;
      const sameCategory = brief.category === category;

      return (sameCategory && (similarTitle || similarScenario)) || (similarTitle && similarScenario);
    });
  }, [category, existingBriefs, specificScenario, title]);

  const overlapWarning = overlapMatches.length
    ? `Possible overlap with ${overlapMatches.slice(0, 3).map((item) => item.title).join(", ")}. Consider a clearer angle or a different audience.`
    : "No obvious overlap detected. This angle feels distinct enough to develop.";

  const suggestedTitle = buildTitle(title, category, pillar, specificScenario);
  const suggestedOutline = [
    `1. Open with the specific struggle: ${specificScenario || "Describe the situation in one concrete, human example."}`,
    `2. Explain the biology/psychology: ${biologyPsychology || "Summarize the mechanism plainly and clearly."}`,
    `3. Cover the research: ${researchFocus || "Include 2–4 credible studies and note limitations."}`,
    `4. Give a protocol mapped to ${protocolPhases?.join(", ") || "Breakdown, Reset, Rebuild, and Upgrade"}`,
    `5. Bust a myth: ${mythBust || "Correct one popular misconception with evidence."}`,
    `6. End with a clear next step: ${cta || "Direct the reader to a deeper protocol or email capture."}`,
  ].join("\n");

  const generatedPrompt = useMemo(() => {
    return [
      `Write an article titled: ${suggestedTitle}`,
      "",
      `Angle: ${angle || "Make the article feel useful, specific, and easy to apply."}`,
      "",
      "Use this structure:",
      suggestedOutline,
      "",
      `Category: ${category || "Recovery"}`,
      `Primary pillar: ${pillar || "Mindset"}`,
      `Overlap warning: ${overlapWarning}`,
    ].join("\n");
  }, [angle, category, overlapWarning, pillar, suggestedOutline, suggestedTitle]);

  useEffect(() => {
    if (!value && generatedPrompt) {
      onChange(generatedPrompt);
    }
  }, [generatedPrompt, onChange, value]);

  return (
    <div className="space-y-3">
      <textarea
        value={value || generatedPrompt || ""}
        onChange={(event) => onChange(event.target.value)}
        rows={12}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
      />
      <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <p>
          <strong>Suggested title:</strong> {suggestedTitle}
        </p>
        <p className="mt-2">
          <strong>Overlap check:</strong> {overlapWarning}
        </p>
      </div>
    </div>
  );
}
