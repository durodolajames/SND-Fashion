import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { trpc } from "@/providers/trpc";

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = trpc.product.getFeatured.useQuery();

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-xl" />
              <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
              <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Link to="/shop">
              <Button className="bg-[#e85d04] hover:bg-[#d15104] text-white rounded-full px-7 h-11 text-sm font-medium">
                View all wears
              </Button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
