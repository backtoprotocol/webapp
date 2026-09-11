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
  categoryPath: string[];
  store?: string;
  availability?: string;
  affiliateLink?: string;
  variations: string[];
  priceHistory: Array<{ recordedAt: string; price?: number }>;
  scrapeLog: Array<{ loggedAt: string; field: string; status: string; message: string }>;
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

// Known-good category names; anything else (ratings, seller/store names, "Learn more", etc.
// picked up by scraping) falls back to a title-derived category.
const ALLOWED_CATEGORIES = new Set(
  [
    "Laptops",
    "Desktops",
    "Tablets",
    "Monitors",
    "Computers & Tablets",
    "Keyboards",
    "Mice",
    "Audio",
    "Webcams",
    "Chargers & Power",
    "Cables",
    "Stylus Pens",
    "Cases",
    "Screen Protectors",
    "Gaming Accessories",
    "Accessories",
    "Software",
  ].map((c) => c.toLowerCase()),
);

// Strips HTML tags/comments left over from scraped source fields.
function stripHtml(value: string): string {
  return String(value ?? "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function deriveCategoryFromTitle(title: string): string | null {
  const text = title.toLowerCase();
  if (/(printer|printing|inkjet|laserjet|supertank)/.test(text)) return "Printers";
  if (/(laptop|notebook|macbook|chromebook|ultrabook)/.test(text)) return "Laptops";
  if (/(desktop|tower pc|all-in-one|mini pc)/.test(text)) return "Desktops";
  if (/tablet/.test(text)) return "Tablets";
  if (/(monitor|display)/.test(text)) return "Monitors";
  if (/keyboard/.test(text)) return "Keyboards";
  if (/mouse/.test(text)) return "Mice";
  if (/(headset|earbud|headphone)/.test(text)) return "Audio";
  if (/webcam/.test(text)) return "Webcams";
  if (/(charger|adapter|power bank)/.test(text)) return "Chargers & Power";
  if (/cable/.test(text)) return "Cables";
  if (/(pen|stylus)/.test(text)) return "Stylus Pens";
  if (/(case|folio)/.test(text)) return "Cases";
  if (/protector/.test(text)) return "Screen Protectors";
  if (/(controller|joystick|gaming)/.test(text)) return "Gaming Accessories";
  return null;
}

function sanitizeCategory(raw: string, title: string): string {
  const cleaned = stripHtml(raw);
  const isNumeric = /^\d+(\.\d+)?$/.test(cleaned);
  const isAllowed = cleaned && !isNumeric && ALLOWED_CATEGORIES.has(cleaned.toLowerCase());
  if (isAllowed) return cleaned;
  return deriveCategoryFromTitle(title) ?? "Accessories";
}

// Top-level category buckets shown in the search filters, in display order.
export const CATEGORY_GROUPS = ["Laptops", "Desktops", "Peripherals", "Software", "Services"] as const;
export type CategoryGroup = (typeof CATEGORY_GROUPS)[number];

// Buckets a product's specific category/title into one of the 5 fixed top-level groups.
function deriveCategoryGroup(title: string, specificCategory: string): CategoryGroup {
  const text = `${title} ${specificCategory}`.toLowerCase();
  if (/(software|license key|antivirus|subscription plan|os upgrade|microsoft (?:office|365)|office (?:home|365|suite|apps?))/.test(text)) return "Software";
  if (/(printer|printing|inkjet|laserjet|supertank|scanner|copier|ink tank)/.test(text)) return "Peripherals";
  if (/(laptop|notebook|macbook|chromebook|ultrabook)/.test(text)) return "Laptops";
  if (/(desktop|tower pc|all-in-one|mini pc|workstation)/.test(text)) return "Desktops";
  if (/(warranty|protection plan|tech support|installation service|setup service|geek squad|service plan)/.test(text)) return "Services";
  return "Peripherals";
}

// Placeholder values scraped sources sometimes use in place of a real brand name.
const INVALID_BRAND_VALUES = new Set(["unknown", "n/a", "na", "none", "generic", "various", "other", "assorted", "colors"]);

function sanitizeBrand(raw: string): string {
  let cleaned = stripHtml(raw).replace(/^brand:\s*/i, "").trim();
  const visitMatch = cleaned.match(/^visit the\s+(.+?)(\s+store)?$/i);
  if (visitMatch) cleaned = visitMatch[1].trim();

  // Don't guess a brand from the title — an unbranded/missing value should stay unbranded
  // rather than surface a random first word (e.g. "Rechargeable", "Digital") as a fake brand.
  if (!cleaned || cleaned.length > 40 || INVALID_BRAND_VALUES.has(cleaned.toLowerCase())) {
    return "";
  }
  return cleaned;
}

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

// Product titles are not unique and cannot be queried efficiently. Include the stable
// database identifier in generated URLs so a detail page can request one row instead
// of downloading the entire catalogue and hoping the title slug still matches.
function productSlug(title: string, identifier: unknown): string {
  const id = String(identifier ?? "").trim();
  return id && /^[A-Za-z0-9_-]+$/.test(id) ? `${cleanSlug(title)}--${id}` : cleanSlug(title);
}

const PRODUCT_SELECT = `
  *,
  amazon_product_categories(category_level, category),
  amazon_product_bullets(bullet_number, bullet_point),
  amazon_product_attributes(attribute, value),
  amazon_product_images(image_number, image_url),
  amazon_product_variations(variation_number, variation),
  amazon_product_price_history(recorded_at, price),
  amazon_product_scrape_log(logged_at, field, status, message)
`;

function normaliseProduct(record: any, variantGroups: ProductVariantGroup[] = [], fallbackName?: string): Product | null {
  if (!record) return null;

  const name = str(record.title) || str(fallbackName);
  if (!name) return null;

  const id = String(record.id ?? record.asin ?? cleanSlug(name));
  // ASIN is the table's unique import key and is safer to expose in a URL than
  // an implementation-specific database id.
  const slug = productSlug(name, record.asin ?? record.id);
  const brand = sanitizeBrand(str(record.brand));
  const categoryRows = Array.isArray(record.amazon_product_categories)
    ? [...record.amazon_product_categories].sort((a: any, b: any) => Number(a.category_level) - Number(b.category_level))
    : [];
  const categoryPath = categoryRows.map((row: any) => str(row.category)).filter(Boolean);
  const specificCategory = sanitizeCategory(categoryPath[0], name);
  const category = deriveCategoryGroup(name, specificCategory);
  const subcategory = categoryPath.length > 1 ? categoryPath[categoryPath.length - 1] : undefined;
  const description = str(record.description) || name;
  const price = num(record.price) ?? 0;
  const imageRows = Array.isArray(record.amazon_product_images)
    ? [...record.amazon_product_images].sort((a: any, b: any) => Number(a.image_number) - Number(b.image_number))
    : [];
  const images = imageRows.map((row: any) => str(row.image_url)).filter(Boolean);
  const imageUrl = images[0] ?? "";

  const rating = num(record.ratings) ?? 0;
  const reviewCount = num(record.review_count) ?? 0;
  const inventory = num(record.inventory) ?? 0;
  const tags = Array.isArray(record.tags) ? record.tags.filter(Boolean).map((tag: any) => String(tag)) : [];
  const bulletRows = Array.isArray(record.amazon_product_bullets)
    ? [...record.amazon_product_bullets].sort((a: any, b: any) => Number(a.bullet_number) - Number(b.bullet_number))
    : [];
  const features = bulletRows.map((row: any) => str(row.bullet_point)).filter(Boolean);

  const attributeRows = Array.isArray(record.amazon_product_attributes)
    ? record.amazon_product_attributes
    : [];
  const specs = attributeRows
    .map((item: any) => ({ label: str(item?.attribute), value: str(item?.value) }))
    .filter((spec: { label: string; value: string }) => spec.label && spec.value);
  const highlights = attributeRows
    .map((item: any) => ({ label: str(item?.attribute), value: str(item?.value) }))
    .filter((item: { label: string; value: string }) => item.label && item.value);
  const variations = Array.isArray(record.amazon_product_variations)
    ? [...record.amazon_product_variations]
        .sort((a: any, b: any) => Number(a.variation_number) - Number(b.variation_number))
        .map((row: any) => str(row.variation))
        .filter(Boolean)
    : [];
  const priceHistory = Array.isArray(record.amazon_product_price_history)
    ? record.amazon_product_price_history.map((row: any) => ({ recordedAt: str(row.recorded_at), price: num(row.price) }))
    : [];
  const scrapeLog = Array.isArray(record.amazon_product_scrape_log)
    ? record.amazon_product_scrape_log.map((row: any) => ({
        loggedAt: str(row.logged_at),
        field: str(row.field),
        status: str(row.status),
        message: str(row.message),
      }))
    : [];

  return {
    id,
    slug,
    name,
    brand,
    category,
    subcategory,
    categoryPath,
    store: optStr(record.store),
    availability: optStr(record.availability),
    affiliateLink: optStr(record.affiliate_link),
    variations,
    priceHistory,
    scrapeLog,
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

function titleFromProductSlug(slug: string): string {
  const titleSlug = slug.slice(0, Math.max(0, slug.lastIndexOf("--")));
  const lowerCaseWords = new Set(["a", "an", "and", "for", "in", "of", "on", "or", "the", "to", "with"]);
  return titleSlug
    .split("-")
    .filter(Boolean)
    .map((word, index) =>
      index > 0 && lowerCaseWords.has(word.toLowerCase()) ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`,
    )
    .join(" ");
}

function unavailableAffiliateProduct(slug: string, asin: string): Product {
  const name = titleFromProductSlug(slug) || `Amazon product ${asin}`;
  const specificCategory = deriveCategoryFromTitle(name) ?? "Accessories";

  return {
    id: asin,
    slug,
    name,
    brand: sanitizeBrand(name.split(" ")[0]),
    category: deriveCategoryGroup(name, specificCategory),
    subcategory: specificCategory,
    categoryPath: [deriveCategoryGroup(name, specificCategory), specificCategory],
    description: "Product information is still being collected. Please check back soon for availability, pricing, and specifications.",
    price: 0,
    currency: "USD",
    imageUrl: "",
    images: [],
    rating: 0,
    reviewCount: 0,
    inventory: 0,
    tags: [],
    features: [],
    specs: [{ label: "ASIN", value: asin }],
    highlights: [],
    variations: [],
    priceHistory: [],
    scrapeLog: [],
    variantGroups: [],
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
      slug: productSlug(str(row.title) || value, row.asin ?? row.id),
      imageUrl: optStr(row.image_url),
      selected: value === currentValue,
    }));

    groups.push({ attribute: config.attribute, label: config.label, options });
  }

  return groups;
}

// High enough to cover the full catalog (a few hundred rows) without server-side pagination.
const CATALOG_FETCH_LIMIT = 1000;

export async function fetchProductCatalog(searchTerm?: string): Promise<Product[]> {
  const query = searchTerm?.trim();

  if (!supabase) {
    return [];
  }

  try {
    let request = supabase
      .from("amazon_products")
      .select(PRODUCT_SELECT)
      .not("affiliate_link", "is", null)
      .neq("affiliate_link", "")
      .limit(CATALOG_FETCH_LIMIT);

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
    const separator = trimmed.lastIndexOf("--");
    const identifier = separator >= 0 ? decodeURIComponent(trimmed.slice(separator + 2)) : "";
    let matchRow: any | undefined;
    let rows: any[] = [];

    // New product URLs contain the ASIN. This is the normal,
    // fast path and prevents a detail page from timing out while loading 1,000 rows.
    if (identifier && /^[A-Za-z0-9_-]+$/.test(identifier)) {
      const { data, error } = await supabase
        .from("amazon_products")
        .select(PRODUCT_SELECT)
        .eq("asin", identifier)
        .not("affiliate_link", "is", null)
        .neq("affiliate_link", "")
        .limit(1);
      if (!error && Array.isArray(data) && data[0]) matchRow = data[0];
    }

    // Preserve support for previously shared title-only links.
    if (!matchRow) {
      const { data, error } = await supabase
        .from("amazon_products")
        .select(PRODUCT_SELECT)
        .not("affiliate_link", "is", null)
        .neq("affiliate_link", "")
        .limit(CATALOG_FETCH_LIMIT);
      if (error) return null;
      rows = Array.isArray(data) ? data : [];
      const canonical = cleanSlug(trimmed);
      matchRow = rows.find((row) => {
      const name = str(row.title);
      if (!name) return false;

      const aliases = [
        cleanSlug(name),
        str(row.brand) ? cleanSlug(str(row.brand)) : "",
        String(row.id ?? row.asin ?? ""),
      ].filter(Boolean);

        return aliases.some((alias) => alias === canonical || alias === trimmed.toLowerCase() || alias === trimmed.replace(/\s+/g, "-").toLowerCase());
      });
    }

    if (!matchRow) return null;

    const groupId = str(matchRow.variant_group_id);
    let siblingRows = [matchRow];
    if (groupId) {
      const { data, error } = await supabase.from("amazon_products").select(PRODUCT_SELECT).eq("variant_group_id", groupId);
      if (!error && Array.isArray(data)) siblingRows = data;
    }
    const variantGroups = buildVariantGroups(siblingRows, matchRow);

    // Affiliate-link imports can create a row before Amazon enrichment succeeds.
    // It is still a real product record, so render it with the title in its URL
    // rather than sending shoppers to a 404 page.
    return normaliseProduct(matchRow, variantGroups, titleFromProductSlug(trimmed));
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

// Unique top-level categories present in the catalog, in fixed display order.
export function getUniqueCategories(products: Product[]): string[] {
  const present = new Set(products.map((p) => p.category).filter(Boolean));
  return CATEGORY_GROUPS.filter((c) => present.has(c));
}

// Unique subcategories, optionally scoped to a selected top-level category.
export function getUniqueSubcategories(products: Product[], category?: string): string[] {
  const scoped = category ? products.filter((p) => p.category === category) : products;
  const subcategories = new Set(scoped.map((p) => p.subcategory).filter((s): s is string => Boolean(s && s.trim())));
  return Array.from(subcategories).sort();
}

// Unique brands present in the catalog (optionally scoped to already-filtered products).
export function getUniqueBrands(products: Product[]): string[] {
  const brands = new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b && b.trim())));
  return Array.from(brands).sort();
}

// Overall min/max bounds for a plain price range slider/inputs
export function getPriceBounds(products: Product[]): { min: number; max: number } {
  const prices = products.map((p) => p.price).filter((p) => typeof p === "number" && p > 0);
  if (prices.length === 0) return { min: 0, max: 0 };
  return { min: Math.floor(Math.min(...prices)), max: Math.ceil(Math.max(...prices)) };
}

export type ProductFilters = {
  category?: string;
  subcategory?: string;
  brands?: string[];
  priceRange?: { min: number; max: number };
};

// Filter products by category, subcategory, brand, and price range.
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const { category, subcategory, brands, priceRange } = filters;
  return products.filter((product) => {
    if (category && product.category !== category) return false;
    if (subcategory && product.subcategory !== subcategory) return false;
    if (brands && brands.length > 0 && !brands.includes(product.brand)) return false;
    if (priceRange && (product.price < priceRange.min || product.price > priceRange.max)) return false;
    return true;
  });
}
