import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, ShoppingCart, ArrowLeft, Minus, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/providers/trpc";
import { useCart } from "@/hooks/useCart";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = trpc.product.getBySlug.useQuery(
    { slug: slug || "" },
    { enabled: !!slug }
  );
  const { data: relatedProducts = [] } = trpc.product.list.useQuery(
    { categoryId: product?.categoryId },
    { enabled: !!product?.categoryId }
  );
  const { addToCart, isAdding } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <Skeleton className="aspect-[3/4] rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Product not found</p>
          <Link to="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </main>
    );
  }

  const images = product.images as string[];
  const imageUrl = images[0] || "/images/products/adunni-dress.jpg";
  const price = parseFloat(product.price);
  const sizes = (product.sizes as string[]) || [];
  const tags = (product.tags as string[]) || [];

  const handleAddToCart = () => {
    const size = selectedSize || sizes[0];
    addToCart(product.id, quantity, size);
    toast.success(`${product.name} added to cart`);
  };

  const filteredRelated = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen pt-6 sm:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                {product.category?.name}
              </p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                {product.shortDescription}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(parseFloat(product.rating))
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6">
                <span className="text-2xl font-semibold text-gray-900">
                  ₦{price.toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              {sizes.length > 0 && sizes[0] !== "One Size" && (
                <div className="mt-6">
                  <p className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-3">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-gray-100 rounded-full text-[11px] text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              {/* Quantity */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-500 hover:text-black"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 py-2 text-sm font-medium min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-500 hover:text-black"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-[#e85d04] hover:bg-[#d15104] text-white rounded-full h-12 text-sm font-medium"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {isAdding ? "Adding..." : "Add to cart"}
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full h-12 text-sm font-medium"
              >
                <Heart className="w-4 h-4 mr-2" />
                Add to wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelated.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-semibold text-gray-900 mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {filteredRelated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
