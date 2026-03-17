"use client";

import clsx, { ClassValue } from "clsx";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "default" | "outline" | "destructive" | "secondary";
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ variant = "outline", className, ...props }, ref) => {

        // 1. 锁定大牌核心样式：直角、大写、字间距、超小字号
        const baseStyles = "inline-flex items-center justify-center border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.25em] whitespace-nowrap transition-all duration-300";

        // 2. 样式变体映射
        const variants = {
            default: "border-black bg-black text-white",
            outline: "border-zinc-200 bg-transparent text-zinc-400 hover:border-black hover:text-black",
            destructive: "border-red-600 bg-red-600 text-white",
            secondary: "border-zinc-100 bg-zinc-100 text-zinc-400",
        };

        return (
            <span
                ref={ref}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";