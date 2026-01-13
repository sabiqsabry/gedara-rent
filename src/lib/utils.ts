import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "LKR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function calculateTotalPrice(
  nightlyPrice: number,
  nights: number,
  cleaningFee: number = 0,
  serviceFeePercent: number = 10
): {
  basePrice: number
  cleaningFee: number
  serviceFee: number
  total: number
} {
  const basePrice = nightlyPrice * nights
  const serviceFee = Math.round((basePrice + cleaningFee) * (serviceFeePercent / 100))
  const total = basePrice + cleaningFee + serviceFee

  return {
    basePrice,
    cleaningFee,
    serviceFee,
    total,
  }
}
