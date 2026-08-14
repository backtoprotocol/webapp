// Shared shimmering skeleton primitives + full-page skeletons used by route-level loading.tsx files.

export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-md ${className}`} />;
}

export function GenericPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#eef1f6] pb-16">
      <div className="mx-auto max-w-[1100px] px-4 pt-10 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-4 h-10 w-2/3" />
        <Skeleton className="mt-3 h-5 w-1/2" />

        <div className="mt-10 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="mt-3 h-4 w-3/4" />
              <Skeleton className="mt-2 h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="w-[190px] shrink-0">
      <Skeleton className="h-[190px] w-full rounded-2xl" />
      <Skeleton className="mt-3 h-7 w-20 rounded-full" />
      <Skeleton className="mt-2 h-5 w-24" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-1 h-4 w-2/3" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <main className="bg-[#eef1f6] pb-16">
      <section className="mx-auto max-w-[1480px] px-4 pt-6 sm:px-6 lg:px-8">
        <Skeleton className="h-[220px] w-full rounded-[24px] sm:h-[260px]" />

        <div className="mt-10">
          <Skeleton className="mb-5 h-7 w-56" />
          <div className="flex gap-4 overflow-x-hidden pb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.3fr_0.85fr_0.85fr]">
          <Skeleton className="h-56 w-full rounded-[20px]" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-[104px] w-full rounded-[20px]" />
            <Skeleton className="h-[104px] w-full rounded-[20px]" />
          </div>
          <Skeleton className="h-56 w-full rounded-[20px]" />
        </div>

        <div className="mt-10 rounded-[18px] bg-[#f0f0f0] p-4 sm:p-5">
          <Skeleton className="mb-5 h-7 w-48" />
          <div className="flex gap-4 overflow-x-hidden pb-2 sm:grid sm:grid-cols-3 lg:grid-cols-8">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex w-[110px] shrink-0 flex-col items-center sm:w-auto">
                <Skeleton className="h-[110px] w-[110px] rounded-2xl sm:h-[130px] sm:w-[130px]" />
                <Skeleton className="mt-3 h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function SearchPageSkeleton() {
  return (
    <main className="min-h-screen bg-[#f3f4f6]">
      <div className="mx-auto max-w-[1500px] px-4 py-4">
        <div className="flex gap-4">
          <aside className="hidden w-[310px] shrink-0 border-r border-slate-200 bg-white px-4 py-4 md:block">
            <Skeleton className="h-5 w-20" />
            <div className="mt-6 space-y-4 border-b border-slate-200 pb-5">
              <Skeleton className="h-4 w-16" />
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-4 w-32" />
              ))}
            </div>
            <div className="mt-5 space-y-4 border-b border-slate-200 pb-5">
              <Skeleton className="h-4 w-16" />
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-4 w-28" />
              ))}
            </div>
          </aside>

          <div className="min-w-0 flex-1 py-2">
            <Skeleton className="h-6 w-72" />
            <div className="mt-3 flex gap-2">
              {Array.from({ length: 5 }, (_, i) => (
                <Skeleton key={i} className="h-8 w-20 rounded-full" />
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="rounded-lg border border-slate-200 bg-white p-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                  <Skeleton className="mt-3 h-5 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-64" />

        <div className="mt-6 grid gap-8 lg:grid-cols-[440px_minmax(0,1fr)_320px]">
          <div>
            <Skeleton className="h-[420px] w-full rounded-2xl" />
            <div className="mt-3 flex gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-16 w-16 rounded-lg" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-8 w-full" />
            <Skeleton className="mt-2 h-8 w-3/4" />
            <Skeleton className="mt-4 h-5 w-40" />
            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <Skeleton className="mt-8 h-6 w-32" />
            <div className="mt-3 flex gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-16 w-16 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="mt-2 h-4 w-24" />
            <Skeleton className="mt-6 h-12 w-full rounded-full" />
            <Skeleton className="mt-3 h-12 w-full rounded-full" />
            <Skeleton className="mt-6 h-20 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
