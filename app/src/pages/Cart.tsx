import { Link } from "react-router";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

export default function Cart() {
  const { items, total, isLoading, removeFromCart, updateQuantity, clearCart } = useCart();

  if (isLoading) {
    return (
      <main className="min-h-screen pt-8 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-7 h-7 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Link to="/shop">
            <Button className="bg-[#e85d04] hover:bg-[#d15104] text-white rounded-full px-6">
              Start shopping
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
            <p className="text-sm text-gray-500 mt-1">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
            }}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Clear
          </Button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => {
            const product = item.product;
            if (!product) return null;
            const price = parseFloat(product.price);
            const images = product.images as string[];
            const imageUrl = images[0] || "/images/products/adunni-dress.jpg";

            return (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white border rounded-xl"
              >
                <Link to={`/product/${product.slug}`} className="shrink-0">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 hover:text-[#e85d04] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {product.shortDescription}
                      </p>
                      {item.size && (
                        <p className="text-xs text-gray-400 mt-1">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2.5 py-1.5 text-gray-500 hover:text-black"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 py-1.5 text-sm font-medium min-w-[32px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2.5 py-1.5 text-gray-500 hover:text-black"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      ₦{(price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-8 p-6 bg-[#faf9f7] rounded-xl">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-semibold text-gray-900">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>
          <Button className="w-full mt-6 bg-[#e85d04] hover:bg-[#d15104] text-white rounded-full h-12 text-sm font-medium">
            Proceed to checkout
          </Button>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mt-4 justify-center w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
