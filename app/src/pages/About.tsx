import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Scissors, Eye, Truck, Heart, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Rooted in Heritage",
    description:
      "Every piece we create honors the rich textile traditions of West Africa, passed down through generations of artisans.",
  },
  {
    icon: Globe,
    title: "Designed for Today",
    description:
      "We blend time-honored techniques with contemporary silhouettes, creating fashion that feels both familiar and fresh.",
  },
  {
    icon: Sparkles,
    title: "Quality First",
    description:
      "From fabric selection to final stitch, we maintain the highest standards of craftsmanship in every garment.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight leading-[1.15]">
            Modern African Fashion,
            <br />
            Crafted with Pride.
          </h1>
          <p className="mt-6 text-gray-500 leading-relaxed max-w-xl mx-auto">
            House of Aso was born from a simple belief: African fashion deserves
            a global stage. We create pieces that honor tradition while embracing
            modern style — garments that make you feel connected to something
            bigger every time you wear them.
          </p>
        </div>

        {/* Story Image */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src="/images/lookbook-1.jpg"
              alt="Traditional couple"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 sm:mt-8">
            <img
              src="/images/lookbook-2.jpg"
              alt="Fashion editorial"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src="/images/lookbook-3.jpg"
              alt="Wedding attire"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-[#faf9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm italic text-gray-500 mb-2">Our Values</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
              What We Stand For
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white shadow-sm mb-5">
                  <v.icon className="w-6 h-6 text-[#e85d04]" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Sparkles, title: "Authentic Prints", desc: "Carefully sourced Ankara fabrics." },
            { icon: Scissors, title: "Tailored Finish", desc: "Clean cuts. Structured fits." },
            { icon: Eye, title: "Made to Stand Out", desc: "Designed to turn heads." },
            { icon: Truck, title: "Fast Delivery", desc: "Across Nigeria and beyond." },
          ].map((f) => (
            <div key={f.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#faf9f7] mb-4">
                <f.icon className="w-5 h-5 text-gray-700" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{f.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-[#faf9f7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Ready to Wear the Culture?
          </h2>
          <p className="mt-4 text-gray-500 mb-8">
            Explore our collection of modern African fashion for men and women.
          </p>
          <Link to="/shop">
            <Button className="bg-[#e85d04] hover:bg-[#d15104] text-white rounded-full px-8 h-12 text-sm font-medium">
              Shop the collection
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
