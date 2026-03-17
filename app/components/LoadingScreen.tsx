"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 锁定滚动，确保加载时页面不动
    document.body.style.overflow = "hidden";
    
    // 强制 2.8 秒后彻底移除组件并恢复滚动
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // 🌟 核心：退出时整场渐隐
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          {/* Logo 动画：浮现 -> 停留 -> 放大微散 */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, -5],
              filter: ["blur(10px)", "blur(0px)", "blur(0px)", "blur(5px)"],
              scale: [0.95, 1, 1, 1.05],
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.3, 0.8, 1],
              ease: "easeInOut",
            }}
            className="relative h-24 w-48 md:h-32 md:w-64"
          >
            <Image
              src="/logo.png"
              alt="Luxxzone"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* 装饰性背景：可选，增加一点高级感 */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}