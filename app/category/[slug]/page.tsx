"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 🌟 模拟全站数据库 (无价格版)
const allProducts = [
  // Dresses
  {
    id: 1,
    name: "Asymmetric Silk Dress",
    category: "dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Pleated Midi Dress",
    category: "dresses",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Cut-out Maxi Dress",
    category: "dresses",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 12,
    name: "Flowing Linen Dress",
    category: "dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 13,
    name: "Wrap Midi Dress",
    category: "dresses",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 14,
    name: "Statement Evening Gown",
    category: "dresses",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  },
  // Outerwear
  {
    id: 4,
    name: "Oversized Wool Coat",
    category: "outerwear",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Structured Leather Jacket",
    category: "outerwear",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
  },
  // Knitwear
  {
    id: 6,
    name: "Cashmere Turtleneck",
    category: "knitwear",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Ribbed Knit Sweater",
    category: "knitwear",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
  },
  // Trousers
  {
    id: 8,
    name: "Wide-Leg Tailored Trousers",
    category: "trousers",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Pleated Palazzo Pants",
    category: "trousers",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
  },
  // Tops (Men's)
  {
    id: 10,
    name: "Structured Cotton Shirt",
    category: "tops",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
  },
  // Shirts (Men's)
  {
    id: 11,
    name: "Oxford Button-Down",
    category: "shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
  },
];

// 🌟 你的 WhatsApp 商业号码 (记得替换成你自己的)
const WHATSAPP_NUMBER = "6581234567"; 

export default function CategoryPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const filteredProducts = allProducts
    .filter(
      (product) => product.category.toLowerCase() === slug.toLowerCase()
    )
    .slice(0, 6);

  const categoryTitle = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Collection";

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 头部出场动画
      gsap.from(headerRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      // 瀑布流商品网格出场动画
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [slug]);

  return (
    <>
      <main className="min-h-screen bg-zinc-50 pt-32 pb-24">
        <div className="mx-auto px-16">
          
          {/* ================= 1. Category Hero ================= */}
          <div
            ref={headerRef}
            className="mb-16 flex flex-col items-center text-center"
          >
            <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
              Spring/Summer 2026
            </span>
            <h1 className="text-4xl font-bold tracking-tighter text-zinc-950 md:text-5xl lg:text-7xl capitalize">
              {categoryTitle}
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-zinc-500 md:text-base">
              Explore our curated selection of {categoryTitle}. Designed with
              uncompromising attention to detail and crafted for the modern
              silhouette.
            </p>
          </div>

          {/* ================= 2. Toolbar: Filter & Sort ================= */}
          <div className="mb-10 flex items-center justify-between border-b border-zinc-200 pb-4">
            <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-colors hover:text-zinc-500">
              <SlidersHorizontal className="size-4" />
              <span>Filter</span>
            </button>

            <div className="text-xs font-medium uppercase tracking-widest text-zinc-500">
              {filteredProducts.length} Pieces
            </div>

            <button className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-colors hover:text-zinc-500">
              <span>Sort By</span>
              <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
            </button>
          </div>

          {/* ================= 3. Product Grid ================= */}
          {filteredProducts.length > 0 ? (
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              {filteredProducts.map((product) => {
                // 生成专属的 WhatsApp 消息模板，仅保留名字，制造神秘感
                const message = encodeURIComponent(
                  `Hello Luxxzone, I'm interested in the ${product.name}. Is it available?`
                );
                const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

                return (
                  <div key={product.id} className="group flex flex-col">
                    
                    {/* 上半部分：商品图片与居中名字 (点击进入商品详情页) */}
                    <Link href={`/product/${product.id}`} className="block">
                      {/* 高级修长比例的图片 */}
                      <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-200">
                        <Image
                          src="/test.jpg"
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                          className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-zinc-950/0 transition-opacity duration-500 group-hover:bg-zinc-950/10" />
                      </div>

                      {/* 居中排版的名字，像艺术画作的铭牌 */}
                      <div className="mt-5 text-center">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950 transition-colors group-hover:text-zinc-600">
                          {product.name}
                        </h3>
                      </div>
                    </Link>

                    {/* 下半部分：全新的纯正绿色 WhatsApp 购买按钮 */}
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 flex w-full items-center justify-center gap-3 bg-[#25D366] py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:bg-[#1DA851]"
                    >
                      {/* WhatsApp 官方 SVG 图标 */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-4"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Inquire via WhatsApp
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            // ================= 4. 空状态 (无商品时展示) =================
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              <p className="text-lg font-light tracking-widest text-zinc-400 uppercase">
                No pieces found in this collection.
              </p>
              <Link
                href="/"
                className="mt-6 border-b border-zinc-950 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-950 transition-colors hover:border-zinc-500 hover:text-zinc-500"
              >
                Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </main>
      
      {/* 极简底部 */}
      <footer className="border-t border-zinc-200 bg-zinc-950 px-8 py-8 lg:px-16">
        <p className="text-center text-sm font-light uppercase tracking-widest text-zinc-500">
          © 2026 Luxxzone. All rights reserved.
        </p>
      </footer>
    </>
  );
}