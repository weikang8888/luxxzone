"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    leftCategories,
    rightCategories,
    categorySubItems,
    DROPDOWN_CATEGORIES,
} from "@/lib/nav";
import { WHATSAPP_NUMBER } from "@/lib/constants";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: Props) {
    const [activeTab, setActiveTab] = useState<"Men" | "Women">("Men");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setOpenDropdown(null);
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const categories = activeTab === "Men" ? leftCategories : rightCategories;

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? 0 : "-100%" }}
            transition={{
                duration: isOpen ? 0.7 : 0.5,
                ease: isOpen ? [0.16, 1, 0.3, 1] : [0.4, 0, 1, 1],
            }}
            className="fixed inset-0 z-[150] flex flex-col bg-white md:hidden"
        >
            {/* --- Drawer Header --- */}
            <div className="flex shrink-0 items-center justify-between px-8 py-8">
                <Link href="/" className="relative h-6 w-28" onClick={onClose}>
                    <Image
                        src="/logo-horizontal.png"
                        alt="Luxxzone"
                        fill
                        className="object-contain object-left"
                        priority
                    />
                </Link>
                <button
                    onClick={onClose}
                    className="group relative flex size-10 items-center justify-center"
                    aria-label="Close Menu"
                >
                    <X className="size-6 transition-transform group-active:rotate-90" />
                </button>
            </div>

            {/* --- Tab Switcher (Men / Women) --- */}
            <div className="flex px-8 mb-8">
                <div className="relative flex w-full bg-zinc-50 p-1 rounded-full">
                    {(["Men", "Women"] as const).map((tab) => (
                        <button
                            key={tab}
                            className={`relative z-10 flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${activeTab === tab ? "text-white" : "text-zinc-400"
                                }`}
                            onClick={() => {
                                setActiveTab(tab);
                                setOpenDropdown(null);
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                    <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeTab === "Men" ? "translate-x-0" : "translate-x-full"
                            }`}
                    />
                </div>
            </div>

            {/* --- Main Menu List --- */}
            <div className="flex-1 overflow-y-auto px-8 pb-12">
                <div className="flex flex-col">
                    {categories.map((item) => {
                        const isExpanded = openDropdown === item.label;
                        const hasSubItems = DROPDOWN_CATEGORIES.includes(item.label);
                        const subItems = categorySubItems[item.label];

                        return (
                            <div key={item.label} className="border-b border-zinc-100 last:border-none">
                                {hasSubItems ? (
                                    /* --- Dropdown 模式：點擊僅展開 --- */
                                    <div className="py-6">
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between group outline-none"
                                            onClick={() => setOpenDropdown(isExpanded ? null : item.label)}
                                        >
                                            <span className={`text-xl font-black uppercase tracking-tighter transition-all duration-500 ${isExpanded ? "pl-2 text-black" : "text-zinc-950"
                                                }`}>
                                                {item.label}
                                            </span>
                                            <div className={`relative flex size-6 items-center justify-center transition-transform duration-500 ${isExpanded ? "rotate-90 text-black" : "text-zinc-300"
                                                }`}>
                                                <ChevronRight className="size-4" strokeWidth={3} />
                                            </div>
                                        </button>

                                        {/* 下拉子項目區域 */}
                                        <div
                                            className={`grid transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-wrap gap-x-6 gap-y-4 pb-4 pl-2">
                                                    {subItems?.map((sub) => (
                                                        <Link
                                                            key={sub.label}
                                                            href={`${sub.href}?gender=${activeTab.toLowerCase()}`}
                                                            className="text-[12px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black active:text-black"
                                                            onClick={onClose}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* --- 普通模式：點擊直接跳轉 --- */
                                    <Link
                                        href={`${item.href}?gender=${activeTab.toLowerCase()}`}
                                        className="block py-6 text-xl font-black uppercase tracking-tighter text-zinc-950 active:bg-zinc-50"
                                        onClick={onClose}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* --- Footer Area --- */}
                <div className="mt-12 pt-10 border-t-2 border-black pb-10">
                    <div className="space-y-6">
                        <Link
                            href="/about"
                            className="block text-[11px] font-black uppercase tracking-[0.3em] text-black"
                            onClick={onClose}
                        >
                            About The House
                        </Link>
                        <Link
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            className="block text-[11px] font-black uppercase tracking-[0.3em] text-black"
                            onClick={onClose}
                        >
                            Client Service
                        </Link>
                        <div className="pt-4 flex gap-8">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest cursor-pointer">Instagram</span>
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest cursor-pointer">Telegram</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}