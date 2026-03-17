"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleExitComplete = () => {
    setIsVisible(false);
    document.body.style.overflow = "";
  };

  if (!isVisible) return null;

  return (
    <motion.div className="fixed inset-0 z-999 flex items-center justify-center">
        {/* 左右黑幕 */}
        <motion.div
          initial={{ width: "50%" }}
          animate={{ width: "0%" }}
          transition={{
            delay: 1.9,
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
          }}
          className="absolute left-0 top-0 h-full bg-white"
        />
        <motion.div
          initial={{ width: "50%" }}
          animate={{ width: "0%" }}
          transition={{
            delay: 1.95,
            duration: 1,
            ease: [0.87, 0, 0.13, 1],
          }}
          className="absolute right-0 top-0 h-full bg-white"
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.9, 1, 1, 1.1],
            filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(0px)"],
          }}
          transition={{
            duration: 2.1,
            times: [0, 0.476, 0.714, 1],
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            // Logo 2.1s 结束，帷幕 1.9s 开始、1s 时长，约 2.9s 结束，需再等 ~0.9s
            setTimeout(handleExitComplete, 900);
          }}
          className="relative z-10 h-24 w-48 md:h-32 md:w-64"
        >
          <Image
            src="/logo.png"
            alt="Luxxzone"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </motion.div>
    </motion.div>
  );
}
