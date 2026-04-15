import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { useNavigate } from "react-router-dom";

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`product/${product.id}`)}
      className=" cursor-pointer group border relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
          {/* Price */}
          <Badge className="w-fit mb-2 bg-background/90 text-foreground font-semibold backdrop-blur">
            ${product.price.toFixed(2)}
          </Badge>

          {/* Title */}
          <CardTitle className="text-white text-base font-semibold leading-tight line-clamp-2">
            {product.title}
          </CardTitle>
        </div>
      </div>
    </div>
  );
}
