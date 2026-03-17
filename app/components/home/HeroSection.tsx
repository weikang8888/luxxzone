"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../Button";

const textContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.5,
        },
    },
};

const textItem = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 1.5, ease: "easeOut" as const },
    },
};

export default function HeroSection() {
    return (
        <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FDFDFD] md:flex-row">
            {/* --- 文字区 --- */}
            <div className="order-2 z-10 flex w-full flex-col justify-center px-8 py-10 md:order-1 md:w-[45%] md:px-16 md:py-20 lg:px-24">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={textContainer}
                    className="space-y-4 text-center md:space-y-8 md:text-left"
                >
                    <motion.span
                        variants={textItem}
                        className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 md:text-[11px]"
                    >
                        Series 01 / SS 2026
                    </motion.span>

                    <motion.h1
                        variants={textItem}
                        className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tighter text-zinc-950 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                    >
                        SILENT <br />
                        <span className="font-light italic text-zinc-300">LUXURY</span>
                    </motion.h1>

                    <motion.p
                        variants={textItem}
                        className="mx-auto max-w-xs text-xs font-light leading-relaxed tracking-widest text-zinc-500 md:mx-0 md:text-base"
                    >
                        Redefining the modern silhouette through architectural precision and raw texture.
                    </motion.p>

                    <motion.span
                        variants={textItem}
                        className="inline-block text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 md:text-[11px]"
                    >
                        Luxury Fashion for Modern Style
                    </motion.span>

                    <motion.div variants={textItem} className="flex justify-center pt-2 md:justify-start md:pt-4">
                        <Button
                            variant="outline"
                            className="group relative h-14 w-full max-w-[200px] overflow-hidden rounded-none border-zinc-950 bg-transparent px-0 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-950 transition-all duration-700 hover:text-white md:h-16 md:max-w-[240px] md:text-[11px]"
                        >
                            <Link href="#collection" className="relative z-10 flex h-full w-full items-center justify-center">
                                Explore Edition
                            </Link>
                            <div className="absolute inset-0 z-0 translate-y-full bg-zinc-950 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:opacity-100" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- 图片区 --- */}
            <div className="order-1 relative flex w-full items-center justify-center pt-28 pb-4 md:order-2 md:w-[55%] md:py-12 lg:p-20">
                <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{
                        delay: 0.8,
                        duration: 2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative w-full shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:scale-[1.02]"
                    style={{ aspectRatio: "3 / 4" }}
                >
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.8,
                            duration: 3,
                            ease: "easeOut",
                        }}
                        className="relative h-full w-full"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
                            alt="Luxxzone SS26"
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 55vw"
                        />
                    </motion.div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-zinc-950/5 to-transparent" />
                </motion.div>
            </div>

            {/* 背景装饰 */}
            <div className="absolute -bottom-10 -left-10 hidden select-none text-[20vh] font-black text-zinc-100 opacity-30 md:block">
                LUXX
            </div>
        </section>
    );
}
