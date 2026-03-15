"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    name: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    gridClass: "md:col-span-1 md:row-span-3",
  },
  {
    id: 3,
    name: "Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    id: 4,
    name: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    gridClass: "md:col-span-1 md:row-span-3",
  },
];

export default function WomenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner 动画保持不变
      gsap.from(bannerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Grid 内容瀑布流出场动画
      gsap.from(contentRef.current?.children ?? [], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
    >
      {/* ================= 首屏 Banner (无需修改，保留你的原版设计) ================= */}
      <div ref={bannerRef} className="relative h-[50vh] min-h-[320px] lg:h-[55vh]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"
          alt="Women's collection"
          fill
          sizes="100vw"
          className="object-cover object-center" // 建议加上 grayscale 更契合你全站的高级黑白风
        />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/60 via-zinc-950/20 to-transparent" />
        <div className="absolute inset-0 flex items-center p-6 lg:p-16">
          <div>
            <span className="mb-3 block font-light uppercase tracking-[0.4em] text-zinc-300">
              Spring/Summer 2026
            </span>
            <h2 className="text-5xl font-light tracking-tight text-zinc-50 lg:text-7xl xl:text-8xl">
              WOMEN&apos;S
            </h2>
            <p className="mt-6 max-w-md text-zinc-200">
              Fluid lines. Effortless elegance. Curated for the discerning woman.
            </p>
            <Button
              asChild
              className="mt-8 rounded-none border border-zinc-50 bg-zinc-50 px-8 py-6 font-light uppercase tracking-widest text-zinc-950 transition-colors duration-500 lg:bg-transparent lg:text-zinc-50 lg:hover:bg-zinc-50 lg:hover:text-zinc-950"
            >
              <Link href="/category/dresses" className="flex items-center gap-2">
                Explore Collection
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile: 2x2 简单网格 | Web: 原版魔法网格 (dense layout) */}
      <div className="mx-auto px-6 py-6 lg:px-16 lg:py-8">
        <div
          ref={contentRef}
          className="grid grid-cols-2 gap-4 md:grid-flow-dense md:grid-cols-4 md:auto-rows-[220px] md:gap-6 lg:auto-rows-[280px]"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.name.toLowerCase()}`}
              className={`group flex flex-col overflow-hidden ${category.gridClass}`}
            >
              <div className="relative aspect-4/5 overflow-hidden bg-zinc-100 md:aspect-auto md:flex-1">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out scale-105 group-hover:scale-105 lg:scale-100"
                />
                <div className="absolute inset-0 bg-zinc-950/20 transition-colors duration-500 ease-out lg:bg-zinc-950/0 lg:group-hover:bg-zinc-950/20" />
              </div>
              <div className="mt-3 shrink-0 flex items-center justify-between border-b border-zinc-950 py-2 transition-colors duration-500 lg:border-zinc-200 lg:group-hover:border-zinc-950">
                <span className="text-sm font-medium uppercase tracking-widest text-zinc-950">
                  {category.name}
                </span>
                <ArrowRight className="size-4 translate-x-0 opacity-100 transition-all duration-300 ease-out lg:-translate-x-4 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}