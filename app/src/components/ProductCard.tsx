import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@db/schema";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product & { category?: { name: string; slug: string } | null };
  showQuickAdd?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, isAdding } = useCart();

  const images = product.images as string[];
  const imageUrl = images[0] || "/images/products/adunni-dress.jpg";
  const price = parseFloat(product.price);
  const sizes = (product.sizes as string[]) || [];

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew === "yes" && (
              <span className="bg-black text-white text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wide">
                New
              </span>
            )}
            {product.isFeatured === "yes" && (
              <span className="bg-[#e85d04] text-white text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add */}
      {showQuickAdd && (
        <div
          className={`absolute bottom-[88px] left-3 right-3 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <Button
            onClick={() => addToCart(product.id, 1, sizes[0])}
            disabled={isAdding}
            className="w-full bg-white/95 backdrop-blur-sm text-black hover:bg-white border-0 shadow-lg rounded-full text-sm font-medium h-10"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to cart
          </Button>
        </div>
      )}

      {/* Info */}
      <div className="mt-3 px-0.5">
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#e85d04] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-semibold text-gray-900">
            ₦{price.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-500">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
