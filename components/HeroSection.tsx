"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  // 我们要把 ref 绑在内部的图片或者图片的父容器上，以实现“框不动，画在动”的高级效果
  const imageWrapperRef = useRef<HTMLDivElement>(null); 
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 文字入场更干脆，拉长了持续时间，让视线停留
      gsap.from(labelRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      // 2. 主标题使用极其丝滑的 power4.out 缓动，营造“降临”感
      gsap.from(headlineRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.4,
      });

      gsap.from(btnRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });

      // 3. 核心大图动画：外框从纯黑渐渐变透明（揭幕效果），内部图片极其缓慢地缩小（呼吸感）
      gsap.from(imageWrapperRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.from(imageRef.current, {
        scale: 1.15, // 从放大 15% 开始
        duration: 2.5, // 长达 2.5 秒的极其缓慢的缩小，大牌标配！
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Column - Typography & CTA */}
      <div className="flex flex-col justify-center bg-zinc-50 px-8 py-16 lg:px-16 lg:py-24">
        {/* 小标签增加 inline-block 确保动画位移准确 */}
        <span
          ref={labelRef}
          className="mb-6 inline-block font-medium uppercase tracking-[0.3em] text-zinc-500"
        >
          Spring/Summer 2026
        </span>

        {/* 主标题：加入了 tracking-tighter (字母变紧凑)，在超大字号下极具视觉冲击力 */}
        <h1
          ref={headlineRef}
          className="mb-12 max-w-2xl text-5xl font-bold leading-[1.05] tracking-tighter text-zinc-950 md:text-6xl lg:text-7xl xl:text-8xl"
        >
          REDEFINE THE SILHOUETTE
        </h1>

        <div ref={btnRef}>
          <Button
            asChild
            variant="outline"
            className="w-fit rounded-none border-zinc-950 px-8 py-6 font-medium uppercase tracking-widest text-zinc-950 transition-all duration-500 hover:bg-zinc-950 hover:text-zinc-50"
          >
            <Link href="#collection">Discover Collection</Link>
          </Button>
        </div>
      </div>

      {/* Right Column - Fashion Image */}
      <div 
        ref={imageWrapperRef} 
        className="relative h-[50vh] overflow-hidden bg-zinc-950 lg:h-screen"
      >
        <Image
          ref={imageRef} // 将动画绑在图片本身上
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
          alt="Fashion model - Spring Summer 2026 collection"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          // 4. 关键：加上 grayscale 黑白滤镜！
          className="object-cover"
          priority
        />
        {/* 可选：加一层极其轻微的黑色渐变遮罩，让左侧的白底和右侧的黑白图片融合得更高级 */}
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/10 to-transparent lg:from-zinc-950/20" />
      </div>
    </section>
  );
}