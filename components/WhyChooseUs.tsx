"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gem, Leaf, Sparkles, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 数据：保留了精简高级的单字小标题，更容易排版
const pillars = [
  {
    icon: Gem,
    label: "Craftsmanship",
    description:
      "Meticulously crafted by master artisans, ensuring unparalleled quality and absolute attention to detail.",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    alt: "Artisan craftsmanship",
  },
  {
    icon: Sparkles,
    label: "Exclusivity",
    description:
      "Limited-edition silhouettes that define the season. Own something truly unique, made for the discerning few.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
    alt: "Exclusive runway collection",
  },
  {
    icon: Leaf,
    label: "Sustainability",
    description:
      "Responsible sourcing and ethical production. True luxury honors both the wearer and the planet.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    alt: "Sustainable materials",
  },
  {
    icon: Shield,
    label: "Concierge",
    description:
      "Dedicated service from first inquiry to care beyond purchase. Elevating your personal style journey.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    alt: "Personal concierge experience",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cardsRef.current?.children ?? [], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-zinc-200 bg-zinc-50 p-16"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* 标题部分：改回了转化率极高的 Why Choose Us，同时保持了大牌排版 */}
        <span
          ref={labelRef}
          className="mb-4 block text-center font-medium uppercase tracking-[0.4em] text-zinc-500"
        >
          The House Difference
        </span>
        <h2
          ref={titleRef}
          className="mb-20 text-center text-4xl font-bold uppercase tracking-tighter text-zinc-950 md:text-5xl lg:text-6xl"
        >
          WHY CHOOSE US
        </h2>

        {/* 卡片展示区：间距拉开，高级感悬停动效全开 */}
        <div
          ref={cardsRef}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {pillars.map(({ icon: Icon, label, description, image, alt }) => (
            <div
              key={label}
              // 强制高度，打造修长的“巨石阵”画廊感
              className="group relative h-[450px] overflow-hidden bg-zinc-950 md:h-[500px] lg:h-[600px]"
            >
              {/* 图片层：默认黑白，悬停时恢复色彩并缓慢放大 */}
              <div className="absolute inset-0">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
                {/* 渐变遮罩：默认较深以突出底部标题，悬停时变得更深以便于阅读长段描述文字 */}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/20 to-transparent transition-opacity duration-500 group-hover:from-zinc-950/95 group-hover:via-zinc-950/60" />
              </div>

              {/* 内容交互层 */}
              <div className="relative flex h-full flex-col justify-end p-8 text-zinc-50">
                {/* 1. 图标与标题：默认在底部，悬停时被下方的文字“顶”上去 */}
                <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                  <div className="mb-6 inline-flex size-12 items-center justify-center border border-zinc-50/30 transition-colors duration-500 group-hover:border-zinc-50">
                    <Icon className="size-5" strokeWidth={1} />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-50">
                    {label}
                  </h3>
                </div>

                {/* 2. 描述文字：Tailwind Grid 黑科技实现高度的丝滑折叠与展开 */}
                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="mt-4 text-xs leading-relaxed tracking-wide text-zinc-300 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}