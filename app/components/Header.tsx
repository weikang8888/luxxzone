"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import MobileMenu from "./MobileMenu";
import { useCategories } from "@/app/hooks/useCategories";
import { useProductSearch } from "@/app/hooks/useProductSearch";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

type ApiCategory = { id: number; name: string; sex_degree: number; sub_categories: { id: number; name: string }[] };
type NavCategory = { id: number; label: string; slug: string; sub_categories: { id: number; label: string; href: string }[] };

function nameToSlug(name: string) {
    return name.toLowerCase().replace(/\s+/g, "-");
}

function apiToNavCategories(data: ApiCategory[], sexDegree: number, gender: "men" | "women"): NavCategory[] {
    return data
        .filter((c) => c.sex_degree === sexDegree)
        .map((c) => {
            const slug = nameToSlug(c.name);
            const baseHref = `/${gender}/${slug}`;
            const sub_categories = c.sub_categories.map((sub) => ({
                id: sub.id,
                label: sub.name,
                href: `/${gender}/${slug}/${nameToSlug(sub.name)}`,
            }));
            if (sub_categories.length > 0) {
                sub_categories.unshift({ id: 0, label: "Shop All", href: baseHref });
            }
            return { id: c.id, label: c.name, slug, sub_categories };
        });
}

export default function Header() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const categorySlug = typeof params.slug === "string" ? params.slug : "";
    const [activeGender, setActiveGender] = useState<"men" | "women">("men");

    const { data: apiCategories = [] } = useCategories();

    useEffect(() => {
        const pathGender = params.gender === "men" || params.gender === "women" ? params.gender : null;
        if (pathGender) setActiveGender(pathGender);
        else setActiveGender((searchParams.get("gender") as "men" | "women") || "men");
    }, [params.gender, searchParams]);

    const sexDegree = activeGender === "men" ? 1 : 2;
    const categories = apiToNavCategories(apiCategories, sexDegree, activeGender);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState("");

    const { data: searchResult, isLoading: isSearching } = useProductSearch(debouncedKeyword, sexDegree);

    useEffect(() => {
        if (!searchKeyword.trim()) {
            setDebouncedKeyword("");
            return;
        }
        const t = setTimeout(() => setDebouncedKeyword(searchKeyword.trim()), 300);
        return () => clearTimeout(t);
    }, [searchKeyword]);

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
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const handleGenderSwitch = (gender: "men" | "women") => {
        setActiveGender(gender);
        if (!categorySlug) return;
        const subSlug = typeof params.subSlug === "string" ? params.subSlug : "";
        const sexDegree = gender === "men" ? 1 : 2;
        const mainCat = apiCategories.find((c) => c.sex_degree === (activeGender === "men" ? 1 : 2) && nameToSlug(c.name) === categorySlug);
        const currentSub = mainCat?.sub_categories.find((s) => nameToSlug(s.name) === subSlug);
        const targetParent = apiCategories.find((c) => c.sex_degree === sexDegree && nameToSlug(c.name) === categorySlug);
        if (targetParent) {
            const targetSub = currentSub && targetParent.sub_categories.find((s) => s.name === currentSub.name);
            const path = targetSub
                ? `/${gender}/${categorySlug}/${nameToSlug(targetSub.name)}`
                : `/${gender}/${categorySlug}`;
            router.push(path);
        }
    };

    return (
        <header className="fixed top-0 z-100 w-full transition-all duration-500">

            {/* --- 1. Mobile Menu --- */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                activeGender={activeGender}
                onGenderSwitch={handleGenderSwitch}
                categories={categories}
            />

            {/* --- 2. Search Overlay (极速响应版) --- */}
            <div
                className={`fixed inset-0 z-120 flex flex-col transition-all ${isSearchOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
                    }`}
            >
                {/* 1. 顶部输入区域：始终遮挡 Header */}
                <div className={`relative z-10 transition-colors duration-300 ${isScrolled ? "bg-zinc-950 text-white" : "bg-white text-black"}`}>
                    <div className={`mx-auto flex w-full max-w-[1400px] items-center px-6 lg:px-8 shrink-0 border-b ${isScrolled ? "border-zinc-800" : "border-zinc-100"}`}>
                        <Search className={`size-5 lg:size-8 shrink-0 transition-opacity ${isScrolled ? "text-white opacity-40" : "text-black opacity-20"}`} />
                        <input
                            type="text"
                            placeholder="SEARCH ARCHIVE..."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && searchKeyword.trim()) {
                                    router.push(`/search?q=${encodeURIComponent(searchKeyword.trim())}&gender=${activeGender}`);
                                    setIsSearchOpen(false);
                                }
                            }}
                            // 🌟 字号与间距优化
                            className={`w-full bg-transparent px-4 py-8 text-2xl font-black uppercase tracking-tighter outline-none md:px-8 md:py-12 md:text-6xl transition-all ${isScrolled ? "text-white placeholder:text-zinc-800" : "text-black placeholder:text-zinc-200"
                                }`}
                            autoFocus={isSearchOpen}
                        />
                        <button onClick={() => { setIsSearchOpen(false); setSearchKeyword(""); setDebouncedKeyword(""); }} className="p-2 transition-transform active:scale-90">
                            <X className="size-6 lg:size-8" />
                        </button>
                    </div>
                </div>

                {/* 🌟 2. 结果区域：极速显现逻辑 */}
                <div
                    className={`flex-1 overflow-y-auto transition-colors duration-300 ${debouncedKeyword
                        ? (isScrolled ? "bg-zinc-950" : "bg-white")
                        : "bg-transparent pointer-events-none"
                        }`}
                >
                    {debouncedKeyword && (
                        <div className={`mx-auto w-full max-w-[1400px] flex flex-col md:flex-row gap-10 md:gap-20 px-6 lg:px-8 py-8 md:py-12 animate-in fade-in duration-300 ${isScrolled ? "text-white" : "text-black"}`}>

                            {/* 左侧：分类匹配 */}
                            <div className="w-full md:w-80 shrink-0 space-y-10">
                                <div className="space-y-6">
                                    <p className={`text-[9px] font-black uppercase tracking-[0.5em] italic ${isScrolled ? "text-zinc-700" : "text-zinc-300"}`}>Categories</p>
                                    <div className="flex flex-col gap-4">
                                        {categories
                                            .filter(c => c.label.toLowerCase().includes(debouncedKeyword.toLowerCase()))
                                            .map(cat => (
                                                <Link key={cat.id} href={`/${activeGender}/${cat.slug}`} onClick={() => setIsSearchOpen(false)}
                                                    className="text-2xl font-black uppercase tracking-tighter hover:italic transition-all leading-none">
                                                    {cat.label}
                                                </Link>
                                            ))}
                                    </div>
                                </div>

                                {/* 子分类匹配 */}
                                <div className="space-y-6">
                                    <p className={`text-[9px] font-black uppercase tracking-[0.5em] italic ${isScrolled ? "text-zinc-700" : "text-zinc-300"}`}>Sub-categories</p>
                                    <div className="flex flex-wrap md:flex-col gap-2 md:gap-4">
                                        {categories.flatMap(c => c.sub_categories)
                                            .filter(s => s.label.toLowerCase().includes(debouncedKeyword.toLowerCase()) && s.label !== "Shop All")
                                            .slice(0, 8)
                                            .map(sub => (
                                                <Link key={sub.id} href={sub.href} onClick={() => setIsSearchOpen(false)}
                                                    className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] border px-3 py-1.5 md:border-none md:p-0 transition-colors ${isScrolled ? "border-zinc-800 text-zinc-500 hover:text-white" : "border-zinc-100 text-zinc-400 hover:text-black"
                                                        }`}>
                                                    {sub.label}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            {/* 右侧：产品网格 */}
                            <div className="flex-1 pb-32">
                                <p className={`mb-8 text-[9px] font-black uppercase tracking-[0.5em] italic ${isScrolled ? "text-zinc-700" : "text-zinc-300"}`}>Products</p>

                                {searchResult?.data?.length ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                                        {searchResult.data.map((p: any) => (
                                            <Link key={p.id} href={`/product/${p.id}`} onClick={() => { setIsSearchOpen(false); setSearchKeyword(""); }} className="group block">
                                                <div className={`relative aspect-3/4 overflow-hidden mb-4 ${isScrolled ? "bg-zinc-900 shadow-2xl" : "bg-zinc-50 shadow-lg"}`}>
                                                    <Image src={p.image ?? PLACEHOLDER_IMAGE} alt={p.name} fill className="object-cover transition-all duration-500 group-hover:scale-105" />
                                                </div>
                                                <h4 className="truncate text-[10px] font-bold uppercase tracking-widest leading-tight opacity-80">{p.name}</h4>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center md:text-left opacity-20 font-black text-2xl uppercase tracking-tighter italic">No Archive</div>
                                )}
                            </div>
                        </div>
                    )}
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
                                key={item.id}
                                href={`/${activeGender}/${item.slug}`}
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