"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
const categories = [
    {
        id: 1,
        name: "Dresses",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
        gridClass: "md:col-span-2 md:row-span-2",
    },
    {
        id: 2,
        name: "Knitwear",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
        gridClass: "md:col-span-1 md:row-span-2",
    },
    {
        id: 3,
        name: "Trousers",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
        gridClass: "md:col-span-1 md:row-span-1",
    },
    {
        id: 4,
        name: "Outerwear",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        gridClass: "md:col-span-1 md:row-span-1",
    },
];

const fadeInScale = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
};

export default function WomenSection() {
    return (
        <section className="bg-white overflow-hidden">
            {/* --- Header Banner --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInScale}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative h-[60vh] min-h-[400px] w-full bg-zinc-100 overflow-hidden"
            >
                <Image
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop"
                    alt="Women's collection"
                    fill
                    priority
                    className="object-cover object-center brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex items-center p-8 md:p-20 lg:p-32">
                    <div className="max-w-2xl text-white">
                        <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-300">
                            Spring/Summer 2026
                        </span>
                        <h2 className="text-6xl font-black tracking-tighter md:text-8xl lg:text-9xl">
                            WOMEN&apos;S
                        </h2>
                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-200 md:text-base">
                            Fluid lines. Effortless elegance. Curated for the modern woman who values timeless silhouette.
                        </p>
                        <Link
                            href="/women/clothing"
                            className="group relative mt-10 flex h-16 w-fit overflow-hidden rounded-none border border-white bg-transparent px-10 py-7 text-[11px] font-black uppercase tracking-[0.3em] text-white transition-all duration-700 hover:border-black hover:text-white"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                EXPLORE COLLECTION
                                <ArrowRight className="size-4" />
                            </span>
                            <div className="absolute inset-0 z-0 translate-y-full bg-black opacity-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:opacity-100" />
                        </Link>
                    </div>
                </div>
            </motion.div>

            {/* --- Category Grid --- */}
            <div className="mx-auto px-6 py-12 md:px-12 lg:px-20 md:py-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    className="grid grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[300px] md:gap-8"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={staggerItem}
                            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className={`group relative flex flex-col overflow-hidden ${category.gridClass}`}
                        >
                            <Link
                                href="/women/clothing"
                                className="flex h-full min-h-0 flex-col"
                            >
                                <div className="relative min-h-[180px] flex-1 overflow-hidden bg-zinc-100 md:min-h-[200px]">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                                </div>

                                <div className="mt-4 flex shrink-0 items-center justify-between border-b border-zinc-100 pb-2 transition-colors duration-500 group-hover:border-zinc-950">
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-950">
                                        {category.name}
                                    </span>
                                    <ArrowRight className="size-4 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
