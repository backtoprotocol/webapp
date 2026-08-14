import Link from "next/link";
import { fetchProductCatalog } from "@/lib/product-catalog";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }> | { q?: string };
};

const filterOptions = [
  "Pickup ready in 1 hour",
  "Pickup ready in 2 hours",
  "Shipping: Get it tomorrow",
  "Get it by Saturday",
];

const categories = ["Gift Cards", "Best Buy Gift Cards", "Music", "Show all (35)"];
const priceBands = ["Less than $25", "$25 - $49.99", "$50 - $74.99", "$75 - $99.99", "$100 - $149.99", "$150 - $199.99", "$200 - $249.99", "$250 - $499.99"];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = searchParams ? await searchParams : {};
  const query = typeof params.q === "string" ? params.q : "";
  const products = await fetchProductCatalog(query);
  const visibleProducts = products.slice(0, 12);

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-4 py-4">
        <div className="flex gap-4">
          <aside className="w-[310px] shrink-0 border-r border-slate-200 bg-white px-4 py-4">
            <div className="space-y-5 border-b border-slate-200 pb-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-slate-300 bg-white text-[10px] text-slate-600">✓</span>
                <span className="text-base font-semibold text-slate-900">Get it fast</span>
              </div>
              {filterOptions.map((option, index) => (
                <label key={option} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                  <input type="checkbox" checked={index === 0} readOnly className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <div className="space-y-4 border-b border-slate-200 py-5">
              <div className="text-base font-semibold text-slate-900">Availability</div>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <span>Exclude Out of Stock Items</span>
              </label>
            </div>

            <div className="space-y-4 border-b border-slate-200 py-5">
              <div className="text-base font-semibold text-slate-900">Sold &amp; shipped by</div>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                <span>Best Buy</span>
              </label>
            </div>

            <div className="space-y-4 border-b border-slate-200 py-5">
              <div className="text-base font-semibold text-slate-900">Category</div>
              <div className="space-y-2 text-sm text-slate-700">
                {categories.map((category, index) => (
                  <div key={category} className={`flex items-center gap-2 ${index === 0 ? "font-medium text-slate-900" : ""}`}>
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 py-5">
              <div className="text-base font-semibold text-slate-900">Price</div>
              <div className="flex items-center gap-2">
                <input type="text" value="Min" readOnly className="w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500" />
                <input type="text" value="Max" readOnly className="w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500" />
                <button type="button" className="rounded-md border border-slate-300 bg-white px-2 py-2 text-sm text-slate-600">Set</button>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                {priceBands.map((price) => (
                  <label key={price} className="flex cursor-pointer items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                    <span>{price}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className="flex-1 bg-[#f3f4f6]">
            <div className="mb-4 flex items-center justify-end gap-3">
              <label className="text-sm text-slate-600">Sort by</label>
              <select defaultValue="best-match" className="h-10 min-w-[160px] rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none">
                <option value="best-match">Best Match</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {visibleProducts.length === 0 ? (
                <div className="col-span-full rounded-[18px] border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-600">
                  No matching items
                </div>
              ) : (
                visibleProducts.map((product, index) => (
                  <article key={product.id} className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
                    <div className="relative h-52 bg-[linear-gradient(135deg,#0d3f8d_0%,#0a6ec6_35%,#47d0b4_100%)] p-4">
                      <div className="absolute left-4 top-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4d200]">
                        <span className="rounded bg-[#f4d200] px-1.5 py-1 text-[8px] text-[#0f172a]">Best</span>
                        <span className="text-[#f4d200]">Buy</span>
                      </div>
                      <button type="button" aria-label="Save item" className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white">
                        ♡
                      </button>
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    <div className="p-4">
                      <div className="min-h-[54px] text-base font-medium leading-5 text-slate-800">
                        {product.name}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                        {["$75", "$15", "$25"].map((amount, amountIndex) => (
                          <span
                            key={`${product.id}-${amount}-${amountIndex}`}
                            className={`inline-flex min-w-[52px] items-center justify-center rounded-md border px-2 py-1 ${amountIndex === 0 ? "border-sky-400 bg-sky-50 text-sky-700" : "border-slate-200 bg-slate-50"}`}
                          >
                            {amount}
                          </span>
                        ))}
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500">›</span>
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-xs text-amber-500">
                        <span>★★★★★</span>
                        <span className="text-slate-500">5.0 (4 reviews)</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="text-3xl font-bold tracking-tight text-slate-900">
                          ${product.price}
                        </div>
                        <button type="button" className="rounded-md bg-[#f4d200] px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-[#f2c900]">
                          Add to cart
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          Pick up unavailable
                        </span>
                        <Link href={`/product/${product.slug}`} className="text-sky-700 underline underline-offset-2">Compare</Link>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                          Get it by Wed, Aug 19
                        </span>
                        <span>FREE</span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
