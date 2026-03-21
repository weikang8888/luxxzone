"use client";

import HeroSection from "./components/home/HeroSection";
import FeatureProducts from "./components/home/FeatureProducts";
import MenSection from "./components/home/MenSection";
import WomenSection from "./components/home/WomenSection";
import MoreAboutUs from "./components/home/MoreAboutUs";
import WhyChooseUs from "./components/home/WhyChooseUs";
import Feedback from "./components/home/Feedback";

export default function HomePage() {
  return (
    <main className="relative w-full">
      {/* 注意：Header 已经在 Layout.tsx 中全局挂载了，
          所以这里直接从 Hero 开始。
      */}

      {/* 1. 英雄首屏：帷幕开场 + 比例锁定 */}
      <HeroSection />

      {/* 6. 精选单品 (Featured Products) - 黑底沉浸 */}
      <FeatureProducts />

      {/* 3. 男士专题 (Men Section) */}
      <MenSection />

      {/* 5. 女士专题 (Women Section) */}
      <WomenSection />

      {/* 2. 品牌优势 (Why Choose Us) - 建议下一搬运 */}
      <WhyChooseUs />

      {/* 4. 编辑精选 (Editorial Strip) */}
      <Feedback />

      {/* 7. 社区与联系 (More About Us) */}
      <MoreAboutUs />
    </main>
  );
}