"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "6581234567";

const products = [
  {
    id: 1,
    name: "Oversized Wool Coat",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    badge: "New",
  },
  {
    id: 2,
    name: "Structured Blazer",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Wide-Leg Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
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

              {/* 5. 悬停按钮：直接跳转 WhatsApp 咨询 */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <Button
                  asChild
                  className="w-full rounded-none bg-zinc-50 text-zinc-950 hover:bg-zinc-200 uppercase tracking-widest text-xs py-6"
                >
                  <Link
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inquire via WhatsApp
                  </Link>
                </Button>
              </div>
            </div>

            {/* 文字信息：紧贴图片下方，下一行放 WhatsApp icon */}
            <div className="mt-4 flex flex-col gap-2">
              <h3 className="text-sm font-medium uppercase tracking-widest text-zinc-100">
                {product.name}
              </h3>
              <span className="inline-flex w-fit items-center justify-center bg-cyan-500 p-1.5" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}