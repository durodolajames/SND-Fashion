import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const lookbookImages = [
  { src: "/images/lookbook-1.jpg", alt: "Couple in matching green Agbada" },
  { src: "/images/lookbook-2.jpg", alt: "Woman in brown Ankara jumpsuit" },
  { src: "/images/lookbook-3.jpg", alt: "Couple in red wedding attire" },
  { src: "/images/hero-1.jpg", alt: "Woman in geometric Ankara dress" },
];

export default function Lookbook() {
  return (
    <section className="py-12 sm:py-20 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm italic text-gray-500 mb-2">Lookbook</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Style in Motion
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {lookbookImages.map((img, i) => (
            <div
              key={i}
              className={`aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 ${
                i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
          >
            View more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
