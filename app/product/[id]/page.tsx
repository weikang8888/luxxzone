"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const product = {
    id: 1,
    name: "Oversized Wool Blend Coat",
    collection: "Series 01 / SS 2026",
    description: "Crafted from a premium wool blend, this oversized coat features architectural shoulders and a clean, hidden placket.",
    details: ["80% Virgin Wool", "Relaxed fit", "Made in Italy"],
    images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600",
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200",
    ]
};

export default function ProductDetailPage() {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    // 禁用背景滚动
    useEffect(() => {
        if (activeImageIndex !== null) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [activeImageIndex]);

    return (
        <main className="min-h-screen bg-white pb-20 pt-24 md:pt-40">

            {/* ================= Lightbox 大圖預覽 ================= */}
            <AnimatePresence>
                {activeImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-white/98 backdrop-blur-sm"
                    >
                        {/* 關閉按鈕 */}
                        <button
                            onClick={() => setActiveImageIndex(null)}
                            className="absolute right-10 top-10 z-[210] group p-4"
                        >
                            <X className="size-8 transition-transform duration-300 group-hover:rotate-90 group-active:scale-90" />
                        </button>

                        {/* 主圖容器 */}
                        <div className="relative h-[85vh] w-[85vw] md:h-[90vh] md:w-[70vw]">
                            <Image
                                src={product.images[activeImageIndex]}
                                alt="Zoomed Product View"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* 🌟 核心修正：更明顯且靠邊的導航箭頭 */}
                        <div className="absolute inset-x-4 md:inset-x-10 top-1/2 flex -translate-y-1/2 justify-between pointer-events-none">
                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev! > 0 ? prev! - 1 : product.images.length - 1))}
                                className="pointer-events-auto flex size-14 md:size-20 items-center justify-center rounded-full bg-zinc-50/50 text-zinc-950 transition-all hover:bg-zinc-950 hover:text-white group active:scale-90 shadow-sm"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="size-8 md:size-10 transition-transform group-hover:-translate-x-1" />
                            </button>

                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev! < product.images.length - 1 ? prev! + 1 : 0))}
                                className="pointer-events-auto flex size-14 md:size-20 items-center justify-center rounded-full bg-zinc-50/50 text-zinc-950 transition-all hover:bg-zinc-950 hover:text-white group active:scale-90 shadow-sm"
                                aria-label="Next image"
                            >
                                <ChevronRight className="size-8 md:size-10 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>

                        {/* 頁碼計數 */}
                        <div className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            Image {activeImageIndex + 1} <span className="mx-2 text-zinc-200">/</span> {product.images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto flex max-w-[1920px] flex-col px-6 md:flex-row md:px-16 lg:gap-20">

                {/* ================= 1. 画廊 (点击触发放大) ================= */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0 },
                        },
                    }}
                    className="flex-1 space-y-4 md:space-y-6 lg:w-[65%]"
                >
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {product.images.slice(0, 2).map((img, i) => (
                            <motion.div
                                key={i}
                                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                onClick={() => setActiveImageIndex(i)}
                                className="group relative aspect-[3/4] cursor-zoom-in overflow-hidden bg-zinc-50"
                            >
                                <Image src={img} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                        onClick={() => setActiveImageIndex(2)}
                        className="group relative aspect-[16/10] cursor-zoom-in overflow-hidden bg-zinc-50 md:aspect-[21/9]"
                    >
                        <Image src={product.images[2]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {product.images.slice(3, 5).map((img, i) => (
                            <motion.div
                                key={i + 3}
                                variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                onClick={() => setActiveImageIndex(i + 3)}
                                className="group relative aspect-[3/4] cursor-zoom-in overflow-hidden bg-zinc-50"
                            >
                                <Image src={img} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ================= 2. 右侧信息 (保持 Sticky) ================= */}
                <aside className="mt-12 w-full md:mt-0 md:w-[35%] lg:w-[30%]">
                    <div className="sticky top-40 space-y-10">
                        <div className="space-y-4 border-b border-zinc-100 pb-10">
                            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-300">{product.collection}</span>
                            <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-950 lg:text-5xl">{product.name}</h1>
                        </div>

                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-widest block">Select Size</span>
                            <div className="flex flex-wrap gap-2">
                                {["EU 46", "EU 48", "EU 50", "EU 52"].map((size) => (
                                    <button key={size} onClick={() => setSelectedSize(size)}
                                        className={`flex h-12 w-24 items-center justify-center border text-[11px] font-bold transition-all ${selectedSize === size ? "border-black bg-black text-white" : "border-zinc-100 text-zinc-400 hover:border-black hover:text-black"
                                            }`}
                                    >{size}</button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank"
                                className="flex h-16 w-full items-center justify-center gap-3 bg-[#25D366] text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#20ba5a] transition-all"
                            >
                                <MessageCircle className="size-5" /> Inquire on WhatsApp
                            </a>
                        </div>

                        <div className="space-y-6 pt-6">
                            <p className="text-[13px] leading-relaxed tracking-wide text-zinc-500">{product.description}</p>
                            <ul className="space-y-2">
                                {product.details.map((d, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[11px] font-medium text-zinc-400">
                                        <div className="size-1 rounded-full bg-zinc-300" /> {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}