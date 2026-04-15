import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetProductsQuery } from "@/services/product";
import { ProductCard } from "./product-card";
import { ProductGridSkeleton } from "./product-grid-skeleton";
import type { Product } from "@/types/product";
import { ErrorCard } from "../../components/error-card";
import { useAppSelector } from "@/app/hooks";

const PAGE_SIZE = 20;

export default function ProductGrid() {
  const [skip, setSkip] = useState(0);
  const { search, sortBy } = useAppSelector((state) => state.product);

  // Reset pagination when filters change
  useEffect(() => {
    setSkip(0);
  }, [search, sortBy]);

  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery(
    {
      limit: PAGE_SIZE,
      skip,
    },
  );

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const hasMore = products.length < total;

  // Apply client-side filter & sort
  const filteredAndSorted = useMemo(() => {
    let result: Product[] = [...products];

    // Filter by title (case-insensitive)
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(query));
    }

    // Sort
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, search, sortBy]);

  // Infinite scroll: observe a sentinel element at the bottom
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setSkip(products.length);
    }
  }, [isFetching, hasMore, products.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Initial full-page skeleton
  if (isLoading) {
    return <ProductGridSkeleton count={PAGE_SIZE} />;
  }

  if (isError) {
    return (
      <ErrorCard
        title="Something went wrong"
        message="We couldn't load the products. Check your connection and try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (filteredAndSorted.length === 0 && !isFetching) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No products match your filters.
      </p>
    );
  }

  return (
    <div>
      {/* Product cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAndSorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Bottom loading skeleton while fetching next page */}
      {isFetching && !isLoading && (
        <div className="mt-4">
          <ProductGridSkeleton count={4} />
        </div>
      )}

      {/* Sentinel element for IntersectionObserver */}
      {hasMore && <div ref={sentinelRef} className="h-1" />}

      {/* End of list indicator */}
      {!hasMore && products.length > 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          You've reached the end — {products.length} products loaded
        </p>
      )}
    </div>
  );
}
