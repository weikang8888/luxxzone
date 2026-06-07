"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProductSearch } from "@/app/hooks/useProductSearch";
import { useScrollLock } from "@/app/hooks/useScrollLock";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { NavCategory } from "@/lib/navFromCategories";
import { isCategoryHrefActive } from "@/lib/navHref";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    isScrolled: boolean;
    activeGender: "men" | "women";
    categories: NavCategory[];
    pathname: string;
};

export default function SearchOverlay({
    isOpen,
    onClose,
    isScrolled,
    activeGender,
    categories,
    pathname,
}: Props) {
    const router = useRouter();
    const [searchKeyword, setSearchKeyword] = useState("");
    const [debouncedKeyword, setDebouncedKeyword] = useState("");

    const sexDegree = activeGender === "men" ? 1 : 2;
    const { data: searchResult } = useProductSearch(debouncedKeyword, sexDegree);

    const flattenedNavSubs = useMemo(() => {
        type FlatSub = { label: string; href: string };
        return categories.flatMap((c) =>
            c.sub_categories.flatMap((s): FlatSub[] => {
                if (s.label === "Shop All") return [];
                if (s.children?.length) {
                    return [
                        { label: s.label, href: s.href },
                        ...s.children.map((ch) => ({ label: ch.label, href: ch.href })),
                    ];
                }
                return [{ label: s.label, href: s.href }];
            })
        );
    }, [categories]);

    const searchSubActiveHref = useMemo(() => {
        const matches = flattenedNavSubs.filter(
            (s) => pathname === s.href || pathname.startsWith(`${s.href}/`)
        );
        if (matches.length === 0) return null;
        return matches.sort((a, b) => b.href.length - a.href.length)[0]!.href;
    }, [flattenedNavSubs, pathname]);

    const searchPanelCategories = useMemo(() => {
        const kw = debouncedKeyword.toLowerCase();
        let list = categories.filter((c) => c.label.toLowerCase().includes(kw));
        const currentCat = categories.find((c) =>
            isCategoryHrefActive(pathname, `/${activeGender}/${c.slug}`)
        );
        if (currentCat && !list.some((c) => c.id === currentCat.id)) {
            list = [currentCat, ...list];
        }
        return list;
    }, [categories, debouncedKeyword, pathname, activeGender]);

    const searchPanelSubs = useMemo(() => {
        const kw = debouncedKeyword.toLowerCase();
        let list = flattenedNavSubs.filter((s) => s.label.toLowerCase().includes(kw));
        const currentRow = flattenedNavSubs.find((s) => s.href === searchSubActiveHref);
        if (
            currentRow &&
            !list.some((s) => s.href === currentRow.href && s.label === currentRow.label)
        ) {
            list = [currentRow, ...list];
        }
        return list.slice(0, 8);
    }, [flattenedNavSubs, debouncedKeyword, searchSubActiveHref]);

    useEffect(() => {
        if (!searchKeyword.trim()) {
            setDebouncedKeyword("");
            return;
        }
        const t = setTimeout(() => setDebouncedKeyword(searchKeyword.trim()), 300);
        return () => clearTimeout(t);
    }, [searchKeyword]);

    useEffect(() => {
        if (!isOpen) {
            setSearchKeyword("");
            setDebouncedKeyword("");
        }
    }, [isOpen]);

    useScrollLock(isOpen);

    const handleClose = () => {
        setSearchKeyword("");
        setDebouncedKeyword("");
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-120 flex flex-col transition-all ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
                }`}
        >
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
                                handleClose();
                            }
                        }}
                        className={`w-full bg-transparent px-4 py-8 text-2xl font-black uppercase tracking-tighter outline-none md:px-8 md:py-12 md:text-6xl transition-all ${isScrolled ? "text-white placeholder:text-zinc-800" : "text-black placeholder:text-zinc-200"
                            }`}
                        autoFocus={isOpen}
                    />
                    <button onClick={handleClose} className="p-2 transition-transform active:scale-90">
                        <X className="size-6 lg:size-8" />
                    </button>
                </div>
            </div>

            <div
                className={`flex-1 min-h-0 overflow-hidden transition-colors duration-300 ${debouncedKeyword
                    ? (isScrolled ? "bg-zinc-950" : "bg-white")
                    : "bg-transparent pointer-events-none"
                    }`}
            >
                {debouncedKeyword && (
                    <div className={`mx-auto h-full w-full max-w-[1400px] flex min-h-0 flex-col md:flex-row gap-10 md:gap-20 px-6 lg:px-8 py-8 md:py-12 animate-in fade-in duration-300 ${isScrolled ? "text-white" : "text-black"}`}>

                        <div data-lenis-prevent className="w-full md:w-80 shrink-0 min-h-0 flex-1 md:flex-none overflow-y-auto space-y-10 md:max-h-full">
                            <div className="space-y-6">
                                <p className={`text-[9px] font-black uppercase tracking-[0.5em] italic ${isScrolled ? "text-zinc-700" : "text-zinc-300"}`}>Categories</p>
                                <div className="flex flex-col gap-4">
                                    {searchPanelCategories.map(cat => {
                                        const catHref = `/${activeGender}/${cat.slug}`;
                                        const isActive = isCategoryHrefActive(pathname, catHref);
                                        return (
                                            <Link
                                                key={cat.id}
                                                href={catHref}
                                                onClick={handleClose}
                                                aria-current={isActive ? "page" : undefined}
                                                className={`text-2xl font-black uppercase tracking-tighter hover:italic transition-all leading-none ${isActive ? (isScrolled ? "italic text-white" : "italic text-black") : ""}`}
                                            >
                                                {cat.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className={`text-[9px] font-black uppercase tracking-[0.5em] italic ${isScrolled ? "text-zinc-700" : "text-zinc-300"}`}>Sub-categories</p>
                                <div className="flex flex-wrap md:flex-col gap-2 md:gap-4">
                                    {searchPanelSubs.map(sub => {
                                        const isActive = searchSubActiveHref === sub.href;
                                        return (
                                            <Link
                                                key={`${sub.href}-${sub.label}`}
                                                href={sub.href}
                                                onClick={handleClose}
                                                aria-current={isActive ? "page" : undefined}
                                                className={`text-[10px] md:text-[13px] font-bold uppercase tracking-[0.2em] border px-3 py-1.5 md:border-none md:p-0 transition-colors ${isActive
                                                    ? isScrolled
                                                        ? "border-white text-white md:border-b md:border-white md:pb-0.5"
                                                        : "border-black text-black md:border-b md:border-black md:pb-0.5"
                                                    : isScrolled
                                                        ? "border-zinc-800 text-zinc-500 hover:text-white"
                                                        : "border-zinc-100 text-zinc-400 hover:text-black"
                                                    }`}
                                            >
                                                {sub.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto pb-32">
                            <p className={`mb-8 text-[9px] font-black uppercase tracking-[0.5em] italic ${isScrolled ? "text-zinc-700" : "text-zinc-300"}`}>Products</p>

                            {searchResult?.data?.length ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                                    {searchResult.data.map((p: { id: string | number; name: string; image: string }) => (
                                        <Link key={p.id} href={`/product/${p.id}`} onClick={handleClose} className="group block">
                                            <div className={`relative aspect-3/4 overflow-hidden mb-4 ${isScrolled ? "bg-zinc-900 shadow-2xl" : "bg-zinc-50 shadow-lg"}`}>
                                                <Image src={p.image ?? PLACEHOLDER_IMAGE} alt={p.name} fill className="object-cover transition-all duration-500 group-hover:scale-105" />
                                            </div>
                                            <h4 className="truncate text-[10px] md:text-[12px] font-bold uppercase tracking-widest leading-tight opacity-80">{p.name}</h4>
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
    );
}
