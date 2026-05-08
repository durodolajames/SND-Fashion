import Hero from "@/sections/Hero";
import FeaturedProducts from "@/sections/FeaturedProducts";
import Categories from "@/sections/Categories";
import ValueProps from "@/sections/ValueProps";
import Lookbook from "@/sections/Lookbook";
import FAQ from "@/sections/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <ValueProps />
      <Lookbook />
      <FAQ />
    </main>
  );
}
