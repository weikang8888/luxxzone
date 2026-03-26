"use client";

import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

type NavCategory = { id: number; label: string; slug: string; sub_categories: { id: number; label: string; href: string }[] };

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
};

export default function MobileMenu({ isOpen, onClose, activeGender, onGenderSwitch, categories }: Props) {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) setOpenDropdown(null);
    }, [isOpen]);

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
                                        <span className={`text-xl font-black uppercase tracking-tighter transition-colors ${isExpanded ? "text-black" : "text-zinc-950"}`}>
                                            {item.label}
                                        </span>
                                        <ChevronRight className={`size-4 text-zinc-300 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                                    </button>
                                    <div className={`grid transition-all duration-300 ease-out ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <div className="overflow-hidden">
                                            <div className="flex flex-wrap gap-x-6 gap-y-4 pb-6 pl-0">
                                                {item.sub_categories.map((sub) => (
                                                    <Link
                                                        key={sub.id}
                                                        href={sub.href}
                                                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black"
                                                        onClick={onClose}
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
                                key={item.id}
                                custom={idx}
                                initial="hidden"
                                animate={isOpen ? "visible" : "hidden"}
                                variants={menuVariants}
                            >
                                <Link
                                    href={`/${activeGender}/${item.slug}`}
                                    onClick={onClose}
                                    className="flex items-center justify-between border-b border-zinc-100 py-6"
                                >
                                    <span className="text-xl font-black uppercase tracking-tighter text-black">{item.label}</span>
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