"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Badge } from "../Badge";
import "swiper/css";
import "swiper/css/effect-coverflow";

const MOBILE_BREAKPOINT = 1024;

const products = [
    {
        id: 1,
        name: "Oversized Wool Coat",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
        badge: "New",
    },
    {
        id: 2,
        name: "Structured Blazer",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop",
        badge: null,
    },
    {
        id: 3,
        name: "Wide-Leg Trousers",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
        badge: "Best Seller",
    },
];

function ProductCard({
    product,
    showHoverAsActive,
}: {
    product: (typeof products)[0];
    showHoverAsActive?: boolean;
}) {
    return (
        <div className="group relative flex flex-col bg-zinc-950">
            <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 85vw, 33vw"
                    className={`h-full w-full object-cover transition-all duration-1000 ease-out 
            ${showHoverAsActive ? "scale-105" : "md:group-hover:scale-110"}`}
                />
                <div className={`absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20`} />

                {product.badge && (
                    <Badge className="absolute left-4 top-4 rounded-none bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                        {product.badge}
                    </Badge>
                )}

                <div
                    className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ease-out
          ${showHoverAsActive ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"}`}
                >
                    <Link
                        href={`/product/${product.id}`}
                        className="flex h-14 w-full items-center justify-center rounded-none border border-white bg-white py-6 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all duration-500 md:h-16 md:bg-transparent md:text-[11px] md:text-white md:group-hover:bg-white md:group-hover:text-black"
                    >
                        Quick View
                    </Link>
                </div>
            </div>

            <div className="mt-6 flex flex-col items-center gap-1">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">{product.name}</h3>
                <span className="text-[10px] tracking-widest text-zinc-500 uppercase">Available in Studio</span>
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
                    className="mb-4 block text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500"
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
                        className="!overflow-visible"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id} className="!w-[85vw] sm:!w-[70vw]">
                                {({ isActive }: { isActive: boolean }) => (
                                    <ProductCard product={product} showHoverAsActive={isActive} />
                                )}
                            </SwiperSlide>
                        ))}
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
                    {products.map((product) => (
                        <motion.div key={product.id} variants={staggerItem} transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <div className="mt-20 flex justify-center">
                <Link
                    href="/category/new-arrivals?gender=women"
                    className="inline-flex rounded-none border border-zinc-700 px-12 py-7 text-[11px] font-bold uppercase tracking-widest text-white transition-all duration-500 hover:bg-white hover:text-black"
                >
                    View Full Collection
                </Link>
            </div>
        </section>
    );
}
