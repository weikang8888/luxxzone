"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { DROPDOWN_CATEGORIES, categorySubItems } from "@/lib/nav";

const categories = [
    { label: "New Arrivals", slug: "new-arrivals" },
    { label: "Clothing", slug: "clothing" },
    { label: "Shoes", slug: "shoes" },
    { label: "Bags", slug: "bags" },
    { label: "Accessories", slug: "accessories" },
    { label: "Sale", slug: "sale" },
];

export default function Header() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    // 狀態管理 - 使用固定初始值避免 SSR/CSR 水合不匹配，再在 useEffect 中從 URL 同步
    const slug = typeof params.slug === "string" ? params.slug : "";
    const [activeGender, setActiveGender] = useState<"men" | "women">("women");

    useEffect(() => {
        const gender = (searchParams.get("gender") as "men" | "women") || "women";
        setActiveGender(gender);
    }, [searchParams]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // 1. 滾動監聽
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 2. 移動端菜單滾動鎖定
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setOpenDropdown(null);
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const menuVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.2 + i * 0.05, duration: 0.4 },
        }),
    };

    const handleGenderSwitch = (gender: "men" | "women") => {
        setActiveGender(gender);
        if (slug) router.push(`/category/${slug}?gender=${gender}`);
    };

    return (
        <header className="fixed top-0 z-[100] w-full transition-all duration-500">

            {/* --- 1. Mobile Menu Overlay --- */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
                transition={{
                    duration: isMobileMenuOpen ? 0.6 : 0.5,
                    ease: isMobileMenuOpen ? [0.16, 1, 0.3, 1] : [0.4, 0, 1, 1],
                }}
                className="fixed inset-0 z-[110] flex flex-col bg-white md:hidden"
            >
                <div className="flex items-center justify-between px-8 py-8">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="relative h-6 w-28">
                        <Image src="/logo.png" alt="Luxxzone" fill className="object-contain object-left" />
                    </Link>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X className="size-6" /></button>
                </div>

                {/* 移動端藥丸切換器 */}
                <div className="px-8 mb-8">
                    <div className="relative flex w-full bg-zinc-50 p-1 rounded-full">
                        {(["men", "women"] as const).map((tab) => (
                            <button
                                key={tab}
                                className={`relative z-10 flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${activeGender === tab ? "text-white" : "text-zinc-400"}`}
                                onClick={() => handleGenderSwitch(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-full transition-transform duration-500 ease-expo ${activeGender === "men" ? "translate-x-0" : "translate-x-full"}`} />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-12">
                    <nav className="flex flex-col border-t border-zinc-100">
                        {categories.map((item) => {
                            const hasSubItems = DROPDOWN_CATEGORIES.includes(item.label);
                            const isExpanded = openDropdown === item.label;
                            const subItems = categorySubItems[item.label];

                            if (hasSubItems) {
                                return (
                                    <motion.div
                                        key={item.label}
                                        custom={categories.indexOf(item)}
                                        initial="hidden"
                                        animate={isMobileMenuOpen ? "visible" : "hidden"}
                                        variants={menuVariants}
                                        className="border-b border-zinc-100 last:border-none"
                                    >
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between py-6 outline-none"
                                            onClick={() => setOpenDropdown(isExpanded ? null : item.label)}
                                        >
                                            <span className={`text-xl font-black uppercase tracking-tighter transition-colors ${isExpanded ? "text-black" : "text-zinc-950"}`}>
                                                {item.label}
                                            </span>
                                            <ChevronRight className={`size-4 text-zinc-300 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                                        </button>
                                        <div className={`grid transition-all duration-300 ease-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                            <div className="overflow-hidden">
                                                <div className="flex flex-wrap gap-x-6 gap-y-4 pb-6 pl-0">
                                                    {subItems?.map((sub) => (
                                                        <Link
                                                            key={sub.label}
                                                            href={`${sub.href}?gender=${activeGender}`}
                                                            className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            }

                            return (
                                <motion.div
                                    key={item.label}
                                    custom={categories.indexOf(item)}
                                    initial="hidden"
                                    animate={isMobileMenuOpen ? "visible" : "hidden"}
                                    variants={menuVariants}
                                >
                                    <Link
                                        href={item.slug === "sale" ? `/sale?gender=${activeGender}` : `/category/${item.slug}?gender=${activeGender}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between border-b border-zinc-100 py-6"
                                    >
                                        <span className="text-xl font-black uppercase tracking-tighter text-black">{item.label}</span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>
                </div>
            </motion.div>

            {/* --- 2. Search Overlay --- */}
            <div
                className={`absolute inset-0 z-[120] flex items-center transition-all duration-700 ease-expo ${isSearchOpen ? "translate-y-0" : "-translate-y-full"
                    } ${isScrolled ? "bg-zinc-950 text-white" : "bg-white text-black"}`}
            >
                <div className="mx-auto flex w-full max-w-[1400px] items-center px-8">
                    {/* 调整图标颜色：滚动后使用白色透明度 */}
                    <Search className={`size-8 transition-opacity ${isScrolled ? "text-white opacity-30" : "text-black opacity-20"}`} />

                    <input
                        type="text"
                        placeholder="SEARCH THE ARCHIVE..."
                        // 🌟 核心修改点：根据 isScrolled 切换文字颜色和 Placeholder 颜色
                        className={`w-full bg-transparent px-8 py-12 text-3xl font-black uppercase tracking-tighter outline-none md:text-6xl transition-colors duration-500 ${isScrolled
                            ? "text-white placeholder:text-zinc-600"
                            : "text-black placeholder:text-zinc-300"
                            }`}
                        autoFocus={isSearchOpen}
                    />

                    {/* 关闭按钮部分，图标已经在 div 层级通过 text-white 自动适配了，这里确保文字颜色一致 */}
                    <button onClick={() => setIsSearchOpen(false)} className="flex flex-col items-center gap-1 group">
                        <X className="size-8 transition-transform group-hover:rotate-90" />
                        <span className={`text-[10px] font-bold tracking-widest ${isScrolled ? "text-zinc-500" : "text-zinc-400"}`}>
                            ESC
                        </span>
                    </button>
                </div>
            </div>

            {/* --- 3. Main Navigation Bar --- */}
            <div className={`relative transition-all duration-700 ${isScrolled ? "bg-zinc-950/90 shadow-2xl backdrop-blur-2xl" : "bg-white/80 backdrop-blur-md"}`}>
                <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-8 md:px-12">

                    <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden ${isScrolled ? "text-white" : "text-black"}`}>
                        <Menu className="size-6" />
                    </button>

                    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10 md:gap-24">
                        <button
                            onClick={() => handleGenderSwitch("men")}
                            className={`hidden text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-500 md:block ${activeGender === "men" ? (isScrolled ? "text-white scale-110" : "text-black scale-110") : "text-zinc-400 hover:text-zinc-500"}`}
                        >
                            Men
                        </button>

                        <Link href="/" className="relative block h-14 w-36 md:w-52 transition-transform duration-500 hover:scale-105">
                            <Image src="/logo.png" alt="Luxxzone" fill className={`object-contain transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`} priority />
                            <Image src="/logo-white.png" alt="Luxxzone" fill className={`object-contain transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`} priority />
                        </Link>

                        <button
                            onClick={() => handleGenderSwitch("women")}
                            className={`hidden text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-500 md:block ${activeGender === "women" ? (isScrolled ? "text-white scale-110" : "text-black scale-110") : "text-zinc-400 hover:text-zinc-500"}`}
                        >
                            Women
                        </button>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className={`flex size-11 items-center justify-center rounded-full border transition-all duration-500 active:scale-90 ${isScrolled ? "border-zinc-800 bg-zinc-900 text-white hover:bg-white hover:text-black" : "border-zinc-100 bg-white text-black hover:bg-black hover:text-white"}`}
                        >
                            <Search className="size-4" strokeWidth={3} />
                        </button>
                    </div>
                </div>

                <div className={`hidden border-t md:block transition-all duration-500 ${isScrolled ? "border-zinc-800/50" : "border-zinc-100"}`}>
                    <nav className="mx-auto flex h-14 max-w-5xl items-center justify-center gap-12">
                        {categories.map((item) => (
                            <Link
                                key={item.label}
                                href={`/category/${item.slug}?gender=${activeGender}`}
                                className={`group relative text-[11px] font-black uppercase tracking-[0.15em] transition-colors ${isScrolled ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-black"}`}
                            >
                                {item.label}
                                <span className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-white" : "bg-black"}`} />
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}