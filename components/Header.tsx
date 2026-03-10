"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const leftCategories = [
  { label: "Clothing", href: "/category/clothing", hasArrow: true },
  { label: "Accessories", href: "#", hasArrow: false },
  { label: "New Arrivals", href: "#", hasArrow: false },
  { label: "Sale", href: "#", hasArrow: false },
];

const rightCategories = [
  { label: "Sale", href: "#", hasArrow: false },
  { label: "New Arrivals", href: "#", hasArrow: false },
  { label: "Accessories", href: "#", hasArrow: false },
  { label: "Clothing", href: "/category/clothing", hasArrow: true },
];

const clothingBrands = [
  "Louis Vuitton", "Hermes", "Gucci", "Chanel", "Dior", "Prada", "Balenciaga", "Celine", "Fendi", "Saint Laurent", "Loewe", "Givenchy"
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

        {/* 1. 左侧 4 个：Men's */}
        <div className="flex flex-1 flex-col items-start">
          <span className="mb-1 text-[14px] font-medium uppercase tracking-[0.35em] text-zinc-400">Men</span>
          <div className="grid w-full grid-cols-4 justify-items-center">
          {leftCategories.map((item) => (
            <div key={item.label} className="group/nav h-full">
                <Link
                  href={item.href}
                  className="inline-flex items-center justify-center gap-1 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60 lg:text-xs"
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

            </div>
            ))}
          </div>
        </div>

        {/* 2. Logo - 保持你原来的绝对居中布局 */}
        <Link href="/" id="header-logo" className="flex h-20 w-48 items-center justify-center shrink-0">
          <div className="relative h-full w-full p-4">
            <Image src="/logo.png" alt="Luxxzone" fill className="object-contain" priority />
          </div>
        </Link>

        {/* 3. 右侧 4 个：Women's */}
        <div className="flex flex-1 flex-col items-end">
          <span className="mb-1 text-[14px] font-medium uppercase tracking-[0.35em] text-zinc-400">Women</span>
          <div className="grid w-full grid-cols-4 justify-items-center gap-x-6 gap-y-1">
            {rightCategories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center justify-center gap-1 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60 lg:text-xs"
              >
                {item.label}
                {item.hasArrow && <ChevronDown className="size-3" />}
              </Link>
            ))}
          </div>
        </div>

      </nav>
    </header>
  );
}