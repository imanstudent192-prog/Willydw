import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAdmin(): boolean {
  const key = import.meta.env.VITE_ADMIN_KEY as string | undefined;
  const provided = localStorage.getItem("admin_key") || undefined;
  if (!key) return false;
  return provided === key;
}
