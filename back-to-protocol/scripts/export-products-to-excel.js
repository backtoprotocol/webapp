// Pulls every row from Supabase's amazon_products table into an Excel file you can edit.
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const OUTPUT_PATH = path.join(__dirname, "..", "data", "products.xlsx");

// Columns shown/edited in Excel, in order. Array/JSON columns are flattened to plain text for easy editing.
const COLUMNS = [
  "asin",
  "title",
  "brand",
  "category",
  "subcategory",
  "price",
  "compare_at_price",
  "currency",
  "image_url",
  "images",
  "video_url",
  "description",
  "seller",
  "marketplace",
  "ratings",
  "review_count",
  "ram",
  "storage_capacity",
  "storage_type",
  "processor",
  "screen_size",
  "graphics",
  "operating_system",
  "battery_life",
  "weight",
  "color",
  "model_number",
  "sku",
  "detail_page_url",
  "variant_group_id",
];

async function run() {
  const { data, error } = await supabase.from("amazon_products").select("*").limit(2000);

  if (error) {
    console.error("Failed to fetch from Supabase:", error);
    process.exit(1);
  }

  const rows = (data ?? []).map((row) => {
    const flat = {};
    for (const col of COLUMNS) {
      const value = row[col];
      if (Array.isArray(value)) {
        flat[col] = value.join(" | ");
      } else {
        flat[col] = value ?? "";
      }
    }
    return flat;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows, { header: COLUMNS });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "products");
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  XLSX.writeFile(workbook, OUTPUT_PATH);

  console.log(`Exported ${rows.length} products to ${OUTPUT_PATH}`);
}

run();
