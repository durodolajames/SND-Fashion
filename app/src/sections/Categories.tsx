import { Link } from "react-router";

const categoryImages: Record<string, string> = {
  dresses: "/images/category-dresses.jpg",
  "two-piece-sets": "/images/category-twopiece.jpg",
  "agbada-kaftan": "/images/category-agbada.jpg",
  "shirts-jackets": "/images/category-shirts.jpg",
};

export default function Categories() {
  const categories = [
    { name: "Dresses", slug: "dresses", description: "Elegant dresses" },
    { name: "Two-Piece Sets", slug: "two-piece-sets", description: "Coordinated sets" },
    { name: "Agbada & Kaftan", slug: "agbada-kaftan", description: "Traditional wear" },
    { name: "Shirts & Jackets", slug: "shirts-jackets", description: "Modern menswear" },
  ];

  return (
    <section className="py-12 sm:py-20 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm italic text-gray-500 mb-2">Featured Categories</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Find Your Expression
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100"
            >
              <img
                src={categoryImages[cat.slug] || "/images/category-dresses.jpg"}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-center shadow-sm">
                  <span className="text-sm font-medium text-gray-900">{cat.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
