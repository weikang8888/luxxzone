"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Shield, CreditCard, Truck, Headphones } from "lucide-react";
import "swiper/css";

const MOBILE_BREAKPOINT = 1024;

const pillars = [
  {
    icon: Shield,
    label: "Authentic Products",
    description: "Every item is verified for authenticity. Shop with confidence knowing you're getting genuine luxury.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?q=80&w=800&auto=format&fit=crop",
    alt: "Authentic luxury products",
  },
  {
    icon: CreditCard,
    label: "Secure Payment",
    description: "Your transactions are protected with industry-leading encryption. Safe and secure checkout every time.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
    alt: "Secure payment processing",
  },
  {
    icon: Truck,
    label: "Worldwide Shipping",
    description: "We deliver to over 150 countries. Fast, reliable shipping with full tracking and insurance.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop",
    alt: "Worldwide delivery",
  },
  {
    icon: Headphones,
    label: "Customer Support",
    description: "Our dedicated team is here 24/7 to assist you. Premium service from inquiry to aftercare.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    alt: "Dedicated customer support",
  },
];

function PillarCard({
  icon: Icon,
  label,
  description,
  image,
  alt,
  isActive = false,
}: (typeof pillars)[0] & { isActive?: boolean }) {
  return (
    <div className="group relative h-[450px] overflow-hidden bg-zinc-950 sm:h-[500px] md:h-[550px] xl:h-[650px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 85vw, 25vw"
          className={`object-cover transition-all duration-1000 ease-out 
            ${isActive ? "scale-105" : "md:group-hover:scale-110"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500" />
      </div>

      <div className="relative flex h-full flex-col justify-end p-8 text-zinc-50">
        <div
          className={`transition-transform duration-500 ease-out 
          ${isActive ? "-translate-y-2" : "md:group-hover:-translate-y-2"}`}
        >
          <div
            className={`mb-4 inline-flex size-10 items-center justify-center border transition-colors duration-500 
            ${isActive ? "border-white" : "border-white/30 md:group-hover:border-white"}`}
          >
            <Icon className="size-5" strokeWidth={1} />
          </div>
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white">{label}</h3>
        </div>

        <div
          className={`grid transition-all duration-500 ease-out 
          ${isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 md:group-hover:mt-4 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100"}`}
        >
          <div className="overflow-hidden">
            <p className="text-[11px] leading-relaxed tracking-widest text-zinc-300 md:text-xs">{description}</p>
          </div>
        </div>
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
    transition: { staggerChildren: 0.1, delayChildren: 0 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyChooseUs() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="border-t border-zinc-100 bg-white py-20 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6">
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 block text-center text-[10px] md:text-[12px] font-bold uppercase tracking-[0.5em] text-zinc-400"
        >
          The House Difference
        </motion.span>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 text-center text-5xl font-black uppercase tracking-tighter text-zinc-950 md:mb-20 md:text-7xl"
        >
          WHY CHOOSE US
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {isMobile ? (
            <div className="overflow-x-clip -mx-6 px-6">
            <Swiper slidesPerView={1.2} spaceBetween={16} className="!overflow-visible">
              {pillars.map((pillar) => (
                <SwiperSlide key={pillar.label}>
                  <PillarCard {...pillar} isActive={true} />
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {pillars.map((pillar) => (
                <motion.div key={pillar.label} variants={staggerItem} transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}>
                  <PillarCard {...pillar} isActive={false} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
