"use client";

import { useEffect } from "react";
import { useLenis } from "@/app/context/LenisContext";

export function useScrollLock(locked: boolean) {
    const lenis = useLenis();

    useEffect(() => {
        if (!locked) return;

        lenis?.stop();

        const html = document.documentElement;
        const prevHtmlOverflow = html.style.overflow;
        const prevBodyOverflow = document.body.style.overflow;
        html.style.overflow = "hidden";
        document.body.style.overflow = "hidden";

        return () => {
            lenis?.start();
            html.style.overflow = prevHtmlOverflow;
            document.body.style.overflow = prevBodyOverflow;
        };
    }, [locked, lenis]);
}
