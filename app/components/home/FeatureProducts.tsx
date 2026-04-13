"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Badge } from "../Badge";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import "swiper/css";
import "swiper/css/effect-coverflow";

const MOBILE_BREAKPOINT = 1024;

type ProductItem = { id: number; name: string; image: string; badge?: string | string[] | null };

const FEATURED_PRODUCTS: ProductItem[] = [
    { id: 1, name: "Featured Piece I", image: "/111.jpg" },
    { id: 2, name: "Featured Piece II", image: "/444.jpg" },
    { id: 3, name: "Featured Piece III", image: "/555.jpg" },
];

function ProductCard({
    product,
    showHoverAsActive,
}: {
    product: ProductItem;
    showHoverAsActive?: boolean;
}) {
    return (
        <div className="group relative flex flex-col bg-zinc-950">
            <div className="relative aspect-3/4 overflow-hidden">
                <Image
                    src={product.image ?? PLACEHOLDER_IMAGE}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 85vw, 33vw"
                    className={`h-full w-full object-cover transition-all duration-1000 ease-out 
            ${showHoverAsActive ? "scale-105" : "md:group-hover:scale-110"}`}
                />
                <div className={`absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20`} />

                {/* {product.badge && (
                    <div className="absolute left-4 top-4 flex flex-wrap gap-1">
                        {(Array.isArray(product.badge) ? product.badge : [product.badge]).map((b) => (
                            <Badge key={b} className="rounded-none bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black md:text-[12px]">
                                {b}
                            </Badge>
                        ))}
                    </div>
                )} */}

                <div
                    className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ease-out
          ${showHoverAsActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"}`}
                >
                    <Link
                        href={`/product/${product.id}`}
                        className="flex h-14 w-full items-center justify-center rounded-none border border-white bg-white py-6 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all duration-500 md:h-16 md:bg-transparent md:text-[13px] md:text-white md:group-hover:bg-white md:group-hover:text-black"
                    >
                        Quick View
                    </Link>
                </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-1">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">{product.name}</h3>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase md:text-[12px]">Available in Studio</span>
            </div>
        </div>
    );
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
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

export default function FeaturedProducts() {
    const [isMobile, setIsMobile] = useState(false);
    const products = FEATURED_PRODUCTS;

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        setIsMobile(mq.matches);
        const handler = () => setIsMobile(mq.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <section id="collection" className="bg-zinc-950 px-6 py-20 md:px-16 md:py-32">
            <div className="mb-16 flex flex-col items-center text-center">
                <motion.span
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={fadeInUp}
                    transition={{ duration: 0.8 }}
                    className="mb-4 block text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 md:text-[12px]"
                >
                    Curated Selection
                </motion.span>
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={fadeInUp}
                    transition={{ duration: 1 }}
                    className="text-5xl font-black uppercase tracking-tighter text-white md:text-7xl"
                >
                    FEATURED PIECES
                </motion.h2>
            </div>

            {/* Mobile: 直接渲染 Swiper，避免 motion opacity 导致不显示 */}
            {isMobile ? (
                <div className="mx-auto max-w-[1400px] overflow-x-clip">
                    <Swiper
                        effect="coverflow"
                        modules={[EffectCoverflow, Autoplay]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        grabCursor
                        centeredSlides
                        loop
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 80,
                            depth: 200,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        className="overflow-visible!"
                    >
                        {(products as ProductItem[]).map((product, index) => {
                            const badge = index === 0 || index === 1 ? "New" : index === 2 ? "Best Selling" : product.badge;
                            return (
                                <SwiperSlide key={product.id} className="w-[85vw]! sm:w-[70vw]!">
                                    {({ isActive }: { isActive: boolean }) => (
                                        <ProductCard product={{ ...product, badge }} showHoverAsActive={isActive} />
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            ) : (
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={staggerContainer}
                    className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 md:grid-cols-3 md:gap-12"
                >
                    {(products as ProductItem[]).map((product, index) => {
                        const badge = index === 0 || index === 1 ? "New" : index === 2 ? "Best Selling" : product.badge;
                        return (
                            <motion.div key={product.id} variants={staggerItem} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
                                <ProductCard product={{ ...product, badge }} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            <div className="mt-20 flex justify-center">
                <Link
                    href="/women/new-arrival"
                    className="inline-flex rounded-none border border-zinc-700 px-12 py-7 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-white hover:text-black"
                >
                    View Full Collection
                </Link>
            </div>
        </section>
    );
}
