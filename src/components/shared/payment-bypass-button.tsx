"use client"

import { Button } from "@/components/ui/button"
import { canBypassAuth } from "@/lib/auth-bypass"

interface PaymentBypassButtonProps {
  onBypass: () => void
}

export function PaymentBypassButton({ onBypass }: PaymentBypassButtonProps) {
  if (!canBypassAuth()) {
    return null
  }

  return (
    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-xs text-yellow-800 mb-2">DEV MODE: Skip Payment</p>
      <Button
        size="sm"
        variant="outline"
        onClick={onBypass}
        className="w-full"
      >
        Bypass Payment & Reserve
      </Button>
    </div>
  )
}
