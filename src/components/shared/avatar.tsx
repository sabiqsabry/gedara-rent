"use client"

import { Avatar as ShadcnAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface AvatarProps {
  src?: string | null
  alt?: string
  fallback?: string
  className?: string
}

export function Avatar({ src, alt, fallback, className }: AvatarProps) {
  const initials = fallback
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U"

  return (
    <ShadcnAvatar className={className}>
      <AvatarImage src={src || undefined} alt={alt} />
      <AvatarFallback>{initials}</AvatarFallback>
    </ShadcnAvatar>
  )
}
