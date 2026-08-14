// Reads data/products.xlsx and upserts every row back into Supabase's amazon_products table.
require("dotenv").config({ path: ".env.local" });
const path = require("path");
const XLSX = require("xlsx");
const { createClient } = require("@supabase/supabase-js");

// Service role key is required because RLS blocks writes from the anon key. Never expose this key to the client/browser.
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const INPUT_PATH = path.join(__dirname, "..", "data", "products.xlsx");

const NUMBER_COLUMNS = ["price", "compare_at_price", "ratings", "review_count"];
const ARRAY_COLUMNS = ["images"];

// Amazon product URLs look like .../dp/B0ABC12345 or .../gp/product/B0ABC12345 — pull the ASIN out of either shape.
function extractAsin(url) {
  const match = String(url ?? "").match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})/i);
  return match ? match[1].toUpperCase() : null;
}

function cleanRow(raw) {
  const row = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value === "" || value === undefined) continue;

    if (ARRAY_COLUMNS.includes(key)) {
      row[key] = String(value)
        .split("|")
        .map((v) => v.trim())
        .filter(Boolean);
    } else if (NUMBER_COLUMNS.includes(key)) {
      const num = Number(value);
      if (Number.isFinite(num)) row[key] = num;
    } else {
      row[key] = String(value).trim();
    }
  }

  if (!row.asin) {
    row.asin = extractAsin(row.detail_page_url);
  }

  return row;
}

async function run() {
  const workbook = XLSX.readFile(INPUT_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  const rows = rawRows.map(cleanRow).filter((row) => {
    if (!row.asin) {
      console.warn("Skipping row with no ASIN (fill in 'asin', or paste a full Amazon link into 'detail_page_url'):", row.title || row);
      return false;
    }
    return true;
  });

  if (rows.length === 0) {
    console.log("No valid rows to import.");
    return;
  }

  const { data, error } = await supabase.from("amazon_products").upsert(rows, { onConflict: "asin" }).select("asin");

  if (error) {
    console.error("Import failed:", error);
    process.exit(1);
  }

  console.log(`Imported/updated ${data.length} of ${rows.length} rows from ${INPUT_PATH}`);
}

run();
