"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const leftCategories = [
  { label: "Clothing", href: "/category/clothing", hasArrow: true },
  { label: "Footwear", href: "#", hasArrow: true },
  { label: "Bags", href: "#", hasArrow: true },
  { label: "Watches", href: "#", hasArrow: true },
  { label: "Accessories", href: "#", hasArrow: false },
  { label: "Jewelry", href: "#", hasArrow: false },
  { label: "Belts", href: "#", hasArrow: false },
  { label: "Sunglasses", href: "#", hasArrow: false },
];

const rightCategories = [
  { label: "Men's", href: "#", hasArrow: true },
  { label: "Women's", href: "#", hasArrow: true },
  { label: "New Arrivals", href: "#", hasArrow: false },
  { label: "Collections", href: "#", hasArrow: true },
  { label: "Sale", href: "#", hasArrow: false },
  { label: "About", href: "#", hasArrow: false },
  { label: "Contact", href: "#", hasArrow: false },
  { label: "Wishlist", href: "#", hasArrow: false },
];

const clothingBrands = [
  "Louis Vuitton", "Hermes", "Gucci", "Chanel", "Dior", "Prada", "Balenciaga", "Celine", "Fendi", "Saint Laurent", "Loewe", "Givenchy"
];

// 🌟 仅供 Footwear 内部使用的本地数据，不修改全局数据
const footwearSubItems = [
  { label: "Sneakers", brands: ["Shop All", "Alexander McQueen", "Balenciaga", "Bottega Veneta", "Gucci", "Louis Vuitton"] },
  { label: "Sandals", brands: ["Shop All", "Hermes", "Prada", "Valentino"] },
  { label: "Loafers", brands: ["Shop All", "Loro Piana", "Bottega Veneta", "Tod's"] },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      ease: "power3.out",
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-100 border-b border-zinc-200/50 bg-zinc-50/80 backdrop-blur-md"
    >
      <nav className="relative mx-auto flex min-h-20 items-center justify-between px-16">

        {/* 1. 左侧 8 个分类 */}
        <div className="grid flex-1 grid-cols-4">
          {leftCategories.map((item) => (
            <div key={item.label} className="group/nav h-full">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60 lg:text-xs"
              >
                {item.label}
                {item.hasArrow && (
                  <ChevronDown className={`size-3 transition-transform duration-200 ${item.label === "Clothing" ? "group-hover/nav:rotate-180" : ""}`} />
                )}
              </Link>

              {/* 🌟 Clothing Mega Menu - 保持你原来的结构 */}
              {item.label === "Clothing" && (
                <div className="invisible absolute left-0 top-10 w-full border-t border-zinc-100 bg-white group-hover/nav:visible z-10">
                  <div className="mx-auto w-full flex gap-20 p-16">
                    <div className="flex-1">
                      <p className="mb-10 text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-400">Featured Brands</p>
                      <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                        {clothingBrands.map((brand) => (
                          <Link key={brand} href="#" className="text-sm font-light tracking-widest text-zinc-600 transition-colors hover:text-zinc-950">
                            {brand}
                          </Link>
                        ))}
                      </div>
                      <Link href="/category/clothing" className="mt-12 inline-flex items-center gap-4 border-b border-zinc-950 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-950">
                        View All Clothing <ArrowRight className="size-4" />
                      </Link>
                    </div>

                    <div className="relative w-[450px]">
                      <div className="relative aspect-4/5 w-full overflow-hidden shadow-2xl">
                        <Image src="/test-detail-1.webp" alt="Seasonal" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover/nav:opacity-0" />
                      </div>
                      <div className="absolute -bottom-8 -left-8 bg-zinc-950 p-8 text-white shadow-2xl">
                        <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-zinc-400">The New Era</p>
                        <h4 className="text-2xl font-bold uppercase tracking-tighter text-zinc-100">Spring Selection</h4>
                        <p className="mt-4 text-xs font-light tracking-widest text-zinc-300">Redefining the modern silhouette.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 🌟 Footwear Category Menu - 按照你的截图风格加入，瞬发无过渡 */}
              {item.label === "Footwear" && (
                <div className="invisible absolute top-10 min-w-[280px] border border-zinc-100 bg-white group-hover/nav:visible z-20 shadow-2xl">
                  <div className="flex flex-col py-2">
                    {footwearSubItems.map((sub) => (
                      <div key={sub.label} className="group/sub relative">
                        {/* 一级菜单项 */}
                        <div className="flex items-center justify-between px-8 py-4 cursor-pointer hover:bg-zinc-50">
                          <span className="text-[12px] font-medium tracking-widest text-zinc-900 uppercase">{sub.label}</span>
                          <ChevronRight className="size-4 text-zinc-400" />
                        </div>
                        
                        {/* 二级侧向弹出菜单 */}
                        <div className="invisible absolute left-full -top-2 min-w-[280px] border border-zinc-100 bg-white group-hover/sub:visible shadow-2xl">
                          <div className="flex flex-col py-2">
                            {sub.brands.map((brand) => (
                              <Link 
                                key={brand} 
                                href="#" 
                                className={`px-8 py-3 text-[11px] tracking-[0.2em] transition-colors hover:bg-zinc-50 ${brand === 'Shop All' ? 'font-bold text-zinc-950 border-b border-zinc-50 mb-1' : 'font-light text-zinc-500 hover:text-zinc-950'}`}
                              >
                                {brand.toUpperCase()}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* 2. Logo - 保持你原来的绝对居中布局 */}
        <Link href="/" className="flex h-20 w-48 items-center justify-center shrink-0">
          <div className="relative h-full w-full p-4">
            <Image src="/logo.png" alt="Luxxzone" fill className="object-contain" priority />
          </div>
        </Link>

        {/* 3. 右侧 8 个分类 */}
        <div className="grid flex-1 grid-cols-4 gap-x-6 gap-y-1 text-right">
          {rightCategories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center justify-end gap-1 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60 lg:text-xs"
            >
              {item.hasArrow && <ChevronDown className="size-3" />}
              {item.label}
            </Link>
          ))}
        </div>

      </nav>
    </header>
  );
}