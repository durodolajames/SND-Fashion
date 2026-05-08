import { Sparkles, Scissors, Eye, Truck } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Authentic Prints",
    description: "Carefully sourced Ankara fabrics.",
  },
  {
    icon: Scissors,
    title: "Tailored Finish",
    description: "Clean cuts. Structured fits.",
  },
  {
    icon: Eye,
    title: "Made to Stand Out",
    description: "Designed to turn heads.",
  },
  {
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description: "Across Nigeria and beyond.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
          Explore the Pieces
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {values.map((v) => (
          <div key={v.title} className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#faf9f7] mb-4">
              <v.icon className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{v.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{v.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
