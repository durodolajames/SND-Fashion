import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "@/components/ProductCard";
import { trpc } from "@/providers/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";
  const [activeFilter, setActiveFilter] = useState(categorySlug);

  const { data: categories = [] } = trpc.category.list.useQuery();
  const { data: products = [], isLoading } = trpc.product.list.useQuery(
    {
      categoryId: undefined,
      search: searchQuery || undefined,
    },
    { enabled: !categorySlug }
  );
  const { data: categoryData } = trpc.product.getByCategory.useQuery(
    { categorySlug: activeFilter },
    { enabled: !!activeFilter }
  );

  useEffect(() => {
    setActiveFilter(categorySlug);
  }, [categorySlug]);

  const displayProducts = activeFilter
    ? categoryData?.products || []
    : products;

  const pageTitle = activeFilter
    ? categories.find((c) => c.slug === activeFilter)?.name || "Shop"
    : searchQuery
    ? `Search: "${searchQuery}"`
    : "All Products";

  return (
    <main className="min-h-screen pt-8 sm:pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {displayProducts.length}{" "}
            {displayProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("")}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
              !activeFilter
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.slug)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                activeFilter === cat.slug
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[3/4] rounded-xl" />
                <Skeleton className="h-4 w-3/4 mt-3" />
                <Skeleton className="h-3 w-1/2 mt-2" />
              </div>
            ))}
          </div>
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No products found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
