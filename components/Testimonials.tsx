"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import feedbackImg from "@/public/feedback.png";
import feedbackImg2 from "@/public/feedback-2.jpg";
import feedbackImg3 from "@/public/feedback-3.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

// 必须引入 Swiper 的基础样式和 Fade 效果样式
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; 

gsap.registerPlugin(ScrollTrigger);

const feedbackImages = [feedbackImg, feedbackImg2, feedbackImg3];

// 🌟 数据：把你真实的 WhatsApp 截图路径填在 image 里
const testimonials = [
  {
    quote: "The craftsmanship is extraordinary. Every stitch speaks of quality. This is what luxury should feel like.",
    name: "Elena Chen",
    detail: "Oversized Wool Coat",
  },
  {
    quote: "From the packaging to the fit, everything exceeded my expectations. Luxxzone has earned a lifelong customer.",
    name: "Marcus Laurent",
    detail: "Structured Blazer",
  },
  {
    quote: "Finally, a brand that understands sustainable luxury. Beautiful pieces that don't compromise on ethics.",
    name: "Sofia Nakamura",
    detail: "Wide-Leg Trousers",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 左侧标题组的出场动画
      gsap.from(titleGroupRef.current?.children ?? [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // 右侧整个轮播图区域的出场动画
      gsap.from(swiperRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      // 极其奢侈的上下留白，深色展厅背景
      className="bg-zinc-950 p-16"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 lg:flex-row lg:items-start lg:gap-32">
        
        {/* ================= 左侧：固定的标题区域 ================= */}
        <div ref={titleGroupRef} className="shrink-0 lg:w-[350px]">
          <span className="mb-6 block font-medium uppercase tracking-[0.4em] text-zinc-500">
            Clientele
          </span>
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-zinc-50 md:text-5xl lg:text-6xl">
            THE HOUSE <br /> COMMUNITY
          </h2>
          
          {/* 桌面端导航按钮 (极简黑白线条风) */}
          <div className="mt-12 hidden gap-4 lg:flex">
            <button
              className="testimonials-prev flex size-14 items-center justify-center border border-zinc-800 bg-transparent text-zinc-500 transition-colors duration-500 hover:border-zinc-50 hover:text-zinc-50"
              aria-label="Previous"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="testimonials-next flex size-14 items-center justify-center border border-zinc-800 bg-transparent text-zinc-500 transition-colors duration-500 hover:border-zinc-50 hover:text-zinc-50"
              aria-label="Next"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= 右侧：WhatsApp截图 & 文字轮播区域 ================= */}
        <div ref={swiperRef} className="flex-1 overflow-hidden">
          <Swiper
            // 启用顶级淡入淡出动效 (EffectFade)
            modules={[Navigation, Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 8000, // 给用户充足的时间阅读聊天记录和评价
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".testimonials-prev",
              nextEl: ".testimonials-next",
            }}
            className="h-full"
          >
            {testimonials.map(({ quote, name, detail }, index) => (
              <SwiperSlide key={name}>
                {/* 内部采用左右排版的卡片：左手机截图 + 右大段文字 */}
                <div className="group flex flex-col items-center gap-12 border border-zinc-800/50 bg-zinc-900/30 p-8 transition-colors duration-500 hover:border-zinc-700 hover:bg-zinc-900 lg:flex-row lg:items-start lg:gap-16 lg:p-12">
                  
                  {/* 🌟 核心视觉区：完美契合手机比例 (9:16) 的 WhatsApp 截图 */}
                  <div className="relative aspect-9/16 w-full shrink-0 overflow-hidden bg-zinc-800 shadow-xl sm:w-[300px] lg:w-[300px]">
                    <Image
                      src={feedbackImages[index]}
                      alt={`Feedback from ${name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 300px"
                      // object-top 保证超长聊天记录从第一句话开始显示；grayscale 提供黑白高级滤镜
                      className="object-cover object-top grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                    {/* 一层极淡的暗色遮罩，增加冷酷质感，悬停时消失 */}
                    <div className="absolute inset-0 bg-zinc-950/20 transition-opacity duration-500 group-hover:opacity-0" />
                  </div>

                  {/* 评价文字排版区 */}
                  <div className="flex-1 lg:pt-8">
                    {/* 背景装饰引号 */}
                    <span className="mb-6 block font-serif text-8xl leading-none text-zinc-800">
                      &ldquo;
                    </span>
                    
                    {/* 极其舒展的正文排版 */}
                    <blockquote className="mb-10 text-xl font-light leading-[1.6] tracking-wide text-zinc-100 md:text-2xl lg:text-3xl">
                      {quote}
                    </blockquote>
                    
                    {/* 署名和购买细节 */}
                    <div className="flex items-center gap-6">
                      <div className="h-px w-12 bg-zinc-700" />
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-zinc-50">
                          {name}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">
                          {detail}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* 移动端专属的导航按钮 (居中显示) */}
          <div className="mt-12 flex justify-center gap-4 lg:hidden">
            <button className="testimonials-prev flex size-12 items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-50">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="testimonials-next flex size-12 items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-50">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}