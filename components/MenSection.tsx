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
    name: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Tops",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Trousers",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
  },
];

export default function MenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(gridRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
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
      <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-5">
        {/* Left - Hero image (40%) */}
        <div
          ref={imageRef}
          className="relative order-2 lg:order-1 lg:col-span-2 min-h-[400px] lg:min-h-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop"
            alt="Men's collection"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-zinc-950/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
            <span className="mb-2 font-mono text-xs tracking-[0.4em] text-zinc-300">
              01
            </span>
            <h2 className="text-5xl font-bold tracking-tighter text-zinc-50 lg:text-6xl xl:text-7xl">
              MEN&apos;S
            </h2>
            <p className="mt-4 max-w-sm text-sm text-zinc-200">
              Refined silhouettes. Timeless essentials for the modern man.
            </p>
            <Button
              asChild
              variant="ghost"
              className="mt-6 w-fit gap-2 rounded-none px-0 text-zinc-100 hover:bg-transparent hover:text-zinc-50"
            >
              <Link href="#">
                Shop Men&apos;s
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right - Category grid (60%) */}
        <div className="order-1 flex flex-col justify-center p-8 lg:order-2 lg:col-span-3 lg:px-16 lg:py-16">
          <span
            ref={titleRef}
            className="mb-8 block font-light uppercase tracking-[0.3em] text-zinc-500"
          >
            Shop by Category
          </span>
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-4 lg:gap-6"
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href="#"
                // 确保这里有 group class，这样子元素才能响应悬停
                className="group block overflow-hidden"
              >
                {/* 图片容器 */}
                <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    // 如果你想保持全站黑白风，可以在下面加上 grayscale 滤镜： grayscale group-hover:grayscale-0
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* 🌟 核心修改：新增的暗色遮罩层 
                      默认完全透明 (bg-zinc-950/0)，悬停时变成 20% 不透明度的纯黑 (group-hover:bg-zinc-950/20)
                  */}
                  <div className="absolute inset-0 bg-zinc-950/0 transition-colors duration-500 ease-out group-hover:bg-zinc-950/20" />
                </div>

                {/* 文字区域优化：下划线在悬停时变深，增加点击欲 */}
                <div className="mt-3 flex items-center justify-between border-b border-zinc-200 py-2 transition-colors duration-500 group-hover:border-zinc-950">
                  <span className="text-sm font-medium uppercase tracking-widest text-zinc-950">
                    {category.name}
                  </span>
                  {/* 可选：加一个隐形的小箭头，悬停时出现，和 Women Section 呼应 */}
                  <ArrowRight className="size-4 -translate-x-4 text-zinc-950 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
