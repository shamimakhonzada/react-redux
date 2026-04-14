"use client";
import { useGetProductByIdQuery } from "@/services/product";
import { useParams } from "react-router-dom";
import {
  Package,
  Truck,
  Tag,
  BadgeDollarSign,
  Heart,
  ShoppingCart,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useState, useRef } from "react";
import { Rating } from "@mui/material";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { addToCart } from "@/features/cart/cartSlice";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { ProductDetailSkeleton } from "./product/product-detail-skeleton";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState("");
  const [zoom, setZoom] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(id || "");

  const cartItems = useSelector((s: RootState) => s.cart.items);
  const wishlistItems = useSelector((s: RootState) => s.wishlist.items);

  const isInCart = product ? cartItems.some((i) => i.id === product.id) : false;
  const isWishlisted = product
    ? wishlistItems.some((i) => i.id === product.id)
    : false;

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError) {
    return (
      <div className="container mx-auto p-6 text-destructive">
        Error fetching product details
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto p-6">Product not found</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-7xl mx-auto bg-card text-card-foreground p-6 grid md:grid-cols-2 gap-8 rounded-2xl shadow">
        {/* Image Section */}
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  {/* Zoom container */}
                  <div
                    ref={imgRef}
                    className="relative overflow-hidden rounded-lg bg-muted cursor-zoom-in"
                    onClick={() => setZoom(true)}
                    onDoubleClick={() => setZoom(false)}
                  >
                    <img
                      src={selectedImage || img}
                      alt={product.title}
                      className={cn(
                        "w-full object-cover rounded-lg transition-transform duration-200",
                        zoom ? "scale-150" : "scale-100",
                      )}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2" />
            <CarouselNext className="absolute top-1/2 right-2" />
          </Carousel>

          <div className="flex gap-3 mt-4 flex-wrap">
            {product.images.map((img, i) => (
              <img
                onClick={() => setSelectedImage(img)}
                key={i}
                src={img}
                alt=""
                className={cn(
                  "w-20 h-20 object-cover cursor-pointer rounded-lg border-2 transition-all",
                  selectedImage === img
                    ? "border-cyan-500 scale-105"
                    : "border-border hover:border-cyan-400",
                )}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-muted-foreground">{product.description}</p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <BadgeDollarSign className="text-cyan-600" />
            <span className="text-2xl font-semibold text-cyan-600">
              ${product.price}
            </span>
            <span className="text-sm text-green-600">
              {product.discountPercentage}% OFF
            </span>
          </div>

          {/* Rating */}
          <Rating
            name="product-rating"
            readOnly
            defaultValue={product.rating}
            precision={0.5}
            size="small"
          />

          {/* Stock */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package size={18} />
            <span>
              Stock:{" "}
              <span
                className={product.stock < 10 ? "text-red-500 font-medium" : ""}
              >
                {product.stock}
              </span>
            </span>
          </div>

          {/* Brand & Category */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              Brand: <b className="text-foreground">{product.brand}</b>
            </span>
            <span>
              Category: <b className="text-foreground">{product.category}</b>
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {product.tags?.map((tag, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground"
              >
                <Tag size={14} />
                {tag}
              </span>
            ))}
          </div>

          {/* Shipping */}
          <div className="flex items-center gap-2 bg-muted p-3 rounded-lg text-sm text-muted-foreground">
            <Truck size={18} />
            {product.shippingInformation}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <Button
              className="flex-1 gap-2"
              onClick={() => dispatch(addToCart(product))}
              variant={isInCart ? "secondary" : "default"}
            >
              <ShoppingCart size={18} />
              {isInCart ? "Added to Cart" : "Add to Cart"}
            </Button>

            <Button
              variant="outline"
              size="icon"
              aria-label="Toggle wishlist"
              onClick={() => dispatch(toggleWishlist(product))}
              className={cn(
                "border-2 transition-colors",
                isWishlisted
                  ? "border-rose-500 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                  : "border-border",
              )}
            >
              <Heart
                size={18}
                className={cn(isWishlisted && "fill-rose-500 text-rose-500")}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto mt-8 bg-card text-card-foreground rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {product.reviews?.map((review, i) => (
            <div
              key={i}
              className="border-b border-border pb-3 last:border-none"
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{review.reviewerName}</h4>
                <Rating
                  name={`review-rating-${i}`}
                  readOnly
                  defaultValue={review.rating}
                  precision={0.5}
                  size="small"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {review.comment}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
