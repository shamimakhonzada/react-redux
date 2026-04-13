import ProductGrid from "@/components/product/product-grid";
import { FilterProducts } from "@/components/product/filter-products";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-4 border-b border-border pb-8">
        <h1 className="text-4xl font-bold text-foreground md:text-5xl">
          Product Collections
        </h1>
        <p className="mt-3 text-base font-medium text-muted-foreground md:text-lg">
          Discover our curated selection of premium products
        </p>
      </div>

      <div className="mb-6">
        <FilterProducts />
      </div>

      <ProductGrid />
    </div>
  );
}
