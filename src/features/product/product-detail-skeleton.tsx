import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-card p-6 grid md:grid-cols-2 gap-8 rounded-2xl">
        {/* Image column */}
        <div>
          <Skeleton className="w-full aspect-square rounded-lg" />
          <div className="flex gap-3 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Info column */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-8 w-1/3 rounded" />
          <Skeleton className="h-5 w-32 rounded" />
          <Skeleton className="h-5 w-40 rounded" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto mt-8 bg-card rounded-2xl p-6">
        <Skeleton className="h-6 w-40 mb-4 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-b pb-3 mb-3 last:border-none">
            <div className="flex justify-between mb-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
            <Skeleton className="h-3 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
