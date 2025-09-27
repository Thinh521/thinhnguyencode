// src/lib/utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Gộp class tailwind một cách an toàn
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
