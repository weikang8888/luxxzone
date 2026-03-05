import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import EditorialStrip from "@/components/EditorialStrip";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <EditorialStrip />
        <NewsletterSection />
      </main>
      <footer className="border-t border-zinc-200 bg-zinc-950 px-8 py-8 lg:px-16">
        <p className="text-center text-sm font-light uppercase tracking-widest text-zinc-500">
          © 2026 Luxxzone. All rights reserved.
        </p>
      </footer>
    </>
  );
}
