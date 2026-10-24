import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Simulated network delay for mocks. */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
