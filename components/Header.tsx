"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const leftCategories = [
  { label: "Clothing", href: "#", hasArrow: true },
  { label: "Footwear", href: "#", hasArrow: true },
  { label: "Bags", href: "#", hasArrow: true },
  { label: "Watches", href: "#", hasArrow: true },
  { label: "Accessories", href: "#", hasArrow: false },
  { label: "Jewelry", href: "#", hasArrow: false },
  { label: "Belts", href: "#", hasArrow: false },
  { label: "Sunglasses", href: "#", hasArrow: false },
];

const rightCategories = [
  { label: "Men's", href: "#", hasArrow: true },
  { label: "Women's", href: "#", hasArrow: true },
  { label: "New Arrivals", href: "#", hasArrow: false },
  { label: "Collections", href: "#", hasArrow: true },
  { label: "Sale", href: "#", hasArrow: false },
  { label: "About", href: "#", hasArrow: false },
  { label: "Contact", href: "#", hasArrow: false },
  { label: "Wishlist", href: "#", hasArrow: false },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <header
      ref={headerRef}
      // 保持 Header 的固定定位和背景模糊
      className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-200/50 bg-zinc-50/80 backdrop-blur-md"
    >
      {/* 关键 1: nav 必须是 relative，这样里面的 absolute Logo 才能以它为基准定位 */}
      <nav className="relative flex min-h-20 items-center justify-center gap-6 px-4 py-4 lg:gap-12 lg:px-8">

        {/* Left Categories */}
        <div className="grid grid-cols-4 gap-x-6 gap-y-1 text-right lg:gap-x-8">
          {leftCategories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center justify-start gap-0.5 text-[10px] font-medium uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60 lg:text-xs"
            >
              {item.label}
              {item.hasArrow && (
                <ChevronDown className="size-3 shrink-0 lg:size-3.5" />
              )}
            </Link>
          ))}
        </div>

        {/* 关键 2: 透明占位符 (Spacer) 
            因为 Logo 变成了 absolute，我们需要这个空的 div 撑开左右菜单的距离。
            宽度要和你的 Logo 容器差不多大。 */}
        <div className="w-24 shrink-0 md:w-32"></div>

        {/* Right Categories */}
        <div className="grid grid-cols-4 gap-x-6 gap-y-1 text-left lg:gap-x-8">
          {rightCategories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center justify-end gap-0.5 text-[10px] font-medium uppercase tracking-widest text-zinc-950 transition-opacity hover:opacity-60 lg:text-xs"
            >
              {item.hasArrow && (
                <ChevronDown className="size-3 shrink-0 lg:size-3.5" />
              )}
              {item.label}

            </Link>
          ))}
        </div>

        {/* 关键 3: 绝对定位的 Logo 容器 
            left-1/2 -translate-x-1/2 保证它绝对居中。
            top-0 让它贴着顶部。
            h-28 让它的高度超出了 nav 的 min-h-20，实现“凸出去”的效果。
            bg-white 给了它一个实心的白色背景（类似你截图里的白块）。*/}
        <Link
          href="/"
          className="absolute left-1/2 top-0 z-10 flex h-24 w-28 -translate-x-1/2 items-center justify-center md:h-20 md:w-48"
        >
          {/* Logo 图片实际容器，预留一点 padding */}
          <div className="relative h-full w-full p-2 md:p-4">
            <Image
              src="/logo.png"
              alt="Luxxzone"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </Link>

      </nav>
    </header>
  );
}