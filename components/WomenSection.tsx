"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

// 1. 核心优化：直接在数据里定义好它们各自占据的“网格跨度 (Span)”
const categories = [
  {
    id: 1,
    name: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    // 图1 (左上): 占据 2列宽，2行高 (大正方形)
    gridClass: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    name: "Knitwear",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    // 图2 (中间偏右): 占据 1列宽，3行高 (竖长方形)
    gridClass: "md:col-span-1 md:row-span-3",
  },
  {
    id: 3,
    name: "Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    // 图3 (左下): 占据 2列宽，1行高 (横长方形)
    gridClass: "md:col-span-2 md:row-span-1",
  },
  {
    id: 4,
    name: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    // 图4 (最右侧): 占据 1列宽，3行高 (竖长方形)
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
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/60 via-zinc-950/20 to-transparent" />
        <div className="absolute inset-0 flex items-center p-8 lg:p-16">
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
              className="mt-8 rounded-none border border-zinc-50 bg-transparent px-8 py-6 font-light uppercase tracking-widest text-zinc-50 transition-colors duration-500 hover:bg-zinc-50 hover:text-zinc-950"
            >
              <Link href="#" className="flex items-center gap-2">
                Explore Collection
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ================= 魔法网格部分 ================= */}
      <div className="mx-auto p-16">
        <div
          ref={contentRef}
          /* 关键魔法：
             1. grid-flow-dense：告诉浏览器“自动填补空缺的格子”，极其关键！
             2. md:grid-cols-4：分成 4 列
             3. md:auto-rows-[250px]：控制每一行的基础高度
          */
          className="grid grid-cols-1 gap-6 md:grid-flow-dense md:grid-cols-4 md:auto-rows-[220px] lg:auto-rows-[280px]"
        >
          {/* 一个 map() 循环搞定所有布局，抛弃以前冗长的 filter 代码 */}
          {categories.map((category) => (
            <Link
              key={category.id}
              href="#"
              // 注入我们在数据中定义好的 gridClass
              className={`group flex flex-col ${category.gridClass}`}
            >
              {/* 图片容器 - 使用 flex-1 撑满剩余空间 */}
              <div className="relative flex-1 overflow-hidden bg-zinc-200">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* 悬停时的黑灰色遮罩，提升高级感 */}
                <div className="absolute inset-0 bg-zinc-950/0 transition-colors duration-500 group-hover:bg-zinc-950/20" />
              </div>

              {/* 文字标签 - 依然保留你在图片下方显示的设计，但现在会完美贴合网格 */}
              {/* 🌟 修改后的文字标签：增加了底部边框和悬停加深效果 */}
              <div className="mt-3 shrink-0 flex items-center justify-between border-b border-zinc-200 py-2 transition-colors duration-500 group-hover:border-zinc-950">
                <span className="text-sm font-medium uppercase tracking-widest text-zinc-950">
                  {category.name}
                </span>
                <ArrowRight className="size-4 -translate-x-4 text-zinc-950 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}