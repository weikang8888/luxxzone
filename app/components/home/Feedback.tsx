"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import feedbackImg from "@/public/feedback.png";
import feedbackImg2 from "@/public/feedback-2.jpg";
import feedbackImg3 from "@/public/feedback-3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReviews } from "@/app/hooks/useReviews";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const feedbackImages = [feedbackImg, feedbackImg2, feedbackImg3];

const fallbackTestimonials: { id: number; quote: string; name: string; detail: string; image?: string }[] = [
  { id: 1, quote: "The craftsmanship is extraordinary. Every stitch speaks of quality. This is what luxury should feel like.", name: "Elena Chen", detail: "Oversized Wool Coat" },
  { id: 2, quote: "From the packaging to the fit, everything exceeded my expectations. Luxxzone has earned a lifelong customer.", name: "Marcus Laurent", detail: "Structured Blazer" },
  { id: 3, quote: "Finally, a brand that understands sustainable luxury. Beautiful pieces that don't compromise on ethics.", name: "Sofia Nakamura", detail: "Wide-Leg Trousers" },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Feedback() {
  const { data: reviews = [], isLoading } = useReviews({ page: 1, limit: 10 });
  const testimonials = reviews.length > 0 ? reviews : fallbackTestimonials;

  return (
    <section className="overflow-hidden bg-zinc-950 px-6 py-16 sm:px-12 md:py-24 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-10 border border-zinc-900 bg-zinc-900/20 p-6 md:grid-cols-3 md:gap-12 md:p-10 lg:gap-16 lg:p-12">
            <div className="h-32 animate-pulse bg-zinc-800" />
            <div className="aspect-3/4 animate-pulse bg-zinc-800" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 animate-pulse bg-zinc-800" />
              <div className="h-4 w-full animate-pulse bg-zinc-800" />
            </div>
          </div>
        ) : testimonials.length === 0 ? null : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
            transition={{ duration: 1.2 }}
          >
            <Swiper
              modules={[Navigation, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              slidesPerView={1}
              loop
              autoplay={{
                delay: 8000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".feedback-prev",
                nextEl: ".feedback-next",
              }}
              className="h-full"
            >
              {testimonials.map(({ id, quote, name, detail, image }, index) => (
                <SwiperSlide key={id ?? name}>
                  <div className="group grid grid-cols-1 gap-10 border border-zinc-900 bg-zinc-900/20 p-6 transition-all duration-500 hover:bg-zinc-900/40 md:grid-cols-3 md:items-start md:gap-12 md:p-10 lg:gap-16 lg:p-12">
                    {/* Left Column */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.15 }}
                      variants={staggerContainer}
                      className="shrink-0 lg:pt-8"
                    >
                      <motion.span
                        variants={staggerItem}
                        transition={{ duration: 0.8 }}
                        className="mb-4 block text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-500"
                      >
                        Clientele
                      </motion.span>
                      <motion.h2
                        variants={staggerItem}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-black leading-tight tracking-tighter text-white md:text-5xl lg:text-6xl"
                      >
                        THE HOUSE <br /> COMMUNITY
                      </motion.h2>

                      {/* Desktop Navigation */}
                      <div className="mt-12 hidden gap-4 md:flex">
                        <button
                          className="feedback-prev flex size-12 items-center justify-center rounded-full border border-zinc-800 bg-transparent text-zinc-400 transition-all duration-300 hover:border-white hover:text-white"
                          aria-label="Previous"
                        >
                          <ChevronLeft className="size-5" strokeWidth={1.5} />
                        </button>
                        <button
                          className="feedback-next flex size-12 items-center justify-center rounded-full border border-zinc-800 bg-transparent text-zinc-400 transition-all duration-300 hover:border-white hover:text-white"
                          aria-label="Next"
                        >
                          <ChevronRight className="size-5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </motion.div>

                    {/* Middle Column: Image */}
                    <div className="relative aspect-3/4 w-full shrink-0 overflow-hidden bg-zinc-800">
                      <Image
                        src={image ?? feedbackImages[index % feedbackImages.length]}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="scale-100 object-cover object-top transition-all duration-1000 ease-out group-hover:scale-110"
                      />
                    </div>

                    {/* Right Column: Quote */}
                    <div className="flex flex-1 flex-col md:pt-4">
                      <span className="mb-6 font-serif text-6xl leading-none text-zinc-800 lg:text-8xl">
                        &ldquo;
                      </span>
                      <blockquote className="mb-10 text-xl font-light leading-relaxed tracking-wide text-zinc-100 md:text-2xl lg:text-3xl lg:leading-snug">
                        {quote}
                      </blockquote>

                      <div className="mt-auto flex items-center gap-5">
                        <div className="h-px w-10 bg-zinc-700" />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-white sm:text-sm">{name}</p>
                          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-zinc-500">{detail}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Mobile Navigation */}
            <div className="mt-10 flex justify-center gap-6 md:hidden">
              <button
                className="feedback-prev flex size-12 items-center justify-center rounded-full border border-zinc-800 text-zinc-400"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                className="feedback-next flex size-12 items-center justify-center rounded-full border border-zinc-800 text-zinc-400"
                aria-label="Next"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
