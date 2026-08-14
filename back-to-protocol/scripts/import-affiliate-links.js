// Bulk-imports Amazon affiliate links from data/affiliate-links.txt into
// Supabase's amazon_products table by extracting ASIN and upserting by ASIN.
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const INPUT_PATH = process.env.AFFILIATE_LINKS_PATH
  ? path.resolve(process.cwd(), process.env.AFFILIATE_LINKS_PATH)
  : path.join(__dirname, "..", "data", "affiliate-links.txt");

function extractAsin(url) {
  const text = String(url ?? "").trim();

  const patterns = [
    /\/dp\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/gp\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /\/product\/([A-Z0-9]{10})(?:[/?]|$)/i,
    /[?&]asin=([A-Z0-9]{10})(?:&|$)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1].toUpperCase();
  }

  return null;
}

async function resolveRedirectUrl(url) {
  const text = String(url ?? "").trim();

  if (!text) return text;

  try {
    const response = await fetch(text, {
      method: "GET",
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; BackToProtocolImporter/1.0)",
      },
    });

    return response.url || text;
  } catch {
    return text;
  }
}

function extractMarketplace(url) {
  try {
    const host = new URL(String(url ?? "").trim()).hostname.toLowerCase();

    if (host.includes("amazon.")) {
      return host.replace(/^www\./, "");
    }
  } catch {
    // Keep null when URL parsing fails.
  }

  return null;
}

function parseInput(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

async function run() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }

  if (!fs.existsSync(INPUT_PATH)) {
    throw new Error(`Input file not found: ${INPUT_PATH}`);
  }

  const raw = fs.readFileSync(INPUT_PATH, "utf8");
  const links = parseInput(raw);

  if (links.length === 0) {
    console.log(`No links found in ${INPUT_PATH}`);
    return;
  }

  const byAsin = new Map();
  const unresolved = [];

  for (const link of links) {
    const resolvedLink = await resolveRedirectUrl(link);
    const asin = extractAsin(resolvedLink);

    if (!asin) {
      unresolved.push(link);
      continue;
    }

    byAsin.set(asin, {
      asin,
      detail_page_url: resolvedLink,
      marketplace: extractMarketplace(resolvedLink),
    });
  }

  const rows = Array.from(byAsin.values());

  if (rows.length === 0) {
    console.log("No valid Amazon links with extractable ASINs were found.");
    if (unresolved.length > 0) {
      console.log(`Unresolved links: ${unresolved.length}`);
    }
    return;
  }

  const { data, error } = await supabase.from("amazon_products").upsert(rows, { onConflict: "asin" }).select("asin");

  if (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }

  console.log(`Read ${links.length} links from ${INPUT_PATH}`);
  console.log(`Imported/updated ${data.length} rows (unique ASINs: ${rows.length})`);

  if (unresolved.length > 0) {
    const unresolvedPath = path.join(path.dirname(INPUT_PATH), "unresolved-affiliate-links.txt");
    fs.writeFileSync(unresolvedPath, `${unresolved.join("\n")}\n`, "utf8");
    console.warn(`Could not extract ASIN from ${unresolved.length} links.`);
    console.warn(`Saved unresolved links to: ${unresolvedPath}`);
  }
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
