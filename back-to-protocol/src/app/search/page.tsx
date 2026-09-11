"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  fetchProductCatalog,
  getUniqueCategories,
  getUniqueSubcategories,
  getUniqueBrands,
  getPriceBounds,
  filterProducts,
} from "@/lib/product-catalog";
import type { Product } from "@/lib/product-catalog";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string; category?: string }> | { q?: string; category?: string };
};

const PAGE_SIZE = 24;
const CATEGORY_SEARCH_TERMS: Record<string, string> = {
  laptop: "Laptops",
  laptops: "Laptops",
  desktop: "Desktops",
  desktops: "Desktops",
  peripheral: "Peripherals",
  peripherals: "Peripherals",
  accessories: "Peripherals",
  software: "Software",
  service: "Services",
  services: "Services",
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [bounds, setBounds] = useState({ min: 0, max: 0 });
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [sortBy, setSortBy] = useState("best-match");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const params = searchParams ? await searchParams : {};
      const query = typeof params.q === "string" ? params.q : "";
      const queryCategory = CATEGORY_SEARCH_TERMS[query.trim().toLowerCase()];
      const fetchedProducts = await fetchProductCatalog(queryCategory ? undefined : query);
      const availableCategories = getUniqueCategories(fetchedProducts);
      const requestedCategory =
        (typeof params.category === "string" ? params.category : undefined) ?? queryCategory;
      const priceBounds = getPriceBounds(fetchedProducts);

      setProducts(fetchedProducts);
      setCategories(availableCategories);
      setSelectedCategory(
        requestedCategory && availableCategories.includes(requestedCategory)
          ? requestedCategory
          : undefined,
      );
      setSelectedSubcategory(undefined);
      setBounds(priceBounds);
      setPriceRange(priceBounds);
      setLoading(false);
    };
    loadProducts();
  }, [searchParams]);

  // Subcategories and brands narrow to whatever the current category selection allows.
  const subcategories = useMemo(
    () => getUniqueSubcategories(products, selectedCategory),
    [products, selectedCategory],
  );
  const brands = useMemo(() => getUniqueBrands(products), [products]);

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      brands: selectedBrands,
      priceRange,
    });
    const sorted = [...filtered];
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [products, selectedCategory, selectedSubcategory, selectedBrands, priceRange, sortBy]);

  const visibleProducts = filteredProducts.slice(0, page * PAGE_SIZE);
  const hasMore = visibleProducts.length < filteredProducts.length;

  // Reset pagination whenever the active filters change.
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedSubcategory, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  };

  const resetFilters = () => {
    setSelectedCategory(undefined);
    setSelectedSubcategory(undefined);
    setSelectedBrands([]);
    setPriceRange(bounds);
  };

  const hasActiveFilters =
    Boolean(selectedCategory) ||
    Boolean(selectedSubcategory) ||
    selectedBrands.length > 0 ||
    priceRange.min !== bounds.min ||
    priceRange.max !== bounds.max;

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-[1400px] px-4 py-16 text-center text-sm text-slate-500">Loading products…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Filters</h2>
                {hasActiveFilters && (
                  <button type="button" onClick={resetFilters} className="text-xs font-medium text-sky-600 hover:text-sky-700">
                    Clear all
                  </button>
                )}
              </div>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Category</h3>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(undefined);
                      setSelectedSubcategory(undefined);
                    }}
                    className={`w-full rounded-md px-2.5 py-1.5 text-left text-sm transition ${
                      !selectedCategory ? "bg-sky-50 font-medium text-sky-700" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category}
                      onClick={() => {
                        setSelectedCategory(selectedCategory === category ? undefined : category);
                        setSelectedSubcategory(undefined);
                      }}
                      className={`w-full rounded-md px-2.5 py-1.5 text-left text-sm transition ${
                        selectedCategory === category ? "bg-sky-50 font-medium text-sky-700" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {subcategories.length > 0 && (
                <div className="border-b border-slate-100 py-5">
                  <h3 className="mb-3 text-sm font-semibold text-slate-900">Subcategory</h3>
                  <div className="space-y-1">
                    {subcategories.map((subcategory) => (
                      <button
                        type="button"
                        key={subcategory}
                        onClick={() =>
                          setSelectedSubcategory(selectedSubcategory === subcategory ? undefined : subcategory)
                        }
                        className={`w-full rounded-md px-2.5 py-1.5 text-left text-sm transition ${
                          selectedSubcategory === subcategory
                            ? "bg-sky-50 font-medium text-sky-700"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {subcategory}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {brands.length > 0 && (
                <div className="border-b border-slate-100 py-5">
                  <h3 className="mb-3 text-sm font-semibold text-slate-900">Brand</h3>
                  <div className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm text-slate-700">
                    {brands.map((brand) => (
                      <label key={brand} className="flex cursor-pointer items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-5">
                <h3 className="mb-3 text-sm font-semibold text-slate-900">Price Range</h3>
                {bounds.max > bounds.min ? (
                  <div className="space-y-4">
                    <div className="price-range-slider">
                      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
                      <div
                        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-900"
                        style={{
                          left: `${((priceRange.min - bounds.min) / (bounds.max - bounds.min)) * 100}%`,
                          right: `${100 - ((priceRange.max - bounds.min) / (bounds.max - bounds.min)) * 100}%`,
                        }}
                      />
                      <input
                        type="range"
                        min={bounds.min}
                        max={bounds.max}
                        value={priceRange.min}
                        onChange={(e) =>
                          setPriceRange((prev) => ({ ...prev, min: Math.min(Number(e.target.value), prev.max) }))
                        }
                      />
                      <input
                        type="range"
                        min={bounds.min}
                        max={bounds.max}
                        value={priceRange.max}
                        onChange={(e) =>
                          setPriceRange((prev) => ({ ...prev, max: Math.max(Number(e.target.value), prev.min) }))
                        }
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-1 items-center rounded-md border border-slate-300 px-2">
                        <span className="text-sm text-slate-400">$</span>
                        <input
                          type="number"
                          min={bounds.min}
                          max={priceRange.max}
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange((prev) => ({ ...prev, min: Math.min(Number(e.target.value) || 0, prev.max) }))
                          }
                          className="w-full rounded-md py-1.5 pl-1 text-sm text-slate-700 outline-none"
                        />
                      </div>
                      <span className="text-slate-400">–</span>
                      <div className="flex flex-1 items-center rounded-md border border-slate-300 px-2">
                        <span className="text-sm text-slate-400">$</span>
                        <input
                          type="number"
                          min={priceRange.min}
                          max={bounds.max}
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({ ...prev, max: Math.max(Number(e.target.value) || 0, prev.min) }))
                          }
                          className="w-full rounded-md py-1.5 pl-1 text-sm text-slate-700 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No pricing data available</p>
                )}
              </div>
            </div>
          </aside>

          <section className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">{filteredProducts.length} results</p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-slate-600">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 shadow-sm outline-none"
                >
                  <option value="best-match">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.length === 0 ? (
                <div className="col-span-full rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500">
                  No matching items
                </div>
              ) : (
                visibleProducts.map((product) => (
                  <article key={product.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                    <Link href={`/product/${product.slug}`} className="relative flex h-56 items-center justify-center bg-slate-50">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-contain p-6 transition group-hover:scale-105"
                        />
                      ) : (
                        <div className="text-sm text-slate-400">No image available</div>
                      )}
                    </Link>

                    <div className="p-4">
                      {product.brand && <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">{product.brand}</div>}

                      <Link href={`/product/${product.slug}`} className="line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-slate-800 hover:text-sky-700">
                        {product.name}
                      </Link>

                      <div className="mt-2 flex items-center gap-1 text-xs text-amber-500">
                        <span>{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}</span>
                        <span className="text-slate-400">({product.reviewCount})</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                        {product.affiliateLink ? (
                          <a
                            href={product.affiliateLink}
                            target="_blank"
                            rel="sponsored nofollow noopener noreferrer"
                            className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                          >
                            Buy now
                          </a>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="cursor-not-allowed rounded-md bg-slate-300 px-3 py-1.5 text-xs font-semibold text-white"
                          >
                            Buy now
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-md border border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Load more
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
