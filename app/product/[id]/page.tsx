"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// 🌟 你的 WhatsApp 商业号码
const WHATSAPP_NUMBER = "6581234567";

// 简化版的数据库：只保留名字和分类，其他都用默认测试数据
const products: Record<
  string,
  { name: string; category: string; images?: string[]; description?: string; details?: string[] }
> = {
  "1": { name: "Asymmetric Silk Dress", category: "dresses" },
  "2": { name: "Pleated Midi Dress", category: "dresses" },
  "3": { name: "Cut-out Maxi Dress", category: "dresses" },
  "4": { name: "Oversized Wool Coat", category: "outerwear" },
  "5": { name: "Structured Leather Jacket", category: "outerwear" },
  "6": { name: "Cashmere Turtleneck", category: "knitwear" },
  "7": { name: "Ribbed Knit Sweater", category: "knitwear" },
  "8": { name: "Wide-Leg Tailored Trousers", category: "trousers" },
  "9": { name: "Pleated Palazzo Pants", category: "trousers" },
  "10": { name: "Structured Cotton Shirt", category: "tops" },
  "11": { name: "Oxford Button-Down", category: "shirts" },
};

export default function ProductPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  // ========================================================
  // 🌟 核心魔法：全局测试数据覆盖
  // 不管什么 ID，只要它没有专门的图片，全部强制使用这 5 张测试图！
  // ========================================================
  const testImages = [
    "/test-detail-2.webp", // 第一行左侧 (aspect 3:4)
    "/test-detail-3.webp", // 第一行右侧 (aspect 3:4)
    "/test-detail-1.webp", // 中间横跨两列的大图 (aspect 16:9)
    "/test-detail-4.webp", // 第三行左侧 (aspect 3:4)
    "/test-detail-5.jpg",  // 第三行右侧 (aspect 3:4)
  ];

  const defaultDescription = "An exploration of fluid architecture. This piece is draped from pure mulberry silk, designed to move with the wearer. The bias cut ensures a flawless drape that contours the body naturally.";
  const defaultDetails = ["100% Mulberry Silk", "Asymmetric hemline", "Concealed side zip closure", "Dry clean only", "Made in Italy"];

  // 尝试获取商品，如果连 ID 都找不到，就给一个存档占位符
  const rawProduct = products[id];
  
  // 最终渲染用的商品数据：保留真实名字，强制塞入图片和文案
  const product = {
    name: rawProduct?.name || "Luxxzone Archive Piece",
    category: rawProduct?.category || "collection",
    images: rawProduct?.images || testImages,
    description: rawProduct?.description || defaultDescription,
    details: rawProduct?.details || defaultDetails,
  };

  const categoryTitle = product.category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const whatsappMessage = encodeURIComponent(
    `Hello Luxxzone, I would like to inquire about the ${product.name}. Could you share more details?`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <>
      <main className="min-h-screen bg-zinc-50 pt-32 pb-48">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12">
          
          {/* 顶部返回导航 */}
          <Link
            href={`/category/${product.category}`}
            className="mb-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500 transition-colors hover:text-zinc-950 lg:mb-16 lg:px-4"
          >
            <ArrowLeft className="size-4" />
            Back to {categoryTitle}
          </Link>

          {/* 核心布局 */}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 xl:gap-24">
            
            {/* 左侧：2-1-2 拼图画廊 (Occupies ~60%) */}
            <div className="w-full lg:w-[60%]">
              <div className="grid grid-cols-2 gap-4">
                {product.images.slice(0, 5).map((imgSrc, index) => {
                  // 第 3 张图 (index === 2) 跨两列，使用宽屏比例
                  const isMiddleImage = index === 2; 

                  return (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden bg-zinc-200 transition-shadow hover:shadow-2xl ${
                        isMiddleImage ? "col-span-2 aspect-video" : "col-span-1 aspect-3/4"
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`${product.name} - View ${index + 1}`}
                        fill
                        sizes={isMiddleImage ? "60vw" : "(max-width: 1024px) 50vw, 30vw"}
                        className="object-cover grayscale transition-all duration-700 ease-out hover:scale-105 hover:grayscale-0"
                        priority={index === 0}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 右侧：商品信息 & 吸顶面板 (Occupies ~40%) */}
            <div className="w-full lg:w-[40%]">
              <div className="sticky top-32 flex flex-col pt-4 lg:px-4 pb-12">
                
                <span className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
                  {categoryTitle}
                </span>
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-zinc-950 md:text-4xl lg:text-5xl">
                  {product.name}
                </h1>

                <div className="mt-10">
                  <p className="text-sm leading-relaxed tracking-wide text-zinc-600">
                    {product.description}
                  </p>
                </div>

                <div className="mt-10 border-t border-zinc-200 pt-8">
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-950">
                    Composition & Care
                  </h3>
                  <ul className="space-y-3">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="text-xs tracking-wide text-zinc-500 flex items-center gap-2">
                        <span className="size-1.5 bg-zinc-300 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 极简 WhatsApp 按钮 */}
                <div className="mt-16">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-none border border-zinc-950 bg-white px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-zinc-950 transition-all duration-500 hover:bg-zinc-950 hover:text-zinc-50 hover:shadow-xl"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    INQUIRE VIA WHATSAPP
                  </a>

                  <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-zinc-400">
                    Complimentary Worldwide Shipping
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      {/* 极简底部 */}
      <footer className="border-t border-zinc-200 bg-zinc-950 px-8 py-8 lg:px-16">
        <p className="text-center text-sm font-light uppercase tracking-widest text-zinc-500">
          © 2026 Luxxzone. All rights reserved.
        </p>
      </footer>
    </>
  );
}