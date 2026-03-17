"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../Button";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function MoreAboutUs() {
  return (
    <section className="border-t border-zinc-100 bg-white py-24 md:py-40">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={staggerContainer}
        className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center"
      >
        <motion.span
          variants={staggerItem}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-400"
        >
          Stay Connected
        </motion.span>

        <motion.h2
          variants={staggerItem}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl font-black leading-[1.1] tracking-tighter text-zinc-950 md:text-8xl"
        >
          THE LUXXZONE <br />
          <span className="font-light italic text-zinc-300">COMMUNITY</span>
        </motion.h2>

        <motion.div variants={staggerItem} transition={{ duration: 1.2 }} className="pt-4">
          <Button variant="primary" className="group relative h-16 w-full px-0">
            <Link
              href="https://t.me/luxxzone"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full items-center justify-center gap-3 px-10"
            >
              <TelegramIcon className="size-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-110" />
              <span>Join Our Telegram</span>
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
