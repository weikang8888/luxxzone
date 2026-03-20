import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import Header from "./components/Header";
import QueryProvider from "./providers/QueryProvider";

// 奢侈品电商常用的字体组合：Inter 负责正文的可读性，Archivo 负责标题的力量感
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXXZONE | Modern Silhouette & Silent Luxury",
  description: "Curated fashion collection for the modern individual. Experience redefined elegance and architectural precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <body
        className="antialiased bg-white text-black selection:bg-black selection:text-white"
        suppressHydrationWarning
      >
        <QueryProvider>
          {/* 1. 仪式感开场：优先级最高，覆盖全层 */}
          <LoadingScreen />

          {/* 2. 平滑滚动容器：Lenis 会接管内部所有内容的滚动行为 */}
          <SmoothScroll>
          <Suspense fallback={<header className="fixed top-0 z-[100] h-20 w-full bg-white/80 backdrop-blur-md" />}>
            <Header />
          </Suspense>
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
        </SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}