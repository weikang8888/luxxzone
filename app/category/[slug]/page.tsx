"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// --- 1. 导航分类配置 ---
const categoryData = {
  men: [
    { name: "New Arrivals", slug: "new-arrivals" },
    { name: "Clothing", slug: "clothing" },
    { name: "Shoes", slug: "shoes" },
    { name: "Bags", slug: "bags" },
    { name: "Accessories", slug: "accessories" },
    { name: "Sale", slug: "sale" },
  ],
  women: [
    { name: "Shoes", slug: "shoes" },
    { name: "Clothing", slug: "clothing" },
    { name: "New Arrivals", slug: "new-arrivals" },
    { name: "Sale", slug: "sale" },
    { name: "Accessories", slug: "accessories" },
    { name: "Bags", slug: "bags" },
  ]
};

// --- 2. 排序选项 ---
const sortOptions = [
  { label: "Newest Arrivals", value: "newest" },
  { label: "Name A–Z", value: "name-asc" },
  { label: "Name Z–A", value: "name-desc" },
];

// --- 3. 品牌子分类 (根据你的截图) ---
const brandOptions = [
  "Shop All", "Amiri", "Balenciaga", "Balmain", "Bottega Veneta", "Burberry",
  "Casablanca", "Celine", "Chanel", "Chrome Hearts", "Christian Dior", "Fendi",
  "Givenchy", "Gucci", "Hermes", "Jil Sander", "Loewe", "Louis Vuitton",
  "Miu Miu", "Moncler", "Philipp Plein", "Prada", "Thom Browne", "Valentino",
  "Versace", "Vetements", "We11done", "YSL", "Other Tshirt",
];

const WHATSAPP_NUMBER = "6581234567";

// --- 4. Dummy 商品数据 ---
const dummyProducts = [
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
  {
    id: 4,
    name: "Cashmere Sweater",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 5,
    name: "Leather Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    badge: "Sale",
  },
  {
    id: 6,
    name: "Silk Shirt",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    badge: null,
  },
];

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isClothingExpanded, setIsClothingExpanded] = useState(params.slug === "clothing");

  const slug = typeof params.slug === "string" ? params.slug : "";
  const currentGender = (searchParams.get("gender") as "men" | "women") || "men";
  const currentSort = searchParams.get("sort") || "newest";
  const currentBrand = searchParams.get("brand") || "";

  const gridRef = useRef<HTMLDivElement>(null);

  const handleGenderSwitch = (gender: "men" | "women") => {
    router.push(`/category/${slug}?gender=${gender}&sort=${currentSort}`);
  };

  const handleSortSelect = (sortValue: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("sort", sortValue);
    router.push(`/category/${slug}?${p.toString()}`);
    setIsSortOpen(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sidebar-anim", { opacity: 0, x: -20, duration: 0.8, stagger: 0.05, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, [slug, currentGender]);

  return (
    <main className="min-h-screen bg-white pt-44 pb-24 px-8 lg:px-16">
      <div className="mx-auto flex max-w-[1920px] gap-20">

        {/* ================= 1. Sidebar (大字版) ================= */}
        <aside className="hidden w-72 flex-shrink-0 lg:block border-r border-zinc-100 pr-10">
          <div className="sticky top-56 space-y-16 pt-10">

            {/* 性别切换 - 字体加大 */}
            <div className="sidebar-anim flex gap-10 border-b border-zinc-100 pb-8">
              {(["men", "women"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => handleGenderSwitch(g)}
                  className={`relative text-sm font-black uppercase tracking-[0.4em] transition-all ${currentGender === g ? "text-zinc-950" : "text-zinc-300 hover:text-zinc-500"
                    }`}
                >
                  {g}
                  {currentGender === g && <span className="absolute -bottom-[33.5px] left-0 h-[2.5px] w-full bg-zinc-950" />}
                </button>
              ))}
            </div>

            {/* 分类列表 - 字体加大 */}
            <div className="sidebar-anim">
              <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-zinc-300 mb-10">Navigation</h2>
              <nav className="flex flex-col space-y-6">
                {categoryData[currentGender].map((cat) => (
                  <div key={cat.slug} className="flex flex-col">
                    <div className="flex items-center justify-between group">
                      <Link
                        href={`/category/${cat.slug}?gender=${currentGender}&sort=${currentSort}`}
                        className={`relative w-fit py-1 text-xs lg:text-sm font-black uppercase tracking-[0.2em] transition-colors ${slug === cat.slug ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-950"
                          }`}
                      >
                        {cat.name}
                        {slug === cat.slug && <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-full bg-zinc-950" />}
                      </Link>

                      {cat.slug === "clothing" && (
                        <button
                          onClick={(e) => { e.preventDefault(); setIsClothingExpanded(!isClothingExpanded); }}
                          className="p-1.5 hover:bg-zinc-50 rounded-full transition-colors"
                        >
                          <ChevronDown className={`size-4 text-zinc-400 transition-transform duration-500 ${isClothingExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>

                    {/* 品牌列表 - 字体适中加大 */}
                    {cat.slug === "clothing" && (
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isClothingExpanded ? "max-h-[1500px] mt-6 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="flex flex-col space-y-4 pl-5 border-l-2 border-zinc-100 py-2 ml-1">
                          {brandOptions.map((brand) => {
                            const brandSlug = brand.toLowerCase().replace(/\s+/g, "-");
                            const isBrandActive = currentBrand === brandSlug || (brand === "Shop All" && !currentBrand);

                            return (
                              <Link
                                key={brand}
                                href={`/category/clothing?gender=${currentGender}&brand=${brandSlug}&sort=${currentSort}`}
                                className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${isBrandActive ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-950"
                                  }`}
                              >
                                {brand}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* ================= 2. Main Content (保持对齐) ================= */}
        <section className="flex-1">
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between border-b border-zinc-100 pb-10 gap-6">
            <div className="flex-1">
              <h1 className="text-6xl font-black uppercase tracking-tighter text-zinc-950 lg:text-6xl leading-[0.8]">
                <span className="text-zinc-300 block mb-4 text-3xl lg:text-4xl tracking-widest">{currentGender}</span>
                {slug.replace(/-/g, " ")}
              </h1>
            </div>

            <div className="flex items-center gap-12 shrink-0 pb-1">
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Pieces</span>
                <span className="text-sm font-black text-zinc-950 mt-1 uppercase tracking-widest">
                  {dummyProducts.length} Total
                </span>
              </div>

              <div className="relative">
                <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 text-right mb-1">Order</span>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 border-b-2 border-zinc-950 pb-1.5 transition-opacity hover:opacity-60"
                >
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-950">
                    {sortOptions.find(o => o.value === currentSort)?.label}
                  </span>
                  <ChevronDown className={`size-4 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                </button>

                {isSortOpen && (
                  <div className="absolute right-0 top-full z-[110] mt-4 w-72 bg-white p-8 shadow-2xl border border-zinc-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex flex-col gap-5 text-right">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSortSelect(option.value)}
                          className={`text-xs font-black uppercase tracking-widest transition-colors ${currentSort === option.value
                              ? "text-zinc-950 border-r-4 border-zinc-950 pr-3"
                              : "text-zinc-400 hover:text-zinc-950 pr-4"
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 gap-x-8 gap-y-24 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {dummyProducts.map((product) => {
              const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}`)}`;
              return (
                <Link
                  key={product.id}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col"
                >
                  <div className="relative aspect-3/4 overflow-hidden bg-zinc-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-zinc-950/0 transition-colors duration-500 group-hover:bg-zinc-950/20" />
                    {product.badge && (
                      <span className="absolute left-4 top-4 rounded-none bg-zinc-950 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-50">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-b border-zinc-100 py-2 transition-colors group-hover:border-zinc-950">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-950">
                      {product.name}
                    </h3>
                    <span className="bg-[#25D366] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      via WhatsApp
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}