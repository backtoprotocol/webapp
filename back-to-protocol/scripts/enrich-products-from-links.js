// Enriches amazon_products rows by fetching product pages and extracting
// title/brand/price/image/rating/review_count/description/category.
require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const BATCH_LIMIT = Number(process.env.AFFILIATE_ENRICH_LIMIT || 300);
const OUTPUT_UNRESOLVED = path.join(__dirname, "..", "data", "unresolved-enrichment-links.txt");

function decodeHtml(value) {
  return String(value ?? "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/")
    .trim();
}

function extractFirst(html, regex) {
  const match = html.match(regex);
  return match ? decodeHtml(match[1]) : "";
}

function extractAll(html, regex) {
  const values = [];
  for (const match of html.matchAll(regex)) {
    values.push(decodeHtml(match[1]));
  }
  return values;
}

function parsePrice(text) {
  if (!text) return null;
  const match = String(text).replace(/,/g, "").match(/(\d+(?:\.\d{1,2})?)/);
  if (!match) return null;
  const num = Number(match[1]);
  return Number.isFinite(num) ? num : null;
}

function extractMarketplace(url) {
  try {
    const host = new URL(String(url ?? "").trim()).hostname.toLowerCase();
    if (host.includes("amazon.")) return host.replace(/^www\./, "");
  } catch {}
  return null;
}

function cleanBrand(raw) {
  const text = String(raw ?? "").replace(/\s+/g, " ").trim();
  if (!text) return "";

  return text
    .replace(/^visit the\s+/i, "")
    .replace(/^brand:\s*/i, "")
    .replace(/\s+store$/i, "")
    .trim();
}

function parseJsonLd(html) {
  const scripts = extractAll(html, /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);

  for (const scriptText of scripts) {
    try {
      const parsed = JSON.parse(scriptText);
      const queue = Array.isArray(parsed) ? parsed : [parsed];

      for (const item of queue) {
        if (!item || typeof item !== "object") continue;

        const typeRaw = item["@type"];
        const type = Array.isArray(typeRaw) ? typeRaw.join(" ").toLowerCase() : String(typeRaw ?? "").toLowerCase();
        if (!type.includes("product")) continue;

        const brand = typeof item.brand === "string"
          ? item.brand
          : typeof item.brand?.name === "string"
            ? item.brand.name
            : "";

        const imageList = [];
        if (typeof item.image === "string") imageList.push(item.image);
        if (Array.isArray(item.image)) {
          for (const imageValue of item.image) {
            if (typeof imageValue === "string") imageList.push(imageValue);
          }
        }

        const offer = Array.isArray(item.offers) ? item.offers[0] : item.offers;
        const price = offer?.price ?? item?.price ?? null;

        return {
          title: typeof item.name === "string" ? item.name : "",
          brand: cleanBrand(brand),
          description: typeof item.description === "string" ? item.description : "",
          imageUrls: imageList,
          price: parsePrice(String(price ?? "")),
          ratings: Number(item.aggregateRating?.ratingValue ?? NaN),
          reviewCount: Number(item.aggregateRating?.reviewCount ?? NaN),
          category: typeof item.category === "string" ? item.category : "",
        };
      }
    } catch {
      // Ignore invalid JSON-LD blocks.
    }
  }

  return null;
}

function extractImageUrls(html) {
  const urls = [];

  const dynamicImageRaw = extractFirst(html, /data-a-dynamic-image="([^"]+)"/i);
  if (dynamicImageRaw) {
    try {
      const dynamicImage = JSON.parse(dynamicImageRaw);
      for (const key of Object.keys(dynamicImage)) {
        if (typeof key === "string" && key.startsWith("http")) urls.push(key);
      }
    } catch {}
  }

  const hiResRegex = /"hiRes":"(https?:\\\/\\\/[^"\\]+)"/gi;
  for (const match of html.matchAll(hiResRegex)) {
    const url = String(match[1]).replace(/\\\//g, "/");
    if (url.startsWith("http")) urls.push(url);
  }

  const metaImages = [
    extractFirst(html, /<meta property="og:image" content="([^"]+)"/i),
    extractFirst(html, /<meta name="twitter:image" content="([^"]+)"/i),
  ].filter(Boolean);

  for (const imageUrl of metaImages) {
    if (String(imageUrl).startsWith("http")) {
      urls.push(imageUrl);
    }
  }

  return Array.from(new Set(urls));
}

function extractCategory(html) {
  const category = extractFirst(
    html,
    /id="wayfinding-breadcrumbs_feature_div"[\s\S]*?<li[^>]*>[\s\S]*?<a[^>]*>\s*<span[^>]*>([^<]+)<\/span>/i,
  );
  return category || "";
}

function titleFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const slugMatch = pathname.match(/\/([^/]+)\/dp\/[A-Z0-9]{10}/i);
    if (!slugMatch) return "";
    return decodeURIComponent(slugMatch[1]).replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  } catch {
    return "";
  }
}

function categoryFromTitle(title) {
  const text = String(title ?? "").toLowerCase();
  if (!text) return null;
  if (text.includes("keyboard")) return "Keyboards";
  if (text.includes("mouse")) return "Mice";
  if (text.includes("headset") || text.includes("earbud") || text.includes("headphone")) return "Audio";
  if (text.includes("webcam")) return "Webcams";
  if (text.includes("charger") || text.includes("adapter") || text.includes("power")) return "Chargers & Power";
  if (text.includes("cable")) return "Cables";
  if (text.includes("pen") || text.includes("stylus")) return "Stylus Pens";
  if (text.includes("case") || text.includes("folio")) return "Cases";
  if (text.includes("protector")) return "Screen Protectors";
  if (text.includes("controller") || text.includes("joystick")) return "Gaming Accessories";
  return null;
}

function fallbackImageForAsin(asin) {
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
}

function extractProductData(html, fallbackUrl) {
  const lower = html.toLowerCase();
  const isBlocked =
    lower.includes("enter the characters you see below") ||
    lower.includes("sorry, we just need to make sure you're not a robot") ||
    lower.includes("captcha");

  if (isBlocked) {
    return { blocked: true };
  }

  const title =
    extractFirst(html, /id="productTitle"[^>]*>\s*([\s\S]*?)\s*<\/span>/i) ||
    extractFirst(html, /<meta property="og:title" content="([^"]+)"/i);

  const jsonLd = parseJsonLd(html);

  const byline = extractFirst(html, /id="bylineInfo"[^>]*>\s*([\s\S]*?)\s*<\//i);
  const brand = cleanBrand(byline);

  const rawPrice =
    extractFirst(html, /id="priceblock_ourprice"[^>]*>\s*([^<]+)</i) ||
    extractFirst(html, /id="priceblock_dealprice"[^>]*>\s*([^<]+)</i) ||
    extractFirst(html, /id="priceblock_saleprice"[^>]*>\s*([^<]+)</i) ||
    extractFirst(html, /class="a-price[^"]*"[\s\S]*?<span class="a-offscreen">\s*([^<]+)</i);

  const price = parsePrice(rawPrice);

  const ratingText =
    extractFirst(html, /id="acrPopover"[^>]*title="([^"]+)"/i) ||
    extractFirst(html, /([0-9.]+)\s+out of\s+5\s+stars/i);
  const ratingMatch = String(ratingText).match(/([0-9.]+)/);
  const ratings = ratingMatch ? Number(ratingMatch[1]) : null;

  const reviewText = extractFirst(html, /id="acrCustomerReviewText"[^>]*>\s*([^<]+)</i);
  const reviewCountMatch = reviewText.replace(/,/g, "").match(/(\d+)/);
  const reviewCount = reviewCountMatch ? Number(reviewCountMatch[1]) : null;

  const description =
    extractFirst(html, /<meta name="description" content="([^"]+)"/i) ||
    extractFirst(html, /id="productDescription"[^>]*>[\s\S]*?<p[^>]*>\s*([\s\S]*?)\s*<\/p>/i);

  const imageUrls = Array.from(
    new Set([...(jsonLd?.imageUrls ?? []), ...extractImageUrls(html)].filter((url) => String(url).startsWith("http"))),
  );
  const imageUrl = imageUrls[0] || "";
  const category = jsonLd?.category || extractCategory(html);

  return {
    blocked: false,
    detail_page_url: fallbackUrl,
    title: title || jsonLd?.title || null,
    brand: brand || jsonLd?.brand || null,
    price: price ?? jsonLd?.price ?? null,
    image_url: imageUrl || null,
    images: imageUrls.length > 0 ? imageUrls : null,
    ratings: Number.isFinite(ratings) ? ratings : Number.isFinite(jsonLd?.ratings) ? jsonLd.ratings : null,
    review_count: Number.isFinite(reviewCount) ? reviewCount : Number.isFinite(jsonLd?.reviewCount) ? jsonLd.reviewCount : null,
    description: description || jsonLd?.description || null,
    category: category || null,
    marketplace: extractMarketplace(fallbackUrl),
  };
}

async function resolveRedirectUrl(url) {
  const text = String(url ?? "").trim();
  if (!text) return text;

  try {
    const response = await fetch(text, {
      method: "GET",
      redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; BackToProtocolEnricher/1.0)",
        "accept-language": "en-US,en;q=0.9",
      },
    });

    return response.url || text;
  } catch {
    return text;
  }
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      "accept-language": "en-US,en;q=0.9",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });

  return response.text();
}

function extractMobileData(html) {
  const blocked = /captcha|not a robot|enter the characters you see below/i.test(html);
  if (blocked) return { blocked: true };

  const title =
    extractFirst(html, /id="productTitle"[^>]*>\s*([\s\S]*?)\s*<\/span>/i) ||
    extractFirst(html, /<meta property="og:title" content="([^"]+)"/i) ||
    extractFirst(html, /<title>\s*([^<]+?)\s*: Amazon\.com/i);

  const priceText =
    extractFirst(html, /class="a-offscreen">\s*\$\s*([^<]+)</i) ||
    (() => {
      const whole = extractFirst(html, /<span class="a-price-whole">\s*([^<]+)</i);
      const fraction = extractFirst(html, /<span class="a-price-fraction">\s*([^<]+)</i);
      if (whole) {
        return `${whole}.${fraction || "00"}`;
      }
      return "";
    })() ||
    extractFirst(html, /\$\s*([0-9][0-9,]*\.[0-9]{2})/i);

  const ratingText =
    extractFirst(html, /([0-9.]+)\s+out of\s+5\s+stars/i) ||
    extractFirst(html, /aria-label="([0-9.]+) out of 5 stars"/i);
  const ratingMatch = String(ratingText).match(/([0-9.]+)/);

  const reviewText =
    extractFirst(html, /id="acrCustomerReviewText"[^>]*>\s*([^<]+)</i) ||
    extractFirst(html, /([0-9,]+)\s+ratings?/i);
  const reviewMatch = String(reviewText).replace(/,/g, "").match(/(\d+)/);

  const imageUrl =
    extractFirst(html, /<meta property="og:image" content="([^"]+)"/i) ||
    extractFirst(html, /<meta name="twitter:image" content="([^"]+)"/i);

  return {
    blocked: false,
    title: title || null,
    price: parsePrice(priceText),
    ratings: ratingMatch ? Number(ratingMatch[1]) : null,
    review_count: reviewMatch ? Number(reviewMatch[1]) : null,
    image_url: imageUrl || null,
  };
}

async function fetchMobileProductFallback(asin, marketplace) {
  const host = marketplace && marketplace.includes("amazon.") ? marketplace : "www.amazon.com";
  const url = `https://${host}/gp/aw/d/${asin}`;
  const html = await fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: {
      "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      "accept-language": "en-US,en;q=0.9",
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  }).then((res) => res.text());

  return extractMobileData(html);
}

async function fetchSearchFallback(asin) {
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(asin)}`;
  const html = await fetchHtml(url);

  const blocked = /captcha|not a robot|enter the characters you see below/i.test(html);
  if (blocked) return { blocked: true };

  const marker = `data-asin="${asin}"`;
  const markerIndex = html.indexOf(marker);
  const block = markerIndex >= 0 ? html.slice(markerIndex, markerIndex + 24000) : html;

  const title =
    extractFirst(block, /<h2[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i) ||
    extractFirst(block, /aria-label="([^"]+)"/i);

  const priceText =
    extractFirst(block, /class="a-offscreen">\s*\$\s*([^<]+)</i) ||
    (() => {
      const whole = extractFirst(block, /<span class="a-price-whole">\s*([^<]+)</i);
      const fraction = extractFirst(block, /<span class="a-price-fraction">\s*([^<]+)</i);
      if (whole) {
        return `${whole}.${fraction || "00"}`;
      }
      return "";
    })() ||
    extractFirst(block, /\$\s*([0-9][0-9,]*\.[0-9]{2})/i);

  const imageUrl =
    extractFirst(block, /<img[^>]+src="([^"]+)"[^>]*class="s-image/i) ||
    extractFirst(block, /<img[^>]+class="s-image"[^>]+src="([^"]+)"/i);

  const ratingText =
    extractFirst(block, /([0-9.]+)\s+out of\s+5\s+stars/i) ||
    extractFirst(block, /aria-label="([0-9.]+) out of 5 stars"/i);
  const ratingMatch = String(ratingText).match(/([0-9.]+)/);

  const reviewText =
    extractFirst(block, /<span class="a-size-base s-underline-text">\s*([0-9,]+)\s*<\/span>/i) ||
    extractFirst(block, /([0-9,]+)\s+ratings/i);
  const reviewMatch = String(reviewText).replace(/,/g, "").match(/(\d+)/);

  return {
    blocked: false,
    title: title || null,
    price: parsePrice(priceText),
    image_url: imageUrl || null,
    ratings: ratingMatch ? Number(ratingMatch[1]) : null,
    review_count: reviewMatch ? Number(reviewMatch[1]) : null,
  };
}

function canonicalAmazonUrl(asin, marketplace, originalUrl) {
  const host = typeof marketplace === "string" && marketplace.includes("amazon.")
    ? marketplace
    : extractMarketplace(originalUrl) || "www.amazon.com";

  return `https://${host}/dp/${asin}`;
}

async function run() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  }

  const { data, error } = await supabase
    .from("amazon_products")
    .select("asin,detail_page_url,title,brand,price,image_url,images,description,category,ratings,review_count,marketplace")
    .order("created_at", { ascending: false })
    .limit(BATCH_LIMIT);

  if (error) {
    throw error;
  }

  const rows = Array.isArray(data) ? data : [];
  const targets = rows.filter(
    (row) =>
      !row.title || !row.brand || !row.price || !row.image_url || !row.description || !row.detail_page_url,
  );

  if (targets.length === 0) {
    console.log("No products need enrichment in this batch.");
    return;
  }

  console.log(`Found ${targets.length} products to enrich.`);

  const updates = [];
  const unresolved = [];
  let blockedCount = 0;
  let searchRecoveredCount = 0;

  for (let i = 0; i < targets.length; i += 1) {
    const row = targets[i];
    const sourceUrl = row.detail_page_url || `https://www.amazon.com/dp/${row.asin}`;
    const canonicalUrl = canonicalAmazonUrl(row.asin, row.marketplace, sourceUrl);

    try {
      const resolved = await resolveRedirectUrl(canonicalUrl);
      const html = await fetchHtml(resolved);
      const parsed = extractProductData(html, resolved);

      if (parsed.blocked) {
        blockedCount += 1;

        try {
          const mobileFallback = await fetchMobileProductFallback(row.asin, row.marketplace || extractMarketplace(canonicalUrl));
          const searchFallback = await fetchSearchFallback(row.asin);
          const guessedTitle = titleFromUrl(sourceUrl);
          const derivedTitle = mobileFallback.title || searchFallback.title || guessedTitle || null;
          const derivedBrand = row.brand || cleanBrand((derivedTitle || "").split(" ")[0]);
          const derivedCategory = row.category || categoryFromTitle(derivedTitle);
          const derivedImage = mobileFallback.image_url || searchFallback.image_url || row.image_url || fallbackImageForAsin(row.asin);

          updates.push({
            asin: row.asin,
            detail_page_url: canonicalUrl,
            marketplace: extractMarketplace(canonicalUrl),
            title: row.title || derivedTitle,
            brand: row.brand || derivedBrand || null,
            price: row.price || mobileFallback.price || searchFallback.price || null,
            image_url: derivedImage,
            images: Array.isArray(row.images) && row.images.length > 0 ? row.images : [derivedImage],
            ratings: row.ratings || mobileFallback.ratings || searchFallback.ratings || null,
            review_count: row.review_count || mobileFallback.review_count || searchFallback.review_count || null,
            description: row.description || derivedTitle,
            category: derivedCategory || null,
          });

          if (!searchFallback.blocked) {
            searchRecoveredCount += 1;
          }
        } catch {
          unresolved.push(`${row.asin}\t${canonicalUrl}\tBLOCKED`);
        }
      } else {
        let mobileFallback = null;
        if (!row.price || !row.ratings || !row.review_count || !row.image_url || !row.title) {
          mobileFallback = await fetchMobileProductFallback(row.asin, row.marketplace || parsed.marketplace);
        }

        updates.push({
          asin: row.asin,
          detail_page_url: row.detail_page_url || parsed.detail_page_url,
          marketplace: row.marketplace || parsed.marketplace,
          title: row.title || parsed.title || mobileFallback?.title || null,
          brand: row.brand || parsed.brand || cleanBrand((row.title || parsed.title || "").split(" ")[0]),
          price: row.price || parsed.price || mobileFallback?.price || null,
          image_url: row.image_url || parsed.image_url || mobileFallback?.image_url || fallbackImageForAsin(row.asin),
          images: Array.isArray(row.images) && row.images.length > 0 ? row.images : parsed.images,
          ratings: row.ratings || parsed.ratings || mobileFallback?.ratings || null,
          review_count: row.review_count || parsed.review_count || mobileFallback?.review_count || null,
          description: row.description || parsed.description || row.title || parsed.title,
          category: row.category || parsed.category || categoryFromTitle(row.title || parsed.title),
        });
      }
    } catch (fetchError) {
      unresolved.push(`${row.asin}\t${canonicalUrl}\t${String(fetchError?.message || fetchError)}`);
    }

    if ((i + 1) % 25 === 0 || i + 1 === targets.length) {
      console.log(`Processed ${i + 1}/${targets.length}`);
    }
  }

  if (updates.length > 0) {
    const { error: upsertError } = await supabase.from("amazon_products").upsert(updates, { onConflict: "asin" });
    if (upsertError) {
      throw upsertError;
    }
  }

  if (unresolved.length > 0) {
    fs.writeFileSync(OUTPUT_UNRESOLVED, `${unresolved.join("\n")}\n`, "utf8");
  }

  console.log(`Updated ${updates.length} products.`);
  console.log(`Blocked pages: ${blockedCount}`);
  console.log(`Search fallback recoveries: ${searchRecoveredCount}`);
  console.log(`Unresolved pages: ${unresolved.length}`);
  if (unresolved.length > 0) {
    console.log(`Saved unresolved list: ${OUTPUT_UNRESOLVED}`);
  }
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
