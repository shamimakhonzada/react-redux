import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="group border relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="relative overflow-hidden">
            <Skeleton className=" relative aspect-square overflow-hidden bg-muted" />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-300" />

            <div className=" space-y-3 absolute inset-0 flex flex-col justify-end p-4 z-10">
              <Skeleton className="h-5 w-14 rounded-full bg-gray-300/30" />
              <Skeleton className="h-4 w-3/4 bg-gray-300/30" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
