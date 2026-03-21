"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
    { id: 1, name: "New Arrival", slug: "new-arrival", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800" },
    { id: 2, name: "Clothing", slug: "clothing", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800" },
    { id: 3, name: "Shoes", slug: "shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800" },
    { id: 4, name: "Bags", slug: "bags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800" },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function MenSection() {
    return (
        <section className="bg-white overflow-hidden py-10 md:py-20">
            <div className="mx-auto max-w-[1920px]">
                <div className="grid grid-cols-1 md:grid-cols-5 min-h-[600px]">

                    {/* 左侧大图 */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={fadeInLeft}
                        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative md:col-span-2 min-h-[500px] md:min-h-[800px] bg-zinc-100 overflow-hidden"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200"
                            alt="Men's collection"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-zinc-950/20" />
                        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 text-white">
                            <span className="mb-4 font-mono text-xs tracking-[0.5em] text-zinc-300">01</span>
                            <h2 className="text-6xl font-black tracking-tighter md:text-7xl xl:text-8xl">MEN&apos;S</h2>
                            <p className="mt-6 max-w-xs text-sm leading-relaxed text-zinc-200 lg:text-base">
                                Refined silhouettes. Timeless essentials for the modern man.
                            </p>
                            <div className="mt-8">
                                <Link
                                    href="/men/clothing"
                                    className="group flex w-fit items-center gap-3 border-b border-white pb-1 transition-all hover:translate-x-2"
                                >
                                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">SHOP COLLECTION</span>
                                    <ArrowRight className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* 右侧网格 */}
                    <div className="flex flex-col justify-center p-8 md:col-span-3 md:px-12 lg:px-20">
                        <motion.span
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInUp}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-12 block text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-400"
                        >
                            Shop by Category
                        </motion.span>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={staggerContainer}
                            className="grid grid-cols-2 gap-4 md:gap-8"
                        >
                            {categories.map((category) => (
                                <motion.div key={category.id} variants={staggerItem} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                                    <Link href={`/men/${category.slug}`} className="group block">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                                            <Image src={category.image} alt={category.name} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                                        </div>
                                        <div className="mt-4 flex items-center justify-between border-b border-zinc-100 pb-2 transition-colors duration-500 group-hover:border-zinc-950">
                                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-950">{category.name}</span>
                                            <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
