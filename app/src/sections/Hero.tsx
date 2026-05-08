import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const heroImages = [
  { src: "/images/hero-1.jpg", alt: "Ankara midi dress" },
  { src: "/images/hero-2.jpg", alt: "Two-piece coord set" },
  { src: "/images/hero-3.jpg", alt: "Ankara jumpsuit" },
  { src: "/images/hero-4.jpg", alt: "Men's striped trousers" },
];

export default function Hero() {
  return (
    <section className="pt-6 sm:pt-10 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100"
            style={{
              animationDelay: `${i * 100}ms`,
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-[1.1] tracking-tight">
            Wear the Culture.
            <br />
            Own the Moment.
          </h1>
          <p className="mt-4 text-gray-500 text-sm sm:text-base max-w-md">
            Modern African fashion for men and women who dress with pride.
          </p>
          <div className="mt-6">
            <Link to="/shop">
              <Button className="bg-[#e85d04] hover:bg-[#d15104] text-white rounded-full px-7 h-11 text-sm font-medium">
                Explore categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 sm:text-right">
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <Star className="w-4 h-4 fill-gray-200 text-gray-200" />
            </div>
            <div className="mt-1.5 text-sm font-medium text-gray-900">
              4.0 / 5 Average Rating
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Based on 1,200+ verified customers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
