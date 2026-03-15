"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const WHATSAPP_NUMBER = "6581234567";

// --- 导航数据 ---
const leftCategories = [
  { label: "New Arrivals", href: "/category/new-arrivals" },
  { label: "Clothing", href: "/category/clothing" },
  { label: "Shoes", href: "/category/shoes" },
  { label: "Bags", href: "/category/bags" },
  { label: "Accessories", href: "/category/accessories" },
  { label: "Sale", href: "/sale" },
];

const rightCategories = [
  { label: "Shoes", href: "/category/shoes" },
  { label: "Clothing", href: "/category/clothing" },
  { label: "New Arrivals", href: "/category/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "Accessories", href: "/category/accessories" },
  { label: "Bags", href: "/category/bags" },
];


export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"Men" | "Women">("Men");

  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-100 border-b border-zinc-200/50 bg-zinc-50/80 backdrop-blur-md"
    >
      <nav className="relative mx-auto flex min-h-20 items-center justify-between px-6 lg:px-16">

        {/* ================= 1. 移动端：左侧汉堡按钮 ================= */}
        <button
          className="lg:hidden text-zinc-950 p-2 -ml-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="size-6" />
        </button>

        {/* ================= 2. Desktop：左侧 (Men) ================= */}
        <div className="hidden lg:flex flex-1 flex-col items-start pt-2">
          <span className="mb-1 text-[13px] font-medium uppercase tracking-[0.35em] text-zinc-400">Men</span>
          <div className="grid w-full grid-cols-3 justify-items-start gap-x-8 gap-y-1">
            {leftCategories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-950 hover:opacity-60 lg:text-xs"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ================= 3. Logo (居中) ================= */}
        <Link href="/" className="flex h-16 w-40 items-center justify-center shrink-0 lg:h-20 lg:w-48">
          <div className="relative h-full w-full p-2 lg:p-4">
            <Image src="/logo.png" alt="Luxxzone" fill className="object-contain" priority />
          </div>
        </Link>

        {/* ================= 4. Desktop：右侧 (Women) ================= */}
        <div className="hidden lg:flex flex-1 flex-col items-end pt-2">
          <span className="mb-1 text-[13px] font-medium uppercase tracking-[0.35em] text-zinc-400">Women</span>
          <div className="grid w-full grid-cols-3 justify-items-end gap-x-8 gap-y-1">
            {rightCategories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex items-center py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-950 hover:opacity-60 lg:text-xs"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ================= 5. 移动端：右侧搜索按钮 ================= */}
        <button className="lg:hidden p-2 -mr-2 text-zinc-950">
          <Search className="size-5" />
        </button>

      </nav>

      {/* ========================================================
           🌟 移动端全屏抽屉菜单 (Mobile Drawer)
           ======================================================== */}
      <div className={`fixed inset-0 z-120 flex flex-col transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex min-h-dvh flex-col bg-white">
          {/* Drawer Header */}
          <div className="flex shrink-0 items-center justify-between px-6 py-5 border-black border-b-2">
            <Link href="/" className="relative h-6 w-28" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/logo-horizontal.png" alt="Luxxzone" fill className="object-contain object-left" />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X className="size-6" /></button>
          </div>

          {/* Men / Women 切换 */}
          <div className="flex shrink-0 border-b border-zinc-100">
            {(["Men", "Women"] as const).map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === tab ? "bg-zinc-950 text-white" : "bg-white text-zinc-400"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 菜单列表 - flex-1 占满剩余高度并可滚动 */}
          <div className="min-h-0 flex-1 overflow-y-auto bg-white px-6 py-4">
            <div className="space-y-6">
              {(activeTab === "Men" ? leftCategories : rightCategories).map((item) => (
                <Link
                  key={item.label}
                  href={item.label === "Clothing" ? `/category/clothing?gender=${activeTab.toLowerCase()}` : item.href}
                  className="block text-sm font-bold uppercase tracking-tighter text-zinc-950"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* About & Contact - 底部链接 */}
            <div className="mt-10 pt-8 border-t border-zinc-100 space-y-5">
              <a
                href="https://t.me/luxxzone"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold uppercase tracking-tighter text-zinc-950"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-bold uppercase tracking-tighter text-zinc-950"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>

            {/* Connect with us & Social Links */}
            <div className="mt-8 pt-6 border-t border-zinc-100">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-4">Connect with us</p>
              <div className="flex items-center gap-6">
              <a
                href="https://t.me/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-950 transition-colors"
                aria-label="Telegram"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://wa.me/yournumber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-950 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-950 transition-colors"
                aria-label="Facebook"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-zinc-950 transition-colors"
                aria-label="Instagram"
              >
                <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
              </div>
              <p className="mt-6 text-[10px] font-medium uppercase tracking-widest text-zinc-400">© 2026 Luxxzone Management</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}