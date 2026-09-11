"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/product-catalog";

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span aria-hidden className="flex text-amber-500">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rounded ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

function formatCurrency(value: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

export function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState<string>(product.images[0] ?? product.imageUrl);
  const [showAllThumbnails, setShowAllThumbnails] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [product.id]);

  const currency = product.currency ?? "USD";
  const hasSavings = typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  const savings = hasSavings ? (product.compareAtPrice as number) - product.price : 0;

  const breadcrumbTrail = [
    { label: "Home", href: "/" },
    ...product.categoryPath.map((category) => ({
      label: category,
      href: `/search?q=${encodeURIComponent(category)}`,
    })),
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  const THUMB_LIMIT = 6;
  const visibleThumbnails = showAllThumbnails ? product.images : product.images.slice(0, THUMB_LIMIT);
  const hiddenThumbnailCount = product.images.length - THUMB_LIMIT;

  const descriptionIsLong = product.description.length > 220;
  const descriptionText =
    descriptionIsLong && !descriptionExpanded ? `${product.description.slice(0, 220).trimEnd()}…` : product.description;

  return (
    <main className="min-h-screen bg-[#f3f4f6] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-slate-500">
          {breadcrumbTrail.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {index > 0 ? <span className="text-slate-300">›</span> : null}
              <Link href={crumb.href} className="hover:text-sky-700 hover:underline">
                {crumb.label}
              </Link>
            </span>
          ))}
          <span className="flex items-center gap-1">
            <span className="text-slate-300">›</span>
            <span className="text-slate-700">{product.name}</span>
          </span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Gallery + info card */}
          <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-[64px_400px_minmax(0,1fr)] lg:gap-8">
            {/* Thumbnails */}
            {product.images.length > 1 ? (
              <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:w-16 sm:shrink-0 sm:flex-col sm:overflow-visible">
                {visibleThumbnails.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`shrink-0 overflow-hidden rounded-lg border bg-white ${
                      activeImage === img ? "border-sky-600 ring-1 ring-sky-600" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="h-16 w-16 object-contain p-1.5" />
                  </button>
                ))}
                {!showAllThumbnails && hiddenThumbnailCount > 0 ? (
                  <button
                    type="button"
                    onClick={() => setShowAllThumbnails(true)}
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-xs font-semibold text-slate-600 hover:border-slate-300"
                  >
                    +{hiddenThumbnailCount} more
                  </button>
                ) : null}
                {product.videoUrl ? (
                  <a
                    href={product.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-900 text-white hover:border-slate-400"
                    aria-label="Watch product video"
                  >
                    ▶
                  </a>
                ) : null}
              </div>
            ) : null}

            {/* Main image */}
            <div className="order-1 h-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white sm:order-2 lg:h-[440px]">
              {activeImage ? (
                <img src={activeImage} alt={product.name} className="h-full w-full object-contain p-4" />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center text-sm text-slate-400">
                  No image available
                </div>
              )}
            </div>

            {/* Center info */}
            <div className="order-3 sm:col-span-2 lg:col-span-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{product.name}</h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              {product.modelNumber ? <span>Model: {product.modelNumber}</span> : null}
              {product.sku ? <span>SKU: {product.sku}</span> : null}
            </div>

            {product.reviewCount > 0 ? (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <StarRating rating={product.rating} />
                <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
                <span className="text-slate-500">({product.reviewCount})</span>
              </div>
            ) : null}

            {product.brand ? <p className="mt-3 text-sm text-slate-600">by {product.brand}</p> : null}
            {product.store ? <p className="mt-1 text-xs text-slate-500">Store: {product.store}</p> : null}

            {product.description ? (
              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-900">About this product</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {descriptionText}{" "}
                  {descriptionIsLong ? (
                    <button
                      type="button"
                      onClick={() => setDescriptionExpanded((v) => !v)}
                      className="font-semibold text-sky-700 hover:underline"
                    >
                      {descriptionExpanded ? "See less" : "See more"}
                    </button>
                  ) : null}
                </p>
              </div>
            ) : null}

            {product.variantGroups.map((group) => {
              const selectedOption = group.options.find((option) => option.selected);
              return (
                <div key={group.attribute} className="mt-6">
                  <p className="text-sm font-semibold text-slate-900">
                    {group.label}
                    {selectedOption ? <span className="font-normal text-slate-500">: {selectedOption.value}</span> : null}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.options.map((option) => (
                      <Link
                        key={option.value}
                        href={`/product/${option.slug}`}
                        title={option.value}
                        className={`flex items-center gap-2 overflow-hidden rounded-lg border bg-white px-2 py-1.5 text-sm font-medium ${
                          option.selected
                            ? "border-sky-600 bg-sky-50 text-sky-800 ring-1 ring-sky-600"
                            : "border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {option.imageUrl ? (
                          <img src={option.imageUrl} alt={option.value} className="h-8 w-8 rounded object-cover" />
                        ) : null}
                        {option.value}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Price / availability sidebar */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-end gap-2">
                {product.price > 0 ? (
                  <>
                    <p className="text-3xl font-bold tracking-tight text-slate-950">{formatCurrency(product.price, currency)}</p>
                    {hasSavings ? (
                      <p className="pb-1 text-sm text-slate-400 line-through">{formatCurrency(product.compareAtPrice as number, currency)}</p>
                    ) : null}
                  </>
                ) : (
                  <p className="text-sm font-medium text-slate-500">Price currently unavailable</p>
                )}
              </div>
              {hasSavings ? <p className="mt-1 text-sm font-semibold text-red-600">Save {formatCurrency(savings, currency)}</p> : null}

              {product.monthlyPrice ? (
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{formatCurrency(product.monthlyPrice, currency)}/mo</span>
                  {product.financingNote ? ` — ${product.financingNote}` : ""}
                </p>
              ) : null}

              {product.availability ? (
                <p className="mt-3 text-sm font-medium text-emerald-700">{product.availability}</p>
              ) : null}

              {product.pickupAvailable !== undefined || product.shippingEstimate ? (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {product.pickupAvailable !== undefined ? (
                    <div className="rounded-lg border border-slate-200 p-3 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pickup</p>
                      <p className="mt-1 text-xs text-slate-700">
                        {product.pickupAvailable ? product.pickupNote ?? "Available" : product.pickupNote ?? "Unavailable"}
                      </p>
                    </div>
                  ) : null}
                  {product.shippingEstimate ? (
                    <div className="rounded-lg border border-slate-200 p-3 text-center">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Shipping</p>
                      <p className="mt-1 text-xs text-slate-700">{product.shippingEstimate}</p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {product.freeShipping || product.shipToZip ? (
                <p className="mt-3 text-xs text-slate-500">
                  {product.freeShipping ? "Free shipping" : ""}
                  {product.freeShipping && product.shipToZip ? " · " : ""}
                  {product.shipToZip ? `Ship to ${product.shipToZip}` : ""}
                </p>
              ) : null}

              <div className="mt-5 flex items-center gap-2">
                  {product.affiliateLink ? (
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="sponsored nofollow noopener noreferrer"
                      className="flex-1 rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      Buy now
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex-1 cursor-not-allowed rounded-full bg-slate-300 px-5 py-3 text-sm font-semibold text-white"
                    >
                      Buy now
                    </button>
                  )}
                <button
                  type="button"
                  onClick={() => setWishlisted((v) => !v)}
                  aria-pressed={wishlisted}
                  aria-label="Save to wishlist"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border ${
                    wishlisted ? "border-red-400 text-red-500" : "border-slate-200 text-slate-500"
                  }`}
                >
                  {wishlisted ? "♥" : "♡"}
                </button>
              </div>

              {product.seller ? (
                <div className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-600">
                  <p>
                    Sold &amp; shipped by <span className="font-semibold text-slate-900">{product.seller}</span>
                  </p>
                  {product.sellerRating ? (
                    <p className="mt-1 text-slate-500">
                      {product.sellerRating.toFixed(2)} ★{product.sellerReviewCount ? ` (${product.sellerReviewCount})` : ""}
                    </p>
                  ) : null}
                  {product.returnPolicyUrl ? (
                    <a href={product.returnPolicyUrl} className="mt-2 inline-block font-semibold text-sky-700 hover:underline">
                      Return &amp; Exchange Policy
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {product.highlights.length > 0 ? (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Highlights</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {product.highlights.map((highlight) => (
                <div key={highlight.label} className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs text-slate-500">{highlight.label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{highlight.value}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {product.variations.length > 0 ? (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Variations</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {product.variations.map((variation) => (
                <li key={variation} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
                  {variation}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Features</h2>
            {product.features.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-600">No feature list is available for this product in Supabase.</p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">Specifications</h2>
            {product.specs.length > 0 ? (
              <dl className="mt-4 space-y-3">
                {product.specs.map((spec) => (
                  <div key={`${product.id}-${spec.label}`} className="flex items-center justify-between gap-4 border-b border-slate-200 pb-2 text-sm">
                    <dt className="font-medium text-slate-500">{spec.label}</dt>
                    <dd className="text-right font-semibold text-slate-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 text-sm text-slate-600">No specification fields are available for this product in Supabase.</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
