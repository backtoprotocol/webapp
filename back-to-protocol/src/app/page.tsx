import Link from "next/link";
import { fetchProductCatalog, type Product } from "@/lib/product-catalog";
import { ProtocolPlusNewsletter } from "@/components/protocol-plus-newsletter";
import { CarouselSection } from "@/components/carousel-section";
import { ProductImage } from "@/components/product-image";

type HomeCategoryKey = "laptops" | "desktops" | "peripherals" | "software";

const HOME_CATEGORY_META: Record<
  HomeCategoryKey,
  { title: string; blurb: string; query: string; accent: string; emptyMessage: string }
> = {
  laptops: {
    title: "Laptops",
    blurb: "Ultraportables, 2-in-1s, and creator-class machines.",
    query: "laptop",
    accent: "from-slate-800 via-slate-700 to-slate-500",
    emptyMessage: "New laptops are on the way.",
  },
  desktops: {
    title: "Desktops",
    blurb: "Towers, mini PCs, and all-in-ones for home or the studio.",
    query: "desktop",
    accent: "from-indigo-800 via-indigo-600 to-sky-500",
    emptyMessage: "New desktops are on the way.",
  },
  peripherals: {
    title: "Peripherals",
    blurb: "Mice, keyboards, cameras, and the accessories that tie a setup together.",
    query: "accessories",
    accent: "from-amber-600 via-orange-500 to-rose-500",
    emptyMessage: "New peripherals are on the way.",
  },
  software: {
    title: "Software",
    blurb: "Operating systems, creative suites, and productivity tools.",
    query: "software",
    accent: "from-emerald-700 via-teal-600 to-cyan-500",
    emptyMessage: "New software is on the way.",
  },
};

// Buckets a product into one of the homepage category sections using its category/subcategory/name text.
function categorizeProduct(product: Product): HomeCategoryKey | null {
  const haystack = `${product.category ?? ""} ${product.subcategory ?? ""} ${product.name}`.toLowerCase();
  if (/(laptop|notebook|macbook|chromebook|ultrabook|2-in-1)/.test(haystack)) return "laptops";
  if (/(desktop|tower pc|all-in-one|mini pc|imac|workstation)/.test(haystack)) return "desktops";
  if (/(software|license key|antivirus|subscription plan|os upgrade)/.test(haystack)) return "software";
  if (/(mouse|keyboard|camera|webcam|charg|dock|cable|hub|backpack|speaker|headphone|earbud|monitor|stand)/.test(haystack)) return "peripherals";
  return null;
}

function iconForProduct(product: Product): string {
  const haystack = `${product.category} ${product.subcategory ?? ""} ${product.name}`.toLowerCase();
  if (/(laptop|notebook|computer)/.test(haystack)) return "💻";
  if (/tablet/.test(haystack)) return "📱";
  if (/(headphone|earbud|speaker|audio)/.test(haystack)) return "🎧";
  if (/(watch|wearable|band)/.test(haystack)) return "⌚";
  if (/(tv|monitor|display)/.test(haystack)) return "📺";
  if (/(game|gaming|console|controller)/.test(haystack)) return "🎮";
  if (/(camera)/.test(haystack)) return "📷";
  if (/(charger|cable|dock|accessor)/.test(haystack)) return "🔌";
  return "🛠️";
}

function formatPrice(value: number, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: value % 1 === 0 ? 0 : 2 }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

function ProductCard({
  product,
  index,
  wide = false,
  showImage = false,
  rank,
}: {
  product: Product;
  index: number;
  wide?: boolean;
  showImage?: boolean;
  rank?: number;
}) {
  const onSale = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  const photo = product.imageUrl || product.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group flex flex-col ${wide ? "w-full" : "w-[190px] shrink-0"}`}
    >
      <div className="relative flex h-[190px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.06)] transition group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_28px_rgba(15,23,42,0.12)]">
        {typeof rank === "number" ? (
          <span className="absolute left-3 top-3 z-10 flex h-6 min-w-[24px] items-center justify-center rounded-md bg-sky-600 px-1.5 text-xs font-bold text-white">
            #{rank}
          </span>
        ) : null}

        <span
          aria-hidden="true"
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition group-hover:text-rose-500"
        >
          ♡
        </span>

        {showImage && photo ? (
          <ProductImage src={photo} alt={product.name} fallbackIcon={iconForProduct(product)} className="h-full w-full object-contain p-5" />
        ) : (
          <span className="text-5xl opacity-70" aria-hidden="true">
            {iconForProduct(product)}
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-700">{product.name}</p>

      <div className="mt-1.5">
        {onSale ? (
          <>
            <p className="text-[11px] font-bold uppercase tracking-wide text-rose-600">Top deal</p>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(product.price, product.currency)}{" "}
              <span className="ml-1 text-sm font-normal text-slate-500 line-through">
                {formatPrice(product.compareAtPrice as number, product.currency)}
              </span>
            </p>
          </>
        ) : (
          <p className="text-lg font-bold text-slate-900">{formatPrice(product.price, product.currency)}</p>
        )}
      </div>
    </Link>
  );
}

function CategorySection({ categoryKey, products }: { categoryKey: HomeCategoryKey; products: Product[] }) {
  const meta = HOME_CATEGORY_META[categoryKey];

  if (products.length === 0) {
    return (
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.06em] text-slate-900">{meta.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{meta.blurb}</p>
          </div>
          <Link
            href={`/search?q=${encodeURIComponent(meta.query)}`}
            className="text-sm font-semibold text-sky-700 underline-offset-2 hover:underline"
          >
            Shop all
          </Link>
        </div>

        <div
          className={`flex flex-col items-start gap-4 rounded-[20px] bg-gradient-to-br ${meta.accent} p-8 text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)]`}
        >
          <p className="text-lg font-bold leading-snug">{meta.emptyMessage}</p>
          <p className="max-w-md text-sm text-white/80">
            We&apos;re stocking this section now — check back soon or browse everything we carry today.
          </p>
          <Link
            href="/search"
            className="mt-1 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            Browse all gear
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <CarouselSection
        title={meta.title}
        subtitle={meta.blurb}
        shopAllHref={`/search?q=${encodeURIComponent(meta.query)}`}
      >
        {products.slice(0, 10).map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} rank={index + 1} showImage />
        ))}
      </CarouselSection>
    </section>
  );
}

export default async function Home() {
  const catalog = await fetchProductCatalog();
  const trendingProducts = catalog.slice(0, 10);

  const categorized: Record<HomeCategoryKey, Product[]> = {
    laptops: [],
    desktops: [],
    peripherals: [],
    software: [],
  };
  for (const product of catalog) {
    const key = categorizeProduct(product);
    if (key) categorized[key].push(product);
  }

  return (
    <main className="bg-[#eef1f6] pb-24 text-slate-900">
      <section className="mx-auto max-w-[1480px] px-4 pt-8 sm:px-6 lg:px-8">
        {/* Membership perks banner */}
        <div
          className="relative overflow-hidden rounded-[24px] px-6 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.14)] sm:px-10 sm:py-10"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 35%, #0ea5e9 70%, #22d3ee 100%)" }}
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-fuchsia-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="absolute right-6 top-6 hidden items-center gap-2 sm:flex">
            <button type="button" aria-label="Previous" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">‹</button>
            <button type="button" aria-label="Pause" className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-900">❚❚</button>
            <button type="button" aria-label="Next" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">›</button>
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-lg text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">More for members!</p>
              <h2 className="mt-2 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
                Get free delivery &amp; priority research drops
              </h2>
              <Link
                href="/protocol-plus"
                className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-blue-50"
              >
                Try Protocol+ free
              </Link>
            </div>

            <div className="hidden items-center justify-center gap-4 lg:flex">
              <div className="h-32 w-32 rotate-[-8deg] rounded-3xl bg-gradient-to-br from-white/90 to-cyan-200 shadow-[0_12px_28px_rgba(8,20,60,0.25)]" />
              <div className="h-40 w-28 rotate-[6deg] rounded-3xl bg-gradient-to-br from-amber-200 to-orange-300 shadow-[0_12px_28px_rgba(8,20,60,0.25)]" />
              <div className="h-28 w-28 rotate-[-4deg] rounded-3xl bg-gradient-to-br from-emerald-200 to-teal-300 shadow-[0_12px_28px_rgba(8,20,60,0.25)]" />
            </div>
          </div>
        </div>

        {/* Discover trending gear */}
        {trendingProducts.length > 0 ? (
          <section className="mt-16">
            <CarouselSection title="Discover trending gear" shopAllHref="/search">
              {trendingProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} rank={index + 1} showImage />
              ))}
            </CarouselSection>
          </section>
        ) : null}

        {/* Laptops */}
        <CategorySection categoryKey="laptops" products={categorized.laptops} />

        {/* Desktops */}
        <CategorySection categoryKey="desktops" products={categorized.desktops} />

        {/* Peripherals */}
        <CategorySection categoryKey="peripherals" products={categorized.peripherals} />

        {/* Software */}
        <CategorySection categoryKey="software" products={categorized.software} />

        {/* Protocol+ membership */}
        <section className="mt-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-[-0.06em] text-slate-900">Protocol+</h2>
            <p className="mt-1 text-sm text-slate-600">Membership perks that make every purchase go further.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div
              className="relative flex flex-col justify-between overflow-hidden rounded-[20px] p-8 text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)]"
              style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #4338ca 45%, #0ea5e9 100%)" }}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">Join today</p>
                <h3 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em]">Try Protocol+ free</h3>
                <p className="mt-2 text-sm text-white/80">Free delivery, priority research drops, and member-only pricing.</p>
              </div>
              <Link
                href="/protocol-plus"
                className="mt-6 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-blue-50"
              >
                Get started
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-[20px] bg-gradient-to-br from-emerald-200 to-teal-300 p-6 text-slate-900">
              <p className="text-lg font-bold leading-snug">Free setup &amp; support on select devices*</p>
              <Link href="/protocol-plus" className="mt-4 inline-block w-fit text-sm font-semibold text-slate-800 underline-offset-2 hover:underline">
                Learn more
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-[20px] bg-gradient-to-br from-indigo-200 to-violet-300 p-6 text-slate-900">
              <p className="text-lg font-bold leading-snug">Early access to new research &amp; protocol drops</p>
              <Link href="/research" className="mt-4 inline-block w-fit text-sm font-semibold text-slate-800 underline-offset-2 hover:underline">
                Explore research
              </Link>
            </div>
          </div>
        </section>

        {/* Protocol+ newsletter signup */}
        <section className="mt-16">
          <ProtocolPlusNewsletter />
        </section>
      </section>
    </main>
  );
}
