"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"
import { AuthBypassButton } from "@/components/shared/auth-bypass-button"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
      <AuthBypassButton />
    </SessionProvider>
  )
}
