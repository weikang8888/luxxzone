"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { clothingBrandOptions, WHATSAPP_NUMBER } from "@/lib/constants";

// --- 数据配置 ---
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
        { name: "New Arrivals", slug: "new-arrivals" },
        { name: "Clothing", slug: "clothing" },
        { name: "Shoes", slug: "shoes" },
        { name: "Bags", slug: "bags" },
        { name: "Accessories", slug: "accessories" },
        { name: "Sale", slug: "sale" },
    ]
};

const sortOptions = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Price: Low to High", value: "price-asc" },
];

const dummyProducts = [
    { id: 1, name: "Oversized Wool Coat", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800", badge: "New" },
    { id: 2, name: "Structured Blazer", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800", badge: null },
    { id: 3, name: "Wide-Leg Trousers", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800", badge: "Best Seller" },
    { id: 4, name: "Cashmere Sweater", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800", badge: null },
    { id: 5, name: "Leather Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800", badge: "Sale" },
    { id: 6, name: "Silk Shirt", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800", badge: null },
];

export default function CategoryPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isClothingExpanded, setIsClothingExpanded] = useState(false);
    // 使用 state 與固定預設值，避免 SSR/CSR 水合不匹配；在 useEffect 中從 URL 同步
    const [currentGender, setCurrentGender] = useState<"men" | "women">("men");
    const [currentSort, setCurrentSort] = useState("newest");
    const [currentBrand, setCurrentBrand] = useState("");

    const slug = typeof params.slug === "string" ? params.slug : "";

    useEffect(() => {
        setCurrentGender((searchParams.get("gender") as "men" | "women") || "men");
        setCurrentSort(searchParams.get("sort") || "newest");
        setCurrentBrand(searchParams.get("brand") || "");
        setIsClothingExpanded(params.slug === "clothing");
    }, [searchParams, params.slug]);


    const handleSortSelect = (sortValue: string) => {
        const p = new URLSearchParams(searchParams.toString());
        p.set("sort", sortValue);
        router.push(`/category/${slug}?${p.toString()}`);
        setIsSortOpen(false);
    };

    return (
        <main className="min-h-screen bg-white pb-20 pt-24 md:pt-32 lg:pt-40">
            <div className="mx-auto flex max-w-[1920px] flex-col gap-10 px-6 md:flex-row md:px-16">

                {/* --- 1. Sidebar --- */}
                <aside className="hidden w-64 shrink-0 md:block">
                    <div className="sticky top-40">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.05 }}
                            className="mb-12"
                        >
                            <h2 className="mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Navigation</h2>
                            <nav className="flex flex-col space-y-7">
                                {categoryData[currentGender].map((cat) => (
                                    <div key={cat.slug} className="flex flex-col">
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={`/category/${cat.slug}?gender=${currentGender}`}
                                                className={`text-[11px] font-black uppercase tracking-widest transition-all ${slug === cat.slug ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                            >
                                                {cat.name}
                                            </Link>
                                            {cat.slug === "clothing" && (
                                                <button type="button" onClick={() => setIsClothingExpanded(!isClothingExpanded)}>
                                                    <ChevronDown className={`size-4 transition-transform ${isClothingExpanded ? "rotate-180" : ""}`} />
                                                </button>
                                            )}
                                        </div>
                                        {cat.slug === "clothing" && isClothingExpanded && (
                                            <div className="mt-6 flex flex-col space-y-4 border-l border-zinc-100 pl-4">
                                                {clothingBrandOptions.map((brand) => (
                                                    <Link
                                                        key={brand}
                                                        href={`/category/clothing?gender=${currentGender}&brand=${brand.toLowerCase().replace(/\s+/g, "-")}`}
                                                        className={`text-[9px] font-bold uppercase tracking-widest ${currentBrand === brand.toLowerCase().replace(/\s+/g, "-") ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                    >
                                                        {brand}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </motion.div>
                    </div>
                </aside>

                {/* --- 2. Main Content --- */}
                <section className="flex-1 min-w-0">
                    <div className="mb-12 flex flex-col border-b border-zinc-100 pb-10">
                        {/* 标题 */}
                        <div className="mb-8">
                            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">Luxxzone / {currentGender}</span>
                            <h1 className="text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">{slug.replace(/-/g, " ")}</h1>
                        </div>

                        {/* 🌟 Total & Sort Row (Mobile 优化) */}
                        <div className="flex items-end justify-between md:items-center">
                            <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                                Total: {dummyProducts.length} <span className="hidden sm:inline">Items</span>
                            </p>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 border-b-2 border-black pb-1 text-[10px] font-black uppercase tracking-widest"
                                >
                                    Sort: {sortOptions.find(o => o.value === currentSort)?.label}
                                    <ChevronDown className={`size-3 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isSortOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-4 w-56 bg-white p-6 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="flex flex-col gap-4 text-right">
                                            {sortOptions.map((o) => (
                                                <button
                                                    key={o.value}
                                                    onClick={() => handleSortSelect(o.value)}
                                                    className={`text-[9px] font-bold uppercase tracking-widest ${currentSort === o.value ? "text-black" : "text-zinc-400 hover:text-black"}`}
                                                >
                                                    {o.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 商品网格 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1, delayChildren: 0 },
                            },
                        }}
                        className="grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-10"
                    >
                        {dummyProducts.map((p) => (
                            <motion.div
                                key={p.id}
                                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="group flex flex-col"
                            >
                                
                                {/* 1. 图片区：纯净无遮挡 */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50 mb-6 transition-transform duration-500 hover:shadow-xl">
                                    <Link href={`/product/${p.id}`}>
                                        <Image
                                            src={p.image}
                                            alt={p.name}
                                            fill
                                            className="object-cover transition-transform duration-[1.5s] ease-out md:group-hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </Link>
                                    {p.badge && (
                                        <span className="absolute left-0 top-4 bg-black px-2 py-1 text-[8px] font-black uppercase tracking-widest text-white">
                                            {p.badge}
                                        </span>
                                    )}
                                </div>

                                {/* 2. 商品文字信息 */}
                                <div className="mb-5 px-1">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest mb-1 truncate text-zinc-950">
                                        {p.name}
                                    </h3>
                                    <p className="text-[9px] font-medium tracking-[0.2em] text-zinc-400 italic">
                                        Seasonal Edition
                                    </p>
                                </div>

                                {/* 3. WhatsApp 按钮：最底部，经典青色 */}
                                <div className="mt-auto">
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I am interested in ${p.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center justify-center gap-3 bg-[#25D366] py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all active:scale-95 hover:bg-[#20ba5a] shadow-sm"
                                    >
                                        <MessageCircle className="size-4" />
                                        <span>INQUIRE NOW</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </div>
        </main>
    );
}