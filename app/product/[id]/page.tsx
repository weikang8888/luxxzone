"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useProductDetail } from "@/app/hooks/useProductDetail";

export default function ProductDetailPage() {
    const params = useParams();
    const id = typeof params.id === "string" ? parseInt(params.id, 10) : undefined;
    const { data: product, isLoading, isError } = useProductDetail(id);

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeImageIndex !== null) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [activeImageIndex]);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-white pb-20 pt-24 md:pt-40">
                <div className="mx-auto flex max-w-[1920px] flex-col gap-10 px-6 md:flex-row md:px-16">
                    <div className="flex-1 space-y-4">
                        <div className="aspect-3/4 animate-pulse bg-zinc-100" />
                    </div>
                    <aside className="w-full md:w-[35%]">
                        <div className="h-96 animate-pulse bg-zinc-100" />
                    </aside>
                </div>
            </main>
        );
    }

    if (isError || !product) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <p className="mb-4 text-zinc-500">Product not found</p>
                    <Link href="/" className="text-sm font-bold uppercase tracking-widest underline">
                        Back to home
                    </Link>
                </div>
            </main>
        );
    }

    const images = product.images;
    const details = product.details ?? [];

    return (
        <main className="min-h-screen bg-white pb-20 pt-24 md:pt-40">

            {/* ================= Lightbox 大圖預覽 ================= */}
            <AnimatePresence>
                {activeImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-200 flex items-center justify-center bg-white/98 backdrop-blur-sm"
                    >
                        {/* 關閉按鈕 */}
                        <button
                            onClick={() => setActiveImageIndex(null)}
                            className="absolute right-10 top-10 z-210 group p-4"
                        >
                            <X className="size-8 transition-transform duration-300 group-hover:rotate-90 group-active:scale-90" />
                        </button>

                        {/* 主圖容器 */}
                        <div className="relative h-[85vh] w-[85vw] md:h-[90vh] md:w-[70vw]">
                            <Image
                                src={images[activeImageIndex]}
                                alt="Zoomed Product View"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* 🌟 核心修正：更明顯且靠邊的導航箭頭 */}
                        <div className="absolute inset-x-4 md:inset-x-10 top-1/2 flex -translate-y-1/2 justify-between pointer-events-none">
                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1))}
                                className="pointer-events-auto flex size-14 md:size-20 items-center justify-center rounded-full bg-zinc-50/50 text-zinc-950 transition-all hover:bg-zinc-950 hover:text-white group active:scale-90 shadow-sm"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="size-8 md:size-10 transition-transform group-hover:-translate-x-1" />
                            </button>

                            <button
                                onClick={() => setActiveImageIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0))}
                                className="pointer-events-auto flex size-14 md:size-20 items-center justify-center rounded-full bg-zinc-50/50 text-zinc-950 transition-all hover:bg-zinc-950 hover:text-white group active:scale-90 shadow-sm"
                                aria-label="Next image"
                            >
                                <ChevronRight className="size-8 md:size-10 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>

                        {/* 頁碼計數 */}
                        <div className="absolute bottom-12 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                            Image {activeImageIndex + 1} <span className="mx-2 text-zinc-200">/</span> {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mx-auto flex max-w-[1920px] flex-col px-6 md:flex-row md:px-16 lg:gap-20">

                {/* ================= 1. 画廊 2+1+2+1+2... 布局 ================= */}
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
                    {(() => {
                        const rows: { type: "pair" | "single"; indices: number[] }[] = [];
                        let i = 0;
                        let step = 0;
                        while (i < images.length) {
                            if (step % 2 === 0) {
                                rows.push({ type: "pair", indices: [i, i + 1].filter((idx) => idx < images.length) });
                                i += 2;
                            } else {
                                rows.push({ type: "single", indices: [i] });
                                i += 1;
                            }
                            step++;
                        }
                        return rows.map((row, rowIdx) =>
                            row.type === "pair" ? (
                                <div key={rowIdx} className="grid grid-cols-2 gap-4 md:gap-6">
                                    {row.indices.map((idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                                            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className="group relative aspect-3/4 cursor-zoom-in overflow-hidden bg-zinc-50"
                                        >
                                            <Image src={images[idx]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="50vw" />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    key={rowIdx}
                                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    onClick={() => setActiveImageIndex(row.indices[0])}
                                    className="group relative aspect-16/10 cursor-zoom-in overflow-hidden bg-zinc-50 md:aspect-21/9"
                                >
                                    <Image src={images[row.indices[0]]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="100vw" />
                                </motion.div>
                            )
                        );
                    })()}
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
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I am interested in ${product.name}`} target="_blank"
                                className="flex h-16 w-full items-center justify-center gap-3 bg-[#25D366] text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-[#20ba5a] transition-all"
                            >
                                <MessageCircle className="size-5" /> Inquire on WhatsApp
                            </a>
                        </div>

                        <div className="space-y-6 pt-6">
                            <p className="text-[13px] leading-relaxed tracking-wide text-zinc-500">{product.description}</p>
                            <ul className="space-y-2">
                                {details.map((d, i) => (
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