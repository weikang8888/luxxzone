"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Menu, X, Search } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

// --- 导航数据 ---
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"Men" | "Women">("Men");
  const [isClothingExpanded, setIsClothingExpanded] = useState(false);

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
      <nav className="relative mx-auto flex min-h-20 items-center justify-between px-6 lg:px-16">

        {/* ================= 1. 移动端：左侧汉堡按钮 ================= */}
        <button
          className="lg:hidden text-zinc-950 p-2 -ml-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="size-6" />
        </button>

        {/* ================= 2. Desktop：左侧 (Men) ================= */}
        <div className="hidden lg:flex flex-1 flex-col items-start pt-2">
          <span className="mb-1 text-[13px] font-medium uppercase tracking-[0.35em] text-zinc-400">Men</span>
          <div className="grid w-full grid-cols-4 justify-items-center">
            {leftCategories.map((item) => (
              <div key={item.label} className="group/nav h-full static">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-950 hover:opacity-60 lg:text-xs"
                >
                  {item.label}
                  {item.hasArrow && (
                    <ChevronDown className="size-3 transition-transform duration-200 group-hover/nav:rotate-180" />
                  )}
                </Link>

                {/* --- Clothing Mega Menu (瞬间出现 & 纯白) --- */}
                {item.label === "Clothing" && (
                  <div className="invisible absolute left-0 top-full w-full border-t border-zinc-100 bg-white group-hover/nav:visible z-[110] shadow-2xl">
                    <div className="absolute -top-4 left-0 h-4 w-full bg-transparent" />
                    <div className="mx-auto flex max-w-[1600px] gap-20 p-16">
                      <div className="flex-1">
                        <p className="mb-10 text-[10px] font-medium uppercase tracking-[0.4em] text-zinc-400">Featured Brands</p>
                        <div className="grid grid-cols-3 gap-x-12 gap-y-6 text-left">
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

                      {/* 展示橱窗 */}
                      <div className="relative w-[450px]">
                        <div className="relative aspect-4/5 w-full overflow-hidden shadow-2xl">
                          <Image src="/test-detail-1.webp" alt="Seasonal" fill className="object-cover" />
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

        {/* ================= 3. Logo (居中) ================= */}
        <Link href="/" className="flex h-12 w-32 items-center justify-center shrink-0 lg:h-20 lg:w-48">
          <div className="relative h-full w-full p-2 lg:p-4">
            <Image src="/logo.png" alt="Luxxzone" fill className="object-contain" priority />
          </div>
        </Link>

        {/* ================= 4. Desktop：右侧 (Women) ================= */}
        <div className="hidden lg:flex flex-1 flex-col items-end pt-2">
          <span className="mb-1 text-[13px] font-medium uppercase tracking-[0.35em] text-zinc-400">Women</span>
          <div className="grid w-full grid-cols-4 justify-items-center">
            {rightCategories.map((item) => (
              <Link key={item.label} href={item.href} className="inline-flex items-center gap-1 py-4 text-[10px] font-bold uppercase tracking-widest text-zinc-950 hover:opacity-60 lg:text-xs">
                {item.hasArrow && <ChevronDown className="size-3" />}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ================= 5. 移动端：右侧搜索按钮 ================= */}
        <button className="lg:hidden p-2 -mr-2 text-zinc-950">
          <Search className="size-5" />
        </button>

      </nav>

      {/* ========================================================
           🌟 移动端全屏抽屉菜单 (Mobile Drawer)
           ======================================================== */}
      <div className={`fixed inset-0 z-120 transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col bg-white">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-black border-b-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Menu</span>
            <button onClick={() => { setIsMobileMenuOpen(false); setIsClothingExpanded(false); }} className="p-2"><X className="size-6" /></button>
          </div>

          {/* Men / Women 切换 */}
          <div className="flex border-b border-zinc-100">
            {(["Men", "Women"] as const).map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === tab ? "bg-zinc-950 text-white" : "bg-white text-zinc-400"}`}
                onClick={() => { setActiveTab(tab); setIsClothingExpanded(false); }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 菜单列表 */}
          <div className="px-6 py-4 bg-white overflow-y-auto">
            <div className="space-y-6">
              {(activeTab === "Men" ? leftCategories : rightCategories).map((item) => (
                <div key={item.label}>
                  {item.label === "Clothing" ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between text-left text-sm font-bold uppercase tracking-tighter text-zinc-950"
                        onClick={() => setIsClothingExpanded((prev) => !prev)}
                      >
                        {item.label}
                        <ChevronDown className={`size-5 text-zinc-300 transition-transform duration-200 ${isClothingExpanded ? "rotate-180" : ""}`} />
                      </button>
                      {/* Clothing 子菜单 - 展开时向下滑出 */}
                      <div className={`overflow-hidden transition-all duration-300 ease-out ${isClothingExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="pt-4 pl-4 border-l-2 border-zinc-100">
                          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400">Featured Brands</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {clothingBrands.map((brand) => (
                              <Link
                                key={brand}
                                href="#"
                                className="text-xs font-light tracking-widest text-zinc-600 transition-colors hover:text-zinc-950"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {brand}
                              </Link>
                            ))}
                          </div>
                          <Link
                            href="/category/clothing"
                            className="mt-6 inline-flex items-center gap-2 border-b border-zinc-950 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-950"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            View All Clothing <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className="text-sm font-bold uppercase tracking-tighter text-zinc-950"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}