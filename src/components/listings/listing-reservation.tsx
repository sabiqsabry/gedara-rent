"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { formatPrice, calculateTotalPrice } from "@/lib/utils"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { toast } from "sonner"
import { PaymentBypassButton } from "@/components/shared/payment-bypass-button"

interface ListingReservationProps {
  listing: any
}

export function ListingReservation({ listing }: ListingReservationProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guestCount, setGuestCount] = useState(listing.guestCount || 1)
  const [isLoading, setIsLoading] = useState(false)

  const handleReserve = async (skipPayment: boolean = false) => {
    if (!session) {
      router.push("/auth/login?callbackUrl=" + window.location.pathname)
      return
    }

    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select check-in and check-out dates")
      return
    }

    setIsLoading(true)
    try {
      const nights = Math.ceil(
        (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
      )

      const { total } = calculateTotalPrice(
        listing.price,
        nights,
        listing.cleaningFee || 0
      )

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          startDate: dateRange.from.toISOString(),
          endDate: dateRange.to.toISOString(),
          guestCount,
          totalPrice: total,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create reservation")
      }

      const reservation = await response.json()

      // If skipping payment, mark as confirmed
      if (skipPayment) {
        await fetch(`/api/reservations/${reservation.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "CONFIRMED" }),
        })

        await fetch("/api/payments/bypass", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reservationId: reservation.id,
            amount: total,
            status: "SUCCEEDED",
          }),
        })
      }

      router.push(`/dashboard/trips?reservation=${reservation.id}`)
      toast.success("Reservation created successfully!")
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const nights = dateRange?.from && dateRange?.to
    ? Math.ceil(
        (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0

  const priceBreakdown = dateRange?.from && dateRange?.to
    ? calculateTotalPrice(listing.price, nights, listing.cleaningFee || 0)
    : null

  return (
    <div className="border rounded-xl p-6 shadow-lg bg-white">
      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-semibold">
            {formatPrice(listing.price)}
          </span>
          <span className="text-gray-600">night</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Dates</label>
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Guests</label>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
            >
              -
            </Button>
            <span>{guestCount}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuestCount(Math.min(listing.guestCount, guestCount + 1))}
            >
              +
            </Button>
          </div>
        </div>

        {priceBreakdown && (
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>
                {formatPrice(listing.price)} × {nights} nights
              </span>
              <span>{formatPrice(priceBreakdown.basePrice)}</span>
            </div>
            {listing.cleaningFee && (
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>{formatPrice(listing.cleaningFee)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Service fee</span>
              <span>{formatPrice(priceBreakdown.serviceFee)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formatPrice(priceBreakdown.total)}</span>
            </div>
          </div>
        )}

        <Button
          onClick={() => handleReserve(false)}
          className="w-full"
          disabled={!dateRange?.from || !dateRange?.to || isLoading}
        >
          {isLoading ? "Reserving..." : "Reserve"}
        </Button>

        <PaymentBypassButton
          onBypass={() => handleReserve(true)}
        />
      </div>
    </div>
  )
}
