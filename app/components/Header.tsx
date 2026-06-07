"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import { useCategories } from "@/app/hooks/useCategories";
import { categoryMatchesGender } from "@/lib/categoryGender";
import { nameToSlug } from "@/lib/nameToSlug";
import { apiToNavCategories } from "@/lib/navFromCategories";
import { isCategoryHrefActive } from "@/lib/navHref";

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
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
        const subSubSlug = typeof params.subSubSlug === "string" ? params.subSubSlug : "";
        const sexDegree = gender === "men" ? 1 : 2;
        const activeSexDegree = activeGender === "men" ? 1 : 2;
        const mainCat = apiCategories.find(
            (c) => categoryMatchesGender(c.sex_degree, activeSexDegree) && nameToSlug(c.name) === categorySlug
        );
        const currentSub = mainCat?.sub_categories.find((s) => nameToSlug(s.name) === subSlug);
        const targetParent = apiCategories.find(
            (c) => categoryMatchesGender(c.sex_degree, sexDegree) && nameToSlug(c.name) === categorySlug
        );
        if (targetParent) {
            const targetSub = currentSub && targetParent.sub_categories.find((s) => s.name === currentSub.name);
            if (targetSub) {
                const base = `/${gender}/${categorySlug}/${nameToSlug(targetSub.name)}`;
                if (subSubSlug && currentSub) {
                    const currentTriple = (currentSub.sub_sub_categories ?? []).find(
                        (ss) => nameToSlug(ss.name) === subSubSlug
                    );
                    const mapped =
                        currentTriple &&
                        (targetSub.sub_sub_categories ?? []).find((ss) => ss.name === currentTriple.name);
                    router.push(mapped ? `${base}/${nameToSlug(mapped.name)}` : base);
                    return;
                }
                router.push(base);
                return;
            }
            router.push(`/${gender}/${categorySlug}`);
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
                pathname={pathname}
            />

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                isScrolled={isScrolled}
                activeGender={activeGender}
                categories={categories}
                pathname={pathname}
            />

            {/* --- 3. Main Navigation Bar --- */}
            <div className={`relative transition-all duration-700 ${isScrolled ? "bg-zinc-950/90 shadow-2xl backdrop-blur-2xl" : "bg-white/80 backdrop-blur-md"}`}>
                <div className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-8 md:px-12">

                    <button onClick={() => setIsMobileMenuOpen(true)} className={`md:hidden ${isScrolled ? "text-white" : "text-black"}`}>
                        <Menu className="size-6" />
                    </button>

                    <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-10 md:gap-24">
                        <button
                            onClick={() => handleGenderSwitch("men")}
                            className={`hidden md:text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-500 md:block ${activeGender === "men" ? (isScrolled ? "text-white scale-110" : "text-black scale-110") : "text-zinc-400 hover:text-zinc-500"}`}
                        >
                            Men
                        </button>

                        <Link href="/" className="relative block h-14 w-36 md:w-52 transition-transform duration-500 hover:scale-105">
                            <Image src="/logo.png" alt="Luxxzone" fill className={`object-contain transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`} priority />
                            <Image src="/logo-white.png" alt="Luxxzone" fill className={`object-contain transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`} priority />
                        </Link>

                        <button
                            onClick={() => handleGenderSwitch("women")}
                            className={`hidden md:text-[12px] font-black uppercase tracking-[0.3em] transition-all duration-500 md:block ${activeGender === "women" ? (isScrolled ? "text-white scale-110" : "text-black scale-110") : "text-zinc-400 hover:text-zinc-500"}`}
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
                        {categories.map((item) => {
                            const catHref = `/${activeGender}/${item.slug}`;
                            const isActive = isCategoryHrefActive(pathname, catHref);
                            return (
                                <Link
                                    key={item.id}
                                    href={catHref}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`group relative text-[12px] font-black uppercase tracking-[0.15em] transition-colors ${isActive
                                        ? isScrolled
                                            ? "text-white"
                                            : "text-black"
                                        : isScrolled
                                            ? "text-zinc-400 hover:text-white"
                                            : "text-zinc-500 hover:text-black"
                                        }`}
                                >
                                    {item.label}
                                    <span
                                        className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"} ${isScrolled ? "bg-white" : "bg-black"}`}
                                    />
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </header>
    );
}