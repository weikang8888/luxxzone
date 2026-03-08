import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import MenSection from "@/components/MenSection";
import WomenSection from "@/components/WomenSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import EditorialStrip from "@/components/EditorialStrip";
import Testimonials from "@/components/Testimonials";
import MoreAboutUs from "@/components/MoreAboutUs";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <MenSection />
        <WomenSection />
        <EditorialStrip />
        <WhyChooseUs />
        <Testimonials />
        <MoreAboutUs />
      </main>
      <footer className="border-t border-zinc-200 bg-zinc-950 px-8 py-8 lg:px-16">
        <p className="text-center text-sm font-light uppercase tracking-widest text-zinc-500">
          © 2026 Luxxzone. All rights reserved.
        </p>
      </footer>
    </>
  );
}
