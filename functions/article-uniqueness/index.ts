import { createClient } from "@sanity/client";
import { documentEventHandler } from "@sanity/functions";

type ArticleDocument = {
  _id: string;
  title?: string;
  subtitle?: string;
  pillar?: string;
  topic?: string;
  tags?: string[];
  keywords?: string[];
  mainConcepts?: string[];
  body?: Array<{ _type?: string; style?: string; children?: Array<{ text?: string }> }>;
  analysis?: {
    analysisStatus?: string;
    similarityScore?: number;
    similarityBand?: string;
    contentFingerprint?: string;
    semanticTerms?: string[];
  };
};

type SimilarArticleSource = {
  _id: string;
  title?: string;
  subtitle?: string;
  pillar?: string;
  topic?: string;
  tags?: string[];
  keywords?: string[];
  mainConcepts?: string[];
  analysis?: {
    semanticTerms?: string[];
    contentFingerprint?: string;
  };
};

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "because",
  "but",
  "by",
  "for",
  "from",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "their",
  "this",
  "to",
  "was",
  "were",
  "with",
  "your",
]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stem(term: string) {
  let value = term;

  if (value.length > 6 && value.endsWith("ing")) value = value.slice(0, -3);
  else if (value.length > 5 && value.endsWith("ies")) value = `${value.slice(0, -3)}y`;
  else if (value.length > 5 && value.endsWith("ed")) value = value.slice(0, -2);
  else if (value.length > 4 && value.endsWith("es")) value = value.slice(0, -2);
  else if (value.length > 4 && value.endsWith("s")) value = value.slice(0, -1);

  return value;
}

function tokenize(value?: string) {
  return normalize(value || "")
    .split(" ")
    .map(stem)
    .filter((term) => term.length > 2 && !STOPWORDS.has(term));
}

function extractBodyText(body?: ArticleDocument["body"]) {
  return (body || [])
    .flatMap((block) => block.children || [])
    .map((child) => child.text || "")
    .join(" ");
}

function addTokens(target: Map<string, number>, tokens: string[], weight: number) {
  for (const token of tokens) {
    target.set(token, (target.get(token) || 0) + weight);
  }
}

function buildSemanticProfile(article: Pick<ArticleDocument, "title" | "subtitle" | "pillar" | "topic" | "tags" | "keywords" | "mainConcepts" | "body">) {
  const weights = new Map<string, number>();

  addTokens(weights, tokenize(article.title), 5);
  addTokens(weights, tokenize(article.subtitle), 3);
  addTokens(weights, tokenize(article.pillar), 3);
  addTokens(weights, tokenize(article.topic), 4);

  for (const tag of article.tags || []) addTokens(weights, tokenize(tag), 2);
  for (const keyword of article.keywords || []) addTokens(weights, tokenize(keyword), 2);
  for (const concept of article.mainConcepts || []) addTokens(weights, tokenize(concept), 3);

  const bodyText = extractBodyText(article.body);
  addTokens(weights, tokenize(bodyText), 1);

  const semanticTerms = [...weights.entries()]
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([term]) => term)
    .slice(0, 40);

  return {
    semanticTerms,
    fingerprint: semanticTerms.slice(0, 16).join("-"),
    titleTokens: tokenize(article.title),
    subtitleTokens: tokenize(article.subtitle),
    topicTokens: tokenize(article.topic),
    metaTokens: [
      ...tokenize(article.pillar),
      ...(article.tags || []).flatMap((value) => tokenize(value)),
      ...(article.keywords || []).flatMap((value) => tokenize(value)),
      ...(article.mainConcepts || []).flatMap((value) => tokenize(value)),
    ],
  };
}

function setOverlap(left: string[], right: string[]) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  if (!leftSet.size || !rightSet.size) return 0;

  let intersection = 0;
  for (const term of leftSet) {
    if (rightSet.has(term)) intersection += 1;
  }

  const union = new Set([...leftSet, ...rightSet]).size;
  return intersection / union;
}

function weightedSimilarity(current: ReturnType<typeof buildSemanticProfile>, existing: ReturnType<typeof buildSemanticProfile>) {
  const titleSim = setOverlap([...current.titleTokens, ...current.subtitleTokens], [...existing.titleTokens, ...existing.subtitleTokens]);
  const metaSim = setOverlap(current.metaTokens, existing.metaTokens);
  const semanticSim = setOverlap(current.semanticTerms, existing.semanticTerms);

  const sameTopic = current.topicTokens.length && existing.topicTokens.length
    ? setOverlap(current.topicTokens, existing.topicTokens)
    : 0;

  const score = (titleSim * 0.42) + (metaSim * 0.28) + (semanticSim * 0.25) + (sameTopic * 0.05);
  return Math.max(0, Math.min(1, score)) * 100;
}

function similarityBand(score: number) {
  if (score >= 80) return { band: "duplicate", status: "duplicate", label: "Possible duplicate" };
  if (score >= 60) return { band: "needs-review", status: "needs-review", label: "Needs review" };
  return { band: "unique", status: "approved", label: "Unique" };
}

export const handler = documentEventHandler<ArticleDocument>(async ({ context, event }) => {
  const article = event.data;
  const baseId = article._id.replace(/^drafts\./, "");

  const client = createClient({
    ...context.clientOptions,
    apiVersion: "2026-07-24",
    useCdn: false,
  });

  const currentProfile = buildSemanticProfile(article);
  const existingArticles = await client.fetch<SimilarArticleSource[]>(
    `*[
      _type == "article" &&
      defined(slug.current) &&
      _id != $currentId &&
      _id != $draftId
    ]{
      _id,
      title,
      subtitle,
      pillar,
      topic,
      tags,
      keywords,
      mainConcepts,
      analysis { semanticTerms, contentFingerprint }
    }`,
    {
      currentId: article._id,
      draftId: `drafts.${baseId}`,
    }
  );

  const scoredMatches = existingArticles
    .map((existing) => {
      const existingProfile = buildSemanticProfile(existing);
      if (existing.analysis?.semanticTerms?.length) {
        existingProfile.semanticTerms = existing.analysis.semanticTerms;
      }
      if (existing.analysis?.contentFingerprint) {
        existingProfile.semanticTerms = existing.analysis.contentFingerprint.split("-").filter(Boolean).slice(0, 40);
      }

      return {
        articleId: existing._id,
        score: Math.round(weightedSimilarity(currentProfile, existingProfile)),
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);

  const topScore = scoredMatches[0]?.score || 0;
  const band = similarityBand(topScore);

  const nextAnalysis = {
    analysisStatus: band.status,
    similarityBand: band.band,
    similarityScore: topScore,
    contentFingerprint: currentProfile.fingerprint,
    semanticTerms: currentProfile.semanticTerms,
    similarArticles: scoredMatches.map((match) => ({
      article: {
        _type: "reference",
        _ref: match.articleId,
      },
      score: match.score,
      reason:
        match.score >= 80
          ? "Very high semantic overlap"
          : match.score >= 60
          ? "Moderate semantic overlap"
          : "Low semantic overlap",
    })),
    lastAnalyzedAt: new Date().toISOString(),
  };

  const currentAnalysis = article.analysis || {};
  const unchanged =
    currentAnalysis.analysisStatus === nextAnalysis.analysisStatus &&
    currentAnalysis.similarityBand === nextAnalysis.similarityBand &&
    currentAnalysis.similarityScore === nextAnalysis.similarityScore &&
    currentAnalysis.contentFingerprint === nextAnalysis.contentFingerprint &&
    JSON.stringify(currentAnalysis.semanticTerms || []) === JSON.stringify(nextAnalysis.semanticTerms || []);

  if (unchanged || context.local) {
    return;
  }

  await client.patch(article._id).set({ analysis: nextAnalysis }).commit();
});
