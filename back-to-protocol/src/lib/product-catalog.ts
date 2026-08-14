import { supabase } from "@/lib/supabase";

export type ProductVariantOption = {
  value: string;
  slug: string;
  imageUrl?: string;
  selected: boolean;
};

export type ProductVariantGroup = {
  attribute: string;
  label: string;
  options: ProductVariantOption[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  imageUrl: string;
  images: string[];
  videoUrl?: string;
  modelNumber?: string;
  sku?: string;
  rating: number;
  reviewCount: number;
  inventory: number;
  tags: string[];
  features: string[];
  specs: Array<{ label: string; value: string }>;
  highlights: Array<{ label: string; value: string }>;
  monthlyPrice?: number;
  financingNote?: string;
  pickupAvailable?: boolean;
  pickupNote?: string;
  shippingEstimate?: string;
  freeShipping?: boolean;
  shipToZip?: string;
  seller?: string;
  sellerRating?: number;
  sellerReviewCount?: number;
  returnPolicyUrl?: string;
  variantGroups: ProductVariantGroup[];
};

// Attribute columns that can differentiate sibling rows sharing a variant_group_id.
const VARIANT_ATTRIBUTES: Array<{ column: string; attribute: string; label: string }> = [
  { column: "color", attribute: "color", label: "Color" },
  { column: "processor", attribute: "processor", label: "Processor" },
  { column: "storage_capacity", attribute: "storage_capacity", label: "Storage" },
  { column: "ram", attribute: "ram", label: "Memory" },
];

function str(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function optStr(value: unknown): string | undefined {
  return str(value) || undefined;
}

function num(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function bool(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function cleanSlug(value: string): string {
  const raw = String(value ?? "").trim();
  if (!raw) return "";

  const cleaned = slugify(raw)
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

  return cleaned || slugify("product");
}

function normaliseProduct(record: any, variantGroups: ProductVariantGroup[] = []): Product | null {
  if (!record) return null;

  const name = str(record.title);
  if (!name) return null;

  const slug = cleanSlug(name);
  const brand = str(record.brand);
  const category = str(record.category);
  const subcategory = optStr(record.subcategory);
  const description = str(record.description) || name;
  const price = num(record.price) ?? 0;
  const imageUrl = str(record.image_url);
  const images = Array.isArray(record.images)
    ? record.images.filter((url: unknown): url is string => typeof url === "string" && url.trim().length > 0)
    : [];
  if (images.length === 0 && imageUrl) images.push(imageUrl);

  const rating = num(record.ratings) ?? 0;
  const reviewCount = num(record.review_count) ?? 0;
  const inventory = num(record.inventory) ?? 0;
  const tags = Array.isArray(record.tags) ? record.tags.filter(Boolean).map((tag: any) => String(tag)) : [];
  const features = Array.isArray(record.features)
    ? record.features.filter(Boolean).map((feature: any) => String(feature))
    : [description];

  const specs = [
    { label: "Processor", value: str(record.processor) },
    { label: "Memory (RAM)", value: str(record.ram) },
    { label: "Storage", value: [str(record.storage_capacity), str(record.storage_type)].filter(Boolean).join(" ") },
    { label: "Screen size", value: str(record.screen_size) },
    { label: "Graphics", value: str(record.graphics) },
    { label: "Operating system", value: str(record.operating_system) },
    { label: "Battery life", value: str(record.battery_life) },
    { label: "Weight", value: str(record.weight) },
    { label: "Color", value: str(record.color) },
    { label: "Brand", value: brand },
    { label: "ASIN", value: str(record.asin) },
  ].filter((spec) => spec.value !== "");

  const highlights = Array.isArray(record.highlights)
    ? record.highlights
        .map((item: any) => ({ label: str(item?.label), value: str(item?.value) }))
        .filter((item: { label: string; value: string }) => item.label && item.value)
    : [];

  return {
    id: String(record.id ?? record.asin ?? slug),
    slug,
    name,
    brand,
    category,
    subcategory,
    description,
    price,
    compareAtPrice: num(record.compare_at_price),
    currency: str(record.currency) || "USD",
    imageUrl,
    images,
    videoUrl: optStr(record.video_url),
    modelNumber: optStr(record.model_number),
    sku: optStr(record.sku),
    rating,
    reviewCount,
    inventory,
    tags,
    features,
    specs,
    highlights,
    monthlyPrice: num(record.monthly_price),
    financingNote: optStr(record.financing_note),
    pickupAvailable: bool(record.pickup_available),
    pickupNote: optStr(record.pickup_note),
    shippingEstimate: optStr(record.shipping_estimate),
    freeShipping: bool(record.free_shipping),
    shipToZip: optStr(record.ship_to_zip),
    seller: optStr(record.seller),
    sellerRating: num(record.seller_rating),
    sellerReviewCount: num(record.seller_review_count),
    returnPolicyUrl: optStr(record.return_policy_url),
    variantGroups,
  };
}

// Derives variant picker groups from sibling rows sharing a variant_group_id, for whichever
// attributes actually have 2+ distinct values across the group.
function buildVariantGroups(rows: any[], currentRow: any): ProductVariantGroup[] {
  if (rows.length < 2) return [];

  const groups: ProductVariantGroup[] = [];

  for (const config of VARIANT_ATTRIBUTES) {
    const rowsByValue = new Map<string, any>();
    for (const row of rows) {
      const value = str(row[config.column]);
      if (value && !rowsByValue.has(value)) rowsByValue.set(value, row);
    }
    if (rowsByValue.size < 2) continue;

    const currentValue = str(currentRow[config.column]);
    const options: ProductVariantOption[] = Array.from(rowsByValue.entries()).map(([value, row]) => ({
      value,
      slug: cleanSlug(str(row.title) || value),
      imageUrl: optStr(row.image_url),
      selected: value === currentValue,
    }));

    groups.push({ attribute: config.attribute, label: config.label, options });
  }

  return groups;
}

export async function fetchProductCatalog(searchTerm?: string): Promise<Product[]> {
  const query = searchTerm?.trim();

  if (!supabase) {
    return [];
  }

  try {
    let request = supabase.from("amazon_products").select("*").limit(100);

    if (query) {
      const escapedQuery = query.replace(/'/g, "''");
      request = request.or(
        `title.ilike.%${escapedQuery}%,brand.ilike.%${escapedQuery}%,asin.ilike.%${escapedQuery}%`,
      );
    }

    const { data, error } = await request;

    if (error) {
      return [];
    }

    return (Array.isArray(data) ? data : [])
      .map((row) => normaliseProduct(row))
      .filter(Boolean) as Product[];
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const trimmed = slug?.trim();
  if (!trimmed || !supabase) return null;

  try {
    const { data, error } = await supabase.from("amazon_products").select("*").limit(100);

    if (error) {
      return null;
    }

    const rows = Array.isArray(data) ? data : [];
    const canonical = cleanSlug(trimmed);

    const matchRow = rows.find((row) => {
      const name = str(row.title);
      if (!name) return false;

      const aliases = [
        cleanSlug(name),
        str(row.brand) ? cleanSlug(str(row.brand)) : "",
        String(row.id ?? row.asin ?? ""),
      ].filter(Boolean);

      return aliases.some((alias) => alias === canonical || alias === trimmed.toLowerCase() || alias === trimmed.replace(/\s+/g, "-").toLowerCase());
    });

    if (!matchRow) return null;

    const groupId = str(matchRow.variant_group_id);
    const siblingRows = groupId ? rows.filter((row) => str(row.variant_group_id) === groupId) : [matchRow];
    const variantGroups = buildVariantGroups(siblingRows, matchRow);

    return normaliseProduct(matchRow, variantGroups);
  } catch {
    return null;
  }
}

export const productSearchSuggestions = [
  "laptop",
  "headphones",
  "smartwatch",
  "speaker",
  "tablet",
  "gaming controller",
  "dock",
  "recovery tech",
];
