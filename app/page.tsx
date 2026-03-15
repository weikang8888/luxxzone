import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import MenSection from "@/components/MenSection";
import WomenSection from "@/components/WomenSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import EditorialStrip from "@/components/EditorialStrip";
import Feedback from "@/components/Feedback";
import MoreAboutUs from "@/components/MoreAboutUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturedProducts />
        <MenSection />
        <WomenSection />
        <EditorialStrip />
        <WhyChooseUs />
        <Feedback />
        <MoreAboutUs />
      </main>
      <Footer />
    </>
  );
}
