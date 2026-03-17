"use client";

import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "white";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "outline", className, ...props }, ref) => {
    const baseStyles = "inline-flex h-14 items-center justify-center px-10 transition-all duration-500 text-[11px] font-black uppercase tracking-[0.3em] active:scale-95 disabled:opacity-50";
    const variants = {
      primary: "bg-black text-white hover:bg-zinc-800",
      outline: "border border-black bg-transparent text-black hover:bg-black hover:text-white",
      white: "bg-white text-black hover:bg-zinc-100",
    };

    return (
      <button ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />
    );
  }
);
Button.displayName = "Button";