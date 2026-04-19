"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import type { NavCategory } from "@/lib/navFromCategories";
import { isCategoryHrefActive } from "@/lib/navHref";

const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: { delay: 0.2 + i * 0.05, duration: 0.4 },
    }),
};

type Props = {
    isOpen: boolean;
    onClose: () => void;
    activeGender: "men" | "women";
    onGenderSwitch: (gender: "men" | "women") => void;
    categories: NavCategory[];
    pathname: string;
};

export default function MobileMenu({ isOpen, onClose, activeGender, onGenderSwitch, categories, pathname }: Props) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    /** Which sub row’s brand dropdown is open (`${categoryId}-${subId}`). Only applies when sub has `children`. */
    const [openSubBrandKey, setOpenSubBrandKey] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setOpenDropdown(null);
            setOpenSubBrandKey(null);
            return;
        }
        setOpenSubBrandKey(null);
        const matchCat = categories.find((c) =>
            pathname.startsWith(`/${activeGender}/${c.slug}`)
        );
        if (matchCat) setOpenDropdown(matchCat.label);
        else setOpenDropdown(null);
        for (const c of categories) {
            const base = `/${activeGender}/${c.slug}`;
            if (!pathname.startsWith(base)) continue;
            for (const s of c.sub_categories) {
                if (s.label === "Shop All" || !s.children?.length) continue;
                if (pathname === s.href || pathname.startsWith(`${s.href}/`)) {
                    setOpenSubBrandKey(`${c.id}-${s.id}`);
                    return;
                }
            }
        }
    }, [isOpen, pathname, categories, activeGender]);

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? 0 : "-100%" }}
            transition={{
                duration: isOpen ? 0.6 : 0.5,
                ease: isOpen ? [0.16, 1, 0.3, 1] : [0.4, 0, 1, 1],
            }}
            className="fixed inset-0 z-110 flex flex-col bg-white md:hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-8 shrink-0">
                <Link href="/" onClick={onClose} className="relative h-6 w-40">
                    <Image src="/logo-horizontal.png" alt="Luxxzone" fill className="object-contain object-left" />
                </Link>
                <button onClick={onClose} className="p-2">
                    <X className="size-6" />
                </button>
            </div>

            {/* 移動端藥丸切換器 */}
            <div className="px-8 mb-8 shrink-0">
                <div className="relative flex w-full bg-zinc-50 p-1 rounded-full">
                    {(["men", "women"] as const).map((tab) => (
                        <button
                            key={tab}
                            className={`relative z-10 flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${activeGender === tab ? "text-white" : "text-zinc-400"}`}
                            onClick={() => onGenderSwitch(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                    <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-full transition-transform duration-500 ease-expo ${activeGender === "men" ? "translate-x-0" : "translate-x-full"}`} />
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8">
                <nav className="flex flex-col border-t border-zinc-100">
                    {categories.map((item, idx) => {
                        const hasSubItems = item.sub_categories.length > 0;
                        const isExpanded = openDropdown === item.label;
                        const catHref = `/${activeGender}/${item.slug}`;
                        const isCatActive = isCategoryHrefActive(pathname, catHref);

                        if (hasSubItems) {
                            return (
                                <motion.div
                                    key={item.id}
                                    custom={idx}
                                    initial="hidden"
                                    animate={isOpen ? "visible" : "hidden"}
                                    variants={menuVariants}
                                    className="border-b border-zinc-100 last:border-none"
                                >
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between py-6 outline-none text-left"
                                        onClick={() => setOpenDropdown(isExpanded ? null : item.label)}
                                    >
                                        <span className={`text-xl font-black uppercase tracking-tighter transition-colors ${isExpanded || isCatActive ? "text-black" : "text-zinc-950"}`}>
                                            {item.label}
                                        </span>
                                        <ChevronRight className={`size-4 text-zinc-300 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                                    </button>
                                    <div className={`grid transition-all duration-300 ease-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <div className="overflow-hidden">
                                            <div className="flex flex-wrap gap-x-6 gap-y-4 pb-6 pl-0">
                                                {item.sub_categories.map((sub) => {
                                                    if (!sub.children?.length) {
                                                        const isSubActive = pathname === sub.href;
                                                        return (
                                                            <Link
                                                                key={sub.id}
                                                                href={sub.href}
                                                                aria-current={isSubActive ? "page" : undefined}
                                                                className={`text-[10px] font-bold uppercase tracking-widest ${isSubActive ? "text-black underline underline-offset-4" : "text-zinc-400 hover:text-black"}`}
                                                                onClick={onClose}
                                                            >
                                                                {sub.label}
                                                            </Link>
                                                        );
                                                    }
                                                    const brandKey = `${item.id}-${sub.id}`;
                                                    const brandsOpen = openSubBrandKey === brandKey;
                                                    const isSubLandingActive =
                                                        pathname === sub.href ||
                                                        pathname.startsWith(`${sub.href}/`);
                                                    return (
                                                        <div key={sub.id} className="flex w-full flex-col">
                                                            <div className="flex items-center justify-between gap-3">
                                                                <Link
                                                                    href={sub.href}
                                                                    aria-current={
                                                                        isSubLandingActive ? "page" : undefined
                                                                    }
                                                                    className={`min-w-0 flex-1 text-left text-[10px] font-bold uppercase tracking-widest ${isSubLandingActive ? "text-black underline underline-offset-4" : "text-zinc-400 hover:text-black"}`}
                                                                    onClick={onClose}
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setOpenSubBrandKey((k) =>
                                                                            k === brandKey ? null : brandKey
                                                                        )
                                                                    }
                                                                    aria-expanded={brandsOpen}
                                                                    aria-label={
                                                                        brandsOpen
                                                                            ? "Close brand list"
                                                                            : "Open brand list"
                                                                    }
                                                                    className="shrink-0 p-1.5 text-zinc-400 transition-colors hover:text-black"
                                                                >
                                                                    <ChevronDown
                                                                        className={`size-4 transition-transform duration-300 ${brandsOpen ? "rotate-180" : ""}`}
                                                                    />
                                                                </button>
                                                            </div>
                                                            <div
                                                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${brandsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                                            >
                                                                <div className="min-h-0 overflow-hidden">
                                                                    <div className="mt-4 flex flex-col gap-3 border-l border-zinc-100 pb-1 pl-4 pt-1">
                                                                        {sub.children.map((ch) => {
                                                                            const isChildActive =
                                                                                pathname === ch.href;
                                                                            return (
                                                                                <Link
                                                                                    key={ch.id}
                                                                                    href={ch.href}
                                                                                    aria-current={
                                                                                        isChildActive
                                                                                            ? "page"
                                                                                            : undefined
                                                                                    }
                                                                                    className={`text-[10px] font-bold uppercase tracking-widest ${isChildActive ? "text-black underline underline-offset-4" : "text-zinc-400 hover:text-black"}`}
                                                                                    onClick={onClose}
                                                                                >
                                                                                    {ch.label}
                                                                                </Link>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        }

                        return (
                            <motion.div
                                key={item.id}
                                custom={idx}
                                initial="hidden"
                                animate={isOpen ? "visible" : "hidden"}
                                variants={menuVariants}
                            >
                                <Link
                                    href={catHref}
                                    onClick={onClose}
                                    aria-current={isCatActive ? "page" : undefined}
                                    className="flex items-center justify-between border-b border-zinc-100 py-6"
                                >
                                    <span className={`text-xl font-black uppercase tracking-tighter ${isCatActive ? "text-black underline underline-offset-8" : "text-black"}`}>{item.label}</span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                {/* 🌟 Mobile Menu Footer */}
                <div className="mt-12 pb-12">
                    <div className="space-y-10">
                        {/* WhatsApp Contact */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Boutique Service</span>
                            <a 
                                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                                target="_blank"
                                className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-950"
                            >
                                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                                Inquire on WhatsApp
                            </a>
                        </div>

                        {/* Social & Help */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Social</span>
                                <div className="flex flex-col gap-2">
                                    <Link href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">Instagram</Link>
                                    <Link href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">Facebook</Link>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Support</span>
                                <div className="flex flex-col gap-2">
                                    <Link href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">Shipping</Link>
                                    <Link href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-black">Returns</Link>
                                </div>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="pt-8 border-t border-zinc-100">
                            <p className="text-[9px] font-medium leading-relaxed tracking-widest text-zinc-400 uppercase">
                                © 2026 Luxxzone Archive. <br />
                                Redefining Modern Luxury.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}