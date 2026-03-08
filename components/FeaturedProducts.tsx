"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

// 1. 数据里我偷偷帮你加上了 price，电商少不了这个细节
const products = [
  {
    id: 1,
    name: "Oversized Wool Coat",
    price: "$1,250",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    badge: "New",
  },
  {
    id: 2,
    name: "Structured Blazer",
    price: "$890",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    price: "$650",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop", // 帮你换了一张不重复的裤子图
    badge: "Best Seller",
  },
];

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cardsRef.current?.children ?? [], {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
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
      id="collection"
      // 深色背景区块，增加网站的节奏感
      className="bg-zinc-950 p-16" 
    >
      <h2
        ref={titleRef}
        className="mb-16 text-center text-3xl font-light uppercase tracking-widest text-zinc-50"
      >
        Featured Pieces
      </h2>

      <div
        ref={cardsRef}
        className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          // 2. 抛弃 Card，直接用极简的 div/Link 包装
          <div key={product.id} className="group relative flex flex-col">
            
            {/* 图片容器 - 无边框，干脆利落 */}
            <div className="relative aspect-3/4 overflow-hidden bg-zinc-900">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                // 3. 加入招牌的高级黑白灰滤镜与悬停动效
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              
              {/* 悬停时的暗色遮罩 */}
              <div className="absolute inset-0 bg-zinc-950/0 transition-colors duration-500 group-hover:bg-zinc-950/20" />

              {/* 4. 徽章优化：黑底白字，对比度拉满，去掉圆角 */}
              {product.badge && (
                <Badge
                  className="absolute left-4 top-4 rounded-none bg-zinc-50 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-950 hover:bg-zinc-200"
                >
                  {product.badge}
                </Badge>
              )}

              {/* 5. 悬停按钮魔法：默认隐藏，鼠标放上去时从底部丝滑浮现 */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <Button
                  asChild
                  className="w-full rounded-none bg-zinc-50 text-zinc-950 hover:bg-zinc-200 uppercase tracking-widest text-xs py-6"
                >
                  <Link href="#">View Details</Link>
                </Button>
              </div>
            </div>

            {/* 文字信息：紧贴图片下方，不要边框，不要背景 */}
            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-100">
                {product.name}
              </h3>
              <span className="text-sm font-light text-zinc-400">
                {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}